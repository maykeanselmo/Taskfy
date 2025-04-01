import { getUserByUsername, saveToIndexedDB, getFromIndexedDB, deleteFromIndexedDB, updateIndexedDB, getAllFromIndexedDB } from './indexdb';
import Folder from '../model/folder';
import User from '../model/user';
import Task from '../model/task';

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

  // Métodos específicos para Users
  async createUser(userData) {
    const user = new User(userData);
    console.log('Dados do usuário a serem salvos:', user);
    return this.save('users', user);
  }

  async getUser(id) {
    return this.get('users', id);
  }

  async getUserByUsername(username) {
    return getUserByUsername(username);
  }

  async updateUser(id, newData) {
    return this.update('users', id, newData);
  }

  async deleteUser(id) {
    return this.delete('users', id);
  }

  async getAllUsers() {
    return this.getAll('users');
  }

  // Métodos específicos para Folders
  async createFolder(folderData) {
    return this.save('folders', new Folder(folderData));
  }

  async getFolder(id) {
    return this.get('folders', id);
  }

  async updateFolder(id, newData) {
    return this.update('folders', id, newData);
  }

  async deleteFolder(id) {
    return this.delete('folders', id);
  }

  async getAllFolders() {
    return this.getAll('folders');
  }

  // Métodos específicos para Tasks
  async createTask(taskData) {
    return this.save('tasks', new Task(taskData));
  }

  async getTask(id) {
    return this.get('tasks', id);
  }

  async updateTask(id, newData) {
    return this.update('tasks', id, newData);
  }

  async deleteTask(id) {
    return this.delete('tasks', id);
  }

  async getAllTasks() {
    return this.getAll('tasks');
  }

}

// Exportando uma instância única para ser usada globalmente
export const dbService = new DatabaseService();
