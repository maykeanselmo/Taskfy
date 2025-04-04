import * as React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const DrawerToggleButton = ({ open, onClick }) => {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={onClick}
      sx={{
        position: "fixed",
        left: open ? "240px" : "16px",
        top: 16,
        zIndex: 1300,
        transition: "left 0.3s ease",
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "0 4px 4px 0",
        width: 32,
        height: 32,
        transform: open ? "translateX(-50%)" : "translateX(0)",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <MenuIcon fontSize="small" />
    </IconButton>
  );
};

export default DrawerToggleButton;