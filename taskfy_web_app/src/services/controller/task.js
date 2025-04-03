// taskService.js
import { API_BASE_URL } from "./const";
import { VER } from "./const";

export const createTask = async (taskData, token) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const getTaskById = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
};

export const deleteTask = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        return true; // Success
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const updateTask = async (id, taskData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const getTasksByFolder = async (folderId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/tasks/${folderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks by folder');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks by folder:', error);
        throw error;
    }
};

export const updateTaskStatus = async (id, statusUpdate, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: statusUpdate })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update task status');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
};

export const getAllTasks = async (token) => {
    try {
        if (!token) {
            throw new Error("Token de autenticação não encontrado");
        }

        const response = await fetch(`${API_BASE_URL}${VER}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Tratamento avançado da resposta
        const responseText = await response.text();
        let responseData;
        
        try {
            responseData = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
            console.warn("Resposta não-JSON recebida:", responseText);
            responseData = { message: responseText || "Resposta inválida do servidor" };
        }

        if (!response.ok) {
            const errorMsg = responseData.message || 
                          `Erro ${response.status}: ${response.statusText}`;
            throw new Error(errorMsg);
        }

        return responseData;

    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        throw new Error(error.message || "Falha na comunicação com o servidor");
    }
};