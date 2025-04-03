import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  CssBaseline
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  MoreVert as MoreIcon,
  Settings as SettingsIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CreateNewFolder as NewFolderIcon,
  NoteAdd as NewTaskIcon
} from '@mui/icons-material';

// Dummy data for folders and tasks
const dummyFolders = [
  {
    id: '1',
    name: 'Project',
    type: 'folder',
    children: [
      { id: '1-1', name: 'index.js', type: 'file', content: 'console.log("Hello World");' },
      { id: '1-2', name: 'styles.css', type: 'file', content: 'body { margin: 0; }' }
    ]
  },
  {
    id: '2',
    name: 'Tasks',
    type: 'folder',
    children: [
      { 
        id: '2-1', 
        name: 'Urgent', 
        type: 'folder',
        children: [
          { id: '2-1-1', name: 'Fix bug', type: 'task', content: 'Fix the login bug' }
        ]
      }
    ]
  }
];

const Editor = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(dummyFolders);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [folderAnchorEl, setFolderAnchorEl] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogValue, setDialogValue] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(['1', '2']);

  // Handle file selection
  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      if (expandedFolders.includes(file.id)) {
        setExpandedFolders(expandedFolders.filter(id => id !== file.id));
      } else {
        setExpandedFolders([...expandedFolders, file.id]);
      }
      return;
    }

    setActiveFile(file);
    setFileContent(file.content);
    
    // Add to open files if not already there
    if (!openFiles.some(f => f.id === file.id)) {
      setOpenFiles([...openFiles, file]);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    const file = openFiles[newValue];
    setActiveFile(file);
    setFileContent(file.content);
  };

  // Handle content change
  const handleContentChange = (e) => {
    setFileContent(e.target.value);
    // Update in openFiles
    setOpenFiles(openFiles.map(file => 
      file.id === activeFile.id ? { ...file, content: e.target.value } : file
    ));
    // Update cursor position
    const lines = e.target.value.substr(0, e.target.selectionStart).split('\n');
    setCursorPosition({
      line: lines.length,
      column: lines[lines.length - 1].length + 1
    });
  };

  // Handle sidebar resize
  const startResizing = (e) => {
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 150 && newWidth < 400) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  // Context menu handlers
  const handleContextMenu = (e, folder) => {
    e.preventDefault();
    setFolderAnchorEl(e.currentTarget);
    setCurrentFolder(folder);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setFolderAnchorEl(null);
  };

  // Dialog handlers
  const handleDialogOpen = (type) => {
    setDialogType(type);
    setDialogValue('');
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSubmit = () => {
    if (dialogType === 'newFolder') {
      const newFolder = {
        id: `new-${Date.now()}`,
        name: dialogValue,
        type: 'folder',
        children: []
      };
      
      if (currentFolder) {
        // Add to current folder
        setFolders(folders.map(folder => 
          folder.id === currentFolder.id 
            ? { ...folder, children: [...folder.children, newFolder] } 
            : folder
        ));
      } else {
        // Add to root
        setFolders([...folders, newFolder]);
      }
    } else if (dialogType === 'newFile') {
      const newFile = {
        id: `new-${Date.now()}`,
        name: dialogValue,
        type: 'file',
        content: ''
      };
      
      if (currentFolder) {
        // Add to current folder
        setFolders(folders.map(folder => 
          folder.id === currentFolder.id 
            ? { ...folder, children: [...folder.children, newFile] } 
            : folder
        ));
      } else {
        // Add to root
        setFolders([...folders, newFile]);
      }
    } else if (dialogType === 'newTask') {
      const newTask = {
        id: `new-${Date.now()}`,
        name: dialogValue,
        type: 'task',
        content: ''
      };
      
      if (currentFolder) {
        // Add to current folder
        setFolders(folders.map(folder => 
          folder.id === currentFolder.id 
            ? { ...folder, children: [...folder.children, newTask] } 
            : folder
        ));
      } else {
        // Add to root
        setFolders([...folders, newTask]);
      }
    } else if (dialogType === 'rename') {
      // Update in folders structure
      const updateFolders = (items) => {
        return items.map(item => {
          if (item.id === currentFolder.id) {
            return { ...item, name: dialogValue };
          }
          if (item.children) {
            return { ...item, children: updateFolders(item.children) };
          }
          return item;
        });
      };
      
      const updatedFolders = updateFolders(folders);
      setFolders(updatedFolders);
      
      // Update in openFiles if this file is open
      setOpenFiles(openFiles.map(file => 
        file.id === currentFolder.id ? { ...file, name: dialogValue } : file
      ));
      
      // Update activeFile if this is the active file
      if (activeFile?.id === currentFolder.id) {
        setActiveFile({ ...activeFile, name: dialogValue });
      }
    }
    setOpenDialog(false);
  };

  const handleDelete = () => {
    if (currentFolder) {
      // Remove from folders structure
      const removeFromFolders = (items) => {
        return items.filter(item => item.id !== currentFolder.id).map(item => {
          if (item.children) {
            return { ...item, children: removeFromFolders(item.children) };
          }
          return item;
        });
      };
      
      setFolders(removeFromFolders(folders));
      
      // Remove from openFiles if open
      setOpenFiles(openFiles.filter(file => file.id !== currentFolder.id));
      
      // Close if this is the active file
      if (activeFile?.id === currentFolder.id) {
        setActiveFile(openFiles.find(file => file.id !== currentFolder.id) || null);
      }
    }
    handleMenuClose();
  };

  // Render folder tree recursively
  const renderFolder = (folder) => {
    const isExpanded = expandedFolders.includes(folder.id);
    const icon = {
      'folder': <FolderIcon fontSize="small" />,
      'file': <FileIcon fontSize="small" />,
      'task': <NewTaskIcon fontSize="small" />
    }[folder.type] || <FileIcon fontSize="small" />;
    
    return (
      <React.Fragment key={folder.id}>
        <ListItem 
          disablePadding 
          onContextMenu={(e) => handleContextMenu(e, folder)}
        >
          <ListItemButton 
            onClick={() => handleFileClick(folder)}
            sx={{ pl: folder.type === 'folder' ? 2 : 4 }}
          >
            {folder.type === 'folder' && (
              <ListItemIcon sx={{ minWidth: 24 }}>
                {isExpanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
              </ListItemIcon>
            )}
            <ListItemIcon sx={{ minWidth: 30 }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={folder.name} />
          </ListItemButton>
        </ListItem>
        
        {folder.type === 'folder' && isExpanded && folder.children && (
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {folder.children.map(child => renderFolder(child))}
          </List>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      
      {/* Left Sidebar */}
      <Paper 
        elevation={2} 
        sx={{ 
          width: sidebarWidth, 
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box 
          sx={{ 
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="subtitle1">EXPLORER</Typography>
          <Box>
            <IconButton 
              size="small" 
              onClick={() => navigate('/settings')}
              sx={{ mr: 1 }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={(e) => {
                setCurrentFolder(null);
                setAnchorEl(e.currentTarget);
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Divider />
        
        <Box 
          sx={{ 
            flexGrow: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '3px'
            }
          }}
        >
          <List>
            {folders.map(folder => renderFolder(folder))}
          </List>
        </Box>
        
        {/* Resize handle */}
        <Box 
          sx={{
            width: '4px',
            cursor: 'col-resize',
            '&:hover': {
              backgroundColor: 'primary.main'
            }
          }}
          onMouseDown={startResizing}
        />
      </Paper>
      
      {/* Add Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleDialogOpen('newFolder')}>
          <ListItemIcon>
            <NewFolderIcon fontSize="small" />
          </ListItemIcon>
          New Folder
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('newFile')}>
          <ListItemIcon>
            <FileIcon fontSize="small" />
          </ListItemIcon>
          New File
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('newTask')}>
          <ListItemIcon>
            <NewTaskIcon fontSize="small" />
          </ListItemIcon>
          New Task
        </MenuItem>
      </Menu>
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Tabs */}
        <AppBar position="static" color="default" elevation={0}>
          <Tabs
            value={openFiles.findIndex(file => file.id === activeFile?.id)}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {openFiles.map((file, index) => (
              <Tab 
                key={file.id}
                label={file.name}
                icon={
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenFiles(openFiles.filter((_, i) => i !== index));
                      if (file.id === activeFile?.id) {
                        setActiveFile(openFiles[index + 1] || openFiles[index - 1] || null);
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                iconPosition="end"
              />
            ))}
          </Tabs>
        </AppBar>
        
        {/* Editor Area */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {activeFile ? (
            <TextField
              multiline
              fullWidth
              value={fileContent}
              onChange={handleContentChange}
              sx={{ 
                height: '100%',
                '& .MuiInputBase-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  p: 2
                },
                '& .MuiInputBase-input': {
                  height: '100% !important',
                  overflow: 'auto !important',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }
              }}
            />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: 'text.secondary'
            }}>
              <Typography>Select a file to edit</Typography>
            </Box>
          )}
        </Box>
        
        {/* Status Bar */}
        <Box 
          sx={{ 
            p: 1,
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'background.default',
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="caption">
            {activeFile ? `${activeFile.name}` : 'No file selected'}
          </Typography>
          <Typography variant="caption">
            LN {cursorPosition.line}, COL {cursorPosition.column}
          </Typography>
        </Box>
      </Box>
      
      {/* Context Menu */}
      <Menu
        anchorEl={folderAnchorEl}
        open={Boolean(folderAnchorEl)}
        onClose={handleMenuClose}
      >
        {currentFolder?.type === 'folder' && [
          <MenuItem key="newFile" onClick={() => handleDialogOpen('newFile')}>
            <ListItemIcon>
              <FileIcon fontSize="small" />
            </ListItemIcon>
            New File
          </MenuItem>,
          <MenuItem key="newFolder" onClick={() => handleDialogOpen('newFolder')}>
            <ListItemIcon>
              <NewFolderIcon fontSize="small" />
            </ListItemIcon>
            New Folder
          </MenuItem>,
          <MenuItem key="newTask" onClick={() => handleDialogOpen('newTask')}>
            <ListItemIcon>
              <NewTaskIcon fontSize="small" />
            </ListItemIcon>
            New Task
          </MenuItem>,
          <Divider key="divider1" />
        ]}
        <MenuItem onClick={() => handleDialogOpen('rename')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Rename
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      
      {/* Dialog for creating/renaming */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogType === 'newFolder' && 'New Folder'}
          {dialogType === 'newFile' && 'New File'}
          {dialogType === 'newTask' && 'New Task'}
          {dialogType === 'rename' && 'Rename'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={dialogValue}
            onChange={(e) => setDialogValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSubmit} disabled={!dialogValue.trim()}>
            {dialogType === 'rename' ? 'Rename' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Editor;