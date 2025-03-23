const openDatabase = () => {
<<<<<<< HEAD
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('taskfy', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('users')) {
        const usersStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        usersStore.createIndex('username', 'username', { unique: true }); // Index para busca por username
      }
      
      if (!db.objectStoreNames.contains('folders')) {
        db.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const saveToIndexedDB = (storeName, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      // Removendo 'id' se ele já existir para evitar conflito
      if ('id' in data) {
        delete data.id;
      }

      const request = store.add(data);

      // Quando o usuário é salvo com sucesso, o ID gerado é atribuído ao objeto
      request.onsuccess = (event) => {
        const savedUser = { ...data, id: event.target.result };  // Adiciona o ID gerado
        resolve(savedUser);  // Retorna o objeto com o ID gerado
      };

      request.onerror = (event) => reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
};


export const getFromIndexedDB = async (storeName, key) => {
  try {
    const db = await openDatabase();  // Espera o banco de dados ser aberto
    const transaction = db.transaction(storeName, 'readonly');  // Cria uma transação de leitura
    const store = transaction.objectStore(storeName);  // Acessa o objectStore

    const request = store.get(key);  // Tenta buscar o item pela chave

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result);  // Resolve com o item encontrado
      request.onerror = (error) => reject(error);  // Rejeita caso ocorra um erro
    });
  } catch (error) {
    throw new Error('Erro ao acessar o IndexedDB: ' + error.message);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const db = await openDatabase(); // Espera o banco de dados ser aberto
    const transaction = db.transaction('users', 'readonly'); // Transação de leitura na store 'users'
    const store = transaction.objectStore('users'); // Acessa o objectStore 'users'

    // Acessa o índice pelo 'username'
    const index = store.index('username');
    
    // Faz a busca no índice do 'username'
    const request = index.get(username);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result); // Retorna o usuário encontrado
      request.onerror = (error) => reject(error); // Lida com erro
    });
  } catch (error) {
    throw new Error('Erro ao acessar o IndexedDB: ' + error.message);
  }
};

=======
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
>>>>>>> 1a21ff2 (fix: Bugs ao criar classe para abstrair o indexd)

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
