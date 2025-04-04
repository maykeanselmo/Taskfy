import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Box, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db_service';
import { Link as RouterLink } from 'react-router-dom';
import { t } from '../utils/translations';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEemailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateCredentials = async (email, password) => {
    console.log(email, password)
    try {
        const resp = await dbService.login(email, password);

        if (!resp || !resp.token) {
            throw new Error(t('invalid credentials'));
        }

        // Salva o token no localStorage
        localStorage.setItem('authToken', resp.token);
        localStorage.setItem('email', email);

        return resp;
    } catch (error) {
        console.error('Erro ao validar credenciais:', error.message);
        throw new Error(t('login_failed'));
    }
  };


  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const user = await validateCredentials(email, password);

      navigate('/editor'); // Redireciona após login bem-sucedido
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
        <Typography variant="h5">{t('login_welcome')}</Typography>
        <Typography variant="h5">{t('login_message')}</Typography>

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
          onChange={handleEemailChange}
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

        <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs>
          <Link href="#" variant="body2">
            Esqueceu a senha?
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/register" variant="body2">
            Não tem uma conta? Cadastre-se
          </Link>
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;

