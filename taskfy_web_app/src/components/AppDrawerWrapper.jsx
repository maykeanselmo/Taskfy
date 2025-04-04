// AppDrawerWrapper.js
import React from 'react';
import AppDrawer from './AppDrawer';
import { useLanguage } from '../utils/translations';

export default function AppDrawerWrapper() {
  const { language } = useLanguage(); // Dependência reativa

  return <AppDrawer key={language} />;
}
