import { StoryData } from '../types/story';
import { DEFAULT_STORY } from '../data/defaultStory';

const LOCAL_STORAGE_KEY_PREFIX = 'love_story_data_';
const LOCAL_STORAGE_INDEX_KEY = 'love_stories_saved_list';

export interface SavedStoryMeta {
  id: string;
  partnerName: string;
  yourName: string;
  updatedAt: number;
}

export function generateStoryId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `love-${timestamp}-${random}`;
}

/**
 * Save story to the Express backend API
 */
export async function saveStoryToServer(story: StoryData): Promise<{ id: string; shareUrl: string }> {
  try {
    const response = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story)
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      shareUrl: `${window.location.origin}/?story=${data.id}`
    };
  } catch (error) {
    console.warn('Backend API save failed, using local + URL state fallback:', error);
    // Fallback to URL-based payload sharing
    const encoded = encodeStoryToUrl(story);
    return {
      id: story.id,
      shareUrl: `${window.location.origin}/?data=${encoded}`
    };
  }
}

/**
 * Fetch story from Express backend API
 */
export async function fetchStoryFromServer(id: string): Promise<StoryData | null> {
  try {
    const response = await fetch(`/api/stories/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.story || null;
  } catch (err) {
    console.warn('Error fetching story from server:', err);
    return null;
  }
}

/**
 * Save story locally to device storage
 */
export function saveStoryLocally(story: StoryData) {
  try {
    const enriched = {
      ...story,
      updatedAt: Date.now()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + story.id, JSON.stringify(enriched));

    // Update index list
    const existingIndex = getLocalStoriesList();
    const filtered = existingIndex.filter(item => item.id !== story.id);
    const updated = [
      {
        id: story.id,
        partnerName: story.partnerName,
        yourName: story.yourName,
        updatedAt: enriched.updatedAt
      },
      ...filtered
    ];
    localStorage.setItem(LOCAL_STORAGE_INDEX_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
}

/**
 * Get list of stories saved locally on this device
 */
export function getLocalStoriesList(): SavedStoryMeta[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INDEX_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Load a specific story from local device storage
 */
export function loadStoryLocally(id: string): StoryData | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + id);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Encode story to compact URL parameter
 */
export function encodeStoryToUrl(story: StoryData): string {
  try {
    // Strip large media if needed for URL safety, but keep clean text
    const jsonStr = JSON.stringify(story);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
  } catch (err) {
    console.error('URL encode failed:', err);
    return '';
  }
}

/**
 * Decode story from URL parameter
 */
export function decodeStoryFromUrl(encodedStr: string): StoryData | null {
  try {
    const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedStr))));
    const parsed = JSON.parse(jsonStr);
    return {
      ...DEFAULT_STORY,
      ...parsed
    };
  } catch (err) {
    console.error('URL decode failed:', err);
    return null;
  }
}
