import React from 'react';
import { t } from "../../utils/translations";

import './headerbar.css';

// Componentes de botão placeholder
const SettingButton = () => <button>⚙️ {t("settings_buttom")}</button>;
const ModeButton = () => <button>🔄  {t("mode_buttom")}</button>;
const FileSystemButton = () => <button>☰</button>;

const HeaderBar = ({ taskName = t("header_bar_title_default") }) => {
  return (
    <header className="headerbar">
      {/* Botão de menu de 3 barras (lado esquerdo) */}
      <div className="menu-button">
        <FileSystemButton />
      </div>

      {/* Container para centralizar o título */}
      <div className="title-container">
        <h1 className="task-name">{taskName}</h1>
      </div>

      {/* Botões à direita */}
      <div className="right-buttons">
        <ModeButton />
        <SettingButton />
      </div>
    </header>
  );
};

export default HeaderBar;