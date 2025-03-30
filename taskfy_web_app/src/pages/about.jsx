import React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { t } from '../utils/translations';

function About() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Conteúdo Principal */}
      <Container component="main" sx={{ flex: 1, py: 8, maxWidth: 'lg' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Card sx={{ width: '100%', maxWidth: 900, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
                {t("about_us")}
              </Typography>
              <Typography variant="h6" sx={{ color: '#1976d2' }} paragraph>
                Taskfy: Gerenciador de tarefas moderno e personalizável
              </Typography>
              <Typography variant="body1" paragraph>
                O Taskfy é um gerenciador de tarefas intuitivo e eficiente que visa melhorar a organização pessoal e profissional. 
                Desenvolvido para ajudar você a manter o controle sobre suas atividades diárias, o Taskfy permite a criação, 
                organização e priorização de tarefas de maneira prática e eficaz.
              </Typography>
              <Typography variant="body1" paragraph>
                Nossa plataforma oferece um ambiente simples de usar, mas com recursos avançados que facilitam o gerenciamento de 
                tarefas, como a possibilidade de configurar prazos, categorias e prioridades para suas atividades. 
                Além disso, o Taskfy oferece integração com outros serviços de produtividade, como calendários e armazenamento em 
                nuvem, proporcionando uma experiência completa e otimizada para o usuário.
              </Typography>
              <Typography variant="body1" paragraph>
                Com o Taskfy, você pode:
              </Typography>
              <Box sx={{ paddingLeft: 2 }}>
                <Typography variant="body1">- Organizar tarefas por categorias</Typography>
                <Typography variant="body1">- Definir prazos e prioridades</Typography>
                <Typography variant="body1">- Receber notificações de prazos e alertas</Typography>
                <Typography variant="body1">- Colaborar em equipe em projetos e tarefas</Typography>
                <Typography variant="body1">- Obter relatórios de produtividade</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                O Taskfy é projetado para atender tanto usuários individuais quanto equipes, oferecendo uma solução flexível 
                para o gerenciamento de tarefas e projetos.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Rodapé */}
      <Box sx={{ bgcolor: '#1976d2', py: 2 }}>
        <Typography variant="body2" color="white" align="center">
          © 2025 Taskfy. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;
