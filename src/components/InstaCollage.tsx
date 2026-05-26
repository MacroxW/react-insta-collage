import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InstaCollageProps } from '../types';
import { StoryCard } from './StoryCard';
import { MainStory } from './MainStory';
import '../styles.css';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const InstaCollage: React.FC<InstaCollageProps> = ({
  left,
  center,
  right,
  className,
  onPrev,
  onNext,
  onSelectLeft,
  onSelectRight,
}) => {
  // Map horizontal positions in a 5-column carousel:
  // Far Left (0) | Near Left (1) | Center (Main) | Near Right (3) | Far Right (4)
  const farLeftStory = left.length === 2 ? left[0] : null;
  const nearLeftStory = left.length === 2 ? left[1] : left.length === 1 ? left[0] : null;
  const nearRightStory = right.length >= 1 ? right[0] : null;
  const farRightStory = right.length === 2 ? right[1] : null;

  return (
    <div className="relative w-full max-w-[1250px] mx-auto flex items-center justify-center select-none">
      
      {/* Navigation Arrow Left */}
      {onPrev && (
        <button 
          onClick={onPrev}
          className="absolute left-2 md:left-[28.5%] z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer transform -translate-y-1/2 md:-translate-x-1/2 top-1/2"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {/* Grid Container (5 Horizontal Columns on Desktop) */}
      <div className={cn("grid grid-cols-1 md:grid-cols-[14%_14%_1fr_14%_14%] gap-4 lg:gap-6 w-full items-center justify-center px-2 md:px-0", className)}>
        
        {/* Column 1: Far Left (Desktop only) */}
        <div className="hidden md:flex justify-end transition-all duration-350" style={{ transform: 'scale(0.82)', opacity: farLeftStory ? 0.38 : 0 }}>
          {farLeftStory && (
            <StoryCard 
              {...farLeftStory} 
              onClick={() => onSelectLeft && onSelectLeft(0)}
            />
          )}
        </div>

        {/* Column 2: Near Left (Desktop only) */}
        <div className="hidden md:flex justify-end transition-all duration-350" style={{ transform: 'scale(0.92)', opacity: nearLeftStory ? 0.72 : 0 }}>
          {nearLeftStory && (
            <StoryCard 
              {...nearLeftStory} 
              onClick={() => onSelectLeft && onSelectLeft(left.length - 1)}
            />
          )}
        </div>

        {/* Column 3: Center - Main Story */}
        <div className="flex w-full justify-center px-10 md:px-0">
          <MainStory 
            {...center} 
            onNext={onNext}
          />
        </div>

        {/* Column 4: Near Right (Desktop only) */}
        <div className="hidden md:flex justify-start transition-all duration-350" style={{ transform: 'scale(0.92)', opacity: nearRightStory ? 0.72 : 0 }}>
          {nearRightStory && (
            <StoryCard 
              {...nearRightStory} 
              onClick={() => onSelectRight && onSelectRight(0)}
            />
          )}
        </div>

        {/* Column 5: Far Right (Desktop only) */}
        <div className="hidden md:flex justify-start transition-all duration-350" style={{ transform: 'scale(0.82)', opacity: farRightStory ? 0.38 : 0 }}>
          {farRightStory && (
            <StoryCard 
              {...farRightStory} 
              onClick={() => onSelectRight && onSelectRight(1)}
            />
          )}
        </div>
      </div>

      {/* Navigation Arrow Right */}
      {onNext && (
        <button 
          onClick={onNext}
          className="absolute right-2 md:right-[28.5%] z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer transform -translate-y-1/2 md:translate-x-1/2 top-1/2"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

    </div>
  );
};
