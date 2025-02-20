export const syncWithBackend = async () => {
    const db = await getDB();
    const tasks = await db.transaction('tasks').objectStore('tasks').getAll();
  
    // Enviar tarefas locais para o servidor
    await fetch('/api/sync-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tasks),
    });
  
    // Receber tarefas atualizadas do servidor
    const response = await fetch('/api/sync-tasks');
    const updatedTasks = await response.json();
  
    // Atualizar IndexedDB
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    await Promise.all(updatedTasks.map((task) => store.put(task)));
  };
  