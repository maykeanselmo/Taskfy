import useUpdateTask from '../hooks/update_task';

function UpdateTaskButton({ task }) {
  const updateTask = useUpdateTask();

  const handleUpdateTask = () => {
    const updatedTask = {
      ...task,
      title: 'Tarefa Atualizada',
      updated_at: new Date().toISOString(),
    };

    updateTask(updatedTask);
  };

  return <button onClick={handleUpdateTask}>Atualizar Tarefa</button>;
}
