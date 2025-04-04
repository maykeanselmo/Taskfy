import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../utils/translations';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Fade,
  useTheme,
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // AQUI PEGA O TEMA

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const isDark = theme.palette.mode === 'dark';

  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: 10,
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 800,
            width: '100%',
            textAlign: 'center',
            borderRadius: 4,
            background: isDark
              ? 'linear-gradient(145deg, #1e1e1e, #2a2a2a)'
              : 'linear-gradient(145deg, #f0f0f0, #ffffff)',
            boxShadow: isDark
              ? '0px 10px 20px rgba(0, 0, 0, 0.5)'
              : '0px 10px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Stack spacing={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {t('initial_page')}
            </Typography>

            <Typography variant="h6" color="text.secondary">
              {t('welcome_message')}
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleLoginRedirect}
              sx={{ borderRadius: 2 }}
            >
              {t('go_to_login') || 'Entrar'}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Home;
