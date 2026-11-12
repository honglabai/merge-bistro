import React from 'react';
import { X, Sparkles, Zap, Lock, Star, HelpCircle } from 'lucide-react';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border-4 border-wood-600 relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-terracotta-500" />
            <h3 className="text-base font-extrabold text-slate-900">
              머지 비스트로 플레이 가이드
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-cream-100 hover:bg-cream-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto py-3 space-y-3.5 text-xs text-slate-700 pr-1">
          
          <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-300">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. 생성기 탭 & 에너지 관리</span>
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              보드 중앙의 <strong>밀가루 포대, 커피 머신, 씨앗 주머니</strong> 등 생성기 타일을 클릭하면 에너지를 소모해 기본 재료가 스폰됩니다. 슈퍼차지(1x, 2x, 4x)를 켜면 에너지를 더 소모하여 2~3레벨 상위 아이템을 바로 생산할 수 있습니다!
            </p>
          </div>

          <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-300">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              <span>2. 2개 합성 & 상위 레벨 진화</span>
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>같은 체인, 같은 레벨</strong>의 아이템을 서로 드래그하거나 순서대로 클릭하면 합쳐져 레벨이 1단계 상승합니다! 최고 11레벨의 전설적인 시그니처 요리까지 완성해보세요.
            </p>
          </div>

          <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-300">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
              <Lock className="w-4 h-4 text-wood-600" />
              <span>3. 거미줄 & 상자 연쇄 해금</span>
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              거미줄(🕸️)에 묶인 아이템은 동일한 자유 아이템을 합성하면 해제됩니다. 또한 아이템이 합성될 때마다 인접한 잠긴 상자(🔒)들이 흔들리며 잠금이 연쇄적으로 풀려 보드 공간이 넓어집니다!
            </p>
          </div>

          <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-300">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
              <Star className="w-4 h-4 text-amber-500" />
              <span>4. 손님 주문 서빙 & 식당 복구</span>
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              마을 동물 손님들이 주문한 요리를 완성하면 <strong>코인(🪙)</strong>과 <strong>별(⭐)</strong>을 얻습니다. 별을 모아 폭풍우로 무너진 테라스, 화덕 오븐, 온실 텃밭, 고대 유적을 7단계로 복구하고 실종된 사장님을 구출하세요!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-cream-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-terracotta-500 text-white font-black text-xs shadow-md"
          >
            확인 및 게임 즐기기
          </button>
        </div>

      </div>
    </div>
  );
};
