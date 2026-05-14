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
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-[23%_1fr_23%] gap-4 md:gap-6 lg:gap-8 p-4 w-full max-w-7xl mx-auto items-center md:items-stretch", className)}>
      
      {/* Left Column */}
      <div className="flex flex-row md:flex-col gap-4 w-full order-2 md:order-1">
        {left.map((story, index) => (
          <div key={index} className="flex-1 md:flex-none h-full flex flex-col justify-center">
            <StoryCard {...story} />
          </div>
        ))}
      </div>

      {/* Center - Main */}
      <div className="flex w-full justify-center order-1 md:order-2">
        <MainStory {...center} />
      </div>

      {/* Right Column */}
      <div className="flex flex-row md:flex-col gap-4 w-full order-3">
        {right.map((story, index) => (
          <div key={index} className="flex-1 md:flex-none h-full flex flex-col justify-center">
            <StoryCard {...story} />
          </div>
        ))}
      </div>
    </div>
  );
};
