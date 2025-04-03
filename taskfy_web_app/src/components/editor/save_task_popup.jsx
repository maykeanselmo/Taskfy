import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const SaveTaskPopup = ({ open, onSave, onClose }) => {
  const [taskTitle, setTaskTitle] = useState(''); // Inicialize o estado para o título da tarefa

  const handleSave = () => {
    onSave(taskTitle); // Passar o título para o componente pai
    setTaskTitle(''); // Limpar o título após salvar
    onClose(); // Fechar o popup após salvar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Salvar Tarefa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da tarefa"
          fullWidth
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)} // Atualiza o título conforme o usuário digita
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSave} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveTaskPopup;
