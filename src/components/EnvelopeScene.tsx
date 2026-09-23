import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';
import { romanticConfetti } from '../utils/confetti';

interface EnvelopeSceneProps {
  partnerRoleText: string;
  partnerName: string;
  yourName?: string;
  onOpenComplete: () => void;
  onBackToWebsite?: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({
  partnerRoleText = 'For the boy who stole my heart... 💗',
  partnerName = 'Alex',
  yourName = 'Maya',
  onOpenComplete,
  onBackToWebsite
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterExtracted, setIsLetterExtracted] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Play music now on user interaction
    romanticAudio.play();

    // Trigger sweet burst of hearts
    romanticConfetti.burstAt(window.innerWidth / 2, window.innerHeight * 0.45, 30);

    // Letter slides out after flap flips open
    setTimeout(() => {
      setIsLetterExtracted(true);
    }, 600);

    // Proceed to Chapter 1 after reading the letter peek
    setTimeout(() => {
      onOpenComplete();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-romantic-pattern px-4 select-none overflow-hidden transition-colors duration-1000">
      {/* Return to Website Button */}
      {onBackToWebsite && (
        <button
          onClick={onBackToWebsite}
          className="absolute top-4 left-4 z-50 px-3.5 py-1.5 text-xs font-semibold text-[#8c3a4f] bg-white/95 hover:bg-white border border-[#c62845]/20 hover:border-[#c62845] rounded-full shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          aria-label="Back to website"
        >
          <span>← Website Home</span>
        </button>
      )}
      {/* Background glow when opening */}
      <div
        className={`absolute inset-0 bg-white/40 pointer-events-none transition-opacity duration-1000 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Hearts in background */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-[18%] left-[12%] w-6 h-6 text-rose-300 fill-rose-200 animate-float-heart" />
        <Heart className="absolute top-[15%] right-[15%] w-8 h-8 text-[#ff4d6d]/40 fill-[#ff4d6d]/20 animate-float-heart" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-[16%] left-[20%] w-7 h-7 text-[#c62845]/30 fill-[#c62845]/20 animate-float-heart" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Caption Header */}
        <div className="mb-6 space-y-2">
          <p className="text-xl sm:text-2xl font-bold text-[#c62845] font-serif-romantic tracking-tight drop-shadow-sm">
            {partnerRoleText}
          </p>
          <p className="text-sm font-medium text-[#8c3a4f]">
            {isOpen ? 'Opening your personalized story...' : 'Tap below to reveal what’s inside 💌'}
          </p>
        </div>

        {/* 3D Romantic Envelope */}
        <div
          onClick={handleOpenEnvelope}
          className={`group relative w-[310px] h-[210px] sm:w-[340px] sm:h-[230px] cursor-pointer transition-transform duration-500 ${
            !isOpen ? 'hover:scale-105 active:scale-95' : 'scale-100'
          }`}
          role="button"
          tabIndex={0}
          aria-label="Open romantic letter envelope"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenEnvelope();
            }
          }}
        >
          {/* Shadow beneath envelope */}
          <div className="absolute -bottom-4 left-6 right-6 h-6 bg-[#c62845]/20 rounded-full blur-md" />

          {/* Envelope Back Base */}
          <div className="absolute inset-0 rounded-2xl bg-[#a11c34] shadow-xl overflow-hidden border border-[#8c182c]">
            {/* Inner envelope pattern lining */}
            <div className="absolute inset-0 bg-[#fff5f7] opacity-20 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:12px_12px]" />
          </div>

          {/* Letter Sheet that slides upward */}
          <div
            className={`absolute left-4 right-4 bg-white rounded-xl shadow-lg border border-rose-200 p-5 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out z-20 ${
              isLetterExtracted
                ? 'bottom-[70px] h-[190px] shadow-2xl scale-105 -rotate-1'
                : 'bottom-2 h-[150px]'
            }`}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 mb-1.5 shadow-xs">
              <span className="text-xs">👫</span>
              <span className="text-[11px] font-bold text-[#c62845] font-serif-romantic">
                {yourName} & {partnerName}
              </span>
              <Heart className="w-3 h-3 text-[#ff4d6d] fill-[#ff4d6d] animate-pulse" />
            </div>
            <h2 className="text-sm font-bold text-[#c62845] font-serif-romantic">
              Dearest {partnerName},
            </h2>
            <p className="text-xs text-[#5a1f2d] mt-1 font-handwriting text-base leading-snug">
              Every love story is beautiful, but ours is my absolute favorite...
            </p>
            <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#8c3a4f]">
              <span>Begin Chapter One</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>

          {/* Envelope Front Pocket (Left & Right triangles) */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* Bottom Fold */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0 border-l-[155px] sm:border-l-[170px] border-l-transparent border-r-[155px] sm:border-r-[170px] border-r-transparent border-b-[115px] sm:border-b-[125px] border-b-[#c62845]"
            />
            {/* Left triangle */}
            <div
              className="absolute top-0 bottom-0 left-0 w-0 border-t-[105px] sm:border-t-[115px] border-t-transparent border-b-[105px] sm:border-b-[115px] border-b-transparent border-l-[155px] sm:border-l-[170px] border-l-[#b0223c]"
            />
            {/* Right triangle */}
            <div
              className="absolute top-0 bottom-0 right-0 w-0 border-t-[105px] sm:border-t-[115px] border-t-transparent border-b-[105px] sm:border-b-[115px] border-b-transparent border-r-[155px] sm:border-r-[170px] border-r-[#b0223c]"
            />
          </div>

          {/* Top Flap (3D folding upwards) */}
          <div
            className={`absolute top-0 left-0 right-0 z-40 origin-top transition-transform duration-700 ease-in-out pointer-events-none ${
              isOpen
                ? 'rotate-x-180 -translate-y-[2px]'
                : 'rotate-x-0'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateX(175deg)' : 'rotateX(0deg)'
            }}
          >
            <div className="w-0 h-0 border-l-[155px] sm:border-l-[170px] border-l-transparent border-r-[155px] sm:border-r-[170px] border-r-transparent border-t-[115px] sm:border-t-[125px] border-t-[#d83152] filter drop-shadow-md" />
          </div>

          {/* Cute Wax Seal Heart in Center */}
          <div
            className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
              isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100 group-hover:scale-110'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8a1327] to-[#e63946] border-2 border-[#ffb3c1] shadow-lg flex items-center justify-center text-white">
              <Heart className="w-7 h-7 fill-white drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Prompt Button */}
        <button
          onClick={handleOpenEnvelope}
          className={`mt-10 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-95 ${
            isOpen
              ? 'bg-rose-100 text-[#c62845] border border-rose-200'
              : 'bg-[#c62845] hover:bg-[#a11c34] text-white shadow-[#c62845]/30'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isOpen ? 'Letter Is Opening... ❤️' : 'Open this... 💌'}</span>
        </button>
      </div>
    </div>
  );
};
