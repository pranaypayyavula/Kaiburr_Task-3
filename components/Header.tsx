import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
                 <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L100 25V75L50 100L0 75V25L50 0Z" fill="url(#paint0_linear_1_2)"/>
                    <path d="M50 10L84 27.5V72.5L50 90L16 72.5V27.5L50 10Z" fill="url(#paint1_linear_1_2)"/>
                    <defs>
                        <linearGradient id="paint0_linear_1_2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B82F6"/>
                            <stop offset="1" stopColor="#2563EB"/>
                        </linearGradient>
                         <linearGradient id="paint1_linear_1_2" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1E293B"/>
                            <stop offset="1" stopColor="#0F172A"/>
                        </linearGradient>
                    </defs>
                </svg>
                <h1 className="text-2xl font-bold text-white tracking-wider">
                    KAIBURR <span className="font-light text-slate-400">Task Manager</span>
                </h1>
            </div>
             <div className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        </header>
    );
};

export default Header;