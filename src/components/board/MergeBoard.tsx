import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lock, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef } from '../../data/itemsData';

export const MergeBoard: React.FC = () => {
  const {
    board,
    selectedTileIndex,
    dragOverIndex,
    setDragOverIndex,
    handleTileClick,
    mergeOrMoveTile
  } = useGameStore();

  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIdx(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== targetIndex) {
      setDragOverIndex(targetIndex);
    }
  };

  const handleDragLeave = (targetIndex: number) => {
    if (dragOverIndex === targetIndex) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    setDraggingIdx(null);

    const sourceIndexStr = e.dataTransfer.getData('text/plain');
    if (!sourceIndexStr) return;
    const sourceIndex = parseInt(sourceIndexStr, 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    mergeOrMoveTile(sourceIndex, targetIndex, { x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setDraggingIdx(null);
    setDragOverIndex(null);
  };

  return (
    <div className="bg-gradient-to-b from-[#8C6239] via-[#6D4C41] to-[#4E342E] p-2.5 sm:p-4 rounded-3xl shadow-2xl border-4 border-[#D4A373] select-none touch-none">
      
      {/* 7x9 = 63 Grid Board with carved tray styling */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 aspect-[7/9] w-full max-w-[540px] mx-auto bg-[#3E2723]/95 p-1.5 sm:p-2.5 rounded-2xl shadow-inner border border-[#8C6239]/60">
        {board.map(cell => {
          const isSelected = selectedTileIndex === cell.index;
          const itemDef = cell.item ? getItemDef(cell.item.chainId, cell.item.level) : null;
          const isGen = cell.item?.isGenerator;

          const isDraggable = cell.state === 'OPEN' && !!cell.item && !isGen;
          const isDragCandidate =
            draggingIdx !== null &&
            draggingIdx !== cell.index &&
            cell.item &&
            board[draggingIdx]?.item &&
            board[draggingIdx].item?.chainId === cell.item.chainId &&
            board[draggingIdx].item?.level === cell.item.level;

          const isHoveredTarget = dragOverIndex === cell.index;

          return (
            <motion.div
              id={`tile-${cell.index}`}
              key={cell.index}
              onClick={() => handleTileClick(cell.index)}
              onDragOver={e => handleDragOver(e, cell.index)}
              onDragLeave={() => handleDragLeave(cell.index)}
              onDrop={e => handleDrop(e, cell.index)}
              draggable={isDraggable}
              onDragStartCapture={e => handleDragStart(e, cell.index)}
              onDragEndCapture={handleDragEnd}
              whileHover={{ scale: cell.item ? 1.04 : 1 }}
              whileTap={{ scale: cell.item ? 0.94 : 1 }}
              animate={
                isSelected
                  ? { scale: [1, 0.93, 1], transition: { repeat: Infinity, duration: 1.4 } }
                  : { scale: 1 }
              }
              className={`relative rounded-xl flex flex-col items-center justify-center p-0.5 sm:p-1 cursor-pointer transition-shadow overflow-hidden ${
                isSelected
                  ? 'ring-4 ring-amber-400 z-20 shadow-xl bg-amber-50'
                  : isHoveredTarget && isDragCandidate
                  ? 'ring-4 ring-emerald-400 bg-emerald-50 z-20 animate-pulse'
                  : isDragCandidate
                  ? 'ring-2 ring-amber-300 ring-dashed animate-pulse'
                  : ''
              } ${
                cell.state === 'LOCKED'
                  ? 'bg-gradient-to-br from-[#4E342E] to-[#2E1C18] border border-[#6D4C41]/80 shadow-inner'
                  : cell.state === 'COBWEB'
                  ? 'bg-gradient-to-br from-[#EBE3D5] to-[#D6C8B5] border border-[#C2B29D] shadow-inner'
                  : isGen
                  ? 'bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 border-2 border-amber-400 shadow-md'
                  : cell.item
                  ? 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2] border border-[#EBE3D5] shadow-sm'
                  : 'bg-[#FAF7F2]/40 border border-[#FAF7F2]/20 hover:bg-[#FAF7F2]/60'
              }`}
              style={{ touchAction: 'none' }}
            >
              {/* Tile States */}
              {cell.state === 'LOCKED' && (
                <div className="flex flex-col items-center justify-center text-[#8C6239] opacity-80">
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cell.item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    className="flex flex-col items-center justify-between w-full h-full py-0.5 pointer-events-none"
                  >
                    {/* Generator Header Tag */}
                    {isGen ? (
                      <div className="w-full flex items-center justify-between px-0.5 text-amber-800 text-[8px] font-black">
                        <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-600 animate-pulse" />
                        <span className="bg-amber-400/90 text-amber-950 px-1 rounded-sm text-[7px] sm:text-[8px] shadow-2xs font-extrabold">
                          스포너
                        </span>
                      </div>
                    ) : (
                      <div className="w-full flex justify-end px-0.5">
                        <span className="text-[7px] sm:text-[9px] font-black text-[#B85C38] bg-[#FAF7F2] border border-[#B85C38]/30 px-1 rounded shadow-2xs">
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
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Empty Open Slot */}
              {cell.state === 'OPEN' && !cell.item && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4A373]/40" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Guide Banner */}
      <div className="mt-2.5 text-center text-[10px] sm:text-xs text-[#EBE3D5] font-medium flex items-center justify-center gap-1.5 flex-wrap">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>
          <strong className="text-amber-300">스포너 탭</strong> 재료 스폰 ·{' '}
          <strong className="text-amber-300">동일 레벨 머지</strong> 상위 요리 제작 ·{' '}
          <strong className="text-amber-300">합성 시</strong> 인접 거미줄/상자 연쇄 해금!
        </span>
      </div>
    </div>
  );
};
