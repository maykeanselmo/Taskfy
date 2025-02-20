import { atom } from 'recoil';

export const tasksState = atom({
  key: 'tasksState',
  default: [], // Lista inicial de tasks
});

export const currentTaskState = atom({
  key: 'currentTaskState',
  default: null, // Task aberta atualmente
});

export const userState = atom({
  key: 'userState',
  default: null, // Usuário logado
});

export const settingsState = atom({
  key: 'appearenceState',
  default: {
    darkMode: localStorage.getItem('darkMode') || 'true', // Default: DarkMode Ativado
    colorScheme: localStorage.getItem('seed') || 'purple'
  },
});

export const languageState = atom({
  key: 'languageState',
  default: localStorage.getItem('language') || 'en', // Default: English (en)
});
