const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('taskfy', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('users')) {
        const usersStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        usersStore.createIndex('username', 'username', { unique: true });
        usersStore.createIndex('email', 'email', { unique: true }); // Adicionei índice para email
      }

      if (!db.objectStoreNames.contains('folders')) {
        const foldersStore = db.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
        foldersStore.createIndex('userId', 'userId', { unique: false }); // Índice para relacionamento
      }

      if (!db.objectStoreNames.contains('tasks')) {
        const tasksStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        tasksStore.createIndex('folderId', 'folderId', { unique: false }); // Índice para relacionamento
        tasksStore.createIndex('userId', 'userId', { unique: false }); // Índice para relacionamento
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const saveToIndexedDB = async (storeName, data) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    // Verifica se é uma atualização ou inserção
    const operation = data.id ? 'put' : 'add';
    
    // Se for uma atualização, mantemos o id, caso contrário removemos (para autoIncrement)
    const dataToSave = data.id ? data : { ...data, id: undefined };

    return new Promise((resolve, reject) => {
      const request = store[operation](dataToSave);
      request.onsuccess = (event) => {
        // Para operações 'add', retornamos o novo id gerado
        const resultId = operation === 'add' ? event.target.result : data.id;
        resolve({ ...dataToSave, id: resultId });
      };
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao salvar no IndexedDB (${storeName}): ${error.message}`);
  }
};

export const getFromIndexedDB = async (storeName, key) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result || null); // Retorna null se não encontrado
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao obter dados do IndexedDB (${storeName}): ${error.message}`);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('users', 'readonly');
    const store = transaction.objectStore('users');
    const index = store.index('username');
    const request = index.get(username);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result || null); // Retorna null se não encontrado
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por username: ${error.message}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('users', 'readonly');
    const store = transaction.objectStore('users');
    const index = store.index('email');
    const request = index.get(email);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result || null);
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
  }
};

// Funções adicionais úteis
export const getAllFromIndexedDB = async (storeName) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result || []);
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao obter todos os dados do IndexedDB (${storeName}): ${error.message}`);
  }
};

export const deleteFromIndexedDB = async (storeName, key) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(true);
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao deletar do IndexedDB (${storeName}): ${error.message}`);
  }
};

export const updateIndexedDB = async (storeName, key, data) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data, key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(true);
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    throw new Error(`Erro ao atualizar no IndexedDB (${storeName}): ${error.message}`);
  }
};