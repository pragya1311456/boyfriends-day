import React, { useState } from 'react';
import { romanticConfetti } from '../utils/confetti';
import { Heart, Sparkles } from 'lucide-react';

export type CouplePoseType = 'holding-hands' | 'hugging' | 'kiss' | 'bench';

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
      title={interactive ? 'Tap the couple to send love! ❤️' : undefined}
    >
      {/* Floating Interactive Hearts when tapped */}
      {isBlushingMore && (
        <div className="absolute -top-6 flex items-center gap-1.5 animate-bounce z-30 pointer-events-none">
          <Heart className="w-5 h-5 text-[#c62845] fill-[#c62845] animate-ping" />
          <span className="text-xs font-bold text-[#c62845] font-serif-romantic bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-rose-200">
            {personAName} & {personBName} ❤️
          </span>
          <Sparkles className="w-4 h-4 text-[#ff4d6d] fill-[#ff4d6d]" />
        </div>
      )}

      {/* POSE 1: HOLDING HANDS */}
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

          {/* --- LEFT PARTNER (Boy / Girl) --- */}
          <g transform="translate(60, 58)">
            {/* Hair back */}
            <ellipse cx="40" cy="35" rx="30" ry="26" fill="#3a1d1d" />

            {/* Body with cute Red Sweater */}
            <rect x="22" y="60" width="36" height="42" rx="14" fill="#c62845" />
            <circle cx="40" cy="74" r="5" fill="#ffffff" />

            {/* Little legs */}
            <rect x="26" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <rect x="44" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <ellipse cx="31" cy="119" rx="7" ry="4" fill="#ffffff" stroke="#c62845" />
            <ellipse cx="49" cy="119" rx="7" ry="4" fill="#ffffff" stroke="#c62845" />

            {/* Head */}
            <circle cx="40" cy="36" r="28" fill="#ffe3d8" />

            {/* Hair front */}
            <path d="M14 30 C18 14 36 10 60 14 C66 22 66 32 64 36 C52 25 32 24 14 30 Z" fill="#3a1d1d" />

            {/* Cute Eyes (Happy squint / smile) */}
            <circle cx="31" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="30" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="49" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="48" cy="33" r="1.2" fill="#ffffff" />

            {/* Rosy Blush */}
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

            {/* Cute Smile */}
            <path d="M36 40 Q40 46 44 40" stroke="#3a1d1d" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Left hand holding partner's hand */}
            <ellipse cx="62" cy="78" rx="6" ry="6" fill="#ffe3d8" />
          </g>

          {/* --- RIGHT PARTNER (Girl / Boy) --- */}
          <g transform="translate(140, 58)">
            {/* Long hair back */}
            <ellipse cx="40" cy="40" rx="32" ry="34" fill="#4a2618" />
            <path d="M12 36 Q8 75 22 85" stroke="#4a2618" strokeWidth="12" strokeLinecap="round" />
            <path d="M68 36 Q72 75 58 85" stroke="#4a2618" strokeWidth="12" strokeLinecap="round" />

            {/* Body with crisp White Coat & Red Scarf */}
            <rect x="22" y="60" width="36" height="42" rx="14" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
            <path d="M20 58 C26 54 54 54 60 58 C62 66 58 68 54 68 C44 68 36 68 26 68 Z" fill="#c62845" />
            <rect x="42" y="66" width="9" height="18" rx="4" fill="#c62845" />

            {/* Legs */}
            <rect x="26" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <rect x="44" y="98" width="10" height="22" rx="5" fill="#5a1f2d" />
            <ellipse cx="31" cy="119" rx="7" ry="4" fill="#c62845" />
            <ellipse cx="49" cy="119" rx="7" ry="4" fill="#c62845" />

            {/* Head */}
            <circle cx="40" cy="36" r="28" fill="#ffe3d8" />

            {/* Hair bangs */}
            <path d="M14 26 C26 12 54 12 66 26 C60 30 50 25 40 28 C30 25 20 30 14 26 Z" fill="#4a2618" />

            {/* Cute Hair bow */}
            <circle cx="62" cy="22" r="5" fill="#c62845" />
            <circle cx="62" cy="22" r="2" fill="#ffffff" />

            {/* Eyes */}
            <circle cx="31" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="30" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="49" cy="34" r="3.5" fill="#2d1505" />
            <circle cx="48" cy="33" r="1.2" fill="#ffffff" />

            {/* Rosy Blush */}
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

            {/* Smile */}
            <path d="M36 40 Q40 46 44 40" stroke="#3a1d1d" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Hand */}
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

      {/* POSE 2: WARM HUG / CUDDLE */}
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

          {/* Big floating heart above hug */}
          <g className="animate-pulse">
            <path d="M140 30 C140 22 130 16 124 24 C116 32 116 42 140 60 C164 42 164 32 156 24 C150 16 140 22 140 30 Z" fill="#c62845" />
            <circle cx="112" cy="45" r="3" fill="#ff758f" />
            <circle cx="168" cy="45" r="3" fill="#ff758f" />
          </g>

          {/* Couple closely hugging in center */}
          <g transform="translate(70, 56)">
            {/* Left partner body (Red sweater) */}
            <rect x="25" y="58" width="40" height="46" rx="16" fill="#c62845" />
            {/* Right partner body (White outfit) */}
            <rect x="65" y="58" width="40" height="46" rx="16" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />

            {/* Left partner head & dark hair */}
            <ellipse cx="48" cy="34" rx="26" ry="24" fill="#3a1d1d" />
            <circle cx="52" cy="36" r="23" fill="#ffe3d8" />
            <path d="M28 32 C34 16 54 14 74 24 C68 28 58 26 44 28 C34 26 28 32 28 32 Z" fill="#3a1d1d" />

            {/* Right partner head & long brown hair */}
            <ellipse cx="88" cy="34" rx="26" ry="24" fill="#4a2618" />
            <circle cx="84" cy="36" r="23" fill="#ffe3d8" />
            <path d="M62 24 C82 14 102 16 108 32 C108 32 102 26 92 28 C78 26 68 28 62 24 Z" fill="#4a2618" />

            {/* Happy closed eyes (^_^) */}
            <path d="M46 36 Q50 32 54 36" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M78 36 Q82 32 86 36" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Big blushing red cheeks */}
            <ellipse cx="42" cy="42" rx="6" ry="4" fill="#ff4d6d" opacity="0.8" />
            <ellipse cx="88" cy="42" rx="6" ry="4" fill="#ff4d6d" opacity="0.8" />

            {/* Sweet smiles */}
            <path d="M48 42 Q52 46 56 42" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M76 42 Q80 46 84 42" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Wrapping arms around each other */}
            {/* Left arm wrapping right partner */}
            <path d="M30 70 Q65 85 92 72" stroke="#a11c34" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="94" cy="71" r="6" fill="#ffe3d8" />

            {/* Right arm wrapping left partner */}
            <path d="M102 72 Q68 88 38 75" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="36" cy="74" r="6" fill="#ffe3d8" />

            {/* Legs */}
            <rect x="34" y="104" width="9" height="20" rx="4" fill="#5a1f2d" />
            <rect x="49" y="104" width="9" height="20" rx="4" fill="#5a1f2d" />
            <rect x="72" y="104" width="9" height="20" rx="4" fill="#5a1f2d" />
            <rect x="87" y="104" width="9" height="20" rx="4" fill="#5a1f2d" />
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            {personAName} & {personBName} in a Warm Hug ❤️
          </text>
        </svg>
      )}

      {/* POSE 3: FOREHEAD / SWEET KISS */}
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

          {/* Floating kiss hearts and sparkles */}
          <g className="animate-bounce">
            <path d="M136 28 C136 22 130 16 124 22 C118 28 118 36 136 50 C154 36 154 28 148 22 C142 16 136 22 136 28 Z" fill="#c62845" />
            <path d="M152 42 C152 38 148 34 144 38 C140 42 140 48 152 56 C164 48 164 42 160 38 C156 34 152 38 152 42 Z" fill="#ff4d6d" />
          </g>

          <g transform="translate(68, 56)">
            {/* Left partner leaning in for forehead kiss */}
            <g transform="rotate(8 45 50)">
              <ellipse cx="44" cy="34" rx="26" ry="24" fill="#3a1d1d" />
              <circle cx="48" cy="35" r="23" fill="#ffe3d8" />
              <path d="M26 30 C32 14 52 12 72 22 C66 26 56 24 42 26 C32 24 26 30 26 30 Z" fill="#3a1d1d" />

              {/* Gentle closed eyes */}
              <path d="M44 35 Q48 31 52 35" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Kissing lips leaning forward */}
              <path d="M66 38 Q71 39 68 41" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              <rect x="25" y="58" width="40" height="46" rx="16" fill="#c62845" />
            </g>

            {/* Right partner receiving sweet kiss with shy blush */}
            <g transform="translate(56, 4)">
              <ellipse cx="44" cy="34" rx="26" ry="24" fill="#4a2618" />
              <circle cx="42" cy="35" r="23" fill="#ffe3d8" />
              <path d="M22 22 C42 12 62 14 68 30 C68 30 62 24 52 26 C38 24 28 26 22 22 Z" fill="#4a2618" />

              {/* Happy shy closed eyes */}
              <path d="M34 36 Q38 32 42 36" stroke="#3a1d1d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Shy pink cheeks */}
              <ellipse cx="38" cy="42" rx="7" ry="5" fill="#ff4d6d" opacity="0.85" />
              <path d="M36 44 Q40 48 44 44" stroke="#3a1d1d" strokeWidth="2" strokeLinecap="round" fill="none" />

              <rect x="20" y="58" width="40" height="46" rx="16" fill="#ffffff" stroke="#c62845" strokeWidth="1.5" />
              {/* Hands gently held on chest */}
              <circle cx="28" cy="74" r="6" fill="#ffe3d8" />
            </g>
          </g>

          <text x="140" y="206" textAnchor="middle" fill="#c62845" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans">
            A Sweet Kiss for My Favorite Person 💋
          </text>
        </svg>
      )}

      {/* POSE 4: ROMANTIC BENCH */}
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
            {/* Bench slats */}
            <rect x="0" y="0" width="190" height="8" rx="3" fill="#8c3a4f" />
            <rect x="5" y="12" width="180" height="7" rx="3" fill="#5a1f2d" />
            {/* Legs */}
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
            {/* Happy eyes */}
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
              {/* Sleeping/blissful closed eyes */}
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
