import React, { useState } from "react";
import { t, setLanguage } from "../utils/translations";
import { useRecoilState } from 'recoil';
import { languageState } from '../model/state';

const Settings = () => {
    // Recoil hook para acessar o estado de idioma
    const [language, setLanguageState] = useRecoilState(languageState);

    const HandlechangeLanguage = (lang) => {
        setLanguageState(setLanguage(lang)); // Altera o idioma e salva no localStorage
    };

    // Cores disponíveis para o seletor de cor
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF5", "#F5FF33"];

    return (
        <div className="settings-page">
            {/* Título da página */}
            <h1>{t("settings_title")}</h1>

            {/* Seção de mudança de idioma */}
            <div className="language-section">
                <h2>{t("change_language")}</h2>
                <div className="language-buttons">
                    <button
                        onClick={() => HandlechangeLanguage("en")}
                        className={languageState === "en" ? "active" : ""}
                    >
                        English
                    </button>
                    <button
                        onClick={() => HandlechangeLanguage("pt")}
                        className={languageState === "pt" ? "active" : ""}
                    >
                        Português
                    </button>
                </div>
            </div>

            {/* Seletor de cor */}
            <div className="color-picker-section">
                <h2>{t("select_color")}</h2>
                <div className="color-picker">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="color-circle"
                            style={{ backgroundColor: color }}
                            onClick={() => console.log("Cor selecionada:", color)} // Placeholder
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Settings;