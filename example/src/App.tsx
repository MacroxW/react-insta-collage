import React, { useState } from 'react';
import { InstaCollage } from '../../src';

interface StorySlide {
  image: string;
  time: string;
  title?: string;
  subtitle?: string;
  footer?: string;
}

interface UserStories {
  username: string;
  profileImage: string;
  slides: StorySlide[];
}

const USER_STORIES: UserStories[] = [
  {
    username: "camiquindi",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        time: "9h",
        title: "Día de playa 🌊",
        subtitle: "Agradecida por este día increíble..."
      },
      {
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
        time: "8h",
        title: "Clases de surf! 🏄‍♀️",
        subtitle: "Intentándolo una vez más"
      }
    ]
  },
  {
    username: "sormorfina",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
        time: "6h",
        title: "Montañas infinitas 🏔️",
        subtitle: "La cima siempre vale el esfuerzo"
      }
    ]
  },
  {
    username: "angie__ff",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
        time: "7h",
        title: "Feliz Cumple Angie! 🎂",
        subtitle: "*Pidiendo los tres deseos* ✨",
        footer: "angie__ff, _.daiarena y 24 personas más"
      },
      {
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
        time: "6h",
        title: "Salud! 🥂",
        subtitle: "Por muchos años más llenos de risas",
        footer: "Con los de siempre ❤️"
      },
      {
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        time: "5h",
        title: "El mejor team ❤️",
        subtitle: "Gracias a todos por venir!",
        footer: "Noche inolvidable"
      }
    ]
  },
  {
    username: "romipaluch",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
        time: "45m",
        title: "Sendero Verde 🌲",
        subtitle: "Respirando aire puro"
      },
      {
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        time: "10m",
        title: "Coffee break ☕",
        subtitle: "Un mimo al alma en la oficina"
      }
    ]
  },
  {
    username: "valenmanera27",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        time: "9h",
        title: "Atardecer mágico 🌅",
        subtitle: "Terminando el día de la mejor manera"
      }
    ]
  }
];

