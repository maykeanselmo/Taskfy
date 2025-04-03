import Folder from '../model/folder';
import User from '../model/user';
import Task from '../model/task';

import { 
  createFolder,
  getFolderById,
  deleteFolder,
  getFoldersByUser,
  getRootFoldersByUser,
  getSubFolders,
  updateFolder
} from './controller/folder';

import { 
  createUser,
  getUserById,
  updateUser,
  getAllUsers,
  updatePassword,
  deleteUser
} from './controller//user';

import { 
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
  getTasksByFolder,
  updateTaskStatus,
  getAllTasks
} from './controller/task';

class DatabaseService {
  constructor() {
    this.dbName = 'taskfy';
  }

  async save(storeName, data) {
    return saveToIndexedDB(storeName, data);
  }

  async get(storeName, key) {
    return getFromIndexedDB(storeName, key);
  }

  async delete(storeName, key) {
    return deleteFromIndexedDB(storeName, key);
  }

  async update(storeName, key, newData) {
    return updateIndexedDB(storeName, key, newData);
  }

  async getAll(storeName) {
    return getAllFromIndexedDB(storeName);
  }

////////////////////////////// FOLDER //////////////////////////////
  async createFolder(folderData, token) {
    try {
        // Primeiro tenta criar na API
        const apiFolder = await createFolder(folderData, token);

        // Se sucesso, salva localmente
        const localFolder = new Folder({
            ...apiFolder,
            id: apiFolder.id
        });

        await this.save('folders', localFolder);
        return localFolder;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
  }

  async getFolder(id, token) {
      try {
          // Tenta buscar da API primeiro
          const apiFolder = await getFolderById(id, token);

          // Atualiza cache local
          await this.save('folders', apiFolder);
          return apiFolder;
      } catch (apiError) {
          console.warn('Falling back to local storage for folder:', id);
          return this.get('folders', id); // Fallback para IndexedDB
      }
  }

////////////////////////////// USER //////////////////////////////
  async createUser(userData) {
    try {
        const apiUser = await createUser(userData);
        const localUser = new User({
            ...apiUser,
            id: apiUser.id
        });

        await this.save('users', localUser);
        return localUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
  }

  async getUser(id, token) {
      try {
          const apiUser = await getUserById(id, token);
          await this.save('users', apiUser);
          return apiUser;
      } catch (apiError) {
          console.warn('Falling back to local storage for user:', id);
          return this.get('users', id);
      }
  }

  async updateUser(id, userData, token) {
      try {
          const apiUser = await updateUser(id, userData, token);
          await this.save('users', apiUser);
          return apiUser;
      } catch (error) {
          console.error('Error updating user:', error);
          throw error;
      }
  }

  async getAllUsers(token, page, size, sortBy, direction) {
      try {
          return await getAllUsers(token, page, size, sortBy, direction);
      } catch (error) {
          console.error('Error fetching users:', error);
          return this.getAll('users'); // Fallback local
      }
  }

  async updatePassword(id, passwordData, token) {
      try {
          return await updatePassword(id, passwordData, token);
      } catch (error) {
          console.error('Error updating password:', error);
          throw error;
      }
  }

  async deleteUser(id, token) {
      try {
          await deleteUser(id, token);
          await this.delete('users', id); // Remove localmente também
          return true;
      } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
      }
  }

////////////////////////////// TASK //////////////////////////////
  async createTask(taskData, token) {
    try {
        const apiTask = await createTask(taskData, token);
        const localTask = new Task({
            ...apiTask,
            id: apiTask.id
        });
        await this.save('tasks', localTask);
        return localTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
  }

  async getTask(id, token) {
    try {
        const apiTask = await getTaskById(id, token);
        await this.save('tasks', apiTask);
        return apiTask;
    } catch (apiError) {
        console.warn('Falling back to local storage for task:', id);
        return this.get('tasks', id);
    }
  }

  async deleteTask(id, token) {
    try {
        await deleteTask(id, token);
        await this.delete('tasks', id);
        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
  }

  async updateTask(id, taskData, token) {
    try {
        const apiTask = await updateTask(id, taskData, token);
        await this.save('tasks', apiTask);
        return apiTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
  }

  async getTasksByFolder(folderId, token) {
    try {
        return await getTasksByFolder(folderId, token);
    } catch (error) {
        console.error('Error fetching tasks by folder:', error);
        // Fallback: Get all local tasks and filter by folderId
        const allTasks = await this.getAll('tasks');
        return allTasks.filter(task => task.folderId === folderId);
    }
  }

  async updateTaskStatus(id, statusUpdate, token) {
    try {
        const apiTask = await updateTaskStatus(id, statusUpdate, token);
        await this.save('tasks', apiTask);
        return apiTask;
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
  }

  async getAllTasks(token) {
    try {
        return await getAllTasks(token);
    } catch (error) {
        console.error('Error fetching all tasks:', error);
        return this.getAll('tasks'); // Fallback to local storage
    }
  }

}

// Exportando uma instância única para ser usada globalmente
export const dbService = new DatabaseService();
