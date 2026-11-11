import React from 'react';
import { CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getItemDef, ITEM_CHAINS } from '../../data/itemsData';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder } = useGameStore();

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-cream-300 shadow-sm">
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-terracotta-500" />
          <h2 className="text-xs sm:text-sm font-extrabold text-slate-800">
            능동형 손님 주문 큐 (Active Orders)
          </h2>
          <span className="text-[10px] bg-cream-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
            {orders.length}명 대기 중
          </span>
        </div>
        <span className="text-[11px] text-sage-600 font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          보드 실시간 대조 중
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {orders.map(order => {
          const itemDef = getItemDef(order.targetChainId, order.targetLevel);
          const chainDef = ITEM_CHAINS[order.targetChainId];

          // Check if item exists in an OPEN cell on the board
          const hasItem = board.some(
            cell =>
              cell.state === 'OPEN' &&
              cell.item &&
              cell.item.chainId === order.targetChainId &&
              cell.item.level === order.targetLevel &&
              !cell.item.isGenerator
          );

          return (
            <div
              key={order.id}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                hasItem
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50/80 border-emerald-400 shadow-md ring-2 ring-emerald-300/60'
                  : 'bg-cream-50/80 border-cream-300 hover:border-cream-400'
              }`}
            >
              {/* Ready Tag */}
              {hasItem && (
                <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow flex items-center gap-0.5 animate-bounceSubtle">
                  <Sparkles className="w-2.5 h-2.5" />
                  준비 완료!
                </div>
              )}

              {/* Customer Top Bar */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-cream-200 border border-cream-300 flex items-center justify-center text-lg shadow-inner flex-shrink-0">
                  {order.customerAvatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {order.customerName}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {order.customerRole}
                  </div>
                </div>
              </div>

              {/* Target Item Row */}
              <div className="flex items-center justify-between bg-white/90 p-2 rounded-lg border border-cream-200 mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0">
                    {itemDef?.icon || '📦'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">
                      {itemDef?.name || '요리'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {chainDef?.name} · <span className="font-bold text-terracotta-600">Lv.{order.targetLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="text-right flex-shrink-0 pl-1">
                  <div className="text-[11px] font-extrabold text-amber-600">
                    +{order.rewardCoins}🪙
                  </div>
                  <div className="text-[10px] font-bold text-terracotta-600">
                    +{order.rewardStars}⭐
                  </div>
                </div>
              </div>

              {/* Serve Button */}
              <button
                onClick={() => fulfillOrder(order.id)}
                disabled={!hasItem}
                className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  hasItem
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md active:scale-95 cursor-pointer ring-2 ring-emerald-400'
                    : 'bg-cream-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {hasItem ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>서빙하기 (보상 받기)</span>
                  </>
                ) : (
                  <span>재료 준비 중...</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
