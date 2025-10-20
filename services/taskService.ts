import { Task, TaskExecution } from '../types';
import { API_BASE_URL } from '../config';

/**
 * A helper function to handle API responses, check for errors, and parse JSON.
 * @param response - The Fetch API Response object.
 * @returns The parsed JSON data.
 * @throws An error if the response is not OK.
 */
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Could not read error text.');
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    // Handle responses that might not have a body (e.g., 204 No Content)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json() as Promise<T>;
    }
    // @ts-ignore
    return Promise.resolve();
}

export const taskService = {
    /**
     * Fetches all tasks from the backend.
     */
    getTasks: async (): Promise<Task[]> => {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        return handleResponse<Task[]>(response);
    },

    /**
     * Creates a new task on the backend.
     * @param taskData - The data for the new task.
     */
    createTask: async (taskData: Omit<Task, 'id' | 'taskExecutions'>): Promise<Task> => {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        return handleResponse<Task>(response);
    },

    /**
     * Deletes a task from the backend.
     * @param taskId - The ID of the task to delete.
     */
    deleteTask: async (taskId: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        });
        await handleResponse<void>(response);
    },

    /**
     * Executes a task and returns the updated task with the new execution record.
     * @param taskId - The ID of the task to run.
     * @returns The updated task object.
     */
    runTaskExecution: async (taskId: string): Promise<Task> => {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/execute`, {
            method: 'PUT',
        });
        return handleResponse<Task>(response);
    },
};
