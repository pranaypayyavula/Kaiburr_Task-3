import React, { useState } from 'react';
import { Task } from '../types';

interface TaskFormProps {
    onSubmit: (taskData: Omit<Task, 'id' | 'taskExecutions'>) => void;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [command, setCommand] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !owner.trim() || !command.trim()) {
            setError('All fields are required.');
            return;
        }
        setError('');
        onSubmit({ name, owner, command });
    };

    const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const labelClasses = "block text-sm font-medium text-slate-300 mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className={labelClasses}>Task Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g., Deploy Production Server"
                />
            </div>
            <div>
                <label htmlFor="owner" className={labelClasses}>Owner</label>
                <input
                    id="owner"
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g., DevOps Team"
                />
            </div>
            <div>
                <label htmlFor="command" className={labelClasses}>Shell Command</label>
                <textarea
                    id="command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className={`${inputClasses} min-h-[100px] font-mono`}
                    placeholder="e.g., ./deploy.sh --env=production"
                />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Create Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;