import { useState, useEffect } from 'react';
import { addTask } from '../services/crud';
import HeaderBar from '../components/editor/headerbar';
import TextInputField from '../components/editor/text_input_field';
import Sidebar from '../components/editor/sidebar';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

// Importando o arquivo de estilos
import './editor.css';

const Editor = () => {
    const [taskContent, setTaskContent] = useState("");
    const [taskTitle, setTaskTitle] = useState("Untitled");
    const [isEditingMode, setIsEditingMode] = useState(true);

    const [tags, setTags] = useState([]); // Lista de tags
    const [newTag, setNewTag] = useState(""); // Novo nome de tag
    const [openTagDialog, setOpenTagDialog] = useState(false); // Para controlar a visibilidade do diálogo de adicionar tag

    // Carrega as tags do backend
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get("http://localhost:8080/v1/tags"); // Ajuste a URL conforme necessário
                setTags(response.data);
            } catch (error) {
                console.error("Erro ao buscar tags:", error);
            }
        };
        fetchTags();
    }, []);

    // Função para adicionar uma nova tag
    const handleOpenTagDialog = () => {
        setOpenTagDialog(true);
    };

    const handleCloseTagDialog = () => {
        setOpenTagDialog(false);
    };

    const handleSaveTag = async () => {
        if (newTag.trim()) {
            try {
                // Envia a nova tag para o backend
                const response = await axios.post("http://localhost:8080/v1/tags", { name: newTag });
                setTags((prevTags) => [...prevTags, response.data]); // Atualiza a lista de tags com a nova tag
                setNewTag("");
                handleCloseTagDialog(); // Fecha o diálogo
            } catch (error) {
                console.error("Erro ao salvar tag:", error);
            }
        }
    };

    // Função para alternar entre os modos de edição e visualização
    const toggleEditMode = () => {
        setIsEditingMode(!isEditingMode);
    };

    // Função para salvar a tarefa no IndexedDB (você pode adaptar conforme necessário)
    const saveTask = async () => {
        const taskName = prompt("Qual nome você deseja dar à tarefa?");
        if (taskName) {
            const task = {
                title: taskName,
                content: taskContent,
                folder_id: 1, // Defina o ID da pasta conforme sua estrutura
            };
            await addTask(task);  // Salva a tarefa no IndexedDB
        }
    };

    return (
        <div className="editor-container">
            {/* HeaderBar no topo */}
            <div className="headerbar">
                <HeaderBar />
            </div>

            {/* Layout com Sidebar à esquerda e TextInputField ocupando o resto do espaço */}
            <div className="main-content">
                <div className="sidebar">
                    <Sidebar
                        onAddFolder={() => alert("Adicionar pasta")}
                        onAddTask={saveTask}  // Passando a função para salvar tarefas
                        onDelete={() => alert("Excluir")}
                        onRename={() => alert("Renomear")}
                        onMove={() => alert("Mover")}
                        onSetTag={handleOpenTagDialog}  // Chama o diálogo para adicionar tags
                    />
                </div>

                <div className="textarea-container">
                    {isEditingMode ? (
                        <TextInputField value={taskContent} onChange={setTaskContent} />
                    ) : (
                        <div className="bg-gray-100 p-4 border rounded shadow-md">
                            <h3 className="text-lg font-bold mb-2">{taskTitle}</h3>
                            <div
                                className="prose max-w-full"
                                dangerouslySetInnerHTML={{
                                    __html: taskContent ? renderMarkdown(taskContent) : "<p>Sem conteúdo.</p>",
                                }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Diálogo para adicionar uma nova tag */}
            <Dialog open={openTagDialog} onClose={handleCloseTagDialog}>
                <DialogTitle>Adicionar Nova Tag</DialogTitle>
                <DialogContent>
                    <div>
                        {/* Exibe as tags existentes */}
                        <h4>Tags Existentes</h4>
                        <List>
                            {tags.map((tag) => (
                                <ListItem key={tag.id}>
                                    <ListItemText primary={tag.name} />
                                </ListItem>
                            ))}
                        </List>

                        {/* Formulário para adicionar nova tag */}
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome da Tag"
                            type="text"
                            fullWidth
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTagDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveTag} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

// Função para renderizar o conteúdo Markdown para HTML
const renderMarkdown = (markdown) => {
    return markdown.replace(/\n/g, "<br>").replace(/(#+) (.+)/g, (match, hashes, title) => {
        const level = hashes.length;
        return `<h${level}>${title}</h${level}>`;
    });
};

export default Editor;
