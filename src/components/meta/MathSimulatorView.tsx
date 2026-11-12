import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Calculator, TrendingUp, Layers, ArrowLeft } from 'lucide-react';
import { ITEM_CHAINS } from '../../data/itemsData';

interface MathSimulatorViewProps {
  onBackToBoard?: () => void;
}

export const MathSimulatorView: React.FC<MathSimulatorViewProps> = ({ onBackToBoard }) => {
  const [itemLevel, setItemLevel] = useState(8);
  const [multiplier, setMultiplier] = useState<1 | 2 | 4>(1);
  const [boardEff, setBoardEff] = useState(85);
  const [dailyEnergy, setDailyEnergy] = useState(300);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Calculations
  const equivReq = Math.pow(2, itemLevel - 1);
  const energyCost = equivReq;
  const tapCount = Math.ceil(equivReq / multiplier);
  const metaProgress = ((dailyEnergy / Math.max(1, energyCost)) * (boardEff / 100) * 0.8).toFixed(2);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const levels = Array.from({ length: 11 }, (_, i) => `Lv.${i + 1}`);
    const data = levels.map((_, i) => Math.pow(2, i));

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: levels,
        datasets: [
          {
            label: '1레벨 등가 소모량 (2^(L-1))',
            data: data,
            borderColor: '#B85C38',
            backgroundColor: 'rgba(184, 92, 56, 0.12)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#B85C38',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: {
            type: 'logarithmic',
            title: { display: true, text: '필요 재화 개수 (로그 스케일)' }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-4">
      
      {/* Return to Board Header Bar */}
      {onBackToBoard && (
        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-2xl border-2 border-indigo-200 shadow-xs">
          <button
            onClick={onBackToBoard}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#2A9D8F] to-[#1c6b61] text-white text-xs font-black shadow-sm flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>1. 머지 보드로 복귀</span>
          </button>
          <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            시뮬레이터 모드
          </span>
        </div>
      )}

      {/* Intro Banner */}
      <div className="bg-cream-50 p-5 rounded-2xl border border-cream-300 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-terracotta-500" />
          <span>머지-2 수리 경제 모델 및 실시간 시뮬레이터</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          머지-2의 경제학은 기하급수적 수요 곡선 <strong>D_L = 2^(L - 1)</strong> 위에 구축됩니다. 아이템 레벨이 올라감에 따라 필요한 기본 1레벨 에너지 가치는 2배씩 폭증합니다. 슬라이더를 조절하여 생성기 배수 μ(M), 보드 효율성 η, 일일 메타 진행도를 실시간으로 계산해보세요.
        </p>
      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-cream-300 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-cream-200 pb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-sage-600" />
            <span>수리 밸런스 시뮬레이션 파라미터</span>
          </h3>

          {/* Level Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>목표 아이템 레벨 (L)</span>
              <span className="text-terracotta-600 font-bold">Lv. {itemLevel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={11}
              value={itemLevel}
              onChange={e => setItemLevel(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-terracotta-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>Lv.1 (기본)</span>
              <span>Lv.6 (중급)</span>
              <span>Lv.11 (시그니처)</span>
            </div>
          </div>

          {/* Multiplier Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              생성기 슈퍼차지 배수 (M)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([1, 2, 4] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMultiplier(m)}
                  className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    multiplier === m
                      ? 'bg-sage-600 text-white border-sage-700 shadow-sm'
                      : 'bg-cream-100 text-slate-700 border-cream-300 hover:bg-cream-200'
                  }`}
                >
                  {m}x {m === 1 ? '(기본)' : m === 2 ? '(슈퍼)' : '(울트라)'}
                </button>
              ))}
            </div>
          </div>

          {/* Board Efficiency */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>63타일 보드 효율성 (η)</span>
              <span className="text-sage-600 font-bold">{boardEff}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={boardEff}
              onChange={e => setBoardEff(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-sage-500"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">보드 공간 혼잡도 및 활성 주문 매칭 비율</p>
          </div>

          {/* Daily Energy */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>일일 플레이어 에너지 소모량 (E)</span>
              <span className="text-wood-600 font-bold">{dailyEnergy} E</span>
            </div>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={dailyEnergy}
              onChange={e => setDailyEnergy(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-cream-300 rounded-lg appearance-none cursor-pointer accent-wood-500"
            />
          </div>

          {/* Results Box */}
          <div className="bg-cream-50 p-4 rounded-xl border border-cream-300 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">1레벨 등가 요구량 (2^(L-1)):</span>
              <span className="font-extrabold text-slate-900">{equivReq.toLocaleString()} 개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">필요 기본 에너지 소모:</span>
              <span className="font-bold text-terracotta-600">{energyCost.toLocaleString()} Energy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">필요 스폰 탭 횟수 (M 반영):</span>
              <span className="font-bold text-slate-900">{tapCount.toLocaleString()} 회</span>
            </div>
            <div className="flex justify-between border-t border-cream-300 pt-2">
              <span className="font-bold text-slate-800">예상 일일 메타 진행 지수:</span>
              <span className="font-black text-sage-600 text-sm">{metaProgress} 단계/일</span>
            </div>
          </div>
        </div>

        {/* Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-cream-300 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-terracotta-500" />
              <span>아이템 레벨별 기하급수 수요 곡선 (2^(L-1))</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">레벨 1부터 11까지의 등가 재화 소모량 변화 추이</p>
          </div>
          <div className="relative w-full h-[320px]">
            <canvas ref={canvasRef} />
          </div>
        </div>

      </div>

      {/* 5 Chains Directory */}
      <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-wood-600" />
          <span>5대 주력 생산 체인 명세 디렉토리</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {Object.values(ITEM_CHAINS).map(chain => (
            <div key={chain.id} className="p-3 bg-cream-50 rounded-xl border border-cream-300 flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-900">{chain.name}</span>
                <p className="text-[11px] text-terracotta-700 mt-1">
                  생성기: {chain.generatorName} {chain.generatorIcon}
                </p>
                <p className="text-[11px] text-slate-500">
                  최대: Lv.{chain.items.length} {chain.items[chain.items.length - 1].name}
                </p>
              </div>
              <div className="text-[10px] text-slate-400 mt-2">
                총 {chain.items.length}단계 진화
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
