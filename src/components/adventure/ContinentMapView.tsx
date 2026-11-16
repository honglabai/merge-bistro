import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Lock,
  Check,
  Sparkles,
  Trophy,
  ArrowLeft,
  ChevronRight,
  Flame,
  Award,
  Zap
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ContinentRegion } from '../../types/gameSchema';

interface ContinentMapViewProps {
  onBackToBoard?: () => void;
  onGoToRestoration?: () => void;
}

export const ContinentMapView: React.FC<ContinentMapViewProps> = ({
  onBackToBoard,
  onGoToRestoration
}) => {
  const {
    continentRegions,
    activeRegionId,
    selectAdventureRegion,
    claimMissionReward,
    relicsInventory,
    activeAdventureDialogue,
    closeAdventureDialogue,
    chefAvatar,
    coins,
    gems,
    stars
  } = useGameStore();

  const [selectedRegionId, setSelectedRegionId] = useState<string>(activeRegionId || 'region-1');
  const [showRelicVault, setShowRelicVault] = useState(false);

  // Active region currently selected for viewing
  const activeRegion: ContinentRegion =
    continentRegions.find(r => r.id === selectedRegionId) || continentRegions[0];

  // Global continent stats
  const totalMissions = continentRegions.reduce((sum, r) => sum + r.missions.length, 0);
  const completedMissions = continentRegions.reduce(
    (sum, r) => sum + r.missions.filter(m => m.isCompleted).length,
    0
  );
  const clearedRegionsCount = continentRegions.filter(r => r.isCompleted).length;
  const progressPercent = Math.round((completedMissions / totalMissions) * 100);

  // Coordinates for the path connecting regions
  const stageCoords = continentRegions.map(r => r.mapCoords);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 pb-6 select-none">
      
      {/* 1. Header: Navigation & Currency Badges */}
      <div className="flex items-center justify-between bg-white px-2 py-1.5 rounded-2xl border-2 border-[#D4A373]/60 shadow-sm">
        <div className="flex items-center gap-1">
          {onBackToBoard && (
            <button
              onClick={onBackToBoard}
              className="px-2 py-1 rounded-xl bg-gradient-to-r from-[#2A9D8F] to-[#1c6b61] text-white text-[11px] font-black shadow-xs flex items-center gap-1 active:scale-95 transition-transform whitespace-nowrap flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>머지 보드</span>
            </button>
          )}
          {onGoToRestoration && (
            <button
              onClick={onGoToRestoration}
              className="px-2 py-1 rounded-xl bg-[#FAF7F2] border border-[#D4A373] text-[#8C6239] text-[10px] font-bold shadow-2xs hover:bg-amber-50 active:scale-95 transition-transform whitespace-nowrap flex-shrink-0"
            >
              🏰 시설 복원
            </button>
          )}
        </div>

        {/* Currency & Relic summary */}
        <div className="flex items-center gap-1 text-[10px] font-black">
          <button
            onClick={() => setShowRelicVault(true)}
            className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full shadow-2xs hover:bg-amber-200 active:scale-95 transition-all whitespace-nowrap flex-shrink-0"
          >
            <Trophy className="w-3 h-3 text-amber-600" />
            <span>유물 {relicsInventory.length}/5</span>
          </button>
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            탐험 {progressPercent}%
          </span>
        </div>
      </div>

      {/* 2. Interactive Fantasy Continent Map Canvas */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#8C6239] shadow-xl bg-slate-900 group">
        
        {/* Background Fantasy Map Illustration */}
        <img
          src="/adventure-continent-map.jpg"
          alt="Continent of Asteria Adventure Map"
          className="w-full h-full object-cover filter brightness-[1.03] transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Atmospheric Sunlight Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* SVG Quest Pathways Connecting Biomes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Animated Glowing Connection Line */}
          <path
            d={`M ${stageCoords[0].x} ${stageCoords[0].y} 
               Q 18 60, ${stageCoords[1].x} ${stageCoords[1].y} 
               Q 45 50, ${stageCoords[2].x} ${stageCoords[2].y} 
               Q 45 35, ${stageCoords[3].x} ${stageCoords[3].y} 
               Q 50 15, ${stageCoords[4].x} ${stageCoords[4].y}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeDasharray="2, 2"
            className="animate-pulse"
          />
        </svg>

        {/* Interactive Region Pins on Map */}
        {continentRegions.map(region => {
          const isSelected = region.id === selectedRegionId;
          const isUnlocked = region.isUnlocked;
          const isDone = region.isCompleted;

          return (
            <motion.div
              key={region.id}
              onClick={() => {
                setSelectedRegionId(region.id);
                selectAdventureRegion(region.id);
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                left: `${region.mapCoords.x}%`,
                top: `${region.mapCoords.y}%`
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center ${
                !isUnlocked ? 'opacity-70' : 'opacity-100'
              }`}
            >
              {/* Pin Marker Badge */}
              <div
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 shadow-lg transition-all ${
                  isDone
                    ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-white ring-2 ring-amber-400 text-amber-950'
                    : isUnlocked
                    ? isSelected
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 border-white ring-4 ring-emerald-300 text-white animate-bounce'
                      : 'bg-gradient-to-tr from-sky-500 to-indigo-600 border-white text-white'
                    : 'bg-slate-700/90 border-slate-400 text-slate-300'
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isUnlocked ? (
                  <span className="text-xs font-black">{region.stageNumber}</span>
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}

                {/* Floating Character Pin if Current Unlocked Stage */}
                {isUnlocked && !isDone && (
                  <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full overflow-hidden border border-white shadow-md bg-amber-400">
                    <img
                      src={chefAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'}
                      alt="Player"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Pin Label Tooltip */}
              <div
                className={`mt-1 px-1.5 py-0.2 rounded-full text-[8.5px] sm:text-[9.5px] font-black whitespace-nowrap shadow-md border ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 border-white'
                    : isUnlocked
                    ? 'bg-slate-900/90 text-white border-white/40'
                    : 'bg-black/80 text-slate-400 border-transparent'
                }`}
              >
                {region.name.split('&')[0].trim()}
              </div>
            </motion.div>
          );
        })}

        {/* Map Header Overlay Banner */}
        <div className="absolute top-2 left-2 z-20 bg-slate-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-xl border border-white/20 shadow-md pointer-events-none">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="text-[10px] font-black tracking-tight text-amber-200">
              아스테리아 대륙 모험 지도
            </span>
          </div>
        </div>

        {/* Bottom Quick Stage Selector Pills */}
        <div className="absolute bottom-2 inset-x-2 z-20 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {continentRegions.map(reg => (
            <button
              key={reg.id}
              onClick={() => {
                setSelectedRegionId(reg.id);
                selectAdventureRegion(reg.id);
              }}
              className={`px-2 py-0.5 rounded-full text-[9px] font-black transition-all flex items-center gap-1 backdrop-blur-xs shadow-sm border ${
                reg.id === selectedRegionId
                  ? 'bg-amber-400 text-amber-950 border-white scale-105'
                  : reg.isUnlocked
                  ? 'bg-black/60 text-white border-white/30 hover:bg-black/80'
                  : 'bg-black/40 text-slate-400 border-transparent'
              }`}
            >
              <span>{reg.icon}</span>
              <span>{reg.stageNumber}구역</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Selected Region Detail & Active Missions Panel */}
      <div className="bg-white rounded-2xl border-2 border-[#D4A373]/60 p-3.5 shadow-md space-y-3">
        
        {/* Region Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeRegion.icon}</span>
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                {activeRegion.stageNumber}장: {activeRegion.name}
              </h3>
              {activeRegion.isCompleted ? (
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> 구역 정복 완료
                </span>
              ) : activeRegion.isUnlocked ? (
                <span className="text-[9px] font-black bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-300">
                  현재 탐험 중
                </span>
              ) : (
                <span className="text-[9px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" /> 이전 구역 클리어 필요
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
              {activeRegion.subtitle}
            </p>
          </div>

          {/* Region Relic Preview Badge */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 px-2.5 py-1.5 rounded-xl shadow-2xs">
            <span className="text-xl">{activeRegion.relicReward.icon}</span>
            <div className="leading-tight">
              <div className="text-[9px] font-black text-amber-800">
                지역 전설 유물
              </div>
              <div className="text-[11px] font-extrabold text-slate-800 truncate max-w-[130px]">
                {activeRegion.relicReward.name}
              </div>
            </div>
          </div>
        </div>

        {/* Region Lore Story Box */}
        <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-200 text-[11px] text-slate-700 leading-relaxed flex items-start gap-2">
          <span className="text-base flex-shrink-0">📜</span>
          <p>{activeRegion.lore}</p>
        </div>

        {/* Missions Progression Checklist */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-800">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>지역 탐험 퀘스트 ({activeRegion.missions.filter(m => m.isCompleted).length}/{activeRegion.missions.length})</span>
            </span>
            <span className="text-[11px] text-slate-500">
              완료 시 다음 구역 해금 & 전설 유물 획득
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {activeRegion.missions.map(mission => {
              const isDone = mission.isCompleted;
              const isClaimed = mission.isClaimed;
              const percent = Math.min(
                100,
                Math.round((mission.currentCount / mission.targetCount) * 100)
              );

              return (
                <div
                  key={mission.id}
                  className={`p-2.5 rounded-xl border transition-all flex flex-col justify-between gap-1.5 ${
                    isClaimed
                      ? 'bg-slate-50 border-slate-200 opacity-80'
                      : isDone
                      ? 'bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 border-emerald-400 shadow-md ring-1 ring-emerald-300'
                      : 'bg-white border-cream-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="text-xs font-black text-slate-900 truncate whitespace-nowrap">
                          {mission.title}
                        </span>
                        {isClaimed ? (
                          <span className="text-[8px] font-black bg-slate-200 text-slate-600 px-1 py-0.2 rounded-full whitespace-nowrap flex-shrink-0">
                            완료됨
                          </span>
                        ) : isDone ? (
                          <span className="text-[8px] font-black bg-emerald-500 text-white px-1.5 py-0.2 rounded-full animate-pulse whitespace-nowrap flex-shrink-0">
                            수령 가능!
                          </span>
                        ) : null}
                      </div>

                      <p className="text-[10.5px] text-slate-600 mt-0.5 leading-snug">
                        {mission.description}
                      </p>

                      {/* Character Quote */}
                      <div className="mt-1 flex items-center gap-1 text-[9.5px] text-amber-800 bg-amber-50/80 px-1.5 py-0.5 rounded-md border border-amber-200/60">
                        <span>{mission.storyQuote.avatar}</span>
                        <span className="font-bold whitespace-nowrap">{mission.storyQuote.speaker}:</span>
                        <span className="italic truncate">"{mission.storyQuote.text}"</span>
                      </div>
                    </div>

                    {/* Reward Tag */}
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <div className="text-[9.5px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full border border-amber-300 whitespace-nowrap flex-shrink-0">
                        +{mission.reward.coins}🪙 +{mission.reward.gems}💎 +{mission.reward.stars}⭐
                      </div>
                    </div>
                  </div>

                  {/* Progress Gauge & Action Button */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-cream-100">
                    <div className="flex-1">
                      <div className="flex justify-between text-[9.5px] font-bold text-slate-600 mb-0.5 whitespace-nowrap">
                        <span>진행도</span>
                        <span>
                          {mission.currentCount} / {mission.targetCount} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isDone
                              ? 'bg-emerald-500'
                              : 'bg-gradient-to-r from-amber-400 to-orange-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      {isClaimed ? (
                        <button
                          disabled
                          className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-500 text-[10px] font-black cursor-not-allowed whitespace-nowrap"
                        >
                          수령 완료
                        </button>
                      ) : isDone ? (
                        <button
                          onClick={() => claimMissionReward(mission.id)}
                          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 text-white text-[10.5px] font-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1 animate-pulse whitespace-nowrap"
                        >
                          <Sparkles className="w-3 h-3 text-amber-200 flex-shrink-0" />
                          <span>보상 수령!</span>
                        </button>
                      ) : onBackToBoard ? (
                        <button
                          onClick={onBackToBoard}
                          className="px-2 py-1 rounded-lg bg-[#2A9D8F] hover:bg-[#1f7369] text-white text-[10px] font-black shadow-xs active:scale-95 transition-transform flex items-center gap-0.5 whitespace-nowrap"
                        >
                          <span>보드로 이동</span>
                          <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">진행 중</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. Relics Vault Modal Popup */}
      <AnimatePresence>
        {showRelicVault && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white rounded-2xl border-2 border-amber-400 shadow-2xl max-w-md w-full p-4 space-y-3"
            >
              <div className="flex justify-between items-center border-b border-cream-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-black text-slate-900">
                    🏆 아스테리아 대륙 전설의 유물 보관소 ({relicsInventory.length}/5)
                  </h3>
                </div>
                <button
                  onClick={() => setShowRelicVault(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                각 지역의 모든 모험 퀘스트를 완수하면 고대 미식의 전설 유물을 획득하여 영구 패시브 효과를 발동할 수 있습니다.
              </p>

              <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
                {continentRegions.map(reg => {
                  const relic = reg.relicReward;
                  const isOwned = relicsInventory.some(r => r.id === relic.id);

                  return (
                    <div
                      key={relic.id}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 ${
                        isOwned
                          ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 shadow-sm'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="text-2xl w-10 h-10 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center justify-center flex-shrink-0">
                        {isOwned ? relic.icon : '🔒'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-slate-900">
                            {relic.name}
                          </span>
                          {isOwned && (
                            <span className="text-[8px] font-black bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full">
                              활성화됨
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          {relic.description}
                        </div>
                        <div className="text-[9.5px] font-black text-emerald-700 mt-0.5">
                          효과: {relic.perk}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowRelicVault(false)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-md active:scale-95 transition-transform"
              >
                닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Adventure Dialogue Celebration Modal Popup */}
      <AnimatePresence>
        {activeAdventureDialogue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-gradient-to-b from-white to-cream-50 rounded-2xl border-2 border-amber-400 shadow-2xl max-w-sm w-full p-4 text-center space-y-3"
            >
              <div className="text-4xl animate-bounce">🎉</div>
              <div className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block border border-amber-300">
                구역 클리어 & 다음 지역 개척!
              </div>

              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-3xl">{activeAdventureDialogue.avatar}</span>
                <span className="text-sm font-black text-slate-900">
                  {activeAdventureDialogue.speaker}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-cream-300 shadow-inner">
                "{activeAdventureDialogue.text}"
              </p>

              <button
                onClick={closeAdventureDialogue}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-md active:scale-95 transition-transform"
              >
                새로운 모험 지역으로 출발! 🚀
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
