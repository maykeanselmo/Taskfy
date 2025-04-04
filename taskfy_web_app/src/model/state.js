import { atom } from 'recoil';

export const settingsState = atom({
  key: 'appearenceState',
  default: {
    darkMode: localStorage.getItem('darkMode') || 'true', // Default: DarkMode Ativado
    colorScheme: localStorage.getItem('seed') || '#9c27b0'
  },
});

export const languageState = atom({
  key: 'languageState',
  default: localStorage.getItem('language') || 'en', // Default: English (en)
});
