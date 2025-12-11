
import React from 'react';
import { AppView, DICTIONARY, Language } from '../types';
import { BrainCircuit, Settings, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    currentView: AppView;
    language: Language;
    onChangeView: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, language, onChangeView }) => {
    const t = DICTIONARY[language];

    return (
        <div className="min-h-screen text-slate-800 flex flex-col bg-transparent">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onChangeView('dashboard')}>
                        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                            <BrainCircuit size={22} />
                        </div>
                        <div>
                            <h1 className="font-black text-lg leading-none tracking-tight text-slate-800">{t.appTitle}</h1>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">{t.subtitle}</p>
                        </div>
                    </div>
                    
                    <nav className="flex gap-1 sm:gap-2">
                         <button 
                            onClick={() => onChangeView('dashboard')}
                            className={`p-2.5 rounded-xl transition-all ${currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                            title={t.dashboard}
                        >
                            <LayoutDashboard size={20} />
                        </button>
                        <button 
                            onClick={() => onChangeView('settings')}
                            className={`p-2.5 rounded-xl transition-all ${currentView === 'settings' ? 'bg-indigo-50 text-indigo-600 shadow-inner' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                            title={t.settings}
                        >
                            <Settings size={20} />
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col">
                {children}
            </main>
        </div>
    );
};
