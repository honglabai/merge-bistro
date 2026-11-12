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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-[#b89f82] relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeDialogue}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-black/5 hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Character Portrait & Dialog Box */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-3xl sm:text-4xl shadow-2xs flex-shrink-0">
            {current.avatar}
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-300/60">
              스토리 진행 ({dialogueIndex + 1}/{currentDialogue.length})
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-stone-900 mt-1">
              {current.speaker}
            </h3>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="bg-white p-4 rounded-xl border border-[#e5ded3] text-stone-800 text-xs sm:text-sm leading-relaxed mb-4 shadow-2xs min-h-[80px] flex items-center">
          <p className="font-normal text-stone-700">{current.text}</p>
        </div>

        {/* Next / Close Button */}
        <div className="flex justify-end">
          <button
            onClick={nextDialogue}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 active:scale-95 transition-colors"
          >
            <span>{isLast ? '대화 완료' : '다음'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
