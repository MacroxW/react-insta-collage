import React, { useState, useEffect, useRef } from 'react';
import { MainStoryData } from '../types';
import { isVideoMedia } from '../utils/media';

interface MainStoryProps extends MainStoryData {
  isActive?: boolean;
  onNext?: () => void;
}

export const MainStory: React.FC<MainStoryProps> = ({
  image,
  mediaType = 'image',
  username = 'instagram_user',
  time = '2h',
  profileImage,
  title,
  subtitle,
  footer,
  isActive = true,
  onNext,
  activeSlideIndex = 0,
  totalSlides = 1,
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(true);
  const isVideo = isVideoMedia(image, mediaType);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance progress bar when active and not paused
  useEffect(() => {
    if (!isActive || isPaused) return;

    const duration = 5000; // 5 seconds per story
    const intervalTime = 50; // Update every 50ms
    const steps = duration / intervalTime;
    const stepIncrement = 100 / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNext) onNext();
          return 100;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isActive, isPaused, onNext, image]); // Reset timer when image changes

  // Reset progress when image changes
  useEffect(() => {
    setProgress(0);
  }, [image]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted || volume === 0;
  }, [isMuted, volume, image]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused || !isActive) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      setIsPaused(true);
    });
  }, [isActive, isPaused, image]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#121212] group flex flex-col justify-between select-none">
      
      {/* Top Header Overlay */}
      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-3 pt-4 pb-12 z-10 pointer-events-auto">
        {/* Progress Bars */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div key={idx} className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-75 ease-linear" 
                style={{ 
                  width: idx < activeSlideIndex 
                    ? '100%' 
                    : idx === activeSlideIndex 
                      ? `${progress}%` 
                      : '0%' 
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* User Info & Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            {/* Profile Image */}
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600">
              <div className="w-full h-full rounded-full border border-black overflow-hidden bg-neutral-800">
                <img
                  src={profileImage || image}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Username & Time */}
            <span className="font-semibold text-[13px] tracking-wide shadow-sm">
              {username}
            </span>
            <span className="text-[11px] text-white/60 font-medium">
              {time}
            </span>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-3">
            {isVideo && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted((current) => !current)}
                  className="hover:scale-110 transition-transform active:scale-95 cursor-pointer text-white/90 hover:text-white"
                  title={isMuted || volume === 0 ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19 5a9 9 0 0 1 0 14"></path>
                      <path d="M15 9a4 4 0 0 1 0 6"></path>
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 accent-white cursor-pointer"
                  aria-label="Video volume"
                />
              </div>
            )}

            {/* Play/Pause Button */}
            <button 
              onClick={() => setIsPaused(!isPaused)} 
              className="hover:scale-110 transition-transform active:scale-95 cursor-pointer text-white/90 hover:text-white"
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>

            {/* Options (Three Dots) */}
            <button className="hover:scale-110 transition-transform active:scale-95 cursor-pointer text-white/90 hover:text-white">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Background Media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            ref={videoRef}
            src={image}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={image}
            alt="Story Content"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Overlays / Story Text */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 pt-20 pb-20 text-white pointer-events-none z-5">
        {title && (
          <div className="text-center mt-6">
            <h2 className="text-xl md:text-2xl font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight tracking-wide uppercase">
              {title}
            </h2>
          </div>
        )}

        <div className="flex flex-col gap-2 items-center text-center mb-6">
          {subtitle && (
            <p className="text-lg md:text-xl font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] italic bg-black/35 px-3 py-1 rounded-lg inline-block mx-auto max-w-[90%]">
              {subtitle}
            </p>
          )}
          {footer && (
            <p className="text-xs text-white/80 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] bg-black/20 px-2 py-0.5 rounded max-w-[90%]">
              {footer}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Bar: Send Message */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-10 z-10 flex items-center gap-3">
        <div className="flex-1 bg-transparent border border-white/40 rounded-full px-4 py-2 text-white/95 text-[13px] placeholder-white/70 backdrop-blur-[2px] focus-within:border-white transition-colors flex items-center">
          <input 
            type="text" 
            placeholder="Enviar mensaje..." 
            className="bg-transparent border-none outline-none w-full text-white placeholder-white/60 pointer-events-auto"
          />
        </div>
        <button className="text-white hover:scale-105 transition-transform active:scale-95 p-1 cursor-pointer pointer-events-auto">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};
