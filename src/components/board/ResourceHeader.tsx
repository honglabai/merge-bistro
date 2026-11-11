import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Plus, Zap, Coins, Star, Gem, HelpCircle } from 'lucide-react';
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
    stars,
    gems,
    superchargeMultiplier,
    setSupercharge,
    freeEnergyRefill,
    rechargeEnergyTick
  } = useGameStore();

  const [soundOn, setSoundOn] = useState(sounds.enabled);
  const [secondsUntilRecharge, setSecondsUntilRecharge] = useState(60);

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

  const energyPercent = Math.min(100, (energy / maxEnergy) * 100);

  return (
    <header className="bg-gradient-to-r from-[#4E342E] via-[#5D4037] to-[#4E342E] text-[#FFFDF9] shadow-lg border-b-4 border-[#8C6239] select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-2.5">
        
        {/* Brand & Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-[#E76F51] flex items-center justify-center text-2xl shadow-md border-2 border-amber-200">
            🧩
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-[#FFFDF9]">
                머지 비스트로 (Merge Bistro)
              </h1>
              <span className="text-[10px] bg-[#E76F51] text-white font-extrabold px-1.5 py-0.5 rounded-full shadow-2xs">
                Cozy Cartoon
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#EBE3D5] leading-none mt-0.5">
              해변 레스토랑 복원 & 고대 유적 미스터리
            </p>
          </div>
        </div>

        {/* Resources Bar */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-bold">
          
          {/* Energy Gauge with progress fill */}
          <div className="flex items-center bg-[#3E2723]/90 px-3 py-1.5 rounded-2xl border border-[#8C6239] shadow-inner relative overflow-hidden">
            <div
              className="absolute left-0 bottom-0 top-0 bg-amber-500/20 transition-all duration-300 pointer-events-none"
              style={{ width: `${energyPercent}%` }}
            />
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse mr-1.5 z-10" />
            <div className="flex flex-col z-10">
              <div className="flex items-center space-x-1">
                <span className="text-amber-300 font-black text-sm">{energy}</span>
                <span className="text-slate-400 text-[10px]">/{maxEnergy}</span>
              </div>
              {energy < maxEnergy && (
                <span className="text-[9px] text-[#EBE3D5]/80 -mt-0.5">
                  +{secondsUntilRecharge}s
                </span>
              )}
            </div>
            {energy < 30 && (
              <button
                onClick={freeEnergyRefill}
                title="무료 에너지 긴급 충전 (+50)"
                className="ml-2.5 z-10 bg-amber-400 hover:bg-amber-300 text-[#4E342E] px-2 py-0.5 rounded-lg text-[10px] font-black transition-transform active:scale-90 flex items-center shadow"
              >
                <Plus className="w-3 h-3" />
                <span className="hidden sm:inline">충전</span>
              </button>
            )}
          </div>

          {/* Coins */}
          <div className="flex items-center bg-[#3E2723]/90 px-3 py-1.5 rounded-2xl border border-[#8C6239] shadow-inner">
            <Coins className="w-4 h-4 text-yellow-300 mr-1.5" />
            <span className="text-yellow-300 font-black text-sm tracking-wide">
              {coins.toLocaleString()}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center bg-[#3E2723]/90 px-3 py-1.5 rounded-2xl border border-[#8C6239] shadow-inner">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1.5" />
            <span className="text-amber-400 font-black text-sm tracking-wide">
              {stars.toLocaleString()}
            </span>
          </div>

          {/* Gems */}
          <div className="flex items-center bg-[#3E2723]/90 px-2.5 py-1.5 rounded-2xl border border-[#8C6239] shadow-inner">
            <Gem className="w-3.5 h-3.5 text-cyan-300 mr-1" />
            <span className="text-cyan-300 font-black text-xs">
              {gems}
            </span>
          </div>

          {/* Supercharge Switcher */}
          <div className="flex items-center bg-[#2E1C18] p-1 rounded-2xl border border-[#6D4C41] gap-1">
            <span className="text-[10px] text-[#EBE3D5] px-1 font-bold hidden md:inline">
              스포너 배수:
            </span>
            {([1, 2, 4] as const).map(m => (
              <button
                key={m}
                onClick={() => setSupercharge(m)}
                className={`px-2 py-0.5 rounded-xl text-xs font-black transition-all ${
                  superchargeMultiplier === m
                    ? 'bg-gradient-to-r from-amber-500 to-[#E76F51] text-white shadow scale-105'
                    : 'text-[#EBE3D5] hover:text-white hover:bg-[#4E342E]'
                }`}
              >
                {m}x
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleSound}
              title={soundOn ? '사운드 끄기' : '사운드 켜기'}
              className="p-1.5 rounded-xl bg-[#5D4037] hover:bg-[#6D4C41] text-[#EBE3D5] transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#2A9D8F]" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>
            <button
              onClick={onOpenHelp}
              title="게임 규칙 및 가이드"
              className="p-1.5 rounded-xl bg-[#5D4037] hover:bg-[#6D4C41] text-[#EBE3D5] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenResetConfirm}
              title="게임 데이터 리셋"
              className="p-1.5 rounded-xl bg-[#5D4037] hover:bg-rose-900 text-[#EBE3D5] transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-300 hover:text-rose-200" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
