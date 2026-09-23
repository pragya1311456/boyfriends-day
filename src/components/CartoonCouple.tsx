import React, { useState } from 'react';
import { romanticConfetti } from '../utils/confetti';
import { Heart, Sparkles } from 'lucide-react';
import { CouplePoseType } from '../types/story';

export type { CouplePoseType };

interface CoupleProps {
  personAName?: string;
  personBName?: string;
  pose?: CouplePoseType;
  scale?: number;
  interactive?: boolean;
  className?: string;
}

export const CartoonCoupleSVG: React.FC<CoupleProps> = ({
  personAName = 'Maya',
  personBName = 'Alex',
  pose = 'holding-hands',
  scale = 1,
  interactive = true,
  className = ''
}) => {
  const [isBlushingMore, setIsBlushingMore] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleCoupleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsBlushingMore(true);
    setClickCount(prev => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    romanticConfetti.burstAt(x, y, 16);

    setTimeout(() => {
      setIsBlushingMore(false);
    }, 1500);
  };

  return (
    <div
      onClick={handleCoupleClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? 'cursor-pointer group active:scale-95 transition-transform' : ''
      } ${className}`}
      style={{ transform: `scale(${scale})` }}
      title={interactive ? 'Tap the couple to blush & send love! ❤️' : undefined}
    >
      {/* Floating Interactive Hearts when tapped */}
      {isBlushingMore && (
        <div className="absolute -top-6 flex items-center gap-1.5 animate-bounce z-30 pointer-events-none">
          <Heart className="w-5 h-5 text-[#c62845] fill-[#c62845] animate-ping" />
          <span className="text-xs font-bold text-[#c62845] font-serif-romantic bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-rose-200">
            {personAName} & {personBName} ❤️
          </span>
          <Sparkles className="w-4 h-4 text-[#ff4d6d] fill-[#ff4d6d]" />
        </div>
      )}

      {/* ── POSE 1: HOLDING HANDS ── */}
      {pose === 'holding-hands' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          {/* Soft Pink Glow */}
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.09)" />

          {/* Floating little hearts */}
          <g className="animate-pulse">
            <path d="M140 34 C140 28 134 22 128 28 C122 34 122 42 140 56 C158 42 158 34 152 28 C146 22 140 28 140 34 Z" fill="#c62845" />
            <path d="M78 48 C78 44 74 40 70 44 C66 48 66 54 78 64 C90 54 90 48 86 44 C82 40 78 44 78 48 Z" fill="#ff758f" />
            <path d="M202 46 C202 42 198 38 194 42 C190 46 190 52 202 62 C214 52 214 46 210 42 C206 38 202 42 202 46 Z" fill="#ff758f" />
          </g>

          {/* --- LEFT PARTNER --- */}
          <g transform="translate(60, 58)">
            <ellipse cx="40" cy="35" rx="30" ry="26" fill="#3a1d1d" />
            <rect x="22" y="60" width="36" height="42" rx="14" fill="#c62845" />
            <circle cx="40" cy="74" r="5" fill="#ffffff" />
            <rect x="26" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <rect x="44" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <ellipse cx="31" cy="119" rx="7" ry="4" fill="#ffffff" stroke="#c62845" />
            <ellipse cx="49" cy="119" rx="7" ry="4" fill="#ffffff" stroke="#c62845" />
            <circle cx="40" cy="36" r="28" fill="#ffe3d8" />
            <path d="M12 28 C18 10 62 10 68 28 C56 32 46 24 40 28 C34 24 24 32 12 28 Z" fill="#3a1d1d" />
            <circle cx="31" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="30" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="49" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="48" cy="33" r="1.2" fill="#ffffff" />
            <ellipse
              cx="26"
              cy="41"
              rx={isBlushingMore ? "7" : "5"}
              ry={isBlushingMore ? "5" : "3.5"}
              fill="#ff4d6d"
              opacity={isBlushingMore ? "0.9" : "0.6"}
            />
            <ellipse
              cx="54"
              cy="41"
              rx={isBlushingMore ? "7" : "5"}
              ry={isBlushingMore ? "5" : "3.5"}
              fill="#ff4d6d"
              opacity={isBlushingMore ? "0.9" : "0.6"}
            />
            <path d="M36 42 Q40 47 44 42" stroke="#3a1d1d" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <ellipse cx="62" cy="78" rx="6" ry="6" fill="#ffe3d8" />
          </g>

          {/* --- RIGHT PARTNER --- */}
          <g transform="translate(140, 58)">
            <ellipse cx="40" cy="35" rx="30" ry="26" fill="#4a2618" />
            <path d="M10 35 C10 65 14 85 24 85 C28 85 28 65 24 35 Z" fill="#4a2618" />
            <path d="M70 35 C70 65 66 85 56 85 C52 85 52 65 56 35 Z" fill="#4a2618" />
            <rect x="22" y="60" width="36" height="42" rx="14" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
            <path d="M20 58 C26 54 54 54 60 58 C62 66 58 68 54 68 C44 68 36 68 26 68 Z" fill="#c62845" />
            <rect x="42" y="66" width="9" height="18" rx="4" fill="#c62845" />
            <rect x="26" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <rect x="44" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <ellipse cx="31" cy="119" rx="7" ry="4" fill="#c62845" />
            <ellipse cx="49" cy="119" rx="7" ry="4" fill="#c62845" />
            <circle cx="40" cy="36" r="28" fill="#ffe3d8" />
            <path d="M14 26 C26 12 54 12 66 26 C60 30 50 25 40 28 C30 25 20 30 14 26 Z" fill="#4a2618" />
            <circle cx="62" cy="22" r="5" fill="#c62845" />
            <circle cx="62" cy="22" r="2" fill="#ffffff" />
            <circle cx="31" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="30" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="49" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="48" cy="33" r="1.2" fill="#ffffff" />
            <ellipse
              cx="26"
              cy="41"
              rx={isBlushingMore ? "7" : "5"}
              ry={isBlushingMore ? "5" : "3.5"}
              fill="#ff4d6d"
              opacity={isBlushingMore ? "0.9" : "0.6"}
            />
            <ellipse
              cx="54"
              cy="41"
              rx={isBlushingMore ? "7" : "5"}
              ry={isBlushingMore ? "5" : "3.5"}
              fill="#ff4d6d"
              opacity={isBlushingMore ? "0.9" : "0.6"}
            />
            <path d="M36 40 Q40 46 44 40" stroke="#3a1d1d" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <ellipse cx="18" cy="78" rx="6" ry="6" fill="#ffe3d8" />
          </g>

          {/* Intertwined Hands Sparkle */}
          <circle cx="140" cy="136" r="7" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
          <path d="M140 133 C140 130 136 127 133 130 C130 133 130 137 140 143 C150 137 150 133 147 130 C144 127 140 130 140 133 Z" fill="#c62845" />

          {/* Bottom Names */}
          <text x="100" y="206" textAnchor="middle" fill="#8c3a4f" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">
            {personAName}
          </text>
          <text x="180" y="206" textAnchor="middle" fill="#8c3a4f" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">
            {personBName}
          </text>
        </svg>
      )}

      {/* ── POSE 2: WARM FRONTAL HUG ── */}
      {pose === 'hugging' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.1)" />

          <g className="animate-pulse">
            <path d="M140 30 C140 22 130 16 124 24 C116 32 116 42 140 60 C164 42 164 32 156 24 C150 16 140 22 140 30 Z" fill="#c62845" />
            <circle cx="112" cy="45" r="3" fill="#ff758f" />
            <circle cx="168" cy="45" r="3" fill="#ff758f" />
          </g>

          <g transform="translate(70, 56)">
            <rect x="25" y="58" width="40" height="46" rx="16" fill="#c62845" />
            <rect x="65" y="58" width="40" height="46" rx="16" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />

            <ellipse cx="48" cy="34" rx="26" ry="24" fill="#3a1d1d" />
            <circle cx="52" cy="36" r="23" fill="#ffe3d8" />
            <path d="M28 32 C34 16 54 14 74 24 C68 28 58 26 44 28 C34 26 28 32 28 32 Z" fill="#3a1d1d" />

            <ellipse cx="88" cy="34" rx="26" ry="24" fill="#4a2618" />
            <circle cx="84" cy="36" r="23" fill="#ffe3d8" />
            <path d="M62 24 C82 14 102 16 108 32 C108 32 102 26 92 28 C78 26 68 28 62 24 Z" fill="#4a2618" />

            {/* Happy closed eyes (^_^) */}
            <path d="M46 36 Q50 32 54 36" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M78 36 Q82 32 86 36" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Blushing cheeks */}
            <ellipse cx="42" cy="42" rx="6" ry="4" fill="#ff4d6d" opacity="0.8" />
            <ellipse cx="88" cy="42" rx="6" ry="4" fill="#ff4d6d" opacity="0.8" />

            {/* Hugging arms overlapping */}
            <path d="M38 72 C55 60 85 64 96 74" stroke="#c62845" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="98" cy="74" r="6" fill="#ffe3d8" />
            <path d="M92 78 C75 90 45 86 34 76" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="32" cy="76" r="6" fill="#ffe3d8" />
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            The Warmest, Coziest Hug 🤗❤️
          </text>
        </svg>
      )}

      {/* ── POSE 3: COZY SIDE HUG (HUG-SIDE) ── */}
      {pose === 'hug-side' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.09)" />

          {/* Floating hearts and gentle sparkles */}
          <g className="animate-pulse">
            <path d="M140 28 C140 22 134 16 128 22 C122 28 122 36 140 48 C158 36 158 28 152 22 C146 16 140 22 140 28 Z" fill="#c62845" />
            <circle cx="95" cy="40" r="3" fill="#ff758f" />
            <circle cx="185" cy="42" r="3.5" fill="#ff758f" />
          </g>

          <g transform="translate(68, 52)">
            {/* Left partner (Red sweater) standing proud */}
            <rect x="22" y="62" width="38" height="46" rx="15" fill="#c62845" />
            <rect x="26" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />
            <rect x="42" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />

            {/* Left head */}
            <ellipse cx="40" cy="36" rx="27" ry="25" fill="#3a1d1d" />
            <circle cx="42" cy="38" r="23" fill="#ffe3d8" />
            <path d="M18 30 C26 14 62 14 68 28 C56 32 46 25 40 28 C34 25 24 32 18 30 Z" fill="#3a1d1d" />

            {/* Left smiling happy wink eyes */}
            <path d="M34 38 Q38 34 42 38" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="37" r="3.2" fill="#2d1505" />
            <circle cx="49" cy="36" r="1.2" fill="#ffffff" />
            <ellipse cx="32" cy="44" rx="5.5" ry="3.5" fill="#ff4d6d" opacity="0.8" />
            <ellipse cx="54" cy="44" rx="5.5" ry="3.5" fill="#ff4d6d" opacity="0.8" />
            <path d="M38 46 Q43 51 48 46" stroke="#3a1d1d" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Right partner (White coat) leaning comfortably against Left shoulder */}
            <g transform="rotate(-6 88 50)">
              <rect x="64" y="62" width="38" height="46" rx="15" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
              <rect x="68" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />
              <rect x="84" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />

              {/* Right head */}
              <ellipse cx="80" cy="37" rx="27" ry="25" fill="#4a2618" />
              <circle cx="78" cy="39" r="23" fill="#ffe3d8" />
              <path d="M54 28 C68 14 98 16 104 32 C96 32 88 27 78 28 C68 26 60 30 54 28 Z" fill="#4a2618" />

              {/* Cute bow */}
              <circle cx="98" cy="24" r="4.5" fill="#c62845" />

              {/* Happy closed eyes */}
              <path d="M70 39 Q74 35 78 39" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M86 39 Q90 35 94 39" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="68" cy="45" rx="5.5" ry="3.5" fill="#ff4d6d" opacity="0.85" />
              <ellipse cx="94" cy="45" rx="5.5" ry="3.5" fill="#ff4d6d" opacity="0.85" />
              <path d="M78 46 Q83 50 87 46" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Left partner's arm wrapping OVER right partner's shoulder */}
            <path d="M46 72 Q75 58 98 76" stroke="#c62845" strokeWidth="11" strokeLinecap="round" fill="none" />
            <circle cx="98" cy="78" r="6" fill="#ffe3d8" />

            {/* Right partner's hand around waist */}
            <path d="M96 90 Q72 96 56 86" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" fill="none" />
            <circle cx="54" cy="85" r="5.5" fill="#ffe3d8" />
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            Always Better Together 🤗❤️
          </text>
        </svg>
      )}

      {/* ── POSE 4: SWEET LIPS KISS ── */}
      {pose === 'kiss' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.1)" />

          {/* Kiss burst hearts in middle */}
          <g className="animate-ping" style={{ transformOrigin: '140px 88px', animationDuration: '2s' }}>
            <path d="M140 76 C140 72 136 68 132 72 C128 76 128 82 140 92 C152 82 152 76 148 72 C144 68 140 72 140 76 Z" fill="#ff4d6d" />
          </g>
          <g className="animate-pulse">
            <path d="M140 32 C140 26 134 20 128 26 C122 32 122 40 140 52 C158 40 158 32 152 26 C146 20 140 26 140 32 Z" fill="#c62845" />
            <circle cx="115" cy="46" r="3" fill="#ff758f" />
            <circle cx="165" cy="46" r="3" fill="#ff758f" />
          </g>

          <g transform="translate(68, 56)">
            {/* Left partner leaning in for kiss */}
            <g transform="translate(10, 4) rotate(6 50 50)">
              <ellipse cx="44" cy="34" rx="26" ry="24" fill="#3a1d1d" />
              <circle cx="46" cy="35" r="23" fill="#ffe3d8" />
              <path d="M26 30 C32 14 52 12 72 22 C66 26 56 24 42 26 C32 24 26 30 26 30 Z" fill="#3a1d1d" />
              <path d="M44 35 Q48 31 52 35" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M66 38 Q71 39 68 41" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="44" cy="42" rx="6" ry="4" fill="#ff4d6d" opacity="0.8" />
              <rect x="25" y="58" width="40" height="46" rx="16" fill="#c62845" />
            </g>

            {/* Right partner receiving sweet kiss with shy blush */}
            <g transform="translate(56, 4)">
              <ellipse cx="44" cy="34" rx="26" ry="24" fill="#4a2618" />
              <circle cx="42" cy="35" r="23" fill="#ffe3d8" />
              <path d="M22 22 C42 12 62 14 68 30 C68 30 62 24 52 26 C38 24 28 26 22 22 Z" fill="#4a2618" />
              <path d="M34 36 Q38 32 42 36" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="38" cy="42" rx="7" ry="5" fill="#ff4d6d" opacity="0.85" />
              <path d="M36 44 Q40 48 44 44" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />
              <rect x="20" y="58" width="40" height="46" rx="16" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
              <circle cx="28" cy="74" r="6" fill="#ffe3d8" />
            </g>
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            A Sweet Kiss for My Favorite Person 💋
          </text>
        </svg>
      )}

      {/* ── POSE 5: TENDER FOREHEAD KISS (KISS-FOREHEAD) ── */}
      {pose === 'kiss-forehead' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.09)" />

          {/* Gentle floating hearts */}
          <g className="animate-pulse">
            <path d="M140 26 C140 20 134 14 128 20 C122 26 122 34 140 46 C158 34 158 26 152 20 C146 14 140 20 140 26 Z" fill="#c62845" />
            <circle cx="110" cy="38" r="3" fill="#ff758f" />
            <circle cx="170" cy="38" r="3" fill="#ff758f" />
          </g>

          <g transform="translate(66, 52)">
            {/* Left partner (taller/leaning downward gently) */}
            <g transform="translate(4, 0)">
              <rect x="22" y="58" width="38" height="48" rx="15" fill="#c62845" />
              <rect x="26" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />
              <rect x="42" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />

              {/* Head tilted forward */}
              <ellipse cx="44" cy="30" rx="27" ry="25" fill="#3a1d1d" />
              <circle cx="46" cy="32" r="23" fill="#ffe3d8" />
              <path d="M22 26 C30 10 66 10 72 24 C60 28 50 21 44 24 C38 21 28 28 22 26 Z" fill="#3a1d1d" />

              {/* Affectionate closed eyes */}
              <path d="M40 33 Q44 29 48 33" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="38" cy="40" rx="5.5" ry="3.5" fill="#ff4d6d" opacity="0.75" />

              {/* Kissing lips touching partner's forehead */}
              <path d="M68 36 Q73 37 70 39" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Gentle hand on partner's shoulder */}
              <path d="M46 68 Q65 62 82 72" stroke="#c62845" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="84" cy="74" r="5.5" fill="#ffe3d8" />
            </g>

            {/* Sparkle of affection at forehead contact point */}
            <g transform="translate(74, 32)">
              <circle cx="4" cy="4" r="3" fill="#ff4d6d" />
              <path d="M4 -2 L4 10 M-2 4 L10 4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Right partner (eyes closed in peaceful bliss receiving forehead kiss) */}
            <g transform="translate(68, 12)">
              <rect x="18" y="52" width="38" height="46" rx="15" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
              <rect x="22" y="96" width="10" height="20" rx="5" fill="#5a1f2d" />
              <rect x="38" y="96" width="10" height="20" rx="5" fill="#5a1f2d" />

              {/* Head */}
              <ellipse cx="36" cy="30" rx="27" ry="25" fill="#4a2618" />
              <circle cx="34" cy="32" r="23" fill="#ffe3d8" />
              <path d="M14 22 C28 10 56 12 62 26 C54 28 46 22 36 24 C26 22 18 26 14 22 Z" fill="#4a2618" />

              {/* Peaceful closed eyes (crescent) */}
              <path d="M26 34 Q30 30 34 34" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M42 34 Q46 30 50 34" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Sweet blushing cheeks */}
              <ellipse cx="24" cy="40" rx="6" ry="4" fill="#ff4d6d" opacity="0.85" />
              <ellipse cx="50" cy="40" rx="6" ry="4" fill="#ff4d6d" opacity="0.85" />

              {/* Contented smile */}
              <path d="M33 42 Q37 47 41 42" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Hands resting on left partner's waist */}
              <circle cx="16" cy="68" r="5" fill="#ffe3d8" />
            </g>
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            A Tender Forehead Kiss 🌸💋
          </text>
        </svg>
      )}

      {/* ── POSE 6: SNUG CHEEK-TO-CHEEK CUDDLE (CHEEK-TO-CHEEK) ── */}
      {pose === 'cheek-to-cheek' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.11)" />

          {/* Floating celebratory love confetti & hearts */}
          <g className="animate-pulse">
            <path d="M140 24 C140 18 134 12 128 18 C122 24 122 32 140 44 C158 32 158 24 152 18 C146 12 140 18 140 24 Z" fill="#c62845" />
            <path d="M82 36 C82 32 78 28 74 32 C70 36 70 42 82 50 C94 42 94 36 90 32 C86 28 82 32 82 36 Z" fill="#ff758f" />
            <path d="M198 36 C198 32 194 28 190 32 C186 36 186 42 198 50 C210 42 210 36 206 32 C202 28 198 32 198 36 Z" fill="#ff758f" />
          </g>

          <g transform="translate(68, 52)">
            {/* Bodies squeezed together */}
            <rect x="20" y="60" width="38" height="46" rx="15" fill="#c62845" />
            <rect x="25" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />
            <rect x="40" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />

            <rect x="66" y="60" width="38" height="46" rx="15" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
            <rect x="72" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />
            <rect x="88" y="104" width="10" height="20" rx="5" fill="#5a1f2d" />

            {/* Left partner head tilting right to squish cheek */}
            <g transform="rotate(7 48 38)">
              <ellipse cx="44" cy="34" rx="27" ry="25" fill="#3a1d1d" />
              <circle cx="48" cy="36" r="23" fill="#ffe3d8" />
              <path d="M24 28 C32 12 68 12 74 26 C62 30 52 23 46 26 C40 23 30 30 24 28 Z" fill="#3a1d1d" />

              {/* Joyful closed eyes */}
              <path d="M38 34 Q42 29 46 34" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M54 34 Q58 29 62 34" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Big happy open smile */}
              <path d="M44 42 Q50 49 56 42 Z" fill="#c62845" />

              {/* Outside cheek blush */}
              <ellipse cx="36" cy="40" rx="6" ry="4" fill="#ff4d6d" opacity="0.85" />
            </g>

            {/* Right partner head tilting left to squish cheek */}
            <g transform="rotate(-7 78 38)">
              <ellipse cx="76" cy="34" rx="27" ry="25" fill="#4a2618" />
              <circle cx="72" cy="36" r="23" fill="#ffe3d8" />
              <path d="M48 24 C64 12 92 14 98 28 C90 30 82 25 72 26 C62 24 54 28 48 24 Z" fill="#4a2618" />

              <circle cx="94" cy="22" r="4.5" fill="#c62845" />

              {/* Joyful closed eyes */}
              <path d="M60 34 Q64 29 68 34" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M76 34 Q80 29 84 34" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Big happy open smile */}
              <path d="M66 42 Q72 49 78 42 Z" fill="#c62845" />

              {/* Outside cheek blush */}
              <ellipse cx="86" cy="40" rx="6" ry="4" fill="#ff4d6d" opacity="0.85" />
            </g>

            {/* SQUISHED SHARED CHEEK BLUSH in the center! */}
            <ellipse cx="61" cy="44" rx="8" ry="6" fill="#ff4d6d" opacity="0.9" />
            <path d="M61 41 C61 39 59 37 57 39 C55 41 55 43 61 47 C67 43 67 41 65 39 C63 37 61 39 61 41 Z" fill="#ffffff" />

            {/* Right partner making cute peace sign V */}
            <g transform="translate(100, 56)">
              <rect x="0" y="4" width="4" height="12" rx="2" fill="#ffe3d8" transform="rotate(-15 0 4)" />
              <rect x="5" y="4" width="4" height="12" rx="2" fill="#ffe3d8" transform="rotate(15 5 4)" />
              <circle cx="4" cy="16" r="5" fill="#ffe3d8" />
            </g>
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            Cheek to Cheek with My Cutie 🥰
          </text>
        </svg>
      )}

      {/* ── POSE 7: ROMANTIC BENCH ── */}
      {pose === 'bench' && (
        <svg
          width="280"
          height="220"
          viewBox="0 0 280 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-all duration-300"
        >
          <circle cx="140" cy="110" r="95" fill="rgba(255, 77, 109, 0.1)" />

          {/* Wooden Bench */}
          <g transform="translate(45, 140)">
            <rect x="0" y="0" width="190" height="8" rx="3" fill="#8c3a4f" />
            <rect x="5" y="12" width="180" height="7" rx="3" fill="#5a1f2d" />
            <rect x="25" y="16" width="7" height="28" rx="2" fill="#3a1d1d" />
            <rect x="158" y="16" width="7" height="28" rx="2" fill="#3a1d1d" />
          </g>

          {/* Cute Couple sitting on bench */}
          <g transform="translate(80, 72)">
            {/* Left partner */}
            <rect x="20" y="44" width="34" height="38" rx="12" fill="#c62845" />
            <ellipse cx="37" cy="24" rx="22" ry="20" fill="#3a1d1d" />
            <circle cx="37" cy="25" r="18" fill="#ffe3d8" />
            <path d="M20 20 C24 8 40 8 54 18 C46 20 38 18 20 20 Z" fill="#3a1d1d" />
            <circle cx="31" cy="23" r="2.5" fill="#2d1505" />
            <circle cx="43" cy="23" r="2.5" fill="#2d1505" />
            <ellipse cx="27" cy="28" rx="4" ry="2.5" fill="#ff4d6d" opacity="0.7" />
            <ellipse cx="47" cy="28" rx="4" ry="2.5" fill="#ff4d6d" opacity="0.7" />
            <path d="M34 28 Q37 32 40 28" stroke="#3a1d1d" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Right partner leaning head on left partner's shoulder */}
            <g transform="rotate(-12 75 35)">
              <rect x="58" y="44" width="34" height="38" rx="12" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
              <ellipse cx="75" cy="24" rx="22" ry="20" fill="#4a2618" />
              <circle cx="75" cy="25" r="18" fill="#ffe3d8" />
              <path d="M58 18 C64 8 84 8 92 20 C84 20 76 18 58 18 Z" fill="#4a2618" />
              <path d="M68 25 Q72 21 76 25" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />
              <ellipse cx="66" cy="29" rx="4" ry="2.5" fill="#ff4d6d" opacity="0.8" />
              <ellipse cx="84" cy="29" rx="4" ry="2.5" fill="#ff4d6d" opacity="0.8" />
              <path d="M72 29 Q75 33 78 29" stroke="#3a1d1d" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>

            {/* Shared red heart balloon tied to the bench */}
            <g transform="translate(105, -35)">
              <path d="M12 28 Q18 55 14 85" stroke="#ff4d6d" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
              <path d="M12 12 C12 6 6 0 0 6 C-6 12 -6 20 12 34 C30 20 30 12 24 6 C18 0 12 6 12 12 Z" fill="#c62845" />
            </g>
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            Side by Side, Now & Forever ❤️
          </text>
        </svg>
      )}

      {/* Tap hint badge */}
      {interactive && (
        <span className="text-[10px] font-semibold text-[#8c3a4f]/75 italic mt-1 group-hover:text-[#c62845] transition-colors flex items-center gap-1">
          <Heart className="w-3 h-3 fill-rose-300 group-hover:fill-[#c62845]" />
          <span>Tap couple to blush & send love</span>
        </span>
      )}
    </div>
  );
};
