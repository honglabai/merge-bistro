import React, { useState } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-4 border-wood-600 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-black text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-full border border-terracotta-200">
              Chapter {node.chapter} · 인테리어 디자인 선택
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
              {node.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              마음에 드는 스타일 1종을 선택해 시설을 완성하세요. (비용: {node.costStars}⭐)
            </p>
          </div>
          <button
            onClick={() => useGameStore.setState({ activeModal: 'none', pendingRestorationNode: null })}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-cream-100 hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Styles Selection Grid */}
        <div className="space-y-2.5 mb-5">
          {node.styles.map((style, idx) => {
            const isSelected = selectedStyleIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedStyleIndex(idx)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-300'
                    : 'bg-cream-50/60 border-cream-200 hover:border-cream-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-cream-300 flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                    {style.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        {style.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        ({style.theme})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {style.description}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-2 border-t border-cream-200">
          <div className="text-xs text-slate-500">
            보유 별: <strong className="text-amber-600 font-black">{stars}⭐</strong>
          </div>
          <button
            onClick={() => confirmRestoration(node.id, selectedStyleIndex)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-amber-600 hover:to-terracotta-600 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>선택한 스타일로 복원 확정</span>
          </button>
        </div>

      </div>
    </div>
  );
};
