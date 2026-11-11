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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-rose-300 relative text-center">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-base font-black text-slate-900 mb-1">
          게임을 처음부터 다시 시작할까요?
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-5">
          보드 아이템, 복원 시설, 코인, 별 등 모든 저장 데이터가 초기 상태로 초기화됩니다. 이 작업은 되돌릴 수 없습니다!
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-cream-100 hover:bg-cream-200 text-slate-700 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="py-2.5 px-4 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors"
          >
            데이터 초기화
          </button>
        </div>
      </div>
    </div>
  );
};
