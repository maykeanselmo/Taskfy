const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('taskfy', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Criar object stores (tabelas) se não existirem
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' }); // O id será a chave primária
        }
        if (!db.objectStoreNames.contains('folders')) {
          db.createObjectStore('folders', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };


export  const saveToIndexedDB = (storeName, data) => {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.put(data); // Usando put para atualizar ou adicionar um novo item
        request.onsuccess = () => resolve();
        request.onerror = (error) => reject(error);
    });
};

export  const getFromIndexedDB = (storeName, key) => {
    return new Promise(async (resolve, reject) => {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
  
      const request = store.get(key);
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (error) => reject(error);
    });
  };
