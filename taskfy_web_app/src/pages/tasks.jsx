import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Tooltip,
  Box,
  CircularProgress,
  Alert,
  TextField
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DriveFileMove as MoveIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Create as CreateIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { dbService } from "../services/db_service";

function TasksViewer() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const token = localStorage.getItem("authToken");
          if (!token) {
              navigate('/login');
              return;
          }
          const email = localStorage.getItem('email');
          const user = await dbService.getUserByEmail(email, token);
  
          // Log the user and folders
          console.log('User:', user);

          const userFolders = await dbService.getRootFoldersByUser(user.id, token);
          console.log(userFolders);
  
          setFolders(userFolders);
  
          // Fetch tasks by folder
          const allTasks = [];
          for (const folder of userFolders) {
              const folderTasks = await dbService.getTasksByFolder(folder.id, token);
              console.log(`Tasks for folder ${folder.id}:`, folderTasks);
              allTasks.push(...folderTasks.map(task => ({
                  ...task,
                  folderId: folder.id,
                  folderName: folder.name
              })));
          }
  
          setTasks(allTasks);
      } catch (err) {
          console.error('Error fetching data:', err);
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };


    fetchData();
  }, [navigate]);

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setCurrentTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentTask(null);
  };

  const handleEdit = (task) => {
    navigate('/editor', { state: { task } });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await dbService.deleteTask(currentTask.id, token);
      setTasks(tasks.filter(task => task.id !== currentTask.id));
      handleMenuClose();
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.message);
    }
  };

  const handleMove = async (folderId) => {
    try {
      const token = localStorage.getItem("authToken");
      await dbService.updateTask(currentTask.id, { folderId }, token);
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? { ...task, folderId } : task
      ));
      setOpenMoveDialog(false);
      handleMenuClose();
    } catch (err) {
      console.error('Error moving task:', err);
      setError(err.message);
    }
  };

  const handleRename = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await dbService.updateTask(currentTask.id, { name: newName }, token);
      setTasks(tasks.map(task => 
        task.id === currentTask.id ? { ...task, name: newName } : task
      ));
      setOpenRenameDialog(false);
      handleMenuClose();
    } catch (err) {
      console.error('Error renaming task:', err);
      setError(err.message);
    }
  };

  const createNewTask = () => {
    navigate('/editor', { state: { isNew: true } });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          My Tasks
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={createNewTask}
        >
          New Task
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    {task.name}
                  </Typography>
                  <IconButton
                    aria-label="more"
                    aria-controls="task-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleMenuOpen(e, task)}
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Folder: {task.folderName || 'No folder'}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" sx={{ 
                  whiteSpace: 'pre-line',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {task.description || 'No description'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Task Actions Menu */}
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(currentTask)}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          setNewName(currentTask.name);
          setOpenRenameDialog(true);
        }}>
          <CreateIcon sx={{ mr: 1 }} /> Rename
        </MenuItem>
        <MenuItem onClick={() => setOpenMoveDialog(true)}>
          <MoveIcon sx={{ mr: 1 }} /> Move
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Rename Dialog */}
      <Dialog open={openRenameDialog} onClose={() => setOpenRenameDialog(false)}>
        <DialogTitle>Rename Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New name"
            fullWidth
            variant="standard"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRenameDialog(false)}>Cancel</Button>
          <Button onClick={handleRename}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={openMoveDialog} onClose={() => setOpenMoveDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Move Task</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select destination folder:
          </Typography>
          
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {folders.map((folder) => (
              <ListItem 
                button 
                key={folder.id}
                onClick={() => handleMove(folder.id)}
                selected={currentTask?.folderId === folder.id}
              >
                <ListItemText primary={folder.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMoveDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TasksViewer;