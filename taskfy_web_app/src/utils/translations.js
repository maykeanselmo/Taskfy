// Importando as traduções de arquivos JSON
const translations = {
  en: require('../res/locales/en.json'),
  pt: require('../res/locales/pt.json'),
  ar: require('../res/locales/ar.json'), // Árabe
  de: require('../res/locales/de.json'), // Alemão
  es: require('../res/locales/es.json'), // Espanhol
  fr: require('../res/locales/fr.json'), // Francês
  id: require('../res/locales/id.json'), // Indonésio
  hi: require('../res/locales/hi.json'), // Hindi
  it: require('../res/locales/it.json'), // Italiano
  ja: require('../res/locales/ja.json'), // Japonês
  ko: require('../res/locales/ko.json'), // Coreano
  ru: require('../res/locales/ru.json'), // Russo
  th: require('../res/locales/th.json'), // Tailandês
  tr: require('../res/locales/tr.json'), // Turco
  zh: require('../res/locales/zh.json')  // Chinês
};

// Estado global do idioma (fora do React)
let currentLanguage = localStorage.getItem('language') || 'en';

// Função para traduzir uma chave
export const t = (key) => {
  return translations[currentLanguage]?.[key] || translations["en"]?.[key] || key;
};

// Função para mudar o idioma
export const setLanguage = (newLanguage) => {
  currentLanguage = newLanguage;
  localStorage.setItem('language', newLanguage);
};

// Função para obter o idioma atual
export const getLanguage = () => currentLanguage;

