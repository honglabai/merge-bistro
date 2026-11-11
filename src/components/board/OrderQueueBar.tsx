import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Clock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';
import { ItemGraphic } from '../ui/ItemGraphic';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder } = useGameStore();

  const cardBorderColors = [
    'border-amber-400 bg-amber-50/95',
    'border-emerald-400 bg-emerald-50/95',
    'border-sky-400 bg-sky-50/95',
    'border-blue-500 bg-blue-50/95',
    'border-rose-400 bg-rose-50/95'
  ];

  const cardTimers = ['21h 16m', '10d 21h', '1d 21h', '1d 21h', '6d 21h'];

  return (
    <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl shadow-lg border-2 border-[#126b62] select-none">
      
      {/* Window Cafe Street Background with Curtains */}
      <div className="relative w-full h-36 sm:h-40 bg-[#c5e6f5] overflow-hidden">
        <img
          src="/extracted/window_background.png"
          alt="Window Backdrop"
          className="w-full h-full object-cover object-center filter brightness-105"
          onError={(e) => {
            // Fallback gradient if missing
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Soft curtain vignette shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 pointer-events-none" />

        {/* Side Curtains Draping effect */}
        <div className="absolute top-0 left-0 w-8 sm:w-10 h-full bg-gradient-to-r from-amber-50/90 via-amber-100/60 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 sm:w-10 h-full bg-gradient-to-l from-amber-50/90 via-amber-100/60 to-transparent pointer-events-none" />

        {/* Window Sill Shelf on which cards rest */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0e5c54] to-[#16786e] border-t border-[#38b2a3]" />
      </div>

      {/* Floating Order Cards Row */}
      <div className="absolute inset-0 flex items-end px-2 pb-2 overflow-x-auto no-scrollbar gap-2 z-10">
        <AnimatePresence mode="popLayout">
          {orders.map((order, idx) => {
            const itemDef = getItemDef(order.targetChainId, order.targetLevel);
            const chainDef = ITEM_CHAINS[order.targetChainId];

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
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -15 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (hasItem) {
                    fulfillOrder(order.id);
                  }
                }}
                className={`relative w-20 sm:w-22 h-32 sm:h-34 flex-shrink-0 rounded-xl border-3 flex flex-col justify-between items-center p-1.5 shadow-xl cursor-pointer transition-all ${borderTheme} ${
                  hasItem
                    ? 'ring-4 ring-emerald-400 animate-pulse bg-gradient-to-b from-emerald-50 to-emerald-100'
                    : 'hover:shadow-2xl'
                }`}
              >
                {/* Top Badge: Level or Item count */}
                <div className="w-full flex justify-between items-center px-0.5">
                  <span className="text-[9px] font-black bg-amber-400 text-amber-950 px-1 rounded-sm shadow-2xs">
                    +{order.rewardStars}⭐
                  </span>
                  <div className="w-4 h-4 rounded-full bg-white/80 border border-slate-300 flex items-center justify-center text-[10px]">
                    {order.customerAvatar}
                  </div>
                </div>

                {/* 3D Item Illustration */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center my-auto">
                  <ItemGraphic
                    chainId={order.targetChainId}
                    level={order.targetLevel}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                  {hasItem && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounceSubtle">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Progress Pill / Reward Coins */}
                <div className="w-full bg-black/60 rounded-full px-1 py-0.5 text-center flex items-center justify-center gap-0.5">
                  <span className="text-[9px] font-black text-amber-300">
                    +{order.rewardCoins}🪙
                  </span>
                </div>

                {/* Bottom Timer Badge */}
                <div
                  className={`w-full text-center text-[8px] sm:text-[9px] font-black rounded-b-lg py-0.5 mt-0.5 text-white flex items-center justify-center gap-0.5 ${
                    hasItem
                      ? 'bg-emerald-600'
                      : idx === 0
                      ? 'bg-amber-600'
                      : 'bg-[#1b7367]'
                  }`}
                >
                  <Clock className="w-2.5 h-2.5" />
                  <span>{hasItem ? '완료 탭!' : timer}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};
