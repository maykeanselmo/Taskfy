// folderService.js

import { API_BASE_URL } from './const';
import { VER } from './const';

export const createFolder = async (folderData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/folders`, { // Ajuste a rota se necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(folderData)
        });

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // Se não puder converter para JSON, mantém a mensagem de erro padrão
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar pasta:', error.message);
        throw error;
    }
};

export const getFolderById = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/folders/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch folder');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching folder:', error);
        throw error;
    }
};

export const deleteFolder = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete folder');
        }
        return true
    } catch (error) {
        console.error('Error deleting folder:', error);
        throw error;
    }
};

export const getFoldersByUser = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user folders');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user folders:', error);
        throw error;
    }
};

export const getRootFoldersByUser = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/folders/user/${userId}/root`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch root folders');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching root folders:', error);
        throw error;
    }
};

export const getSubFolders = async (folderId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/folders/${folderId}/subfolders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch subfolders');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching subfolders:', error);
        throw error;
    }
};

export const updateFolder = async (id, updateData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update folder');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating folder:', error);
        throw error;
    }
};