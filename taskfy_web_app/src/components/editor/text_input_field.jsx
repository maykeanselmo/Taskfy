import React, { useState, useRef } from 'react';
import { t } from '../../utils/translations';

const TextInputField = ({ value, onChange }) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textAreaRef = useRef(null);

  // Atualiza o estado do texto e mantém a posição do cursor
  const handleChange = (event) => {
    const { value: newValue } = event.target;
    const selectionStart = event.target.selectionStart;

    onChange(newValue); // Atualiza o texto no estado pai
    setCursorPosition(selectionStart); // Atualiza a posição do cursor
  };

  // Atualiza a posição do cursor quando o usuário clica ou usa setas
  const handleCursorChange = (event) => {
    const selectionStart = event.target.selectionStart;
    setCursorPosition(selectionStart);
  };

  // Função opcional: mover o cursor programaticamente
  const moveCursorToPosition = (position) => {
    if (textAreaRef.current) {
      textAreaRef.current.setSelectionRange(position, position);
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="h-full w-full relative">
      <textarea
        ref={textAreaRef}
        className="w-full h-full p-4 text-sm bg-gray-900 text-white border-none resize-none focus:outline-none font-mono"
        value={value}
        onChange={handleChange}
        onClick={handleCursorChange}
        onKeyUp={handleCursorChange}
        placeholder={t("text_input_tooltip")}
      />
      <div className="absolute bottom-2 right-4 text-xs text-gray-500">
        {t("text_line")}: {value.substr(0, cursorPosition).split('\n').length},
        {t("text_column")}: {cursorPosition - value.lastIndexOf('\n', cursorPosition - 1)}
      </div>
    </div>
  );
};

export default TextInputField;
