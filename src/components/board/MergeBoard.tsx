import React, { useState, useEffect, useRef } from 'react';
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState<{ width: number; height: number; tileSize: number }>({
    width: 350,
    height: 450,
    tileSize: 50
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (cw <= 0 || ch <= 0) return;

      // Fit 7 columns and 9 rows perfectly inside available container
      // to ensure each tile is a 100% mathematically exact square!
      const sizeByWidth = cw / 7;
      const sizeByHeight = ch / 9;
      const tileSize = Math.floor(Math.min(sizeByWidth, sizeByHeight));

      if (tileSize > 0) {
        setBoardSize({
          width: tileSize * 7,
          height: tileSize * 9,
          tileSize
        });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

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
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center select-none touch-none px-0 sm:px-1 overflow-hidden"
    >
      {/* 7x9 = 63 Exact Mathematical 1:1 Square Checkerboard Grid */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl mx-auto flex-shrink-0"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(7, ${boardSize.tileSize}px)`,
          gridTemplateRows: `repeat(9, ${boardSize.tileSize}px)`,
          width: `${boardSize.width}px`,
          height: `${boardSize.height}px`,
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
              whileHover={{ scale: cell.item ? 1.04 : 1 }}
              whileTap={{ scale: cell.item ? 0.94 : 1 }}
              animate={
                isSelected
                  ? { scale: [1, 0.95, 1], transition: { repeat: Infinity, duration: 1.4 } }
                  : { scale: 1 }
              }
              className={`relative flex items-center justify-center cursor-pointer transition-shadow overflow-hidden ${
                isSelected
                  ? 'ring-4 ring-amber-300 ring-inset z-20 shadow-2xl'
                  : isHoveredTarget && isDragCandidate
                  ? 'ring-4 ring-emerald-400 ring-inset bg-emerald-200/50 z-20 animate-pulse'
                  : isDragCandidate
                  ? 'ring-2 ring-amber-300 ring-inset ring-dashed animate-pulse'
                  : ''
              }`}
              style={{
                backgroundColor: tileBgColor,
                width: `${boardSize.tileSize}px`,
                height: `${boardSize.tileSize}px`,
                touchAction: 'none'
              }}
            >
              {/* Tile States */}
              {cell.state === 'LOCKED' && (
                <div className="flex flex-col items-center justify-center text-white/90 drop-shadow">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="text-[8px] font-black tracking-tighter mt-0.5 text-white">
                    상자
                  </span>
                </div>
              )}

              {cell.state === 'COBWEB' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative p-0">
                  <span className="absolute text-white/40 text-2xl sm:text-3xl select-none pointer-events-none z-10 drop-shadow-sm">
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
                    <span className="text-[8px] text-white/80 z-10 font-bold">거미줄</span>
                  )}
                </div>
              )}

              {cell.state === 'OPEN' && cell.item && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cell.item.id}
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.75, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    className="relative w-full h-full flex items-center justify-center p-0 pointer-events-none"
                  >
                    {/* Glowing Magenta Lightning Badge at Bottom-Right */}
                    {isGen && (
                      <div
                        title="스포너 (탭하여 재료 생성)"
                        className="absolute bottom-1 right-1 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-rose-400 border-2 border-white shadow-lg flex items-center justify-center animate-pulse drop-shadow-[0_2px_4px_rgba(236,72,153,0.6)]"
                      >
                        <Zap className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                    )}

                    {/* Maximized 3D Graphic Filling ~96% of Tile for superior mobile usability */}
                    <div
                      className={`w-[96%] h-[96%] flex items-center justify-center ${
                        isSelected ? 'animate-bounceSubtle' : isGen ? 'hover:scale-105' : ''
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
