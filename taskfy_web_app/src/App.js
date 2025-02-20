import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Editor from './pages/editor';
import Settings from './pages/settings';

import { t } from './utils/translations';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menu de navegação */}
        <nav>
          <Link to="/">{t("home")}</Link> |
          <Link to="/about">{t("about")}</Link> |
          <Link to="/editor">{t("editor")}</Link> |
          <Link to="/settings">{t("settings")}</Link>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;