import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({ isOpen, onClose }) => {
  const resetGame = useGameStore(s => s.resetGame);

  if (!isOpen) return null;

  const handleConfirm = () => {
    resetGame();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-sm w-full p-6 shadow-xl border border-rose-200 relative text-center">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-stone-900 mb-1">
          게임을 처음부터 다시 시작할까요?
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed mb-5">
          보드 아이템, 복원 시설, 코인, 별 등 모든 저장 데이터가 초기화됩니다. 이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
          >
            데이터 초기화
          </button>
        </div>
      </div>
    </div>
  );
};
