import React from "react";
import './settings.css';
import { t, setLanguage } from "../utils/translations";
import { useRecoilState } from 'recoil';
import { languageState } from '../model/state';

const Settings = () => {
    // Recoil hook para acessar o estado de idioma
    const [language, setLanguageState] = useRecoilState(languageState);

    const HandlechangeLanguage = (lang) => {
        setLanguage(lang);  // Atualiza o idioma no localStorage
        setLanguageState(lang);  // Atualiza o estado do Recoil
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
                    <button onClick={() => HandlechangeLanguage("en")} className={language === "en" ? "active" : ""}>
                        English
                    </button>
                    <button onClick={() => HandlechangeLanguage("pt")} className={language === "pt" ? "active" : ""}>
                        Português
                    </button>
                    <button onClick={() => HandlechangeLanguage("ar")} className={language === "ar" ? "active" : ""}>
                        العربية
                    </button>
                    <button onClick={() => HandlechangeLanguage("de")} className={language === "de" ? "active" : ""}>
                        Deutsch
                    </button>
                    <button onClick={() => HandlechangeLanguage("es")} className={language === "es" ? "active" : ""}>
                        Español
                    </button>
                    <button onClick={() => HandlechangeLanguage("fr")} className={language === "fr" ? "active" : ""}>
                        Français
                    </button>
                    <button onClick={() => HandlechangeLanguage("id")} className={language === "id" ? "active" : ""}>
                        Bahasa Indonesia
                    </button>
                    <button onClick={() => HandlechangeLanguage("hi")} className={language === "hi" ? "active" : ""}>
                        हिंदी
                    </button>
                    <button onClick={() => HandlechangeLanguage("it")} className={language === "it" ? "active" : ""}>
                        Italiano
                    </button>
                    <button onClick={() => HandlechangeLanguage("ja")} className={language === "ja" ? "active" : ""}>
                        日本語
                    </button>
                    <button onClick={() => HandlechangeLanguage("ko")} className={language === "ko" ? "active" : ""}>
                        한국어
                    </button>
                    <button onClick={() => HandlechangeLanguage("ru")} className={language === "ru" ? "active" : ""}>
                        Русский
                    </button>
                    <button onClick={() => HandlechangeLanguage("th")} className={language === "th" ? "active" : ""}>
                        ไทย
                    </button>
                    <button onClick={() => HandlechangeLanguage("tr")} className={language === "tr" ? "active" : ""}>
                        Türkçe
                    </button>
                    <button onClick={() => HandlechangeLanguage("zh")} className={language === "zh" ? "active" : ""}>
                        中文
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
