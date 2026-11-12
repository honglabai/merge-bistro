import React, { useState } from 'react';
import { Archive, Sparkles, X, Gamepad2, Hammer, Coins, Trash2 } from 'lucide-react';
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
      
      {/* Backpack Drawer Mini Popup */}
      {isBackpackDrawerOpen && currentTab === 'game' && (
        <div className="mb-2 bg-[#FAF7F2] p-3 rounded-2xl border border-[#d6cbbe] shadow-lg">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-semibold text-[#3b291a] flex items-center gap-1.5">
              <Archive className="w-3.5 h-3.5 text-amber-700" />
              셰프 보관함 ({occupiedBackpackCount}/4)
            </span>
            <button
              onClick={() => setIsBackpackDrawerOpen(false)}
              className="text-stone-400 hover:text-stone-700 text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-around gap-2">
            {inventoryPocket.map((pocketItem, idx) => (
              <div
                key={idx}
                onClick={() => pocketItem && retrieveFromInventory(idx)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center relative cursor-pointer shadow-2xs transition-transform active:scale-95 ${
                  pocketItem
                    ? 'bg-white border-[#d8cfc4] hover:border-[#b8ab9b]'
                    : 'bg-[#f4efe8] border-dashed border-[#c5b8a6]'
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
                  <span className="text-stone-300 text-lg font-light">+</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main 3-Section Bottom Bar matching Reference Screenshot */}
      <div className="flex items-center justify-between gap-2 px-1">
        
        {/* Left: Round Backpack Button (Board) or Home Button (Other screens) */}
        <button
          onClick={handleLeftButtonClick}
          title={currentTab === 'game' ? '홈 메뉴 및 보관함 열기' : '1. 머지 보드로 복귀'}
          className="relative w-14 h-14 sm:w-16 sm:h-16 p-0 bg-transparent border-0 hover:scale-102 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 cursor-pointer drop-shadow-sm"
        >
          {currentTab === 'game' ? (
            <>
              <img
                src="/extracted/btn_backpack_clean.png"
                alt="Backpack"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
              {/* Badge */}
              {occupiedBackpackCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-amber-500 text-amber-950 font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-xs tabular-nums">
                  {occupiedBackpackCount}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full rounded-full bg-[#1b6b60] border border-white/80 shadow-sm flex flex-col items-center justify-center text-white">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-[9px] font-semibold -mt-0.5 tracking-tighter">보드</span>
            </div>
          )}
        </button>

        {/* Center: Soft Sage/Mint Capsule Inspector Bar */}
        <div className="flex-1 h-13 sm:h-14 bg-[#eef8f5] rounded-full border border-[#a8d9cf] shadow-inner flex items-center justify-between px-3.5 overflow-hidden">
          {currentTab === 'game' ? (
            item && itemDef ? (
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <ItemGraphic
                      chainId={item.chainId}
                      level={item.level}
                      isGenerator={isGen}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-xs font-semibold text-[#16332d] truncate">
                      {itemDef.name}
                    </div>
                    <div className="text-[10px] text-[#406861] font-medium truncate">
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
                        className="p-1.5 rounded-lg bg-white hover:bg-stone-50 text-[#2a4d46] shadow-2xs border border-[#b8ded6] active:scale-95 transition-colors"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={sellSelectedItem}
                        title="판매"
                        className="px-2.5 py-1 rounded-lg bg-[#b45309] hover:bg-[#92400e] text-white text-[11px] font-semibold shadow-xs flex items-center gap-1 active:scale-95 transition-colors tabular-nums"
                      >
                        <Trash2 className="w-3 h-3" />
                        <Coins className="w-2.5 h-2.5 text-amber-200" />
                        <span>+{sellPrice}</span>
                      </button>
                    </>
                  )}
                  {isGen && (
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      생성기
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-[#2d524b] tracking-tight">
                <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F] flex-shrink-0" />
                <span>동일한 아이템 2개를 드래그하여 합성하세요</span>
              </div>
            )
          ) : currentTab === 'restoration' ? (
            <div className="w-full flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <Hammer className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span className="text-xs font-semibold text-[#16332d] truncate">
                  2. 식당 & 유적 복원 진행 중
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300/80 flex-shrink-0 tabular-nums">
                보유 별: {stars}
              </span>
            </div>
          ) : currentTab === 'cookstagram' ? (
            <div className="w-full text-center text-xs font-semibold text-[#16332d]">
              3. 쿡스타그램 & 크루 소식
            </div>
          ) : (
            <div className="w-full text-center text-xs font-semibold text-[#16332d]">
              4. 수리 경제 & 통계 시뮬레이터
            </div>
          )}
        </div>

        {/* Right: Round Map / Restoration Button */}
        <button
          onClick={handleRightButtonClick}
          title={currentTab === 'restoration' ? '머지 보드로 복귀' : '2. 식당 & 유적 복원 맵으로 이동'}
          className="relative w-14 h-14 sm:w-16 sm:h-16 p-0 bg-transparent border-0 hover:scale-102 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 cursor-pointer drop-shadow-sm"
        >
          {currentTab === 'restoration' ? (
            <div className="w-full h-full rounded-full bg-amber-600 border border-white/80 shadow-sm flex flex-col items-center justify-center text-white">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-[9px] font-semibold -mt-0.5 tracking-tighter">보드</span>
            </div>
          ) : (
            <>
              <img
                src="/extracted/btn_map_clean.png"
                alt="Map"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
              {/* Notification badge if restoration is ready */}
              {canRestore && (
                <div className="absolute -top-1 -right-1 bg-amber-500 text-amber-950 font-bold text-[9px] px-1.5 py-0.2 rounded-full flex items-center justify-center border border-white shadow-xs">
                  복원!
                </div>
              )}
            </>
          )}
        </button>

      </div>
    </div>
  );
};
