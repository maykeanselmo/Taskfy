import { createContext, useContext, useReducer } from 'react';

const EditorContext = createContext();

const initialState = {
  folders: [],
  openFiles: [],
  activeFile: null,
  expandedFolders: [],
  currentFolder: null,
  sidebarWidth: 240,
  dialogOpen: false,
  dialogType: '',
  dialogValue: '',
  tagInput: '',
  selectedItem: null
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FOLDERS':
      return { ...state, folders: action.payload };
    case 'TOGGLE_FOLDER':
      return {
        ...state,
        expandedFolders: state.expandedFolders.includes(action.payload)
          ? state.expandedFolders.filter(id => id !== action.payload)
          : [...state.expandedFolders, action.payload]
      };
    case 'OPEN_FILE':
      return {
        ...state,
        openFiles: state.openFiles.some(f => f.id === action.payload.id)
          ? state.openFiles
          : [...state.openFiles, action.payload],
        activeFile: action.payload
      };
    case 'UPDATE_FILE_CONTENT':
      return {
        ...state,
        openFiles: state.openFiles.map(file =>
          file.id === action.payload.fileId
            ? { ...file, content: action.payload.content }
            : file
        ),
        activeFile: {
          ...state.activeFile,
          content: action.payload.content
        }
      };
    case 'SET_DIALOG':
      return {
        ...state,
        dialogOpen: action.payload.open,
        dialogType: action.payload.type || '',
        dialogValue: action.payload.value || '',
        currentFolder: action.payload.folder || null
      };
    case 'CLOSE_DIALOG':
      return { ...state, dialogOpen: false };
    default:
      return state;
  }
};

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const value = {
    ...state,
    dispatch,
    setFolders: (folders) => dispatch({ type: 'SET_FOLDERS', payload: folders }),
    toggleFolder: (id) => dispatch({ type: 'TOGGLE_FOLDER', payload: id }),
    openFile: (file) => dispatch({ type: 'OPEN_FILE', payload: file }),
    updateFileContent: (fileId, content) =>
      dispatch({ type: 'UPDATE_FILE_CONTENT', payload: { fileId, content } }),
    openDialog: (type, folder) =>
      dispatch({ type: 'SET_DIALOG', payload: { open: true, type, folder } }),
    closeDialog: () => dispatch({ type: 'CLOSE_DIALOG' })
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within EditorProvider');
  return context;
};