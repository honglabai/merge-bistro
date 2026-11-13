import React, { useState } from 'react';
import { Trash2, Archive, Sparkles, X, Gamepad2, Hammer, MapPin, Settings } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';
import { ItemGraphic } from '../ui/ItemGraphic';

interface BottomActionBarProps {
  currentTab: 'game' | 'restoration' | 'cookstagram' | 'math';
  onOpenHomeMenu: () => void;
  onGoToBoard: () => void;
  onGoToRestoration: () => void;
  onOpenMyPage: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  currentTab,
  onOpenHomeMenu,
  onGoToBoard,
  onGoToRestoration,
  onOpenMyPage
}) => {
  const {
    board,
    selectedTileIndex,
    sellSelectedItem,
    moveSelectedToInventory,
    inventoryPocket,
    retrieveFromInventory,
    stars,
    restorations,
    chefAvatar
  } = useGameStore();

  const [isBackpackDrawerOpen, setIsBackpackDrawerOpen] = useState(false);

  const selectedCell = selectedTileIndex !== null ? board[selectedTileIndex] : null;
  const item = selectedCell?.item;
  const itemDef = item ? getItemDef(item.chainId, item.level) : null;
  const chainDef = item ? ITEM_CHAINS[item.chainId] : null;

  const isGen = item?.isGenerator;
  const sellPrice = itemDef?.sellPrice || 1;
  const occupiedBackpackCount = inventoryPocket.filter(Boolean).length;

  const handleLeftButtonClick = () => {
    if (currentTab !== 'game') {
      onGoToBoard();
    } else {
      onOpenHomeMenu();
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto select-none mt-1">
      
      {/* Backpack Drawer Mini Popup if open */}
      {isBackpackDrawerOpen && currentTab === 'game' && (
        <div className="mb-2 bg-[#d5e7ff] p-3 rounded-2xl border-2 border-[#8eb3d9] shadow-xl animate-bounceSubtle">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1">
              💎 셰프 보석함 ({occupiedBackpackCount}/4)
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

      {/* Main 3-Section Bottom Bar matching reference screenshot (Compact) */}
      <div className="flex items-center justify-between gap-1.5 px-1">
        
        {/* Left: Round Jewelbox Button (Board) or Home Button (Other screens) */}
        <button
          onClick={handleLeftButtonClick}
          title={currentTab === 'game' ? '보석함 (보관함) & 메뉴 열기' : '1. 머지 보드로 복귀'}
          className="relative w-11 h-11 sm:w-12 sm:h-12 p-0 bg-transparent border-0 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 cursor-pointer drop-shadow-md"
        >
          {currentTab === 'game' ? (
            <>
              <img
                src="/extracted/btn_jewelbox_clean.png"
                alt="Jewel Box"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
              {/* Badge */}
              {occupiedBackpackCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                  {occupiedBackpackCount}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2A9D8F] to-[#176259] border-2 border-white shadow-md flex flex-col items-center justify-center text-white">
              <Gamepad2 className="w-5 h-5 drop-shadow" />
              <span className="text-[8px] font-black -mt-0.5 tracking-tighter">보드</span>
            </div>
          )}
        </button>

        {/* Center: Sleek Rounded Pill Inspector Bar (#d5e7ff) */}
        <div className="flex-1 h-11 sm:h-12 bg-[#d5e7ff] rounded-full border-2 border-[#8eb3d9] shadow-sm flex items-center justify-between px-2.5 overflow-hidden">
          {currentTab === 'game' ? (
            item && itemDef ? (
              <div className="w-full flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center">
                    <ItemGraphic
                      chainId={item.chainId}
                      level={item.level}
                      isGenerator={isGen}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-[11px] sm:text-xs font-black text-slate-800 truncate">
                      {itemDef.name}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 font-bold truncate">
                      {chainDef?.name} · Lv.{item.level}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!isGen && (
                    <>
                      <button
                        onClick={moveSelectedToInventory}
                        title="보관함 이동"
                        className="p-1 rounded-md bg-white/90 hover:bg-white text-slate-700 shadow-2xs border border-slate-300 active:scale-90"
                      >
                        <Archive className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                      <button
                        onClick={sellSelectedItem}
                        title="판매"
                        className="px-1.5 py-0.5 rounded-md bg-amber-400 hover:bg-amber-300 text-amber-950 text-[10px] font-black shadow-2xs flex items-center gap-0.5 active:scale-90"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>+{sellPrice}🪙</span>
                      </button>
                    </>
                  )}
                  {isGen && (
                    <span className="text-[9px] font-black text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded-md border border-pink-300 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-pink-500" />
                      생성기
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-1 text-[11px] font-black text-slate-600/90 tracking-tight">
                <span>💡 동일한 아이템 2개를 합쳐 상위 레벨을 만드세요</span>
              </div>
            )
          ) : currentTab === 'restoration' ? (
            <div className="w-full flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <Hammer className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span className="text-xs font-black text-slate-800 truncate">
                  2. 식당 & 유적 복원 진행 중
                </span>
              </div>
              <span className="text-[11px] font-black text-amber-700 bg-amber-100/90 px-1.5 py-0.5 rounded-full border border-amber-300 flex-shrink-0">
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

        {/* Right: Settings & My Page Button (Swapped from Top-Left) */}
        <button
          onClick={onOpenMyPage}
          title="마이페이지 & 게임 설정"
          className="relative w-11 h-11 sm:w-12 sm:h-12 p-0 bg-transparent border-0 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center flex-shrink-0 cursor-pointer drop-shadow-md"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-sky-300 p-0.5 shadow-md overflow-hidden border-2 border-white hover:ring-2 hover:ring-amber-300 transition-all">
            <img
              src={chefAvatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"}
              alt="Chef Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Level Star Badge */}
          <div className="absolute -bottom-1 -left-1 bg-gradient-to-br from-amber-400 to-amber-600 text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
            49
          </div>
          {/* Settings Gear Badge */}
          <div className="absolute -top-1 -right-1 bg-stone-800 text-white p-0.5 rounded-full border border-white shadow flex items-center justify-center">
            <Settings className="w-2.5 h-2.5 text-amber-300" />
          </div>
        </button>

      </div>
    </div>
  );
};
