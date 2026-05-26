export interface StoryData {
  image: string;
  mediaType?: 'image' | 'video';
  username: string;
  time: string;
  extraText?: string;
  profileImage?: string;
  isLoading?: boolean;
}

export interface MainStoryData {
  image: string;
  mediaType?: 'image' | 'video';
  username?: string;
  time?: string;
  profileImage?: string;
  title?: string;
  subtitle?: string;
  footer?: string;
  activeSlideIndex?: number;
  totalSlides?: number;
}

export interface InstaCollageProps {
  left: StoryData[];
  center: MainStoryData;
  right: StoryData[];
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectLeft?: (index: number) => void;
  onSelectRight?: (index: number) => void;
}
