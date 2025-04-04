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
  const [selectedTask, setSelectedTask] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', status: 'PENDING' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rootFolder, setRootFolder] = useState(null);

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const user = await dbService.getUserByEmail(email, token);
        if (!user) throw new Error('Usuário não encontrado');

        let root = await dbService.getRootFoldersByUser(user.id, token);
        if (!root || root.length === 0) {
          root = await dbService.createFolder({
            name: 'Root',
            parentId: null,
            ownerId: user.id
          }, token);
        }
        console.log("root", root);

        const rootFolderId = Array.isArray(root) ? root[0].id : root.id;
        const tasksData = await dbService.getTasksByFolder(rootFolderId, token);
        console.log("tasksData", tasksData);
        setRootFolder(root[0]);

        const safeTasks = (tasksData || []).map(task => ({
          id: task.id,
          title: task.title || 'Sem título',
          description: task.description || '',
          status: task.status || 'PENDING',
          createdAt: task.createdAt || new Date().toISOString()
        }));

        setTasks(safeTasks);
        setRootFolder(rootFolderId);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setEditData({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'PENDING'
    });
  };

  const handleSave = async () => {
    try {
      const task = new Task({
        folder_id: rootFolder.id,
        title: editData.title,
        description: editData.description,
        due_date: null,
        status: editData.status,
        priority: null,
    });
      console.log("task", task);
      const updatedTask = await dbService.updateTask(task.id, token, task);
      console.log("response", updatedTask);

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
    try {
      const task = new Task({
        folder: rootFolder,
        title: 'Nova tarefa',
        content: 'New',
        due_date: new Date().toISOString().split('T')[0],
        status: 'REGISTERED',
        priority: "LOW",
      })
      console.log("task", task);
      const newTask = await dbService.createTask(task, token);

      setTasks(newTask);
      handleTaskSelect(safeNewTask);
    } catch (error) {
      setError('Erro ao criar nova tarefa');
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      await dbService.deleteTask(selectedTask.id, token);
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
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
                    selected={selectedTask?.id === task.id}
                    onClick={() => handleTaskSelect(task)}
                  >
                    <ListItemText
                      primary={task.title || 'Sem título'}
                      secondary={
                        task.description
                          ? task.description.substring(0, 30) + '...'
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
          {selectedTask ? (
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
                    disabled={!editData.title.trim()}
                  >
                    Salvar
                  </Button>
                </Stack>
              </Stack>

              <TextField
                label="Título"
                fullWidth
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Descrição"
                fullWidth
                multiline
                rows={4}
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                sx={{ mb: 3 }}
              />

              <Select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                fullWidth
                sx={{ mb: 3 }}
              >
                <MenuItem value="PENDING">Pendente</MenuItem>
                <MenuItem value="IN_PROGRESS">Em Progresso</MenuItem>
                <MenuItem value="COMPLETED">Concluída</MenuItem>
              </Select>

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