const POSTS = [
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8a383392f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&w=600&q=80",
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(2); // Start with 'angie__ff' (index 2)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleOpenStories = (userIndex = 2) => {
    setCurrentUserIndex(userIndex);
    setCurrentSlideIndex(0);
    setIsOpen(true);
  };

  const handleCloseStories = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    const activeUser = USER_STORIES[currentUserIndex];
    
    // Go to next slide of the current user if available
    if (currentSlideIndex < activeUser.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } 
    // Go to first slide of the next user if available
    else if (currentUserIndex < USER_STORIES.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentSlideIndex(0);
    } 
    // Otherwise, close stories viewer
    else {
      handleCloseStories();
    }
  };

  const handlePrev = () => {
    // Go to previous slide of the current user if available
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    } 
    // Go to last slide of the previous user if available
    else if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      const prevUserSlidesCount = USER_STORIES[prevUserIndex].slides.length;
      setCurrentUserIndex(prevUserIndex);
      setCurrentSlideIndex(prevUserSlidesCount - 1);
    }
  };

  // Dynamically calculate left and right stories relative to currentUserIndex
  const left: any[] = [];
  if (currentUserIndex - 2 >= 0) {
    const u = USER_STORIES[currentUserIndex - 2];
    left.push({
      image: u.slides[0].image,
      username: u.username,
      time: u.slides[0].time,
      profileImage: u.profileImage,
    });
  }
  if (currentUserIndex - 1 >= 0) {
    const u = USER_STORIES[currentUserIndex - 1];
    left.push({
      image: u.slides[0].image,
      username: u.username,
      time: u.slides[0].time,
      profileImage: u.profileImage,
    });
  }

  const right: any[] = [];
  if (currentUserIndex + 1 < USER_STORIES.length) {
    const u = USER_STORIES[currentUserIndex + 1];
    right.push({
      image: u.slides[0].image,
      username: u.username,
      time: u.slides[0].time,
      profileImage: u.profileImage,
    });
  }
  if (currentUserIndex + 2 < USER_STORIES.length) {
    const u = USER_STORIES[currentUserIndex + 2];
    right.push({
      image: u.slides[0].image,
      username: u.username,
      time: u.slides[0].time,
      profileImage: u.profileImage,
    });
  }

  const centerUser = USER_STORIES[currentUserIndex];
  const activeSlide = centerUser.slides[currentSlideIndex];

  const center = {
    image: activeSlide.image,
    username: centerUser.username,
    time: activeSlide.time,
    profileImage: centerUser.profileImage,
    title: activeSlide.title,
    subtitle: activeSlide.subtitle,
    footer: activeSlide.footer,
    activeSlideIndex: currentSlideIndex,
    totalSlides: centerUser.slides.length,
  };

  const handleSelectLeft = (idx: number) => {
    const targetUserIndex = left.length === 2 
      ? currentUserIndex - (2 - idx)
      : currentUserIndex - 1;
    setCurrentUserIndex(targetUserIndex);
    setCurrentSlideIndex(0);
  };

  const handleSelectRight = (idx: number) => {
    const targetUserIndex = currentUserIndex + (idx + 1);
    setCurrentUserIndex(targetUserIndex);
    setCurrentSlideIndex(0);
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen font-sans selection:bg-pink-500/30">
      
      {/* Profile Page Layout (Normal Page) */}
      <div className="max-w-[935px] mx-auto px-4 py-8 md:py-12">
        {/* Profile Header */}
        <header className="flex flex-col sm:flex-row items-center gap-8 md:gap-16 border-b border-neutral-800 pb-10 md:pb-14">
          
          {/* Avatar Container with pulsating gradient ring */}
          <div 
            onClick={() => handleOpenStories(2)}
            className="relative cursor-pointer group"
          >
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 animate-pulse blur-[1px] group-hover:scale-105 transition-transform duration-300"></div>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-black overflow-hidden bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Live indicator badge */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest border border-black shadow-md select-none group-hover:scale-110 transition-transform">
              Stories
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 flex flex-col gap-5 text-center sm:text-left w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center sm:justify-start">
              <h1 className="text-xl md:text-2xl font-light tracking-wide">angie__ff</h1>
              <div className="flex gap-2.5 justify-center">
                <button className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm px-4 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95">
                  Editar perfil
                </button>
                <button 
                  onClick={() => handleOpenStories(2)}
                  className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold text-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-lg shadow-pink-500/15"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Ver Historias
                </button>
              </div>
            </div>

            {/* Stats */}
            <ul className="flex justify-center sm:justify-start gap-8 text-sm md:text-base border-t border-b border-neutral-900 py-3 sm:py-0 sm:border-none">
              <li><span className="font-semibold text-white">6</span> publicaciones</li>
              <li><span className="font-semibold text-white">12.5k</span> seguidores</li>
              <li><span className="font-semibold text-white">418</span> seguidos</li>
            </ul>

            {/* Bio */}
            <div className="text-sm leading-relaxed max-w-md">
              <h2 className="font-semibold text-neutral-100">Angie Fernandez</h2>
              <p className="text-neutral-400 font-light mt-1">🎬 Content Creator & Explorer</p>
              <p className="text-neutral-400 font-light">📍 Buenos Aires, Argentina</p>
              <a href="#" className="text-sky-400 hover:underline font-medium block mt-2 text-[13px]">
                linktr.ee/angie_ff
              </a>
            </div>
          </div>
        </header>

        {/* Posts Tabs */}
        <div className="flex justify-center border-t border-neutral-800 gap-12 text-xs font-bold uppercase tracking-wider text-neutral-400 mt-2">
          <button className="flex items-center gap-1.5 border-t border-white pt-4 text-white cursor-pointer pb-2">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Publicaciones
          </button>
          <button className="flex items-center gap-1.5 pt-4 hover:text-white transition-colors cursor-pointer pb-2">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            Reels
          </button>
          <button className="flex items-center gap-1.5 pt-4 hover:text-white transition-colors cursor-pointer pb-2">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Etiquetadas
          </button>
        </div>

        {/* Posts Grid */}
        <main className="grid grid-cols-3 gap-1 md:gap-7 mt-6">
          {POSTS.map((url, i) => (
            <div 
              key={i} 
              className="relative aspect-square bg-neutral-900 group overflow-hidden cursor-pointer"
              onClick={() => handleOpenStories(i % USER_STORIES.length)}
            >
              <img 
                src={url} 
                alt={`Post ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 z-10 text-white font-semibold">
                <span className="flex items-center gap-1.5 text-sm md:text-base">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  {340 + i * 27}
                </span>
                <span className="flex items-center gap-1.5 text-sm md:text-base">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
                  {28 + i * 4}
                </span>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Stories Viewer Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[fadeIn_0.2s_ease-out]">
          
          {/* Logo (Top Left) */}
          <div className="absolute top-6 left-6 text-white font-bold text-2xl z-20 select-none tracking-wide" style={{ fontFamily: 'cursive' }}>
            Instagram
          </div>

          {/* Close Icon (Top Right) */}
          <button 
            onClick={handleCloseStories}
            className="absolute top-6 right-6 text-white/70 hover:text-white cursor-pointer z-30 transition-transform hover:scale-105 active:scale-95 bg-neutral-900/40 p-2 rounded-full border border-white/5"
            title="Cerrar"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Stories Carousel Collage */}
          <div className="w-full max-w-[1400px]">
            <InstaCollage 
              left={left}
              center={center}
              right={right}
              onPrev={currentUserIndex > 0 || currentSlideIndex > 0 ? handlePrev : undefined}
              onNext={handleNext}
              onSelectLeft={handleSelectLeft}
              onSelectRight={handleSelectRight}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
