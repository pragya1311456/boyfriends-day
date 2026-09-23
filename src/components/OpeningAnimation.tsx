import React, { useState, useEffect } from 'react';
import { TeddyBearSVG, RomanticCakeSVG } from './TeddyAndCake';
import { CoupleOpeningEncounter } from './CoupleOpeningEncounter';
import { romanticConfetti } from '../utils/confetti';
import { Heart, Sparkles } from 'lucide-react';

interface OpeningAnimationProps {
  openingMessage?: string;
  yourName?: string;
  partnerName?: string;
  onFinish: () => void;
  onBackToWebsite?: () => void;
}

type Step =
  | 'fade-in'         // Step 1: Background & Teddy walks in
  | 'cake-appear'     // Step 2: Cake appears, candle flickers, text shows
  | 'teddy-approach'  // Step 3: Teddy leans closer
  | 'teddy-blow'      // Step 4: Teddy puffs cheeks, wind lines blow
  | 'flame-out'       // Step 5: Flame reacts and extinguishes
  | 'popper-blast'    // Step 6: Party poppers blast confetti & hearts! "YAYYY! ❤️"
  | 'couple-running'  // Step 7: Couple runs in from both left & right!
  | 'couple-hug'      // Step 8: They embrace in a tight warm HUGGY! 🤗❤️
  | 'couple-kiss'     // Step 9: They lean in and KISS! 💋✨
  | 'celebration'     // Step 10: "This little story is just for you..."
  | 'transition-out'; // Step 11: Fade into envelope

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({
  openingMessage = 'Someone has a little surprise for you... ❤️',
  yourName = 'Maya',
  partnerName = 'Alex',
  onFinish,
  onBackToWebsite
}) => {
  const [step, setStep] = useState<Step>('fade-in');
  const [isCandleLit, setIsCandleLit] = useState(true);

  useEffect(() => {
    // Step 1: Teddy walks in (0s - 1.2s)
    const t1 = setTimeout(() => {
      setStep('cake-appear');
    }, 1200);

    // Step 2: Teddy approaches candle (1.2s - 2.6s)
    const t2 = setTimeout(() => {
      setStep('teddy-approach');
    }, 2600);

    // Step 3: Teddy starts blowing (2.6s - 3.6s)
    const t3 = setTimeout(() => {
      setStep('teddy-blow');
    }, 3600);

    // Step 4: Flame goes out (3.6s - 4.6s)
    const t4 = setTimeout(() => {
      setIsCandleLit(false);
      setStep('flame-out');
    }, 4600);

    // Step 5: Poppers blast immediately after candle goes out (4.9s)
    const t5 = setTimeout(() => {
      setStep('popper-blast');
      romanticConfetti.popperBlast();
    }, 4900);

    // Step 6: Couple runs in from left and right! (6.5s)
    const t6 = setTimeout(() => {
      setStep('couple-running');
    }, 6500);

    // Step 7: They meet in the middle and HUG! (8.5s)
    const t7 = setTimeout(() => {
      setStep('couple-hug');
      romanticConfetti.burstAt(window.innerWidth / 2, window.innerHeight / 2, 16);
    }, 8500);

    // Step 8: They lean in and KISS! (11.0s)
    const t8 = setTimeout(() => {
      setStep('couple-kiss');
    }, 11000);

    // Step 9: "This little story is just for you..." (13.8s)
    const t9 = setTimeout(() => {
      setStep('celebration');
    }, 13800);

    // Step 10: Transition to Envelope (16.0s)
    const t10 = setTimeout(() => {
      setStep('transition-out');
    }, 16000);

    const tFinal = setTimeout(() => {
      onFinish();
    }, 16700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(t9);
      clearTimeout(t10);
      clearTimeout(tFinal);
    };
  }, [onFinish]);

  const handleSkip = () => {
    onFinish();
  };

  const isBlowing = step === 'teddy-blow' || step === 'flame-out';
  const teddyCloser = step !== 'fade-in' && step !== 'cake-appear';
  const isCoupleActive =
    step === 'couple-running' ||
    step === 'couple-hug' ||
    step === 'couple-kiss' ||
    step === 'celebration';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-romantic-pattern transition-opacity duration-700 select-none overflow-hidden ${
        step === 'transition-out' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Return to Website Button */}
      {onBackToWebsite && (
        <button
          onClick={onBackToWebsite}
          className="absolute top-6 left-6 z-50 px-3.5 py-2 text-xs font-semibold text-[#8c3a4f] bg-white/90 hover:bg-white border border-[#c62845]/20 hover:border-[#c62845] rounded-full shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          aria-label="Back to website home"
        >
          <span>← Website Home</span>
        </button>
      )}

      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-4 py-2 text-xs font-semibold text-[#8c3a4f] bg-white/90 hover:bg-white border border-[#c62845]/20 hover:border-[#c62845] rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        aria-label="Skip animation and go directly to envelope"
      >
        <span>Skip Intro</span>
        <span aria-hidden="true">→</span>
      </button>

      {/* Floating background ambient hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-[12%] left-[10%] w-6 h-6 text-rose-300 fill-rose-300/40 animate-float-heart" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-[25%] right-[14%] w-8 h-8 text-[#ff758f] fill-[#ff758f]/30 animate-float-heart" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute bottom-[20%] left-[16%] w-5 h-5 text-rose-400 fill-rose-400/40 animate-float-heart" style={{ animationDelay: '0.6s' }} />
        <Heart className="absolute bottom-[28%] right-[20%] w-7 h-7 text-[#c62845] fill-[#c62845]/20 animate-float-heart" style={{ animationDelay: '1.8s' }} />
      </div>

      {/* Main Animated Stage */}
      <div className="relative flex flex-col items-center justify-center max-w-md w-full px-6 text-center">
        {/* Upper Announcement Text Banner */}
        <div className="min-h-[80px] flex items-center justify-center mb-4">
          {step === 'popper-blast' ? (
            <div className="animate-bounce">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#c62845] tracking-tight font-serif-romantic drop-shadow-sm flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-[#ff4d6d] fill-[#ff4d6d]" />
                <span>YAYYY! ❤️</span>
                <Sparkles className="w-8 h-8 text-[#ff4d6d] fill-[#ff4d6d]" />
              </h1>
            </div>
          ) : step === 'couple-running' ? (
            <div className="animate-fadeIn space-y-1">
              <p className="text-sm uppercase tracking-widest text-[#c62845] font-bold">
                Look who's running to meet you... 🏃‍♂️💨 🏃‍♀️💨
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5a1f2d] font-serif-romantic">
                {yourName} & {partnerName}
              </h2>
            </div>
          ) : step === 'couple-hug' ? (
            <div className="animate-scale-up space-y-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#c62845] font-serif-romantic flex items-center justify-center gap-2">
                <span>The Warmest Huggy!</span>
                <span className="text-3xl">🤗</span>
              </h2>
              <p className="text-sm font-semibold text-[#8c3a4f]">
                Holding you tight and never letting go... ❤️
              </p>
            </div>
          ) : step === 'couple-kiss' ? (
            <div className="animate-scale-up space-y-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#c62845] font-serif-romantic flex items-center justify-center gap-2">
                <span>And A Sweet Kiss!</span>
                <span className="text-3xl">💋</span>
              </h2>
              <p className="text-sm font-semibold text-[#8c3a4f]">
                Because you are my favorite person forever ✨
              </p>
            </div>
          ) : step === 'celebration' ? (
            <div className="transition-all duration-700 transform scale-105">
              <p className="text-xl sm:text-2xl font-semibold text-[#5a1f2d] font-serif-romantic">
                This little story is just for you... 💌
              </p>
            </div>
          ) : (
            <p className="text-lg sm:text-xl font-medium text-[#8c3a4f] transition-opacity duration-500 font-serif-romantic">
              {openingMessage}
            </p>
          )}
        </div>

        {/* ── STAGE CONTENT: TEDDY + CAKE (Steps 1 to 6) ── */}
        {!isCoupleActive && (
          <div className="relative w-full max-w-[320px] h-[250px] flex items-end justify-center transition-all duration-700">
            {/* Teddy Bear */}
            <div
              className={`absolute bottom-6 transition-all duration-700 ease-out z-10 ${
                step === 'fade-in'
                  ? 'left-[-40px] opacity-0 scale-90'
                  : teddyCloser
                  ? 'left-[22px] scale-100'
                  : 'left-[10px] scale-95 opacity-100'
              }`}
            >
              <TeddyBearSVG
                isWalking={step === 'fade-in'}
                isBlowing={isBlowing}
                scale={1}
              />
            </div>

            {/* Birthday/Love Cake */}
            <div
              className={`absolute bottom-0 right-4 z-20 transition-all duration-700 ${
                step === 'fade-in' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
              }`}
            >
              <RomanticCakeSVG isCandleLit={isCandleLit} />
            </div>

            {/* Left Party Popper Shooter (revealed during blast) */}
            <div
              className={`absolute -bottom-2 -left-10 z-30 transition-transform duration-500 origin-bottom-left ${
                step === 'popper-blast'
                  ? 'scale-100 translate-x-0 rotate-12'
                  : 'scale-0 -translate-x-12'
              }`}
            >
              <div className="w-16 h-20 bg-gradient-to-tr from-[#c62845] to-[#ff758f] rounded-t-xl rounded-bl-sm border-2 border-white shadow-lg flex items-center justify-center transform -rotate-45">
                <span className="text-2xl">🎉</span>
              </div>
            </div>

            {/* Right Party Popper Shooter */}
            <div
              className={`absolute -bottom-2 -right-10 z-30 transition-transform duration-500 origin-bottom-right ${
                step === 'popper-blast'
                  ? 'scale-100 translate-x-0 -rotate-12'
                  : 'scale-0 translate-x-12'
              }`}
            >
              <div className="w-16 h-20 bg-gradient-to-tl from-[#c62845] to-[#ff758f] rounded-t-xl rounded-br-sm border-2 border-white shadow-lg flex items-center justify-center transform rotate-45">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </div>
        )}

        {/* ── STAGE CONTENT: COUPLE RUNNING -> HUGGY -> KISS (Steps 7 to 10) ── */}
        {isCoupleActive && (
          <div className="relative w-full max-w-[360px] h-[260px] flex items-center justify-center transition-all duration-700">
            <CoupleOpeningEncounter
              yourName={yourName}
              partnerName={partnerName}
              stage={
                step === 'couple-running'
                  ? 'running'
                  : step === 'couple-hug'
                  ? 'hug'
                  : 'kiss'
              }
            />
          </div>
        )}

        {/* Bottom subtle guidance */}
        <p className="mt-6 text-xs text-[#8c3a4f]/70 italic">
          {step === 'teddy-blow'
            ? 'Make a wish with Teddy... 🕯️'
            : step === 'couple-running'
            ? 'Running with all their heart... 🏃‍♂️❤️🏃‍♀️'
            : step === 'couple-hug'
            ? 'A warm tight embrace... 🤗'
            : step === 'couple-kiss'
            ? 'Sealed with love... 💋'
            : 'Get ready for something special...'}
        </p>
      </div>
    </div>
  );
};
