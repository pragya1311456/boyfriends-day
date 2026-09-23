import React, { useEffect } from 'react';
import { CartoonCoupleSVG } from './CartoonCouple';
import { romanticConfetti } from '../utils/confetti';
import { Heart, Sparkles } from 'lucide-react';

interface CoupleOpeningEncounterProps {
  yourName?: string;
  partnerName?: string;
  stage: 'running' | 'hug' | 'kiss';
}

export const CoupleOpeningEncounter: React.FC<CoupleOpeningEncounterProps> = ({
  yourName = 'Maya',
  partnerName = 'Alex',
  stage
}) => {
  useEffect(() => {
    if (stage === 'kiss') {
      // Shower confetti when they kiss
      romanticConfetti.popperBlast();
      const t = setTimeout(() => {
        romanticConfetti.burstAt(window.innerWidth / 2, window.innerHeight / 2 - 40, 24);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center overflow-hidden">
      {/* Background romantic glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-radial from-rose-200/50 via-rose-100/20 to-transparent rounded-full animate-pulse" />
      </div>

      {/* ── STAGE 1: RUNNING TOWARDS EACH OTHER FROM BOTH SIDES ── */}
      {stage === 'running' && (
        <div className="relative w-full h-full max-w-md mx-auto">
          {/* Running heart footsteps on ground */}
          <div className="absolute bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c62845]/20 to-transparent" />

          {/* Left Runner (Running from left edge to center) */}
          <div
            className="absolute bottom-5 z-20 transition-all duration-[1600ms] ease-out flex flex-col items-center"
            style={{
              left: 'calc(50% - 95px)',
              transform: 'translateX(0)',
              animation: 'slideFromLeft 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}
          >
            {/* Heart sweat / excitement icon */}
            <Heart className="w-4 h-4 text-[#ff4d6d] fill-[#ff4d6d] mb-1 animate-bounce" />

            {/* Left Chibi Runner SVG */}
            <div className="animate-run-bounce">
              <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
                {/* Hair back */}
                <ellipse cx="40" cy="30" rx="24" ry="22" fill="#3a1d1d" />

                {/* Body (Red sweater) */}
                <rect x="24" y="50" width="32" height="34" rx="12" fill="#c62845" />

                {/* Arms leaning forward */}
                <path d="M48 60 Q65 62 68 56" stroke="#ffe3d8" strokeWidth="9" strokeLinecap="round" />
                <path d="M26 62 Q15 68 18 78" stroke="#ffe3d8" strokeWidth="8" strokeLinecap="round" />

                {/* Running Legs */}
                <g className="animate-leg-a">
                  <rect x="28" y="80" width="9" height="24" rx="4" fill="#5a1f2d" />
                  <ellipse cx="32" cy="103" rx="7" ry="4" fill="#ffffff" stroke="#c62845" />
                </g>
                <g className="animate-leg-b">
                  <rect x="42" y="80" width="9" height="24" rx="4" fill="#5a1f2d" />
                  <ellipse cx="47" cy="103" rx="7" ry="4" fill="#ffffff" stroke="#c62845" />
                </g>

                {/* Head */}
                <circle cx="40" cy="30" r="23" fill="#ffe3d8" />
                {/* Bangs */}
                <path d="M18 24 C22 12 36 8 58 12 C62 18 62 26 60 28 C50 20 32 20 18 24 Z" fill="#3a1d1d" />

                {/* Excited eyes (Happy arcs) */}
                <path d="M30 28 Q34 23 38 28" stroke="#2d1505" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M46 28 Q50 23 54 28" stroke="#2d1505" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Big happy smile */}
                <path d="M36 34 Q42 42 48 34" stroke="#2d1505" strokeWidth="2.2" strokeLinecap="round" fill="#c62845" />

                {/* Cheeks */}
                <ellipse cx="27" cy="33" rx="5" ry="3" fill="#ff4d6d" opacity="0.8" />
                <ellipse cx="53" cy="33" rx="5" ry="3" fill="#ff4d6d" opacity="0.8" />
              </svg>
            </div>

            <span className="text-[11px] font-bold text-[#c62845] bg-white/90 px-2 py-0.5 rounded-full border border-rose-200 shadow-xs mt-1">
              {yourName} 🏃‍♂️
            </span>
          </div>

          {/* Right Runner (Running from right edge to center) */}
          <div
            className="absolute bottom-5 z-20 transition-all duration-[1600ms] ease-out flex flex-col items-center"
            style={{
              right: 'calc(50% - 95px)',
              transform: 'translateX(0)',
              animation: 'slideFromRight 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}
          >
            {/* Heart sweat / excitement icon */}
            <Heart className="w-4 h-4 text-[#ff4d6d] fill-[#ff4d6d] mb-1 animate-bounce" />

            {/* Right Chibi Runner SVG */}
            <div className="animate-run-bounce">
              <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
                {/* Hair back */}
                <ellipse cx="40" cy="32" rx="26" ry="26" fill="#4a2618" />
                <path d="M16 32 Q10 60 18 70" stroke="#4a2618" strokeWidth="8" strokeLinecap="round" />
                <path d="M64 32 Q70 60 62 70" stroke="#4a2618" strokeWidth="8" strokeLinecap="round" />

                {/* Body (White coat & red scarf) */}
                <rect x="24" y="50" width="32" height="34" rx="12" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
                <path d="M22 48 C28 44 52 44 58 48 C60 54 56 56 52 56 C44 56 36 56 28 56 Z" fill="#c62845" />

                {/* Arms reaching out to left */}
                <path d="M32 60 Q15 62 12 56" stroke="#ffe3d8" strokeWidth="9" strokeLinecap="round" />
                <path d="M54 62 Q65 68 62 78" stroke="#ffe3d8" strokeWidth="8" strokeLinecap="round" />

                {/* Running Legs */}
                <g className="animate-leg-b">
                  <rect x="28" y="80" width="9" height="24" rx="4" fill="#5a1f2d" />
                  <ellipse cx="32" cy="103" rx="7" ry="4" fill="#c62845" />
                </g>
                <g className="animate-leg-a">
                  <rect x="42" y="80" width="9" height="24" rx="4" fill="#5a1f2d" />
                  <ellipse cx="47" cy="103" rx="7" ry="4" fill="#c62845" />
                </g>

                {/* Head */}
                <circle cx="40" cy="30" r="23" fill="#ffe3d8" />
                {/* Hair bow */}
                <circle cx="20" cy="18" r="4.5" fill="#c62845" />
                {/* Bangs */}
                <path d="M20 22 C30 10 50 10 60 22 C55 25 48 21 40 23 C32 21 24 25 20 22 Z" fill="#4a2618" />

                {/* Excited eyes (Happy arcs) */}
                <path d="M30 28 Q34 23 38 28" stroke="#2d1505" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M46 28 Q50 23 54 28" stroke="#2d1505" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Big happy smile */}
                <path d="M36 34 Q42 42 48 34" stroke="#2d1505" strokeWidth="2.2" strokeLinecap="round" fill="#c62845" />

                {/* Cheeks */}
                <ellipse cx="27" cy="33" rx="5" ry="3" fill="#ff4d6d" opacity="0.8" />
                <ellipse cx="53" cy="33" rx="5" ry="3" fill="#ff4d6d" opacity="0.8" />
              </svg>
            </div>

            <span className="text-[11px] font-bold text-[#c62845] bg-white/90 px-2 py-0.5 rounded-full border border-rose-200 shadow-xs mt-1">
              🏃‍♀️ {partnerName}
            </span>
          </div>
        </div>
      )}

      {/* ── STAGE 2: ADORABLE WARM HUGGY ── */}
      {stage === 'hug' && (
        <div className="relative flex flex-col items-center justify-center animate-scale-up">
          {/* Popping hearts above the hug */}
          <div className="absolute -top-3 flex items-center gap-2 animate-bounce z-30">
            <Heart className="w-6 h-6 text-[#c62845] fill-[#c62845] animate-ping" />
            <span className="text-xs font-extrabold text-[#c62845] font-serif-romantic bg-white/95 px-3 py-1 rounded-full shadow-md border border-rose-300">
              HUGGY! 🤗❤️
            </span>
            <Sparkles className="w-5 h-5 text-[#ff4d6d] fill-[#ff4d6d]" />
          </div>

          <CartoonCoupleSVG
            personAName={yourName}
            personBName={partnerName}
            pose="hugging"
            scale={1.08}
            interactive={false}
          />
        </div>
      )}

      {/* ── STAGE 3: SWEET ROMANTIC KISS ── */}
      {stage === 'kiss' && (
        <div className="relative flex flex-col items-center justify-center animate-scale-up">
          {/* Kiss floating hearts bloom */}
          <div className="absolute -top-6 flex items-center gap-1.5 z-30">
            <Heart className="w-7 h-7 text-[#c62845] fill-[#c62845] animate-kiss-bloom" />
            <span className="text-xs font-extrabold text-[#c62845] font-serif-romantic bg-white/95 px-3.5 py-1 rounded-full shadow-md border border-rose-300">
              SWEET KISS! 💋✨
            </span>
            <Heart className="w-7 h-7 text-[#ff4d6d] fill-[#ff4d6d] animate-kiss-bloom" style={{ animationDelay: '0.4s' }} />
          </div>

          <CartoonCoupleSVG
            personAName={yourName}
            personBName={partnerName}
            pose="kiss"
            scale={1.08}
            interactive={false}
          />
        </div>
      )}

      {/* CSS Keyframes for running in from left and right */}
      <style>{`
        @keyframes slideFromLeft {
          0% {
            left: -120px;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            left: calc(50% - 95px);
            opacity: 1;
          }
        }

        @keyframes slideFromRight {
          0% {
            right: -120px;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            right: calc(50% - 95px);
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          0% {
            transform: scale(0.85);
            opacity: 0.5;
          }
          60% {
            transform: scale(1.06);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-up {
          animation: scaleUp 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
