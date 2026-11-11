import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const Toast: React.FC = () => {
  const toastMessage = useGameStore(s => s.toastMessage);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceSubtle">
      <div className="bg-slate-900/95 backdrop-blur-sm text-cream-50 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold border border-slate-700 flex items-center gap-2 max-w-sm">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
