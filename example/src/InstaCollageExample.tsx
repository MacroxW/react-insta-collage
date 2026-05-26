import { forwardRef, useEffect, useState } from 'react';
import {
  InstaCollage,
  useInstaCollageStories,
  type StoryElement,
  type UserStoryData,
} from '../../src';
import { isVotingElement, VotingSticker } from './VotingSticker';
import video1 from './assets/video1.mp4';

const STORY_VIEWER_BRAND = 'gallery';
const MAX_STORY_SLIDES = 10;

const createDate = (minutesAgo: number) => {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
};

const renderCustomStoryElement = (element: StoryElement) => {
  if (isVotingElement(element) && element.props) {
    return <VotingSticker {...element.props} />;
  }

  return null;
};

const API_STORIES_RESPONSE: UserStoryData[] = [
  {
    username: 'camiquindi',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'camiquindi-beach-01',
        createdAt: createDate(540),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Beach day',
            x: 0.5,
            y: 0.28,
            style: { font: 'strong', size: 38, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'location',
            name: 'Mar del Plata',
            x: 0.5,
            y: 0.4,
          },
          {
            type: 'poll',
            question: '¿Team playa?',
            options: ['Sí', 'Obvio'],
            x: 0.5,
            y: 0.76,
          },
          {
            type: 'custom',
            name: 'voting',
            x: 0.5,
            y: 0.6,
            props: {
              question: 'Plan de mañana',
              options: [
                { id: 'beach', label: 'Playa', votes: 124 },
                { id: 'city', label: 'Ciudad', votes: 48 },
              ],
              selectedOptionId: 'beach',
            },
          },
        ],
      },
      {
        id: 'camiquindi-video-02',
        createdAt: createDate(480),
        background: {
          type: 'video',
          url: video1,
        },
        elements: [
          {
            type: 'music',
            track: 'Golden Hour',
            artist: 'Demo Artist',
            start_ms: 15000,
            x: 0.5,
            y: 0.16,
          },
          {
            type: 'emoji_slider',
            emoji: '🔥',
            question: '¿Qué tanto mood?',
            x: 0.5,
            y: 0.72,
          },
        ],
      },
      {
        id: 'camiquindi-lagoon-03',
        createdAt: createDate(420),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'mention',
            username: 'sormorfina',
            x: 0.32,
            y: 0.7,
          },
          {
            type: 'hashtag',
            tag: '#travel',
            x: 0.68,
            y: 0.7,
          },
          {
            type: 'link',
            url: 'https://serviweb.online',
            label: 'Ver más',
            x: 0.5,
            y: 0.86,
          },
        ],
      },
    ],
  },
  {
    username: 'sormorfina',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'sormorfina-mountains-01',
        createdAt: createDate(360),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'La cima siempre vale el esfuerzo',
            x: 0.5,
            y: 0.28,
            style: { font: 'serif', size: 28, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'question_box',
            question: '¿Dónde hacemos la próxima?',
            x: 0.5,
            y: 0.72,
          },
        ],
      },
    ],
  },
  {
    username: 'angie__ff',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'angie-birthday-01',
        createdAt: createDate(330),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Feliz Cumple Angie!',
            x: 0.5,
            y: 0.26,
            style: { font: 'strong', size: 34, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'text',
            text: '*Pidiendo los tres deseos*',
            x: 0.5,
            y: 0.62,
            style: { font: 'regular', size: 19, color: '#FFFFFF', align: 'center' },
          },
        ],
      },
    ],
  },
  {
    username: 'romipaluch',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'romi-forest-01',
        createdAt: createDate(45),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'location',
            name: 'Sendero Verde',
            x: 0.5,
            y: 0.22,
          },
          {
            type: 'hashtag',
            tag: '#nature',
            x: 0.5,
            y: 0.78,
          },
        ],
      },
    ],
  },
  {
    username: 'valenmanera27',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'valen-sunset-01',
        createdAt: createDate(35),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Atardecer mágico',
            x: 0.5,
            y: 0.32,
            style: { font: 'strong', size: 32, color: '#FFE082', align: 'center' },
          },
        ],
      },
    ],
  },
  {
    username: 'lucas_travels',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'lucas-stars-01',
        createdAt: createDate(28),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Kilómetros bajo las estrellas',
            x: 0.5,
            y: 0.74,
            style: { font: 'mono', size: 20, color: '#FFFFFF', align: 'center' },
          },
        ],
      },
    ],
  },
];

const fetchUserStories = async (): Promise<{ stories: UserStoryData[] }> => {
  await new Promise(resolve => setTimeout(resolve, 900));

  return {
    stories: API_STORIES_RESPONSE,
  };
};

const InstaCollageExample = forwardRef<HTMLElement>((_, ref) => {
  const [apiStories, setApiStories] = useState<UserStoryData[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState(true);
  const [storiesError, setStoriesError] = useState<string | null>(null);
  const stories = useInstaCollageStories(apiStories, {
    initialUserIndex: 2,
    maxSlides: MAX_STORY_SLIDES,
  });

  useEffect(() => {
    let isMounted = true;

    const loadStories = async () => {
      try {
        setIsLoadingStories(true);
        setStoriesError(null);

        const response = await fetchUserStories();
        if (!isMounted) return;

        setApiStories(response.stories);
      } catch {
        if (isMounted) {
          setStoriesError('No pudimos cargar las historias.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingStories(false);
        }
      }
    };

    loadStories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section ref={ref} className="reveal border-t border-neutral-800/50">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-purple-500/6 to-transparent rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-16 pb-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Demo Interactiva</span>
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto">Hacé click en una historia para abrir el visor. Hay {apiStories.length} usuarios con datos simulados de API.</p>
          </div>
        </div>

        <div className="reveal max-w-3xl mx-auto px-6 pb-20">
          <div className="relative flex items-center justify-start gap-5 py-5 px-5 bg-neutral-900/30 rounded-2xl border border-neutral-800/40 overflow-x-auto no-scrollbar scroll-smooth">
            {isLoadingStories && Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2.5 flex-shrink-0"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-neutral-800/80 animate-pulse" />
                <div className="w-14 h-3 rounded-full bg-neutral-800/80 animate-pulse" />
              </div>
            ))}

            {!isLoadingStories && storiesError && (
              <p className="text-sm text-red-300">{storiesError}</p>
            )}

            {!isLoadingStories && !storiesError && apiStories.map((user, idx) => (
              <div
                key={user.username}
                onClick={() => stories.openAt(idx)}
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

      {stories.isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute top-6 left-6 text-white font-bold text-2xl z-20 select-none tracking-wide" style={{ fontFamily: 'cursive' }}>{STORY_VIEWER_BRAND}</div>
          <button
            onClick={stories.close}
            className="absolute top-6 right-6 text-white/70 hover:text-white cursor-pointer z-30 transition-transform hover:scale-105 active:scale-95 bg-neutral-900/40 p-2 rounded-full border border-white/5"
            title="Cerrar"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <div className="w-full max-w-[1400px]">
            <InstaCollage {...stories.collageProps} renderElement={renderCustomStoryElement} />
          </div>
        </div>
      )}
    </>
  );
});

InstaCollageExample.displayName = 'InstaCollageExample';

export default InstaCollageExample;
