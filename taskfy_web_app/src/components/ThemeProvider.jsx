import React from 'react';
import { useRecoilValue } from 'recoil';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { settingsState } from '../model/state';

const ThemeProvider = ({ children }) => {
  const { darkMode, colorScheme } = useRecoilValue(settingsState);

  const theme = createTheme({
    palette: {
      mode: darkMode === 'true' ? 'dark' : 'light',
      primary: {
        main: colorScheme || '#9c27b0', // roxo padrão
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
