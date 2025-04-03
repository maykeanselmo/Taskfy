async function login(email, password) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
  
      const { token } = await response.json();
      localStorage.setItem('authToken', token); // Armazena o token
      return token;
  
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }