import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Link, Box, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db_service';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleNameChange = (e) => setName(e.target.value);
    const handleNicknameChange = (e) => setNickname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  
    // Validação e envio dos dados para o backend
    const handleRegister = async () => {
        setError('');
      
        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres.');
          return;
        }
        if (password !== confirmPassword) {
          setError('As senhas não coincidem.');
          return;
        }

        setLoading(true);

        try {
          const userData = { username, nickname, email, password };
          console.log('Dados do usuário a serem salvos:', userData);
          await dbService.createUser(userData)
            .then((savedUser) => {
              console.log('Usuário salvo com ID:', savedUser.id);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
              navigate('/notes');
>>>>>>> 93c4356 (feat: registerPage)
=======
              navigate('/notes');
>>>>>>> 93c4356 (feat: registerPage)
=======
              navigate('/notes');
>>>>>>> 93c4356 (feat: registerPage)
            })
            .catch((err) => {
              setError(err.message); // Exibe o erro na UI
            });

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
          <Typography variant="h5">Criar uma conta</Typography>
  
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
  
          <TextField
            label="Nome de Usuário"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleNameChange}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Apelido"
            variant="outlined"
            fullWidth
            value={nickname}
            onChange={handleNicknameChange}
            sx={{ mt: 2 }}
          />
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
          <TextField
            label="Confirmar Senha"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Button>

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  };
  
  export default RegisterPage;
