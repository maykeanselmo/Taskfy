import React, { useState, useEffect } from 'react';
import './login.css';
import { t }  from '../utils/translations';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Atualiza o título da aba do navegador
  useEffect(() => {
    document.title = 'Login'; // Define o título como "Login"
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      alert('Login bem-sucedido!');
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
