import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Box, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db_service';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateCredentials = async (email, password) => {
    const user = await dbService.getUser(email);

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
      const user = await validateCredentials(email, password);

      navigate('/tasks'); // Redireciona após login bem-sucedido
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          label="Username"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleUsernameChange}
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

