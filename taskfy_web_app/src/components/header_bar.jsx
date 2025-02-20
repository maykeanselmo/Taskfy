import React from 'react';
import { t } from "../utils/translations";

// Componentes de botão placeholder
const SettingButton = () => <button className="p-2">⚙️ Settings</button>;
const ModeButton = () => <button className="p-2">🔄 Mode</button>;
const FileSystemButton = () => <button className="p-2">☰</button>;


const HeaderBar = ({ taskName = t("header_bar_title_default") }) => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
      {/* Botão de menu de arquivos (esquerda) */}
      <div className="flex items-center">
        <FileSystemButton />
      </div>

      {/* Nome da task (centralizado) */}
      <div className="text-center flex-1">
        <h1 className="text-lg font-semibold">{taskName}</h1>
      </div>

      {/* Botões da direita */}
      <div className="flex items-center space-x-4">
        <ModeButton />
        <SettingButton />
      </div>
    </header>
  );
};

export default HeaderBar;
