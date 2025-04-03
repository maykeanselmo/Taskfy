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
        const response = await fetch(`${API_BASE_URL}${VER}/tasks/folder/${folderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error('Failed to fetch tasks by folder');
        }

        // Check if response body is empty
        if (response.status === 204) {
            console.log('No tasks found for this folder');
            return []; // Return empty array if no content is returned
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