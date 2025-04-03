import { useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0feb1d9ecdb5f268850916863d8e65ee2b987c0d
import { dbService }  from '../services/db_service';
=======
import dbService from '../services/db_service';
>>>>>>> 1a21ff2 (fix: Bugs ao criar classe para abstrair o indexd)
=======
import dbService from '../services/db_service';
>>>>>>> 1a21ff2 (fix: Bugs ao criar classe para abstrair o indexd)
<<<<<<< HEAD
=======
import dbService from '../services/db_service';
>>>>>>> 1a21ff2 (fix: Bugs ao criar classe para abstrair o indexd)
=======
>>>>>>> 0feb1d9ecdb5f268850916863d8e65ee2b987c0d
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