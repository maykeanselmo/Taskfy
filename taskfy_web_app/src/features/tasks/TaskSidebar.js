// src/features/tasks/TaskSidebar.js
import React from 'react';

const TaskSidebar = ({ tasks, onTaskSelect, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="task-sidebar">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => onTaskSelect(task)}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskSidebar;