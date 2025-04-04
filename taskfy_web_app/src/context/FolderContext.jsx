import React, { createContext, useState } from "react";

export const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Projetos",
      parent: null,
      tasks: ["Criar UI", "Testar API"],
      subfolders: [{ id: 2, name: "Frontend", parent: 1, tasks: ["Revisar código"], subfolders: [] }]
    },
  ]);

  // Função para encontrar e atualizar uma pasta dentro de qualquer nível
  const updateFolderTree = (folders, folderId, callback) => {
    return folders.map(folder => {
      if (folder.id === folderId) {
        return callback(folder);
      } else if (folder.subfolders.length > 0) {
        return { ...folder, subfolders: updateFolderTree(folder.subfolders, folderId, callback) };
      }
      return folder;
    });
  };

  // Adiciona uma nova subpasta
  const addFolder = (name, parentId = null) => {
    const newFolder = {
      id: Date.now(),
      name,
      parent: parentId,
      tasks: [],
      subfolders: []
    };

    setFolders(prevFolders => {
      if (parentId === null) return [...prevFolders, newFolder];

      return updateFolderTree(prevFolders, parentId, folder => ({
        ...folder,
        subfolders: [...folder.subfolders, newFolder],
      }));
    });
  };

  // Adiciona uma nova task dentro de uma pasta específica
  const addTask = (taskName, folderId) => {
    setFolders(prevFolders => {
      return updateFolderTree(prevFolders, folderId, folder => ({
        ...folder,
        tasks: [...folder.tasks, taskName],
      }));
    });
  };

  // Deleta uma pasta
  const deleteFolder = (folderId) => {
    setFolders(prevFolders => {
      return prevFolders.filter(folder => folder.id !== folderId).map(folder => ({
        ...folder,
        subfolders: deleteSubfolder(folder.subfolders, folderId),
      }));
    });
  };

  // Deleta uma tarefa de uma pasta
  const deleteTask = (folderId, taskName) => {
    setFolders(prevFolders => {
      return updateFolderTree(prevFolders, folderId, folder => ({
        ...folder,
        tasks: folder.tasks.filter(task => task !== taskName),
      }));
    });
  };

  // Função auxiliar para deletar subpastas
  const deleteSubfolder = (subfolders, folderId) => {
    return subfolders.filter(subfolder => subfolder.id !== folderId).map(subfolder => ({
      ...subfolder,
      subfolders: deleteSubfolder(subfolder.subfolders, folderId),
    }));
  };

  return (
    <FolderContext.Provider value={{ folders, addFolder, addTask, deleteFolder, deleteTask }}>
      {children}
    </FolderContext.Provider>
  );
};