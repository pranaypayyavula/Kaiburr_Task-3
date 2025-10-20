import React from 'react';
import { Task } from '../types';
import { CodeIcon, UserIcon } from './Icons';

interface TaskDetailsProps {
    task: Task;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string; isCode?: boolean }> = ({ icon, label, value, isCode }) => (
    <div>
        <h4 className="text-sm font-semibold text-slate-400 flex items-center gap-2 mb-1">{icon}{label}</h4>
        {isCode ? (
             <pre className="text-slate-200 bg-slate-900 p-3 rounded-md font-mono text-sm whitespace-pre-wrap break-all">{value}</pre>
        ) : (
            <p className="text-slate-200">{value}</p>
        )}
    </div>
);

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-slate-900/50 rounded-lg space-y-4">
                 <h3 className="text-xl font-bold text-white">{task.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem icon={<UserIcon />} label="Owner" value={task.owner} />
                    <DetailItem icon={<CodeIcon />} label="Command" value={task.command} isCode />
                </div>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-slate-200 mb-2">Execution History</h4>
                {task.taskExecutions.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {task.taskExecutions.slice().reverse().map((exec, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg">
                                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                                    <span>
                                        <strong>Started:</strong> {new Date(exec.startTime).toLocaleString()}
                                    </span>
                                    <span>
                                        <strong>Finished:</strong> {new Date(exec.endTime).toLocaleString()}
                                    </span>
                                </div>
                                <pre className="text-sm text-slate-300 bg-slate-900 p-2 rounded-md font-mono whitespace-pre-wrap break-all">{exec.output}</pre>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 italic p-3 bg-slate-700/50 rounded-lg">No executions recorded for this task yet.</p>
                )}
            </div>
        </div>
    );
};

export default TaskDetails;