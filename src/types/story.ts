export interface Chapter {
  id: string;
  number: string;
  title: string;
  story: string;
  photo?: string;
  photoCaption?: string;
  memoryDate?: string;
  memoryTitle?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  rotation?: number; // rotation in degrees e.g. -3, 2, -1, 4
  date?: string;
}

export interface LoveReason {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  story: string;
  photo?: string;
  badge?: string;
}

export interface StoryData {
  id: string;
  yourName: string;
  partnerName: string;
  partnerRoleText: string; // e.g. "For the boy who stole my heart... 💗"
  openingMessage: string;
  chapter1Title: string;
  chapter1Story: string;
  chapters: Chapter[];
  photos: PhotoItem[];
  reasons: LoveReason[];
  memories: string[];
  timeline: TimelineItem[];
  music: string; // "preset:romantic-piano" or Data URL
  musicTitle: string;
  secretMessage: string;
  finalLetterGreeting: string;
  finalLetterBody: string;
  finalLetterSignoff: string;
  finalSecretMessage: string;
  enableHeartRain?: boolean;
  coupleStyle?: 'holding-hands' | 'hugging' | 'kiss' | 'bench';
  createdAt?: number;
  updatedAt?: number;
}
