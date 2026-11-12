import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';
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
    <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl shadow-lg border-2 border-[#8C6239] select-none">
      
      {/* Bistro Bakery Hero Background with Cat Barista & Cozy Cafe */}
      <div className="relative w-full h-44 sm:h-52 bg-[#3e2723] overflow-hidden">
        <img
          src="/bistro-hero.png"
          alt="Bistro Bakery with Cat Barista"
          className="w-full h-full object-cover object-[center_30%] filter brightness-105"
        />

        {/* Soft atmospheric gradient to provide depth while keeping cat & shop vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55 pointer-events-none" />

        {/* Warm golden light ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/40 via-amber-200/80 to-amber-400/40 pointer-events-none" />

        {/* Bistro Counter Shelf on which compact cards rest */}
        <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-gradient-to-t from-[#2a1810] via-[#4e342e] to-[#6d4c41] border-t-2 border-[#b87333]/70 shadow-inner" />
      </div>

      {/* Compact Floating Order Cards Aligned to the Bottom Sill */}
      <div className="absolute inset-0 flex items-end px-2 pb-1 overflow-x-auto no-scrollbar gap-1.5 z-10">
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  if (hasItem) {
                    fulfillOrder(order.id);
                  }
                }}
                className={`relative w-[68px] sm:w-[74px] h-[94px] sm:h-[100px] flex-shrink-0 rounded-xl border-2 flex flex-col justify-between items-center p-1 shadow-xl cursor-pointer transition-all backdrop-blur-xs ${borderTheme} ${
                  hasItem
                    ? 'ring-4 ring-emerald-400 animate-pulse bg-emerald-50/95'
                    : 'hover:shadow-2xl'
                }`}
              >
                {/* Top Header: Star reward and Customer Avatar */}
                <div className="w-full flex justify-between items-center px-0.5">
                  <span className="text-[8px] font-black bg-amber-400 text-amber-950 px-1 rounded-xs shadow-2xs leading-tight">
                    +{order.rewardStars}⭐
                  </span>
                  <div className="w-4 h-4 rounded-full bg-white/90 border border-slate-300 flex items-center justify-center text-[9px] shadow-xs flex-shrink-0">
                    {order.customerAvatar}
                  </div>
                </div>

                {/* 3D Item Illustration (Compact & Clear) */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center my-auto">
                  <ItemGraphic
                    chainId={order.targetChainId}
                    level={order.targetLevel}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                  {hasItem && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-bounceSubtle">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Progress Pill / Reward Coins */}
                <div className="w-full bg-black/65 rounded-full px-0.5 py-0.2 text-center flex items-center justify-center">
                  <span className="text-[8px] font-black text-amber-300 tracking-tight">
                    +{order.rewardCoins}🪙
                  </span>
                </div>

                {/* Bottom Timer Badge */}
                <div
                  className={`w-full text-center text-[7px] sm:text-[8px] font-black rounded-b-md py-0.2 text-white flex items-center justify-center gap-0.5 ${
                    hasItem
                      ? 'bg-emerald-600'
                      : 'bg-[#1b7367]'
                  }`}
                >
                  <Clock className="w-2 h-2" />
                  <span>{hasItem ? '납품' : timer}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
};
