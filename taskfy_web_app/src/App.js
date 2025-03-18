import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Importe o provedor do Google OAuth
import './App.css';
import LoginPage from './pages/login';
import Home from './pages/home';
import About from './pages/about';
import Editor from './pages/editor';
import Settings from './pages/settings';
import Notes from './pages/notes';
import { t } from './utils/translations';

function App() {
  return (
    <GoogleOAuthProvider clientId="SUA_CHAVE_DO_GOOGLE_AQUI">
      <Router>
        <div className="App">
          {/* Menu de navegação */}
          <nav>
            <Link to="/login">{t("login")}</Link>
            <Link to="/">{t("home")}</Link>
            <Link to="/about">{t("about")}</Link>
            <Link to="/editor">{t("editor")}</Link>
            <Link to="/settings">{t("settings")}</Link>
            <Link to="/notes">{t("notes")}</Link>
          </nav>

          {/* Rotas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

