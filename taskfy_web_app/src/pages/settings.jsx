import React, { useState } from "react";
import './settings.css';
import { t, setLanguage } from "../utils/translations";
import { useRecoilState } from 'recoil';
import { languageState } from '../model/state';

const Settings = () => {
    const [language, setLanguageState] = useRecoilState(languageState);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleChangeLanguage = (lang) => {
        setLanguageState(setLanguage(lang));
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        console.log("Cor selecionada:", color);
    };

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF5", "#F5FF33"];
    
    const languages = [
        { code: "en", label: "English" },
        { code: "pt", label: "Português" },
        { code: "ar", label: "العربية" },
        { code: "de", label: "Deutsch" },
        { code: "es", label: "Español" },
        { code: "fr", label: "Français" },
        { code: "id", label: "Bahasa Indonesia" },
        { code: "hi", label: "हिंदी" },
        { code: "it", label: "Italiano" },
        { code: "ja", label: "日本語" },
        { code: "ko", label: "한국어" },
        { code: "ru", label: "Русский" },
        { code: "th", label: "ไทย" },
        { code: "tr", label: "Türkçe" },
        { code: "zh", label: "中文" }
    ];

    return (
        <div className="settings-page">
            <h1>{t("settings_title")}</h1>

            <div className="language-section">
                <h2>{t("change_language")}</h2>
                <div className="language-buttons">
                    {languages.map(({ code, label }) => (
                        <button 
                            key={code} 
                            onClick={() => handleChangeLanguage(code)} 
                            className={language === code ? "active" : ""}
                            aria-label={`Change language to ${label}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="color-picker-section">
                <h2>{t("select_color")}</h2>
                <div className="color-picker">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                            role="button"
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Settings;
