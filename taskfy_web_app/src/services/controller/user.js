// userService.js
import { API_BASE_URL } from "./const";
import { VER } from "./const";

export const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // Pode enviar o objeto diretamente
        });

        if (!response.ok) {
            let errorMessage = 'Failed to create user';
            try {
                const errorResponse = await response.json(); // Tenta pegar erro em JSON
                errorMessage = errorResponse.message || errorMessage;
            } catch (_) {
                const textError = await response.text();
                if (textError) errorMessage = textError;
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};

export const getUserById = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getUserByEmail = async (email, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${VER}/users/email/${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const updateUser = async (id, userData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const getAllUsers = async (token, page = 0, size = 10, sortBy = 'name', direction = 'asc') => {
    try {
        const response = await fetch(
            `${API_BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updatePassword = async (id, passwordData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(passwordData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update password');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

export const deleteUser = async (id, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        return await response.text(); // Retorna a mensagem de sucesso
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};