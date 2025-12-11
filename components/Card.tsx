
import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    onClick: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
    return (
        <div 
            className="relative w-full aspect-[3.5/4] sm:aspect-square perspective-1000 cursor-pointer group touch-manipulation"
            onClick={() => !card.isFlipped && !card.isMatched && onClick(card.id)}
        >
            <div 
                className={`w-full h-full relative transform-style-3d transition-transform duration-500 will-change-transform ${card.isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Back of Card (Hidden when flipped) */}
                <div className="absolute inset-0 backface-hidden rounded-2xl shadow-sm bg-white border-2 border-slate-100 flex items-center justify-center hover:-translate-y-1 transition-transform group-hover:border-indigo-100 group-hover:shadow-md">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-300 group-hover:bg-indigo-400 transition-colors"></div>
                    </div>
                </div>

                {/* Front of Card (Visible when flipped) */}
                <div 
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-md border-2 flex items-center justify-center p-2 text-center select-none bg-white transition-all overflow-hidden
                    ${card.isMatched ? 'opacity-50 ring-4 ring-emerald-400 border-transparent scale-95 grayscale-[0.2]' : card.color}
                `}
                >
                    {/* Visual Decor based on Type */}
                    {card.type === 'text' && (
                        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-current opacity-30"></div>
                    )}
                    {card.type === 'emoji' && (
                        <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.07] filter blur-sm select-none pointer-events-none">
                            {card.content}
                        </div>
                    )}

                    <span className={`leading-tight font-bold relative z-10 filter drop-shadow-sm ${
                        card.type === 'emoji' ? 'text-5xl sm:text-6xl animate-bounce-slight' : 'text-sm sm:text-lg px-1 break-words'
                    }`}>
                        {card.content}
                    </span>
                    
                    {card.isMatched && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="bg-emerald-500 text-white rounded-full p-1.5 shadow-lg animate-in fade-in zoom-in duration-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
