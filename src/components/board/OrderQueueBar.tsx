import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Flame } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ItemGraphic } from '../ui/ItemGraphic';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder, vipRushOrder } = useGameStore();

  const cardBorderColors = [
    'border-amber-400 bg-amber-50/90',
    'border-emerald-400 bg-emerald-50/90',
    'border-sky-400 bg-sky-50/90',
    'border-blue-500 bg-blue-50/90',
    'border-rose-400 bg-rose-50/90'
  ];

  const displayOrders = vipRushOrder ? [vipRushOrder, ...orders.slice(0, 3)] : orders.slice(0, 4);

  // Formats seconds into MM:SS or Hh Mm
  const formatOrderTime = (seconds?: number): string => {
    if (seconds === undefined || seconds === null) return '15:00';
    const safeSec = Math.max(0, Math.floor(seconds));
    const m = Math.floor(safeSec / 60);
    const s = safeSec % 60;
    if (m >= 60) {
      const hrs = Math.floor(m / 60);
      const remMin = m % 60;
      return remMin > 0 ? `${hrs}h ${remMin}m` : `${hrs}h`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Find the closest expiring order for the top-right rush indicator
  const shortestOrder = displayOrders.reduce((prev, curr) => {
    const prevTime = prev?.timeLeft ?? 999999;
    const currTime = curr?.timeLeft ?? 999999;
    return currTime < prevTime ? curr : prev;
  }, displayOrders[0]);

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
      {vipRushOrder && (
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-1 animate-pulse">
          <span>🚨 VIP 주문! {formatOrderTime(vipRushOrder.timeLeft)} 남음 (3배 보상)</span>
        </div>
      )}

      {/* Top Left: Guest count badge */}
      <div className="absolute top-1.5 left-1.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 p-0.5 shadow-md border-2 border-white flex items-center justify-center">
          <span className="text-[11px]">😊</span>
        </div>
        <span className="text-[7px] font-black text-white bg-slate-900/85 px-1 py-0 rounded-full border border-purple-300 -mt-1 shadow">
          {displayOrders.length}/4
        </span>
      </div>

      {/* Top Right: Dynamic Rush Timer Badge */}
      <div className="absolute top-1.5 right-1.5 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-red-500 p-0.5 shadow-md border-2 border-white flex items-center justify-center">
          <span className="text-[11px]">{shortestOrder?.customerAvatar || '⏱️'}</span>
        </div>
        <span className="text-[7px] font-black text-amber-200 bg-slate-900/85 px-1.5 py-0 rounded-full border border-amber-300 -mt-1 shadow flex items-center gap-0.5">
          <Clock className={`w-2 h-2 ${(shortestOrder?.timeLeft ?? 999) <= 300 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`} />
          {formatOrderTime(shortestOrder?.timeLeft)}
        </span>
      </div>

      {/* Exactly 4 Compact Order Cards Aligned to the Bottom Sill */}
      <div className="absolute inset-x-0 bottom-0 flex items-end px-1.5 sm:px-2 pb-0.5 z-10">
        <div className="w-full grid grid-cols-4 gap-1 sm:gap-1.5 items-end">
          <AnimatePresence mode="popLayout">
            {displayOrders.map((order, idx) => {
              const hasItem = board.some(
                cell =>
                  cell.state === 'OPEN' &&
                  cell.item &&
                  cell.item.chainId === order.targetChainId &&
                  cell.item.level === order.targetLevel &&
                  !cell.item.isGenerator
              );

              const isVIP = !!order.isVIP;
              const isUrgent = !hasItem && (order.timeLeft ?? 999) <= 300; // 5 minutes or less

              const borderTheme = isVIP
                ? 'border-amber-400 bg-gradient-to-b from-amber-100/95 to-orange-100/95 ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-pulse'
                : isUrgent
                ? 'border-rose-400 bg-rose-50/95 ring-1 ring-rose-400/90 shadow-md'
                : cardBorderColors[idx % cardBorderColors.length];

              const progressPercent = order.totalTime && order.timeLeft !== undefined
                ? Math.max(0, Math.min(100, (order.timeLeft / order.totalTime) * 100))
                : 100;

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
                  title={`${order.customerName} (${order.customerRole}): ${order.customerQuote}\n제한시간: ${formatOrderTime(order.timeLeft)}`}
                  className={`relative w-full h-[62px] sm:h-[66px] rounded-lg border-[1.5px] flex flex-col justify-between items-center p-0.5 shadow-md cursor-pointer transition-all backdrop-blur-xs select-none ${borderTheme} ${
                    hasItem
                      ? 'ring-2 ring-emerald-400 animate-pulse bg-emerald-50/95'
                      : 'hover:shadow-lg'
                  }`}
                >
                  {/* 3D Item Illustration Area with Star and Avatar Overlaid directly on the image */}
                  <div className="relative w-full flex-1 flex items-center justify-center p-0 min-h-0 overflow-hidden">
                    {/* Top-Left: Star & Gem Reward Overlay */}
                    <div className="absolute top-0.5 left-0.5 z-10 flex flex-col gap-0.5 items-start pointer-events-none">
                      <span className="text-[7px] sm:text-[7.5px] font-black bg-amber-400 text-amber-950 px-1 py-0.2 rounded-[2px] shadow-2xs leading-none">
                        +{order.rewardStars}⭐
                      </span>
                      {isVIP && order.rewardGems && (
                        <span className="text-[6.5px] sm:text-[7px] font-black bg-purple-600 text-purple-100 px-1 py-0.2 rounded-[2px] shadow-2xs leading-none">
                          +{order.rewardGems}💎
                        </span>
                      )}
                    </div>

                    {/* Top-Right: Customer Avatar Overlay with VIP Crown or Urgent Flame */}
                    <div
                      className={`absolute top-0.5 right-0.5 z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${
                        isVIP
                          ? 'bg-amber-300 border-amber-600'
                          : isUrgent
                          ? 'bg-rose-200 border-rose-500 animate-pulse'
                          : 'bg-white/95 border-slate-300'
                      } border shadow-2xs flex items-center justify-center text-[8.5px] pointer-events-none`}
                    >
                      {order.customerAvatar}
                      {isVIP && <span className="absolute -top-1.5 -right-1 text-[8px]">👑</span>}
                      {isUrgent && !isVIP && (
                        <span className="absolute -top-1.5 -right-1 text-[7.5px]">🔥</span>
                      )}
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
                      isVIP
                        ? hasItem
                          ? 'bg-gradient-to-r from-amber-600 to-emerald-600 animate-pulse'
                          : 'bg-gradient-to-r from-amber-600 to-rose-600'
                        : hasItem
                        ? 'bg-emerald-600 shadow-xs'
                        : isUrgent
                        ? 'bg-gradient-to-r from-rose-600 to-amber-700 animate-pulse'
                        : 'bg-[#1b7367]'
                    }`}
                  >
                    {/* Left: Reward Coins */}
                    <span className="text-[7.5px] sm:text-[8px] font-black text-amber-300 tracking-tight flex items-center gap-0.5 leading-none whitespace-nowrap flex-shrink-0">
                      +{order.rewardCoins}🪙
                    </span>

                    {/* Right: Timer or Deliver Button */}
                    <div className="flex items-center gap-0.5 text-[7px] sm:text-[7.5px] font-black text-white leading-none whitespace-nowrap flex-shrink-0">
                      {hasItem ? (
                        <>
                          <Check className="w-2 h-2 stroke-[3]" />
                          <span>납품</span>
                        </>
                      ) : isVIP ? (
                        <>
                          <Clock className="w-1.5 h-1.5 text-amber-200 animate-spin" />
                          <span className="text-amber-200 font-black">
                            {formatOrderTime(order.timeLeft)}
                          </span>
                        </>
                      ) : isUrgent ? (
                        <>
                          <Clock className="w-1.5 h-1.5 text-rose-200 animate-pulse" />
                          <span className="text-rose-200 font-extrabold tracking-tight">
                            {formatOrderTime(order.timeLeft)}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-1.5 h-1.5 text-white/80" />
                          <span className="text-white/95 font-bold tracking-tight">
                            {formatOrderTime(order.timeLeft)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Micro Expiration Progress Bar at the very bottom edge of card */}
                  <div className="w-full h-[2px] bg-black/25 overflow-hidden rounded-b-[4px]">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        isVIP
                          ? 'bg-amber-300'
                          : isUrgent
                          ? 'bg-rose-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{
                        width: `${progressPercent}%`
                      }}
                    />
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
