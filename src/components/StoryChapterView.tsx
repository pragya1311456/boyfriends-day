import React, { useState, useEffect } from 'react';
import { StoryData, PhotoItem } from '../types/story';
import { CartoonCoupleSVG, CouplePoseType } from './CartoonCouple';
import { ImageWithFallback } from './ImageWithFallback';
import { romanticConfetti } from '../utils/confetti';
import {
  Heart,
  ChevronRight,
  ChevronLeft,
  Gift,
  Sparkles,
  Calendar,
  X,
  RotateCcw,
  Edit3
} from 'lucide-react';

interface StoryChapterViewProps {
  story: StoryData;
  onOpenCustomizer: () => void;
  onRestartStory: () => void;
  onToggleHeartRain?: () => void;
  onBackToWebsite?: () => void;
}

export const StoryChapterView: React.FC<StoryChapterViewProps> = ({
  story,
  onOpenCustomizer,
  onRestartStory,
  onToggleHeartRain,
  onBackToWebsite
}) => {
  // Current active chapter index: 0 = Chap 1, 1 = Chap 2 (Memories), 2 = Chap 3 (Reasons), 3 = Chap 4 (Timeline), dynamic chapters, then Surprise, then Final Letter
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Polaroid lightbox modal state
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Secret surprise gift opened state
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  // Final secret modal & typewriter state
  const [showFinalSecret, setShowFinalSecret] = useState(false);
  const [typedSecretText, setTypedSecretText] = useState('');

  // Active couple pose for interactive playback
  const [activePose, setActivePose] = useState<CouplePoseType>(story.coupleStyle || 'holding-hands');

  useEffect(() => {
    if (story.coupleStyle) {
      setActivePose(story.coupleStyle);
    }
  }, [story.coupleStyle]);

  // Assemble all story chapters
  // Standard chapters + any custom chapters added by user
  const chapterList = [
    {
      id: 'chap-1',
      number: 'CHAPTER ONE',
      title: story.chapter1Title || 'The Beginning',
      type: 'beginning' as const
    },
    {
      id: 'chap-2',
      number: 'CHAPTER TWO',
      title: 'Our Memories',
      type: 'memories' as const
    },
    {
      id: 'chap-3',
      number: 'CHAPTER THREE',
      title: 'The Little Things I Love',
      type: 'reasons' as const
    },
    {
      id: 'chap-4',
      number: 'CHAPTER FOUR',
      title: 'Our Story',
      type: 'timeline' as const
    },
    // Dynamic user chapters
    ...story.chapters.map((ch, idx) => ({
      id: ch.id || `custom-${idx}`,
      number: ch.number || `CHAPTER ${5 + idx}`,
      title: ch.title,
      type: 'custom' as const,
      data: ch
    })),
    {
      id: 'chap-surprise',
      number: `CHAPTER ${5 + story.chapters.length}`,
      title: 'One Last Surprise',
      type: 'surprise' as const
    },
    {
      id: 'chap-final',
      number: 'FINAL CHAPTER',
      title: 'My Message To You',
      type: 'final' as const
    }
  ];

  const currentChapter = chapterList[activeChapterIndex] || chapterList[0];
  const isFirstChapter = activeChapterIndex === 0;
  const isLastChapter = activeChapterIndex === chapterList.length - 1;

  // Typewriter effect when final secret is triggered
  useEffect(() => {
    if (!showFinalSecret) {
      setTypedSecretText('');
      return;
    }

    const fullText = story.finalSecretMessage || 'I love you to the moon and back, forever and always. ❤️';
    let currentIdx = 0;
    setTypedSecretText('');

    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setTypedSecretText(fullText.substring(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [showFinalSecret, story.finalSecretMessage]);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    romanticConfetti.burstAt(window.innerWidth / 2, window.innerHeight * 0.5, 45);
  };

  const handleTriggerFinalSecret = () => {
    setShowFinalSecret(true);
    romanticConfetti.burstAt(window.innerWidth / 2, window.innerHeight * 0.4, 50);
  };

  const goToNextChapter = () => {
    if (activeChapterIndex < chapterList.length - 1) {
      setActiveChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-romantic-pattern text-[#5a1f2d] flex flex-col pb-28 pt-4">
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#c62845]/15 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBackToWebsite && (
            <button
              onClick={onBackToWebsite}
              className="px-2.5 py-1 text-xs font-semibold text-[#8c3a4f] hover:text-[#c62845] bg-rose-50 hover:bg-rose-100 rounded-full transition-colors flex items-center gap-1 cursor-pointer mr-0.5 border border-rose-200"
              title="Return to website home"
            >
              <span>←</span>
              <span className="hidden xs:inline">Website</span>
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-[#c62845] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            ❤️
          </div>
          <div className="leading-tight">
            <span className="font-bold text-sm tracking-tight text-[#c62845] font-serif-romantic block">
              {story.partnerName} & {story.yourName}
            </span>
            <span className="text-[11px] text-[#8c3a4f] block font-medium">
              Love Story
            </span>
          </div>
        </div>

        {/* Chapter Progress Indicators */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-1">
          {chapterList.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => {
                setActiveChapterIndex(idx);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-2.5 py-1 text-xs rounded-full transition-all cursor-pointer ${
                activeChapterIndex === idx
                  ? 'bg-[#c62845] text-white font-semibold shadow-sm'
                  : 'text-[#8c3a4f] hover:bg-rose-50'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onToggleHeartRain && (
            <button
              onClick={onToggleHeartRain}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                story.enableHeartRain !== false
                  ? 'text-[#c62845] bg-rose-100 hover:bg-rose-200 shadow-xs'
                  : 'text-[#8c3a4f]/50 hover:text-[#c62845] hover:bg-rose-50'
              }`}
              title={story.enableHeartRain !== false ? 'Heart Rain: ON (tap to turn off)' : 'Heart Rain: OFF (tap to turn on)'}
              aria-label="Toggle Heart Rain"
            >
              <Heart className={`w-4 h-4 ${story.enableHeartRain !== false ? 'fill-[#c62845] animate-pulse' : ''}`} />
            </button>
          )}
          <button
            onClick={onRestartStory}
            className="p-2 text-[#8c3a4f] hover:text-[#c62845] hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
            title="Replay intro animation"
            aria-label="Replay intro animation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenCustomizer}
            className="px-3.5 py-1.5 text-xs font-semibold bg-[#c62845] hover:bg-[#a11c34] text-white rounded-full shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Customize Story</span>
          </button>
        </div>
      </header>

      {/* Main Chapter Content Viewport */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        {/* Chapter Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-[#8c3a4f] uppercase block mb-1">
            {currentChapter.number}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#c62845] font-serif-romantic tracking-tight drop-shadow-sm">
            {currentChapter.title}
          </h1>
          <div className="w-16 h-1 bg-[#c62845] rounded-full mx-auto mt-3 opacity-60" />
        </div>

        {/* CHAPTER 1: THE BEGINNING */}
        {currentChapter.type === 'beginning' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Cute Cartoon Illustration & Interactive Pose Switcher */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-[#c62845]/15 flex flex-col items-center">
              <CartoonCoupleSVG
                personAName={story.yourName}
                personBName={story.partnerName}
                pose={activePose}
                interactive={true}
              />

              {/* Quick Pose Switcher Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-rose-50/80 rounded-full border border-rose-100 max-w-full">
                <button
                  type="button"
                  onClick={() => setActivePose('holding-hands')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activePose === 'holding-hands'
                      ? 'bg-[#c62845] text-white shadow-xs'
                      : 'text-[#8c3a4f] hover:text-[#c62845] hover:bg-white'
                  }`}
                >
                  👫 Holding Hands
                </button>
                <button
                  type="button"
                  onClick={() => setActivePose('hugging')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activePose === 'hugging'
                      ? 'bg-[#c62845] text-white shadow-xs'
                      : 'text-[#8c3a4f] hover:text-[#c62845] hover:bg-white'
                  }`}
                >
                  🤗 Warm Hug
                </button>
                <button
                  type="button"
                  onClick={() => setActivePose('kiss')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activePose === 'kiss'
                      ? 'bg-[#c62845] text-white shadow-xs'
                      : 'text-[#8c3a4f] hover:text-[#c62845] hover:bg-white'
                  }`}
                >
                  💋 Sweet Kiss
                </button>
                <button
                  type="button"
                  onClick={() => setActivePose('bench')}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    activePose === 'bench'
                      ? 'bg-[#c62845] text-white shadow-xs'
                      : 'text-[#8c3a4f] hover:text-[#c62845] hover:bg-white'
                  }`}
                >
                  🪑 Cozy Bench
                </button>
              </div>

              <p className="text-xs font-medium text-[#8c3a4f] italic mt-3">
                "Where our journey quietly began..."
              </p>
            </div>

            {/* Storytelling Text */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-[#c62845]/15 relative">
              <span className="text-5xl text-[#ff758f] font-serif absolute top-4 left-6 select-none opacity-40">
                “
              </span>
              <p className="text-base sm:text-lg text-[#5a1f2d] leading-relaxed whitespace-pre-line font-serif-romantic pt-4">
                {story.chapter1Story}
              </p>
              <div className="mt-6 flex justify-end">
                <span className="font-handwriting text-2xl text-[#c62845]">
                  — With all my love, {story.yourName}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 2: OUR MEMORIES (POLAROID GALLERY) */}
        {currentChapter.type === 'memories' && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-center text-sm text-[#8c3a4f] max-w-md mx-auto mb-4">
              Tap any Polaroid to see the moment up close and relive the memory ❤️
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4">
              {story.photos && story.photos.length > 0 ? (
                story.photos.map((photo, index) => {
                  const rot = photo.rotation !== undefined ? photo.rotation : (index % 2 === 0 ? -2.5 : 2.5);
                  return (
                    <div
                      key={photo.id || index}
                      onClick={() => setSelectedPhoto(photo)}
                      style={{ transform: `rotate(${rot}deg)` }}
                      className="polaroid-card p-4 pb-6 rounded-sm cursor-pointer select-none border border-rose-100 flex flex-col"
                    >
                      {/* Photo Container with Polaroid Aspect Ratio */}
                      <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-rose-50 shadow-inner">
                        <ImageWithFallback
                          src={photo.url}
                          alt={photo.caption || 'Cherished memory'}
                          fallbackCaption={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Polaroid Handwritten Caption */}
                      <div className="mt-4 px-2 text-center min-h-[44px] flex flex-col justify-center">
                        <p className="font-handwriting text-2xl sm:text-3xl text-[#5a1f2d] leading-tight line-clamp-2">
                          {photo.caption || 'A beautiful day with you ❤️'}
                        </p>
                        {photo.date && (
                          <span className="text-[11px] font-semibold text-[#8c3a4f] mt-1 uppercase tracking-wider block">
                            {photo.date}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-rose-200 p-8">
                  <Heart className="w-12 h-12 text-[#ff4d6d] mx-auto mb-3" />
                  <p className="text-sm font-semibold text-[#8c3a4f]">No photos added yet.</p>
                  <p className="text-xs text-[#8c3a4f] mt-1">Tap "Customize Story" to upload your favorite pictures!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 3: LITTLE THINGS I LOVE */}
        {currentChapter.type === 'reasons' && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-center text-sm text-[#8c3a4f] max-w-md mx-auto mb-4">
              Here are just a few of the million little reasons why I fall for you every single day:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story.reasons && story.reasons.length > 0 ? (
                story.reasons.map((reason, idx) => (
                  <div
                    key={reason.id || idx}
                    className="group bg-white rounded-2xl p-5 border border-[#c62845]/15 shadow-sm hover:shadow-md hover:border-[#c62845]/40 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {reason.emoji || '❤️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-bold text-[#c62845] font-serif-romantic tracking-tight">
                        {reason.title}
                      </h2>
                      <p className="text-sm text-[#5a1f2d] mt-1 leading-snug">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        )}

        {/* CHAPTER 4: OUR STORY / TIMELINE */}
        {currentChapter.type === 'timeline' && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-center text-sm text-[#8c3a4f] max-w-md mx-auto mb-6">
              Our milestones and golden moments through time ⏳
            </p>

            <div className="relative border-l-2 border-[#c62845]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {story.timeline && story.timeline.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  {/* Timeline Heart Dot */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#c62845] border-4 border-white shadow-sm flex items-center justify-center text-white">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c62845]/15 hover:shadow-md transition-all">
                    {/* Date Badge */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c62845]" />
                      <span>{item.date}</span>
                    </div>

                    <h2 className="text-lg font-bold text-[#c62845] font-serif-romantic">
                      {item.title}
                    </h2>

                    <p className="text-sm text-[#5a1f2d] mt-2 leading-relaxed">
                      {item.story}
                    </p>

                    {item.photo && (
                      <div className="mt-4 rounded-xl overflow-hidden max-h-56 shadow-sm border border-rose-100">
                        <ImageWithFallback
                          src={item.photo}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Cute Finale Card for Timeline with Cozy Bench Couple */}
              <div className="relative group pt-2">
                <div className="absolute -left-[33px] sm:-left-[41px] top-4 w-6 h-6 rounded-full bg-[#c62845] border-4 border-white shadow-sm flex items-center justify-center text-white">
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c62845]/20 flex flex-col items-center text-center">
                  <CartoonCoupleSVG
                    personAName={story.yourName}
                    personBName={story.partnerName}
                    pose="bench"
                    scale={0.88}
                    interactive={true}
                  />
                  <p className="text-sm font-bold text-[#c62845] font-serif-romantic mt-2">
                    And our story is only getting sweeter... 📖✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM USER CHAPTERS */}
        {currentChapter.type === 'custom' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-[#c62845]/15 space-y-6">
              {currentChapter.data?.memoryDate && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-bold text-[#8c3a4f]">
                  <Calendar className="w-3.5 h-3.5 text-[#c62845]" />
                  <span>{currentChapter.data.memoryDate}</span>
                </div>
              )}

              <p className="text-base sm:text-lg text-[#5a1f2d] leading-relaxed whitespace-pre-line font-serif-romantic">
                {currentChapter.data?.story}
              </p>

              {currentChapter.data?.photo && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-rose-100 max-h-80">
                  <ImageWithFallback
                    src={currentChapter.data.photo}
                    alt={currentChapter.data.title}
                    className="w-full h-full object-cover"
                  />
                  {currentChapter.data.photoCaption && (
                    <p className="p-3 text-center text-xs text-[#8c3a4f] italic bg-rose-50/50">
                      {currentChapter.data.photoCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 5: ONE LAST SURPRISE */}
        {currentChapter.type === 'surprise' && (
          <div className="flex flex-col items-center justify-center py-6 animate-fadeIn text-center">
            <p className="text-xl sm:text-2xl font-bold text-[#5a1f2d] font-serif-romantic mb-6">
              I have one last surprise for you... 🤫
            </p>

            {!isGiftOpened ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleOpenGift}
                  className="group relative cursor-pointer active:scale-95 transition-all"
                  aria-label="Open secret gift"
                >
                  {/* Glowing halo */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 to-[#c62845] rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />

                  {/* 3D Gift Icon Box */}
                  <div className="relative w-36 h-36 bg-gradient-to-tr from-[#a11c34] to-[#c62845] rounded-3xl shadow-2xl border-2 border-white flex flex-col items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-300">
                    <Gift className="w-16 h-16 text-white animate-bounce" />
                    {/* Ribbon */}
                    <div className="absolute inset-x-0 h-4 bg-white/30 top-1/2 -translate-y-1/2" />
                    <div className="absolute inset-y-0 w-4 bg-white/30 left-1/2 -translate-x-1/2" />
                  </div>
                </button>

                <button
                  onClick={handleOpenGift}
                  className="mt-8 px-8 py-3.5 bg-[#c62845] hover:bg-[#a11c34] text-white font-bold text-sm rounded-full shadow-lg shadow-[#c62845]/30 cursor-pointer flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Click Here 🎁</span>
                </button>
              </div>
            ) : (
              <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#c62845]/20 animate-scaleUp text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-[#c62845] flex items-center justify-center mx-auto mb-4 border border-rose-200">
                  <Sparkles className="w-6 h-6 fill-current" />
                </div>
                <h2 className="text-xl font-bold text-[#c62845] font-serif-romantic mb-3">
                  Surprise, My Love! ✨
                </h2>
                <p className="text-base text-[#5a1f2d] leading-relaxed whitespace-pre-line font-serif-romantic">
                  {story.secretMessage}
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="font-handwriting text-2xl text-[#c62845]">
                    With all my heart ❤️
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FINAL CHAPTER: MY MESSAGE TO YOU */}
        {currentChapter.type === 'final' && (
          <div className="space-y-8 animate-fadeIn text-center">
            {/* Romantic Heading */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#c62845]/20 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#c62845] font-serif-romantic">
                You are my favourite story. ❤️
              </h2>
              <p className="text-base sm:text-lg text-[#8c3a4f] italic font-serif-romantic">
                "And if I could choose again... I'd still choose you."
              </p>

              <div className="w-20 h-0.5 bg-rose-200 mx-auto my-6" />

              {/* Personalized Final Letter */}
              <div className="text-left space-y-4 text-base text-[#5a1f2d] leading-relaxed font-serif-romantic whitespace-pre-line max-w-xl mx-auto">
                <p className="font-bold text-[#c62845] text-lg">
                  {story.finalLetterGreeting}
                </p>
                <p>{story.finalLetterBody}</p>

                {/* Cute Couple Warm Hug Artwork */}
                <div className="py-2 flex justify-center">
                  <CartoonCoupleSVG
                    personAName={story.yourName}
                    personBName={story.partnerName}
                    pose="hugging"
                    scale={0.92}
                    interactive={true}
                  />
                </div>

                <p className="font-handwriting text-2xl text-[#c62845] pt-2 text-right">
                  {story.finalLetterSignoff}
                </p>
              </div>
            </div>

            {/* FINAL SECRET BUTTON */}
            <div className="pt-6 flex flex-col items-center">
              <button
                onClick={handleTriggerFinalSecret}
                className="group px-8 py-4 bg-gradient-to-r from-[#c62845] to-[#a11c34] hover:from-[#a11c34] hover:to-[#8c182c] text-white font-bold text-base rounded-full shadow-xl shadow-[#c62845]/30 cursor-pointer flex items-center gap-2.5 active:scale-95 transition-all transform hover:scale-105"
              >
                <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                <span>Click Here One Last Time ❤️</span>
              </button>
              <p className="text-xs text-[#8c3a4f] mt-2 italic">
                A secret thought kept just for you...
              </p>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#c62845]/15">
          <button
            onClick={goToPrevChapter}
            disabled={isFirstChapter}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isFirstChapter
                ? 'opacity-0 pointer-events-none'
                : 'bg-white hover:bg-rose-50 text-[#8c3a4f] border border-rose-200 shadow-sm active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-semibold text-[#8c3a4f]">
            {activeChapterIndex + 1} of {chapterList.length}
          </span>

          {!isLastChapter ? (
            <button
              onClick={goToNextChapter}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#c62845] hover:bg-[#a11c34] text-white shadow-md shadow-[#c62845]/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenCustomizer}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#c62845] hover:bg-[#a11c34] text-white shadow-md shadow-[#c62845]/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Create Your Own</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </main>

      {/* --- POLAROID LIGHTBOX MODAL --- */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl p-4 sm:p-6 shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-[#5a1f2d] shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors z-10 cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Expanded Photo */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-rose-50 mb-4 shadow-inner">
              <ImageWithFallback
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain bg-black/5"
              />
            </div>

            {/* Caption & Date */}
            <div className="text-center px-2">
              <p className="font-handwriting text-3xl text-[#5a1f2d] leading-snug">
                {selectedPhoto.caption}
              </p>
              {selectedPhoto.date && (
                <p className="text-xs font-bold text-[#8c3a4f] uppercase tracking-wider mt-2">
                  {selectedPhoto.date}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FINAL SECRET OVERLAY & TYPEWRITER MODAL --- */}
      {showFinalSecret && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          {/* Floating hearts inside modal */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Heart className="absolute bottom-10 left-[15%] w-8 h-8 text-[#ff4d6d] fill-[#ff4d6d]/40 animate-float-heart" />
            <Heart className="absolute bottom-20 right-[15%] w-10 h-10 text-[#c62845] fill-[#c62845]/50 animate-float-heart" style={{ animationDelay: '1s' }} />
            <Heart className="absolute bottom-10 left-[45%] w-6 h-6 text-rose-300 fill-rose-300 animate-float-heart" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative max-w-lg w-full bg-[#fff5f7] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#c62845] text-center select-none">
            {/* Close button */}
            <button
              onClick={() => setShowFinalSecret(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#5a1f2d] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close secret"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-[#c62845] text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Heart className="w-8 h-8 fill-current animate-pulse" />
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#c62845] font-serif-romantic mb-4">
              My One Last Secret... ❤️
            </h2>

            {/* Typewriter text container */}
            <div className="min-h-[120px] flex items-center justify-center px-2">
              <p className="text-lg sm:text-xl font-handwriting text-[#5a1f2d] leading-relaxed">
                "{typedSecretText}
                <span className="inline-block w-1.5 h-5 bg-[#c62845] ml-1 animate-pulse" />"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#c62845]/20 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setShowFinalSecret(false);
                  onOpenCustomizer();
                }}
                className="px-6 py-2.5 bg-[#c62845] hover:bg-[#a11c34] text-white font-bold text-xs rounded-full shadow-md cursor-pointer transition-all active:scale-95"
              >
                Create Your Own Story 💌
              </button>
              <button
                onClick={() => setShowFinalSecret(false)}
                className="px-6 py-2.5 bg-white hover:bg-rose-50 text-[#8c3a4f] border border-rose-200 font-bold text-xs rounded-full cursor-pointer transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
