# react-insta-collage

A professional React library to create Instagram Story style collages. Perfect for showcases, memes, or portfolio highlights.

![Instagram Collage Preview](https://i.imgur.com/your-preview-here.jpg)

## Features

- 📱 **Responsive Design**: Works on mobile and desktop.
- 🎨 **Instagram Aesthetics**: Authentic Story ring, rounded corners, and overlays.
- ⚡ **Lightweight**: Optimized bundle size with `tsup`.
- 🔷 **TypeScript**: Full type support included.
- 🌈 **Customizable**: Pass your own images and text.

## Installation

```bash
pnpm i react-insta-collage
```

## Usage

```tsx
import { InstaCollage } from 'react-insta-collage';

const MyCollage = () => {
  const centerStory = {
    image: "https://images.unsplash.com/photo-1564564321837-a57b6074de47?auto=format&fit=crop&w=800",
    title: "Gente que odia el invierno",
    subtitle: "*Yo con mi mate*",
    footer: "@mativa.argentina, mativa.rafaela y..."
  };

  const leftStories = [
    { 
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400", 
      username: "camiquindi", 
      time: "9h" 
    },
    { 
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400", 
      username: "sormorfina", 
      time: "6h" 
    }
  ];

  const rightStories = [
    { 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400", 
      username: "romipaluch", 
      time: "45m" 
    },
    { 
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400", 
      username: "valenmanera27", 
      time: "9h",
      extraText: "Feliz cumplee maa\nTe amo ❤️❤️"
    }
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-8">
      <InstaCollage 
        center={centerStory}
        left={leftStories}
        right={rightStories}
      />
    </div>
  );
};
```

## Props

### `InstaCollage`

| Prop | Type | Description |
| :--- | :--- | :--- |
| `center` | `MainStoryData` | Data for the large central image. |
| `left` | `StoryData[]` | Array of 2 stories for the left column. |
| `right` | `StoryData[]` | Array of 2 stories for the right column. |
| `className` | `string` | Optional CSS class for the container. |

### `StoryData`

- `image`: string (URL)
- `username`: string
- `time`: string
- `extraText`: string (optional, supports `\n` for line breaks)
- `profileImage`: string (optional, defaults to `image`)

### `MainStoryData`

- `image`: string (URL)
- `title`: string (optional)
- `subtitle`: string (optional)
- `footer`: string (optional)

## License

MIT © [Marcos Wendy]
