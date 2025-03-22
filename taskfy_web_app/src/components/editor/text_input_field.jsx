import React, { useState, useRef, useEffect } from 'react';
import { t } from '../../utils/translations';
import { Box, Button, IconButton, Menu, MenuItem, ListItemDecorator, FormControl, FormLabel } from '@mui/joy';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';

const TextInputField = ({ value, onChange }) => {
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const textAreaRef = useRef(null);

  // Ajusta a altura do textarea com base no conteúdo
  const handleResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';  // Reseta a altura
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Ajusta para o conteúdo
    }
  };

  // Atualiza o estado do texto e mantém a posição do cursor
  const handleChange = (event) => {
    const { value: newValue } = event.target;
    const selectionStart = event.target.selectionStart;

    onChange(newValue); // Atualiza o texto no estado pai
    setCursorPosition(selectionStart); // Atualiza a posição do cursor
    handleResize(); // Ajusta a altura após o texto ser alterado
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

  // UseEffect para ajustar o tamanho do textarea na primeira renderização
  useEffect(() => {
    handleResize();
  }, [value]);

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <FormLabel>Task</FormLabel>
      <div className="relative" style={{ flex: 1 }}>
        <textarea
          ref={textAreaRef}
          className="p-4 text-sm bg-gray-900 text-white border-none resize-none focus:outline-none font-mono"
          style={{
            width: '100%', // Ocupa toda a largura do contêiner
            height: '100%', // Faz o textarea ocupar toda a altura disponível
            fontWeight,
            fontStyle: italic ? 'italic' : 'initial',
          }}
          value={value}
          onChange={handleChange}
          onClick={handleCursorChange}
          onKeyUp={handleCursorChange}
          placeholder={t("text_input_tooltip")}
          rows={3}  // Define o número mínimo de linhas visíveis
        />


        <Box
          sx={{
            display: 'flex',
            gap: 'var(--Textarea-paddingBlock)',
            pt: 'var(--Textarea-paddingBlock)',
            borderTop: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,  // Impede que o Box encolha
          }}
        >

          <IconButton
            variant="plain"
            color="neutral"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <FormatBold />
            <KeyboardArrowDown fontSize="md" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            size="sm"
            placement="bottom-start"
            sx={{ '--ListItemDecorator-size': '24px' }}
          >
            {['200', 'normal', 'bold'].map((weight) => (
              <MenuItem
                key={weight}
                selected={fontWeight === weight}
                onClick={() => {
                  setFontWeight(weight);
                  setAnchorEl(null);
                }}
                sx={{ fontWeight: weight }}
              >
                <ListItemDecorator>
                  {fontWeight === weight && <Check fontSize="sm" />}
                </ListItemDecorator>
                {weight === '200' ? 'lighter' : weight}
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            variant={italic ? 'soft' : 'plain'}
            color={italic ? 'primary' : 'neutral'}
            aria-pressed={italic}
            onClick={() => setItalic((bool) => !bool)}
          >
            <FormatItalic />
          </IconButton>

          <div
            className="text-xs text-gray-500"
            style={{
              padding: '8px',
              textAlign: 'center', // Garante que o texto esteja centralizado
            }}
          >
            {t("text_line")}: {value.substr(0, cursorPosition).split('\n').length},
            {t("text_column")}: {cursorPosition - value.lastIndexOf('\n', cursorPosition - 1)}
          </div>

          <Button sx={{ ml: 'auto' }}>Send</Button>
        </Box>
      </div>
    </FormControl>
  );
};

export default TextInputField;
