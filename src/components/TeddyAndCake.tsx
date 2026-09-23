import React from 'react';

interface TeddyProps {
  isWalking?: boolean;
  isBlowing?: boolean;
  scale?: number;
}

export const TeddyBearSVG: React.FC<TeddyProps> = ({ isWalking, isBlowing, scale = 1 }) => {
  return (
    <div
      className={`relative inline-block transition-transform duration-700 select-none ${
        isWalking ? 'animate-bounce' : 'animate-teddy-breathe'
      }`}
      style={{ transform: `scale(${scale})` }}
    >
      <svg
        width="180"
        height="210"
        viewBox="0 0 180 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        {/* Left Ear */}
        <circle cx="46" cy="46" r="26" fill="#b06c4b" />
        <circle cx="46" cy="46" r="16" fill="#f4a261" />
        <circle cx="48" cy="46" r="8" fill="#ffd166" opacity="0.6" />

        {/* Right Ear */}
        <circle cx="134" cy="46" r="26" fill="#b06c4b" />
        <circle cx="134" cy="46" r="16" fill="#f4a261" />
        <circle cx="132" cy="46" r="8" fill="#ffd166" opacity="0.6" />

        {/* Body */}
        <ellipse cx="90" cy="142" rx="55" ry="50" fill="#b06c4b" />
        {/* Tummy patch */}
        <ellipse cx="90" cy="146" rx="38" ry="34" fill="#ffd8be" />
        {/* Cute heart on tummy */}
        <path
          d="M90 148 C90 144 84 140 80 144 C76 148 76 154 90 164 C104 154 104 148 100 144 C96 140 90 144 90 148 Z"
          fill="#c62845"
        />

        {/* Left Arm */}
        <ellipse cx="38" cy="136" rx="18" ry="28" fill="#a05d3d" transform="rotate(18 38 136)" />
        {/* Right Arm (slightly extended forward if blowing) */}
        <ellipse
          cx={isBlowing ? 144 : 142}
          cy={isBlowing ? 130 : 136}
          rx="18"
          ry="28"
          fill="#a05d3d"
          transform={isBlowing ? "rotate(-32 144 130)" : "rotate(-18 142 136)"}
        />

        {/* Left Foot */}
        <ellipse cx="62" cy="188" rx="20" ry="14" fill="#8f4f32" />
        <ellipse cx="62" cy="188" rx="12" ry="8" fill="#ffd8be" />

        {/* Right Foot */}
        <ellipse cx="118" cy="188" rx="20" ry="14" fill="#8f4f32" />
        <ellipse cx="118" cy="188" rx="12" ry="8" fill="#ffd8be" />

        {/* Head */}
        <circle cx="90" cy="80" r="48" fill="#b06c4b" />

        {/* Snout/Muzzle */}
        <ellipse cx="90" cy="94" rx="24" ry="18" fill="#ffd8be" />
        {/* Nose */}
        <ellipse cx="90" cy="86" rx="9" ry="6" fill="#4a2810" />
        <ellipse cx="88" cy="85" rx="3" ry="1.5" fill="#ffffff" opacity="0.8" />

        {/* Mouth */}
        {isBlowing ? (
          /* Pouted little blowing mouth */
          <ellipse cx="90" cy="99" rx="5" ry="6" fill="#4a2810" />
        ) : (
          /* Cute smiling mouth */
          <path
            d="M84 94 Q90 102 96 94"
            stroke="#4a2810"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Eyes with sparkle */}
        {isBlowing ? (
          /* Happy squinted / focused eyes */
          <>
            <path d="M68 74 Q74 68 80 74" stroke="#331805" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M100 74 Q106 68 112 74" stroke="#331805" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          /* Big round cute eyes */
          <>
            <circle cx="73" cy="73" r="6.5" fill="#2d1505" />
            <circle cx="71" cy="71" r="2.5" fill="#ffffff" />
            <circle cx="107" cy="73" r="6.5" fill="#2d1505" />
            <circle cx="105" cy="71" r="2.5" fill="#ffffff" />
          </>
        )}

        {/* Rosy Blushing Cheeks */}
        <ellipse
          cx="62"
          cy="87"
          rx={isBlowing ? "11" : "8"}
          ry={isBlowing ? "9" : "6"}
          fill="#ff4d6d"
          opacity={isBlowing ? "0.85" : "0.55"}
        />
        <ellipse
          cx="118"
          cy="87"
          rx={isBlowing ? "11" : "8"}
          ry={isBlowing ? "9" : "6"}
          fill="#ff4d6d"
          opacity={isBlowing ? "0.85" : "0.55"}
        />

        {/* Red Bow Tie on Neck */}
        <g transform="translate(90, 114)">
          <polygon points="-12,-6 -12,6 0,0" fill="#c62845" />
          <polygon points="12,-6 12,6 0,0" fill="#c62845" />
          <circle cx="0" cy="0" r="4.5" fill="#e63946" />
        </g>
      </svg>

      {/* Cute blowing wind streaks if blowing */}
      {isBlowing && (
        <div className="absolute right-[-24px] top-[74px] pointer-events-none">
          <div className="w-8 h-1 bg-white/80 rounded-full animate-wind mb-1" />
          <div className="w-12 h-1 bg-white/70 rounded-full animate-wind ml-2 mb-1" style={{ animationDelay: '0.15s' }} />
          <div className="w-6 h-1 bg-white/80 rounded-full animate-wind ml-1" style={{ animationDelay: '0.3s' }} />
        </div>
      )}
    </div>
  );
};

interface CakeProps {
  isCandleLit: boolean;
}

export const RomanticCakeSVG: React.FC<CakeProps> = ({ isCandleLit }) => {
  return (
    <div className="relative inline-block select-none filter drop-shadow-lg">
      <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cake Stand / Plate */}
        <ellipse cx="75" cy="116" rx="66" ry="12" fill="#ffffff" stroke="#c62845" strokeWidth="2" />
        <ellipse cx="75" cy="118" rx="42" ry="6" fill="rgba(198, 40, 69, 0.15)" />

        {/* Bottom Cake Tier (Red & White Cream) */}
        <rect x="25" y="74" width="100" height="38" rx="8" fill="#ffffff" stroke="#e63946" strokeWidth="1.5" />
        {/* Red frosting drip border */}
        <path
          d="M25 84 C32 94 40 80 48 90 C56 80 64 92 72 82 C80 92 88 80 96 90 C104 80 114 92 125 82 L125 74 L25 74 Z"
          fill="#c62845"
        />
        {/* Little Heart decorations on tier */}
        <path
          d="M50 99 C50 96 46 93 43 96 C40 99 40 103 50 110 C60 103 60 99 57 96 C54 93 50 96 50 99 Z"
          fill="#c62845"
        />
        <path
          d="M75 99 C75 96 71 93 68 96 C65 99 65 103 75 110 C85 103 85 99 82 96 C79 93 75 96 75 99 Z"
          fill="#c62845"
        />
        <path
          d="M100 99 C100 96 96 93 93 96 C90 99 90 103 100 110 C110 103 110 99 107 96 C104 93 100 96 100 99 Z"
          fill="#c62845"
        />

        {/* White Cream Top Surface */}
        <ellipse cx="75" cy="74" rx="50" ry="12" fill="#fff5f7" stroke="#e63946" strokeWidth="1.5" />

        {/* Whipped Cream dollops */}
        <circle cx="40" cy="72" r="5" fill="#ffffff" stroke="#c62845" strokeWidth="1" />
        <circle cx="58" cy="76" r="5" fill="#ffffff" stroke="#c62845" strokeWidth="1" />
        <circle cx="92" cy="76" r="5" fill="#ffffff" stroke="#c62845" strokeWidth="1" />
        <circle cx="110" cy="72" r="5" fill="#ffffff" stroke="#c62845" strokeWidth="1" />

        {/* Center Candle */}
        <rect x="72" y="38" width="6" height="32" rx="2" fill="#c62845" />
        {/* White spiral stripe on candle */}
        <line x1="72" y1="44" x2="78" y2="48" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="72" y1="54" x2="78" y2="58" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="72" y1="64" x2="78" y2="68" stroke="#ffffff" strokeWidth="1.5" />

        {/* Candle Wick */}
        <line x1="75" y1="38" x2="75" y2="33" stroke="#4a2810" strokeWidth="1.5" />

        {/* Flickering Flame or Extinguished Smoke */}
        {isCandleLit ? (
          <g className="animate-flame origin-bottom">
            {/* Outer golden glow */}
            <ellipse cx="75" cy="22" rx="7" ry="12" fill="#ff7b00" />
            {/* Inner bright yellow core */}
            <ellipse cx="75" cy="24" rx="4" ry="8" fill="#ffee55" />
            {/* White hot center */}
            <ellipse cx="75" cy="26" rx="2" ry="4" fill="#ffffff" />
          </g>
        ) : (
          /* Smoke puff after candle is blown out */
          <g className="transition-opacity duration-500">
            <circle cx="75" cy="28" r="4" fill="#8c3a4f" opacity="0.5" className="animate-ping" />
            <path
              d="M75 32 Q71 25 78 18 Q84 12 76 6"
              stroke="#8c3a4f"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 2"
              fill="none"
              opacity="0.6"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
