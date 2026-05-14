import React from 'react';
import { StoryData } from '../types';

export const StoryCard: React.FC<StoryData> = ({
  image,
  username,
  time,
  extraText,
  profileImage,
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[9/16] shadow-xl border border-gray-700/80 group bg-gray-900 w-full max-w-[280px] mx-auto">
      <img
        src={image}
        alt={username}
        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
      />

      {/* Profile Ring */}
      <div className="absolute top-3 left-3 w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-orange-400">
        <div className="w-full h-full rounded-full border-[2.5px] border-black overflow-hidden bg-gray-800">
          <img
            src={profileImage || image}
            alt={username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Three dots icon */}
      <div className="absolute top-4 right-4 text-white opacity-80">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
      </div>

      {/* Info */}
      <div className="absolute bottom-3 left-3 text-white">
        <p className="font-bold text-sm drop-shadow-md">@{username}</p>
        <p className="text-[10px] text-gray-300 font-medium">{time}</p>
      </div>

      {extraText && (
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1.5 rounded-xl max-w-[70%] text-right leading-tight">
          {extraText.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};
