import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, UserCheck, ArrowRight } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';
import { ItemGraphic } from '../ui/ItemGraphic';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder } = useGameStore();

  return (
    <div className="bg-[#FAF7F2]/95 backdrop-blur-sm rounded-3xl p-3 sm:p-4 border-2 border-[#D4A373]/50 shadow-md">
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#E76F51]" />
          <h2 className="text-xs sm:text-sm font-extrabold text-[#4E342E]">
            비스트로 손님 주문서 (Customer Orders)
          </h2>
          <span className="text-[10px] bg-[#EBE3D5] text-[#4E342E] font-black px-2 py-0.5 rounded-full">
            {orders.length}팀 대기 중
          </span>
        </div>
        <span className="text-[11px] text-[#2A9D8F] font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-ping inline-block" />
          보드 재료 실시간 감지 중
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <AnimatePresence mode="popLayout">
          {orders.map(order => {
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

            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between relative overflow-hidden shadow-sm ${
                  hasItem
                    ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 border-[#2A9D8F] ring-2 ring-[#2A9D8F]/50 shadow-md'
                    : 'bg-[#FFFDF9] border-[#EBE3D5] hover:border-[#D4A373]'
                }`}
              >
                {/* Ready Badge */}
                {hasItem && (
                  <div className="absolute top-1.5 right-1.5 bg-[#2A9D8F] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1 animate-bounceSubtle">
                    <Sparkles className="w-2.5 h-2.5" />
                    납품 가능!
                  </div>
                )}

                {/* Customer Info (Speech bubble style) */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#EBE3D5] border border-[#D4A373] flex items-center justify-center text-xl shadow-inner flex-shrink-0">
                    {order.customerAvatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-black text-[#4E342E] truncate">
                      {order.customerName}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {order.customerRole}
                    </div>
                  </div>
                </div>

                {/* Target Item Row */}
                <div className="flex items-center justify-between bg-white/95 p-2 rounded-xl border border-[#EBE3D5] mb-2.5 shadow-2xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center p-0.5 flex-shrink-0">
                      <ItemGraphic chainId={order.targetChainId} level={order.targetLevel} className="w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-[#4E342E] truncate">
                        {itemDef?.name || '요리'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {chainDef?.name} · <strong className="text-[#E76F51]">Lv.{order.targetLevel}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="text-right flex-shrink-0 pl-1.5">
                    <div className="text-[11px] font-black text-amber-600">
                      +{order.rewardCoins}🪙
                    </div>
                    <div className="text-[10px] font-black text-[#E76F51]">
                      +{order.rewardStars}⭐
                    </div>
                  </div>
                </div>

                {/* Deliver Button */}
                <motion.button
                  whileHover={hasItem ? { scale: 1.02 } : {}}
                  whileTap={hasItem ? { scale: 0.96 } : {}}
                  onClick={() => fulfillOrder(order.id)}
                  disabled={!hasItem}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow ${
                    hasItem
                      ? 'bg-gradient-to-r from-[#2A9D8F] to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white cursor-pointer ring-1 ring-[#2A9D8F]/60'
                      : 'bg-[#EBE3D5]/80 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {hasItem ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>요리 납품하기 (보상 수령)</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  ) : (
                    <span>요리 조리 중...</span>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
