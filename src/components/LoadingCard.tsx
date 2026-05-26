import React from 'react';

export const LoadingCard: React.FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900/60 w-full h-full select-none flex flex-col items-center justify-center p-3 animate-pulse">
      {/* Center Avatar Placeholder */}
      <div className="w-16 h-16 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center mb-3">
        {/* Spinner inside */}
        <div className="w-6 h-6 rounded-full border-[2.5px] border-neutral-700 border-t-pink-500 animate-spin"></div>
      </div>
      
      {/* Username placeholder line */}
      <div className="h-3 w-20 bg-neutral-800 rounded mt-1"></div>
      
      {/* Time placeholder line */}
      <div className="h-2.5 w-8 bg-neutral-800/80 rounded mt-2"></div>
    </div>
  );
};
