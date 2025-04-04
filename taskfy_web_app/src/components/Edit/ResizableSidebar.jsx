import { useEditor } from '../../context/EditorContext';
import { FolderTree, TagManager } from './';
import { Paper, Box, Divider, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ResizableSidebar = () => {
  const { sidebarWidth, dispatch } = useEditor();
  const navigate = useNavigate();

  const startResizing = (e) => {
    dispatch({ type: 'START_RESIZING' });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1">EXPLORER</Typography>
        <Box>
          <IconButton onClick={() => navigate('/settings')} size="small">
            <SettingsIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => dispatch({ type: 'SET_DIALOG', payload: { open: true, type: 'newFolder' } })}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <FolderTree />
      <TagManager />
      <Box
        sx={{
          width: '4px',
          cursor: 'col-resize',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          '&:hover': { backgroundColor: 'primary.main' }
        }}
        onMouseDown={startResizing}
      />
    </Paper>
  );
};

export default ResizableSidebar;