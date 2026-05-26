import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { InstaCollage } from '../../src';

// ─── Types ───────────────────────────────────────────────
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
  isLoading?: boolean;
}

// ─── Static Data ─────────────────────────────────────────
const USER_STORIES: UserStories[] = [
  {
    username: "camiquindi",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", time: "9h", title: "Día de playa 🌊", subtitle: "Agradecida por este día increíble..." }
    ]
  },
  {
    username: "sormorfina",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80", time: "6h", title: "Montañas infinitas 🏔️", subtitle: "La cima siempre vale el esfuerzo" }
    ]
  },
  {
    username: "angie__ff",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80", time: "7h", title: "Feliz Cumple Angie! 🎂", subtitle: "*Pidiendo los tres deseos* ✨", footer: "angie__ff, _.daiarena y 24 personas más" }
    ]
  },
  {
    username: "romipaluch",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80", time: "45m", title: "Sendero Verde 🌲", subtitle: "Respirando aire puro" }
    ]
  },
  {
    username: "valenmanera27",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", time: "9h", title: "Atardecer mágico 🌅", subtitle: "Terminando el día de la mejor manera" }
    ]
  },
  {
    username: "lucas_travels",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", time: "8h", title: "Ruta nocturna", subtitle: "Kilómetros bajo las estrellas" }
    ]
  },
  {
    username: "sofia.art",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80", time: "7h", title: "Tarde de museo", subtitle: "Colores que cuentan historias" }
    ]
  },
  {
    username: "marcos_dev",
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", time: "6h", title: "Deploy time", subtitle: "Cerrando el sprint con café" }
    ]
  },
  {
    username: "flor_fit",
    profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80", time: "5h", title: "Entreno del día", subtitle: "Un poco más fuerte que ayer" }
    ]
  },
  {
    username: "mateo_foodie",
    profileImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80", time: "4h", title: "Mesa lista", subtitle: "Probando sabores nuevos" }
    ]
  },
  {
    username: "delfi_music",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80", time: "3h", title: "Soundcheck", subtitle: "Luces prendidas, todo listo" }
    ]
  },
  {
    username: "javi.explores",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80", time: "2h", title: "Camino abierto", subtitle: "Sin mapa por un rato" }
    ]
  },
  {
    username: "belu_design",
    profileImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", time: "2h", title: "Nuevo estudio", subtitle: "Moodboard, luz y foco" }
    ]
  },
  {
    username: "santi.clicks",
    profileImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80", time: "1h", title: "Hora dorada", subtitle: "La cámara no descansa" }
    ]
  },
  {
    username: "coti_green",
    profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", time: "58m", title: "Verde total", subtitle: "Plantas nuevas en casa" }
    ]
  },
  {
    username: "gaston_run",
    profileImage: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80", time: "45m", title: "10K hechos", subtitle: "Buen ritmo, mejores vistas" }
    ]
  },
  {
    username: "luli_style",
    profileImage: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80", time: "35m", title: "Look del día", subtitle: "Simple, cómodo, favorito" }
    ]
  },
  {
    username: "nico_cocina",
    profileImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", time: "30m", title: "Cena casera", subtitle: "Receta improvisada que salió bien" }
    ]
  },
  {
    username: "pau.reads",
    profileImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", time: "20m", title: "Capítulo nuevo", subtitle: "Silencio, manta y lectura" }
    ]
  },
  {
    username: "tomi_sky",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80", time: "12m", title: "Boarding", subtitle: "Próxima parada: aventura" }
    ]
  },
  {
    username: "mora.city",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80",
    slides: [
      { image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80", time: "5m", title: "Luces de ciudad", subtitle: "La noche recién empieza" }
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

// ─── Code Snippets for Documentation ─────────────────────
const INSTALL_CODE = `npm install react-insta-collage`;

const BASIC_USAGE = `import { InstaCollage } from 'react-insta-collage';

function App() {
  return (
    <InstaCollage
      left={leftStories}
      center={centerStory}
      right={rightStories}
      onPrev={handlePrev}
      onNext={handleNext}
      onSelectLeft={handleSelectLeft}
      onSelectRight={handleSelectRight}
    />
  );
}`;

const DATA_EXAMPLE = `// StoryData — used for side cards (left / right)
interface StoryData {
  image: string;
  username: string;
  time: string;
  profileImage?: string;
  isLoading?: boolean;   // renders skeleton placeholder
}

// MainStoryData — used for the center card
interface MainStoryData {
  image: string;
  username?: string;
  time?: string;
  profileImage?: string;
  title?: string;
  subtitle?: string;
  footer?: string;
  activeSlideIndex?: number;
  totalSlides?: number;
}`;

const PROPS_TABLE = [
  { prop: 'left', type: 'StoryData[]', desc: 'Array of 0-2 stories displayed to the left of the center card.' },
  { prop: 'center', type: 'MainStoryData', desc: 'The active story displayed as the main, large card with progress bars and controls.' },
  { prop: 'right', type: 'StoryData[]', desc: 'Array of 0-2 stories displayed to the right of the center card.' },
  { prop: 'onPrev', type: '() => void', desc: 'Callback when navigating to the previous story. Hide the left arrow by passing undefined.' },
  { prop: 'onNext', type: '() => void', desc: 'Callback when navigating to the next story or auto-advancing.' },
  { prop: 'onSelectLeft', type: '(index) => void', desc: 'Callback when clicking a story card on the left side.' },
  { prop: 'onSelectRight', type: '(index) => void', desc: 'Callback when clicking a story card on the right side.' },
  { prop: 'className', type: 'string', desc: 'Optional CSS class name to pass to the container grid.' },
];

// ─── CodeBlock Component ─────────────────────────────────
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group rounded-xl overflow-hidden border border-neutral-800/80 bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/60 border-b border-neutral-800/60">
        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-[13px] leading-relaxed overflow-x-auto text-neutral-300 font-mono no-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════════
function App() {
  const [page, setPage] = useState<'docs' | 'profile'>('docs');
  const [isOpen, setIsOpen] = useState(false);
  const [storiesList, setStoriesList] = useState<UserStories[]>(USER_STORIES);
  const [currentUserIndex, setCurrentUserIndex] = useState(2);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideIndexMap, setSlideIndexMap] = useState<Record<string, number>>({}); // Guardar slide de cada historia
  const demoRef = useRef<HTMLDivElement>(null);

  // ─── View Transitions ───────────────────────────────────
  const triggerTransition = (direction: 'next' | 'prev' | 'jump-next' | 'jump-prev', callback: () => void) => {
    const update = () => {
      flushSync(() => {
        document.documentElement.classList.remove('stories-dir-prev', 'stories-dir-next', 'stories-dir-jump-prev', 'stories-dir-jump-next');
        document.documentElement.classList.add(`stories-dir-${direction}`);
        callback();
      });
    };
    if ('startViewTransition' in document) {
      const transition = (document as any).startViewTransition(update);
      transition.finished.then(() => {
        document.documentElement.classList.remove('stories-dir-prev', 'stories-dir-next', 'stories-dir-jump-prev', 'stories-dir-jump-next');
      });
    } else {
      update();
    }
  };

  const handleOpenStories = (userIndex = 2) => {
    triggerTransition('next', () => {
      setStoriesList(USER_STORIES);
      setCurrentUserIndex(userIndex);
      setCurrentSlideIndex(0);
      setIsOpen(true);
    });
  };

  const handleCloseStories = () => {
    triggerTransition('next', () => {
      setIsOpen(false);
      document.documentElement.classList.remove('stories-dir-prev', 'stories-dir-next', 'stories-dir-jump-prev', 'stories-dir-jump-next');
    });
  };

  // ─── Auto-save current slide to map ───────────────────
  useEffect(() => {
    const activeUser = storiesList[currentUserIndex];
    if (activeUser && !activeUser.isLoading) {
      setSlideIndexMap(prev => ({ ...prev, [activeUser.username]: currentSlideIndex }));
    }
  }, [currentSlideIndex, currentUserIndex, storiesList]);

  // ─── Navigation ─────────────────────────────────────────
  const handleNext = () => {
    const activeUser = storiesList[currentUserIndex];
    if (!activeUser || activeUser.isLoading) return;

    if (currentSlideIndex < activeUser.slides.length - 1) {
      // Avanza al siguiente slide y guarda
      const nextSlideIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextSlideIndex);
      setSlideIndexMap(prev => ({ ...prev, [activeUser.username]: nextSlideIndex }));
    } else if (currentUserIndex < storiesList.length - 1) {
      // Vamos a la siguiente historia
      const nextUser = storiesList[currentUserIndex + 1];
      const savedSlideIndex = slideIndexMap[nextUser.username] ?? 0;
      triggerTransition('next', () => {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentSlideIndex(savedSlideIndex);
      });
    }
  };

  const handlePrev = () => {
    const activeUser = storiesList[currentUserIndex];

    if (currentSlideIndex > 0) {
      // Retrocede al anterior slide y guarda
      const prevSlideIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevSlideIndex);
      setSlideIndexMap(prev => ({ ...prev, [activeUser.username]: prevSlideIndex }));
    } else if (currentUserIndex > 0) {
      // Vamos a la historia anterior
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = storiesList[prevUserIndex];
      if (prevUser && !prevUser.isLoading) {
        // Recupera el último slide guardado o usa el último disponible
        const savedSlideIndex = slideIndexMap[prevUser.username] ?? prevUser.slides.length - 1;
        triggerTransition('prev', () => {
          setCurrentUserIndex(prevUserIndex);
          setCurrentSlideIndex(savedSlideIndex);
        });
      }
    }
  };

  const handleSelectLeft = (idx: number) => {
    const targetUserIndex = left.length === 2 ? currentUserIndex - (2 - idx) : currentUserIndex - 1;
    const targetUser = storiesList[targetUserIndex];
    if (targetUser && targetUser.isLoading) return;
    const savedSlideIndex = slideIndexMap[targetUser.username] ?? 0;
    triggerTransition(idx === 0 && left.length === 2 ? 'jump-prev' : 'prev', () => {
      setCurrentUserIndex(targetUserIndex);
      setCurrentSlideIndex(savedSlideIndex);
    });
  };

  const handleSelectRight = (idx: number) => {
    const targetUserIndex = currentUserIndex + (idx + 1);
    const targetUser = storiesList[targetUserIndex];
    if (targetUser && targetUser.isLoading) return;
    const savedSlideIndex = slideIndexMap[targetUser.username] ?? 0;
    triggerTransition(idx === 1 ? 'jump-next' : 'next', () => {
      setCurrentUserIndex(targetUserIndex);
      setCurrentSlideIndex(savedSlideIndex);
    });
  };

  // ─── Derived Story Data ─────────────────────────────────
  const left: any[] = [];
  if (currentUserIndex - 2 >= 0) {
    const u = storiesList[currentUserIndex - 2];
    const slideIdx = slideIndexMap[u.username] ?? 0;
    const slide = u.slides[slideIdx] || u.slides[0];
    left.push({ image: slide?.image || "", username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  if (currentUserIndex - 1 >= 0) {
    const u = storiesList[currentUserIndex - 1];
    const slideIdx = slideIndexMap[u.username] ?? 0;
    const slide = u.slides[slideIdx] || u.slides[0];
    left.push({ image: slide?.image || "", username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  const right: any[] = [];
  if (currentUserIndex + 1 < storiesList.length) {
    const u = storiesList[currentUserIndex + 1];
    const slideIdx = slideIndexMap[u.username] ?? 0;
    const slide = u.slides[slideIdx] || u.slides[0];
    right.push({ image: slide?.image || "", username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  if (currentUserIndex + 2 < storiesList.length) {
    const u = storiesList[currentUserIndex + 2];
    const slideIdx = slideIndexMap[u.username] ?? 0;
    const slide = u.slides[slideIdx] || u.slides[0];
    right.push({ image: slide?.image || "", username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  const centerUser = storiesList[currentUserIndex];
  const activeSlide = centerUser?.slides?.[currentSlideIndex] || { image: "", time: "" };
  const center = {
    image: activeSlide.image,
    username: centerUser?.username,
    time: activeSlide.time,
    profileImage: centerUser?.profileImage,
    title: activeSlide.title,
    subtitle: activeSlide.subtitle,
    footer: activeSlide.footer,
    activeSlideIndex: currentSlideIndex,
    totalSlides: centerUser?.slides?.length || 1,
  };
  const hasNext = Boolean(
    centerUser &&
    (currentSlideIndex < centerUser.slides.length - 1 || currentUserIndex < storiesList.length - 1)
  );

  // ═══════════════════════════════════════════════════════
  // Render
  // ═══════════════════════════════════════════════════════
  return (
    <div className="bg-[#060608] text-white min-h-screen font-sans selection:bg-pink-500/30">

      {/* ─── Top Nav Bar ─── */}
      <nav className="sticky top-0 z-40 bg-[#060608]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            </div>
            <span className="font-bold text-lg tracking-tight">react-insta-collage</span>
            <span className="text-[10px] font-semibold bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded-full tracking-wider uppercase">v1.0</span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage('docs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${page === 'docs' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              Docs & Demo
            </button>
            <button
              onClick={() => setPage('profile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${page === 'profile' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
            >
              Profile Example
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-neutral-400 hover:text-white transition-colors p-2"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── PAGE: DOCS & DEMO ─── */}
      {page === 'docs' && (
        <div className="animate-[fadeIn_0.3s_ease-out]">

          {/* Hero Section */}
          <section className="relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-pink-500/8 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
              <div className="inline-flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/60 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-neutral-300">Open Source · MIT Licensed</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">Instagram Stories</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">for React</span>
              </h1>

              <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
                Componente de collage de historias estilo Instagram con transiciones fluidas,
                navegación por teclado, lista finita y View Transitions API.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => demoRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Ver Demo en Vivo
                </button>
                <div className="flex items-center bg-neutral-900/80 border border-neutral-800 rounded-xl px-5 py-3 font-mono text-sm text-neutral-300 gap-3">
                  <span className="text-pink-400">$</span>
                  <span>npm install react-insta-collage</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(INSTALL_CODE)}
                    className="text-neutral-500 hover:text-white transition-colors cursor-pointer ml-1"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="max-w-5xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '⚡', title: 'View Transitions', desc: 'Animaciones nativas con la View Transitions API del navegador.' },
                { icon: '✓', title: 'Lista Finita', desc: 'Recorre una colección estable de historias sin reiniciar al final.' },
                { icon: '📱', title: 'Responsive', desc: 'Layout de 5 columnas en desktop, 1 columna en mobile.' },
                { icon: '🎨', title: 'Customizable', desc: 'Pasa tus propios datos, imágenes y callbacks de navegación.' },
              ].map((f, i) => (
                <div key={i} className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl p-5 hover:border-neutral-700/60 transition-colors group">
                  <span className="text-2xl mb-3 block">{f.icon}</span>
                  <h3 className="font-semibold text-sm text-white mb-1.5">{f.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Documentation Sections */}
          <section className="max-w-4xl mx-auto px-6 pb-20 space-y-16">

            {/* Quick Start */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">1</span>
                Instalación
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Instalá el paquete con npm, yarn o pnpm.</p>
              <div className="ml-11">
                <CodeBlock code={INSTALL_CODE} language="bash" />
              </div>
            </div>

            {/* Usage */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">2</span>
                Uso Básico
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Importá el componente y pasale las historias como props.</p>
              <div className="ml-11">
                <CodeBlock code={BASIC_USAGE} />
              </div>
            </div>

            {/* Data Types */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold">3</span>
                Tipos de Datos
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Las interfaces TypeScript que definen la estructura de datos.</p>
              <div className="ml-11">
                <CodeBlock code={DATA_EXAMPLE} language="typescript" />
              </div>
            </div>

            {/* Props Table */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">4</span>
                API Reference
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Props del componente <code className="text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded text-xs font-mono">{`<InstaCollage />`}</code></p>
              <div className="ml-11 overflow-x-auto rounded-xl border border-neutral-800/80 bg-[#0d1117]">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-neutral-800/60">
                      <th className="px-4 py-3 text-neutral-400 font-semibold text-xs uppercase tracking-wider">Prop</th>
                      <th className="px-4 py-3 text-neutral-400 font-semibold text-xs uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-neutral-400 font-semibold text-xs uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROPS_TABLE.map((row, i) => (
                      <tr key={i} className="border-b border-neutral-800/30 last:border-b-0 hover:bg-neutral-800/20 transition-colors">
                        <td className="px-4 py-3 font-mono text-pink-400 text-xs whitespace-nowrap">{row.prop}</td>
                        <td className="px-4 py-3 font-mono text-amber-300/80 text-xs whitespace-nowrap">{row.type}</td>
                        <td className="px-4 py-3 text-neutral-400 text-xs">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ─── LIVE DEMO SECTION ─── */}
          <section ref={demoRef} className="border-t border-neutral-800/50">
            {/* Section ambient glow */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-purple-500/6 to-transparent rounded-full blur-3xl pointer-events-none" />
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-16 pb-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight mb-3">
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Demo Interactiva</span>
                </h2>
                <p className="text-neutral-400 text-sm max-w-lg mx-auto">Hacé click en una historia para abrir el visor. Hay {USER_STORIES.length} usuarios con imágenes distintas y recorrido finito.</p>
              </div>
            </div>

            {/* Stories Count */}
            <div className="max-w-3xl mx-auto px-6 mb-8">
              <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-neutral-800/60 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                        <path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">Historias disponibles</h3>
                      <p className="text-[11px] text-neutral-500">Recorrido lineal, sin loop automático</p>
                    </div>
                  </div>
                  <span className="text-pink-400 font-bold bg-pink-500/10 px-3 py-1 rounded-md text-sm">
                    {USER_STORIES.length} usuarios
                  </span>
                </div>
              </div>
            </div>

            {/* Stories Tray */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
              <div className="relative flex items-center justify-start gap-5 py-5 px-5 bg-neutral-900/30 rounded-2xl border border-neutral-800/40 overflow-x-auto no-scrollbar scroll-smooth">
                {USER_STORIES.map((user, idx) => (
                  <div
                    key={user.username}
                    onClick={() => handleOpenStories(idx)}
                    className="flex flex-col items-center gap-2.5 cursor-pointer group flex-shrink-0"
                  >
                    <div className="relative w-[72px] h-[72px] rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 group-hover:scale-[1.06] active:scale-[0.96] transition-all duration-300 shadow-lg shadow-pink-500/10 group-hover:shadow-pink-500/25">
                      <div className="w-full h-full rounded-full border-2 border-[#060608] overflow-hidden bg-neutral-950">
                        <img src={user.profileImage} alt={user.username} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-neutral-400 group-hover:text-white transition-colors tracking-wide max-w-[80px] truncate text-center">
                      {user.username}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── PAGE: PROFILE EXAMPLE ─── */}
      {page === 'profile' && (
        <div className="animate-[fadeIn_0.3s_ease-out]">
          <div className="max-w-[935px] mx-auto px-4 py-8 md:py-12">

            {/* Stories Tray */}
            <div className="relative flex items-center justify-start gap-6 py-5 px-6 mb-8 bg-neutral-900/20 rounded-2xl border border-neutral-800/50 overflow-x-auto no-scrollbar scroll-smooth">
              {USER_STORIES.map((user, idx) => (
                <div
                  key={user.username}
                  onClick={() => handleOpenStories(idx)}
                  className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
                >
                  <div className="relative w-[72px] h-[72px] rounded-full p-[2.5px] bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 group-hover:scale-[1.04] active:scale-[0.98] transition-all duration-300">
                    <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-neutral-950">
                      <img src={user.profileImage} alt={user.username} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-neutral-300 group-hover:text-white transition-colors tracking-wide max-w-[80px] truncate text-center">
                    {user.username}
                  </span>
                </div>
              ))}
            </div>

            {/* Profile Header */}
            <header className="flex flex-col sm:flex-row items-center gap-8 md:gap-16 border-b border-neutral-800 pb-10 md:pb-14">
              <div onClick={() => handleOpenStories(2)} className="relative cursor-pointer group">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 animate-pulse blur-[1px] group-hover:scale-105 transition-transform duration-300" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-black overflow-hidden bg-neutral-900 group-hover:scale-[1.02] transition-transform duration-300">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest border border-black shadow-md select-none group-hover:scale-110 transition-transform">Stories</div>
              </div>

              <div className="flex-1 flex flex-col gap-5 text-center sm:text-left w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center sm:justify-start">
                  <h1 className="text-xl md:text-2xl font-light tracking-wide">angie__ff</h1>
                  <div className="flex gap-2.5 justify-center">
                    <button className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm px-4 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-95">Editar perfil</button>
                    <button
                      onClick={() => handleOpenStories(2)}
                      className="bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 hover:opacity-90 text-white font-semibold text-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-lg shadow-pink-500/15"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      Ver Historias
                    </button>
                  </div>
                </div>
                <ul className="flex justify-center sm:justify-start gap-8 text-sm md:text-base border-t border-b border-neutral-900 py-3 sm:py-0 sm:border-none">
                  <li><span className="font-semibold text-white">6</span> publicaciones</li>
                  <li><span className="font-semibold text-white">12.5k</span> seguidores</li>
                  <li><span className="font-semibold text-white">418</span> seguidos</li>
                </ul>
                <div className="text-sm leading-relaxed max-w-md">
                  <h2 className="font-semibold text-neutral-100">Angie Fernandez</h2>
                  <p className="text-neutral-400 font-light mt-1">🎬 Content Creator & Explorer</p>
                  <p className="text-neutral-400 font-light">📍 Buenos Aires, Argentina</p>
                  <a href="#" className="text-sky-400 hover:underline font-medium block mt-2 text-[13px]">linktr.ee/angie_ff</a>
                </div>
              </div>
            </header>

            {/* Posts Tabs */}
            <div className="flex justify-center border-t border-neutral-800 gap-12 text-xs font-bold uppercase tracking-wider text-neutral-400 mt-2">
              <button className="flex items-center gap-1.5 border-t border-white pt-4 text-white cursor-pointer pb-2">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                Publicaciones
              </button>
              <button className="flex items-center gap-1.5 pt-4 hover:text-white transition-colors cursor-pointer pb-2">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                Reels
              </button>
              <button className="flex items-center gap-1.5 pt-4 hover:text-white transition-colors cursor-pointer pb-2">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
                  <img src={url} alt={`Post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 z-10 text-white font-semibold">
                    <span className="flex items-center gap-1.5 text-sm md:text-base">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                      {340 + i * 27}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm md:text-base">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" /></svg>
                      {28 + i * 4}
                    </span>
                  </div>
                </div>
              ))}
            </main>
          </div>
        </div>
      )}

      {/* ─── STORIES VIEWER MODAL ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute top-6 left-6 text-white font-bold text-2xl z-20 select-none tracking-wide" style={{ fontFamily: 'cursive' }}>Instagram</div>
          <button
            onClick={handleCloseStories}
            className="absolute top-6 right-6 text-white/70 hover:text-white cursor-pointer z-30 transition-transform hover:scale-105 active:scale-95 bg-neutral-900/40 p-2 rounded-full border border-white/5"
            title="Cerrar"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <div className="w-full max-w-[1400px]">
            <InstaCollage
              left={left}
              center={center}
              right={right}
              onPrev={currentUserIndex > 0 || currentSlideIndex > 0 ? handlePrev : undefined}
              onNext={hasNext ? handleNext : undefined}
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
