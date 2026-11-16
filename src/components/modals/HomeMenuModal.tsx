import React from 'react';
import { X, Gamepad2, Hammer, Camera, Calculator, Volume2, VolumeX, RotateCcw, HelpCircle, Zap, Archive, ChevronRight, Sparkles, ChefHat, Compass, Trophy } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sounds } from '../../utils/soundSynthesizer';
import { ItemGraphic } from '../ui/ItemGraphic';

interface HomeMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: 'game' | 'adventure' | 'restoration' | 'cookstagram' | 'math';
  onSelectTab: (tab: 'game' | 'adventure' | 'restoration' | 'cookstagram' | 'math') => void;
  onOpenMyPage: () => void;
  onOpenHelp: () => void;
  onOpenResetConfirm: () => void;
}

export const HomeMenuModal: React.FC<HomeMenuModalProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenMyPage,
  onOpenHelp,
  onOpenResetConfirm
}) => {
  const {
    energy,
    maxEnergy,
    coins,
    stars,
    gems,
    followers,
    chefName,
    chefAvatar,
    chefTitle,
    inventoryPocket,
    retrieveFromInventory,
    freeEnergyRefill,
    restorations,
    continentRegions
  } = useGameStore();

  const [soundOn, setSoundOn] = React.useState(sounds.enabled);

  if (!isOpen) return null;

  const nextRestorationNode = restorations.find(r => !r.isRestored);
  const occupiedBackpackCount = inventoryPocket.filter(Boolean).length;
  const hasClaimableMission = continentRegions.some(r => r.missions.some(m => m.isCompleted && !m.isClaimed));

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-pop select-none">
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-3xl border-4 border-[#8C6239] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#3E2723] via-[#4E342E] to-[#3E2723] text-amber-100 p-4 flex items-center justify-between border-b-2 border-amber-600/40">
          <div
            onClick={() => {
              onClose();
              onOpenMyPage();
            }}
            className="flex items-center gap-2.5 cursor-pointer group active:scale-98 transition-transform"
            title="마이페이지 & 설정 열기"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-sky-300 p-0.5 shadow-md overflow-hidden border-2 border-white group-hover:ring-2 group-hover:ring-amber-300 transition-all">
                <img
                  src={chefAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-400 to-amber-600 text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                49
              </div>
            </div>
            <div>
              <div className="text-sm font-black text-amber-200 flex items-center gap-1.5 group-hover:text-white transition-colors">
                <span>{chefName || '비스트로 총괄 본부'}</span>
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Lv.49
                </span>
              </div>
              <div className="text-[11px] text-amber-100/70 font-semibold flex items-center gap-2 mt-0.5">
                <span>⭐ {stars}</span>
                <span>🪙 {coins.toLocaleString()}</span>
                <span>💎 {gems}</span>
                <span>👥 {followers}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3 overflow-y-auto space-y-3 no-scrollbar">
          
          {/* Main Navigation Section: 1번 머지 보드 & 2번 식당 복원 */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider px-1">
              핵심 게임 모드 이동
            </div>

            {/* 1번: 머지 보드 & 주문 */}
            <button
              onClick={() => {
                onSelectTab('game');
                onClose();
              }}
              className={`w-full py-2 px-2.5 rounded-xl border-2 transition-all flex items-center justify-between shadow-xs active:scale-98 ${
                currentTab === 'game'
                  ? 'bg-gradient-to-r from-[#2A9D8F]/15 to-[#2A9D8F]/5 border-[#2A9D8F] text-[#2A9D8F] ring-2 ring-[#2A9D8F]/20 font-black'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 font-bold'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2A9D8F] to-[#1c6b61] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-black flex items-center gap-1.5 whitespace-nowrap">
                    <span className="truncate">1. 머지 보드 & 주문</span>
                    {currentTab === 'game' && (
                      <span className="text-[9px] bg-[#2A9D8F] text-white px-1.5 py-0.2 rounded-full whitespace-nowrap flex-shrink-0">
                        현재 화면
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    빵, 커피, 디저트를 합성하고 손님 주문 서빙
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
            </button>

            {/* 1.5번: 아스테리아 대륙 모험 지도 (RPG) */}
            <button
              onClick={() => {
                onSelectTab('adventure');
                onClose();
              }}
              className={`w-full py-2 px-2.5 rounded-xl border-2 transition-all flex items-center justify-between shadow-xs active:scale-98 ${
                currentTab === 'adventure'
                  ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/5 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/20 font-black'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 font-bold'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-700 text-white flex items-center justify-center shadow-xs relative flex-shrink-0">
                  <Compass className="w-4 h-4 text-amber-200 animate-spin" />
                  {hasClaimableMission && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-white animate-bounce" />
                  )}
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-black flex items-center gap-1.5 whitespace-nowrap">
                    <span className="truncate">🗺️ 아스테리아 대륙 모험기</span>
                    {hasClaimableMission && (
                      <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full animate-pulse whitespace-nowrap flex-shrink-0">
                        보상 수령!
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    가상 대륙 5대 지역 탐험, RPG 시나리오 퀘스트 & 전설 유물 수집
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
            </button>

            {/* 2번: 식당 & 유적 복원 맵 */}
            <button
              onClick={() => {
                onSelectTab('restoration');
                onClose();
              }}
              className={`w-full py-2 px-2.5 rounded-xl border-2 transition-all flex items-center justify-between shadow-xs active:scale-98 ${
                currentTab === 'restoration'
                  ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/5 border-amber-500 text-amber-900 ring-2 ring-amber-400/20 font-black'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 font-bold'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs relative flex-shrink-0">
                  <Hammer className="w-4 h-4" />
                  {nextRestorationNode && stars >= nextRestorationNode.costStars && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border border-white animate-ping" />
                  )}
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-black flex items-center gap-1.5 whitespace-nowrap">
                    <span className="truncate">2. 식당 & 유적 복원 맵</span>
                    {nextRestorationNode && stars >= nextRestorationNode.costStars && (
                      <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.2 rounded-full animate-bounce whitespace-nowrap flex-shrink-0">
                        복원 가능!
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                    별(⭐)을 사용하여 비스트로 시설 재건 및 스토리 해금
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
            </button>
          </div>

          {/* Sub Features Section: 3번 쿡스타그램 & 4번 수리 경제 시뮬레이터 */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider px-1">
              비스트로 부가 기능
            </div>

            {/* 3번: 쿡스타그램 */}
            <button
              onClick={() => {
                onSelectTab('cookstagram');
                onClose();
              }}
              className={`w-full py-2 px-2.5 rounded-xl border-2 transition-all flex items-center justify-between shadow-xs active:scale-98 ${
                currentTab === 'cookstagram'
                  ? 'bg-gradient-to-r from-pink-500/15 to-rose-500/5 border-pink-500 text-pink-900 font-black'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 font-bold'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-800 truncate whitespace-nowrap">
                    3. 쿡스타그램 & 크루 소식
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    스토리 피드 감상, 좋아요 누르고 보석(💎) 보상 수령
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
            </button>

            {/* 4번: 수리 경제 시뮬레이터 */}
            <button
              onClick={() => {
                onSelectTab('math');
                onClose();
              }}
              className={`w-full py-2 px-2.5 rounded-xl border-2 transition-all flex items-center justify-between shadow-xs active:scale-98 ${
                currentTab === 'math'
                  ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/5 border-indigo-500 text-indigo-900 font-black'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 font-bold'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <Calculator className="w-3.5 h-3.5" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-black text-slate-800 truncate whitespace-nowrap">
                    4. 수리 경제 & 통계 시뮬레이터
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    아이템 생성 확률, 에너지 가치, 코인/별 밸런스 분석
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
            </button>
          </div>

          {/* Quick Chef Inventory Section */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex justify-between items-center px-0.5 whitespace-nowrap">
              <span className="text-[11px] font-black text-slate-700 flex items-center gap-1">
                💎 셰프 보석함 ({occupiedBackpackCount}/4)
              </span>
              <span className="text-[9.5px] text-slate-400 font-semibold">
                클릭 시 보드로 복귀
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {inventoryPocket.map((pocketItem, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (pocketItem) {
                      retrieveFromInventory(idx);
                      onClose();
                    }
                  }}
                  className={`aspect-square rounded-lg border flex items-center justify-center relative cursor-pointer shadow-xs transition-transform active:scale-90 ${
                    pocketItem
                      ? 'bg-amber-50 border-amber-300 hover:scale-105'
                      : 'bg-slate-50 border-dashed border-slate-200'
                  }`}
                  title={pocketItem ? '클릭 시 보드로 복귀' : '빈 슬롯'}
                >
                  {pocketItem ? (
                    <ItemGraphic
                      chainId={pocketItem.chainId}
                      level={pocketItem.level}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    <span className="text-slate-300 text-sm font-bold">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings & Extra Controls */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            {/* Free Energy Refill */}
            <button
              onClick={() => {
                freeEnergyRefill();
              }}
              className="py-2 px-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] font-black flex items-center justify-center gap-1 shadow-xs active:scale-95 whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">무료 에너지 (+50⚡)</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`py-2 px-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 shadow-xs border active:scale-95 transition-all whitespace-nowrap ${
                soundOn
                  ? 'bg-white text-slate-700 border-slate-200'
                  : 'bg-rose-50 text-rose-600 border-rose-200'
              }`}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">효과음 ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">효과음 OFF</span>
                </>
              )}
            </button>

            {/* My Page & Settings */}
            <button
              onClick={() => {
                onClose();
                onOpenMyPage();
              }}
              className="py-2 px-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black flex items-center justify-center gap-1 shadow-xs active:scale-95 whitespace-nowrap"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="whitespace-nowrap">마이페이지 & 설정</span>
            </button>

            {/* Help Guide */}
            <button
              onClick={() => {
                onClose();
                onOpenHelp();
              }}
              className="py-2 px-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-black flex items-center justify-center gap-1 shadow-xs active:scale-95 whitespace-nowrap"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="whitespace-nowrap">플레이 가이드</span>
            </button>

            {/* Reset Game */}
            <button
              onClick={() => {
                onClose();
                onOpenResetConfirm();
              }}
              className="col-span-2 py-1.5 px-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-black flex items-center justify-center gap-1 shadow-xs active:scale-95 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              <span className="whitespace-nowrap">게임 데이터 초기화</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
