export interface StoryData {
  image: string;
  username: string;
  time: string;
  extraText?: string;
  profileImage?: string;
}

export interface MainStoryData {
  image: string;
  title?: string;
  subtitle?: string;
  footer?: string;
}

export interface InstaCollageProps {
  left: StoryData[];
  center: MainStoryData;
  right: StoryData[];
  className?: string;
}
