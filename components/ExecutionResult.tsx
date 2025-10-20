import React from 'react';
import { Task, TaskExecution } from '../types';
import { CodeIcon } from './Icons';

interface ExecutionResultProps {
    result: {
        task: Task;
        execution: TaskExecution;
    };
}

const ExecutionResult: React.FC<ExecutionResultProps> = ({ result }) => {
    const { task, execution } = result;

    const duration = (new Date(execution.endTime).getTime() - new Date(execution.startTime).getTime()) / 1000;

    return (
        <div className="space-y-4 text-slate-300">
            <div>
                <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2 mb-1">
                    <CodeIcon />
                    Command Executed
                </h4>
                <pre className="text-slate-200 bg-slate-900 p-3 rounded-md font-mono text-sm whitespace-pre-wrap break-all">
                    {task.command}
                </pre>
            </div>

            <div className="bg-slate-700/50 p-3 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-slate-400 mb-2 gap-2">
                    <span>
                        <strong>Started:</strong> {new Date(execution.startTime).toLocaleString()}
                    </span>
                    <span>
                        <strong>Finished:</strong> {new Date(execution.endTime).toLocaleString()}
                    </span>
                     <span>
                        <strong>Duration:</strong> {duration.toFixed(2)}s
                    </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-400 mt-3 mb-1">Output:</h4>
                <pre className="text-sm text-slate-300 bg-slate-900 p-2 rounded-md font-mono whitespace-pre-wrap break-all max-h-48 overflow-y-auto">
                    {execution.output}
                </pre>
            </div>
        </div>
    );
};

export default ExecutionResult;