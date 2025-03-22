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
import Notes from "./pages/notes";
import { t } from "./utils/translations";

export default function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <Router>
      <div className="App">
        {/* Botão de menu que desaparece quando o Drawer está aberto */}
        {!drawerOpen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{
              position: "absolute",
              left: 10,
              top: 10,
              zIndex: 1300, // Garante que o botão fique acima de outros elementos
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Drawer Temporário */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)} // Fecha apenas quando clicar fora
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("login")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("home")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about">
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={t("about")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/editor">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("editor")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/settings">
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={t("settings")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/notes">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={t("notes")} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        {/* Conteúdo da aplicação */}
        <Box sx={{ padding: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </Box>
      </div>
    </Router>
  );
}
