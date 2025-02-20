import { openDB } from 'idb';

const getDB = async () => await openDB('TaskAppDB', 1);

export const addTask = async (task) => {
  const db = await getDB();
  return db.transaction('tasks', 'readwrite').objectStore('tasks').add(task);
};

export const getTasks = async (folderId) => {
  const db = await getDB();
  return db.transaction('tasks').objectStore('tasks').index('folder_id').getAll(folderId);
};

export const updateTask = async (id, updatedFields) => {
  const db = await getDB();
  const tx = db.transaction('tasks', 'readwrite');
  const store = tx.objectStore('tasks');
  const task = await store.get(id);
  Object.assign(task, updatedFields);
  await store.put(task);
  await tx.done;
};

export const deleteTask = async (id) => {
  const db = await getDB();
  return db.transaction('tasks', 'readwrite').objectStore('tasks').delete(id);
};
