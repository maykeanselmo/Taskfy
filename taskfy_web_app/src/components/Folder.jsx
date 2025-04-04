import React, { useState, useContext } from "react";
import { FolderContext } from "../context/FolderContext";
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Button, Box } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete"; 
import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Task from "./Task";

const Folder = ({ folder }) => {
  const { addFolder, addTask, deleteFolder, deleteTask } = useContext(FolderContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Pasta */}
      <ListItemButton onClick={() => setOpen(!open)} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={folder.name} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {open ? <ExpandLess /> : <ExpandMore />}
          <Button onClick={() => deleteFolder(folder.id)} >
            <DeleteIcon sx={{ color: "black" }}/>
          </Button>
        </Box>
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
            <div key={index}>
              <Task name={task} />
              {/* Botão de delete para tarefa */}
              <ListItemButton sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={task} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => deleteTask(folder.id, task)} color="error">
                    <DeleteIcon />
                  </Button>
                </Box>
              </ListItemButton>
            </div>
          ))}

          {/* Botões de adicionar */}
          <Button sx={{ color: "gray" }} onClick={() => addFolder(prompt("Nome da nova pasta"), folder.id)}>
            <AddIcon />
            Criar Subpasta
          </Button>
          <Button sx={{ color: "gray" }} onClick={() => addTask(prompt("Nome da nova task"), folder.id)}>
            <PostAddIcon/>
            Adicionar Tarefa
          </Button>

        </List>
      </Collapse>
    </>
  );
};

export default Folder;