import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ItemGraphic } from '../ui/ItemGraphic';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder } = useGameStore();

  const cardBorderColors = [
    'border-amber-400 bg-amber-50/90',
    'border-emerald-400 bg-emerald-50/90',
    'border-sky-400 bg-sky-50/90',
    'border-blue-500 bg-blue-50/90',
    'border-rose-400 bg-rose-50/90'
  ];

  const cardTimers = ['21h', '10d', '1d', '2d', '6d'];

  return (
    <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-b-2xl shadow-lg border-b-2 border-x-2 border-[#8C6239] select-none">
      
      {/* Bistro Bakery Hero Background with Cat Barista (Cat face centered above cards) */}
      <div className="relative w-full h-[14.5dvh] min-h-[120px] max-h-[140px] bg-[#3e2723] overflow-hidden">
        <img
          src="/bistro-window-cat.png"
          alt="Bistro Bakery with Cat Barista"
          className="w-full h-full object-cover object-[center_50%] filter brightness-105"
        />

        {/* Soft atmospheric gradient to provide depth while keeping cat & shop vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45 pointer-events-none" />

        {/* Warm golden light ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/40 via-amber-200/80 to-amber-400/40 pointer-events-none" />

        {/* Bistro Counter Shelf on which compact cards rest */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#2a1810] via-[#4e342e] to-[#6d4c41] border-t border-[#b87333]/70 shadow-inner" />
      </div>

      {/* Floating Event Badges matching reference screenshot (Compact) */}
      <div className="absolute top-1.5 left-1.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 p-0.5 shadow-md border-2 border-white flex items-center justify-center">
          <span className="text-[11px]">😊</span>
        </div>
        <span className="text-[7px] font-black text-white bg-slate-900/85 px-1 py-0 rounded-full border border-purple-300 -mt-1 shadow">
          0/12
        </span>
      </div>

      <div className="absolute top-1.5 right-1.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-red-500 p-0.5 shadow-md border-2 border-white flex items-center justify-center">
          <span className="text-[11px]">🐶</span>
        </div>
        <span className="text-[7px] font-black text-amber-200 bg-slate-900/85 px-1 py-0 rounded-full border border-amber-300 -mt-1 shadow flex items-center gap-0.5">
          <Clock className="w-2 h-2" /> 21h
        </span>
      </div>

      {/* Exactly 4 Compact Order Cards Aligned to the Bottom Sill */}
      <div className="absolute inset-x-0 bottom-0 flex items-end px-1.5 sm:px-2 pb-0.5 z-10">
        <div className="w-full grid grid-cols-4 gap-1 sm:gap-1.5 items-end">
          <AnimatePresence mode="popLayout">
            {orders.slice(0, 4).map((order, idx) => {
              const hasItem = board.some(
                cell =>
                  cell.state === 'OPEN' &&
                  cell.item &&
                  cell.item.chainId === order.targetChainId &&
                  cell.item.level === order.targetLevel &&
                  !cell.item.isGenerator
              );

              const borderTheme = cardBorderColors[idx % cardBorderColors.length];
              const timer = cardTimers[idx % cardTimers.length];

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (hasItem) {
                      fulfillOrder(order.id);
                    }
                  }}
                  className={`relative w-full h-[62px] sm:h-[66px] rounded-lg border-[1.5px] flex flex-col justify-between items-center p-0.5 shadow-md cursor-pointer transition-all backdrop-blur-xs select-none ${borderTheme} ${
                    hasItem
                      ? 'ring-2 ring-emerald-400 animate-pulse bg-emerald-50/95'
                      : 'hover:shadow-lg'
                  }`}
                >
                  {/* 3D Item Illustration Area with Star and Avatar Overlaid directly on the image */}
                  <div className="relative w-full flex-1 flex items-center justify-center p-0 min-h-0 overflow-hidden">
                    {/* Top-Left: Star Reward Overlay */}
                    <span className="absolute top-0.5 left-0.5 z-10 text-[7px] sm:text-[7.5px] font-black bg-amber-400 text-amber-950 px-1 py-0.2 rounded-[2px] shadow-2xs leading-none pointer-events-none">
                      +{order.rewardStars}⭐
                    </span>

                    {/* Top-Right: Customer Avatar Overlay */}
                    <div className="absolute top-0.5 right-0.5 z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/95 border border-slate-300 shadow-2xs flex items-center justify-center text-[8.5px] pointer-events-none">
                      {order.customerAvatar}
                    </div>

                    {/* Ready Checkmark Overlay if item is ready */}
                    {hasItem && (
                      <div className="absolute top-0.5 right-5 z-20 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-bounceSubtle pointer-events-none">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}

                    {/* 3D Item Graphic */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                      <ItemGraphic
                        chainId={order.targetChainId}
                        level={order.targetLevel}
                        className="w-full h-full object-contain filter drop-shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Single Integrated Bottom Row: Coins on Left + Timer/Delivery on Right */}
                  <div
                    className={`w-full flex items-center justify-between px-1 py-0.5 rounded-b-[4px] text-white leading-none ${
                      hasItem ? 'bg-emerald-600 shadow-xs' : 'bg-[#1b7367]'
                    }`}
                  >
                    {/* Left: Reward Coins */}
                    <span className="text-[7.5px] sm:text-[8px] font-black text-amber-300 tracking-tight flex items-center gap-0.5 leading-none">
                      +{order.rewardCoins}🪙
                    </span>

                    {/* Right: Timer or Deliver Button */}
                    <div className="flex items-center gap-0.5 text-[7px] sm:text-[7.5px] font-black text-white leading-none">
                      {hasItem ? (
                        <>
                          <Check className="w-2 h-2 stroke-[3]" />
                          <span>납품</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-1.5 h-1.5 text-white/80" />
                          <span>{timer}</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};
