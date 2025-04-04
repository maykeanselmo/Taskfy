import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import About from "./pages/about";
import Editor from "./pages/editor";
import Settings from "./pages/settings";
import TasksViewer from "./pages/tasks";
import Test from "./model/test";
import RegisterPage from "./pages/register";
import {LanguageProvider} from "./utils/translations";
import AppDrawerWrapper from "./components/AppDrawerWrapper";
import ThemeProvider from "./components/ThemeProvider";
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <Router>
      <RecoilRoot>
      <ThemeProvider>
      <LanguageProvider>
      <Routes>
        {/* Rotas com layout principal */}
        <Route element={<AppDrawerWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Rotas sem layout principal */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </LanguageProvider>
      </ThemeProvider>
      </RecoilRoot>
    </Router>
  );
}