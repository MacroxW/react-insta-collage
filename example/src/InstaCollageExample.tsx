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
    username: 'ava_stone',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'ava-stone-beach-01',
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
            name: 'Harbor Beach',
            x: 0.5,
            y: 0.4,
          },
          {
            type: 'poll',
            question: 'Beach day?',
            options: ['Yes', 'Absolutely'],
            x: 0.5,
            y: 0.76,
          },
          {
            type: 'custom',
            name: 'voting',
            x: 0.5,
            y: 0.6,
            props: {
              question: 'Choose a plan',
              options: [
                { id: 'option-a', label: 'Option A', votes: 124 },
                { id: 'option-b', label: 'Option B', votes: 48 },
              ],
              selectedOptionId: 'option-a',
            },
          },
        ],
      },
      {
        id: 'ava-stone-video-02',
        createdAt: createDate(480),
        background: {
          type: 'video',
          url: video1,
        },
        elements: [
          {
            type: 'music',
            track: 'Golden Hour',
            artist: 'Sample Artist',
            start_ms: 15000,
            x: 0.5,
            y: 0.16,
          },
          {
            type: 'emoji_slider',
            emoji: '🔥',
            question: 'How good is this mood?',
            x: 0.5,
            y: 0.72,
          },
        ],
      },
      {
        id: 'ava-stone-lagoon-03',
        createdAt: createDate(420),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'mention',
            username: 'noah_brooks',
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
            url: 'https://example.com',
            label: 'Learn more',
            x: 0.5,
            y: 0.86,
          },
        ],
      },
    ],
  },
  {
    username: 'noah_brooks',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'noah-brooks-mountains-01',
        createdAt: createDate(360),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'A clean demo story',
            x: 0.5,
            y: 0.28,
            style: { font: 'serif', size: 28, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'question_box',
            question: 'Next example?',
            x: 0.5,
            y: 0.72,
          },
        ],
      },
    ],
  },
  {
    username: 'mia_harper',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'mia-harper-birthday-01',
        createdAt: createDate(330),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Birthday weekend',
            x: 0.5,
            y: 0.26,
            style: { font: 'strong', size: 34, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'text',
            text: 'Sample overlay text',
            x: 0.5,
            y: 0.62,
            style: { font: 'regular', size: 19, color: '#FFFFFF', align: 'center' },
          },
        ],
      },
    ],
  },
  {
    username: 'liam_carter',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'liam-carter-forest-01',
        createdAt: createDate(45),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'location',
            name: 'Pine Trail',
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
    username: 'emma_reed',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'emma-reed-sunset-01',
        createdAt: createDate(35),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Golden sunset',
            x: 0.5,
            y: 0.32,
            style: { font: 'strong', size: 32, color: '#FFE082', align: 'center' },
          },
        ],
      },
    ],
  },
  {
    username: 'jack_walker',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'jack-walker-stars-01',
        createdAt: createDate(28),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Night under the stars',
            x: 0.5,
            y: 0.74,
            style: { font: 'mono', size: 20, color: '#FFFFFF', align: 'center' },
          },
        ],
      },
    ],
  },
  {
    username: 'olivia_lane',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'olivia-lane-coffee-01',
        createdAt: createDate(120),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Coffee and pages',
            x: 0.5,
            y: 0.3,
            style: { font: 'regular', size: 30, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'question_box',
            question: 'Pick a mood',
            x: 0.5,
            y: 0.72,
          },
        ],
      },
    ],
  },
  {
    username: 'ethan_gray',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'ethan-gray-city-01',
        createdAt: createDate(60),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'City view',
            x: 0.5,
            y: 0.2,
            style: { font: 'strong', size: 36, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'location',
            name: 'Metro Center',
            x: 0.5,
            y: 0.35,
          },
          {
            type: 'hashtag',
            tag: '#urban',
            x: 0.5,
            y: 0.8,
          },
        ],
      },
    ],
  },
  {
    username: 'sophia_blake',
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'sophia-blake-food-01',
        createdAt: createDate(15),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Dinner plans',
            x: 0.5,
            y: 0.2,
            style: { font: 'serif', size: 32, color: '#FFD700', align: 'center' },
          },
          {
            type: 'poll',
            question: 'Pick one',
            options: ['Option A', 'Option B'],
            x: 0.5,
            y: 0.7,
          },
        ],
      },
    ],
  },
  {
    username: 'mason_cole',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'mason-cole-gym-01',
        createdAt: createDate(5),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'Activity complete',
            x: 0.5,
            y: 0.15,
            style: { font: 'strong', size: 34, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'emoji_slider',
            emoji: '🏋️',
            question: 'How intense?',
            x: 0.5,
            y: 0.7,
          },
          {
            type: 'hashtag',
            tag: '#fitness',
            x: 0.5,
            y: 0.88,
          },
        ],
      },
    ],
  },
  {
    username: 'chloe_west',
    profileImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&q=80',
    slides: [
      {
        id: 'chloe-west-art-01',
        createdAt: createDate(2),
        background: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
        },
        elements: [
          {
            type: 'text',
            text: 'New gallery wall',
            x: 0.5,
            y: 0.2,
            style: { font: 'regular', size: 28, color: '#FFFFFF', align: 'center' },
          },
          {
            type: 'location',
            name: 'Arts District',
            x: 0.5,
            y: 0.35,
          },
          {
            type: 'link',
            url: 'https://example.com',
            label: 'View details',
            x: 0.5,
            y: 0.78,
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
          setStoriesError('Stories could not be loaded.');
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
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Interactive Demo</span>
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto">Click a story to open the viewer. This demo uses {apiStories.length} fictional users from a simulated API response.</p>
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
            title="Close"
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
