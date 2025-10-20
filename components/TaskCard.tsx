import React from 'react';
import { Task } from '../types';
import { TrashIcon, PlayIcon, InfoIcon, CodeIcon, UserIcon } from './Icons';

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onRun: () => void;
    onViewDetails: () => void;
    isRunning: boolean;
    isDeleting: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onRun, onViewDetails, isRunning, isDeleting }) => {
    const isLoading = isRunning || isDeleting;
    
    return (
        <div className={`bg-slate-800 rounded-lg border border-slate-700 shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/50 flex flex-col ${isLoading ? 'opacity-50' : ''}`}>
            <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{task.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                   <UserIcon className="text-slate-500" />
                   <span>{task.owner}</span>
                </div>
                 <div className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/50 p-3 rounded-md font-mono">
                    <CodeIcon className="text-slate-500 mt-0.5 flex-shrink-0" />
                    <pre className="whitespace-pre-wrap break-all text-sm">{task.command}</pre>
                </div>
            </div>
            <div className="bg-slate-800/50 border-t border-slate-700 p-3 flex justify-end items-center gap-2">
                <button
                    onClick={onViewDetails}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <InfoIcon />
                    Details
                </button>
                <button
                    onClick={onRun}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 text-sm text-green-300 hover:text-white bg-green-900/50 hover:bg-green-800/70 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                     {isRunning ? (
                         <span className="animate-spin h-4 w-4 border-2 border-transparent border-t-white rounded-full"></span>
                     ) : (
                         <PlayIcon />
                     )}
                    {isRunning ? 'Running...' : 'Run'}
                </button>
                <button
                    onClick={onDelete}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 text-sm text-red-400 hover:text-white bg-red-900/50 hover:bg-red-800/70 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isDeleting ? (
                         <span className="animate-spin h-4 w-4 border-2 border-transparent border-t-white rounded-full"></span>
                     ) : (
                         <TrashIcon />
                     )}
                     {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default TaskCard;