import React, { useState } from 'react';
import { StoryData } from '../types/story';
import { CartoonCoupleSVG, CouplePoseType } from './CartoonCouple';
import { romanticAudio, MUSIC_PRESETS } from '../utils/audioPlayer';
import {
  Heart,
  Sparkles,
  BookOpen,
  Edit3,
  Music,
  Camera,
  Mail,
  Calendar,
  ShieldCheck,
  Smartphone,
  Gift,
  Play,
  Pause,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  FolderHeart,
  Share2
} from 'lucide-react';

interface WebsiteHomeProps {
  currentStory: StoryData;
  onStartStory: () => void;
  onStartCustomize: () => void;
  onOpenSavedStories: () => void;
  savedStoriesCount: number;
  onUpdateStoryNames: (yourName: string, partnerName: string, pose: CouplePoseType) => void;
}

export const WebsiteHome: React.FC<WebsiteHomeProps> = ({
  currentStory,
  onStartStory,
  onStartCustomize,
  onOpenSavedStories,
  savedStoriesCount,
  onUpdateStoryNames
}) => {
  // Live preview sandbox in hero
  const [heroYourName, setHeroYourName] = useState(currentStory.yourName || 'Maya');
  const [heroPartnerName, setHeroPartnerName] = useState(currentStory.partnerName || 'Alex');
  const [heroPose, setHeroPose] = useState<CouplePoseType>(currentStory.coupleStyle || 'holding-hands');

  // Interactive Chapter Showcase Tab
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<number>(0);

  // Audio preview player state
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleApplyHeroPreview = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStoryNames(heroYourName, heroPartnerName, heroPose);
    onStartStory();
  };

  const handleTrackPreview = (trackUrl: string, trackId: string) => {
    if (playingTrackId === trackId) {
      romanticAudio.pause();
      setPlayingTrackId(null);
    } else {
      romanticAudio.setTrack(trackUrl);
      romanticAudio.play();
      setPlayingTrackId(trackId);
    }
  };

  const showcaseTabs = [
    {
      id: 0,
      badge: 'Opening Scene',
      title: 'Candle Blow & Running Couple Hug',
      desc: 'Starts with a cute teddy bear blowing out a romantic anniversary or birthday candle. As the flame goes out, party poppers burst, and both of you run from opposite sides of the screen to meet in a warm embrace and sweet kiss.',
      icon: Sparkles,
      previewBadge: '🧸 Candle Blow → 🏃 Couple Run → 🤗 Huggy → 💋 Kiss'
    },
    {
      id: 1,
      badge: 'The Invitation',
      title: '3D Wax-Sealed Romantic Envelope',
      desc: 'A gorgeous letter envelope with realistic 3D paper flaps, wax seal, and personal dedication. When tapped, the wax seal pops open with a satisfying sound, and your love letter slides upward.',
      icon: Mail,
      previewBadge: '✉️ Interactive Wax Seal & Smooth Opening Paper'
    },
    {
      id: 2,
      badge: 'Photo Memories',
      title: 'Polaroid Gallery with Captions',
      desc: 'Pin your favorite photos as physical Polaroid snapshots with nostalgic paper tape, natural tilts, handwritten captions, and full-screen lightbox zoom.',
      icon: Camera,
      previewBadge: '📸 Retro Polaroids with Tap-to-Zoom Lightbox'
    },
    {
      id: 3,
      badge: 'Reasons Why',
      title: 'The "Reasons I Love You" Cards',
      desc: 'Count all the little quirks, sweet memories, and big reasons why they have your whole heart. Each card is beautifully styled with romantic emojis and heartfelt notes.',
      icon: Heart,
      previewBadge: '❤️ Custom Reasons & Wholesome Compliments'
    },
    {
      id: 4,
      badge: 'Our Journey',
      title: 'Milestone Love Timeline',
      desc: 'Chronicle your story from the day you first met, first date, late-night calls, to your biggest shared moments, concluding with a cozy couple on a park bench.',
      icon: Calendar,
      previewBadge: '⏳ Connected Milestones with Dates & Photos'
    },
    {
      id: 5,
      badge: 'The Finale',
      title: 'Final Love Letter & Secret Message',
      desc: 'A rich parchment paper love letter handwritten just for them, followed by an interactive "Reveal Secret Message" card that animates letter-by-letter with a typewriter effect.',
      icon: Gift,
      previewBadge: '💌 Typewriter Reveal with Confetti Shower'
    }
  ];

  const testimonials = [
    {
      quote:
        'I sent this website link to my boyfriend on our 2nd anniversary at midnight. The animated teddy blowing the candle and the couple running into a hug made him tear up instantly!',
      names: 'Priya & Rohan',
      occasion: '2nd Anniversary',
      location: 'Mumbai, India',
      rating: 5
    },
    {
      quote:
        'We have been long distance between New York and London. Having our timeline, polaroid pictures, and piano music in one interactive link felt 1000x more personal than a plain text message.',
      names: 'Elena & Lucas',
      occasion: 'Long Distance Birthday',
      location: 'New York / London',
      rating: 5
    },
    {
      quote:
        'I used the secret hidden message at the end of the letter to ask her to move in with me. She called me screaming with joy! Best surprise ever.',
      names: 'Daniel & Sarah',
      occasion: 'Proposal & Moving In',
      location: 'Toronto, Canada',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'Does my partner need to download any app or make an account?',
      a: 'No app download is required at all! LoveStory is a 100% web-based experience. When you share your link, it opens instantly in any mobile or desktop web browser (Safari, Chrome, Firefox) with smooth music and animations.'
    },
    {
      q: 'Can I add our own photos, custom songs, and change the story text?',
      a: 'Absolutely! Our intuitive customizer allows you to change all names, add your own photos for polaroids, write custom chapters, pick your favorite couple pose (Holding Hands, Huggy, Kiss, Bench), and select background romantic melodies.'
    },
    {
      q: 'Is it completely free to create and share?',
      a: 'Yes, creating and sharing your personalized love story website is 100% free with no coding or credit card required.'
    },
    {
      q: 'Will my story link expire or disappear?',
      a: 'No, every saved story receives a permanent secure link saved in the cloud and also stored in your browser so you and your partner can revisit it anytime.'
    },
    {
      q: 'Can I preview before sending the link to my partner?',
      a: 'Yes! You can preview the entire storybook experience as many times as you like. When you are completely happy with it, click "Share Story" to copy the magic link.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fff5f7] text-[#5a1f2d] selection:bg-[#c62845] selection:text-white">
      {/* ── TOP NAVIGATION BAR (Zone 1: Brand, Zone 2: Links, Zone 3: Actions) ── */}
      <header className="sticky top-0 z-40 bg-[#fff5f7]/90 backdrop-blur-md border-b border-[#c62845]/15 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#c62845] font-serif-romantic hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Heart className="w-5 h-5 text-[#c62845] fill-[#c62845] animate-pulse" />
            <span>LoveStory Studio</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#8c3a4f]">
            <a href="#preview" className="hover:text-[#c62845] transition-colors whitespace-nowrap">
              Interactive Preview
            </a>
            <a href="#how-it-works" className="hover:text-[#c62845] transition-colors whitespace-nowrap">
              How It Works
            </a>
            <a href="#chapters" className="hover:text-[#c62845] transition-colors whitespace-nowrap">
              Chapters
            </a>
            <a href="#music" className="hover:text-[#c62845] transition-colors whitespace-nowrap">
              Music
            </a>
            <a href="#testimonials" className="hover:text-[#c62845] transition-colors whitespace-nowrap">
              Wall of Love
            </a>
            <a href="#faq" className="hover:text-[#c62845] transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {savedStoriesCount > 0 && (
              <button
                type="button"
                onClick={onOpenSavedStories}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8c3a4f] bg-white hover:bg-rose-50 border border-rose-200 rounded-full transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <FolderHeart className="w-3.5 h-3.5 text-[#c62845]" />
                <span>My Stories</span>
                <span className="w-4 h-4 rounded-full bg-[#c62845] text-white text-[10px] flex items-center justify-center font-bold">
                  {savedStoriesCount}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={onStartStory}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#c62845] bg-rose-100/80 hover:bg-rose-200/80 rounded-full transition-all cursor-pointer whitespace-nowrap border border-[#c62845]/20 shadow-xs"
              title="Launch the animated storybook reader"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Storybook</span>
            </button>

            <button
              type="button"
              onClick={onStartCustomize}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#c62845] hover:bg-[#a11c34] rounded-full transition-all cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Create Your Story</span>
              <span className="xs:hidden">Create</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-200/40 via-pink-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Unboxed Metadata Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c62845] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#c62845]" />
                <span>The Interactive Love Storybook Maker</span>
                <span aria-hidden="true" className="text-rose-300">·</span>
                <span className="text-[#8c3a4f]">100% Free & No Coding</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#5a1f2d] font-serif-romantic leading-[1.15] text-balance">
                Turn your real love story into an{' '}
                <span className="text-[#c62845] italic">unforgettable</span> interactive storybook.
              </h1>

              <p className="text-base sm:text-lg text-[#8c3a4f] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Surprise your partner with an emotional, animated web gift. Includes a candle-blowing teddy, cute couple embrace & kiss, 3D wax-sealed letter, Polaroid memories, relationship timeline, and a typewriter secret letter.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onStartCustomize}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c62845] text-white font-bold text-sm hover:bg-[#a11c34] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Create Your Story — Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onStartStory}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#5a1f2d] border border-[#c62845]/20 font-bold text-sm hover:bg-rose-50 hover:text-[#c62845] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 text-[#c62845]" />
                  <span>Experience Demo Story</span>
                </button>
              </div>

              {/* Trust proof inline items */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#8c3a4f]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c62845]" />
                  <span>Works on iPhone & Android</span>
                </div>
                <span aria-hidden="true" className="text-rose-200">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c62845]" />
                  <span>No App Download Required</span>
                </div>
                <span aria-hidden="true" className="text-rose-200">·</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c62845]" />
                  <span>Permanent Private Link</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Sandbox Card */}
            <div id="preview" className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#c62845]/15 relative">
                {/* Floating pill-free title */}
                <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                  <div>
                    <h2 className="text-base font-bold text-[#c62845] font-serif-romantic flex items-center gap-1.5">
                      <span>Live Couple Preview</span>
                      <Heart className="w-3.5 h-3.5 fill-[#c62845]" />
                    </h2>
                    <p className="text-xs text-[#8c3a4f]">Type your names to see how it looks!</p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8c3a4f] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                    Live Demo
                  </span>
                </div>

                {/* Couple Pose Selector */}
                <div className="pt-4 pb-2">
                  <div className="grid grid-cols-4 gap-1.5 p-1 bg-rose-50/70 rounded-2xl border border-rose-100">
                    {[
                      { id: 'holding-hands', label: 'Hands', emoji: '👫' },
                      { id: 'hugging', label: 'Hug', emoji: '🤗' },
                      { id: 'kiss', label: 'Kiss', emoji: '💋' },
                      { id: 'bench', label: 'Bench', emoji: '🪑' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setHeroPose(p.id as CouplePoseType)}
                        className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                          heroPose === p.id
                            ? 'bg-[#c62845] text-white shadow-xs'
                            : 'text-[#8c3a4f] hover:text-[#c62845]'
                        }`}
                      >
                        <span>{p.emoji}</span>
                        <span className="hidden xs:inline">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live SVG Rendering */}
                <div className="py-2 flex flex-col items-center justify-center min-h-[190px]">
                  <CartoonCoupleSVG
                    personAName={heroYourName || 'You'}
                    personBName={heroPartnerName || 'Your Love'}
                    pose={heroPose}
                    scale={0.95}
                    interactive={true}
                  />
                </div>

                {/* Input Fields for Quick Personalization */}
                <form onSubmit={handleApplyHeroPreview} className="space-y-3 pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={heroYourName}
                        onChange={(e) => setHeroYourName(e.target.value)}
                        placeholder="e.g. Maya"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-[#c62845] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#8c3a4f] uppercase tracking-wider mb-1">
                        Partner's Name
                      </label>
                      <input
                        type="text"
                        value={heroPartnerName}
                        onChange={(e) => setHeroPartnerName(e.target.value)}
                        placeholder="e.g. Alex"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-rose-50/50 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-[#c62845] font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#c62845] text-white text-xs font-bold hover:bg-[#a11c34] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Launch This Storybook Experience</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS IN 3 STEPS ── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white/70 border-y border-[#c62845]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
              Effortless & Emotional
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5a1f2d] font-serif-romantic mt-2">
              How to create your story in 3 simple steps
            </h2>
            <p className="text-sm sm:text-base text-[#8c3a4f] mt-3">
              No technical skills needed. Our visual editor walks you through customizing every single detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-rose-100 flex flex-col items-center text-center relative group hover:border-[#c62845]/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#c62845] flex items-center justify-center text-2xl font-bold font-serif-romantic mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-[#5a1f2d] font-serif-romantic mb-2">
                Personalize Names & Intro
              </h3>
              <p className="text-xs sm:text-sm text-[#8c3a4f] leading-relaxed">
                Add your names, dedicate your 3D envelope, write your opening prompt, and pick your favorite couple pose (Holding Hands, Huggy, Kiss, or Bench).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-rose-100 flex flex-col items-center text-center relative group hover:border-[#c62845]/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#c62845] flex items-center justify-center text-2xl font-bold font-serif-romantic mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-[#5a1f2d] font-serif-romantic mb-2">
                Add Photos, Reasons & Music
              </h3>
              <p className="text-xs sm:text-sm text-[#8c3a4f] leading-relaxed">
                Upload your memorable photos for the Polaroid wall, list all the reasons you love them, set milestones on the timeline, and select romantic background music.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-rose-100 flex flex-col items-center text-center relative group hover:border-[#c62845]/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#c62845] flex items-center justify-center text-2xl font-bold font-serif-romantic mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-[#5a1f2d] font-serif-romantic mb-2">
                Share One Magical Link
              </h3>
              <p className="text-xs sm:text-sm text-[#8c3a4f] leading-relaxed">
                Click Save & Share to generate your permanent love story link. Send it over WhatsApp, iMessage, or email, and watch their heart melt.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onStartCustomize}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c62845] text-white text-sm font-bold hover:bg-[#a11c34] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Start Building Your Story Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── CHAPTER SHOWCASE ── */}
      <section id="chapters" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
              An Immersive Chapter-by-Chapter Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5a1f2d] font-serif-romantic mt-2">
              Every romantic moment, beautifully crafted
            </h2>
            <p className="text-sm sm:text-base text-[#8c3a4f] mt-3">
              Explore the rich animated chapters waiting inside your personalized storybook.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-8">
            {showcaseTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeShowcaseTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveShowcaseTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#c62845] text-white shadow-sm'
                      : 'bg-white text-[#8c3a4f] hover:bg-rose-50 border border-rose-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Spotlight Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-[#c62845]/15 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
                  Chapter {activeShowcaseTab + 1} of 6
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5a1f2d] font-serif-romantic">
                  {showcaseTabs[activeShowcaseTab].title}
                </h3>
                <p className="text-sm text-[#8c3a4f] leading-relaxed">
                  {showcaseTabs[activeShowcaseTab].desc}
                </p>

                <div className="pt-2">
                  <span className="inline-block text-xs font-semibold text-[#c62845] bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
                    {showcaseTabs[activeShowcaseTab].previewBadge}
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                {activeShowcaseTab === 0 && (
                  <CartoonCoupleSVG
                    personAName={currentStory.yourName || 'Maya'}
                    personBName={currentStory.partnerName || 'Alex'}
                    pose="kiss"
                    scale={0.9}
                    interactive={true}
                  />
                )}
                {activeShowcaseTab === 1 && (
                  <div className="w-36 h-28 bg-[#c62845] rounded-xl shadow-md border-2 border-white flex flex-col items-center justify-center text-white relative">
                    <div className="w-10 h-10 rounded-full bg-[#8c1d32] border-2 border-white/50 flex items-center justify-center shadow-inner">
                      <Heart className="w-5 h-5 fill-white" />
                    </div>
                    <span className="text-[10px] font-bold mt-2 font-serif-romantic">3D Wax Seal</span>
                  </div>
                )}
                {activeShowcaseTab === 2 && (
                  <div className="w-36 h-44 bg-white rounded-lg p-2 shadow-md border border-rose-100 flex flex-col items-center transform -rotate-3">
                    <div className="w-full h-28 bg-rose-100/70 rounded flex items-center justify-center text-2xl">
                      📸
                    </div>
                    <span className="text-[10px] font-serif-romantic text-[#5a1f2d] mt-2 italic">
                      "Our first trip together..."
                    </span>
                  </div>
                )}
                {activeShowcaseTab === 3 && (
                  <div className="w-full max-w-[200px] p-4 bg-white rounded-2xl shadow-xs border border-rose-200 text-center">
                    <span className="text-3xl">☕</span>
                    <h4 className="text-xs font-bold text-[#c62845] mt-1">Your Morning Laugh</h4>
                    <p className="text-[10px] text-[#8c3a4f] mt-0.5">The way you smile before saying anything.</p>
                  </div>
                )}
                {activeShowcaseTab === 4 && (
                  <CartoonCoupleSVG
                    personAName={currentStory.yourName || 'Maya'}
                    personBName={currentStory.partnerName || 'Alex'}
                    pose="bench"
                    scale={0.85}
                    interactive={true}
                  />
                )}
                {activeShowcaseTab === 5 && (
                  <div className="w-40 h-36 bg-[#fcf8f2] rounded-xl p-3 shadow-xs border border-amber-200/60 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-[#8c3a4f] uppercase tracking-wider">Secret Note</span>
                    <p className="text-xs font-handwriting text-[#5a1f2d] leading-snug">
                      I love you more than all the stars in the night sky...
                    </p>
                    <span className="text-[9px] text-[#c62845] font-bold text-right">Forever & Always ❤️</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MUSIC LOUNGE SHOWCASE ── */}
      <section id="music" className="py-16 md:py-24 bg-white/70 border-y border-[#c62845]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
              Romantic Ambiance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5a1f2d] font-serif-romantic mt-2">
              Set the mood with gentle melodies
            </h2>
            <p className="text-sm sm:text-base text-[#8c3a4f] mt-3">
              Sample romantic piano ballads and acoustic harmonies directly. Or upload your own meaningful song.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {MUSIC_PRESETS.map((preset) => {
              const isPlaying = playingTrackId === preset.id;
              return (
                <div
                  key={preset.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isPlaying
                      ? 'bg-rose-50 border-[#c62845] shadow-sm ring-1 ring-[#c62845]'
                      : 'bg-white border-rose-100 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{preset.emoji}</span>
                    <button
                      type="button"
                      onClick={() => handleTrackPreview(preset.url, preset.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-[#c62845] text-white'
                          : 'bg-rose-100 text-[#c62845] hover:bg-[#c62845] hover:text-white'
                      }`}
                      aria-label={isPlaying ? `Pause ${preset.name}` : `Play ${preset.name}`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-[#5a1f2d] font-serif-romantic">
                    {preset.name}
                  </h3>
                  <p className="text-xs text-[#8c3a4f] mt-1">{preset.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WALL OF LOVE / TESTIMONIALS ── */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
              Real Couples, Real Tears of Joy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5a1f2d] font-serif-romantic mt-2">
              Loved by couples all around the world
            </h2>
            <p className="text-sm sm:text-base text-[#8c3a4f] mt-3">
              Stories from real people who turned their memories into an unforgettable anniversary, birthday, or proposal surprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xs border border-rose-100 flex flex-col justify-between"
              >
                <div>
                  {/* 5 star rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Heart key={i} className="w-4 h-4 fill-[#c62845] text-[#c62845]" />
                    ))}
                  </div>

                  <p className="text-sm text-[#5a1f2d] italic leading-relaxed font-serif-romantic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-rose-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#c62845] block">{t.names}</span>
                    <span className="text-[#8c3a4f]">{t.location}</span>
                  </div>
                  <span className="font-medium text-[#8c3a4f] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 text-[11px]">
                    {t.occasion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ── */}
      <section id="faq" className="py-16 md:py-24 bg-white/70 border-t border-[#c62845]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#c62845] uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#5a1f2d] font-serif-romantic mt-2">
              Everything you need to know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#5a1f2d] hover:text-[#c62845] transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-serif-romantic">{faq.q}</span>
                    <span className={`text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#8c3a4f] leading-relaxed border-t border-rose-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL ROMANTIC CALL TO ACTION BANNER ── */}
      <section className="py-20 bg-gradient-to-br from-[#c62845] to-[#8c1d32] text-white text-center relative overflow-hidden">
        {/* Soft background sparkles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Heart className="absolute top-[15%] left-[8%] w-10 h-10 fill-white" />
          <Heart className="absolute bottom-[20%] right-[10%] w-12 h-12 fill-white" />
          <Sparkles className="absolute top-[25%] right-[20%] w-8 h-8 fill-white" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-romantic leading-tight">
            Ready to make your favorite person smile today?
          </h2>
          <p className="text-base sm:text-lg text-rose-100 max-w-2xl mx-auto">
            It takes just 3 minutes to fill in your sweetest memories and create a gift they will treasure forever.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartCustomize}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-[#c62845] font-bold text-sm hover:bg-rose-50 transition-all shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Start Creating Your Storybook — Free
            </button>

            <button
              type="button"
              onClick={onStartStory}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent text-white border border-white/40 font-bold text-sm hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
            >
              Read Sample Storybook
            </button>
          </div>
        </div>
      </section>

      {/* ── WEBSITE FOOTER ── */}
      <footer className="py-12 bg-white border-t border-[#c62845]/15 text-[#8c3a4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-rose-100 text-center md:text-left">
            <div className="space-y-1">
              <a
                href="#hero"
                className="text-lg font-bold text-[#c62845] font-serif-romantic inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-[#c62845]" />
                <span>LoveStory Studio</span>
              </a>
              <p className="text-xs text-[#8c3a4f]">
                Handcrafted for unforgettable anniversaries, birthdays, and proposals.
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
              <a href="#hero" className="hover:text-[#c62845] transition-colors">Home</a>
              <a href="#preview" className="hover:text-[#c62845] transition-colors">Preview</a>
              <a href="#how-it-works" className="hover:text-[#c62845] transition-colors">How It Works</a>
              <a href="#chapters" className="hover:text-[#c62845] transition-colors">Chapters</a>
              <a href="#music" className="hover:text-[#c62845] transition-colors">Music</a>
              <a href="#faq" className="hover:text-[#c62845] transition-colors">FAQ</a>
            </nav>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c3a4f]/80 text-center sm:text-left">
            <p>
              "In all the world, there is no heart for me like yours." ❤️
            </p>
            <p>
              © {new Date().getFullYear()} LoveStory Studio. All love reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
