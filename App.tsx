import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, TaskExecution } from './types';
import { taskService } from './services/taskService';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import ExecutionResult from './components/ExecutionResult';
import { PlusIcon, SearchIcon } from './components/Icons';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [executionResult, setExecutionResult] = useState<{ task: Task; execution: TaskExecution; } | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    
    const [runningTasks, setRunningTasks] = useState<Set<string>>(new Set());
    const [deletingTasks, setDeletingTasks] = useState<Set<string>>(new Set());

    const fetchTasks = useCallback(async () => {
        try {
            setIsLoading(true);
            const fetchedTasks = await taskService.getTasks();
            setTasks(fetchedTasks);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async (taskData: Omit<Task, 'id' | 'taskExecutions'>) => {
        try {
            await taskService.createTask(taskData);
            setCreateModalOpen(false);
            await fetchTasks();
        } catch (err) {
            setError('Failed to create task.');
            console.error(err);
        }
    };

    const promptDeleteTask = (task: Task) => {
        setTaskToDelete(task);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;

        const taskId = taskToDelete.id;
        setDeletingTasks(prev => new Set(prev).add(taskId));
        setTaskToDelete(null); // Close modal immediately for better UX

        try {
            const updatedTasks = await taskService.deleteTask(taskId);
            setTasks(updatedTasks);
        } catch (err) {
            setError('Failed to delete task.');
            console.error(err);
        } finally {
            setDeletingTasks(prev => {
                const newSet = new Set(prev);
                newSet.delete(taskId);
                return newSet;
            });
        }
    };

    const handleRunTask = async (taskId: string) => {
        setRunningTasks(prev => new Set(prev).add(taskId));
        try {
            const newExecution = await taskService.runTaskExecution(taskId);
            const task = tasks.find(t => t.id === taskId);
            
            // Update tasks state locally for immediate feedback
            setTasks(currentTasks => 
                currentTasks.map(t => 
                    t.id === taskId 
                        ? { ...t, taskExecutions: [...t.taskExecutions, newExecution] }
                        : t
                )
            );
            
            if (task) {
                // Show the result modal
                setExecutionResult({ task, execution: newExecution });
            }
        } catch (err) {
            setError('Failed to run task.');
            console.error(err);
        } finally {
            setRunningTasks(prev => {
                const newSet = new Set(prev);
                newSet.delete(taskId);
                return newSet;
            });
        }
    };

    const handleViewDetails = (task: Task) => {
        setSelectedTask(task);
        setDetailsModalOpen(true);
    };

    const filteredTasks = useMemo(() => {
        if (!searchTerm) {
            return tasks;
        }
        return tasks.filter(task =>
            task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.owner.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tasks, searchTerm]);
    
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search tasks by name or owner..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        <PlusIcon />
                        Create New Task
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">
                        <p className="text-lg">Loading tasks...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-red-400">
                        <p className="text-lg">{error}</p>
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={() => promptDeleteTask(task)}
                                onRun={() => handleRunTask(task.id)}
                                onViewDetails={() => handleViewDetails(task)}
                                isRunning={runningTasks.has(task.id)}
                                isDeleting={deletingTasks.has(task.id)}
                            />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-20 bg-slate-800 rounded-lg">
                        <h2 className="text-2xl font-bold text-slate-400">No Tasks Found</h2>
                        <p className="text-slate-500 mt-2">
                            {searchTerm ? `No tasks match your search for "${searchTerm}".` : "Get started by creating a new task!"}
                        </p>
                    </div>
                )}
            </main>

            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Create a New Task">
                <TaskForm onSubmit={handleCreateTask} onCancel={() => setCreateModalOpen(false)} />
            </Modal>
            
            {selectedTask && (
                 <Modal isOpen={isDetailsModalOpen} onClose={() => { setDetailsModalOpen(false); setSelectedTask(null); }} title="Task Details">
                    <TaskDetails task={selectedTask} />
                 </Modal>
            )}

            {executionResult && (
                 <Modal isOpen={!!executionResult} onClose={() => setExecutionResult(null)} title={`Execution Result: ${executionResult.task.name}`}>
                    <ExecutionResult result={executionResult} />
                 </Modal>
            )}

            {taskToDelete && (
                <Modal isOpen={!!taskToDelete} onClose={() => setTaskToDelete(null)} title="Confirm Deletion">
                    <div className="text-slate-300">
                        <p className="mb-6">
                            Are you sure you want to delete the task <strong className="font-bold text-white">{taskToDelete.name}</strong>? 
                            <br />
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setTaskToDelete(null)}
                                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default App;