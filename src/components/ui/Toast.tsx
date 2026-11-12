import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const toastMessage = useGameStore(s => s.toastMessage);

  if (!toastMessage) return null;

  return (
    <div className="fixed top-28 sm:top-32 left-0 right-0 z-50 pointer-events-none flex justify-center items-center px-4 select-none">
      <div className="pointer-events-none bg-slate-900/95 backdrop-blur-md text-amber-200 px-4 sm:px-5 py-2 rounded-full shadow-2xl text-xs sm:text-sm font-bold border-2 border-amber-400/80 flex items-center gap-2 drop-shadow-xl ring-2 ring-black/40 max-w-[92vw] sm:max-w-md animate-pop">
        <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
        <span className="truncate text-center">{toastMessage}</span>
      </div>
    </div>
  );
};
