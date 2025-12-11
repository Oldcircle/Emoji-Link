
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Game } from './pages/Game';
import { Modal } from './components/Modal';
import { ModelConfigPage } from './pages/ModelConfigPage';
import { AppView, GameConfig, GameStats, AIConfig, DICTIONARY } from './types';
import { DEFAULT_AI_CONFIGS } from './services/aiService';
import { Sparkles, X } from 'lucide-react';

const DEFAULT_CONFIG: GameConfig = {
    mode: 'adventure',
    language: 'en',
    sessionTopic: '',
    sessionPairCount: 8,
    currentLevel: 1,
    activeModelConfigId: 'default-gemini'
};

const DEFAULT_STATS: GameStats = {
    gamesPlayed: 0,
    totalWins: 0,
    bestScore: Infinity,
    totalMoves: 0,
    adventureLevel: 1
};

export default function App() {
    // App State
    const [view, setView] = useState<AppView>('dashboard');
    const [config, setConfig] = useState<GameConfig>(() => {
        const saved = localStorage.getItem('emoji_link_config');
        return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    });
    const [stats, setStats] = useState<GameStats>(() => {
        const saved = localStorage.getItem('emoji_link_stats');
        return saved ? JSON.parse(saved) : DEFAULT_STATS;
    });
    const [aiConfigs, setAiConfigs] = useState<AIConfig[]>(() => {
        const saved = localStorage.getItem('emoji_link_ai_configs');
        return saved ? JSON.parse(saved) : DEFAULT_AI_CONFIGS;
    });

    // Custom Mode Setup Modal State
    const [showCustomSetup, setShowCustomSetup] = useState(false);
    const [customTopic, setCustomTopic] = useState('');
    const [customSize, setCustomSize] = useState(8);

    const [showGameOver, setShowGameOver] = useState(false);
    const [lastMoves, setLastMoves] = useState(0);

    // Persistence
    useEffect(() => localStorage.setItem('emoji_link_config', JSON.stringify(config)), [config]);
    useEffect(() => localStorage.setItem('emoji_link_stats', JSON.stringify(stats)), [stats]);
    useEffect(() => localStorage.setItem('emoji_link_ai_configs', JSON.stringify(aiConfigs)), [aiConfigs]);

    const activeAIConfig = aiConfigs.find(c => c.id === config.activeModelConfigId) || aiConfigs[0];
    const t = DICTIONARY[config.language];

    const startAdventure = () => {
        setConfig(prev => ({ ...prev, mode: 'adventure', currentLevel: stats.adventureLevel, sessionPairCount: 8 }));
        setView('game');
    };

    const openCustomSetup = () => {
        setCustomTopic('');
        setCustomSize(8);
        setShowCustomSetup(true);
    };

    const startCustomGame = () => {
        if (!customTopic.trim()) return;
        setConfig(prev => ({ 
            ...prev, 
            mode: 'custom', 
            sessionTopic: customTopic,
            sessionPairCount: customSize 
        }));
        setShowCustomSetup(false);
        setView('game');
    };

    const handleGameEnd = (won: boolean, moves: number) => {
        setLastMoves(moves);
        const newStats = { ...stats };
        newStats.gamesPlayed++;
        newStats.totalMoves += moves;
        
        if (won) {
            newStats.totalWins++;
            newStats.bestScore = Math.min(newStats.bestScore, moves);
            if (config.mode === 'adventure' && config.currentLevel === stats.adventureLevel) {
                newStats.adventureLevel = stats.adventureLevel + 1;
            }
            setShowGameOver(true);
        } else {
            setView('dashboard');
        }
        setStats(newStats);
    };

    const handleNextLevel = () => {
        setShowGameOver(false);
        if (config.mode === 'adventure') {
             setConfig(prev => ({ ...prev, currentLevel: prev.currentLevel + 1 }));
             setView('dashboard');
             setTimeout(() => setView('game'), 10);
        } else {
            // Replay custom
            setView('dashboard');
            setTimeout(() => setView('game'), 10);
        }
    };

    return (
        <Layout currentView={view} language={config.language} onChangeView={setView}>
            
            {view === 'dashboard' && (
                <Dashboard 
                    stats={stats} 
                    language={config.language}
                    onPlayAdventure={startAdventure}
                    onSetupCustom={openCustomSetup}
                />
            )}

            {view === 'settings' && (
                <Settings 
                    config={config} 
                    activeModelName={activeAIConfig.name}
                    setConfig={setConfig} 
                    onOpenModelConfig={() => setView('model-config')}
                    onBack={() => setView('dashboard')}
                />
            )}

            {view === 'model-config' && (
                <ModelConfigPage
                    language={config.language}
                    configs={aiConfigs}
                    activeId={config.activeModelConfigId}
                    onSaveConfigs={setAiConfigs}
                    onSelectActive={(id) => setConfig({ ...config, activeModelConfigId: id })}
                    onClose={() => setView('settings')}
                />
            )}

            {view === 'game' && (
                <Game 
                    config={config} 
                    aiConfig={activeAIConfig}
                    onEndGame={handleGameEnd} 
                    onBack={() => setView('dashboard')}
                />
            )}

            {/* Custom Game Setup Modal */}
            {showCustomSetup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-flip-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="text-emerald-500" size={24} />
                                {t.setupCustom}
                            </h2>
                            <button onClick={() => setShowCustomSetup(false)} className="text-slate-400 hover:text-slate-700">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600 block">{t.enterTopic}</label>
                                <input 
                                    type="text" 
                                    value={customTopic}
                                    onChange={(e) => setCustomTopic(e.target.value)}
                                    placeholder={t.topicPlaceholder}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-lg"
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600 block">{t.selectSize}</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[6, 8, 10, 12].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setCustomSize(size)}
                                            className={`py-3 rounded-xl font-bold border-2 transition-all ${customSize === size ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-500 hover:border-emerald-200'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 text-right">{customSize} {t.pairs} ({customSize * 2} Cards)</p>
                            </div>
                        </div>

                        <button 
                            onClick={startCustomGame}
                            disabled={!customTopic.trim()}
                            className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {t.startCustom}
                        </button>
                    </div>
                </div>
            )}

            <Modal 
                isOpen={showGameOver} 
                moves={lastMoves} 
                language={config.language}
                onRestart={handleNextLevel}
                onHome={() => {
                    setShowGameOver(false);
                    setView('dashboard');
                }}
            />

        </Layout>
    );
}
