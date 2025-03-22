import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Task = ({ name }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default Task;