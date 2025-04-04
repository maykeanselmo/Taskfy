import { useEditor } from '../../context/EditorContext';
import { Tabs, Tab, AppBar } from '@mui/material';
import TabItem from './TabItem';

const EditorTabs = () => {
  const { openFiles, activeFile, dispatch } = useEditor();

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Tabs
        value={openFiles.findIndex((file) => file.id === activeFile?.id)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {openFiles.map((file, index) => (
          <TabItem key={file.id} file={file} index={index} />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default EditorTabs;