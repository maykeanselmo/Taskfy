// src/utils/translations.js
import { useRecoilState } from 'recoil';
import { languageState } from '../model/state';

// Importando as traduções de arquivos JSON (você pode usar suas traduções reais)
const translations = {
  en: require('../res/locales/en.json'),
  pt: require('../res/locales/pt.json'),
};

// Função para obter a tradução com base na chave e no idioma atual
export const t = (key) => {
  const [language] = useRecoilState(languageState);
  return translations[language]?.[key] || translations["en"]?.[key] || key;
};

// Função para mudar o idioma e salvar no localStorage
export const setLanguage = (newLanguage) => {
  localStorage.setItem('language', newLanguage);
  return newLanguage;
};
