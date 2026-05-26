import type { MainStoryData, StoryData } from '../types';

type MediaType = StoryData['mediaType'] | MainStoryData['mediaType'];

const VIDEO_EXTENSIONS = [
  'mp4',
  'webm',
  'ogg',
  'ogv',
  'mov',
  'm4v',
  'avi',
  'mkv',
];

export function isVideoMedia(src: string, mediaType?: MediaType) {
  if (mediaType) return mediaType === 'video';

  const normalizedSrc = src.trim().toLowerCase();
  if (normalizedSrc.startsWith('data:video/')) return true;

  const pathname = normalizedSrc.split(/[?#]/)[0];
  const extension = pathname.split('.').pop();

  return Boolean(extension && VIDEO_EXTENSIONS.includes(extension));
}
