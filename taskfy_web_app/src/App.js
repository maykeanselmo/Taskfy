import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

// Componentes para as páginas
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Função para mudar a página
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <button onClick={() => navigateTo('home')}>Home</button> |
          <button onClick={() => navigateTo('login')}>Login</button>
        </nav>
      </header>

      <main>
        {currentPage === 'home' && <Home />}
        {currentPage === 'login' && <Login />}
      </main>
    </div>
  );
}

export default App;
