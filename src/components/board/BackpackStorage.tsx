import React from 'react';
import { Archive, Plus } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef } from '../../data/itemsData';

export const BackpackStorage: React.FC = () => {
  const { inventoryPocket, retrieveFromInventory } = useGameStore();

  return (
    <div className="bg-white/95 rounded-2xl p-3 border border-cream-300 shadow-sm flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Archive className="w-4 h-4 text-wood-600" />
        <span className="text-xs font-extrabold text-slate-800">
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
              className={`w-10 h-10 rounded-xl border flex flex-col items-center justify-center transition-all ${
                item
                  ? 'bg-cream-50 border-amber-300 hover:border-amber-400 cursor-pointer shadow-sm hover:scale-105 active:scale-95'
                  : 'bg-cream-100/60 border-dashed border-cream-300 text-slate-300'
              }`}
              title={item ? `${itemDef?.name || '아이템'} (클릭 시 보드로 복귀)` : '빈 보관 슬롯'}
            >
              {item ? (
                <>
                  <span className="text-base">{itemDef?.icon || '📦'}</span>
                  <span className="text-[7px] font-black text-terracotta-700 -mt-0.5">
                    Lv.{item.level}
                  </span>
                </>
              ) : (
                <Plus className="w-3.5 h-3.5 opacity-40" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
