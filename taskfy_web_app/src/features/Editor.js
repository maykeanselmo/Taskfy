import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tasksState } from './tasks/Model';
import TaskHeader from './tasks/TaskHeader';

const Editor = () => {
  const { taskId } = useParams();
  const [tasks, setTasks] = useRecoilState(tasksState);
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Criação de uma nova task quando taskId é 'new'
  useEffect(() => {
    if (taskId === 'new') {
      const newTaskId = String(tasks.length + 1);
      const newTask = { id: newTaskId, title: `Task ${newTaskId}`, content: '' };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      navigate(`/task/${newTaskId}`, { replace: true });
    }
  }, [taskId, setTasks, navigate]);

  // Carrega a task existente com base no taskId
  useEffect(() => {
    if (taskId !== 'new') {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setTitle(task.title);
        setContent(task.content);
      } else {
        alert('Task não encontrada!');
        navigate('/', { replace: true });
      }
    }
  }, [taskId, tasks, navigate]);

  // Função para salvar a task editada
  const handleSave = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, title, content } : t
      )
    );
    alert('Task salva!');
  };

  return (
    <div className="task-page">
      <TaskHeader
        taskTitle={title || 'Task'}
        onSettingsClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onSave={handleSave}
      />

      <div className="task-editor">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite o conteúdo da sua task aqui..."
          rows="10"
          cols="50"
        />
      </div>

      {isSidebarOpen && (
        <div className="task-sidebar">
          <h3>Lista de Tasks</h3>
          {tasks.map((t) => (
            <div key={t.id}>
              <button onClick={() => navigate(`/task/${t.id}`)}>{t.title}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Editor;