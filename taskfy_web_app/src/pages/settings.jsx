import React from 'react';
import { useRecoilState } from 'recoil';
import { settingsState, languageState } from '../model/state';
import { Box, Typography, ToggleButton, ToggleButtonGroup, Button, Grid, Paper, useTheme } from '@mui/material';
import { t, setLanguage } from '../utils/translations';

const Settings = () => {
  const [settings, setSettings] = useRecoilState(settingsState);
  const [language, setLanguageState] = useRecoilState(languageState);
  const theme = useTheme(); // <- pega o tema atual

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const handleDarkModeChange = (event, value) => {
    if (value !== null) {
      localStorage.setItem('darkMode', value);
      setSettings(prev => ({ ...prev, darkMode: value }));
    }
  };

  const handleColorChange = (color) => {
    localStorage.setItem('seed', color);
    setSettings(prev => ({ ...prev, colorScheme: color }));
  };

  const languages = ["en", "pt", "es", "fr", "de", "it", "ru", "zh", "ja", "ko"];
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF5", "#F5FF33", "#9c27b0"];

  const toggleButtonStyles = {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  };

  return (
    <Box p={3} maxWidth="800px" margin="auto">
      <Typography variant="h4" gutterBottom>{t("settings_title")}</Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>{t("change_language")}</Typography>
        <ToggleButtonGroup
          value={language}
          exclusive
          onChange={(e, val) => val && handleLanguageChange(val)}
          aria-label="language"
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {languages.map((lang) => (
            <ToggleButton key={lang} value={lang} sx={toggleButtonStyles}>
              {lang.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>{t("theme_mode")}</Typography>
        <ToggleButtonGroup
          value={settings.darkMode}
          exclusive
          onChange={handleDarkModeChange}
          aria-label="theme-mode"
          sx={{ gap: 1 }}
        >
          <ToggleButton value="true" sx={toggleButtonStyles}>
            {t("dark_mode")}
          </ToggleButton>
          <ToggleButton value="false" sx={toggleButtonStyles}>
            {t("light_mode")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>{t("select_color")}</Typography>
        <Grid container spacing={2}>
          {colors.map((color) => (
            <Grid item key={color}>
              <Box
                onClick={() => handleColorChange(color)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: color === settings.colorScheme ? '3px solid black' : '2px solid white',
                  cursor: 'pointer'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
