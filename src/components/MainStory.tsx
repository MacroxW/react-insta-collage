import React, { useEffect, useRef, useState } from 'react';
import { MainStoryData, StoryElement } from '../types';
import { isVideoMedia } from '../utils/media';

interface MainStoryProps extends MainStoryData {
  isActive?: boolean;
  onNext?: () => void;
}

const getElementPosition = (element: StoryElement): React.CSSProperties => ({
  left: `${element.x * 100}%`,
  top: `${element.y * 100}%`,
  transform: `translate(-50%, -50%) rotate(${element.rotation ?? 0}deg)`,
});

const renderStoryElement = (element: StoryElement, index: number) => {
  const style = getElementPosition(element);

  switch (element.type) {
    case 'text': {
      const fontClass = element.style?.font === 'strong'
        ? 'font-extrabold uppercase'
        : element.style?.font === 'serif'
          ? 'font-serif font-bold'
          : element.style?.font === 'mono'
            ? 'font-mono font-bold'
            : 'font-semibold';

      return (
        <div
          key={index}
          className={`absolute max-w-[86%] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${fontClass}`}
          style={{
            ...style,
            color: element.style?.color ?? '#fff',
            fontSize: element.style?.size ? `${element.style.size}px` : '24px',
            textAlign: element.style?.align ?? 'center',
          }}
        >
          {element.text}
        </div>
      );
    }

    case 'image':
    case 'gif':
      return (
        <img
          key={index}
          src={element.url}
          alt=""
          className="absolute rounded-xl object-cover drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
          style={{
            ...style,
            width: `${(element.width ?? 0.34) * 100}%`,
            height: `${(element.height ?? 0.34) * 100}%`,
          }}
        />
      );

    case 'mention':
      return (
        <div key={index} className="absolute rounded-full bg-white px-3 py-1.5 text-sm font-bold text-neutral-950 shadow-lg" style={style}>
          @{element.username}
        </div>
      );

    case 'hashtag':
      return (
        <div key={index} className="absolute rounded-full bg-black/45 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md" style={style}>
          {element.tag}
        </div>
      );

    case 'location':
      return (
        <div key={index} className="absolute rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-neutral-950 shadow-lg" style={style}>
          {element.name}
        </div>
      );

    case 'link':
      return (
        <a
          key={index}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute pointer-events-auto rounded-full bg-white px-4 py-2 text-sm font-extrabold text-neutral-950 shadow-lg"
          style={style}
        >
          {element.label}
        </a>
      );

    case 'music':
      return (
        <div key={index} className="absolute max-w-[78%] rounded-2xl bg-black/45 px-4 py-2 text-left text-white shadow-lg backdrop-blur-md" style={style}>
          <p className="text-xs font-extrabold">{element.track}</p>
          <p className="text-[11px] text-white/70">{element.artist}</p>
        </div>
      );

    case 'poll':
      return (
        <div key={index} className="absolute w-[76%] rounded-2xl bg-white p-3 text-center text-neutral-950 shadow-xl" style={style}>
          <p className="mb-2 text-sm font-extrabold">{element.question}</p>
          <div className="grid grid-cols-2 gap-2">
            {element.options.map((option) => (
              <button key={option} className="rounded-xl bg-neutral-100 px-3 py-2 text-xs font-bold">
                {option}
              </button>
            ))}
          </div>
        </div>
      );

    case 'emoji_slider':
      return (
        <div key={index} className="absolute w-[74%] rounded-2xl bg-white p-3 text-center text-neutral-950 shadow-xl" style={style}>
          <p className="mb-2 text-sm font-extrabold">{element.question}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{element.emoji}</span>
            <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500" />
          </div>
        </div>
      );

    case 'question_box':
      return (
        <div key={index} className="absolute w-[76%] rounded-2xl bg-white p-3 text-center text-neutral-950 shadow-xl" style={style}>
          <p className="mb-2 text-sm font-extrabold">{element.question}</p>
          <div className="rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-500">Escribe una respuesta...</div>
        </div>
      );

    default:
      return null;
  }
};

export const MainStory: React.FC<MainStoryProps> = ({
  background,
  username = 'social_app_user',
  createdAt,
  profileImage,
  elements = [],
  isActive = true,
  onNext,
  activeSlideIndex = 0,
  totalSlides = 1,
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(true);
  const isVideo = isVideoMedia(background.url, background.type);
  const videoRef = useRef<HTMLVideoElement>(null);
  const createdDate = createdAt ? new Date(createdAt) : null;
  const timeLabel = createdDate
    ? createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  useEffect(() => {
    if (!isActive || isPaused) return;

    const duration = 5000;
    const intervalTime = 50;
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
  }, [isActive, isPaused, onNext, background.url]);

  useEffect(() => {
    setProgress(0);
  }, [background.url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted || volume === 0;
  }, [isMuted, volume, background.url]);

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
  }, [isActive, isPaused, background.url]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#121212] group flex flex-col justify-between select-none">
      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-3 pt-4 pb-12 z-20 pointer-events-auto">
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
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600">
              <div className="w-full h-full rounded-full border border-black overflow-hidden bg-neutral-800">
                <img
                  src={profileImage || background.url}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="font-semibold text-[13px] tracking-wide shadow-sm">
              {username}
            </span>
            <span className="text-[11px] text-white/60 font-medium">
              {timeLabel}
            </span>
          </div>

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

      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            ref={videoRef}
            src={background.url}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={background.url}
            alt="Story content"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {elements.map(renderStoryElement)}
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-10 z-20 flex items-center gap-3">
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
