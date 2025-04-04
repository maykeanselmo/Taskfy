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
          <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 3 }}>
            
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
                Taskfy: Gerenciador de tarefas moderno e personalizável
              </Typography>
              
              {/* Descrição */}
              <Typography variant="body1" sx={{ mb: 3 }} paragraph>
                O Taskfy é um gerenciador de tarefas intuitivo e eficiente que visa melhorar a organização pessoal e profissional. 
                Desenvolvido para ajudar você a manter o controle sobre suas atividades diárias, o Taskfy permite a criação, 
                organização e priorização de tarefas de maneira prática e eficaz.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }} paragraph>
                Nossa plataforma oferece um ambiente simples de usar, mas com recursos avançados que facilitam o gerenciamento de 
                tarefas, como a possibilidade de configurar prazos, categorias e prioridades para suas atividades. 
                Além disso, o Taskfy oferece integração com outros serviços de produtividade, como calendários e armazenamento em 
                nuvem, proporcionando uma experiência completa e otimizada para o usuário.
              </Typography>
              
              {/* Funcionalidades */}
              <Typography variant="body1" sx={{ mb: 3 }} paragraph>
                Com o Taskfy, você pode:
              </Typography>
              <Box sx={{ paddingLeft: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>• Organizar tarefas por categorias</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• Definir prazos e prioridades</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• Receber notificações de prazos e alertas</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• Colaborar em equipe em projetos e tarefas</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>• Obter relatórios de produtividade</Typography>
              </Box>

              {/* Conclusão */}
              <Typography variant="body1" sx={{ mb: 6 }} paragraph>
                O Taskfy é projetado para atender tanto usuários individuais quanto equipes, oferecendo uma solução flexível 
                para o gerenciamento de tarefas e projetos.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      
      {/* Rodapé */}
      <Box sx={{ bgcolor: theme.palette.primary.main, py: 2 }}>
        <Typography variant="body2" color="white" align="center">
          © 2025 Taskfy. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
