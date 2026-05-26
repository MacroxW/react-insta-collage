# react-insta-collage

A React component for building Instagram Stories-style collages with a focused center story, side previews, video support, navigation callbacks, and smooth View Transitions.

[Live demo](https://macroxw.github.io/react-insta-collage/)

![Instagram Collage Preview](https://raw.githubusercontent.com/MacroxW/react-insta-collage/main/example/src/assets/preview.png)

## Features

- Story-style collage layout with a prominent center card and side previews.
- Supports images and videos through the same data model.
- Optional previous/next controls and side-card selection callbacks.
- Built-in progress bars for multi-slide stories.
- Responsive layout for desktop and mobile.
- TypeScript types included.

## Installation

```bash
pnpm add react-insta-collage
```

```bash
npm install react-insta-collage
```

## Basic Usage

```tsx
import { useState } from 'react';
import { InstaCollage, type MainStoryData, type StoryData } from 'react-insta-collage';

const stories: StoryData[] = [
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    username: 'camiquindi',
    time: '9h',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    image: '/video.mp4',
    mediaType: 'video',
    username: 'video.story',
    time: '8h',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    username: 'angie__ff',
    time: '7h',
  },
];

export function Example() {
  const [activeIndex, setActiveIndex] = useState(1);

  const center: MainStoryData = {
    ...stories[activeIndex],
    title: 'Story preview',
    subtitle: 'Images, videos, callbacks, and transitions.',
    activeSlideIndex: 0,
    totalSlides: 1,
  };

  return (
    <InstaCollage
      left={stories.slice(Math.max(0, activeIndex - 2), activeIndex)}
      center={center}
      right={stories.slice(activeIndex + 1, activeIndex + 3)}
      onPrev={activeIndex > 0 ? () => setActiveIndex((index) => index - 1) : undefined}
      onNext={activeIndex < stories.length - 1 ? () => setActiveIndex((index) => index + 1) : undefined}
      onSelectLeft={(index) => setActiveIndex(activeIndex - (2 - index))}
      onSelectRight={(index) => setActiveIndex(activeIndex + index + 1)}
    />
  );
}
```

## API

### `InstaCollage`

| Prop | Type | Description |
| :--- | :--- | :--- |
| `left` | `StoryData[]` | Stories shown to the left of the center card. Usually 0-2 items. |
| `center` | `MainStoryData` | Active center story. |
| `right` | `StoryData[]` | Stories shown to the right of the center card. Usually 0-2 items. |
| `onPrev` | `() => void` | Optional previous callback. If omitted, the previous arrow is hidden. |
| `onNext` | `() => void` | Optional next callback. Used by the arrow and center story advance. |
| `onSelectLeft` | `(index: number) => void` | Called when a visible left story is selected. |
| `onSelectRight` | `(index: number) => void` | Called when a visible right story is selected. |
| `className` | `string` | Optional class name for the collage grid. |

### `StoryData`

```ts
interface StoryData {
  image: string;
  mediaType?: 'image' | 'video';
  username: string;
  time: string;
  extraText?: string;
  profileImage?: string;
  isLoading?: boolean;
}
```

### `MainStoryData`

```ts
interface MainStoryData {
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
```

## Local Example

```bash
pnpm install
pnpm --dir example install
pnpm --dir example dev
```

## License

MIT
