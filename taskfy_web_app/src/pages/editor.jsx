import { useState } from 'react';

import { t, setLanguage } from '../utils/translations';
import { addTask, getTasks, updateTask, deleteTask } from '../services/crud';  // As funções de IndexedDB

import HeaderBar from '../components/editor/headerbar';
import TextInputField from '../components/editor/text_input_field';
import Sidebar from '../components/editor/sidebar';
import { FoldersNav } from '../components/FoldersNav';


// Importando o arquivo de estilos
import './editor.css';

const Editor = () => {
    const [taskContent, setTaskContent] = useState("");
    const [taskTitle, setTaskTitle] = useState("Untitled");
    const [isEditingMode, setIsEditingMode] = useState(true);

    const toggleEditMode = () => {
        setIsEditingMode(!isEditingMode);
    };

    // Função para salvar a tarefa no IndexedDB
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
                <HeaderBar
                    taskTitle={taskTitle}
                    onToggleView={toggleEditMode}
                    onSettingsClick={() => alert(t("settings_button"))}
                    onOpenFileSystem={() => alert(t("open_file_system"))}
                />
            </div>

            {/* Layout com Sidebar à esquerda e TextInputField ocupando o resto do espaço */}
            <div className="main-content">
                
                <FoldersNav/>
                
                <div className="sidebar">
                    <Sidebar
                        onAddFolder={() => alert("Adicionar pasta")}
                        onAddTask={saveTask}  // Passando a função para salvar tarefas
                        onDelete={() => alert("Excluir")}
                        onRename={() => alert("Renomear")}
                        onMove={() => alert("Mover")}
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
        </div>
    );
};

const renderMarkdown = (markdown) => {
    return markdown.replace(/\n/g, "<br>").replace(/(#+) (.+)/g, (match, hashes, title) => {
        const level = hashes.length;
        return `<h${level}>${title}</h${level}>`;
    });
};

export default Editor;
