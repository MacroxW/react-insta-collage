import React from 'react';
import { StoryData } from '../types';

interface StoryCardProps extends StoryData {
  onClick?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  image,
  username,
  time,
  profileImage,
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-neutral-900 w-full h-full cursor-pointer transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) hover:scale-[1.04] hover:border-white/25 active:scale-[0.98] select-none"
    >
      {/* Background Image - dimmed */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={username}
          className="w-full h-full object-cover brightness-[0.45] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10">
        {/* Profile Ring (Instagram Gradient) */}
        <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 shadow-lg mb-3">
          <div className="w-full h-full rounded-full border-[3px] border-[#18181b] overflow-hidden bg-neutral-800">
            <img
              src={profileImage || image}
              alt={username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Username */}
        <span className="font-semibold text-sm text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate max-w-full">
          {username}
        </span>
        
        {/* Time */}
        <span className="text-[11px] text-white/70 font-medium mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {time}
        </span>
      </div>
    </div>
  );
};
