import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lock, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ItemGraphic } from '../ui/ItemGraphic';

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
    <div className="w-full h-full flex flex-col items-center justify-center select-none touch-none px-0 sm:px-1">
      {/* 7x9 = 63 Seamless Edge-to-Edge Checkerboard Grid */}
      <div
        className="w-full max-h-full rounded-2xl overflow-hidden shadow-2xl"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(9, minmax(0, 1fr))',
          aspectRatio: '7 / 9',
          gap: 0
        }}
      >
        {board.map(cell => {
          const isSelected = selectedTileIndex === cell.index;
          const isGen = cell.item?.isGenerator;

          // 7 columns grid calculation
          const row = Math.floor(cell.index / 7);
          const col = cell.index % 7;
          const isLight = (row + col) % 2 === 0;

          // Exact seamless checkerboard colors
          // Light: #97c0e0, Dark: #7fb0d8, Cobweb: #5a8c2f (olive green)
          const isOliveTile = cell.state === 'COBWEB' || cell.state === 'LOCKED';
          const tileBgColor = isOliveTile
            ? cell.state === 'LOCKED'
              ? '#4a7526'
              : '#5a8c2f'
            : isLight
            ? '#97c0e0'
            : '#7fb0d8';

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
              whileHover={{ scale: cell.item ? 1.03 : 1 }}
              whileTap={{ scale: cell.item ? 0.96 : 1 }}
              className={`relative aspect-square flex items-center justify-center cursor-pointer transition-shadow overflow-hidden ${
                isSelected
                  ? 'ring-2 ring-amber-300 ring-inset z-20 shadow-md'
                  : isHoveredTarget && isDragCandidate
                  ? 'ring-2 ring-emerald-400 ring-inset bg-emerald-300/30 z-20'
                  : isDragCandidate
                  ? 'ring-1.5 ring-amber-300/80 ring-inset ring-dashed'
                  : ''
              }`}
              style={{
                backgroundColor: tileBgColor,
                touchAction: 'none'
              }}
            >
              {/* Tile States */}
              {cell.state === 'LOCKED' && (
                <div className="flex flex-col items-center justify-center text-white/90 drop-shadow-xs">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="text-[8px] font-semibold tracking-tighter mt-0.5 text-white">
                    상자
                  </span>
                </div>
              )}

              {cell.state === 'COBWEB' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative p-0">
                  <span className="absolute text-white/40 text-2xl sm:text-3xl select-none pointer-events-none z-10 drop-shadow-xs">
                    🕸️
                  </span>
                  {cell.item ? (
                    <div className="w-[96%] h-[96%] flex items-center justify-center z-0 relative opacity-85">
                      <ItemGraphic
                        chainId={cell.item.chainId}
                        level={cell.item.level}
                        isGenerator={cell.item.isGenerator}
                        className="w-full h-full filter brightness-95"
                      />
                    </div>
                  ) : (
                    <span className="text-[8px] text-white/80 z-10 font-medium">거미줄</span>
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
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    className="relative w-full h-full flex items-center justify-center p-0 pointer-events-none"
                  >
                    {/* Quiet Spawner Generator Badge at Bottom-Right */}
                    {isGen && (
                      <div
                        title="스포너 (탭하여 재료 생성)"
                        className="absolute bottom-1 right-1 z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 border border-white shadow-xs flex items-center justify-center text-amber-950"
                      >
                        <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-950 fill-amber-950" />
                      </div>
                    )}

                    {/* Maximized 3D Graphic Filling ~96% of Tile */}
                    <div
                      className={`w-[96%] h-[96%] flex items-center justify-center ${
                        isSelected ? 'scale-105' : ''
                      }`}
                    >
                      <ItemGraphic
                        chainId={cell.item.chainId}
                        level={cell.item.level}
                        isGenerator={isGen}
                        className="w-full h-full"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
