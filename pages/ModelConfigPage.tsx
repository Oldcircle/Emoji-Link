
import React, { useState, useEffect } from 'react';
import { AIConfig, AIProvider, DICTIONARY, Language } from '../types';
import { DEFAULT_AI_CONFIGS } from '../services/aiService';
import { Plus, Trash2, Save, X, Server, Key, Globe, Box } from 'lucide-react';

interface ModelConfigPageProps {
    language: Language;
    configs: AIConfig[];
    activeId: string;
    onSaveConfigs: (configs: AIConfig[]) => void;
    onSelectActive: (id: string) => void;
    onClose: () => void;
}

export const ModelConfigPage: React.FC<ModelConfigPageProps> = ({ 
    language, configs, activeId, onSaveConfigs, onSelectActive, onClose 
}) => {
    const t = DICTIONARY[language];
    const [localConfigs, setLocalConfigs] = useState<AIConfig[]>(configs);
    const [selectedConfigId, setSelectedConfigId] = useState<string>(activeId);

    // Sync when props change
    useEffect(() => {
        setLocalConfigs(configs);
        setSelectedConfigId(activeId);
    }, [configs, activeId]);

    const handleAdd = () => {
        const newConfig: AIConfig = {
            id: `custom-${Date.now()}`,
            name: 'New Config',
            provider: 'openai',
            apiKey: '',
            baseUrl: '',
            modelName: 'gpt-3.5-turbo'
        };
        setLocalConfigs([...localConfigs, newConfig]);
        setSelectedConfigId(newConfig.id);
    };

    const handleDelete = (id: string) => {
        if (confirm(t.confirmDelete)) {
            const filtered = localConfigs.filter(c => c.id !== id);
            setLocalConfigs(filtered);
            if (selectedConfigId === id && filtered.length > 0) {
                setSelectedConfigId(filtered[0].id);
            }
        }
    };

    const handleChange = (id: string, field: keyof AIConfig, value: string) => {
        setLocalConfigs(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleSaveAll = () => {
        onSaveConfigs(localConfigs);
        onSelectActive(selectedConfigId);
        onClose();
    };

    const currentConfig = localConfigs.find(c => c.id === selectedConfigId);

    return (
        <div className="fixed inset-0 z-[60] bg-slate-100 flex items-center justify-center p-4 sm:p-8 animate-flip-in">
            <div className="bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-2xl flex overflow-hidden border border-slate-200">
                
                {/* Sidebar List */}
                <div className="w-1/3 min-w-[250px] bg-slate-50 border-r border-slate-200 flex flex-col">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                        <h2 className="font-bold text-slate-700">{t.modelConfigTitle}</h2>
                        <button onClick={handleAdd} className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition">
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {localConfigs.map(config => (
                            <div 
                                key={config.id}
                                onClick={() => setSelectedConfigId(config.id)}
                                className={`p-3 rounded-xl cursor-pointer border transition-all ${
                                    selectedConfigId === config.id 
                                    ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500' 
                                    : 'bg-white border-slate-200 hover:border-indigo-300'
                                }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-slate-800 text-sm">{config.name}</div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold mt-1">{config.provider}</div>
                                    </div>
                                    {selectedConfigId === config.id && (
                                        <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Form Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {currentConfig ? (
                        <>
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-indigo-600">
                                    <Server size={20} />
                                    <span className="font-bold text-lg">{t.configTitle}</span>
                                </div>
                                <div className="flex gap-2">
                                     {/* Don't allow deleting the very first default if desired, but here allow all except last one maybe? */}
                                    <button onClick={() => handleDelete(currentConfig.id)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg" title={t.delete}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                {/* Config Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Configuration Name</label>
                                    <input 
                                        type="text" 
                                        value={currentConfig.name}
                                        onChange={(e) => handleChange(currentConfig.id, 'name', e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                {/* Provider */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">{t.provider}</label>
                                    <select 
                                        value={currentConfig.provider}
                                        onChange={(e) => handleChange(currentConfig.id, 'provider', e.target.value as AIProvider)}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                    >
                                        <option value="google">Google Gemini</option>
                                        <option value="openai">OpenAI (GPT)</option>
                                        <option value="deepseek">DeepSeek</option>
                                        <option value="ollama">Ollama (Local)</option>
                                        <option value="other">Other (OpenAI Compatible)</option>
                                    </select>
                                </div>

                                {/* API Key */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Key size={16} /> {t.apiKey}
                                    </label>
                                    <input 
                                        type="password" 
                                        value={currentConfig.apiKey}
                                        onChange={(e) => handleChange(currentConfig.id, 'apiKey', e.target.value)}
                                        placeholder={t.defaultEnv}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                                    />
                                </div>

                                {/* Base URL */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Globe size={16} /> {t.baseUrl}
                                    </label>
                                    <input 
                                        type="text" 
                                        value={currentConfig.baseUrl || ''}
                                        onChange={(e) => handleChange(currentConfig.id, 'baseUrl', e.target.value)}
                                        placeholder="https://api.example.com/v1"
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                                    />
                                    <p className="text-xs text-slate-400">Default: {
                                        currentConfig.provider === 'openai' ? 'https://api.openai.com/v1' :
                                        currentConfig.provider === 'deepseek' ? 'https://api.deepseek.com' :
                                        currentConfig.provider === 'ollama' ? 'http://localhost:11434/v1' :
                                        'Provider Default'
                                    }</p>
                                </div>

                                {/* Model Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Box size={16} /> {t.modelName}
                                    </label>
                                    <input 
                                        type="text" 
                                        value={currentConfig.modelName}
                                        onChange={(e) => handleChange(currentConfig.id, 'modelName', e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                                <button onClick={onClose} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-white transition">
                                    Cancel
                                </button>
                                <button onClick={handleSaveAll} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition flex items-center gap-2">
                                    <Save size={18} />
                                    {t.saveConfig}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            Select a configuration
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
