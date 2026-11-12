import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const toastMessage = useGameStore(s => s.toastMessage);

  if (!toastMessage) return null;

  return (
    <div className="fixed top-28 sm:top-32 left-0 right-0 z-50 pointer-events-none flex justify-center items-center px-4 select-none">
      <div className="pointer-events-none bg-[#0b483e]/95 backdrop-blur-xs text-[#FAF7F2] px-4 py-2 rounded-full shadow-lg text-xs font-semibold border border-[#2fa896]/60 flex items-center gap-2 max-w-[90vw] sm:max-w-md animate-pop">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span className="truncate text-center">{toastMessage}</span>
      </div>
    </div>
  );
};
