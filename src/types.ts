import type { ReactNode } from 'react';

export interface StoryBackground {
  type: 'image' | 'video';
  url: string;
}

export interface StoryElementBase {
  x: number;
  y: number;
  rotation?: number;
}

export interface StoryTextElement extends StoryElementBase {
  type: 'text';
  text: string;
  style?: {
    font?: 'regular' | 'strong' | 'serif' | 'mono';
    size?: number;
    color?: string;
    align?: 'left' | 'center' | 'right';
  };
}

export interface StoryImageElement extends StoryElementBase {
  type: 'image' | 'gif';
  url: string;
  width?: number;
  height?: number;
}

export interface StoryMentionElement extends StoryElementBase {
  type: 'mention';
  username: string;
}

export interface StoryHashtagElement extends StoryElementBase {
  type: 'hashtag';
  tag: string;
}

export interface StoryLocationElement extends StoryElementBase {
  type: 'location';
  name: string;
}

export interface StoryLinkElement extends StoryElementBase {
  type: 'link';
  url: string;
  label: string;
}

export interface StoryMusicElement extends StoryElementBase {
  type: 'music';
  track: string;
  artist: string;
  start_ms?: number;
}

export interface StoryPollElement extends StoryElementBase {
  type: 'poll';
  question: string;
  options: string[];
}

export interface StoryEmojiSliderElement extends StoryElementBase {
  type: 'emoji_slider';
  emoji: string;
  question: string;
}

export interface StoryQuestionBoxElement extends StoryElementBase {
  type: 'question_box';
  question: string;
}

export interface StoryCustomElement<Props = unknown> extends StoryElementBase {
  type: 'custom';
  name: string;
  props?: Props;
}

export type StoryElement =
  | StoryTextElement
  | StoryImageElement
  | StoryMentionElement
  | StoryHashtagElement
  | StoryLocationElement
  | StoryLinkElement
  | StoryMusicElement
  | StoryPollElement
  | StoryEmojiSliderElement
  | StoryQuestionBoxElement
  | StoryCustomElement;

export type StoryElementRenderer = (element: StoryElement, index: number) => ReactNode;

export interface StorySlideData {
  id: string;
  createdAt: string;
  expiresAt?: string;
  background: StoryBackground;
  elements?: StoryElement[];
}

export interface StoryData {
  background: StoryBackground;
  username: string;
  createdAt: string;
  profileImage?: string;
  isLoading?: boolean;
}

export interface MainStoryData extends StorySlideData {
  username?: string;
  profileImage?: string;
  activeSlideIndex?: number;
  totalSlides?: number;
}

export interface UserStoryData {
  username: string;
  profileImage: string;
  slides: StorySlideData[];
  isLoading?: boolean;
}

export interface InstaCollageProps {
  left: StoryData[];
  center: MainStoryData;
  right: StoryData[];
  className?: string;
  renderElement?: StoryElementRenderer;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectLeft?: (index: number) => void;
  onSelectRight?: (index: number) => void;
}

export interface UseInstaCollageStoriesOptions {
  initialUserIndex?: number;
  maxSlides?: number;
  enableViewTransitions?: boolean;
}

export interface UseInstaCollageStoriesReturn {
  isOpen: boolean;
  currentUserIndex: number;
  currentSlideIndex: number;
  left: StoryData[];
  center: MainStoryData;
  right: StoryData[];
  hasPrev: boolean;
  hasNext: boolean;
  openAt: (userIndex?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  selectLeft: (index: number) => void;
  selectRight: (index: number) => void;
  collageProps: InstaCollageProps;
}
