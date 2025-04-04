import { EditorProvider } from '../context/EditorContext';
import { ResizableSidebar } from './Sidebar/ResizableSidebar';
import EditorTabs from './Tabs/EditorTabs';
import EditorContent from './EditorMain/EditorContent';
import { CssBaseline, Box } from '@mui/material';
import FolderContextMenu from './ContextMenus/FolderContextMenu';
import CreateDialog from './Dialogs/CreateDialog';

const Editor = () => {
  return (
    <EditorProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <ResizableSidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <EditorTabs />
          <EditorContent />
        </Box>
        <FolderContextMenu />
        <CreateDialog />
      </Box>
    </EditorProvider>
  );
};

export default Editor;