import * as React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { SideDrawer } from "./SideDrawer";
import { DrawerToggleButton } from "./DrawerToogleButton";

export const AppDrawer = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideDrawer open={drawerOpen} onClose={toggleDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          ml: drawerOpen ? "0%" : 0,
          transition: "margin-left 0.3s ease",
          position: "relative",
        }}
      >
        <DrawerToggleButton open={drawerOpen} onClick={toggleDrawer} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppDrawer;