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
      
      {/* Bistro Bakery Hero Background with Cat Barista (Compact height: ~15dvh) */}
      <div className="relative w-full h-[15.5dvh] min-h-[125px] max-h-[150px] bg-[#3e2723] overflow-hidden">
        <img
          src="/bistro-window-cat.png"
          alt="Bistro Bakery with Cat Barista"
          className="w-full h-full object-cover object-[center_12%] filter brightness-105"
        />

        {/* Soft atmospheric gradient to provide depth while keeping cat & shop vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55 pointer-events-none" />

        {/* Warm golden light ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/40 via-amber-200/80 to-amber-400/40 pointer-events-none" />

        {/* Bistro Counter Shelf on which compact cards rest */}
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-[#2a1810] via-[#4e342e] to-[#6d4c41] border-t-2 border-[#b87333]/70 shadow-inner" />
      </div>

      {/* Floating Event Badges matching reference screenshot (Compact) */}
      <div className="absolute top-1.5 left-1.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 p-0.5 shadow-md border-2 border-white flex items-center justify-center">
          <span className="text-xs">😊</span>
        </div>
        <span className="text-[7px] font-black text-white bg-slate-900/85 px-1 py-0 rounded-full border border-purple-300 -mt-1 shadow">
          0/12
        </span>
      </div>

      <div className="absolute top-1.5 right-1.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-red-500 p-0.5 shadow-md border-2 border-white flex items-center justify-center">
          <span className="text-xs">🐶</span>
        </div>
        <span className="text-[7px] font-black text-amber-200 bg-slate-900/85 px-1 py-0 rounded-full border border-amber-300 -mt-1 shadow flex items-center gap-0.5">
          <Clock className="w-2 h-2" /> 21h
        </span>
      </div>

      {/* Exactly 5 Compact Floating Order Cards Aligned to the Bottom Sill */}
      <div className="absolute inset-x-0 bottom-0 flex items-end px-1 sm:px-1.5 pb-1 z-10">
        <div className="w-full grid grid-cols-5 gap-0.5 sm:gap-1 items-end">
          <AnimatePresence mode="popLayout">
            {orders.slice(0, 5).map((order, idx) => {
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
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    if (hasItem) {
                      fulfillOrder(order.id);
                    }
                  }}
                  className={`relative w-full h-[68px] sm:h-[72px] rounded-lg border-[1.5px] flex flex-col justify-between items-center p-0.5 pb-0.5 shadow-md cursor-pointer transition-all backdrop-blur-xs select-none ${borderTheme} ${
                    hasItem
                      ? 'ring-2 ring-emerald-400 animate-pulse bg-emerald-50/95'
                      : 'hover:shadow-lg'
                  }`}
                >
                  {/* Top Header: Star reward and Customer Avatar */}
                  <div className="w-full flex justify-between items-center px-0.5 flex-shrink-0 leading-none">
                    <span className="text-[6.5px] sm:text-[7px] font-black bg-amber-400 text-amber-950 px-0.5 py-0 rounded-[2px] shadow-2xs leading-none">
                      +{order.rewardStars}⭐
                    </span>
                    <div className="w-3.5 h-3.5 rounded-full bg-white/95 border border-slate-300 flex items-center justify-center text-[8px] shadow-2xs flex-shrink-0">
                      {order.customerAvatar}
                    </div>
                  </div>

                  {/* 3D Item Illustration (Snug & centered with minimal margin) */}
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center flex-1 min-h-0 my-0">
                    <ItemGraphic
                      chainId={order.targetChainId}
                      level={order.targetLevel}
                      className="w-full h-full object-contain filter drop-shadow-xs"
                    />
                    {hasItem && (
                      <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs animate-bounceSubtle">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Tight Integrated Bottom Action Bar (Coins + Button with zero wasted margin) */}
                  <div className="w-full flex flex-col gap-0 flex-shrink-0 leading-none">
                    {/* Reward Coins */}
                    <div className="w-full bg-black/75 rounded-t-[2px] py-0.5 text-center flex items-center justify-center leading-none">
                      <span className="text-[6.5px] sm:text-[7px] font-black text-amber-300 tracking-tight leading-none">
                        +{order.rewardCoins}🪙
                      </span>
                    </div>

                    {/* Bottom Action / Timer Button */}
                    <div
                      className={`w-full text-center text-[6.5px] sm:text-[7px] font-black rounded-b-[3px] py-0.5 text-white flex items-center justify-center gap-0.5 leading-none ${
                        hasItem
                          ? 'bg-emerald-600'
                          : 'bg-[#1b7367]'
                      }`}
                    >
                      {hasItem ? (
                        <>
                          <Check className="w-2 h-2 stroke-[3]" />
                          <span>납품</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-1.5 h-1.5" />
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
