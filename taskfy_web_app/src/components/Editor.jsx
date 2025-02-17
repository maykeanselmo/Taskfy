import React, { useState } from 'react';

// Estrutura de uma task
const Task = ({ id, title, description }) => ({
  id,
  title,
  description,
});

function TextEditor() {
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: '',
    description: '',
  });
  const [tasks, setTasks] = useState([]);

  const saveTask = () => {
    if (!currentTask.title.trim() && !currentTask.description.trim()) {
      alert("A tarefa está vazia!");
      return;
    }

    if (currentTask.id) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...task, ...currentTask } : task
        )
      );
    } else {
      setTasks([
        ...tasks,
        { ...currentTask, id: Date.now() }, // Gera um ID único baseado no timestamp
      ]);
    }

    setCurrentTask({ id: null, title: '', description: '' });
  };

  const openTask = (task) => {
    setCurrentTask(task);
  };

  return (
    <div className="TextEditor">
      {/* Header */}
      <header className="HeaderBar">
        <button
          className="SettingsButton"
          onClick={() => alert('Página de Configurações (em construção)')}
        >
          ⚙ Configurações
        </button>

        <h1 className="TaskHeader">
          {currentTask.title || 'Nova Tarefa'}
        </h1>

        <button
          className="TasksButton"
          onClick={() => alert(JSON.stringify(tasks, null, 2))}
        >
          📋 Ver Tasks
        </button>
      </header>

      {/* Editor de texto */}
      <main className="EditorMain">
        <input
          type="text"
          className="TaskTitleInput"
          placeholder="Título da Tarefa"
          value={currentTask.title}
          onChange={(e) =>
            setCurrentTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className="TaskDescriptionInput"
          placeholder="Descrição da Tarefa"
          value={currentTask.description}
          onChange={(e) =>
            setCurrentTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <button className="SaveTaskButton" onClick={saveTask}>
          Salvar Tarefa
        </button>
      </main>

      {/* Lista de Tasks (opcional, para abrir rapidamente) */}
      <aside className="TaskList">
        <h2>Tarefas Abertas</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="TaskItem"
            onClick={() => openTask(task)}
          >
            {task.title || 'Sem Título'}
          </div>
        ))}
      </aside>
    </div>
  );
}

export default TextEditor;
