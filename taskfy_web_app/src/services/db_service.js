import Folder from '../model/folder';
import User from '../model/user';
import Task from '../model/task';

import { API_BASE_URL } from './controller/const';

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
  deleteUser,
  getUserByEmail
} from './controller//user';

import {
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
  getTasksByFolder,
  updateTaskStatus,
} from './controller/task';

class DatabaseService {
  constructor() {
    this.dbName = 'taskfy';
  }

  async login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json' // Descomente se necessário
            },
            body: JSON.stringify({
                email: email.trim(),
                password: password
            })
        });

        const responseText = await response.text();
        
        let responseData;
        
        try {
            responseData = JSON.parse(responseText);  // Tenta converter a resposta em JSON
        } catch (e) {
            responseData = { message: responseText };  // Caso a conversão falhe, retorna o texto da resposta
        }

        // Verifique a resposta para garantir que o login foi bem-sucedido
        if (response.ok) {
            // Sucesso no login, você pode armazenar o token ou fazer algo com a resposta
            return responseData; // Aqui você pode retornar os dados do usuário ou o token, dependendo da API
        } else {
            // Se a resposta não for OK, lance um erro com a mensagem da API
            throw new Error(responseData.message || 'Login falhou');
        }

    } catch (error) {
        console.error("Erro no login:", error.message);
        throw error; // Reenvia o erro para quem chamou a função
    }
  };

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
        return localFolder;
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }
  }

  async getFolder(id, token) {
      try {
          const apiFolder = await getFolderById(id, token);
          return apiFolder;
      } catch (apiError) {
          console.warn('Falling back to local storage for folder:', id);

      }
  }

  async deleteFolder(id, token){
    try {
      const resp = await deleteFolder(id, token)
      return resp
    } catch (error) {
      console.warn(error)
    }
  }

  async getSubFolders(id, token) {
    try {
      const resp = await getSubFolders(id, token)
      return resp
    } catch (error) {
      console.warn(error)
    }
  }

  async getRootFoldersByUser(userid, token) {
    try {
      const resp = await getRootFoldersByUser(userid, token)
      return resp
    } catch (error) {
      console.warn(error)
    }
  }

////////////////////////////// USER //////////////////////////////
  async createUser(userData) {
    try {
        const apiUser = await createUser(userData);
        console.log(apiUser)
        return localUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
  }
  async deleteFolder(id, token){
    try {
      const resp = await deleteFolder(id, token)
      return resp
    } catch (error) {
      console.warn(error)
    }
  }

  async getSubFolders(id, token) {
    try {
      const resp = await getSubFolders(id, token)
      return resp
    } catch (error) {
      console.warn(error)
    }
  }

  async getRootFoldersByUser(userid, token) {
    try {
      const resp = await getRootFoldersByUser(userid, token)
      return resp
    } catch (error) {
      console.warn(error)
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
        console.log(localUser)
        return localUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
  }

  async getUserByEmail(email, token) {
      try {
          const apiUser = await getUserByEmail(email, token);
          console.log(apiUser)
          return apiUser;
      } catch (apiError) {
          console.warn(apiError);

      }
  }

  async updateUser(id, userData, token) {
      try {
          const apiUser = await updateUser(id, userData, token);

          return apiUser;
      } catch (error) {
          console.error('Error updating user:', error);
          throw error;
      }
  }
  async getUserByEmail(email, token) {
      try {
          const apiUser = await getUserByEmail(email, token);
          console.log(apiUser)
          return apiUser;
      } catch (apiError) {
          console.warn(apiError);

      }
  }

  async updateUser(id, userData, token) {
      try {
          const apiUser = await updateUser(id, userData, token);

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
        return localTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
  }

  async getTask(id, token) {
    try {
        const apiTask = await getTaskById(id, token);
        return apiTask;
    } catch (apiError) {
        console.warn('Falling back to local storage for task:', id);
    }
  }
  async deleteUser(id, token) {
      try {
          await deleteUser(id, token);
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
        return localTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
  }

  async getFolderById(id, token) {
    try {
        const apiFolder = await getFolderById(id, token);
        return apiFolder;
    } catch (apiError) {
        console.warn('Falling back to local storage for folder:', id);
    }
  }

  async getTask(id, token) {
    try {
        const apiTask = await getTaskById(id, token);
        return apiTask;
    } catch (apiError) {
        console.warn('Falling back to local storage for task:', id);
    }
  }

  async deleteTask(id, token) {
    try {
        await deleteTask(id, token);
        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
  }


  async updateTask(id, taskData, token) {
    try {
        const apiTask = await updateTask(id, taskData, token);
        return apiTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
  }

  async getTasksByFolder(folderId, token) {
    try {
        console.log('Tasks for folder', folderId, ':', token);
        const resp  = await getTasksByFolder(folderId, token);
        console.log(resp)
        return resp

    } catch (error) {
        console.error('Error fetching tasks by folder:', error);
    }
  }

  async updateTaskStatus(id, statusUpdate, token) {
    try {
        const apiTask = await updateTaskStatus(id, statusUpdate, token);
        return apiTask;
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
  }
  async updateTaskStatus(id, statusUpdate, token) {
    try {
        const apiTask = await updateTaskStatus(id, statusUpdate, token);
        return apiTask;
    } catch (error) {
        console.error(error);
        return []; // Retorna um array vazio para evitar falhas no frontend
        console.error('Error updating task status:', error);
        throw error;
    }
  }
}

// Exportando uma instância única para ser usada globalmente
export const dbService = new DatabaseService();
