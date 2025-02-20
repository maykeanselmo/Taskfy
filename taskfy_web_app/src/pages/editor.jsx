// src/pages/editor.jsx
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { languageState } from '../model/state';
import { t, setLanguage } from '../utils/translations';

import HeaderBar from '../components/header_bar';
import TextInputField from '../components/text_input_field';

const Editor = () => {
    const [taskContent, setTaskContent] = useState("");
    const [taskTitle, setTaskTitle] = useState("Untitled");
    const [isEditingMode, setIsEditingMode] = useState(true);

    // Recoil hook para acessar o estado de idioma
    const [language, setLanguageState] = useRecoilState(languageState);

    const toggleEditMode = () => {
        setIsEditingMode(!isEditingMode);
    };

    const HandlechangeLanguage = (lang) => {
        setLanguageState(setLanguage(lang)); // Altera o idioma e salva no localStorage
    };

    return (
        <div className="TextEditor bg-gray-200 h-screen overflow-hidden flex flex-col">
            <HeaderBar
                taskTitle={taskTitle}
                onToggleView={toggleEditMode}
                onSettingsClick={() => alert(t("settings_button"))} // Exemplo de tradução com a chave "settings_button"
                onOpenFileSystem={() => alert(t("open_file_system"))} // Exemplo de tradução com a chave "open_file_system"
            />

            <div className="flex-grow p-4 bg-white">
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

            <div className="p-4 bg-gray-100">
                <button
                    onClick={() => HandlechangeLanguage("en")}
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    English
                </button>
                <button
                    onClick={() => HandlechangeLanguage("pt")}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Português
                </button>
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
