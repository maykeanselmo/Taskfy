// src/features/tasks/Model.js
import { atom } from 'recoil';

// Função para carregar as tasks do localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return [
    {
      id: '1', // IDs como string
      title: "Task 1",
      content: "Conteúdo da Task 1",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    },
    {
      id: '2', // IDs como string
      title: "Task 2",
      content: "Conteúdo da Task 2",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
    },
  ];
};

// Atom do Recoil com valor inicial carregado do localStorage
export const tasksState = atom({
  key: 'tasksState', // Chave única para o atom
  default: loadTasksFromLocalStorage(), // Carrega as tasks do localStorage
});