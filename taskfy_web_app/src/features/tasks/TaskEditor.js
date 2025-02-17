
import React from 'react';
import ReactQuill from 'react-quill';

const TaskEditor = ({ content, onContentChange, onSave }) => {
    return (
      <div className="task-editor">
        <ReactQuill
          value={content}
          onChange={onContentChange}
          theme="snow"
          placeholder="Escreva sua task aqui..."
        />
        <button onClick={onSave} className="save-button">
          Salvar
        </button>
      </div>
    );
  };

export default TaskEditor;
