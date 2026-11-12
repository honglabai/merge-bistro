import React from 'react';
import { X, Sparkles, Zap, Lock, Star, HelpCircle } from 'lucide-react';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in select-none">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-xl border border-[#b89f82] relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-[#e5ded3]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-700" />
            <h3 className="text-sm sm:text-base font-semibold text-stone-900">
              머지 비스트로 플레이 가이드
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto py-3 space-y-3 text-xs text-stone-700 pr-1 no-scrollbar">
          
          <div className="p-3 bg-white rounded-xl border border-[#e5ded3]">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. 생성기 탭 & 에너지 관리</span>
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              보드 중앙의 <strong>화덕, 에스프레소 머신, 쇼케이스, 과일 바구니</strong> 등 생성기 타일을 클릭하면 에너지를 소모해 기본 재료가 스폰됩니다.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#e5ded3]">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>2. 동일 아이템 합성 진화</span>
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              <strong>같은 종류, 같은 레벨</strong>의 아이템을 서로 드래그하면 합쳐져 레벨이 1단계 상승합니다. 최고 레벨의 시그니처 메뉴까지 완성해보세요.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#e5ded3]">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
              <Lock className="w-4 h-4 text-stone-600" />
              <span>3. 거미줄 & 잠긴 타일 해금</span>
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              거미줄에 묶인 아이템은 동일한 자유 아이템과 합성하면 풀려납니다. 인접한 공간에서 합성을 진행하여 보드 타일을 확장해보세요.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#e5ded3]">
            <h4 className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>4. 손님 주문 납품 & 시설 복원</span>
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              손님들이 주문한 메뉴를 완성해 납품하면 코인과 별을 얻습니다. 별을 모아 비스트로 테라스와 주방 시설을 복원해보세요.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#e5ded3] text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            확인 및 게임 즐기기
          </button>
        </div>

      </div>
    </div>
  );
};
