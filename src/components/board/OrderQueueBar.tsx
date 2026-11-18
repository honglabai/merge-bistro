import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Flame, X, Info, ChevronRight, Sparkles, ChefHat } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ItemGraphic } from '../ui/ItemGraphic';
import { ITEM_CHAINS, getItemDef } from '../../data/itemsData';
import { CustomerOrder } from '../../types/gameSchema';

export const OrderQueueBar: React.FC = () => {
  const { orders, board, fulfillOrder, vipRushOrder, showToast, selectTile } = useGameStore();
  const [inspectingOrder, setInspectingOrder] = useState<CustomerOrder | null>(null);

  // Multi-click tracking ref (1 click: deliver, 2 clicks: text recipe, 3 clicks: detail modal)
  const clickTrackerRef = React.useRef<{
    orderId: string;
    count: number;
    timer: NodeJS.Timeout | null;
  }>({
    orderId: '',
    count: 0,
    timer: null
  });

  React.useEffect(() => {
    return () => {
      if (clickTrackerRef.current.timer) {
        clearTimeout(clickTrackerRef.current.timer);
      }
    };
  }, []);

  const handleCardClick = (order: CustomerOrder) => {
    const tracker = clickTrackerRef.current;

    // Reset tracker if clicking a different order card
    if (tracker.orderId !== order.id) {
      if (tracker.timer) clearTimeout(tracker.timer);
      tracker.orderId = order.id;
      tracker.count = 0;
    }

    tracker.count += 1;
    if (tracker.timer) clearTimeout(tracker.timer);

    if (tracker.count >= 3) {
      // 3번 연속 클릭: 현재 클릭하면 나오는 세부내용 팝업 열기
      tracker.count = 0;
      tracker.timer = null;
      setInspectingOrder(order);
      return;
    }

    // 1번 또는 2번 클릭 판별 타이머 (320ms)
    tracker.timer = setTimeout(() => {
      const finalCount = tracker.count;
      tracker.count = 0;
      tracker.timer = null;

      const chainDef = ITEM_CHAINS[order.targetChainId];
      const itemDef = getItemDef(order.targetChainId, order.targetLevel);

      if (finalCount === 1) {
        // 1번 클릭: 해당 제품을 찾아서 제공 (있으면 납품, 없으면 안내 및 생성기 선택)
        const hasItem = board.some(
          cell =>
            cell.state === 'OPEN' &&
            cell.item &&
            cell.item.chainId === order.targetChainId &&
            cell.item.level === order.targetLevel &&
            !cell.item.isGenerator
        );

        if (hasItem) {
          fulfillOrder(order.id);
        } else {
          // Find generator on board to guide player
          const genCell = board.find(
            c => c.state === 'OPEN' && c.item && c.item.chainId === order.targetChainId && c.item.isGenerator
          );
          if (genCell) {
            selectTile(genCell.index);
            showToast(`🔍 보드에 [${itemDef?.name || '요리'}]이(가) 없습니다. 선택된 [${chainDef?.generatorName}]에서 제작하세요!`);
          } else {
            showToast(`🔍 보드에 [${itemDef?.name || '요리'}]이(가) 아직 없습니다! (Lv.${order.targetLevel})`);
          }
        }
      } else if (finalCount === 2) {
        // 2번 연속 클릭: 어떻게 만드는지 간단히 글자로만 표현
        const firstItem = chainDef?.items[0];
        showToast(
          `💡 [${itemDef?.name || '요리'}] 제작법: [${chainDef?.generatorIcon} ${chainDef?.generatorName}] 탭 ➜ Lv.1 ${firstItem?.name || '재료'} ➜ Lv.${order.targetLevel}까지 합성!`
        );
      }
    }, 320);
  };

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
        <picture>
          <source srcSet="/bistro-window-cat.webp" type="image/webp" />
          <img
            src="/bistro-window-cat.png"
            alt="Bistro Bakery with Cat Barista"
            width={960}
            height={465}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[center_50%] filter brightness-105"
          />
        </picture>

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
              const chainDef = ITEM_CHAINS[order.targetChainId];
              const itemDef = getItemDef(order.targetChainId, order.targetLevel);

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
                ? 'border-amber-400 bg-gradient-to-b from-amber-100/95 to-orange-100/95 ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)]'
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
                  onClick={() => handleCardClick(order)}
                  title={`${order.customerName}: ${itemDef?.name || '요리'}\n• 1회 클릭: 보드 제품 찾아 납품 제공\n• 2회 연속: 제작법 텍스트 안내\n• 3회 연속: 상세 레시피 팝업`}
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

                    {/* Mini Product Family Badge */}
                    <div className="absolute bottom-0.5 left-0.5 z-10 px-1 py-0.2 rounded text-[6.5px] sm:text-[7px] font-black bg-black/65 text-amber-200 border border-white/20 backdrop-blur-xs flex items-center gap-0.5 pointer-events-none">
                      <span>{chainDef?.generatorIcon}</span>
                      <span>Lv.{order.targetLevel}</span>
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
                          ? 'bg-gradient-to-r from-amber-700 to-emerald-700'
                          : 'bg-gradient-to-r from-amber-700 to-rose-700'
                        : hasItem
                        ? 'bg-emerald-700 shadow-xs'
                        : isUrgent
                        ? 'bg-gradient-to-r from-rose-700 to-amber-800'
                        : 'bg-[#0c4038]'
                    }`}
                  >
                    {/* Left: Reward Coins (High contrast text on dark teal/amber) */}
                    <span className="text-[7.5px] sm:text-[8px] font-black text-amber-200 tracking-tight flex items-center gap-0.5 leading-none whitespace-nowrap flex-shrink-0">
                      +{order.rewardCoins}🪙
                    </span>

                    {/* Right: Timer or Deliver Button */}
                    <div className="flex items-center gap-0.5 text-[7px] sm:text-[7.5px] font-black text-white leading-none whitespace-nowrap flex-shrink-0">
                      {hasItem ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (clickTrackerRef.current.timer) {
                              clearTimeout(clickTrackerRef.current.timer);
                              clickTrackerRef.current.count = 0;
                            }
                            fulfillOrder(order.id);
                          }}
                          className="flex items-center gap-0.5 text-[7px] sm:text-[7.5px] font-black text-white bg-emerald-800 hover:bg-emerald-700 active:scale-95 px-1.5 py-0.5 rounded shadow-xs border border-emerald-500/50"
                          title="즉시 납품하기"
                        >
                          <Check className="w-2 h-2 stroke-[3]" />
                          <span>납품</span>
                        </button>
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
                          <Clock className="w-1.5 h-1.5 text-white/90" />
                          <span className="text-white font-bold tracking-tight">
                            {formatOrderTime(order.timeLeft)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Micro Expiration Progress Bar at the very bottom edge of card (GPU Composited) */}
                  <div className="w-full h-[2px] bg-black/40 overflow-hidden rounded-b-[4px]">
                    <div
                      className={`h-full w-full origin-left transition-transform duration-1000 will-change-transform ${
                        isVIP
                          ? 'bg-amber-300'
                          : isUrgent
                          ? 'bg-rose-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{
                        transform: `scaleX(${progressPercent / 100})`
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Family & Order Recipe Detail Modal */}
      <AnimatePresence>
        {inspectingOrder && (() => {
          const order = inspectingOrder;
          const chainDef = ITEM_CHAINS[order.targetChainId];
          const itemDef = getItemDef(order.targetChainId, order.targetLevel);
          const isVIP = !!order.isVIP;
          const hasItem = board.some(
            cell =>
              cell.state === 'OPEN' &&
              cell.item &&
              cell.item.chainId === order.targetChainId &&
              cell.item.level === order.targetLevel &&
              !cell.item.isGenerator
          );

          // Recipe steps from Level 1 up to order.targetLevel
          const recipeSteps = chainDef ? chainDef.items.filter(i => i.level <= order.targetLevel) : [];
          const generatorFirstItem = chainDef?.items[0];

          return (
            <div
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 select-none"
              onClick={() => setInspectingOrder(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-sm w-full p-4 sm:p-5 shadow-2xl border-4 border-[#8C6239] relative overflow-hidden max-h-[88vh] flex flex-col text-slate-800"
              >
                {/* Modal Top Header */}
                <div className="flex justify-between items-start pb-2.5 border-b border-cream-200">
                  <div className="flex items-center gap-2">
                    <div className="relative w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-lg shadow-sm">
                      {order.customerAvatar}
                      {isVIP && <span className="absolute -top-1.5 -right-1 text-[11px]">👑</span>}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-black text-slate-900 leading-tight">
                          {order.customerName}
                        </h3>
                        {isVIP && (
                          <span className="text-[8.5px] font-black bg-rose-500 text-white px-1.5 py-0.2 rounded-full animate-pulse">
                            VIP 주문
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {order.customerRole}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setInspectingOrder(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Scrollable Content */}
                <div className="overflow-y-auto py-2.5 space-y-2.5 no-scrollbar text-xs">
                  
                  {/* Customer Speech Quote */}
                  <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 font-medium leading-relaxed italic flex items-start gap-1.5">
                    <span className="text-sm flex-shrink-0">💬</span>
                    <span>"{order.customerQuote}"</span>
                  </div>

                  {/* 1. Target Item & Product Family (Category) Card */}
                  <div className="bg-gradient-to-br from-[#FAF7F2] via-white to-amber-50/40 p-3 rounded-2xl border-2 border-[#D4A373]/60 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <span>{chainDef?.generatorIcon}</span>
                        <span>제품군: {chainDef?.name || order.targetChainId}</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        목표: Lv.{order.targetLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 bg-white rounded-2xl border-2 border-amber-200/80 p-1 shadow-inner flex items-center justify-center">
                        <ItemGraphic
                          chainId={order.targetChainId}
                          level={order.targetLevel}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-black text-slate-900 truncate">
                          {itemDef?.name || '특제 비스트로 요리'}
                        </div>
                        <div className="text-[10px] text-amber-800 font-bold mt-0.5">
                          분류: {chainDef?.categoryName}
                        </div>
                        <p className="text-[10px] text-slate-600 mt-1 leading-snug line-clamp-2">
                          {itemDef?.description || '손님이 간절히 기다리는 특별한 비스트로 메뉴입니다.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Production Source & Generator Info */}
                  <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-black text-emerald-950">
                      <ChefHat className="w-3.5 h-3.5 text-emerald-600" />
                      <span>생산처 (어떤 생성기에서 만드나요?)</span>
                    </div>
                    <p className="text-[10.5px] text-emerald-900 leading-relaxed font-medium">
                      보드의 <strong>[{chainDef?.generatorIcon} {chainDef?.generatorName}]</strong>을(를) 탭하여 기본 재료<strong>({generatorFirstItem?.name || '기본 재료'})</strong>를 소환한 뒤, 2개씩 합성하여 <strong>Lv.{order.targetLevel}</strong>까지 완성하세요!
                    </p>
                  </div>

                  {/* 3. Step-by-Step Merge Recipe Tree */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-black text-slate-700 px-0.5">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>합성 레시피 단계 (Lv.1 ➔ Lv.{order.targetLevel})</span>
                      </span>
                      <span className="text-[9px] text-amber-800 font-bold">
                        총 {order.targetLevel}단계 합성
                      </span>
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-1 bg-slate-50 rounded-xl border border-slate-200">
                      {recipeSteps.map((step, idx) => {
                        const isTarget = step.level === order.targetLevel;
                        return (
                          <React.Fragment key={step.level}>
                            <div
                              className={`flex-shrink-0 flex flex-col items-center p-1.5 rounded-lg border text-center transition-all ${
                                isTarget
                                  ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                                  : 'bg-white border-slate-200'
                              }`}
                              style={{ minWidth: '60px' }}
                            >
                              <span className="text-[8px] font-black text-slate-500">
                                Lv.{step.level}
                              </span>
                              <div className="w-7 h-7 flex items-center justify-center my-0.5">
                                <ItemGraphic
                                  chainId={order.targetChainId}
                                  level={step.level}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <span
                                className={`text-[8px] font-bold truncate max-w-[55px] ${
                                  isTarget ? 'text-amber-950 font-black' : 'text-slate-700'
                                }`}
                              >
                                {step.name}
                              </span>
                              {isTarget && (
                                <span className="text-[6.5px] font-black bg-amber-500 text-white px-1 rounded-full mt-0.5">
                                  목표!
                                </span>
                              )}
                            </div>
                            {idx < recipeSteps.length - 1 && (
                              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Reward & Countdown Timer */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-amber-50 p-2 rounded-xl border border-amber-200 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-bold text-amber-800">납품 완료 보상</span>
                      <div className="text-xs font-black text-amber-950 flex items-center gap-1 mt-0.5">
                        <span>+{order.rewardCoins}🪙</span>
                        <span>+{order.rewardStars}⭐</span>
                        {isVIP && order.rewardGems && (
                          <span className="text-purple-600">+{order.rewardGems}💎</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-sky-50 p-2 rounded-xl border border-sky-200 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-bold text-sky-800">남은 시간</span>
                      <div className="text-xs font-black text-sky-950 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-sky-600" />
                        <span>{formatOrderTime(order.timeLeft)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Board Preparation Status */}
                  <div
                    className={`p-2 rounded-xl border text-[10.5px] font-bold flex items-center justify-center gap-1.5 ${
                      hasItem
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {hasItem ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>보드에 완성된 아이템이 준비되어 있습니다!</span>
                      </>
                    ) : (
                      <>
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        <span>아직 보드에 해당 아이템이 없습니다.</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Modal Bottom Actions */}
                <div className="pt-2 border-t border-cream-200">
                  {hasItem ? (
                    <button
                      onClick={() => {
                        fulfillOrder(order.id);
                        setInspectingOrder(null);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-1 animate-pulse"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>지금 바로 납품하기 (+{order.rewardCoins}🪙 +{order.rewardStars}⭐)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setInspectingOrder(null)}
                      className="w-full py-2.5 rounded-xl bg-[#2A9D8F] hover:bg-[#1f7369] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
                    >
                      확인 (보드에서 머지하여 제작)
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
};
