import { useSetRecoilState } from 'recoil';
import { tasksState } from './model/state';

function useDeleteTask() {
  const setTasks = useSetRecoilState(tasksState);

  return (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
}

export default useDeleteTask;
