import React, { useState } from 'react';
import { Trash2, Archive, Sparkles, X, Gamepad2, Hammer, MapPin } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';
import { ItemGraphic } from '../ui/ItemGraphic';

interface BottomActionBarProps {
  currentTab: 'game' | 'restoration' | 'cookstagram' | 'math';
  onOpenHomeMenu: () => void;
  onGoToBoard: () => void;
  onGoToRestoration: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  currentTab,
  onOpenHomeMenu,
  onGoToBoard,
  onGoToRestoration
}) => {
  const {
    board,
    selectedTileIndex,
    sellSelectedItem,
    moveSelectedToInventory,
    inventoryPocket,
    retrieveFromInventory,
    stars,
    restorations
  } = useGameStore();

  const [isBackpackDrawerOpen, setIsBackpackDrawerOpen] = useState(false);

  const selectedCell = selectedTileIndex !== null ? board[selectedTileIndex] : null;
  const item = selectedCell?.item;
  const itemDef = item ? getItemDef(item.chainId, item.level) : null;
  const chainDef = item ? ITEM_CHAINS[item.chainId] : null;

  const isGen = item?.isGenerator;
  const sellPrice = itemDef?.sellPrice || 1;
  const occupiedBackpackCount = inventoryPocket.filter(Boolean).length;
  const nextRestorationNode = restorations.find(r => !r.isRestored);
  const canRestore = nextRestorationNode && stars >= nextRestorationNode.costStars;

  const handleLeftButtonClick = () => {
    if (currentTab !== 'game') {
      onGoToBoard();
    } else {
      onOpenHomeMenu();
    }
  };

  const handleRightButtonClick = () => {
    if (currentTab === 'restoration') {
      onGoToBoard();
    } else {
      onGoToRestoration();
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto select-none mt-1">
      
      {/* Backpack Drawer Mini Popup if open */}
      {isBackpackDrawerOpen && currentTab === 'game' && (
        <div className="mb-2 bg-[#d5e7ff] p-3 rounded-2xl border-2 border-[#8eb3d9] shadow-xl animate-bounceSubtle">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1">
              🧳 셰프 보관함 ({occupiedBackpackCount}/4)
            </span>
            <button
              onClick={() => setIsBackpackDrawerOpen(false)}
              className="text-slate-500 hover:text-slate-800 text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-around gap-2">
            {inventoryPocket.map((pocketItem, idx) => (
              <div
                key={idx}
                onClick={() => pocketItem && retrieveFromInventory(idx)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center relative cursor-pointer shadow-sm transition-transform active:scale-90 ${
                  pocketItem
                    ? 'bg-white border-amber-300 hover:scale-105'
                    : 'bg-white/50 border-dashed border-slate-300'
                }`}
                title={pocketItem ? '클릭 시 보드로 복귀' : '빈 슬롯'}
              >
                {pocketItem ? (
                  <ItemGraphic
                    chainId={pocketItem.chainId}
                    level={pocketItem.level}
                    className="w-11 h-11 object-contain"
                  />
                ) : (
                  <span className="text-slate-300 text-lg font-bold">+</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main 3-Section Bottom Bar matching reference screenshot */}
      <div className="flex items-center justify-between gap-2 px-1">
        
        {/* Left: Round Backpack Button (Board) or Home Button (Other screens) */}
        <button
          onClick={handleLeftButtonClick}
          title={currentTab === 'game' ? '홈 메뉴 및 보관함 열기' : '1. 머지 보드로 복귀'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 shadow-xl border-2 border-white hover:scale-105 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 ${
            currentTab !== 'game'
              ? 'bg-gradient-to-b from-[#2A9D8F] to-[#176259] ring-2 ring-emerald-300'
              : 'bg-gradient-to-b from-[#29b6f6] to-[#0288d1]'
          }`}
        >
          {currentTab === 'game' ? (
            <>
              <img
                src="/extracted/btn_backpack.png"
                alt="Backpack"
                className="w-full h-full object-contain filter drop-shadow"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Badge */}
              {occupiedBackpackCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white shadow">
                  {occupiedBackpackCount}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <Gamepad2 className="w-6 h-6 drop-shadow" />
              <span className="text-[9px] font-black -mt-0.5 tracking-tighter">보드</span>
            </div>
          )}
        </button>

        {/* Center: Sleek Rounded Pill Inspector Bar (#d5e7ff) */}
        <div className="flex-1 h-13 sm:h-14 bg-[#d5e7ff] rounded-full border-2 border-[#8eb3d9] shadow-md flex items-center justify-between px-3 overflow-hidden">
          {currentTab === 'game' ? (
            item && itemDef ? (
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                    <ItemGraphic
                      chainId={item.chainId}
                      level={item.level}
                      isGenerator={isGen}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-xs font-black text-slate-800 truncate">
                      {itemDef.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold truncate">
                      {chainDef?.name} · Lv.{item.level}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {!isGen && (
                    <>
                      <button
                        onClick={moveSelectedToInventory}
                        title="보관함 이동"
                        className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-xs border border-slate-300 active:scale-90"
                      >
                        <Archive className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={sellSelectedItem}
                        title="판매"
                        className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 text-[11px] font-black shadow-xs flex items-center gap-0.5 active:scale-90"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>+{sellPrice}🪙</span>
                      </button>
                    </>
                  )}
                  {isGen && (
                    <span className="text-[10px] font-black text-pink-700 bg-pink-100 px-2 py-1 rounded-lg border border-pink-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-500" />
                      생성기
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 text-xs font-black text-slate-600/90 tracking-tight">
                <span>💡 동일한 아이템 2개를 합쳐 상위 레벨을 만드세요</span>
              </div>
            )
          ) : currentTab === 'restoration' ? (
            <div className="w-full flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <Hammer className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span className="text-xs font-black text-slate-800 truncate">
                  2. 식당 & 유적 복원 진행 중
                </span>
              </div>
              <span className="text-xs font-black text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300 flex-shrink-0">
                보유: {stars}⭐
              </span>
            </div>
          ) : currentTab === 'cookstagram' ? (
            <div className="w-full text-center text-xs font-black text-slate-800">
              📸 3. 쿡스타그램 & 크루 소식
            </div>
          ) : (
            <div className="w-full text-center text-xs font-black text-slate-800">
              📊 4. 수리 경제 & 통계 시뮬레이터
            </div>
          )}
        </div>

        {/* Right: Round Map / Restoration Button */}
        <button
          onClick={handleRightButtonClick}
          title={currentTab === 'restoration' ? '머지 보드로 복귀' : '2. 식당 & 유적 복원 맵으로 이동'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 shadow-xl border-2 border-white hover:scale-105 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 ${
            currentTab === 'restoration'
              ? 'bg-gradient-to-b from-amber-500 to-orange-600 ring-2 ring-amber-300'
              : 'bg-gradient-to-b from-[#29b6f6] to-[#0288d1]'
          }`}
        >
          {currentTab === 'restoration' ? (
            <div className="flex flex-col items-center justify-center text-white">
              <Gamepad2 className="w-6 h-6 drop-shadow" />
              <span className="text-[9px] font-black -mt-0.5 tracking-tighter">보드</span>
            </div>
          ) : (
            <>
              <img
                src="/extracted/btn_map.png"
                alt="Map"
                className="w-full h-full object-contain filter drop-shadow"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Notification ping badge if restoration is ready */}
              {canRestore && (
                <div className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded-full flex items-center justify-center border-2 border-white shadow animate-bounce">
                  ⭐UP!
                </div>
              )}
            </>
          )}
        </button>

      </div>
    </div>
  );
};
