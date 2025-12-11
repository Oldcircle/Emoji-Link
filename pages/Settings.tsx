
import React from 'react';
import { GameConfig, DICTIONARY } from '../types';
import { Languages, Box, ChevronRight, Save } from 'lucide-react';

interface SettingsProps {
    config: GameConfig;
    activeModelName: string;
    setConfig: (config: GameConfig) => void;
    onOpenModelConfig: () => void;
    onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ config, activeModelName, setConfig, onOpenModelConfig, onBack }) => {
    const t = DICTIONARY[config.language];

    const handleChange = (key: keyof GameConfig, value: any) => {
        setConfig({ ...config, [key]: value });
    };

    return (
        <div className="max-w-xl mx-auto space-y-8 animate-flip-in py-6">
            <h2 className="text-3xl font-black text-slate-800 text-center mb-2">{t.configTitle}</h2>

            <div className="space-y-4">
                {/* Language */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 text-indigo-600 mb-2">
                        <Languages size={22} />
                        <h3 className="font-bold text-lg">{t.language}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => handleChange('language', 'en')}
                            className={`py-4 px-4 rounded-2xl border-2 font-bold transition-all ${config.language === 'en' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 text-slate-500 hover:border-indigo-200'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => handleChange('language', 'zh')}
                            className={`py-4 px-4 rounded-2xl border-2 font-bold transition-all ${config.language === 'zh' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-100 text-slate-500 hover:border-indigo-200'}`}
                        >
                            中文 (简体)
                        </button>
                    </div>
                </div>

                {/* Model Config Link */}
                <div 
                    onClick={onOpenModelConfig}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <Box size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">{t.modelConfigTitle}</h3>
                            <p className="text-sm font-medium text-slate-400">{activeModelName}</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:text-indigo-500 transition-colors">
                        <ChevronRight size={20} />
                    </div>
                </div>
            </div>

            <button 
                onClick={onBack}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
                <Save size={20} />
                {t.save}
            </button>
        </div>
    );
};
