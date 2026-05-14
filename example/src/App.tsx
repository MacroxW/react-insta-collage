import React from 'react';
// We import from the src folder to test the library during development
import { InstaCollage } from '../../src';

function App() {
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
    <div className="bg-[#111111] min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Instagram Logo */}
      <div className="absolute top-6 left-6 text-white z-10 font-bold text-2xl" style={{ fontFamily: 'cursive' }}>
        Instagram
      </div>
      
      {/* Close Icon */}
      <div className="absolute top-6 right-6 text-white z-10 cursor-pointer">
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>

      <div className="w-full max-w-[1400px]">
        <InstaCollage 
          center={centerStory}
          left={leftStories}
          right={rightStories}
        />
      </div>
    </div>
  );
}

export default App;
