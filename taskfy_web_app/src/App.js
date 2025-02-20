import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Editor from './pages/editor';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menu de navegação */}
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/about">Sobre</Link> |
          <Link to="/editor">Editor</Link>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;