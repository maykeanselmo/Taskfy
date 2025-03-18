import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Button, TextField, Grid } from "@mui/material";

function NotesViewer() {
  const [notes, setNotes] = useState([
    { id: 1, content: "Primeira nota" },
    { id: 2, content: "Segunda nota" },
  ]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNote, setNewNote] = useState("");

  const handleEdit = (id) => {
    setSelectedNote(notes.find((note) => note.id === id));
  };

  const handleSave = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNote.id ? { ...note, content: selectedNote.content } : note
      )
    );
    setSelectedNote(null);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleCreate = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote }]);
      setNewNote("");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>Notas</Typography>
      {selectedNote ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={selectedNote.content}
            onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 10 }}>
            Salvar
          </Button>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Nova nota"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginTop: 10 }}>
            Criar Nota
          </Button>
        </>
      )}
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {notes.map((note) => (
          <Grid item xs={12} key={note.id}>
            <Card onClick={() => handleEdit(note.id)} style={{ cursor: "pointer" }}>
              <CardContent>
                <Typography variant="body1">
                  {note.content.length > 50 ? note.content.substring(0, 50) + "..." : note.content}
                </Typography>
              </CardContent>
              <Button color="secondary" onClick={() => handleDelete(note.id)}>
                Excluir
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesViewer;

