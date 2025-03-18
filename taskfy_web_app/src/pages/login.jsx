import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Box, Container, CssBaseline } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Atualizado para useNavigate

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate substitui useHistory
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Função de validação de login com placeholder para backend
  const validateCredentials = async (email, password) => {
    // Aqui você pode substituir por uma chamada real ao seu backend
    // Para fins de demonstração, a função retorna um usuário válido.
    const userDatabase = [
      { email: 'test@example.com', password: 'password123' },
    ];

    const user = userDatabase.find(user => user.email === email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.password !== password) {
      throw new Error('Senha incorreta');
    }

    return user;
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await validateCredentials(email, password);
      navigate('/dashboard');  // Redireciona após login bem-sucedido
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (response) => {
    if (response.error) {
      setError('Falha ao autenticar com o Google');
    } else {
      // Lógica para processar login com Google (ex: enviar o token para o backend)
      navigate('/dashboard');  // Redireciona após login com Google
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8
      }}>
        <Typography variant="h5">Entrar na sua conta</Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {/* Login via email e senha */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          sx={{ mt: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>

        {/* Login via Google */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError('Falha ao autenticar com o Google')}
          useOneTap
        />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs>
            <Link href="#" variant="body2">
              Esqueceu a senha?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Não tem uma conta? Cadastre-se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;

