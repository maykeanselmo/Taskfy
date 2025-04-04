import { useEditor } from '../../context/EditorContext';
import { List } from '@mui/material';
import FolderItem from './FolderItem';

const FolderTree = () => {
  const { folders } = useEditor();

  const renderTree = (items) => (
    <List component="div" disablePadding>
      {items.map((item) => (
        <FolderItem key={item.id} item={item} />
      ))}
    </List>
  );

  return <>{renderTree(folders)}</>;
};

export default FolderTree;