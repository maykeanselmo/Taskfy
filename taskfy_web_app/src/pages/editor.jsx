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
import { useLanguage } from '../utils/translations';
import { create } from '@mui/material/styles/createTransitions';

const TaskInterface = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({
    id: null,
    title: '',
    content: '',
    dueDate: '',
    status: 'REGISTERED',
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

  // Adicione no início do componente
  const [skipDeleteConfirmation, setSkipDeleteConfirmation] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        setError('');
  
        const user = await dbService.getUserByEmail(email, token);
        if (!user) throw new Error(t("user_not_found"));

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
          status: task.status || 'REGISTERED',
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
      status: task.status || 'REGISTERED',
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
        folder: selectedTask.folder,
        createdAt: selectedTask.createdAt,
        updatedAt: new Date().toISOString().split('T')[0]
      };
  
      const updatedTask = await dbService.updateTask(selectedTask.id, taskToUpdate, token);
      console.log('Tarefa atualizada:', updatedTask);
      
      // Garantir que as datas sejam formatadas corretamente
      const safeUpdatedTask = {
        ...updatedTask,
        createdAt: updatedTask.createdAt || selectedTask.createdAt,
        updatedAt: updatedTask.updatedAt || new Date().toISOString()
      };
  
      setTasks(tasks.map(task => 
        task.id === safeUpdatedTask.id ? safeUpdatedTask : task
      ));
      setSelectedTask(safeUpdatedTask);
      setError('');
    } catch (error) {
      setError('Erro ao salvar tarefa');
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleCreate = async () => {
    if (!rootFolder) {
      setError('Root folder não encontrada');
      return;
    }
  
    try {
      const newTaskData = {
        folder: rootFolder,
        title: t('new_task'),
        content: t('new_description'),
        dueDate: new Date().toISOString().split('T')[0], // Data atual como dueDate
        status: 'REGISTERED',
        priority: "LOW",
      };
  
      const newTask = await dbService.createTask(newTaskData, token);
      
      // Formatar as datas corretamente
      const safeNewTask = {
        id: newTask.id,
        title: newTask.title || t('new_task'),
        content: newTask.content || '',
        status: newTask.status || 'REGISTERED',
        priority: newTask.priority || 'LOW',
        dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
        folder: newTask.folder || rootFolder,
        createdAt: newTask.createdAt ? new Date(newTask.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: newTask.updatedAt ? new Date(newTask.updatedAt).toISOString() : null
      };
  
      setTasks([...tasks, safeNewTask]);
      setSelectedTask(safeNewTask);
    } catch (error) {
      setError('Erro ao criar nova tarefa');
      console.error('Erro ao criar tarefa:', error);
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
        status: 'REGISTERED',
        priority: 'LOW',
        folder: null,
        createdAt: ''
      });
    } catch (error) {
      setError('Erro ao deletar tarefa');
    }
  };

  const handleDeleteClick = () => {
    if (skipDeleteConfirmation) {
      handleDelete();
    } else {
      setDeleteDialogOpen(true);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'REGISTERED': return 'warning';
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
            <Typography variant="h6">{t('task_list')}</Typography>
            <Button variant="contained" onClick={handleCreate}>{t('new')}</Button>
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
                          : t('no_description')
                      }
                    />
                    <Chip
                      label={t(task.status.toLowerCase())} // Alterar para usar a tradução
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
      {deleteDialogOpen && (
  <Box sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <Paper sx={{ p: 3, minWidth: 300 }}>
      <Typography variant="h6" gutterBottom>
        {t('confirm_delete')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('confirm_delete_task_message')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <input
          type="checkbox"
          id="dontAskAgain"
          checked={dontAskAgain}
          onChange={(e) => setDontAskAgain(e.target.checked)}
          style={{ marginRight: '8px' }}
        />
        <label htmlFor="dontAskAgain">{t('do_not_ask_again')}</label>
      </Box>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={() => setDeleteDialogOpen(false)}>
          {t('cancel')}
        </Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={() => {
            setSkipDeleteConfirmation(dontAskAgain);
            setDeleteDialogOpen(false);
            handleDelete();
          }}
        >
          {t('delete')}
        </Button>
      </Stack>
    </Paper>
  </Box>
)}

      {/* Editor de Tarefa */}
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 3 }}>
          {selectedTask.id ? (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5">{t('task_editor')}</Typography>
                <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteClick}
                >
                  {t('delete')}
                </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!selectedTask.title.trim()}
                  >
                    {t('save')}
                  </Button>
                </Stack>
              </Stack>

              <TextField
                label={t('title')}
                fullWidth
                value={selectedTask.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                sx={{ mb: 3 }}
              />

              <TextField
                label={t('description')}
                fullWidth
                multiline
                minRows={6}
                maxRows={24} // opcional — limite máximo de expansão
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
              <MenuItem value="REGISTERED">{t('registered')}</MenuItem>
              <MenuItem value="IN_PROGRESS">{t('in_progress')}</MenuItem>
              <MenuItem value="COMPLETED">{t('completed')}</MenuItem>
              </Select>

              <TextField
                label= {t('due_date')}
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
                {t('created_at')}: {selectedTask.createdAt
                  ? new Date(selectedTask.createdAt).toLocaleDateString()
                  : 'Data desconhecida'}
              </Typography>
            {/*
              <Typography variant="body2" color="text.secondary">
                {t('updated_at')}: {selectedTask.updatedAt
                  ? new Date(selectedTask.updatedAt).toLocaleDateString()
                  : 'Nunca atualizado'}
              </Typography>
            */}
            </>
          ) : (
            <Box sx={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" color="text.secondary">
                {t('select_task_to_edit')}
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskInterface;