import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InstaCollageProps } from '../types';
import { StoryCard } from './StoryCard';
import { MainStory } from './MainStory';
import { LoadingCard } from './LoadingCard';
import '../styles.css';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getTransitionName = (username: string) => {
  // Replace all non-alphanumeric/hyphen/underscore characters with an underscore
  return `story-card-${username.replace(/[^a-zA-Z0-9-_]/g, '_')}`;
};

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
  const farLeftStory = left.length === 2 ? left[0] : null;
  const nearLeftStory = left.length === 2 ? left[1] : left.length === 1 ? left[0] : null;
  const nearRightStory = right.length >= 1 ? right[0] : null;
  const farRightStory = right.length === 2 ? right[1] : null;

  return (
    <div className="relative w-full flex items-center justify-center select-none py-4">
      
      {/* Navigation Arrow Left */}
      {onPrev && (
        <button 
          onClick={onPrev}
          className="absolute left-4 md:left-[calc(50%-calc(82vh*9/32)-36px)] z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer transform -translate-y-1/2 md:-translate-x-1/2 top-1/2"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {/* Grid Container (5 Horizontal Columns on Desktop) */}
      <div className={cn("grid grid-cols-1 md:grid-cols-[calc(50vh*9/16)_calc(50vh*9/16)_calc(82vh*9/16)_calc(50vh*9/16)_calc(50vh*9/16)] gap-4 lg:gap-8 w-full items-center justify-center px-4 md:px-0", className)}>
        
        {/* Column 1: Far Left (Desktop only) */}
        <div 
          className="hidden md:flex justify-end items-center h-[50vh] transition-all duration-300"
          style={{ 
            opacity: farLeftStory ? 0.38 : 0,
            ['view-transition-name' as any]: farLeftStory ? getTransitionName(farLeftStory.username) : undefined,
            ['view-transition-class' as any]: 'story-card-far'
          }}
        >
          {farLeftStory && (
            <div className="h-[50vh] w-[calc(50vh*9/16)]">
              {farLeftStory.isLoading ? (
                <LoadingCard />
              ) : (
                <StoryCard 
                  {...farLeftStory} 
                  onClick={() => onSelectLeft && onSelectLeft(0)}
                />
              )}
            </div>
          )}
        </div>

        {/* Column 2: Near Left (Desktop only) */}
        <div 
          className="hidden md:flex justify-end items-center h-[50vh] transition-all duration-300"
          style={{ 
            opacity: nearLeftStory ? 0.72 : 0,
            ['view-transition-name' as any]: nearLeftStory ? getTransitionName(nearLeftStory.username) : undefined
          }}
        >
          {nearLeftStory && (
            <div className="h-[50vh] w-[calc(50vh*9/16)]">
              {nearLeftStory.isLoading ? (
                <LoadingCard />
              ) : (
                <StoryCard 
                  {...nearLeftStory} 
                  onClick={() => onSelectLeft && onSelectLeft(left.length - 1)}
                />
              )}
            </div>
          )}
        </div>

        {/* Column 3: Center - Main Story */}
        <div 
          className="flex w-full justify-center items-center h-[82vh] md:h-[82vh] transition-all duration-300"
          style={{ 
            ['view-transition-name' as any]: center.username ? getTransitionName(center.username) : undefined
          }}
        >
          <div className="h-[80vh] md:h-[82vh] w-[calc(80vh*9/16)] md:w-[calc(82vh*9/16)] max-w-full">
            <MainStory 
              {...center} 
              onNext={onNext}
            />
          </div>
        </div>

        {/* Column 4: Near Right (Desktop only) */}
        <div 
          className="hidden md:flex justify-start items-center h-[50vh] transition-all duration-300"
          style={{ 
            opacity: nearRightStory ? 0.72 : 0,
            ['view-transition-name' as any]: nearRightStory ? getTransitionName(nearRightStory.username) : undefined
          }}
        >
          {nearRightStory && (
            <div className="h-[50vh] w-[calc(50vh*9/16)]">
              {nearRightStory.isLoading ? (
                <LoadingCard />
              ) : (
                <StoryCard 
                  {...nearRightStory} 
                  onClick={() => onSelectRight && onSelectRight(0)}
                />
              )}
            </div>
          )}
        </div>

        {/* Column 5: Far Right (Desktop only) */}
        <div 
          className="hidden md:flex justify-start items-center h-[50vh] transition-all duration-300"
          style={{ 
            opacity: farRightStory ? 0.38 : 0,
            ['view-transition-name' as any]: farRightStory ? getTransitionName(farRightStory.username) : undefined,
            ['view-transition-class' as any]: 'story-card-far'
          }}
        >
          {farRightStory && (
            <div className="h-[50vh] w-[calc(50vh*9/16)]">
              {farRightStory.isLoading ? (
                <LoadingCard />
              ) : (
                <StoryCard 
                  {...farRightStory} 
                  onClick={() => onSelectRight && onSelectRight(1)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrow Right */}
      {onNext && (
        <button 
          onClick={onNext}
          className="absolute right-4 md:right-[calc(50%-calc(82vh*9/32)-36px)] z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer transform -translate-y-1/2 top-1/2"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

    </div>
  );
};
