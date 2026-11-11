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

  return (
    <header className="bg-wood-800 text-cream-50 shadow-md border-b-4 border-terracotta-500 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap justify-between items-center gap-3">
        
        {/* Brand & Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-terracotta-500 flex items-center justify-center text-2xl shadow-md border border-amber-200">
            🧩
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-cream-50">
                머지 비스트로: 유적의 비밀
              </h1>
              <span className="text-[10px] bg-terracotta-500 text-white font-bold px-1.5 py-0.5 rounded shadow-sm">
                Merge-2
              </span>
            </div>
            <p className="text-[11px] text-cream-300">
              폭풍우로 무너진 해변 식당을 복원하고 실종된 사장님을 찾으세요!
            </p>
          </div>
        </div>

        {/* Resources Badges Bar */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-bold">
          
          {/* Energy Gauge */}
          <div className="flex items-center bg-wood-700/80 hover:bg-wood-700 px-2.5 py-1.5 rounded-xl border border-wood-600 shadow-inner group">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse mr-1" />
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-amber-300 font-extrabold text-sm">{energy}</span>
                <span className="text-slate-400 text-[10px]">/{maxEnergy}</span>
              </div>
              {energy < maxEnergy && (
                <span className="text-[9px] text-cream-300/80 -mt-0.5">
                  +{secondsUntilRecharge}s
                </span>
              )}
            </div>
            {energy < 30 && (
              <button
                onClick={freeEnergyRefill}
                title="무료 에너지 긴급 충전 (+50)"
                className="ml-2 bg-amber-500 hover:bg-amber-400 text-wood-900 p-1 rounded-lg text-[10px] font-black transition-transform active:scale-90 flex items-center shadow"
              >
                <Plus className="w-3 h-3" />
                <span className="hidden sm:inline">충전</span>
              </button>
            )}
          </div>

          {/* Coins */}
          <div className="flex items-center bg-wood-700/80 px-2.5 py-1.5 rounded-xl border border-wood-600 shadow-inner">
            <Coins className="w-4 h-4 text-yellow-300 mr-1.5" />
            <span className="text-yellow-300 font-extrabold text-sm tracking-wide">
              {coins.toLocaleString()}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center bg-wood-700/80 px-2.5 py-1.5 rounded-xl border border-wood-600 shadow-inner">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1.5" />
            <span className="text-amber-400 font-extrabold text-sm tracking-wide">
              {stars.toLocaleString()}
            </span>
          </div>

          {/* Gems */}
          <div className="flex items-center bg-wood-700/80 px-2.5 py-1.5 rounded-xl border border-wood-600 shadow-inner">
            <Gem className="w-4 h-4 text-cyan-300 mr-1.5" />
            <span className="text-cyan-300 font-extrabold text-sm tracking-wide">
              {gems}
            </span>
          </div>

          {/* Supercharge Multiplier Switcher */}
          <div className="flex items-center bg-wood-900/80 p-1 rounded-xl border border-wood-600 gap-1">
            <span className="text-[10px] text-cream-300 px-1 font-semibold hidden md:inline">
              슈퍼차지:
            </span>
            {([1, 2, 4] as const).map(m => (
              <button
                key={m}
                onClick={() => setSupercharge(m)}
                className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                  superchargeMultiplier === m
                    ? 'bg-gradient-to-r from-amber-500 to-terracotta-500 text-white shadow-md scale-105'
                    : 'text-cream-300 hover:text-white hover:bg-wood-700'
                }`}
              >
                {m}x
              </button>
            ))}
          </div>

          {/* Quick Controls: Sound, Help, Reset */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleSound}
              title={soundOn ? '사운드 끄기' : '사운드 켜기'}
              className="p-1.5 rounded-lg bg-wood-700 hover:bg-wood-600 text-cream-200 transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>
            <button
              onClick={onOpenHelp}
              title="게임 규칙 및 가이드"
              className="p-1.5 rounded-lg bg-wood-700 hover:bg-wood-600 text-cream-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenResetConfirm}
              title="게임 데이터 리셋"
              className="p-1.5 rounded-lg bg-wood-700 hover:bg-rose-900 text-cream-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-300 hover:text-rose-200" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
