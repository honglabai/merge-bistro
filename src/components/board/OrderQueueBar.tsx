import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Star, Coins, Award, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ItemGraphic } from '../ui/ItemGraphic';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder } = useGameStore();

  const cardTimers = ['21h', '10d', '1d', '2d', '6d'];

  return (
    <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-b-2xl border-b border-x border-[#8C6239]/80 select-none shadow-sm">
      
      {/* Bistro Bakery Hero Background with Cat Barista (Top cropped so cat sits high & clear) */}
      <div className="relative w-full h-36 sm:h-40 bg-[#2d1b14] overflow-hidden">
        <img
          src="/bistro-window-cat.png"
          alt="Bistro Bakery with Cat Barista"
          className="w-full h-full object-cover object-[center_20%] filter brightness-105"
        />

        {/* Soft atmospheric gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/60 pointer-events-none" />

        {/* Subtle brass light highlight */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-300/40 pointer-events-none" />

        {/* Bistro Counter Shelf on which compact cards rest */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[#1f130c] via-[#3a2218] to-[#543425] border-t border-[#b87333]/60 shadow-inner" />
      </div>

      {/* Floating Side Badges: Quiet bistro pass & event badges */}
      <div className="absolute top-2 left-2.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-[#0b483e]/90 border border-[#2fa896]/70 shadow-sm flex items-center justify-center text-amber-300">
          <Award className="w-4 h-4" />
        </div>
        <span className="text-[8px] font-semibold text-emerald-100 bg-[#042d27]/95 px-1.5 py-0.2 rounded-full border border-[#2fa896]/50 -mt-1 shadow-xs tabular-nums">
          0/12
        </span>
      </div>

      <div className="absolute top-2 right-2.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-[#0b483e]/90 border border-[#2fa896]/70 shadow-sm flex items-center justify-center text-amber-300">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-[8px] font-semibold text-amber-200 bg-[#042d27]/95 px-1.5 py-0.2 rounded-full border border-[#2fa896]/50 -mt-1 shadow-xs flex items-center gap-0.5 tabular-nums">
          <Clock className="w-2 h-2" /> 21h
        </span>
      </div>

      {/* Order Cards Carousel: Resting on the bistro counter shelf */}
      <div className="absolute inset-0 flex items-end px-2.5 pb-1 overflow-x-auto no-scrollbar gap-1.5 z-10">
        <AnimatePresence mode="popLayout">
          {orders.map((order, idx) => {
            const hasItem = board.some(
              cell =>
                cell.state === 'OPEN' &&
                cell.item &&
                cell.item.chainId === order.targetChainId &&
                cell.item.level === order.targetLevel &&
                !cell.item.isGenerator
            );

            const timer = cardTimers[idx % cardTimers.length];

            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -12 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (hasItem) {
                    fulfillOrder(order.id);
                  }
                }}
                className={`relative w-[68px] sm:w-[74px] h-[94px] sm:h-[100px] flex-shrink-0 rounded-xl flex flex-col justify-between items-center p-1 shadow-sm cursor-pointer transition-colors ${
                  hasItem
                    ? 'bg-[#f4faf7] border-2 border-[#2A9D8F] shadow-md'
                    : 'bg-[#fcfaf7] border border-[#d8cfc4] hover:border-[#b8ab9b]'
                }`}
              >
                {/* Card Header: Star reward & Customer Avatar */}
                <div className="w-full flex justify-between items-center px-0.5">
                  <span className="text-[8px] font-semibold bg-amber-100 text-amber-900 border border-amber-300/80 px-1 rounded-xs flex items-center gap-0.5 tabular-nums leading-tight">
                    <Star className="w-2 h-2 text-amber-500 fill-amber-400" />
                    +{order.rewardStars}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-[#f0eae1] border border-[#d8cfc4] flex items-center justify-center text-[10px] shadow-2xs flex-shrink-0">
                    {order.customerAvatar}
                  </div>
                </div>

                {/* 3D Item Illustration */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center my-auto">
                  <ItemGraphic
                    chainId={order.targetChainId}
                    level={order.targetLevel}
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                  {hasItem && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                {/* Reward Coins */}
                <div className="w-full bg-[#241a13]/85 rounded-full px-1 py-0.2 text-center flex items-center justify-center gap-0.5">
                  <Coins className="w-2 h-2 text-amber-300" />
                  <span className="text-[8px] font-semibold text-amber-200 tabular-nums">
                    +{order.rewardCoins}
                  </span>
                </div>

                {/* Bottom Action / Timer Pill */}
                <div
                  className={`w-full text-center text-[7px] sm:text-[8px] font-semibold rounded-b-lg py-0.2 text-white flex items-center justify-center gap-0.5 ${
                    hasItem
                      ? 'bg-[#2A9D8F] hover:bg-[#238779]'
                      : 'bg-[#4a3b32]/75 text-stone-200'
                  }`}
                >
                  {hasItem ? (
                    <>
                      <Check className="w-2 h-2 stroke-[2.5]" />
                      <span>납품</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-2 h-2 text-stone-400" />
                      <span>{timer}</span>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};
