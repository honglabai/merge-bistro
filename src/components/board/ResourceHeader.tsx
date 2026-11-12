import React, { useEffect, useState } from 'react';
import { Zap, ShoppingCart, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sounds } from '../../utils/soundSynthesizer';

interface ResourceHeaderProps {
  onOpenHelp: () => void;
  onOpenResetConfirm: () => void;
}

export const ResourceHeader: React.FC<ResourceHeaderProps> = ({ onOpenHelp, onOpenResetConfirm }) => {
  const {
    energy,
    maxEnergy,
    coins,
    gems,
    freeEnergyRefill,
    rechargeEnergyTick
  } = useGameStore();

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
        
        {/* Profile Avatar with Golden Level Badge */}
        <div className="relative flex-shrink-0 cursor-pointer group" onClick={onOpenHelp} title="게임 도움말">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-sky-300 p-0.5 shadow-md overflow-hidden border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Level Star Badge */}
          <div className="absolute -bottom-1 -left-1 bg-gradient-to-br from-amber-400 to-amber-600 text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
            49
          </div>
        </div>

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
