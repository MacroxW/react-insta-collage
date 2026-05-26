import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  MainStoryData,
  StoryData,
  UseInstaCollageStoriesOptions,
  UseInstaCollageStoriesReturn,
  UserStoryData,
} from '../types';

const DEFAULT_MAX_STORY_SLIDES = 10;
const TRANSITION_CLASSES = [
  'stories-dir-prev',
  'stories-dir-next',
  'stories-dir-jump-prev',
  'stories-dir-jump-next',
];

type StoryDirection = 'next' | 'prev' | 'jump-next' | 'jump-prev';

const clearTransitionClasses = () => {
  document.documentElement.classList.remove(...TRANSITION_CLASSES);
};

const getVisibleSlides = (user: UserStoryData | undefined, maxSlides: number) => {
  return user?.slides.slice(0, maxSlides) ?? [];
};

const getSavedSlideIndex = (
  user: UserStoryData,
  slideIndexMap: Record<string, number>,
  maxSlides: number,
  fallbackIndex = 0
) => {
  const visibleSlides = getVisibleSlides(user, maxSlides);
  const lastSlideIndex = Math.max(visibleSlides.length - 1, 0);

  return Math.min(slideIndexMap[user.username] ?? fallbackIndex, lastSlideIndex);
};

const toSideStory = (
  user: UserStoryData,
  slideIndexMap: Record<string, number>,
  maxSlides: number
): StoryData => {
  const visibleSlides = getVisibleSlides(user, maxSlides);
  const slideIdx = getSavedSlideIndex(user, slideIndexMap, maxSlides);
  const slide = visibleSlides[slideIdx] || visibleSlides[0];

  return {
    background: slide?.background || { type: 'image', url: '' },
    username: user.username,
    createdAt: slide?.createdAt || '',
    profileImage: user.profileImage,
    isLoading: user.isLoading,
  };
};

