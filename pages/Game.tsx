
import React, { useEffect, useState, useRef } from 'react';
import { GameConfig, Card as CardType, DICTIONARY, STATIC_LEVELS, AIConfig } from '../types';
import { generateGamePairs } from '../services/aiService';
import { Card } from '../components/Card';
import { Loader2, RotateCcw, Home, Clock, Hash, AlertTriangle } from 'lucide-react';

interface GameProps {
    config: GameConfig;
    aiConfig: AIConfig;
    onEndGame: (won: boolean, moves: number) => void;
    onBack: () => void;
}

// Visual styles for cards
const COLORS = [
    'bg-red-50 border-red-100 text-red-600',
    'bg-orange-50 border-orange-100 text-orange-600',
    'bg-amber-50 border-amber-100 text-amber-600',
    'bg-yellow-50 border-yellow-100 text-yellow-600',
    'bg-lime-50 border-lime-100 text-lime-600',
    'bg-green-50 border-green-100 text-green-600',
    'bg-emerald-50 border-emerald-100 text-emerald-600',
    'bg-teal-50 border-teal-100 text-teal-600',
    'bg-cyan-50 border-cyan-100 text-cyan-600',
    'bg-sky-50 border-sky-100 text-sky-600',
    'bg-blue-50 border-blue-100 text-blue-600',
    'bg-indigo-50 border-indigo-100 text-indigo-600',
    'bg-violet-50 border-violet-100 text-violet-600',
    'bg-purple-50 border-purple-100 text-purple-600',
    'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-600',
    'bg-pink-50 border-pink-100 text-pink-600',
    'bg-rose-50 border-rose-100 text-rose-600',
];

export const Game: React.FC<GameProps> = ({ config, aiConfig, onEndGame, onBack }) => {
    const t = DICTIONARY[config.language];
    
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedIds, setFlippedIds] = useState<string[]>([]);
    const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
    const [moves, setMoves] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Track initialization to prevent double calls
    const initializedRef = useRef(false);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;
        initGame();
    }, []);

    const initGame = async () => {
        setLoading(true);
        setError(null);
        setMoves(0);
        setTimer(0);
        setMatchedIds(new Set());
        setFlippedIds([]);
        setCards([]);

        try {
            let pairs: { word: string; emoji: string }[] = [];
            let count = config.sessionPairCount;

            if (config.mode === 'adventure') {
                // Static Loading
                const levelIndex = Math.min(config.currentLevel - 1, STATIC_LEVELS.length - 1);
                const levelData = STATIC_LEVELS[levelIndex];
                count = levelData.pairsCount;
                
                pairs = levelData.content.map(item => ({
                    word: config.language === 'zh' ? item.wordZh : item.wordEn,
                    emoji: item.emoji
                }));
            } else {
                // AI Loading
                const topic = config.sessionTopic || (config.language === 'zh' ? '随机' : 'Random');
                try {
                    pairs = await generateGamePairs(topic, count, config.language, aiConfig);
                } catch (e) {
                    console.error("Game Init Error:", e);
                    setError(t.fallbackMessage);
                    // Generate pairs handles fallback internally, but if it bubbled up:
                    pairs = []; 
                }
            }

            if (pairs.length === 0) {
                // Fallback if everything failed extremely
                setError("Failed to load level data.");
                setLoading(false);
                return;
            }

            // Create Cards
            const newCards: CardType[] = [];
            pairs.forEach((pair, index) => {
                const colorClass = COLORS[index % COLORS.length];
                const id1 = `p${index}-word`;
                const id2 = `p${index}-emoji`;
                
                newCards.push({ 
                    id: id1, content: pair.word, type: 'text', 
                    pairId: `pair-${index}`, isFlipped: false, isMatched: false, color: colorClass 
                });
                newCards.push({ 
                    id: id2, content: pair.emoji, type: 'emoji', 
                    pairId: `pair-${index}`, isFlipped: false, isMatched: false, color: colorClass 
                });
            });

            // Shuffle
            for (let i = newCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
            }

            setCards(newCards);
            setGameActive(true);
        } catch (err) {
            console.error(err);
            setError("Unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Timer
    useEffect(() => {
        let interval: any;
        if (gameActive) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameActive]);

    // Match Logic
    useEffect(() => {
        if (flippedIds.length === 2) {
            setMoves(m => m + 1);
            const [id1, id2] = flippedIds;
            const card1 = cards.find(c => c.id === id1);
            const card2 = cards.find(c => c.id === id2);

            if (card1 && card2 && card1.pairId === card2.pairId) {
                setMatchedIds(prev => new Set(prev).add(card1.pairId));
                setCards(prev => prev.map(c => 
                    c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
                ));
                setFlippedIds([]);
            } else {
                const timeoutId = setTimeout(() => {
                    setCards(prev => prev.map(c => 
                        c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
                    ));
                    setFlippedIds([]);
                }, 1000);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [flippedIds, cards]);

    // Win Logic
    useEffect(() => {
        if (cards.length > 0 && matchedIds.size === cards.length / 2) {
            setGameActive(false);
            setTimeout(() => onEndGame(true, moves), 600);
        }
    }, [matchedIds, cards, moves, onEndGame]);

    const handleCardClick = (id: string) => {
        if (!gameActive || flippedIds.length >= 2 || flippedIds.includes(id)) return;
        setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
        setFlippedIds(prev => [...prev, id]);
    };

    // Helper for grid class
    const getGridClass = () => {
        const count = cards.length;
        if (count <= 12) return "grid-cols-3 sm:grid-cols-4"; // 6 pairs
        if (count <= 16) return "grid-cols-4 sm:grid-cols-4"; // 8 pairs
        if (count <= 20) return "grid-cols-4 sm:grid-cols-5"; // 10 pairs
        return "grid-cols-4 sm:grid-cols-6"; // 12+ pairs
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-flip-in">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                    <Loader2 className="animate-spin text-indigo-600 relative z-10" size={64} />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xl font-bold text-slate-700">{t.loading}</p>
                    {config.mode === 'custom' && (
                        <p className="text-sm text-slate-400 font-medium">
                             AI: {aiConfig.modelName}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-flip-in max-w-4xl mx-auto pb-8">
            {/* Header HUD */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 sm:gap-0">
                 <button onClick={onBack} className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all">
                    <Home size={22} />
                </button>

                <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                     <div className="flex items-center gap-2">
                        <Clock size={18} className="text-indigo-500"/>
                        <span className="font-mono font-bold text-slate-700 text-lg">
                            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                        </span>
                    </div>
                    <div className="w-px h-6 bg-slate-100"></div>
                    <div className="flex items-center gap-2">
                        <Hash size={18} className="text-emerald-500"/>
                        <span className="font-mono font-bold text-slate-700 text-lg">{moves}</span>
                    </div>
                </div>

                <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 text-indigo-700 text-sm font-bold truncate max-w-[200px] text-center">
                    {config.mode === 'adventure' 
                        ? `${t.level} ${config.currentLevel}` 
                        : config.sessionTopic}
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-700 text-sm animate-flip-in">
                    <AlertTriangle size={20} />
                    {error}
                </div>
            )}

            {/* Grid */}
            <div className={`grid gap-3 sm:gap-4 ${getGridClass()}`}>
                {cards.map(card => (
                    <Card key={card.id} card={card} onClick={handleCardClick} />
                ))}
            </div>

            <div className="mt-10 text-center">
                 <button 
                    onClick={() => {
                        initializedRef.current = false;
                        initGame();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                    <RotateCcw size={18} />
                    {t.restart}
                </button>
            </div>
        </div>
    );
};
