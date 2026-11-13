import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  Zap,
  Sparkles,
  Gift,
  Coins,
  Gem,
  Package,
  Flame,
  Check,
  Clock
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ItemGraphic } from '../ui/ItemGraphic';
import { sounds } from '../../utils/soundSynthesizer';
import { ItemChainId } from '../../types/gameSchema';

interface ShopMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IngredientMarketItem {
  id: string;
  name: string;
  chainId: ItemChainId;
  level: number;
  costCoins: number;
  costGems: number;
  description: string;
  badge?: string;
}

const INGREDIENT_ITEMS: IngredientMarketItem[] = [
  {
    id: 'croissant-lv3',
    name: '골든 버터 크루아상',
    chainId: 'bakery',
    level: 3,
    costCoins: 75,
    costGems: 0,
    description: '바삭하고 고소한 결이 살아있는 3레벨 베이커리',
    badge: '인기'
  },
  {
    id: 'baguette-lv4',
    name: '전통 프랑스 바게트',
    chainId: 'bakery',
    level: 4,
    costCoins: 140,
    costGems: 0,
    description: '셰프가 갓 구워낸 바삭한 4레벨 바게트 빵',
    badge: '추천'
  },
  {
    id: 'latte-lv3',
    name: '스페셜티 카페 라떼',
    chainId: 'cafe',
    level: 3,
    costCoins: 75,
    costGems: 0,
    description: '향긋한 에스프레소와 부드러운 우유 거품 3레벨',
    badge: '인기'
  },
  {
    id: 'frappe-lv4',
    name: '달콤 캐러멜 프라페',
    chainId: 'cafe',
    level: 4,
    costCoins: 140,
    costGems: 0,
    description: '시원하고 진한 달콤함의 4레벨 시그니처 음료',
    badge: 'HOT'
  },
  {
    id: 'shrimp-lv3',
    name: '지중해 생선 & 새우',
    chainId: 'seafood',
    level: 3,
    costCoins: 90,
    costGems: 0,
    description: '바닷마을에서 당일 직송한 신선한 해산물 재료 3레벨'
  },
  {
    id: 'lobster-lv4',
    name: '바닷마을 로브스터',
    chainId: 'seafood',
    level: 4,
    costCoins: 160,
    costGems: 0,
    description: '고급 해산물 코스 요리의 핵심 식재료 4레벨',
    badge: '고급'
  },
  {
    id: 'salad-lv3',
    name: '유기농 방울토마토 샐러드',
    chainId: 'garden',
    level: 3,
    costCoins: 85,
    costGems: 0,
    description: '온실 텃밭에서 직접 따온 신선하고 아삭한 샐러드 3레벨'
  },
  {
    id: 'pasta-lv4',
    name: '홈메이드 라자냐 파스타',
    chainId: 'garden',
    level: 4,
    costCoins: 150,
    costGems: 0,
    description: '치즈와 바질이 듬뿍 들어간 4레벨 홈메이드 파스타',
    badge: '별미'
  }
];

