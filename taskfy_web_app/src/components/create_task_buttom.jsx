import { useState } from 'react';
import dbService from '../services/db_service';
function CreateTaskButton() {
  const addTask = useCreateTask();
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    setLoading(true);

    try {
      const newTask = await dbService.createTask({
        title: 'Nova Tarefa',
        content: 'Conteúdo da nova tarefa',
        folder_id: 1,
      });

      addTask(newTask);
      alert('Tarefa criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddTask} disabled={loading}>
      {loading ? 'Criando Tarefa...' : 'Adicionar Tarefa'}
    </button>
  );
}


export default CreateTaskButton