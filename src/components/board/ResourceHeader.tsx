import React, { useEffect, useState } from 'react';
import { Plus, Zap, Coins, Gem, ShoppingCart, Volume2, VolumeX, RotateCcw } from 'lucide-react';
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
    <header className="bg-[#0b483e] text-white px-2.5 sm:px-4 py-2 select-none border-b border-[#1b6b60]/80 shadow-sm">
      <div className="max-w-[500px] mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Profile Avatar with Quiet Level Star Badge */}
        <div className="relative flex-shrink-0 cursor-pointer group" onClick={onOpenHelp} title="게임 도움말">
          <div className="w-10 h-10 rounded-full bg-[#1b6b60] p-0.5 shadow-sm overflow-hidden border border-white/80">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Level Badge */}
          <div className="absolute -bottom-1 -left-1 bg-amber-500 text-amber-950 font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-xs">
            49
          </div>
        </div>

        {/* Energy Capsule */}
        <div className="flex flex-col items-center">
          <div className="bg-[#042d27]/90 border border-[#2fa896]/60 rounded-full pl-2.5 pr-1 py-0.5 flex items-center gap-1.5 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-sky-300 fill-sky-300 flex-shrink-0" />
            <span className="font-semibold text-xs sm:text-sm text-white tabular-nums tracking-tight min-w-[20px] text-center">
              {energy}
            </span>
            <button
              onClick={freeEnergyRefill}
              title="에너지 충전 (+50)"
              className="w-4 h-4 rounded-full bg-[#1b7367] hover:bg-[#238779] text-white flex items-center justify-center transition-colors active:scale-95"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
          <span className="text-[9px] font-medium text-emerald-200/80 tabular-nums tracking-tight mt-0.5">
            {energy < maxEnergy ? timerText : '최대치'}
          </span>
        </div>

        {/* Coins Capsule */}
        <div className="bg-[#042d27]/90 border border-[#2fa896]/60 rounded-full pl-2.5 pr-1 py-0.5 flex items-center gap-1.5 shadow-inner">
          <Coins className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
          <span className="font-semibold text-xs sm:text-sm text-amber-100 tabular-nums tracking-tight">
            {coins.toLocaleString()}
          </span>
          <button
            onClick={() => useGameStore.getState().addCoins(100)}
            title="코인 충전 (+100)"
            className="w-4 h-4 rounded-full bg-[#1b7367] hover:bg-[#238779] text-white flex items-center justify-center transition-colors active:scale-95"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Gems Capsule */}
        <div className="bg-[#042d27]/90 border border-[#2fa896]/60 rounded-full pl-2.5 pr-1 py-0.5 flex items-center gap-1.5 shadow-inner">
          <Gem className="w-3.5 h-3.5 text-rose-300 flex-shrink-0" />
          <span className="font-semibold text-xs sm:text-sm text-rose-100 tabular-nums tracking-tight">
            {gems.toLocaleString()}
          </span>
          <button
            onClick={() => useGameStore.getState().addGems(10)}
            title="보석 충전 (+10)"
            className="w-4 h-4 rounded-full bg-[#1b7367] hover:bg-[#238779] text-white flex items-center justify-center transition-colors active:scale-95"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Controls: Shop, Audio, Reset */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenHelp}
            title="상점 및 이벤트"
            className="w-8 h-8 rounded-lg bg-amber-500/90 hover:bg-amber-500 text-amber-950 flex items-center justify-center shadow-xs transition-colors active:scale-95 border border-amber-300/40"
          >
            <ShoppingCart className="w-4 h-4 text-amber-950" />
          </button>

          <button
            onClick={handleToggleSound}
            title={soundOn ? '효과음 끄기' : '효과음 켜기'}
            className="w-7 h-7 rounded-lg bg-black/25 hover:bg-black/40 text-white/80 flex items-center justify-center text-xs transition-colors"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-white/90" /> : <VolumeX className="w-3.5 h-3.5 text-rose-300" />}
          </button>

          <button
            onClick={onOpenResetConfirm}
            title="게임 초기화"
            className="w-7 h-7 rounded-lg bg-black/25 hover:bg-black/40 text-white/80 flex items-center justify-center text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-white/90" />
          </button>
        </div>

      </div>
    </header>
  );
};
