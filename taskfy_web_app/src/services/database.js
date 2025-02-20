import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('TaskAppDB', 1, {
    upgrade(db) {
      // Tabela `users`
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }

      // Tabela `folders`
      if (!db.objectStoreNames.contains('folders')) {
        const store = db.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
        store.createIndex('user_id', 'user_id'); // Index para buscar pastas por usuário
        store.createIndex('parent_id', 'parent_id'); // Para hierarquia de pastas
      }

      // Tabela `tasks`
      if (!db.objectStoreNames.contains('tasks')) {
        const store = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        store.createIndex('folder_id', 'folder_id'); // Para buscar tarefas por pasta
      }

      // Tabela `tags`
      if (!db.objectStoreNames.contains('tags')) {
        db.createObjectStore('tags', { keyPath: 'id', autoIncrement: true });
      }

      // Tabela `tasks_tags` (relacionamento N:M)
      if (!db.objectStoreNames.contains('tasks_tags')) {
        const store = db.createObjectStore('tasks_tags', { keyPath: 'id', autoIncrement: true });
        store.createIndex('task_id', 'task_id');
        store.createIndex('tag_id', 'tag_id');
      }
    },
  });
};


