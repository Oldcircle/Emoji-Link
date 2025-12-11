import React from 'react';
import { DICTIONARY, Language } from '../types';
import { RotateCcw, Home, Sparkles } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    moves: number;
    language: Language;
    onRestart: () => void;
    onHome: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, moves, language, onRestart, onHome }) => {
    if (!isOpen) return null;
    const t = DICTIONARY[language];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-flip-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6 transform transition-all scale-100">
                
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce-slight">
                    <Sparkles size={32} />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800">{t.gameOver}</h2>
                    <p className="text-slate-500">{t.match}</p>
                </div>

                <div className="py-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-400 uppercase tracking-wide font-semibold mb-1">{t.moves}</p>
                    <p className="text-3xl font-black text-slate-800">{moves}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={onHome}
                        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        {t.back}
                    </button>
                    <button 
                        onClick={onRestart}
                        className="py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                    >
                        <RotateCcw size={18} />
                        {t.playAgain}
                    </button>
                </div>
            </div>
        </div>
    );
};