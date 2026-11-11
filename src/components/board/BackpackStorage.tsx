import React from 'react';
import { Archive, Plus } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef } from '../../data/itemsData';
import { ItemGraphic } from '../ui/ItemGraphic';

export const BackpackStorage: React.FC = () => {
  const { inventoryPocket, retrieveFromInventory } = useGameStore();

  return (
    <div className="bg-white/95 rounded-3xl p-3 border-2 border-[#D4A373]/50 shadow-md flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Archive className="w-4 h-4 text-[#8C6239]" />
        <span className="text-xs font-black text-[#4E342E]">
          셰프 보관함 (Pocket)
        </span>
        <span className="text-[10px] text-slate-400 hidden sm:inline">
          아이템을 임시 보관해 보드 공간을 확보하세요
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {inventoryPocket.map((item, idx) => {
          const itemDef = item ? getItemDef(item.chainId, item.level) : null;

          return (
            <div
              key={idx}
              onClick={() => item && retrieveFromInventory(idx)}
              className={`w-11 h-11 rounded-2xl border-2 flex flex-col items-center justify-center transition-all relative overflow-hidden ${
                item
                  ? 'bg-[#FAF7F2] border-amber-300 hover:border-amber-400 cursor-pointer shadow-sm hover:scale-105 active:scale-95'
                  : 'bg-[#FAF7F2]/60 border-dashed border-[#EBE3D5] text-slate-300'
              }`}
              title={item ? `${itemDef?.name || '아이템'} (클릭 시 보드로 복귀)` : '빈 보관 슬롯'}
            >
              {item ? (
                <>
                  <ItemGraphic chainId={item.chainId} level={item.level} className="w-9 h-9 p-0.5" />
                  <span className="absolute bottom-0.5 right-0.5 text-[7px] font-black text-white bg-black/60 px-1 rounded-sm">
                    Lv.{item.level}
                  </span>
                </>
              ) : (
                <Plus className="w-4 h-4 opacity-40" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
