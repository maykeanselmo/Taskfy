import { useSetRecoilState } from 'recoil';
import { tasksState } from '../model/state';

function useUpdateTask() {
  const setTasks = useSetRecoilState(tasksState);

  return (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
}

export default useUpdateTask;
