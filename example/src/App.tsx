import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { InstaCollage } from '../../src';
import video1 from './assets/video1.mp4';
import previewPoster from './assets/preview.png';
import previewVideo from './assets/preview.mp4';

const STORY_VIEWER_BRAND = 'gallery';
const MAX_STORY_SLIDES = 10;

// ─── Types ───────────────────────────────────────────────
interface StorySlide {
  image: string;
  mediaType?: 'image' | 'video';
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
      { image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", time: "9h", title: "Beach day", subtitle: "Agradecida por este dia increible..." },
      { image: video1, time: "8h", title: "Video story", subtitle: "Ahora tambien soporta video." },
      { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", time: "7h", title: "Laguna", subtitle: "Primera parada." },
      { image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80", time: "6h", title: "Camino", subtitle: "Luz perfecta." },
      { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", time: "5h", title: "Mirador", subtitle: "Vista abierta." },
      { image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80", time: "4h", title: "Verde", subtitle: "Respirar un poco." },
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80", time: "3h", title: "Casa", subtitle: "Tarde tranquila." },
      { image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", time: "2h", title: "Noche", subtitle: "Cielo limpio." },
      { image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80", time: "1h", title: "Ruta", subtitle: "Sin apuro." },
      { image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80", time: "45m", title: "Hora dorada", subtitle: "Ultima luz." },
      { image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", time: "30m", title: "Extra", subtitle: "Esta slide queda fuera del limite de 10." }
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

// ─── Code Snippets for Documentation ─────────────────────
const INSTALL_CODE = `pnpm install react-insta-collage`;

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
  mediaType?: 'image' | 'video';
  username: string;
  time: string;
  profileImage?: string;
  isLoading?: boolean;   // renders skeleton placeholder
}

// MainStoryData — used for the center card
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
}`;

const PROPS_TABLE = [
  { prop: 'left', type: 'StoryData[]', desc: 'Historias que aparecen a la izquierda del centro.' },
  { prop: 'center', type: 'MainStoryData', desc: 'La historia activa con progreso, media y metadata.' },
  { prop: 'right', type: 'StoryData[]', desc: 'Historias que aparecen a la derecha del centro.' },
  { prop: 'onPrev', type: '() => void', desc: 'Controla el retroceso o esconde la flecha si no existe.' },
  { prop: 'onNext', type: '() => void', desc: 'Controla avance manual y avance automatico.' },
  { prop: 'onSelectLeft', type: '(index) => void', desc: 'Permite saltar a una historia lateral izquierda.' },
  { prop: 'onSelectRight', type: '(index) => void', desc: 'Permite saltar a una historia lateral derecha.' },
  { prop: 'className', type: 'string', desc: 'Clase opcional para adaptar el contenedor.' },
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
    const activeSlides = activeUser.slides.slice(0, MAX_STORY_SLIDES);

    if (currentSlideIndex < activeSlides.length - 1) {
      // Avanza al siguiente slide y guarda
      const nextSlideIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextSlideIndex);
      setSlideIndexMap(prev => ({ ...prev, [activeUser.username]: nextSlideIndex }));
    } else if (currentUserIndex < storiesList.length - 1) {
      // Vamos a la siguiente historia
      const nextUser = storiesList[currentUserIndex + 1];
      const savedSlideIndex = Math.min(slideIndexMap[nextUser.username] ?? 0, nextUser.slides.slice(0, MAX_STORY_SLIDES).length - 1);
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
        const visiblePrevSlides = prevUser.slides.slice(0, MAX_STORY_SLIDES);
        const savedSlideIndex = Math.min(slideIndexMap[prevUser.username] ?? visiblePrevSlides.length - 1, visiblePrevSlides.length - 1);
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
    const savedSlideIndex = Math.min(slideIndexMap[targetUser.username] ?? 0, targetUser.slides.slice(0, MAX_STORY_SLIDES).length - 1);
    triggerTransition(idx === 0 && left.length === 2 ? 'jump-prev' : 'prev', () => {
      setCurrentUserIndex(targetUserIndex);
      setCurrentSlideIndex(savedSlideIndex);
    });
  };

  const handleSelectRight = (idx: number) => {
    const targetUserIndex = currentUserIndex + (idx + 1);
    const targetUser = storiesList[targetUserIndex];
    if (targetUser && targetUser.isLoading) return;
    const savedSlideIndex = Math.min(slideIndexMap[targetUser.username] ?? 0, targetUser.slides.slice(0, MAX_STORY_SLIDES).length - 1);
    triggerTransition(idx === 1 ? 'jump-next' : 'next', () => {
      setCurrentUserIndex(targetUserIndex);
      setCurrentSlideIndex(savedSlideIndex);
    });
  };

  // ─── Derived Story Data ─────────────────────────────────
  const left: any[] = [];
  if (currentUserIndex - 2 >= 0) {
    const u = storiesList[currentUserIndex - 2];
    const visibleSlides = u.slides.slice(0, MAX_STORY_SLIDES);
    const slideIdx = Math.min(slideIndexMap[u.username] ?? 0, visibleSlides.length - 1);
    const slide = visibleSlides[slideIdx] || visibleSlides[0];
    left.push({ image: slide?.image || "", mediaType: slide?.mediaType, username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  if (currentUserIndex - 1 >= 0) {
    const u = storiesList[currentUserIndex - 1];
    const visibleSlides = u.slides.slice(0, MAX_STORY_SLIDES);
    const slideIdx = Math.min(slideIndexMap[u.username] ?? 0, visibleSlides.length - 1);
    const slide = visibleSlides[slideIdx] || visibleSlides[0];
    left.push({ image: slide?.image || "", mediaType: slide?.mediaType, username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  const right: any[] = [];
  if (currentUserIndex + 1 < storiesList.length) {
    const u = storiesList[currentUserIndex + 1];
    const visibleSlides = u.slides.slice(0, MAX_STORY_SLIDES);
    const slideIdx = Math.min(slideIndexMap[u.username] ?? 0, visibleSlides.length - 1);
    const slide = visibleSlides[slideIdx] || visibleSlides[0];
    right.push({ image: slide?.image || "", mediaType: slide?.mediaType, username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  if (currentUserIndex + 2 < storiesList.length) {
    const u = storiesList[currentUserIndex + 2];
    const visibleSlides = u.slides.slice(0, MAX_STORY_SLIDES);
    const slideIdx = Math.min(slideIndexMap[u.username] ?? 0, visibleSlides.length - 1);
    const slide = visibleSlides[slideIdx] || visibleSlides[0];
    right.push({ image: slide?.image || "", mediaType: slide?.mediaType, username: u.username, time: slide?.time || "", profileImage: u.profileImage, isLoading: u.isLoading });
  }
  const centerUser = storiesList[currentUserIndex];
  const centerSlides = centerUser?.slides?.slice(0, MAX_STORY_SLIDES) || [];
  const activeSlide = centerSlides[currentSlideIndex] || { image: "", time: "" };
  const center = {
    image: activeSlide.image,
    mediaType: activeSlide.mediaType,
    username: centerUser?.username,
    time: activeSlide.time,
    profileImage: centerUser?.profileImage,
    title: activeSlide.title,
    subtitle: activeSlide.subtitle,
    footer: activeSlide.footer,
    activeSlideIndex: currentSlideIndex,
    totalSlides: centerSlides.length || 1,
  };
  const hasNext = Boolean(
    centerUser &&
    (currentSlideIndex < centerSlides.length - 1 || currentUserIndex < storiesList.length - 1)
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
      <div className="animate-[fadeIn_0.3s_ease-out]">

          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.22),transparent_34%),linear-gradient(180deg,rgba(147,51,234,0.12),transparent_70%)] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-16">
              <div className="hero-stage relative overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
                <video
                  className="min-h-[560px] w-full object-cover opacity-70 sm:min-h-[620px]"
                  src={previewVideo}
                  poster={previewPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,8,0.15),rgba(6,6,8,0.48)_42%,rgba(6,6,8,0.94)),radial-gradient(circle_at_50%_22%,transparent,rgba(6,6,8,0.72)_72%)]" />

                <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-8 sm:pb-9 lg:px-12 lg:pb-12">
                  <div className="mx-auto max-w-4xl text-center">
                    <div className="hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 backdrop-blur-xl">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium text-neutral-200">Open Source - MIT Licensed</span>
                    </div>

                    <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.02] mb-6">
                      <span className="bg-gradient-to-r from-white via-white to-neutral-300 bg-clip-text text-transparent">Instagram Stories</span>
                      <br />
                      <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-fuchsia-300 bg-clip-text text-transparent">for React</span>
                    </h1>

                    <p className="hero-copy text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                      Componente de collage de historias estilo Instagram con transiciones fluidas,
                      navegacion por teclado y View Transitions API.
                    </p>

                    <div className="hero-actions flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => demoRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-neutral-950 hover:bg-neutral-100 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-white/10 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        Ver Demo en Vivo
                      </button>
                      <div className="flex items-center justify-center bg-black/45 border border-white/12 rounded-xl px-5 py-3 font-mono text-sm text-neutral-200 gap-3 backdrop-blur-xl">
                        <span className="text-pink-300">$</span>
                        <span>pnpm install react-insta-collage</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(INSTALL_CODE)}
                          className="text-neutral-400 hover:text-white transition-colors cursor-pointer ml-1"
                          title="Copiar comando"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Product Highlights */}
          <section className="below-section reveal">
            <div className="below-section-header">
              <div>
                <p>Pensado para stories reales</p>
                <h2>Todo lo dificil ya viene resuelto</h2>
              </div>
              <p>
                Un visor elegante, responsive y controlable desde tu estado de React, listo para imagenes, videos y transiciones fluidas.
              </p>
            </div>
            <div className="feature-panel-grid">
              {[
                { icon: '01', title: 'Movimiento nativo', desc: 'Usa View Transitions para que el cambio entre historias se sienta continuo y moderno.' },
                { icon: '02', title: 'Video e imagen', desc: 'Detecta media mixto y mantiene la experiencia consistente entre formatos.' },
                { icon: '03', title: 'Control total', desc: 'Vos decidis como avanzar, retroceder, saltar usuarios o cerrar el visor.' },
                { icon: '04', title: 'Responsive', desc: 'Collage amplio en desktop y visor concentrado en pantallas chicas.' },
              ].map((f, i) => (
                <div key={i} className="feature-panel reveal-item">
                  <span>{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Developer Experience */}
          <section className="below-section docs-section">
            <div className="below-section-header reveal">
              <div>
                <p>Developer experience</p>
                <h2>Instala, conecta y controla.</h2>
              </div>
              <p>
                La API esta pensada para que puedas traer tus propios datos, manejar la navegacion y customizar el layout sin pelearte con el componente.
              </p>
            </div>

            <div className="docs-layout">

            {/* Quick Start */}
            <div className="doc-panel reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">1</span>
                Instalacion
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Instala el paquete y sumalo a tu app en segundos.</p>
              <div className="ml-11">
                <CodeBlock code={INSTALL_CODE} language="bash" />
              </div>
            </div>

            {/* Usage */}
            <div className="doc-panel reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">2</span>
                Uso basico
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Pasale el centro, los laterales y callbacks de navegacion.</p>
              <div className="ml-11">
                <CodeBlock code={BASIC_USAGE} />
              </div>
            </div>

            {/* Props Table */}
            <div className="doc-panel doc-panel-wide reveal">
              <h2 className="text-xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-sm font-bold">3</span>
                API esencial
              </h2>
              <p className="text-neutral-400 text-sm mb-4 ml-11">Las props clave de <code className="text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded text-xs font-mono">{`<InstaCollage />`}</code>, organizadas para leer rapido.</p>
              <div className="api-card-grid">
                {PROPS_TABLE.map((row) => (
                  <div key={row.prop} className="api-card">
                    <div>
                      <code>{row.prop}</code>
                      <span>{row.type}</span>
                    </div>
                    <p>{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </section>

          {/* ─── LIVE DEMO SECTION ─── */}
          <section ref={demoRef} className="reveal border-t border-neutral-800/50">
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

            {/* Stories Tray */}
            <div className="reveal max-w-3xl mx-auto px-6 pb-20">
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

      {/* ─── STORIES VIEWER MODAL ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute top-6 left-6 text-white font-bold text-2xl z-20 select-none tracking-wide" style={{ fontFamily: 'cursive' }}>{STORY_VIEWER_BRAND}</div>
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
