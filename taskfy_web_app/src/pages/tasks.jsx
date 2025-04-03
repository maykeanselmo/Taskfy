import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
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
  Box
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


// Dummy data
const initialNotes = [
  { id: 1, title: "Meeting Notes", content: "Discuss project timeline with team", folder: "Work" },
  { id: 2, title: "Shopping List", content: "Milk, eggs, bread, fruits", folder: "Personal" },
  { id: 3, title: "Ideas for Blog", content: "1. React hooks\n2. Material UI tips\n3. State management", folder: "Ideas" },
];

const dummyFolders = ["Work", "Personal", "Ideas", "Projects"];

function TasksViewer() {
  const token = localStorage.getItem("authToken");
  const [tasks, setTasks] = useState(initialNotes);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await dbService.getAllTasks(token);
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []); // O array vazio garante que só roda ao montar o componente

  // Menu handlers
  const handleMenuOpen = (event, note) => {
    setAnchorEl(event.currentTarget);
    setCurrentNote(note);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentNote(null);
  };

  // Note operations
  const handleEdit = (note) => {
    // Dummy API call simulation
    console.log("Editing note:", note.id);
    navigate('/editor', { state: { note } });
  };

  const handleDelete = (noteId) => {
    // Dummy API call simulation
    console.log("Deleting note:", noteId);
    setTasks(tasks.filter(note => note.id !== noteId));
    handleMenuClose();
  };

  const handleMove = () => {
    setOpenMoveDialog(true);
    handleMenuClose();
  };

  const handleRename = () => {
    setNewName(currentNote.title);
    setOpenRenameDialog(true);
    handleMenuClose();
  };

  const confirmRename = () => {
    // Dummy API call simulation
    console.log("Renaming note:", currentNote.id, "to", newName);
    setTasks(tasks.map(note => 
      note.id === currentNote.id ? { ...note, title: newName } : note
    ));
    setOpenRenameDialog(false);
  };

  const confirmMove = (folder) => {
    // Dummy API call simulation
    console.log("Moving note:", currentNote.id, "to folder:", folder);
    setTasks(tasks.map(note => 
      note.id === currentNote.id ? { ...note, folder } : note
    ));
    setOpenMoveDialog(false);
  };

  const createNewFolder = () => {
    // Dummy API call simulation
    console.log("Creating new folder:", newFolderName);
    dummyFolders.push(newFolderName);
    setNewFolderName("");
  };

  const createNewNote = () => {
    navigate('/editor', { state: { isNew: true } });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          My Notes
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={createNewNote}
        >
          New Note
        </Button>
      </Box>

      <Grid container spacing={3}>
        {tasks.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
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
                    {note.title}
                  </Typography>
                  <IconButton
                    aria-label="more"
                    aria-controls="note-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleMenuOpen(e, note)}
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Folder: {note.folder}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" sx={{ 
                  whiteSpace: 'pre-line',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {note.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Note Actions Menu */}
      <Menu
        id="note-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(currentNote)}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleRename}>
          <CreateIcon sx={{ mr: 1 }} /> Rename
        </MenuItem>
        <MenuItem onClick={handleMove}>
          <MoveIcon sx={{ mr: 1 }} /> Move
        </MenuItem>
        <MenuItem onClick={() => handleDelete(currentNote.id)} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Rename Dialog */}
      <Dialog open={openRenameDialog} onClose={() => setOpenRenameDialog(false)}>
        <DialogTitle>Rename Note</DialogTitle>
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
          <Button onClick={confirmRename}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={openMoveDialog} onClose={() => setOpenMoveDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Move Note</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Select destination folder:
          </Typography>
          
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {dummyFolders.map((folder) => (
              <ListItem 
                button 
                key={folder}
                onClick={() => confirmMove(folder)}
                selected={currentNote?.folder === folder}
              >
                <ListItemText primary={folder} />
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              label="New folder"
              fullWidth
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <Tooltip title="Create folder">
              <IconButton 
                color="primary" 
                onClick={createNewFolder}
                disabled={!newFolderName.trim()}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMoveDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TasksViewer;