export const useInstaCollageStories = (
  stories: UserStoryData[],
  options: UseInstaCollageStoriesOptions = {}
): UseInstaCollageStoriesReturn => {
  const {
    initialUserIndex = 0,
    maxSlides = DEFAULT_MAX_STORY_SLIDES,
    enableViewTransitions = true,
  } = options;
  const safeInitialUserIndex = Math.min(Math.max(initialUserIndex, 0), Math.max(stories.length - 1, 0));
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(safeInitialUserIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideIndexMap, setSlideIndexMap] = useState<Record<string, number>>({});
  const previousStoriesLengthRef = useRef(stories.length);

  const triggerTransition = useCallback(
    (direction: StoryDirection, callback: () => void) => {
      const update = () => {
        flushSync(() => {
          clearTransitionClasses();
          document.documentElement.classList.add(`stories-dir-${direction}`);
          callback();
        });
      };

      if (!enableViewTransitions || typeof document === 'undefined') {
        callback();
        return;
      }

      if (document.startViewTransition) {
        const transition = document.startViewTransition(update);
        transition.finished.then(clearTransitionClasses);
        return;
      }

      update();
    },
    [enableViewTransitions]
  );

  const openAt = useCallback(
    (userIndex = safeInitialUserIndex) => {
      const nextUserIndex = Math.min(Math.max(userIndex, 0), Math.max(stories.length - 1, 0));

      triggerTransition('next', () => {
        setCurrentUserIndex(nextUserIndex);
        setCurrentSlideIndex(0);
        setIsOpen(true);
      });
    },
    [safeInitialUserIndex, stories.length, triggerTransition]
  );

  const close = useCallback(() => {
    triggerTransition('next', () => {
      setIsOpen(false);
      if (typeof document !== 'undefined') {
        clearTransitionClasses();
      }
    });
  }, [triggerTransition]);

  useEffect(() => {
    const activeUser = stories[currentUserIndex];

    if (activeUser && !activeUser.isLoading) {
      setSlideIndexMap(prev => ({ ...prev, [activeUser.username]: currentSlideIndex }));
    }
  }, [currentSlideIndex, currentUserIndex, stories]);

  useEffect(() => {
    const previousStoriesLength = previousStoriesLengthRef.current;
    previousStoriesLengthRef.current = stories.length;

    if (stories.length === 0) {
      setCurrentUserIndex(0);
      setCurrentSlideIndex(0);
      return;
    }

    if (previousStoriesLength === 0) {
      setCurrentUserIndex(safeInitialUserIndex);
      setCurrentSlideIndex(0);
      return;
    }

    if (currentUserIndex > stories.length - 1) {
      setCurrentUserIndex(stories.length - 1);
      setCurrentSlideIndex(0);
    }
  }, [currentUserIndex, safeInitialUserIndex, stories.length]);

  useEffect(() => {
    const activeSlides = getVisibleSlides(stories[currentUserIndex], maxSlides);
    const lastSlideIndex = Math.max(activeSlides.length - 1, 0);

    if (currentSlideIndex > lastSlideIndex) {
      setCurrentSlideIndex(lastSlideIndex);
    }
  }, [currentSlideIndex, currentUserIndex, maxSlides, stories]);

  const left = useMemo(() => {
    const previousStories: StoryData[] = [];

    if (currentUserIndex - 2 >= 0) {
      previousStories.push(toSideStory(stories[currentUserIndex - 2], slideIndexMap, maxSlides));
    }

    if (currentUserIndex - 1 >= 0) {
      previousStories.push(toSideStory(stories[currentUserIndex - 1], slideIndexMap, maxSlides));
    }

    return previousStories;
  }, [currentUserIndex, maxSlides, slideIndexMap, stories]);

  const right = useMemo(() => {
    const nextStories: StoryData[] = [];

    if (currentUserIndex + 1 < stories.length) {
      nextStories.push(toSideStory(stories[currentUserIndex + 1], slideIndexMap, maxSlides));
    }

    if (currentUserIndex + 2 < stories.length) {
      nextStories.push(toSideStory(stories[currentUserIndex + 2], slideIndexMap, maxSlides));
    }

    return nextStories;
  }, [currentUserIndex, maxSlides, slideIndexMap, stories]);

  const center = useMemo<MainStoryData>(() => {
    const centerUser = stories[currentUserIndex];
    const centerSlides = getVisibleSlides(centerUser, maxSlides);
    const activeSlide = centerSlides[currentSlideIndex] || {
      id: '',
      createdAt: '',
      background: { type: 'image' as const, url: '' },
      elements: [],
    };

    return {
      id: activeSlide.id,
      createdAt: activeSlide.createdAt,
      expiresAt: activeSlide.expiresAt,
      background: activeSlide.background,
      elements: activeSlide.elements,
      username: centerUser?.username,
      profileImage: centerUser?.profileImage,
      activeSlideIndex: currentSlideIndex,
      totalSlides: centerSlides.length || 1,
    };
  }, [currentSlideIndex, currentUserIndex, maxSlides, stories]);

  const hasPrev = currentUserIndex > 0 || currentSlideIndex > 0;
  const centerSlides = getVisibleSlides(stories[currentUserIndex], maxSlides);
  const hasNext = Boolean(
    stories[currentUserIndex] &&
    (currentSlideIndex < centerSlides.length - 1 || currentUserIndex < stories.length - 1)
  );

  const next = useCallback(() => {
    const activeUser = stories[currentUserIndex];
    if (!activeUser || activeUser.isLoading) return;

    const activeSlides = getVisibleSlides(activeUser, maxSlides);

    if (currentSlideIndex < activeSlides.length - 1) {
      const nextSlideIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextSlideIndex);
      setSlideIndexMap(prev => ({ ...prev, [activeUser.username]: nextSlideIndex }));
      return;
    }

    if (currentUserIndex < stories.length - 1) {
      const nextUser = stories[currentUserIndex + 1];
      const savedSlideIndex = getSavedSlideIndex(nextUser, slideIndexMap, maxSlides);

      triggerTransition('next', () => {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentSlideIndex(savedSlideIndex);
      });
    }
  }, [currentSlideIndex, currentUserIndex, maxSlides, slideIndexMap, stories, triggerTransition]);

  const prev = useCallback(() => {
    const activeUser = stories[currentUserIndex];
    if (!activeUser) return;

    if (currentSlideIndex > 0) {
      const prevSlideIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevSlideIndex);
      setSlideIndexMap(current => ({ ...current, [activeUser.username]: prevSlideIndex }));
      return;
    }

    if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = stories[prevUserIndex];

      if (prevUser && !prevUser.isLoading) {
        const visiblePrevSlides = getVisibleSlides(prevUser, maxSlides);
        const savedSlideIndex = getSavedSlideIndex(
          prevUser,
          slideIndexMap,
          maxSlides,
          visiblePrevSlides.length - 1
        );

        triggerTransition('prev', () => {
          setCurrentUserIndex(prevUserIndex);
          setCurrentSlideIndex(savedSlideIndex);
        });
      }
    }
  }, [currentSlideIndex, currentUserIndex, maxSlides, slideIndexMap, stories, triggerTransition]);

  const selectLeft = useCallback(
    (idx: number) => {
      const targetUserIndex = left.length === 2 ? currentUserIndex - (2 - idx) : currentUserIndex - 1;
      const targetUser = stories[targetUserIndex];
      if (!targetUser || targetUser.isLoading) return;

      const savedSlideIndex = getSavedSlideIndex(targetUser, slideIndexMap, maxSlides);

      triggerTransition(idx === 0 && left.length === 2 ? 'jump-prev' : 'prev', () => {
        setCurrentUserIndex(targetUserIndex);
        setCurrentSlideIndex(savedSlideIndex);
      });
    },
    [currentUserIndex, left.length, maxSlides, slideIndexMap, stories, triggerTransition]
  );

  const selectRight = useCallback(
    (idx: number) => {
      const targetUserIndex = currentUserIndex + (idx + 1);
      const targetUser = stories[targetUserIndex];
      if (!targetUser || targetUser.isLoading) return;

      const savedSlideIndex = getSavedSlideIndex(targetUser, slideIndexMap, maxSlides);

      triggerTransition(idx === 1 ? 'jump-next' : 'next', () => {
        setCurrentUserIndex(targetUserIndex);
        setCurrentSlideIndex(savedSlideIndex);
      });
    },
    [currentUserIndex, maxSlides, slideIndexMap, stories, triggerTransition]
  );

  const collageProps = useMemo(
    () => ({
      left,
      center,
      right,
      onPrev: hasPrev ? prev : undefined,
      onNext: hasNext ? next : undefined,
      onSelectLeft: selectLeft,
      onSelectRight: selectRight,
    }),
    [center, hasNext, hasPrev, left, next, prev, right, selectLeft, selectRight]
  );

  return {
    isOpen,
    currentUserIndex,
    currentSlideIndex,
    left,
    center,
    right,
    hasPrev,
    hasNext,
    openAt,
    close,
    next,
    prev,
    selectLeft,
    selectRight,
    collageProps,
  };
};
