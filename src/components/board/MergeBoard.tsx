import React from 'react';
import { Zap, Lock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef } from '../../data/itemsData';

export const MergeBoard: React.FC = () => {
  const { board, selectedTileIndex, handleTileClick, mergeOrMoveTile } = useGameStore();

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndexStr = e.dataTransfer.getData('text/plain');
    if (!sourceIndexStr) return;
    const sourceIndex = parseInt(sourceIndexStr, 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    mergeOrMoveTile(sourceIndex, targetIndex);
  };

  return (
    <div className="bg-wood-800 p-2 sm:p-3.5 rounded-3xl shadow-2xl border-4 border-wood-600 select-none">
      
      {/* 7x9 = 63 Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 aspect-[7/9] w-full max-w-[540px] mx-auto bg-wood-900/90 p-1.5 sm:p-2.5 rounded-2xl shadow-inner">
        {board.map(cell => {
          const isSelected = selectedTileIndex === cell.index;
          const itemDef = cell.item ? getItemDef(cell.item.chainId, cell.item.level) : null;
          const isGen = cell.item?.isGenerator;

          // Drag eligibility: must be OPEN and have non-generator item
          const isDraggable = cell.state === 'OPEN' && !!cell.item && !isGen;

          return (
            <div
              key={cell.index}
              onClick={() => handleTileClick(cell.index)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, cell.index)}
              draggable={isDraggable}
              onDragStart={e => handleDragStart(e, cell.index)}
              className={`relative rounded-xl flex flex-col items-center justify-center p-0.5 sm:p-1 cursor-pointer transition-all duration-150 overflow-hidden ${
                isSelected
                  ? 'ring-4 ring-amber-400 scale-95 z-20 shadow-lg bg-amber-50'
                  : 'hover:brightness-105 active:scale-95'
              } ${
                cell.state === 'LOCKED'
                  ? 'bg-gradient-to-br from-wood-800 to-wood-950 border border-wood-700/60 shadow-inner'
                  : cell.state === 'COBWEB'
                  ? 'bg-gradient-to-br from-cream-300 to-cream-400 border border-cream-400/80 shadow-inner'
                  : isGen
                  ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-400 shadow-md ring-1 ring-amber-300'
                  : cell.item
                  ? 'bg-cream-50 border border-cream-300 shadow-sm'
                  : 'bg-cream-100/70 border border-cream-200/50 hover:bg-cream-100'
              }`}
            >
              {/* Tile States Rendering */}
              {cell.state === 'LOCKED' && (
                <div className="flex flex-col items-center justify-center text-wood-500 opacity-80">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[8px] sm:text-[9px] font-bold mt-0.5 tracking-tighter">
                    상자
                  </span>
                </div>
              )}

              {cell.state === 'COBWEB' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <span className="absolute text-slate-400/40 text-lg sm:text-2xl select-none pointer-events-none">
                    🕸️
                  </span>
                  {cell.item ? (
                    <div className="opacity-75 flex flex-col items-center z-10">
                      <span className="text-sm sm:text-xl filter grayscale contrast-125">
                        {itemDef?.icon || '📦'}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-black text-slate-600 bg-white/70 px-1 rounded -mt-0.5">
                        Lv.{cell.item.level}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[8px] text-slate-400 z-10 font-medium">거미줄</span>
                  )}
                </div>
              )}

              {cell.state === 'OPEN' && cell.item && (
                <div className="flex flex-col items-center justify-between w-full h-full py-0.5">
                  {/* Generator Header Tag */}
                  {isGen ? (
                    <div className="w-full flex items-center justify-between px-0.5 text-amber-800 text-[8px] font-black">
                      <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-600 animate-pulse" />
                      <span className="bg-amber-300/80 px-1 rounded-sm text-[7px] sm:text-[8px]">
                        생성기
                      </span>
                    </div>
                  ) : (
                    <div className="w-full flex justify-end px-0.5">
                      <span className="text-[7px] sm:text-[9px] font-black text-terracotta-600 bg-terracotta-50 border border-terracotta-200/80 px-1 rounded">
                        Lv.{cell.item.level}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`text-lg sm:text-2xl transition-transform ${
                      isSelected ? 'animate-bounceSubtle' : isGen ? 'hover:scale-110' : ''
                    }`}
                  >
                    {itemDef?.icon || '📦'}
                  </div>

                  {/* Item Name */}
                  <span className="text-[8px] sm:text-[9px] font-bold text-slate-800 truncate max-w-full px-0.5 text-center leading-tight">
                    {itemDef?.name || '아이템'}
                  </span>
                </div>
              )}

              {/* Empty Open Slot */}
              {cell.state === 'OPEN' && !cell.item && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cream-300/60" />
              )}
            </div>
          );
        })}
      </div>

      {/* Guide Banner */}
      <div className="mt-2.5 text-center text-[10px] sm:text-xs text-cream-200 font-medium flex items-center justify-center gap-1.5 flex-wrap">
        <span>💡</span>
        <span>
          <strong className="text-amber-300">생성기</strong> 클릭 시 재료 스폰 ·{' '}
          <strong className="text-amber-300">동일 레벨 아이템</strong> 드래그/클릭 시 상위 합성 ·{' '}
          <strong className="text-amber-300">합성 시</strong> 인접 상자/거미줄 해금!
        </span>
      </div>
    </div>
  );
};
