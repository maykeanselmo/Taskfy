import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Editor from './features/Editor';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menu de navegação */}
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/about">Sobre</Link> |
          <Link to="/task/new">Nova Task</Link> {/* Link para criar uma nova task */}
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/task/:taskId" element={<Editor />} /> {/* Rota correta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;