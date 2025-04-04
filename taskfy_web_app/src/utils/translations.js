import React, { createContext, useContext, useState, useEffect } from 'react';

// Traduções
const translations = {
  en: require('../res/locales/en.json'),
  pt: require('../res/locales/pt.json'),
  ar: require('../res/locales/ar.json'),
  de: require('../res/locales/de.json'),
  es: require('../res/locales/es.json'),
  fr: require('../res/locales/fr.json'),
  id: require('../res/locales/id.json'),
  hi: require('../res/locales/hi.json'),
  it: require('../res/locales/it.json'),
  ja: require('../res/locales/ja.json'),
  ko: require('../res/locales/ko.json'),
  ru: require('../res/locales/ru.json'),
  th: require('../res/locales/th.json'),
  tr: require('../res/locales/tr.json'),
  zh: require('../res/locales/zh.json'),
};

// Fallback global
let currentLanguage = localStorage.getItem('language') || 'en';

// Global translator (fora do React)
export const t = (key) => {
  return translations[currentLanguage]?.[key] || translations["en"]?.[key] || key;
};

// Atualiza idioma globalmente
export const setLanguage = (newLanguage) => {
  currentLanguage = newLanguage;
  localStorage.setItem('language', newLanguage);
  _triggerReactUpdate?.(newLanguage); // dispara atualização no contexto, se estiver disponível
};

// Retorna idioma atual
export const getLanguage = () => currentLanguage;

// Contexto React
const LanguageContext = createContext();

// Referência global para notificar o React do update
let _triggerReactUpdate = null;

// React Provider
export const LanguageProvider = ({ children }) => {
  const [language, setLangState] = useState(currentLanguage);

  // Referência pra forçar atualização externa
  useEffect(() => {
    _triggerReactUpdate = (lang) => setLangState(lang);
    return () => { _triggerReactUpdate = null; };
  }, []);

  const value = {
    language,
    setLanguage,
    getLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para uso no React
export const useLanguage = () => useContext(LanguageContext);
