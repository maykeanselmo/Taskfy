import { useSetRecoilState } from 'recoil';
import { tasksState } from './model/state';

function useCreateTask() {
  const setTasks = useSetRecoilState(tasksState);

  return (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
}

export default useCreateTask;