export const ShopMarketModal: React.FC<ShopMarketModalProps> = ({ isOpen, onClose }) => {
  const {
    coins,
    gems,
    energy,
    maxEnergy,
    addEnergy,
    addCoins,
    addGems,
    spendCoins,
    spendGems,
    buyItemToBoard,
    setSupercharge,
    showToast
  } = useGameStore();

  const [activeCategory, setActiveCategory] = useState<'energy' | 'ingredients' | 'currency'>('energy');
  
  // Daily gift state
  const [dailyEnergyClaimed, setDailyEnergyClaimed] = useState(() => {
    return localStorage.getItem('merge_bistro_daily_energy_claimed') === new Date().toDateString();
  });
  const [dailyGemClaimed, setDailyGemClaimed] = useState(() => {
    return localStorage.getItem('merge_bistro_daily_gem_claimed') === new Date().toDateString();
  });

  if (!isOpen) return null;

  // Claim Daily Free Energy
  const handleClaimDailyEnergy = () => {
    if (dailyEnergyClaimed) {
      showToast('⚠️ 오늘은 이미 일일 무료 에너지를 수령하셨습니다!');
      return;
    }
    addEnergy(35);
    localStorage.setItem('merge_bistro_daily_energy_claimed', new Date().toDateString());
    setDailyEnergyClaimed(true);
    showToast('🎁 일일 무료 에너지 +35⚡ 충전 완료!');
  };

  // Claim Daily Free Gem
  const handleClaimDailyGem = () => {
    if (dailyGemClaimed) {
      showToast('⚠️ 오늘은 이미 일일 무료 보석을 수령하셨습니다!');
      return;
    }
    addGems(5);
    localStorage.setItem('merge_bistro_daily_gem_claimed', new Date().toDateString());
    setDailyGemClaimed(true);
    showToast('💎 일일 무료 보석 +5개 수령 완료!');
  };

  // Buy Energy Pack with Coins or Gems
  const handleBuyEnergy = (amount: number, costCoins: number, costGems: number, label: string) => {
    if (costCoins > 0) {
      if (!spendCoins(costCoins)) return;
    }
    if (costGems > 0) {
      if (!spendGems(costGems)) return;
    }
    addEnergy(amount);
    showToast(`⚡ ${label} (+${amount}⚡) 구매 완료!`);
  };

  // Buy Currency
  const handleExchangeCurrency = (gainCoins: number, costGems: number) => {
    if (!spendGems(costGems)) return;
    addCoins(gainCoins);
    showToast(`🪙 +${gainCoins} 코인 교환 완료!`);
  };

  // Buy Supercharge Instant Pack
  const handleBuySupercharge = () => {
    if (!spendCoins(60)) return;
    setSupercharge(4);
    sounds.playOrderComplete();
    showToast('🚀 4x 슈퍼차지 부스터가 즉시 활성화되었습니다!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-pop select-none">
      <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl border-4 border-[#8C6239] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#8C6239] via-[#A06D3B] to-[#8C6239] text-amber-100 px-4 py-3 flex items-center justify-between border-b-2 border-amber-500/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md border border-white">
              <ShoppingCart className="w-4 h-4 text-white drop-shadow" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-amber-50 flex items-center gap-1.5">
                <span>비스트로 아이템 장터</span>
                <span className="text-[10px] bg-amber-400/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/40">
                  직배송 마켓
                </span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-amber-200/80 font-medium">
                에너지, 고급 식재료, 특수 부스터를 구매하세요
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real-time Balances Strip */}
        <div className="bg-[#4E342E] px-4 py-2 flex items-center justify-around border-b border-amber-600/30 text-xs font-black">
          <div className="flex items-center gap-1.5 text-sky-200">
            <Zap className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
            <span>에너지:</span>
            <span className="text-white font-extrabold">{energy}/{maxEnergy}⚡</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-200">
            <span className="text-sm">🪙</span>
            <span>코인:</span>
            <span className="text-white font-extrabold">{coins.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-pink-200">
            <span className="text-sm">💎</span>
            <span>보석:</span>
            <span className="text-white font-extrabold">{gems.toLocaleString()}</span>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center bg-[#ECE4D8] border-b border-[#D4A373]/40 px-2 pt-2 gap-1">
          <button
            onClick={() => {
              setActiveCategory('energy');
              sounds.playTapSound();
            }}
            className={`flex-1 py-2 px-2 text-xs font-black rounded-t-xl flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'energy'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
            <span>⚡ 에너지 충전</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('ingredients');
              sounds.playTapSound();
            }}
            className={`flex-1 py-2 px-2 text-xs font-black rounded-t-xl flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'ingredients'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-600" />
            <span>🥐 신선 재료 직배송</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('currency');
              sounds.playTapSound();
            }}
            className={`flex-1 py-2 px-2 text-xs font-black rounded-t-xl flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'currency'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <Gem className="w-3.5 h-3.5 text-pink-500" />
            <span>💎 재화 & 부스터</span>
          </button>
        </div>

        {/* Scrollable Products List */}
        <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3 no-scrollbar flex-1 text-slate-800">
          
          {/* TAB 1: 에너지 충전 */}
          {activeCategory === 'energy' && (
            <div className="space-y-2.5">
              
              {/* Daily Free Energy Banner */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-3 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-xs">
                    🎁
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-950 flex items-center gap-1">
                      <span>일일 무료 에너지 선물 (+35⚡)</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full border border-emerald-300">
                        매일 1회
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      열심히 요리하는 셰프님을 위한 응원 에너지
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClaimDailyEnergy}
                  disabled={dailyEnergyClaimed}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs ${
                    dailyEnergyClaimed
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                  }`}
                >
                  {dailyEnergyClaimed ? '수령 완료' : '무료 받기'}
                </button>
              </div>

              {/* Energy Option 1: Espresso Shot (+30⚡) */}
              <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-xl shadow-xs">
                    ☕
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900">
                      에스프레소 에너지 샷 (+30⚡)
                    </div>
                    <div className="text-[10px] text-stone-500">
                      가볍게 기운을 차릴 수 있는 진한 에스프레소
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuyEnergy(30, 60, 0, '에스프레소 샷')}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 text-xs font-black shadow-xs flex items-center gap-1"
                >
                  <span>🪙 60</span>
                </button>
              </div>

              {/* Energy Option 2: Vanilla Latte Bottle (+80⚡) */}
              <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-xl shadow-xs">
                    🧋
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900 flex items-center gap-1">
                      <span>바닐라 라떼 보틀 (+80⚡)</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                        베스트
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-500">
                      부드러운 우유와 바닐라의 넉넉한 충전
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuyEnergy(80, 150, 0, '바닐라 라떼 보틀')}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 text-xs font-black shadow-xs flex items-center gap-1"
                >
                  <span>🪙 150</span>
                </button>
              </div>

              {/* Energy Option 3: Supercharge Energy Tank (+160⚡) */}
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-3 border border-sky-300 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl shadow-xs">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-black text-sky-950 flex items-center gap-1">
                      <span>대용량 슈퍼차지 에너지 탱크 (+160⚡)</span>
                      <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                        강력추천
                      </span>
                    </div>
                    <div className="text-[10px] text-sky-700">
                      한계를 뛰어넘어 160 에너지를 즉시 보충!
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuyEnergy(160, 0, 10, '슈퍼차지 에너지 탱크')}
                  className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 active:scale-95 text-white text-xs font-black shadow-xs flex items-center gap-1"
                >
                  <span>💎 10</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: 신선 재료 직배송 */}
          {activeCategory === 'ingredients' && (
            <div className="space-y-2">
              <div className="text-[11px] text-stone-500 font-bold px-1 flex items-center justify-between">
                <span>구매 즉시 머지 보드의 빈 타일에 배송됩니다.</span>
                <span className="text-amber-700">빈 공간 필요 📦</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INGREDIENT_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs flex items-center justify-between gap-2 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-amber-50/80 border border-amber-200 flex-shrink-0 flex items-center justify-center p-1">
                        <ItemGraphic
                          chainId={item.chainId}
                          level={item.level}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-black text-stone-900 truncate flex items-center gap-1">
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="text-[8px] bg-amber-100 text-amber-800 px-1 py-0.1 rounded-full font-bold flex-shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] text-stone-400 truncate">
                          Lv.{item.level} · 즉시 스폰
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        buyItemToBoard(
                          item.chainId,
                          item.level,
                          item.costCoins,
                          item.costGems,
                          item.name
                        )
                      }
                      className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-90 text-amber-950 text-xs font-black shadow-xs flex-shrink-0 flex items-center gap-0.5"
                    >
                      {item.costCoins > 0 ? (
                        <span>🪙 {item.costCoins}</span>
                      ) : (
                        <span>💎 {item.costGems}</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 재화 & 부스터 */}
          {activeCategory === 'currency' && (
            <div className="space-y-2.5">
              
              {/* Daily Free Gem */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-300 rounded-2xl p-3 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center text-xl shadow-xs">
                    💎
                  </div>
                  <div>
                    <div className="text-xs font-black text-rose-950 flex items-center gap-1">
                      <span>일일 행운의 보석 선물 (+5💎)</span>
                      <span className="text-[9px] bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded-full border border-pink-300">
                        매일 1회
                      </span>
                    </div>
                    <div className="text-[10px] text-rose-700 font-medium">
                      비스트로를 찾아주신 셰프님을 위한 보석 선물
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClaimDailyGem}
                  disabled={dailyGemClaimed}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs ${
                    dailyGemClaimed
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-pink-600 hover:bg-pink-700 text-white active:scale-95'
                  }`}
                >
                  {dailyGemClaimed ? '수령 완료' : '무료 받기'}
                </button>
              </div>

              {/* 4x Supercharge Instant Booster */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-3 border-2 border-orange-300 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-xs">
                    🚀
                  </div>
                  <div>
                    <div className="text-xs font-black text-orange-950 flex items-center gap-1">
                      <span>4x 슈퍼차지 부스터 발동</span>
                      <span className="text-[9px] bg-orange-200 text-orange-900 px-1.5 py-0.2 rounded-full font-bold">
                        스피드 UP
                      </span>
                    </div>
                    <div className="text-[10px] text-orange-800">
                      생성기 탭 시 3레벨 고급 아이템 즉시 생산 모드!
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuySupercharge}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:brightness-105 active:scale-95 text-amber-950 text-xs font-black shadow-xs flex items-center gap-1"
                >
                  <span>🪙 60</span>
                </button>
              </div>

              {/* Currency Exchange 1: 300 Coins */}
              <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shadow-xs">
                    💰
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900">
                      셰프의 금화 주머니 (+300 🪙)
                    </div>
                    <div className="text-[10px] text-stone-500">
                      식당 수리와 아이템 구매에 유용한 기본 골드
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleExchangeCurrency(300, 6)}
                  className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 active:scale-95 text-white text-xs font-black shadow-xs flex items-center gap-1"
                >
                  <span>💎 6</span>
                </button>
              </div>

              {/* Currency Exchange 2: 1,000 Coins */}
              <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shadow-xs">
                    🪙
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900 flex items-center gap-1">
                      <span>비스트로 황금 금고 (+1,000 🪙)</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                        보너스 +10%
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-500">
                      대량의 코인을 경제적으로 환전하세요
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleExchangeCurrency(1000, 18)}
                  className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 active:scale-95 text-white text-xs font-black shadow-xs flex items-center gap-1"
                >
                  <span>💎 18</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FAF7F2] border-t border-[#D4A373]/40 text-center flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white font-black text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-98 transition-all"
          >
            장터 닫기 및 게임 즐기기
          </button>
        </div>

      </div>
    </div>
  );
};
