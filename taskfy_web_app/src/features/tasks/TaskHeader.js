import React from 'react';

const TaskHeader = ({ taskTitle, onSettingsClick, onSave }) => {
  return (
    <header className="task-header">
      <h1>{taskTitle}</h1>
      <div className="task-header-actions">
        <button onClick={onSave}>Salvar</button>
        <button onClick={onSettingsClick}>Abrir Sidebar</button>
      </div>
    </header>
  );
};

export default TaskHeader;
