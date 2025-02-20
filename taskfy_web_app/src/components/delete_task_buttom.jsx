import useDeleteTask from '../hooks/delete_task';

function RemoveTaskButton({ taskId }) {
  const removeTask = useDeleteTask();

  const handleRemoveTask = () => {
    removeTask(taskId);
  };

  return <button onClick={handleRemoveTask}>Remover Tarefa</button>;
}
