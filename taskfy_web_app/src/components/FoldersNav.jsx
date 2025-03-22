import React, { useContext } from "react";
import { FolderContext } from "../context/FolderContext";
import { List, Paper } from "@mui/material";
import Folder from "../components/Folder"

export const FoldersNav =()=>{
    const { folders } = useContext(FolderContext);
    return(
    <Paper style={{ padding: 10, maxWidth: 400 }}>
      <List>
        {folders.map(folder => (
          <Folder key={folder.id} folder={folder} />
        ))}
      </List>
    </Paper>
    )
}