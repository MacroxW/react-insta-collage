import React, { useEffect, useRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InstaCollageProps, StoryData } from '../types';
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
  const previousStoriesRef = useRef<{
    farLeftStory: StoryData | null;
    farRightStory: StoryData | null;
  } | null>(null);
  const [exitingFarLeftStory, setExitingFarLeftStory] = useState<StoryData | null>(null);
  const [exitingFarRightStory, setExitingFarRightStory] = useState<StoryData | null>(null);
  const clearFarLeftTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const clearFarRightTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const visibleUsernames = new Set(
      [farLeftStory, nearLeftStory, center, nearRightStory, farRightStory]
        .map((story) => story?.username)
        .filter(Boolean)
    );
    const previousStories = previousStoriesRef.current;

    if (
      previousStories?.farLeftStory &&
      !visibleUsernames.has(previousStories.farLeftStory.username)
    ) {
      if (clearFarLeftTimerRef.current) clearTimeout(clearFarLeftTimerRef.current);
      setExitingFarLeftStory(previousStories.farLeftStory);
      clearFarLeftTimerRef.current = setTimeout(() => setExitingFarLeftStory(null), 950);
    }

    if (
      previousStories?.farRightStory &&
      !visibleUsernames.has(previousStories.farRightStory.username)
    ) {
      if (clearFarRightTimerRef.current) clearTimeout(clearFarRightTimerRef.current);
      setExitingFarRightStory(previousStories.farRightStory);
      clearFarRightTimerRef.current = setTimeout(() => setExitingFarRightStory(null), 950);
    }

    previousStoriesRef.current = { farLeftStory, farRightStory };
  }, [center.username, farLeftStory, farRightStory, nearLeftStory, nearRightStory]);

  useEffect(() => {
    return () => {
      if (clearFarLeftTimerRef.current) clearTimeout(clearFarLeftTimerRef.current);
      if (clearFarRightTimerRef.current) clearTimeout(clearFarRightTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center select-none py-4">

      <div className="w-full flex items-center justify-center">
        {/* Grid Container with buttons as columns */}
        <div className={cn("grid auto-cols-max grid-flow-col grid-cols-0 md:grid-cols-[auto_calc(50vh*9/16)_calc(50vh*9/16)_calc(82vh*9/16)_calc(50vh*9/16)_calc(50vh*9/16)_auto] gap-4 lg:gap-8 w-full items-center justify-center px-4 md:px-0", className)}>

          {/* Column 0: Navigation Arrow Left */}
          <div className="hidden md:flex justify-center items-center h-[82vh]">
            {onPrev && (
              <button
                onClick={onPrev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}
          </div>

          {/* Column 1: Far Left (Desktop only) */}
          <div
            className="hidden md:flex justify-end items-center h-[50vh]"
            style={{
              opacity: farLeftStory || exitingFarLeftStory ? 0.38 : 0,
            }}
          >
            {(farLeftStory || exitingFarLeftStory) && (
              <div className="relative h-[50vh] w-[calc(50vh*9/16)]">
                {farLeftStory && (
                  <div
                    className="story-card-far-left h-full w-full"
                    style={{
                      viewTransitionName: getTransitionName(farLeftStory.username),
                      viewTransitionClass: 'story-card-far-left'
                    }}
                  >
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
                {exitingFarLeftStory && !exitingFarLeftStory.isLoading && (
                  <div className="story-card-dom-exit-left absolute inset-0 z-20 pointer-events-none">
                    <StoryCard {...exitingFarLeftStory} />
                  </div>
                )}
                {exitingFarLeftStory?.isLoading && (
                  <div className="story-card-dom-exit-left absolute inset-0 z-20 pointer-events-none">
                    <LoadingCard />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Near Left (Desktop only) */}
          <div
            className="hidden md:flex justify-end items-center h-[50vh]"
            style={{
              opacity: nearLeftStory ? 0.72 : 0,
            }}
          >
            {nearLeftStory && (
              <div
                className="story-card-near-left h-[50vh] w-[calc(50vh*9/16)]"
                style={{
                  viewTransitionName: getTransitionName(nearLeftStory.username),
                  viewTransitionClass: 'story-card-near-left'
                }}
              >
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
          <div className="flex w-full justify-center items-center h-[82vh] md:h-[82vh]">
            <div
              className="story-card-center h-[80vh] md:h-[82vh] w-[calc(80vh*9/16)] md:w-[calc(82vh*9/16)] max-w-full"
              style={{
                viewTransitionName: center.username ? getTransitionName(center.username) : undefined,
                viewTransitionClass: 'story-card-center'
              }}
            >
              <MainStory
                {...center}
                onNext={onNext}
              />
            </div>
          </div>

          {/* Column 4: Near Right (Desktop only) */}
          <div
            className="hidden md:flex justify-start items-center h-[50vh]"
            style={{
              opacity: nearRightStory ? 0.72 : 0,
            }}
          >
            {nearRightStory && (
              <div
                className="story-card-near-right h-[50vh] w-[calc(50vh*9/16)]"
                style={{
                  viewTransitionName: getTransitionName(nearRightStory.username),
                  viewTransitionClass: 'story-card-near-right'
                }}
              >
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
            className="hidden md:flex justify-start items-center h-[50vh]"
            style={{
              opacity: farRightStory || exitingFarRightStory ? 0.38 : 0,
            }}
          >
            {(farRightStory || exitingFarRightStory) && (
              <div className="relative h-[50vh] w-[calc(50vh*9/16)]">
                {farRightStory && (
                  <div
                    className="story-card-far-right h-full w-full"
                    style={{
                      viewTransitionName: getTransitionName(farRightStory.username),
                      viewTransitionClass: 'story-card-far-right'
                    }}
                  >
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
                {exitingFarRightStory && !exitingFarRightStory.isLoading && (
                  <div className="story-card-dom-exit-right absolute inset-0 z-20 pointer-events-none">
                    <StoryCard {...exitingFarRightStory} />
                  </div>
                )}
                {exitingFarRightStory?.isLoading && (
                  <div className="story-card-dom-exit-right absolute inset-0 z-20 pointer-events-none">
                    <LoadingCard />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 6: Navigation Arrow Right */}
          <div className="hidden md:flex justify-center items-center h-[82vh]">
            {onNext && (
              <button
                onClick={onNext}
                style={{
                  viewTransitionName: 'nav-button-right',
                  viewTransitionClass: 'nav-button'
                }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
