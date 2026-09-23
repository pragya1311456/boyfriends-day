import React, { useState, useRef } from 'react';
import { StoryData, Chapter, PhotoItem, LoveReason, TimelineItem } from '../types/story';
import { generateStoryId } from '../utils/storage';
import { ImageWithFallback } from './ImageWithFallback';
import { CartoonCoupleSVG, CouplePoseType } from './CartoonCouple';
import { romanticAudio } from '../utils/audioPlayer';
import {
  Heart,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Save,
  Share2,
  Music,
  Play,
  Pause,
  ArrowLeft,
  Sparkles,
  Calendar,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

interface CustomizePageProps {
  currentStory: StoryData;
  onSave: (story: StoryData) => Promise<{ id: string; shareUrl: string }>;
  onPreview: (story: StoryData) => void;
  onClose: () => void;
}

export const CustomizePage: React.FC<CustomizePageProps> = ({
  currentStory,
  onSave,
  onPreview,
  onClose
}) => {
  // Working draft state
  const [formData, setFormData] = useState<StoryData>(() => {
    // If working on default template, create a fresh ID so it never overwrites Person A/B
    const isTemplate = currentStory.id === 'template-default';
    return {
      ...currentStory,
      id: isTemplate ? generateStoryId() : currentStory.id
    };
  });

  const [activeTab, setActiveTab] = useState<'basics' | 'photos' | 'reasons' | 'timeline' | 'chapters' | 'music' | 'letters'>('basics');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [audioPreviewPlaying, setAudioPreviewPlaying] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const songInputRef = useRef<HTMLInputElement>(null);

  // Field change handler
  const handleFieldChange = (field: keyof StoryData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // --- Photo Management Handlers ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newPhoto: PhotoItem = {
          id: `photo-${Date.now()}-${idx}`,
          url: dataUrl,
          caption: 'My favorite moment with you ❤️',
          rotation: Math.floor(Math.random() * 6) - 3,
          date: 'Special Memory'
        };
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, newPhoto]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdatePhotoCaption = (id: string, caption: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.map(p => p.id === id ? { ...p, caption } : p)
    }));
  };

  const handleUpdatePhotoDate = (id: string, date: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.map(p => p.id === id ? { ...p, date } : p)
    }));
  };

  const handleDeletePhoto = (id: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== id)
    }));
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    setFormData(prev => {
      const photos = [...prev.photos];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= photos.length) return prev;
      const temp = photos[index];
      photos[index] = photos[targetIdx];
      photos[targetIdx] = temp;
      return { ...prev, photos };
    });
  };

  // --- Reasons Handlers ---
  const handleAddReason = () => {
    const newReason: LoveReason = {
      id: `reason-${Date.now()}`,
      emoji: '💖',
      title: 'The Way You Look At Me',
      description: 'Every time your eyes meet mine, my whole world stops.'
    };
    setFormData(prev => ({
      ...prev,
      reasons: [...prev.reasons, newReason]
    }));
  };

  const handleUpdateReason = (id: string, updates: Partial<LoveReason>) => {
    setFormData(prev => ({
      ...prev,
      reasons: prev.reasons.map(r => r.id === id ? { ...r, ...updates } : r)
    }));
  };

  const handleDeleteReason = (id: string) => {
    setFormData(prev => ({
      ...prev,
      reasons: prev.reasons.filter(r => r.id !== id)
    }));
  };

  // --- Timeline Handlers ---
  const handleAddTimelineItem = () => {
    const newItem: TimelineItem = {
      id: `timeline-${Date.now()}`,
      date: 'Today & Always',
      title: 'Another Sweet Milestone ❤️',
      story: 'Every second spent together adds another page to our unforgettable adventure.'
    };
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, newItem]
    }));
  };

  const handleUpdateTimelineItem = (id: string, updates: Partial<TimelineItem>) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  };

  const handleDeleteTimelineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter(t => t.id !== id)
    }));
  };

  // --- Dynamic Chapters Handlers ---
  const handleAddChapter = () => {
    const nextNum = formData.chapters.length + 1;
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      number: `Chapter ${nextNum}`,
      title: 'Our Secret Hideaway',
      story: 'Whenever we are together, the whole world feels like a quiet dream. I wrote this chapter to celebrate all the little moments that belong only to us.',
      memoryDate: 'Forever'
    };
    setFormData(prev => ({
      ...prev,
      chapters: [...prev.chapters, newChapter]
    }));
  };

  const handleUpdateChapter = (id: string, updates: Partial<Chapter>) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.map(c => c.id === id ? { ...c, ...updates } : c)
    }));
  };

  const handleDeleteChapter = (id: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter(c => c.id !== id)
    }));
  };

  const handleMoveChapter = (index: number, direction: 'up' | 'down') => {
    setFormData(prev => {
      const chapters = [...prev.chapters];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= chapters.length) return prev;
      const temp = chapters[index];
      chapters[index] = chapters[targetIdx];
      chapters[targetIdx] = temp;
      return { ...prev, chapters };
    });
  };

  // --- Music Handlers ---
  const handleSongUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const title = file.name.replace(/\.[^/.]+$/, '');
      setFormData(prev => ({
        ...prev,
        music: dataUrl,
        musicTitle: `${title} 🎵`
      }));
      romanticAudio.setTrack(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const toggleAudioPreview = () => {
    if (audioPreviewPlaying) {
      romanticAudio.pause();
      setAudioPreviewPlaying(false);
    } else {
      romanticAudio.setTrack(formData.music);
      romanticAudio.play();
      setAudioPreviewPlaying(true);
    }
  };

  // --- Save / Share / Preview Triggers ---
  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const result = await onSave(formData);
      setSaveSuccessNotice('Your story was saved successfully! 💾');
      setTimeout(() => setSaveSuccessNotice(null), 3000);
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-romantic-pattern text-[#5a1f2d] flex flex-col select-none">
      {/* Top Bar Contract: Brand title, nav tabs, actions */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#c62845]/15 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c3a4f] hover:text-[#c62845] hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
            aria-label="Back to story"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-base sm:text-lg tracking-tight text-[#c62845] font-serif-romantic leading-tight">
              Create Your Love Story ❤️
            </h1>
            <p className="text-[11px] text-[#8c3a4f]">
              Personalize without writing a single line of code
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPreview(formData)}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#c62845] bg-rose-50 hover:bg-rose-100 rounded-full border border-[#c62845]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className="px-4 py-1.5 text-xs font-bold bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save & Share 🔗'}</span>
          </button>
        </div>
      </header>

      {/* Success Notification */}
      {saveSuccessNotice && (
        <div className="bg-emerald-50 text-emerald-800 border-b border-emerald-200 text-xs font-semibold py-2 px-4 text-center">
          {saveSuccessNotice}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="bg-white border-b border-[#c62845]/10 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('basics')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'basics' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          1. Names & Intro
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'photos' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          2. Polaroids ({formData.photos.length})
        </button>
        <button
          onClick={() => setActiveTab('reasons')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'reasons' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          3. Reasons ({formData.reasons.length})
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'timeline' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          4. Timeline ({formData.timeline.length})
        </button>
        <button
          onClick={() => setActiveTab('chapters')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'chapters' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          5. Custom Chapters ({formData.chapters.length})
        </button>
        <button
          onClick={() => setActiveTab('music')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'music' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          6. Song 🎵
        </button>
        <button
          onClick={() => setActiveTab('letters')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'letters' ? 'bg-[#c62845] text-white font-semibold' : 'text-[#8c3a4f] hover:bg-rose-50'
          }`}
        >
          7. Love Letters 💌
        </button>
      </div>

      {/* Main Tab Panels */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-6 pb-24">
        {/* TAB 1: BASICS & INTRO */}
        {activeTab === 'basics' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c62845]/15 space-y-6">
            <h2 className="text-xl font-bold text-[#c62845] font-serif-romantic border-b border-rose-100 pb-3">
              Couple Names & Opening
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.yourName}
                  onChange={(e) => handleFieldChange('yourName', e.target.value)}
                  placeholder="e.g. Maya"
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Partner's Name
                </label>
                <input
                  type="text"
                  value={formData.partnerName}
                  onChange={(e) => handleFieldChange('partnerName', e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                Envelope Inscription
              </label>
              <input
                type="text"
                value={formData.partnerRoleText}
                onChange={(e) => handleFieldChange('partnerRoleText', e.target.value)}
                placeholder="For the boy who stole my heart... 💗"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
              />
              <span className="text-[11px] text-[#8c3a4f] mt-1 block">
                Displayed proudly on the front of the envelope before they open it.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                Teddy Intro Surprise Text
              </label>
              <input
                type="text"
                value={formData.openingMessage}
                onChange={(e) => handleFieldChange('openingMessage', e.target.value)}
                placeholder="Someone has a little surprise for you... ❤️"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
              />
            </div>

            {/* Heart Rain Toggle */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-[#c62845]/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#c62845] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Heart className="w-5 h-5 fill-white animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#c62845] font-serif-romantic">
                      Heart Rain Effect 🌧️❤️
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        formData.enableHeartRain !== false
                          ? 'bg-[#c62845] text-white'
                          : 'bg-rose-200 text-[#8c3a4f]'
                      }`}
                    >
                      {formData.enableHeartRain !== false ? 'ON' : 'OFF'}
                    </span>
                  </div>
                  <p className="text-xs text-[#8c3a4f] mt-0.5">
                    Add a persistent falling hearts animation overlay throughout the storybook.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleFieldChange('enableHeartRain', formData.enableHeartRain === false ? true : false)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  formData.enableHeartRain !== false ? 'bg-[#c62845]' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={formData.enableHeartRain !== false}
                aria-label="Toggle Heart Rain animation overlay"
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    formData.enableHeartRain !== false ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Cute Couple Pose Picker */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c62845]/20 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-100/80 text-[#c62845] flex items-center justify-center text-xl shrink-0">
                    👫
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#c62845] font-serif-romantic flex items-center gap-1.5">
                      <span>Couple Illustration Pose</span>
                      <Sparkles className="w-3.5 h-3.5 fill-[#c62845]" />
                    </h3>
                    <p className="text-xs text-[#8c3a4f]">
                      Choose your favorite romantic hug, kiss, cuddle, or handhold pose
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-[#c62845] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 self-start sm:self-auto">
                  7 Poses Available
                </span>
              </div>

              {/* Categorized Pose Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
                {[
                  {
                    id: 'holding-hands',
                    name: 'Holding Hands',
                    category: 'Classic',
                    emoji: '👫',
                    tagline: 'Heart to heart'
                  },
                  {
                    id: 'hugging',
                    name: 'Warm Hug',
                    category: 'Hug',
                    emoji: '🤗',
                    tagline: 'Tight frontal hug'
                  },
                  {
                    id: 'hug-side',
                    name: 'Side Hug',
                    category: 'Hug',
                    emoji: '🫂',
                    tagline: 'Arm on shoulder'
                  },
                  {
                    id: 'kiss',
                    name: 'Sweet Kiss',
                    category: 'Kiss',
                    emoji: '💋',
                    tagline: 'Gentle lips kiss'
                  },
                  {
                    id: 'kiss-forehead',
                    name: 'Forehead Kiss',
                    category: 'Kiss',
                    emoji: '🌸',
                    tagline: 'Tender & pure'
                  },
                  {
                    id: 'cheek-to-cheek',
                    name: 'Cheek to Cheek',
                    category: 'Cuddle',
                    emoji: '🥰',
                    tagline: 'Squishy selfie'
                  },
                  {
                    id: 'bench',
                    name: 'Cozy Bench',
                    category: 'Romantic',
                    emoji: '🪑',
                    tagline: 'Side by side'
                  }
                ].map((item) => {
                  const isSelected = (formData.coupleStyle || 'holding-hands') === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleFieldChange('coupleStyle', item.id as CouplePoseType)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-rose-50/90 border-[#c62845] text-[#c62845] shadow-xs ring-2 ring-[#c62845]/40 scale-[1.02]'
                          : 'bg-white border-rose-100 text-[#5a1f2d] hover:border-rose-300 hover:bg-rose-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span className="text-2xl">{item.emoji}</span>
                        <span
                          className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-md ${
                            isSelected
                              ? 'bg-[#c62845] text-white'
                              : 'bg-rose-50 text-[#8c3a4f]'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-xs font-serif-romantic flex items-center gap-1">
                          <span>{item.name}</span>
                          {isSelected && <Heart className="w-3 h-3 fill-[#c62845] text-[#c62845]" />}
                        </div>
                        <div className="text-[10px] text-[#8c3a4f] mt-0.5 leading-tight">
                          {item.tagline}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Interactive Preview */}
              <div className="pt-3 flex flex-col items-center bg-rose-50/60 rounded-2xl p-4 border border-rose-100">
                <span className="text-[11px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c62845]" />
                  <span>Live Selected Pose Preview</span>
                </span>
                <CartoonCoupleSVG
                  personAName={formData.yourName || 'Me'}
                  personBName={formData.partnerName || 'You'}
                  pose={formData.coupleStyle || 'holding-hands'}
                  scale={0.92}
                  interactive={true}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-rose-100 space-y-4">
              <h3 className="text-sm font-bold text-[#c62845] uppercase tracking-wider">
                Chapter 1: The Beginning
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Chapter 1 Title
                </label>
                <input
                  type="text"
                  value={formData.chapter1Title}
                  onChange={(e) => handleFieldChange('chapter1Title', e.target.value)}
                  placeholder="The Beginning"
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Chapter 1 Story
                </label>
                <textarea
                  rows={4}
                  value={formData.chapter1Story}
                  onChange={(e) => handleFieldChange('chapter1Story', e.target.value)}
                  placeholder="Somewhere between ordinary days..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POLAROIDS & PHOTOS */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#c62845]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
                  Polaroid Memory Gallery
                </h2>
                <p className="text-xs text-[#8c3a4f] mt-1">
                  Upload photos from your computer or phone. They will automatically be styled into realistic tilted Polaroids!
                </p>
              </div>

              <input
                ref={photoInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                onClick={() => photoInputRef.current?.click()}
                className="px-5 py-2.5 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photos</span>
              </button>
            </div>

            {/* Photos List */}
            <div className="space-y-4">
              {formData.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-rose-50 shrink-0 border border-rose-200">
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2 w-full">
                    <div>
                      <label className="block text-[11px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Caption
                      </label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => handleUpdatePhotoCaption(photo.id, e.target.value)}
                        placeholder="Write a sweet memory caption..."
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845] text-[#5a1f2d]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Date / Tag (Optional)
                      </label>
                      <input
                        type="text"
                        value={photo.date || ''}
                        onChange={(e) => handleUpdatePhotoDate(photo.id, e.target.value)}
                        placeholder="e.g. Summer 2024"
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845] text-[#5a1f2d]"
                      />
                    </div>
                  </div>

                  {/* Move Up/Down & Delete */}
                  <div className="flex sm:flex-col items-center gap-1 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleMovePhoto(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 text-[#8c3a4f] hover:text-[#c62845] hover:bg-rose-50 rounded-lg disabled:opacity-30 cursor-pointer"
                      title="Move photo up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMovePhoto(index, 'down')}
                      disabled={index === formData.photos.length - 1}
                      className="p-1.5 text-[#8c3a4f] hover:text-[#c62845] hover:bg-rose-50 rounded-lg disabled:opacity-30 cursor-pointer"
                      title="Move photo down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-1.5 text-rose-400 hover:text-red-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REASONS I LOVE YOU */}
        {activeTab === 'reasons' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#c62845]/15 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
                  Little Things I Love
                </h2>
                <p className="text-xs text-[#8c3a4f] mt-1">
                  Add sweet little quirks, habits, and traits that make your partner unforgettable.
                </p>
              </div>

              <button
                onClick={handleAddReason}
                className="px-4 py-2 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Reason</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.reasons.map((reason) => (
                <div
                  key={reason.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 flex items-start gap-3"
                >
                  {/* Emoji selector */}
                  <div className="w-12 shrink-0">
                    <label className="block text-[10px] font-bold text-[#8c3a4f] mb-1">Emoji</label>
                    <input
                      type="text"
                      value={reason.emoji}
                      onChange={(e) => handleUpdateReason(reason.id, { emoji: e.target.value })}
                      className="w-full text-center py-1 rounded-lg border border-rose-200 text-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Reason Title
                      </label>
                      <input
                        type="text"
                        value={reason.title}
                        onChange={(e) => handleUpdateReason(reason.id, { title: e.target.value })}
                        placeholder="e.g. Your Smile"
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={reason.description}
                        onChange={(e) => handleUpdateReason(reason.id, { description: e.target.value })}
                        placeholder="Explain why this brings you happiness..."
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteReason(reason.id)}
                    className="p-2 text-rose-300 hover:text-red-600 rounded-lg transition-colors cursor-pointer mt-5"
                    title="Delete reason"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE & MEMORIES */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#c62845]/15 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
                  Our Story Timeline
                </h2>
                <p className="text-xs text-[#8c3a4f] mt-1">
                  Chronicle the key milestone dates from the day you met to the present.
                </p>
              </div>

              <button
                onClick={handleAddTimelineItem}
                className="px-4 py-2 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Memory</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.timeline.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => handleUpdateTimelineItem(item.id, { date: e.target.value })}
                        placeholder="e.g. 12 March 2024"
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteTimelineItem(item.id)}
                      className="p-1.5 text-rose-300 hover:text-red-600 rounded-lg transition-colors cursor-pointer mt-4"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                      Milestone Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateTimelineItem(item.id, { title: e.target.value })}
                      placeholder="e.g. The Day We Met ❤️"
                      className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                      Story & Reflection
                    </label>
                    <textarea
                      rows={2}
                      value={item.story}
                      onChange={(e) => handleUpdateTimelineItem(item.id, { story: e.target.value })}
                      placeholder="Write what happened..."
                      className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DYNAMIC CHAPTER BUILDER */}
        {activeTab === 'chapters' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#c62845]/15 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
                  Dynamic Chapter Builder
                </h2>
                <p className="text-xs text-[#8c3a4f] mt-1">
                  Add unlimited chapters! Reorder them with Move Up and Move Down buttons.
                </p>
              </div>

              <button
                onClick={handleAddChapter}
                className="px-4 py-2 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Chapter</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-rose-100 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
                      {chapter.number || `Chapter ${index + 1}`}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveChapter(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-[#8c3a4f] hover:text-[#c62845] disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveChapter(index, 'down')}
                        disabled={index === formData.chapters.length - 1}
                        className="p-1 text-[#8c3a4f] hover:text-[#c62845] disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(chapter.id)}
                        className="p-1 text-rose-300 hover:text-red-600 cursor-pointer"
                        title="Delete Chapter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Chapter Title
                      </label>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => handleUpdateChapter(chapter.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Optional Date / Memory Note
                      </label>
                      <input
                        type="text"
                        value={chapter.memoryDate || ''}
                        onChange={(e) => handleUpdateChapter(chapter.id, { memoryDate: e.target.value })}
                        placeholder="e.g. 14 February"
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                      Story Content
                    </label>
                    <textarea
                      rows={3}
                      value={chapter.story}
                      onChange={(e) => handleUpdateChapter(chapter.id, { story: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs focus:ring-1 focus:ring-[#c62845]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BACKGROUND MUSIC */}
        {activeTab === 'music' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c62845]/15 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
                Background Music 🎵
              </h2>
              <p className="text-xs text-[#8c3a4f] mt-1">
                Upload your couple’s favorite song (MP3, WAV, M4A) or use our soothing built-in romantic melody.
              </p>
            </div>

            <input
              ref={songInputRef}
              type="file"
              accept="audio/*"
              onChange={handleSongUpload}
              className="hidden"
            />

            {/* Current Song Display & Actions */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-[#c62845]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c62845] text-white flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#5a1f2d]">
                    {formData.musicTitle || 'Sweet Romantic Melody'}
                  </p>
                  <p className="text-[10px] text-[#8c3a4f]">
                    {formData.music.startsWith('data:') ? 'Custom Uploaded Song' : 'Built-in Romantic Synthesizer'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={toggleAudioPreview}
                  className="px-3.5 py-1.5 bg-white hover:bg-rose-100 text-[#c62845] border border-[#c62845]/30 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {audioPreviewPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{audioPreviewPlaying ? 'Stop' : 'Test Sound'}</span>
                </button>

                <button
                  onClick={() => songInputRef.current?.click()}
                  className="px-4 py-1.5 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Your Song 🎵</span>
                </button>
              </div>
            </div>

            {/* Reset to preset button if uploaded */}
            {formData.music.startsWith('data:') && (
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    music: 'preset:romantic-piano',
                    musicTitle: 'Sweet Romantic Lullaby 🎵'
                  }));
                }}
                className="text-xs text-[#c62845] hover:underline font-medium cursor-pointer block"
              >
                ← Switch back to built-in romantic melody
              </button>
            )}
          </div>
        )}

        {/* TAB 7: SECRET SURPRISE & FINAL LETTERS */}
        {activeTab === 'letters' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c62845]/15 space-y-6">
              <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic border-b border-rose-100 pb-3">
                Secret Surprise (Chapter 5)
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Secret Gift Message
                </label>
                <textarea
                  rows={3}
                  value={formData.secretMessage}
                  onChange={(e) => handleFieldChange('secretMessage', e.target.value)}
                  placeholder="Revealed when they tap 'Click Here 🎁'..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c62845]/15 space-y-6">
              <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic border-b border-rose-100 pb-3">
                Final Chapter: Love Letter
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Greeting Line
                </label>
                <input
                  type="text"
                  value={formData.finalLetterGreeting}
                  onChange={(e) => handleFieldChange('finalLetterGreeting', e.target.value)}
                  placeholder="Happy Boyfriend Day, my love."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Main Letter Body
                </label>
                <textarea
                  rows={5}
                  value={formData.finalLetterBody}
                  onChange={(e) => handleFieldChange('finalLetterBody', e.target.value)}
                  placeholder="Write your heartfelt final love letter..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Signoff Signature
                </label>
                <input
                  type="text"
                  value={formData.finalLetterSignoff}
                  onChange={(e) => handleFieldChange('finalLetterSignoff', e.target.value)}
                  placeholder="Forever & Always Yours, Maya"
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c62845]/15 space-y-6">
              <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic border-b border-rose-100 pb-3">
                Final Secret Button (Typewriter Finale)
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                  Typewriter Secret Message
                </label>
                <textarea
                  rows={3}
                  value={formData.finalSecretMessage}
                  onChange={(e) => handleFieldChange('finalSecretMessage', e.target.value)}
                  placeholder="The deepest, sweetest whisper shown letter by letter at the very end..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:ring-2 focus:ring-[#c62845] text-sm text-[#5a1f2d]"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Sticky Bar for Mobile/Desktop Quick Action */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-[#c62845]/15 p-3 flex items-center justify-center gap-3">
        <button
          onClick={() => onPreview(formData)}
          className="px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-[#c62845] border border-[#c62845]/30 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview ❤️</span>
        </button>

        <button
          onClick={handleSaveClick}
          disabled={isSaving}
          className="px-8 py-2.5 bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#c62845]/25 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <Share2 className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save & Share My Story 🔗'}</span>
        </button>
      </div>
    </div>
  );
};
