import useCreateTask from '../hooks/create_task';

function CreateTaskButton() {
  const addTask = useCreateTask();

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      folder_id: 1,
      title: 'Nova tarefa',
      description: 'Descrição da tarefa',
      due_date: null,
      status: 'pendente',
      priority: 'média',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addTask(newTask);
  };

  return <button onClick={handleAddTask}>Adicionar Tarefa</button>;
}
