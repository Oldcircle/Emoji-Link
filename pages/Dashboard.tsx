
import React, { useState } from 'react';
import { GameStats, Language, DICTIONARY } from '../types';
import { Trophy, Compass, Bot, Play, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
    stats: GameStats;
    language: Language;
    onPlayAdventure: () => void;
    onSetupCustom: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, language, onPlayAdventure, onSetupCustom }) => {
    const t = DICTIONARY[language];

    const data = [
        { name: t.gamesPlayed, value: stats.gamesPlayed, color: '#6366f1' },
        { name: t.bestScore, value: stats.bestScore === Infinity ? 0 : stats.bestScore, color: '#10b981' },
    ];

    const winRate = stats.gamesPlayed > 0 ? Math.round((stats.totalWins / stats.gamesPlayed) * 100) : 0;

    return (
        <div className="space-y-8 animate-flip-in pb-10">
            {/* Header */}
            <div className="text-center space-y-2 py-4">
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-2">
                    <span className="text-4xl">🧩</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">{t.gameTitle}</h1>
                <p className="text-slate-500 font-medium">{t.subtitle}</p>
            </div>

            {/* Main Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Adventure Mode */}
                <button 
                    onClick={onPlayAdventure}
                    className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-1 text-left shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                    <div className="bg-white/10 backdrop-blur-sm h-full rounded-[20px] p-6 sm:p-8 flex flex-col justify-between relative z-10 border border-white/20">
                        <div className="space-y-4">
                            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                                <Compass className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">{t.adventureMode}</h2>
                                <p className="text-indigo-100 text-sm font-medium opacity-90 leading-relaxed">{t.adventureIntro}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="bg-white text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {t.level} {stats.adventureLevel}
                            </span>
                            <div className="bg-indigo-500/50 p-1.5 rounded-full text-white">
                                <Play size={16} fill="currentColor" />
                            </div>
                        </div>
                    </div>
                    {/* Decor */}
                    <Compass className="absolute -bottom-6 -right-6 text-white opacity-5 w-40 h-40 transform rotate-12" />
                </button>

                {/* Custom Mode */}
                <button 
                    onClick={onSetupCustom}
                    className="group relative overflow-hidden bg-white rounded-3xl p-1 text-left shadow-lg border border-slate-200 hover:border-emerald-400 hover:shadow-emerald-100 hover:scale-[1.02] transition-all duration-300"
                >
                     <div className="h-full rounded-[20px] p-6 sm:p-8 flex flex-col justify-between relative z-10 bg-slate-50/50 group-hover:bg-white transition-colors">
                        <div className="space-y-4">
                            <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner text-emerald-600">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-1">{t.customMode}</h2>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{t.customIntro}</p>
                            </div>
                        </div>
                         <div className="mt-6 flex items-center gap-3">
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                                AI GEN
                            </span>
                            <div className="bg-emerald-500 p-1.5 rounded-full text-white shadow-lg shadow-emerald-200">
                                <Sparkles size={16} />
                            </div>
                        </div>
                    </div>
                    {/* Decor */}
                    <Bot className="absolute -bottom-6 -right-6 text-slate-900 opacity-[0.03] w-40 h-40 transform -rotate-12" />
                </button>
            </div>

            {/* Stats Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
                    <Trophy size={14} /> {t.stats}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                        <p className="text-3xl font-black text-slate-800">{stats.gamesPlayed}</p>
                        <p className="text-sm font-semibold text-slate-400">{t.gamesPlayed}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-black text-indigo-600">{winRate}%</p>
                        <p className="text-sm font-semibold text-slate-400">{t.winRate}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-3xl font-black text-emerald-500">
                            {stats.bestScore === Infinity ? '--' : stats.bestScore}
                        </p>
                        <p className="text-sm font-semibold text-slate-400">{t.bestScore}</p>
                    </div>
                    <div className="space-y-1">
                         <p className="text-3xl font-black text-slate-800">{stats.adventureLevel}</p>
                         <p className="text-sm font-semibold text-slate-400">{t.level}</p>
                    </div>
                </div>

                <div className="h-32 mt-8 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={data}>
                            <XAxis dataKey="name" hide />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={24}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
