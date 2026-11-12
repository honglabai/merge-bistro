import React from 'react';
import { X, Gamepad2, Hammer, Camera, Calculator, Volume2, VolumeX, RotateCcw, HelpCircle, Zap, Archive, ChevronRight, Star, Coins, Gem, Users } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sounds } from '../../utils/soundSynthesizer';
import { ItemGraphic } from '../ui/ItemGraphic';

interface HomeMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: 'game' | 'restoration' | 'cookstagram' | 'math';
  onSelectTab: (tab: 'game' | 'restoration' | 'cookstagram' | 'math') => void;
  onOpenHelp: () => void;
  onOpenResetConfirm: () => void;
}

export const HomeMenuModal: React.FC<HomeMenuModalProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
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
    inventoryPocket,
    retrieveFromInventory,
    freeEnergyRefill,
    restorations
  } = useGameStore();

  const [soundOn, setSoundOn] = React.useState(sounds.enabled);

  if (!isOpen) return null;

  const nextRestorationNode = restorations.find(r => !r.isRestored);
  const occupiedBackpackCount = inventoryPocket.filter(Boolean).length;

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-2xl border border-[#b89f82] shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header: Dark Bistro Spruce / Wood */}
        <div className="bg-[#0b483e] text-white p-4 flex items-center justify-between border-b border-[#1b6b60]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-[#1b6b60] p-0.5 shadow-sm overflow-hidden border border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-amber-950 font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-xs">
                49
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                <span>비스트로 총괄 본부</span>
                <span className="text-[10px] bg-white/15 text-emerald-100 px-2 py-0.5 rounded-full border border-white/20 font-medium">
                  Lv.49 매니저
                </span>
              </div>
              <div className="text-xs text-emerald-100/80 font-medium flex items-center gap-2.5 mt-0.5 tabular-nums">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {stars}
                </span>
                <span className="flex items-center gap-1">
                  <Coins className="w-3 h-3 text-amber-300" />
                  {coins.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Gem className="w-3 h-3 text-rose-300" />
                  {gems}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-sky-300" />
                  {followers}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center active:scale-95 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
          
          {/* Main Navigation Section */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
              핵심 모드
            </div>

            {/* 1번: 머지 보드 & 주문 */}
            <button
              onClick={() => {
                onSelectTab('game');
                onClose();
              }}
              className={`w-full p-3 rounded-xl border transition-colors flex items-center justify-between active:scale-98 ${
                currentTab === 'game'
                  ? 'bg-[#eef8f5] border-[#2A9D8F] text-[#16332d] shadow-2xs'
                  : 'bg-white hover:bg-stone-50 border-[#e5ded3] text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2A9D8F] text-white flex items-center justify-center shadow-xs">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    <span>1. 머지 보드 및 주문 서빙</span>
                    {currentTab === 'game' && (
                      <span className="text-[9px] bg-[#2A9D8F] text-white px-1.5 py-0.2 rounded-full font-medium">
                        진행 중
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                    베이커리, 커피, 디저트를 합성하고 손님 주문 납품
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* 2번: 식당 & 유적 복원 맵 */}
            <button
              onClick={() => {
                onSelectTab('restoration');
                onClose();
              }}
              className={`w-full p-3 rounded-xl border transition-colors flex items-center justify-between active:scale-98 ${
                currentTab === 'restoration'
                  ? 'bg-amber-50/80 border-amber-600 text-amber-950 shadow-2xs'
                  : 'bg-white hover:bg-stone-50 border-[#e5ded3] text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  <Hammer className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    <span>2. 식당 및 유적 복원</span>
                    {nextRestorationNode && stars >= nextRestorationNode.costStars && (
                      <span className="text-[9px] bg-amber-500 text-amber-950 font-bold px-1.5 py-0.2 rounded-full">
                        복원 가능
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                    별을 사용하여 비스트로 시설 재건 및 스토리 해금
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Sub Features Section */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
              추가 기능
            </div>

            {/* 3번: 쿡스타그램 */}
            <button
              onClick={() => {
                onSelectTab('cookstagram');
                onClose();
              }}
              className={`w-full p-3 rounded-xl border transition-colors flex items-center justify-between active:scale-98 ${
                currentTab === 'cookstagram'
                  ? 'bg-rose-50/70 border-rose-500 text-rose-950 shadow-2xs'
                  : 'bg-white hover:bg-stone-50 border-[#e5ded3] text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#b04a6e] text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-stone-800">
                    3. 쿡스타그램 & 크루 소식
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                    비스트로 일상 스토리 감상 및 보석 보상 수령
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* 4번: 수리 경제 시뮬레이터 */}
            <button
              onClick={() => {
                onSelectTab('math');
                onClose();
              }}
              className={`w-full p-3 rounded-xl border transition-colors flex items-center justify-between active:scale-98 ${
                currentTab === 'math'
                  ? 'bg-indigo-50/70 border-indigo-500 text-indigo-950 shadow-2xs'
                  : 'bg-white hover:bg-stone-50 border-[#e5ded3] text-stone-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#435388] text-white flex items-center justify-center shadow-xs">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-stone-800">
                    4. 수리 경제 & 통계 분석
                  </div>
                  <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                    생성 확률, 에너지 효율, 재화 밸런스 데이터
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Quick Chef Inventory Section */}
          <div className="bg-white p-3.5 rounded-xl border border-[#e5ded3] shadow-2xs space-y-2">
            <div className="flex justify-between items-center px-0.5">
              <span className="text-xs font-semibold text-[#3b291a] flex items-center gap-1.5">
                <Archive className="w-3.5 h-3.5 text-amber-700" />
                셰프 보관함 ({occupiedBackpackCount}/4)
              </span>
              <span className="text-[10px] text-stone-400 font-medium">
                탭하여 보드로 이동
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {inventoryPocket.map((pocketItem, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (pocketItem) {
                      retrieveFromInventory(idx);
                      onClose();
                    }
                  }}
                  className={`aspect-square rounded-lg border flex items-center justify-center relative cursor-pointer shadow-2xs transition-transform active:scale-95 ${
                    pocketItem
                      ? 'bg-[#fcfaf7] border-[#d8cfc4] hover:border-[#b8ab9b]'
                      : 'bg-[#f7f4ee] border-dashed border-[#d6cbbe]'
                  }`}
                  title={pocketItem ? '클릭 시 보드로 복귀' : '빈 슬롯'}
                >
                  {pocketItem ? (
                    <ItemGraphic
                      chainId={pocketItem.chainId}
                      level={pocketItem.level}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="text-stone-300 text-sm font-light">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings & Extra Controls */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Free Energy Refill */}
            <button
              onClick={() => {
                freeEnergyRefill();
              }}
              className="p-2.5 rounded-lg bg-[#1b7367] hover:bg-[#238779] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>에너지 충전 (+50)</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs border active:scale-95 transition-colors ${
                soundOn
                  ? 'bg-white hover:bg-stone-50 text-stone-700 border-[#e5ded3]'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>효과음 켜짐</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                  <span>효과음 꺼짐</span>
                </>
              )}
            </button>

            {/* Help Guide */}
            <button
              onClick={() => {
                onClose();
                onOpenHelp();
              }}
              className="p-2.5 rounded-lg bg-white hover:bg-stone-50 text-stone-700 border border-[#e5ded3] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>게임 가이드</span>
            </button>

            {/* Reset Game */}
            <button
              onClick={() => {
                onClose();
                onOpenResetConfirm();
              }}
              className="p-2.5 rounded-lg bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-[#e5ded3] hover:border-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>데이터 초기화</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
