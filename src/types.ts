export interface StoryData {
  image: string;
  username: string;
  time: string;
  extraText?: string;
  profileImage?: string;
}

export interface MainStoryData {
  image: string;
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
