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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Paper,
  CssBaseline,
  Chip
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
  NoteAdd as NewTaskIcon,
  Label as TagIcon
} from '@mui/icons-material';

import { dbService } from '../services/db_service';

const Editor = () => {
  const [parentFolderId, setParentFolderId] = useState(null);
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
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
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('email');
  const [allTasks, setAllTasks] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('authToken');
         if (!token) {
           navigate('/login');
           return;
         }
  
        // Carrega as pastas raiz
        const user = await dbService.getUserByEmail(email, token);
        console.log('User:', user);
        const rootFolders = await dbService.getRootFoldersByUser(user.id, token);
        console.log('Root Folders:', rootFolders);
  
        let allTasks = []; // Declare allTasks to hold tasks from all folders
  
        for (const folder of rootFolders) {
          try {
            // Obtem as tarefas para o rootFolder atual
            const tasks = await dbService.getTasksByFolder(folder.id, token);
            console.log('Tasks for folder', folder.id, ':', tasks);
  
            // Adiciona as tarefas ao array de todas as tarefas
            allTasks.push(...tasks); // Add tasks to allTasks
          } catch (error) {
            console.error(`Erro ao buscar tarefas para a pasta ${folder.id}:`, error);
          }
        }
  
        const mappedFolders = rootFolders.map(folder => ({
          ...folder,
          type: 'folder',
          name: folder.name || 'Unnamed', // Garanta que o nome está sendo mapeado
          children: allTasks
            .filter(task => task.folderId === folder.id)
            .map(task => ({
              ...task,
              type: 'task',
              content: task.description || ''
            }))
        }));

        setFolders(mappedFolders); // Update the state with mapped folders
        setExpandedFolders(mappedFolders.map(f => f.id)); // Expand the folders by default
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, email]);

    // Handle file selection
    const handleFileClick = async (file) => {
      if (file.type === 'folder') {
        if (expandedFolders.includes(file.id)) {
          setExpandedFolders(expandedFolders.filter(id => id !== file.id));
        } else {
          try {
            const token = localStorage.getItem('authToken');
            const subFolders = await dbService.getSubFolders(file.id, token);
            const subTasks = await dbService.getTasksByFolder(file.id, token);

            const updatedChildren = [
              ...subFolders.map(f => ({ ...f, type: 'folder', children: [] })),
              ...subTasks.map(t => ({ ...t, type: 'task', content: t.description || '' }))
            ];
  
            setFolders(prev => updateFolderStructure(prev, file.id, updatedChildren));
            setExpandedFolders([...expandedFolders, file.id]);
          } catch (error) {
            console.error('Error loading folder contents:', error);
          }
        }
        return;
      }
  
      setActiveFile(file);
      setFileContent(file.content);
      setSelectedItem(file);
      
      if (!openFiles.some(f => f.id === file.id)) {
        setOpenFiles([...openFiles, file]);
      }
    };
  
    // Atualiza a estrutura de pastas recursivamente
    const updateFolderStructure = (folders, folderId, newChildren) => {
      return folders.map(folder => {
        if (folder.id === folderId) {
          return { ...folder, children: newChildren };
        }
        if (folder.children) {
          return { ...folder, children: updateFolderStructure(folder.children, folderId, newChildren) };
        }
        return folder;
      });
    };
  
    // Handle content change
    const handleContentChange = (e) => {
      const newContent = e.target.value;
      setFileContent(newContent);
      
      // Atualiza na lista de arquivos abertos
      setOpenFiles(openFiles.map(file => 
        file.id === activeFile.id ? { ...file, content: newContent } : file
      ));
      
      // Atualiza a posição do cursor
      const lines = newContent.substr(0, e.target.selectionStart).split('\n');
      setCursorPosition({
        line: lines.length,
        column: lines[lines.length - 1].length + 1
      });
    };

      // Handle create new item
      const handleDialogSubmit = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/login');
                return;
            }

            if (dialogType === 'newFolder') {
              const user = await dbService.getUserByEmail(email, token);
              console.log('User:', user);
              const folderData = {
                name: dialogValue,
                parentId: currentFolder?.id || null,
                user: user
              }
              const newFolder = await dbService.createFolder(folderData, token);
              console.log('Folder created:', newFolder); // Log da resposta

              setFolders(prev => currentFolder
                ? updateFolderStructure(prev, currentFolder.id, [
                    ...(currentFolder.children || []),
                    {
                      ...newFolder,
                      type: 'folder',
                      name: newFolder.name, // Garanta que o nome está incluído
                      children: []
                    }
                  ])
                : [...prev, {
                    ...newFolder,
                    type: 'folder',
                    name: newFolder.name, // Garanta que o nome está incluído
                    children: []
                  }]
              );
            } else if (dialogType === 'newTask') {
                const taskData = {
                    name: dialogValue,
                    description: '',
                    folderId: currentFolder?.id || null,
                    status: 'PENDING'
                };
                const newTask = await dbService.createTask(taskData, token);
                setFolders(prev => currentFolder
                    ? updateFolderStructure(prev, currentFolder.id, [
                        ...(currentFolder.children || []),
                        { ...newTask, type: 'task', content: '' }
                    ])
                    : [...prev, { ...newTask, type: 'task', content: '' }]
                );
            } else if (dialogType === 'rename') {
                if (currentFolder.type === 'folder') {
                    await dbService.updateFolder(currentFolder.id, { name: dialogValue }, token);
                } else if (currentFolder.type === 'task') {
                    await dbService.updateTask(currentFolder.id, { name: dialogValue }, token);
                }
    
                setFolders(prev => updateFolderStructure(prev, currentFolder.id, { ...currentFolder, name: dialogValue }));
            }

            setOpenDialog(false);
        } catch (error) {
            console.error('Erro ao criar/atualizar item:', error.message);
        }
    };

    // Handle delete item
    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }
  
        if (currentFolder.type === 'folder') {
          await dbService.deleteFolder(currentFolder.id, token);
        } else if (currentFolder.type === 'task') {
          await dbService.deleteTask(currentFolder.id, token);
        }
  
        // Remove da estrutura de pastas
        const removeFromFolders = (items) => {
          return items.filter(item => item.id !== currentFolder.id).map(item => {
            if (item.children) {
              return { ...item, children: removeFromFolders(item.children) };
            }
            return item;
          });
        };
        
        setFolders(removeFromFolders(folders));
        
        // Remove dos arquivos abertos
        setOpenFiles(openFiles.filter(file => file.id !== currentFolder.id));
        
        // Fecha se for o arquivo ativo
        if (activeFile?.id === currentFolder.id) {
          setActiveFile(openFiles.find(file => file.id !== currentFolder.id) || null);
        }
        
        handleMenuClose();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    const file = openFiles[newValue];
    setActiveFile(file);
    setFileContent(file.content);
    setSelectedItem(file);
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

  useEffect(() => {
    if (activeFile) {
      const current = openFiles.find(f => f.id === activeFile.id);
      if (!current) {
        setSelectedItem(null);
      } else {
        setSelectedItem(current);
      }
    }
  }, [openFiles, activeFile]);

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

  const handleAddTag = () => {
    if (tagInput.trim() && selectedItem && selectedItem.type === 'task') {
      const updateTags = (items) => items.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, tags: [...new Set([...item.tags, tagInput.trim()])] };
        }
        if (item.children) {
          return { ...item, children: updateTags(item.children) };
        }
        return item;
      });
      setFolders(updateTags(folders));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (selectedItem && selectedItem.type === 'task') {
      const updateTags = (items) => items.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, tags: item.tags.filter(tag => tag !== tagToRemove) };
        }
        if (item.children) {
          return { ...item, children: updateTags(item.children) };
        }
        return item;
      });
      setFolders(updateTags(folders));
    }
  };

  // Render folder tree recursively
  const renderFolder = (folder) => {
    const isExpanded = expandedFolders.includes(folder.id);
    const icon = {
      'folder': <FolderIcon fontSize="small" />,
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
            <ListItemText 
              primary={folder.name || 'Unnamed Folder'} // Fallback para nome vazio
              primaryTypographyProps={{
                noWrap: true,
                title: folder.name // Tooltip com nome completo
              }}
            />
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

  const saveFolder = () => {
    activeFile
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      
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
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '3px' }
          }}
        >
          <List>
            {folders.map(folder => renderFolder(folder))}
          </List>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <TextField 
            label="Add Tag" 
            value={tagInput} 
            onChange={(e) => setTagInput(e.target.value)}
            fullWidth
            size="small"
          />
          <Button 
            onClick={handleAddTag}
            variant="contained"
            size="small"
            fullWidth
            sx={{ mt: 1 }}
            startIcon={<TagIcon />}
          >
            Add Tag
          </Button>
          {selectedItem?.type === 'task' && (
            <Box sx={{ mt: 2 }}>
              {selectedItem.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  sx={{ m: 0.5 }}
                  size="small"
                />
              ))}
            </Box>
          )}
        </Box>

        <Box 
          sx={{
            width: '4px',
            cursor: 'col-resize',
            '&:hover': { backgroundColor: 'primary.main' }
          }}
          onMouseDown={startResizing}
        />
      </Paper>
      
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
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                      const newOpenFiles = openFiles.filter((_, i) => i !== index);
                      setOpenFiles(newOpenFiles);
                      if (file.id === activeFile?.id) {
                        const newActiveFile = newOpenFiles[index + 1] || newOpenFiles[index - 1] || null;
                        setActiveFile(newActiveFile);
                        setSelectedItem(newActiveFile);
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
