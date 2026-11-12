import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const toastMessage = useGameStore(s => s.toastMessage);

  if (!toastMessage) return null;

  return (
    <div className="fixed top-12 sm:top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-3 w-full max-w-[480px] flex justify-center animate-bounceSubtle select-none">
      <div className="pointer-events-none bg-slate-900/95 backdrop-blur-md text-amber-200 px-4 py-1.5 rounded-full shadow-2xl text-xs sm:text-sm font-black border-2 border-amber-400/60 flex items-center gap-2 drop-shadow-xl ring-2 ring-black/40">
        <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 animate-pulse" />
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
};
