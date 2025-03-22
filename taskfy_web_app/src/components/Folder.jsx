import React, { useState, useContext } from "react";
import { FolderContext } from "../context/FolderContext";
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Task from "./Task";

const Folder = ({ folder }) => {
  const { addFolder, addTask } = useContext(FolderContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Pasta */}
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Conteúdo da Pasta */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Subpastas */}
          {folder.subfolders.map(subfolder => (
            <Folder key={subfolder.id} folder={subfolder} />
          ))}

          {/* Tasks */}
          {folder.tasks.map((task, index) => (
            <Task key={index} name={task} />
          ))}

          {/* Botões de adicionar */}
          <Button onClick={() => addFolder(prompt("Nome da nova pasta"), folder.id)}>➕ Criar Subpasta</Button>
          <Button onClick={() => addTask(prompt("Nome da nova task"), folder.id)}>✅ Adicionar Tarefa</Button>
        </List>
      </Collapse>
    </>
  );
};

export default Folder;