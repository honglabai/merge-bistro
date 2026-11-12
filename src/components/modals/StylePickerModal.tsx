import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Star } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const StylePickerModal: React.FC = () => {
  const {
    activeModal,
    pendingRestorationNode,
    confirmRestoration,
    stars
  } = useGameStore();

  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);

  if (activeModal !== 'restoration-picker' || !pendingRestorationNode) {
    return null;
  }

  const node = pendingRestorationNode;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-[#b89f82] relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-300/60">
              Chapter {node.chapter} · 인테리어 스타일 선택
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-stone-900 mt-1">
              {node.title}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              마음에 드는 스타일 1종을 선택해 시설을 완성하세요. (비용: {node.costStars} 별)
            </p>
          </div>
          <button
            onClick={() => useGameStore.setState({ activeModal: 'none', pendingRestorationNode: null })}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Styles Selection Grid */}
        <div className="space-y-2 mb-4">
          {node.styles.map((style, idx) => {
            const isSelected = selectedStyleIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedStyleIndex(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 shadow-2xs'
                    : 'bg-white border-[#e5ded3] hover:border-[#d6cbbe]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#e5ded3] flex items-center justify-center text-xl flex-shrink-0">
                    {style.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-900">
                        {style.name}
                      </h4>
                      <span className="text-[10px] text-stone-500 font-medium">
                        ({style.theme})
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {style.description}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-3 border-t border-[#e5ded3]">
          <div className="text-xs text-stone-500 flex items-center gap-1 tabular-nums">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>보유 별: <strong className="text-amber-800 font-semibold">{stars}</strong></span>
          </div>
          <button
            onClick={() => confirmRestoration(node.id, selectedStyleIndex)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 active:scale-95 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>선택 스타일로 복원 확정</span>
          </button>
        </div>

      </div>
    </div>
  );
};
