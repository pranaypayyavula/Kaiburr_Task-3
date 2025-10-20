import React, { PropsWithChildren } from 'react';
import { XIcon } from './Icons';

interface ModalProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-700"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;