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

export const deleteFromIndexedDB = (storeName, key) => {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = (error) => reject(error);
    });
};

export const updateIndexedDB = (storeName, key, newData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            const request = store.get(key);
            request.onsuccess = (event) => {
                const existingData = event.target.result;
                if (!existingData) {
                    reject(`Item com chave ${key} não encontrado.`);
                    return;
                }

                // Mescla os dados antigos com os novos
                const updatedData = { ...existingData, ...newData };

                const updateRequest = store.put(updatedData);
                updateRequest.onsuccess = () => resolve();
                updateRequest.onerror = (error) => reject(error);
            };

            request.onerror = (error) => reject(error);
        } catch (error) {
            reject(error);
        }
    });
};

export const getAllFromIndexedDB = (storeName) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const request = store.getAll();
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (error) => reject(error);
      } catch (error) {
        reject(error);
      }
    });
  };
