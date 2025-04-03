// TextInputPopup.jsx
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const TextInputPopup = ({ open, onClose, onSave }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSave = () => {
        onSave(inputValue); // Passa o valor do campo para o componente pai
        setInputValue(''); // Limpa o campo após salvar
        onClose(); // Fecha o popup
    };

    const handleCancel = () => {
        setInputValue(''); // Limpa o campo se o usuário cancelar
        onClose(); // Fecha o popup
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Digite algo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Texto"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Atualiza o valor do campo
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TextInputPopup;
