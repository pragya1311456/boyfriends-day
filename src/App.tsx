import React, { useState, useEffect } from 'react';
import { StoryData } from './types/story';
import { DEFAULT_STORY } from './data/defaultStory';
import {
  saveStoryToServer,
  fetchStoryFromServer,
  saveStoryLocally,
  loadStoryLocally,
  getLocalStoriesList,
  decodeStoryFromUrl,
  SavedStoryMeta,
  generateStoryId
} from './utils/storage';
import { OpeningAnimation } from './components/OpeningAnimation';
import { EnvelopeScene } from './components/EnvelopeScene';
import { StoryChapterView } from './components/StoryChapterView';
import { CustomizePage } from './components/CustomizePage';
import { MusicPlayerWidget } from './components/MusicPlayerWidget';
import { ShareModal } from './components/ShareModal';
import { SavedStoriesDrawer } from './components/SavedStoriesDrawer';
import { HeartRainOverlay } from './components/HeartRainOverlay';
import { romanticAudio } from './utils/audioPlayer';
import { WebsiteHome } from './components/WebsiteHome';
import { CouplePoseType } from './components/CartoonCouple';
import { Heart, FolderHeart } from 'lucide-react';

type AppViewMode = 'website' | 'intro' | 'envelope' | 'story' | 'customize';

