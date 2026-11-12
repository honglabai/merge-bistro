import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const DialogueModal: React.FC = () => {
  const {
    activeModal,
    currentDialogue,
    dialogueIndex,
    nextDialogue,
    closeDialogue
  } = useGameStore();

  if (activeModal !== 'dialogue' || !currentDialogue || currentDialogue.length === 0) {
    return null;
  }

  const current = currentDialogue[dialogueIndex];
  const isLast = dialogueIndex + 1 === currentDialogue.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-4 border-wood-600 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeDialogue}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-cream-100 hover:bg-cream-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Character Portrait & Dialog Box */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400 flex items-center justify-center text-4xl sm:text-5xl shadow-md flex-shrink-0 animate-bounceSubtle">
            {current.avatar}
          </div>
          <div className="flex-1">
            <span className="text-xs font-black text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-full border border-terracotta-200">
              스토리 진행 대화 ({dialogueIndex + 1}/{currentDialogue.length})
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
              {current.speaker}
            </h3>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="bg-cream-50 p-4 rounded-2xl border border-cream-300 text-slate-800 text-sm sm:text-base leading-relaxed mb-4 shadow-inner min-h-[90px] flex items-center">
          <p className="font-medium">{current.text}</p>
        </div>

        {/* Next / Close Button */}
        <div className="flex justify-end">
          <button
            onClick={nextDialogue}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-amber-600 hover:to-terracotta-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all"
          >
            <span>{isLast ? '대화 종료 및 보상 확인' : '다음 이야기'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
