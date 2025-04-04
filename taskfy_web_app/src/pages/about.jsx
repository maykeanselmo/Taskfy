import React from 'react';
import { Box, Card, CardContent, Container, Typography, useTheme } from '@mui/material';
import { t } from '../utils/translations';

function About() {
  const theme = useTheme(); // Hook para acessar o tema atual

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Cabeçalho */}
      <Container component="main" sx={{ flex: 1, py: 8, maxWidth: 'lg' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 3, borderRadius: '16px' }}>
            
            {/* Título Principal */}
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: 'center', color: theme.palette.primary.main, mb: 3 }}
              >
                {t("about_us")}
              </Typography>
              
              {/* Subtítulo */}
              <Typography 
                variant="h6" 
                sx={{ textAlign: 'center', color: theme.palette.primary.main, mb: 3 }} 
                paragraph
              >
                {t("about_title")}
              </Typography>
              
              {/* Descrição */}
              <Typography variant="body1" sx={{ mb: 3 }} paragraph>
                {t("about_p1")}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }} paragraph>
                {t("about_p2")}
              </Typography>
              
              {/* Funcionalidades */}
              <Typography variant="body1" sx={{ mb: 3 }} paragraph>
                {t("about_p3")}
              </Typography>
              <Box sx={{ paddingLeft: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>• {t("about_p3.1")}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• {t("about_p3.2")}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• {t("about_p3.3")}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• {t("about_p3.4")}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• {t("about_p3.5")}</Typography>
              </Box>

              {/* Conclusão */}
              <Typography variant="body1" sx={{ mb: 6 }} paragraph>
                {t("about_p4")}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      
      {/* Rodapé */}
      <Box sx={{ bgcolor: theme.palette.primary.main, py: 2 }}>
        <Typography variant="body2" color="white" align="center">
          © 2025 Taskfy. {t("about_foot")}
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
