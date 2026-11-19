import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, ChevronRight, X } from 'lucide-react';
import { sounds } from '../../utils/soundSynthesizer';

interface GameTitleLandingScreenProps {
  isOpen: boolean;
  onStart: () => void;
}

export const GameTitleLandingScreen: React.FC<GameTitleLandingScreenProps> = ({
  isOpen,
  onStart
}) => {
  if (!isOpen) return null;

  const handleStartGame = () => {
    // Unlocks browser audio context with tap
    try {
      sounds.playOrderComplete();
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
    } catch {
      // Audio fallback safe guard
    }
    onStart();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="title-landing-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.35, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none touch-manipulation"
      >
        {/* Universal Mobile Container (Max 480px) */}
        <div className="relative w-full max-w-[480px] h-[100dvh] overflow-hidden flex flex-col justify-between shadow-2xl mx-auto">
          
          {/* High-Resolution Mobile Landing Cover Artwork (WebP + JPG fallback) */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none">
            <source srcSet="/landing-cover.webp" type="image/webp" />
            <img
              src="/landing-cover.jpg"
              alt="머지 비스트로: 유적의 비밀 (Merge Bistro: Mystery of the Ruins)"
              width={720}
              height={1280}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center filter brightness-[1.02]"
            />
          </picture>

          {/* Top Skip / Close Quick Button */}
          <div className="relative z-20 flex justify-end p-3 pt-[max(0.75rem,env(safe-area-inset-top,0.75rem))]">
            <button
              onClick={handleStartGame}
              className="px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 text-amber-100 text-[11px] font-black backdrop-blur-xs border border-white/20 shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              title="게임 바로 시작"
            >
              <span>바로 시작</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>

          {/* Entire Screen Tap Trigger Area */}
          <div
            onClick={handleStartGame}
            className="flex-1 w-full relative z-10 cursor-pointer"
            aria-label="화면을 터치하여 게임 시작"
          />

          {/* Bottom Interactive Start Button Overlay */}
          <div className="relative z-20 w-full px-4 pb-[max(2rem,env(safe-area-inset-bottom,2.5rem))] flex flex-col items-center">
            
            <motion.button
              onClick={handleStartGame}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(245, 158, 11, 0.4)',
                  '0 0 28px rgba(245, 158, 11, 0.8)',
                  '0 0 15px rgba(245, 158, 11, 0.4)'
                ]
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }
              }}
              className="w-full max-w-[420px] py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-base sm:text-lg border-2 border-amber-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Play className="w-5 h-5 fill-white stroke-none" />
              <span>터치하여 비스트로 오픈하기</span>
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
            </motion.button>

            <p className="text-[11px] font-bold text-amber-200/90 text-center mt-2.5 drop-shadow-md flex items-center gap-1">
              <span>화면 아무 곳이나 터치해도 게임이 시작됩니다</span>
            </p>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