export default function App() {
  const [currentStory, setCurrentStory] = useState<StoryData>(DEFAULT_STORY);
  const [viewMode, setViewMode] = useState<AppViewMode>('website');
  const [returnToModeAfterCustomize, setReturnToModeAfterCustomize] = useState<'website' | 'story'>('website');
  const [hasWatchedIntro, setHasWatchedIntro] = useState(false);
  const [savedStoriesList, setSavedStoriesList] = useState<SavedStoryMeta[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Share Modal State
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    shareUrl: string;
  }>({
    isOpen: false,
    shareUrl: ''
  });

  // Initial Load: check URL query params for ?story=ID or ?data=BASE64 or ?customize=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storyIdParam = params.get('story');
    const dataParam = params.get('data');
    const customizeParam = params.get('customize');
    const readParam = params.get('read');

    setSavedStoriesList(getLocalStoriesList());

    if (customizeParam === 'true') {
      setViewMode('customize');
      setReturnToModeAfterCustomize('website');
    } else if (storyIdParam || dataParam || readParam === 'true') {
      setViewMode('intro');
    } else {
      setViewMode('website');
    }

    if (storyIdParam) {
      // First try local storage
      const local = loadStoryLocally(storyIdParam);
      if (local) {
        setCurrentStory(local);
        romanticAudio.setTrack(local.music || 'preset:romantic-piano');
      }

      // Also fetch from server to get freshest version
      fetchStoryFromServer(storyIdParam).then(remote => {
        if (remote) {
          setCurrentStory(remote);
          romanticAudio.setTrack(remote.music || 'preset:romantic-piano');
          saveStoryLocally(remote);
          setSavedStoriesList(getLocalStoriesList());
        }
      });
    } else if (dataParam) {
      const decoded = decodeStoryFromUrl(dataParam);
      if (decoded) {
        setCurrentStory(decoded);
        romanticAudio.setTrack(decoded.music || 'preset:romantic-piano');
      }
    } else {
      // Load last working story if available, or default
      const saved = getLocalStoriesList();
      if (saved.length > 0) {
        const lastSaved = loadStoryLocally(saved[0].id);
        if (lastSaved) {
          setCurrentStory(lastSaved);
          romanticAudio.setTrack(lastSaved.music || 'preset:romantic-piano');
        }
      }
    }
  }, []);

  // Update document title dynamically based on view mode and couple names
  useEffect(() => {
    if (viewMode === 'website') {
      document.title = 'LoveStory Studio — Create Your Romantic Storybook Website ❤️';
    } else if (currentStory.partnerName) {
      document.title = `${currentStory.partnerName} & ${currentStory.yourName} ❤️ Love Story`;
    }
  }, [viewMode, currentStory]);

  // Handle Intro Finished -> Proceed to Envelope
  const handleIntroFinish = () => {
    setHasWatchedIntro(true);
    setViewMode('envelope');
  };

  // Handle Envelope Opened -> Proceed to Chapter 1
  const handleEnvelopeComplete = () => {
    setViewMode('story');
  };

  // Handle Save from Customizer
  const handleSaveStory = async (updatedStory: StoryData) => {
    // Save locally first
    saveStoryLocally(updatedStory);
    setCurrentStory(updatedStory);
    setSavedStoriesList(getLocalStoriesList());

    // Save to server to get permanent link
    const res = await saveStoryToServer(updatedStory);
    setShareModalData({
      isOpen: true,
      shareUrl: res.shareUrl
    });

    return res;
  };

  // Handle Preview from Customizer
  const handlePreviewStory = (previewStory: StoryData) => {
    setCurrentStory(previewStory);
    setViewMode('story');
  };

  // Switch stories from drawer
  const handleSelectStory = (id: string) => {
    if (id === 'template-default') {
      setCurrentStory(DEFAULT_STORY);
      romanticAudio.setTrack('preset:romantic-piano');
    } else {
      const found = loadStoryLocally(id);
      if (found) {
        setCurrentStory(found);
        romanticAudio.setTrack(found.music || 'preset:romantic-piano');
      }
    }
    setViewMode('envelope');
  };

  // Create brand new story from scratch
  const handleCreateNewStory = () => {
    const newStory: StoryData = {
      ...DEFAULT_STORY,
      id: generateStoryId(),
      yourName: '',
      partnerName: '',
      photos: []
    };
    setCurrentStory(newStory);
    setViewMode('customize');
  };

  // Replay intro
  const handleReplayIntro = () => {
    setViewMode('intro');
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] text-[#5a1f2d] font-sans antialiased selection:bg-[#c62845] selection:text-white">
      {/* Floating Story Collection Switcher Button (only during story or envelope views) */}
      {(viewMode === 'envelope' || viewMode === 'story') && (
        <button
          onClick={() => setIsSavedDrawerOpen(true)}
          className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#c62845]/20 shadow-md text-xs font-semibold text-[#8c3a4f] hover:text-[#c62845] hover:bg-rose-50 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          title="Saved stories list"
        >
          <FolderHeart className="w-3.5 h-3.5 text-[#c62845]" />
          <span className="hidden sm:inline">Stories</span>
          {savedStoriesList.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#c62845] text-white text-[10px] flex items-center justify-center font-bold">
              {savedStoriesList.length}
            </span>
          )}
        </button>
      )}

      {/* Persistent Falling Heart Rain Overlay during Story Reader */}
      {currentStory.enableHeartRain !== false && (viewMode === 'envelope' || viewMode === 'story') && (
        <HeartRainOverlay />
      )}

      {/* VIEW MODE 0: FULL MODERN WEBSITE LANDING PAGE */}
      {viewMode === 'website' && (
        <WebsiteHome
          currentStory={currentStory}
          onStartStory={() => setViewMode('intro')}
          onStartCustomize={() => {
            setReturnToModeAfterCustomize('website');
            setViewMode('customize');
          }}
          onOpenSavedStories={() => setIsSavedDrawerOpen(true)}
          savedStoriesCount={savedStoriesList.length}
          onUpdateStoryNames={(yourName, partnerName, pose) => {
            setCurrentStory(prev => ({
              ...prev,
              yourName,
              partnerName,
              coupleStyle: pose
            }));
          }}
        />
      )}

      {/* VIEW MODE 1: TEDDY + CAKE + CANDLE OPENING ANIMATION */}
      {viewMode === 'intro' && (
        <OpeningAnimation
          openingMessage={currentStory.openingMessage}
          yourName={currentStory.yourName || 'Maya'}
          partnerName={currentStory.partnerName || 'Alex'}
          onFinish={handleIntroFinish}
          onBackToWebsite={() => setViewMode('website')}
        />
      )}

      {/* VIEW MODE 2: ROMANTIC ENVELOPE */}
      {viewMode === 'envelope' && (
        <EnvelopeScene
          partnerRoleText={currentStory.partnerRoleText || 'For the boy who stole my heart... 💗'}
          partnerName={currentStory.partnerName || 'My Love'}
          yourName={currentStory.yourName || 'Maya'}
          onOpenComplete={handleEnvelopeComplete}
          onBackToWebsite={() => setViewMode('website')}
        />
      )}

      {/* VIEW MODE 3: INTERACTIVE STORYBOOK CHAPTERS */}
      {viewMode === 'story' && (
        <StoryChapterView
          story={currentStory}
          onOpenCustomizer={() => {
            setReturnToModeAfterCustomize('story');
            setViewMode('customize');
          }}
          onRestartStory={handleReplayIntro}
          onBackToWebsite={() => setViewMode('website')}
          onToggleHeartRain={() => {
            setCurrentStory(prev => {
              const updated = {
                ...prev,
                enableHeartRain: prev.enableHeartRain === false ? true : false
              };
              saveStoryLocally(updated);
              return updated;
            });
          }}
        />
      )}

      {/* VIEW MODE 4: NO-CODE CUSTOMIZATION PAGE */}
      {viewMode === 'customize' && (
        <CustomizePage
          currentStory={currentStory}
          onSave={handleSaveStory}
          onPreview={handlePreviewStory}
          onClose={() => setViewMode(returnToModeAfterCustomize)}
        />
      )}

      {/* Persistent Background Music Widget (during Envelope or Story views) */}
      {(viewMode === 'envelope' || viewMode === 'story') && (
        <MusicPlayerWidget
          currentTrackTitle={currentStory.musicTitle || 'Romantic Melody 🎵'}
          onSongChange={(newTrackUrl, title) => {
            setCurrentStory(prev => ({
              ...prev,
              music: newTrackUrl,
              musicTitle: `${title} 🎵`
            }));
          }}
        />
      )}

      {/* Saved Stories Drawer */}
      <SavedStoriesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedStories={savedStoriesList}
        currentStoryId={currentStory.id}
        onSelectStory={handleSelectStory}
        onCreateNew={handleCreateNewStory}
      />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData({ isOpen: false, shareUrl: '' })}
        shareUrl={shareModalData.shareUrl}
        partnerName={currentStory.partnerName || 'My Love'}
        yourName={currentStory.yourName || 'Me'}
      />
    </div>
  );
}
