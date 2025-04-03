import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import "./App.css";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import About from "./pages/about";
import Editor from "./pages/editor";
import Settings from "./pages/settings";
import TasksViewer from "./pages/tasks";
import Test from "./model/test";
import { t } from "./utils/translations";
import RegisterPage from "./pages/register";

import {
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  Home as HomeIcon,
  Info as AboutIcon,
  Code as EditorIcon,
  Settings as SettingsIcon,
  Notes as NotesIcon,
  BugReport as TestIcon
} from '@mui/icons-material';

export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {/* Drawer com largura em porcentagem */}
        <Drawer
          sx={{
            width: drawerOpen ? '15%' : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '15%',
              boxSizing: 'border-box',
              position: 'fixed',
              height: '100%',
              transition: 'transform 0.3s ease',
              transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
            },
          }}
          variant="persistent"
          open={drawerOpen}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={t("login")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemIcon>
                  <RegisterIcon />
                </ListItemIcon>
                <ListItemText primary={t("register")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={t("home")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about">
                <ListItemIcon>
                  <AboutIcon />
                </ListItemIcon>
                <ListItemText primary={t("about")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/editor">
                <ListItemIcon>
                  <EditorIcon />
                </ListItemIcon>
                <ListItemText primary={t("editor")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t("settings")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/tasks">
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText primary={t("tasks")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/test">
                <ListItemIcon>
                  <TestIcon />
                </ListItemIcon>
                <ListItemText primary={t("test")} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        {/* Conteúdo principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            ml: drawerOpen ? '0%' : '0',
            transition: 'margin-left 0.3s ease',
            position: 'relative'
          }}
        >
          {/* Único botão de toggle */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              left: drawerOpen ? '240px' : '16px', // Remove o cálculo anterior
              top: 16,
              zIndex: 1300,
              transition: 'left 0.3s ease',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '0 4px 4px 0', // Arredonda apenas o lado direito
              width: 32,
              height: 32,
              transform: drawerOpen ? 'translateX(-50%)' : 'translateX(0)',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tasks" element={<TasksViewer />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}