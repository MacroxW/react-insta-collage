import React from 'react';
import { MainStoryData } from '../types';

export const MainStory: React.FC<MainStoryData> = ({
  image,
  title,
  subtitle,
  footer,
}) => {
  return (
    <div className="relative flex-1 w-full max-w-[420px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-700/80 bg-gray-900 group">
      {/* Top Progress Bar */}
      <div className="absolute top-3 left-4 right-4 flex gap-1 z-10">
        <div className="h-0.5 flex-1 bg-white/40 rounded-full overflow-hidden">
          <div className="h-full bg-white w-full"></div>
        </div>
        <div className="h-0.5 flex-1 bg-white/40 rounded-full"></div>
      </div>

      <img
        src={image}
        alt="Main Story"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlays */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 pt-10 text-white pointer-events-none">
        {title && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight uppercase tracking-tight">
              {title}
            </h2>
          </div>
        )}

        {subtitle && (
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] italic">
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Interaction Icons Top Right */}
      <div className="absolute top-8 right-6 flex gap-4 text-white drop-shadow-lg z-10">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>

      {footer && (
        <div className="absolute bottom-8 left-0 right-0 px-8 text-center">
          <p className="text-xs md:text-sm text-gray-400 font-medium drop-shadow-md">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
};
