import React, { useEffect, useState } from 'react';
import { Zap, ShoppingCart, Volume2, VolumeX, RotateCcw, Gamepad2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sounds } from '../../utils/soundSynthesizer';

interface ResourceHeaderProps {
  currentTab?: 'game' | 'restoration' | 'cookstagram' | 'math';
  onToggleRestoration?: () => void;
  onOpenMyPage?: () => void;
  onOpenHelp?: () => void;
  onOpenResetConfirm: () => void;
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  currentTab = 'game',
  onToggleRestoration,
  onOpenMyPage,
  onOpenHelp,
  onOpenResetConfirm
}) => {
  const {
    energy,
    maxEnergy,
    coins,
    gems,
    stars,
    restorations,
    freeEnergyRefill,
    rechargeEnergyTick
  } = useGameStore();

  const nextRestorationNode = restorations.find(r => !r.isRestored);
  const canRestore = nextRestorationNode && stars >= nextRestorationNode.costStars;

  const [soundOn, setSoundOn] = useState(sounds.enabled);
  const [secondsUntilRecharge, setSecondsUntilRecharge] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      rechargeEnergyTick();
      const state = useGameStore.getState();
      if (state.energy < state.maxEnergy) {
        const elapsed = Math.floor((Date.now() - state.lastEnergyRecharge) / 1000);
        setSecondsUntilRecharge(Math.max(0, 60 - (elapsed % 60)));
      } else {
        setSecondsUntilRecharge(60);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [rechargeEnergyTick]);

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
  };

  const timerText = `${Math.floor(secondsUntilRecharge / 60)
    .toString()
    .padStart(2, '0')}:${(secondsUntilRecharge % 60).toString().padStart(2, '0')}`;

  return (
    <header className="bg-gradient-to-b from-[#1b5853] via-[#104e49] to-[#0c433e] text-white px-1.5 sm:px-3 pt-[max(8px,env(safe-area-inset-top,8px))] pb-2 select-none border-b border-[#1b6b63]/60 shadow-md">
      <div className="max-w-[500px] mx-auto flex items-center justify-between gap-1 sm:gap-2">
        
        {/* Top-Left: Map / Town Restoration Button (Swapped from Bottom-Right) */}
        <button
          onClick={onToggleRestoration}
          title={currentTab === 'restoration' ? '머지 보드로 복귀' : '식당 & 유적 복원 맵으로 이동'}
          className="relative w-10 h-10 sm:w-11 sm:h-11 p-0 bg-transparent border-0 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 cursor-pointer drop-shadow-md"
        >
          {currentTab === 'restoration' ? (
            <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-500 to-orange-600 border-2 border-white shadow-md flex flex-col items-center justify-center text-white">
              <Gamepad2 className="w-5 h-5 drop-shadow" />
              <span className="text-[8px] font-black -mt-0.5 tracking-tighter">보드</span>
            </div>
          ) : (
            <>
              <img
                src="/extracted/btn_map_clean.png"
                alt="Map"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
              {/* Notification ping badge if restoration is ready */}
              {canRestore && (
                <div className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[8px] px-1 py-0.2 rounded-full flex items-center justify-center border border-white shadow animate-bounce">
                  ⭐UP!
                </div>
              )}
            </>
          )}
        </button>

        {/* Energy Pill Button (Click to Refill Energy) */}
        <div className="flex flex-col items-center">
          <button
            onClick={freeEnergyRefill}
            title="에너지 무료 충전 (+50)"
            className="bg-[#002f52]/90 border-2 border-[#38bdf8]/80 rounded-full px-2.5 py-0.5 flex items-center gap-1.5 shadow-inner cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <Zap className="w-4 h-4 text-[#38bdf8] fill-[#38bdf8] animate-pulse" />
            <span className="font-black text-xs sm:text-sm text-white tracking-tight">
              {energy}
            </span>
          </button>
          <span className="text-[9px] font-bold text-sky-200/90 tracking-tighter mt-0.5">
            {energy < maxEnergy ? timerText : 'FULL'}
          </span>
        </div>

        {/* Coin Pill Button (Click to Add Coins) */}
        <button
          onClick={() => useGameStore.getState().addCoins(100)}
          title="코인 무료 보너스 (+100)"
          className="bg-[#6b4700]/90 border-2 border-amber-400 rounded-full px-2.5 py-0.5 flex items-center gap-1.5 shadow-inner cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-[10px] text-amber-950 font-black shadow-xs">
            🪙
          </div>
          <span className="font-black text-xs sm:text-sm text-amber-100 tracking-tight">
            {coins.toLocaleString()}
          </span>
        </button>

        {/* Gem Pill Button (Click to Add Gems) */}
        <button
          onClick={() => useGameStore.getState().addGems(10)}
          title="보석 무료 보너스 (+10)"
          className="bg-[#4a0834]/90 border-2 border-pink-400 rounded-full px-2.5 py-0.5 flex items-center gap-1.5 shadow-inner cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <span className="text-xs">💎</span>
          <span className="font-black text-xs sm:text-sm text-pink-100 tracking-tight">
            {gems.toLocaleString()}
          </span>
        </button>

        {/* Shop Cart & Sound Menu */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenHelp}
            title="상점 & 이벤트"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-orange-500 border-2 border-amber-200 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-4 h-4 text-white drop-shadow" />
          </button>

          <button
            onClick={handleToggleSound}
            title={soundOn ? '효과음 끄기' : '효과음 켜기'}
            className="w-7 h-7 rounded-lg bg-black/30 hover:bg-black/50 text-white/80 flex items-center justify-center text-xs"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-300" />}
          </button>

          <button
            onClick={onOpenResetConfirm}
            title="게임 초기화"
            className="w-7 h-7 rounded-lg bg-black/30 hover:bg-black/50 text-white/80 flex items-center justify-center text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
