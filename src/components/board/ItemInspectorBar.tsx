import React from 'react';
import { Trash2, Archive, Info, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';
import { ItemGraphic } from '../ui/ItemGraphic';

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

  const openCells = board.filter(c => c.state === 'OPEN');
  const occupiedOpenCells = openCells.filter(c => !!c.item);
  const occupancyPercent = Math.round((occupiedOpenCells.length / Math.max(1, openCells.length)) * 100);

  if (!item || !itemDef) {
    return (
      <div className="bg-white/95 rounded-3xl p-3 border-2 border-[#D4A373]/50 shadow-md flex items-center justify-between text-xs text-[#4E342E]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          <span>보드의 아이템을 클릭하면 상세 설명, 판매 및 보관 기능이 열립니다.</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <span>보드 점유율:</span>
          <span className={`px-2 py-0.5 rounded-full font-black ${
            occupancyPercent > 85 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
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
    <div className="bg-white rounded-3xl p-3 border-2 border-[#D4A373]/50 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Item info */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border-2 border-[#D4A373] flex items-center justify-center p-1 shadow-inner flex-shrink-0">
          <ItemGraphic chainId={item.chainId} level={item.level} isGenerator={isGen} className="w-full h-full" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-[#4E342E]">{itemDef.name}</h3>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#FAF7F2] text-[#E76F51] border border-[#E76F51]/30">
              Lv.{item.level}
            </span>
            {chainDef && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${chainDef.badgeColor}`}>
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
              className="px-3.5 py-1.5 rounded-xl border border-[#D4A373] bg-[#FAF7F2] hover:bg-[#EBE3D5] text-[#4E342E] text-xs font-black transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
            >
              <Archive className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>보관함</span>
            </button>

            <button
              onClick={sellSelectedItem}
              title="아이템 판매하여 코인 획득"
              className="px-3.5 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-black transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-600" />
              <span>판매 (+{sellPrice}🪙)</span>
            </button>
          </>
        )}

        {isGen && (
          <div className="text-xs text-amber-900 font-black bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>스포너 (클릭 시 재료 스폰)</span>
          </div>
        )}

        <button
          onClick={() => selectTile(null)}
          className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 font-bold"
        >
          선택 해제
        </button>
      </div>
    </div>
  );
};
