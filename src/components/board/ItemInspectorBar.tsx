import React from 'react';
import { Trash2, Archive, Info, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';

export const ItemInspectorBar: React.FC = () => {
  const {
    board,
    selectedTileIndex,
    sellSelectedItem,
    moveSelectedToInventory,
    selectTile
  } = useGameStore();

  const selectedCell = selectedTileIndex !== null ? board[selectedTileIndex] : null;
  const item = selectedCell?.item;
  const itemDef = item ? getItemDef(item.chainId, item.level) : null;
  const chainDef = item ? ITEM_CHAINS[item.chainId] : null;

  // Total board occupancy
  const openCells = board.filter(c => c.state === 'OPEN');
  const occupiedOpenCells = openCells.filter(c => !!c.item);
  const occupancyPercent = Math.round((occupiedOpenCells.length / Math.max(1, openCells.length)) * 100);

  if (!item || !itemDef) {
    return (
      <div className="bg-white/95 rounded-2xl p-3 border border-cream-300 shadow-sm flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          <span>아이템을 클릭하면 상세 정보, 판매 및 보관 메뉴가 열립니다.</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span>보드 점유율:</span>
          <span className={`px-2 py-0.5 rounded-full font-bold ${
            occupancyPercent > 85 ? 'bg-rose-100 text-rose-700' : 'bg-sage-100 text-sage-700'
          }`}>
            {occupancyPercent}% ({occupiedOpenCells.length}/{openCells.length})
          </span>
        </div>
      </div>
    );
  }

  const isGen = item.isGenerator;
  const sellPrice = itemDef.sellPrice;

  return (
    <div className="bg-white rounded-2xl p-3 border border-cream-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Item info */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
          {itemDef.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900">{itemDef.name}</h3>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
              Lv.{item.level}
            </span>
            {chainDef && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${chainDef.badgeColor}`}>
                {chainDef.name}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5 max-w-md line-clamp-1">
            {itemDef.description}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {!isGen && (
          <>
            <button
              onClick={moveSelectedToInventory}
              title="보관함(인벤토리)으로 이동"
              className="px-3 py-1.5 rounded-xl border border-cream-300 bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
            >
              <Archive className="w-3.5 h-3.5 text-slate-500" />
              <span>보관함</span>
            </button>

            <button
              onClick={sellSelectedItem}
              title="아이템 판매하여 코인 획득"
              className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-600" />
              <span>판매 (+{sellPrice}🪙)</span>
            </button>
          </>
        )}

        {isGen && (
          <div className="text-xs text-amber-700 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>생성기 (클릭 시 재료 스폰)</span>
          </div>
        )}

        <button
          onClick={() => selectTile(null)}
          className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
        >
          선택 해제
        </button>
      </div>
    </div>
  );
};
