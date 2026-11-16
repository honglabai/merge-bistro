import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sounds } from '../../utils/soundSynthesizer';
import confetti from 'canvas-confetti';

interface LevelUpModalProps {
  onOpenMyPage?: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ onOpenMyPage }) => {
  const pendingLevelUp = useGameStore(s => s.pendingLevelUp);
  const dismissLevelUpModal = useGameStore(s => s.dismissLevelUpModal);

  useEffect(() => {
    if (pendingLevelUp) {
      sounds.playRestorationFanfare();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.4 }
      });
    }
  }, [pendingLevelUp]);

  if (!pendingLevelUp) return null;

  const handleGoToGrowthCenter = () => {
    sounds.playTapSound();
    dismissLevelUpModal();
    if (onOpenMyPage) {
      onOpenMyPage();
    }
  };

  const handleContinueCooking = () => {
    sounds.playTapSound();
    dismissLevelUpModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={handleContinueCooking}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative w-full max-w-[390px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/80 bg-gradient-to-b from-[#2d1b11] via-[#1f140e] to-[#120a06] text-white p-5 flex flex-col items-center text-center z-10"
        >
          {/* Radial Glowing Backdrop Effect */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Crown & Level Badge */}
          <div className="relative mb-2 mt-1">
            <motion.div
              animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 p-1 shadow-lg shadow-amber-500/40 flex items-center justify-center mx-auto"
            >
              <div className="w-full h-full rounded-full bg-[#27150c] flex items-center justify-center text-3xl">
                {pendingLevelUp.newTier?.badge || '👑'}
              </div>
            </motion.div>
            <div className="absolute -bottom-1 -right-1 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full border border-rose-300 shadow">
              UP!
            </div>
          </div>

          {/* Celebratory Title */}
          <h2 className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 drop-shadow-sm mb-0.5">
            LEVEL UP!
          </h2>
          <p className="text-amber-200/80 text-xs font-medium mb-3">
            비스트로 명성이 드높아져 셰프가 한 단계 더 성장했습니다!
          </p>

          {/* Level Transition Pill */}
          <div className="flex items-center justify-center gap-3 bg-black/40 border border-amber-500/40 rounded-2xl px-5 py-2 mb-3 shadow-inner">
            <div className="text-xs text-stone-400 font-bold">
              Lv.<span className="text-stone-300 text-sm ml-0.5">{pendingLevelUp.oldLevel}</span>
            </div>
            <div className="text-amber-400 font-black text-sm">➔</div>
            <div className="text-sm font-black text-amber-300 flex items-center gap-1">
              <span>Lv.</span>
              <span className="text-xl text-yellow-300">{pendingLevelUp.newLevel}</span>
            </div>
          </div>

          {/* Evolution Tier Up Banner (if applicable) */}
          {pendingLevelUp.newTier && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-gradient-to-r from-amber-600/30 via-orange-600/30 to-amber-600/30 border border-amber-400/60 rounded-2xl p-2.5 mb-3 text-left shadow-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{pendingLevelUp.newTier.badge}</span>
                <div>
                  <div className="text-[10px] text-amber-300 font-extrabold tracking-wider">🌟 셰프 승급 달성!</div>
                  <div className="text-xs font-black text-white">{pendingLevelUp.newTier.name}</div>
                </div>
              </div>
              <p className="text-[11px] text-stone-200 font-medium leading-relaxed bg-black/30 p-1.5 rounded-lg border border-amber-500/20">
                ✨ <strong className="text-amber-300">패시브 보너스:</strong> {pendingLevelUp.newTier.passiveBonus}
              </p>
            </motion.div>
          )}

          {/* Milestone Perk (if applicable) */}
          {pendingLevelUp.milestone && (
            <div className="w-full bg-purple-900/40 border border-purple-400/50 rounded-2xl p-2.5 mb-3 text-left">
              <div className="flex items-center gap-1.5 text-purple-300 text-xs font-bold mb-0.5">
                <span>{pendingLevelUp.milestone.icon}</span>
                <span>마일스톤 달성: {pendingLevelUp.milestone.title}</span>
              </div>
              <p className="text-[11px] text-purple-100 font-medium leading-relaxed">
                🎁 {pendingLevelUp.milestone.bonusPerk}
              </p>
            </div>
          )}

          {/* Rewards List */}
          <div className="w-full bg-black/30 border border-stone-800 rounded-2xl p-3 mb-4 space-y-1.5 text-left">
            <div className="text-[11px] font-bold text-stone-400 mb-1 px-1">🎁 레벨업 보상 획득 목록</div>
            
            {/* Stat Points */}
            <div className="flex items-center justify-between bg-stone-900/60 rounded-xl px-2.5 py-1.5 border border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="text-base">✨</span>
                <span className="text-xs font-bold text-stone-200">스탯 분배 포인트</span>
              </div>
              <span className="text-xs font-black text-amber-400">+{pendingLevelUp.statPointsGained} PT</span>
            </div>

            {/* Energy Refill */}
            <div className="flex items-center justify-between bg-stone-900/60 rounded-xl px-2.5 py-1.5 border border-sky-500/30">
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <span className="text-xs font-bold text-stone-200">에너지 완충 + 50 보너스</span>
              </div>
              <span className="text-xs font-black text-sky-400">{pendingLevelUp.energyRefilled}⚡ 충전</span>
            </div>

            {/* Coins & Gems */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="flex items-center justify-between bg-stone-900/60 rounded-xl px-2.5 py-1.5 border border-yellow-500/30">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🪙</span>
                  <span className="text-[11px] font-bold text-stone-200">골드</span>
                </div>
                <span className="text-xs font-black text-yellow-400">+{pendingLevelUp.rewardCoins}</span>
              </div>
              <div className="flex items-center justify-between bg-stone-900/60 rounded-xl px-2.5 py-1.5 border border-pink-500/30">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">💎</span>
                  <span className="text-[11px] font-bold text-stone-200">보석</span>
                </div>
                <span className="text-xs font-black text-pink-400">+{pendingLevelUp.rewardGems}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2">
            <button
              onClick={handleGoToGrowthCenter}
              className="w-full py-2.5 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:brightness-110 active:scale-98 text-stone-950 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-1.5"
            >
              <span>✨</span>
              <span>스탯 포인트 분배하러 가기</span>
            </button>
            <button
              onClick={handleContinueCooking}
              className="w-full py-2 px-4 rounded-xl font-bold text-xs bg-stone-800 hover:bg-stone-700 active:scale-98 text-stone-300 border border-stone-700 transition-all"
            >
              계속 요리하기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
