import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Divider,
  Chip,
  Paper,
  Stack
} from '@mui/material';
import { dbService } from '../services/db_service';
import Task from '../model/task';

const TaskInterface = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({
    id: null,
    title: '',
    content: '',
    dueDate: '',
    status: 'PENDING',
    priority: 'LOW',
    folder: null,
    createdAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rootFolder, setRootFolder] = useState(() => {
    try {
      const saved = localStorage.getItem('rootFolder');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to parse rootFolder from localStorage:', error);
      localStorage.removeItem('rootFolder'); // Clean up invalid data
      return null;
    }
  });

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError('');
  
        const user = await dbService.getUserByEmail(email, token);
        if (!user) throw new Error('Usuário não encontrado');
  
        let root = await dbService.getRootFoldersByUser(user.id, token);
        if (!root || root.length === 0) {
          const folderData = {
            name: 'Root',
            parentFolder: null,
            user: user
          };
          root = await dbService.createFolder(folderData, token);
        }
  
        // Ensure we have a single root folder object
        const rootFolderObj = Array.isArray(root) ? root[0] : root;
        
        // Validate before saving to localStorage
        if (!rootFolderObj || !rootFolderObj.id) {
          throw new Error('Invalid root folder data');
        }
  
        // Stringify with error handling
        try {
          localStorage.setItem('rootFolder', JSON.stringify(rootFolderObj));
        } catch (storageError) {
          console.error('Failed to save rootFolder to localStorage:', storageError);
        }
  
        setRootFolder(rootFolderObj);
  
        const tasksData = await dbService.getTasksByFolder(rootFolderObj.id, token);
        const safeTasks = (tasksData || []).map(task => ({
          id: task.id,
          title: task.title || 'Sem título',
          content: task.content || '',
          status: task.status || 'PENDING',
          priority: task.priority || 'LOW',
          dueDate: task.dueDate || '',
          folder: task.folder || rootFolderObj,
          createdAt: task.createdAt || new Date().toISOString()
        }));
  
        setTasks(safeTasks);
      } catch (error) {
        setError(error.message);
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    initializeApp();
  }, []);

  const handleTaskSelect = (task) => {
    setSelectedTask({
      id: task.id,
      title: task.title || '',
      content: task.content || '',
      status: task.status || 'PENDING',
      priority: task.priority || 'LOW',
      dueDate: task.dueDate || '',
      folder: task.folder || null,
      createdAt: task.createdAt || new Date().toISOString()
    });
  };

  const handleInputChange = (field, value) => {
    setSelectedTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!selectedTask.id) return;
    
    try {
      const taskToUpdate = {
        title: selectedTask.title,
        content: selectedTask.content,
        status: selectedTask.status,
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate,
        folder: selectedTask.folder
      };

      const updatedTask = await dbService.updateTask(selectedTask.id, taskToUpdate, token);

      setTasks(tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      ));
      setSelectedTask(updatedTask);
      setError('');
    } catch (error) {
      setError('Erro ao salvar tarefa');
    }
  };

  const handleCreate = async () => {
    if (!rootFolder) {
      setError('Root folder não encontrada');
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const due_date = tomorrow.toISOString().split('T')[0];
    
    try {
      const newTaskData = {
        folder: rootFolder,
        title: 'Nova tarefa',
        content: 'New',
        dueDate: due_date,
        status: 'REGISTERED',
        priority: "LOW",
      };

      const newTask = await dbService.createTask(newTaskData, token);
      
      const safeNewTask = {
        id: newTask.id,
        title: newTask.title || 'Nova tarefa',
        content: newTask.content || '',
        status: newTask.status || 'REGISTERED',
        priority: newTask.priority || 'LOW',
        dueDate: newTask.dueDate || due_date,
        folder: newTask.folder || rootFolder,
        createdAt: newTask.createdAt || new Date().toISOString()
      };

      setTasks([...tasks, safeNewTask]);
      setSelectedTask(safeNewTask);
    } catch (error) {
      setError('Erro ao criar nova tarefa');
    }
  };

  const handleDelete = async () => {
    if (!selectedTask.id) return;

    try {
      await dbService.deleteTask(selectedTask.id, token);
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask({
        id: null,
        title: '',
        content: '',
        dueDate: '',
        status: 'PENDING',
        priority: 'LOW',
        folder: null,
        createdAt: ''
      });
    } catch (error) {
      setError('Erro ao deletar tarefa');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'IN_PROGRESS': return 'info';
      case 'COMPLETED': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Lista de Tarefas */}
      <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #ddd', height: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Lista de Tarefas</Typography>
            <Button variant="contained" onClick={handleCreate}>Nova</Button>
          </Stack>

          <List dense>
            {tasks.map(task => (
              <Paper key={task.id} sx={{ mb: 1 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedTask.id === task.id}
                    onClick={() => handleTaskSelect(task)}
                  >
                    <ListItemText
                      primary={task.title || 'Sem título'}
                      secondary={
                        task.content
                          ? task.content.substring(0, 30) + '...'
                          : 'Sem descrição'
                      }
                    />
                    <Chip
                      label={task.status}
                      color={getStatusColor(task.status)}
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Editor de Tarefa */}
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 3 }}>
          {selectedTask.id ? (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5">Editar Tarefa</Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" color="error" onClick={handleDelete}>
                    Deletar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!selectedTask.title.trim()}
                  >
                    Salvar
                  </Button>
                </Stack>
              </Stack>

              <TextField
                label="Título"
                fullWidth
                value={selectedTask.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Descrição"
                fullWidth
                multiline
                rows={4}
                value={selectedTask.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                sx={{ mb: 3 }}
              />

              <Select
                value={selectedTask.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
              >
                <MenuItem value="PENDING">Pendente</MenuItem>
                <MenuItem value="IN_PROGRESS">Em Progresso</MenuItem>
                <MenuItem value="COMPLETED">Concluída</MenuItem>
              </Select>

              <TextField
                label="Data de Vencimento"
                type="date"
                fullWidth
                value={selectedTask.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                sx={{ mb: 3 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary">
                Criado em: {selectedTask.createdAt
                  ? new Date(selectedTask.createdAt).toLocaleDateString()
                  : 'Data desconhecida'}
              </Typography>
            </>
          ) : (
            <Box sx={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" color="text.secondary">
                Selecione uma tarefa para editar
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskInterface;