import { t } from '../utils/translations'
import React, { useContext } from "react";
import { FolderContext } from "../context/FolderContext";
import { List, Paper } from "@mui/material";
import Folder from "../components/Folder";

function Home() {
  const { folders } = useContext(FolderContext);
  return (
    <div className="home">
      <h1>{t("initial_page")}</h1>
      <p>{t("welcome_message")}</p>
    </div>
  );
}

export default Home;