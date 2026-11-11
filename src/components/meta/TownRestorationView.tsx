import React from 'react';
import { Hammer, CheckCircle, Sparkles, MapPin, Star } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const TownRestorationView: React.FC = () => {
  const { restorations, stars, openRestorationPicker } = useGameStore();

  const restoredCount = restorations.filter(r => r.isRestored).length;
  const progressPercent = Math.round((restoredCount / restorations.length) * 100);

  return (
    <div className="space-y-5">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-cream-50 via-cream-100 to-cream-50 p-5 rounded-2xl border border-cream-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏰</span>
            <h2 className="text-lg font-extrabold text-slate-900">
              비스트로 & 고대 유적 복원 본부
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            머지 보드에서 손님 주문을 완료하고 모은 <strong>별(⭐)</strong>로 폭풍우 피해를 복구하세요. 시설을 복원할 때마다 3가지 인테리어 스타일을 자유롭게 선택하고, 실종된 사장님과 고대 유적의 진실에 다가설 수 있습니다!
          </p>
        </div>

        {/* Progress gauge */}
        <div className="bg-white p-3.5 rounded-xl border border-cream-300 shadow-inner min-w-[200px] text-center">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
            <span>마을 재건 진행도</span>
            <span className="text-terracotta-600 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-terracotta-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {restoredCount} / {restorations.length} 구역 완료
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restorations.map(node => {
          const canRestore = stars >= node.costStars && !node.isRestored;
          const chosenStyleObj = node.styles[node.chosenStyle] || node.styles[0];

          return (
            <div
              key={node.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                node.isRestored
                  ? 'bg-gradient-to-br from-cream-50 to-sage-50/50 border-sage-300 shadow-sm'
                  : canRestore
                  ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-300/60'
                  : 'bg-white/80 border-cream-300 opacity-90'
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-wood-700 text-cream-50">
                      Chapter {node.chapter}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-terracotta-500" />
                      {node.location}
                    </span>
                  </div>

                  {node.isRestored ? (
                    <span className="text-[10px] font-extrabold bg-sage-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <CheckCircle className="w-3 h-3" />
                      복원 완료
                    </span>
                  ) : (
                    <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {node.costStars}개 필요
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                  {node.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {node.description}
                </p>
              </div>

              {/* Style Preview / Selection */}
              <div className="border-t border-cream-200 pt-3 mt-auto">
                {node.isRestored ? (
                  <div className="bg-white p-2.5 rounded-xl border border-sage-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{chosenStyleObj.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {chosenStyleObj.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          테마: {chosenStyleObj.theme}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-sage-600 font-bold bg-sage-50 px-2 py-1 rounded">
                      적용 완료
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500">
                      인테리어 3종 중 선택 가능
                    </div>
                    <button
                      onClick={() => openRestorationPicker(node)}
                      disabled={!canRestore}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow ${
                        canRestore
                          ? 'bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-amber-600 hover:to-terracotta-600 text-white active:scale-95 animate-pulse'
                          : 'bg-cream-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Hammer className="w-3.5 h-3.5" />
                      <span>{canRestore ? '복원하기 (스타일 선택)' : `별 부족 (${stars}/${node.costStars}⭐)`}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
