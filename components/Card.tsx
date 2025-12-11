
import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    onClick: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
    // Emoji cards get a simpler, cleaner look. Text cards get the colored border/text.
    
    return (
        <div 
            className={`relative w-full aspect-[4/5] sm:aspect-square perspective-1000 cursor-pointer group touch-manipulation`}
            onClick={() => !card.isFlipped && !card.isMatched && onClick(card.id)}
        >
            <div className={`w-full h-full relative transform-style-3d transition-transform duration-500 ${card.isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-sm bg-white border-2 border-slate-100 flex items-center justify-center hover:-translate-y-1 transition-transform group-hover:border-indigo-100 group-hover:shadow-md">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-300 group-hover:bg-indigo-300 transition-colors"></div>
                    </div>
                </div>

                {/* Front of Card */}
                <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-md border-2 flex items-center justify-center p-2 text-center select-none bg-white transition-all
                    ${card.isMatched ? 'opacity-40 ring-4 ring-emerald-400 border-transparent scale-95' : card.color}
                `}>
                    <span className={`leading-tight font-bold filter drop-shadow-sm ${
                        card.type === 'emoji' ? 'text-4xl sm:text-6xl animate-bounce-slight' : 'text-sm sm:text-lg px-1'
                    }`}>
                        {card.content}
                    </span>
                    
                    {card.isMatched && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-emerald-500 text-white rounded-full p-1 shadow-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
