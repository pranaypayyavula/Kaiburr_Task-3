import { Task, TaskExecution } from '../types';

const STORAGE_KEY = 'kaiburr_tasks';

const getInitialTasks = (): Task[] => [
    {
        id: "123",
        name: "Print Hello",
        owner: "John Smith",
        command: "echo Hello World again!",
        taskExecutions: [
            {
                startTime: "2023-04-21T15:51:42.276Z",
                endTime: "2023-04-21T15:51:43.276Z",
                output: "Hello World!"
            },
            {
                startTime: "2023-04-21T15:52:42.276Z",
                endTime: "2023-04-21T15:52:43.276Z",
                output: "Hello World again!"
            }
        ]
    },
    {
        id: "124",
        name: "List Files",
        owner: "Jane Doe",
        command: "ls -la",
        taskExecutions: []
    },
    {
        id: "125",
        name: "Check System Date",
        owner: "Admin",
        command: "date",
        taskExecutions: []
    }
];

const getTasksFromStorage = (): Task[] => {
    try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
            return JSON.parse(storedTasks);
        } else {
            const initialTasks = getInitialTasks();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
            return initialTasks;
        }
    } catch (error) {
        console.error("Could not access local storage:", error);
        return getInitialTasks();
    }
};

const saveTasksToStorage = (tasks: Task[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save to local storage:", error);
    }
};

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

export const taskService = {
    getTasks: async (): Promise<Task[]> => {
        const tasks = getTasksFromStorage();
        return simulateDelay(tasks);
    },

    createTask: async (taskData: Omit<Task, 'id' | 'taskExecutions'>): Promise<Task> => {
        const tasks = getTasksFromStorage();
        const newTask: Task = {
            ...taskData,
            id: new Date().getTime().toString(),
            taskExecutions: [],
        };
        const updatedTasks = [...tasks, newTask];
        saveTasksToStorage(updatedTasks);
        return simulateDelay(newTask);
    },

    deleteTask: async (taskId: string): Promise<Task[]> => {
        let tasks = getTasksFromStorage();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        saveTasksToStorage(updatedTasks);
        return simulateDelay(updatedTasks);
    },

    runTaskExecution: async (taskId: string): Promise<TaskExecution> => {
        const tasks = getTasksFromStorage();
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            throw new Error('Task not found');
        }

        const startTime = new Date();
        // Simulate a short execution time
        await new Promise(res => setTimeout(res, Math.random() * 1000 + 500));
        const endTime = new Date();
        
        const newExecution: TaskExecution = {
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            output: `Simulated output for command "${tasks[taskIndex].command}" at ${startTime.toLocaleTimeString()}`,
        };

        tasks[taskIndex].taskExecutions.push(newExecution);
        saveTasksToStorage(tasks);
        
        return simulateDelay(newExecution);
    },
};