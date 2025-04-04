import * as React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as AboutIcon,
  Code as EditorIcon,
  Settings as SettingsIcon,
  Notes as NotesIcon,
  BugReport as TestIcon,
} from "@mui/icons-material";
import { t } from "../utils/translations";

export const SideDrawer = ({ open, onClose }) => {
  return (
    <Drawer
      sx={{
        width: open ? "15%" : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "15%",
          boxSizing: "border-box",
          position: "fixed",
          height: "100%",
          transition: "transform 0.3s ease",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        },
      }}
      variant="persistent"
      open={open}
      onClose={onClose}
    >
      <List>
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
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;