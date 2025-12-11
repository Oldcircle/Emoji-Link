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
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView('dashboard')}>
                        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                            <BrainCircuit size={24} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900">{t.appTitle}</h1>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{t.subtitle}</p>
                        </div>
                    </div>
                    
                    <nav className="flex gap-1 sm:gap-2">
                         <button 
                            onClick={() => onChangeView('dashboard')}
                            className={`p-2 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-slate-100 text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                            title={t.dashboard}
                        >
                            <LayoutDashboard size={20} />
                        </button>
                        <button 
                            onClick={() => onChangeView('settings')}
                            className={`p-2 rounded-lg transition-colors ${currentView === 'settings' ? 'bg-slate-100 text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
                            title={t.settings}
                        >
                            <Settings size={20} />
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
                {children}
            </main>
        </div>
    );
};