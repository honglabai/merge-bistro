import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { BoardCell, BoardItem, CustomerOrder, RestorationNode, CookstagramPost, ItemChainId, LuckyBubble } from '../types/gameSchema';
import { createInitialBoard } from '../data/initialBoardData';
import { INITIAL_ORDERS, ORDER_POOL, RESTORATION_NODES } from '../data/ordersAndMetaData';
import { COOKSTAGRAM_POSTS } from '../data/storyAndCookstagramData';
import { ITEM_CHAINS, getItemDef } from '../data/itemsData';
import { sounds } from '../utils/soundSynthesizer';
import { emitMergeParticles } from '../components/ui/ParticleCanvas';

const STORAGE_KEY = 'merge_bistro_gamestate_v1';

interface GameState {
  board: BoardCell[];
  energy: number;
  maxEnergy: number;
  lastEnergyRecharge: number;
  coins: number;
  stars: number;
  gems: number;
  followers: number;
  chefName: string;
  chefAvatar: string;
  chefTitle: string;
  superchargeMultiplier: 1 | 2 | 4;
  selectedTileIndex: number | null;
  dragOverIndex: number | null;
  orders: CustomerOrder[];
  restorations: RestorationNode[];
  posts: CookstagramPost[];
  inventoryPocket: (BoardItem | null)[];
  toastMessage: string | null;
  activeModal: 'none' | 'dialogue' | 'restoration-picker' | 'reset-confirm';
  currentDialogue: { speaker: string; avatar: string; text: string }[] | null;
  dialogueIndex: number;
  pendingRestorationNode: RestorationNode | null;
  comboCount: number;
  lastMergeTime: number;
  isFeverActive: boolean;
  feverTimeLeft: number;
  luckyBubbles: LuckyBubble[];
  vipRushOrder: CustomerOrder | null;
  vipCountdown: number;

  // Actions
  init: () => void;
  rechargeEnergyTick: () => void;
  tickGameLoop: () => void;
  popLuckyBubble: (bubbleId: string) => void;
  triggerFeverMode: (durationSec?: number) => void;
  spawnVIPRushOrder: () => void;
  selectTile: (index: number | null) => void;
  setDragOverIndex: (index: number | null) => void;
  handleTileClick: (index: number) => void;
  tapGenerator: (index: number) => void;
  mergeOrMoveTile: (fromIndex: number, toIndex: number, clientPos?: { x: number; y: number }) => void;
  unlockAdjacentTiles: (row: number, col: number) => void;
  fulfillOrder: (orderId: string) => void;
  openRestorationPicker: (node: RestorationNode) => void;
  confirmRestoration: (nodeId: string, styleIndex: number) => void;
  nextDialogue: () => void;
  closeDialogue: () => void;
  claimPostReward: (postId: string) => void;
  setSupercharge: (multiplier: 1 | 2 | 4) => void;
  sellSelectedItem: () => void;
  moveSelectedToInventory: () => void;
  retrieveFromInventory: (pocketIdx: number) => void;
  freeEnergyRefill: () => void;
  addEnergy: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  buyItemToBoard: (chainId: ItemChainId, level: number, costCoins: number, costGems: number, itemName: string) => boolean;
  setChefProfile: (name: string, avatar: string, title?: string) => void;
  showToast: (msg: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: createInitialBoard(),
  energy: 100,
  maxEnergy: 100,
  lastEnergyRecharge: Date.now(),
  coins: 150,
  stars: 5,
  gems: 30,
  followers: 85,
  chefName: '바닷마을 총괄 셰프',
  chefAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
  chefTitle: '미슐랭 3스타 수석 셰프',
  superchargeMultiplier: 1,
  selectedTileIndex: null,
  dragOverIndex: null,
  orders: INITIAL_ORDERS,
  restorations: RESTORATION_NODES,
  posts: COOKSTAGRAM_POSTS,
  inventoryPocket: [null, null, null, null],
  toastMessage: null,
  activeModal: 'none',
  currentDialogue: null,
  dialogueIndex: 0,
  pendingRestorationNode: null,
  comboCount: 0,
  lastMergeTime: 0,
  isFeverActive: false,
  feverTimeLeft: 0,
  luckyBubbles: [],
  vipRushOrder: null,
  vipCountdown: 45,

  init: () => {
    let recoveredOfflineEnergy = 0;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const storedLastRecharge = typeof parsed.lastEnergyRecharge === 'number' ? parsed.lastEnergyRecharge : Date.now();
        const storedEnergy = typeof parsed.energy === 'number' ? parsed.energy : 100;
        const maxE = 100;

        // Calculate offline elapsed energy
        const elapsedSec = Math.floor((Date.now() - storedLastRecharge) / 1000);
        if (elapsedSec >= 60 && storedEnergy < maxE) {
          const recoverable = Math.floor(elapsedSec / 60);
          recoveredOfflineEnergy = Math.min(recoverable, maxE - storedEnergy);
        }

        const isValidBoard = Array.isArray(parsed.board) && parsed.board.length === 63;
        const rawBoard = isValidBoard ? parsed.board : createInitialBoard();
        const sanitizedBoard = rawBoard.map((cell: BoardCell) => {
          if (cell.item && cell.item.chainId === 'ruins') {
            return {
              ...cell,
              item: {
                ...cell.item,
                chainId: 'seafood' as const,
                level: Math.min(cell.item.level, 4)
              }
            };
          }
          return cell;
        });

        const BISTRO_REPLACEMENTS = [
          {
            customerId: 'bruno',
            customerName: '파티시에 곰 브루노',
            customerAvatar: '🐻',
            customerRole: '명예 제빵 마스터',
            customerQuote: '황금빛 결이 살아있는 골든 버터 크루아상이다곰!',
            targetChainId: 'bakery' as const,
            targetLevel: 5,
            rewardCoins: 180,
            rewardStars: 11
          },
          {
            customerId: 'milo',
            customerName: '바리스타 고양이 밀로',
            customerAvatar: '🐱',
            customerRole: '비스트로 수석 바리스타',
            customerQuote: '부드러운 우유 거품과 에스프레소의 조화! 카페라떼를 주문받았냥!',
            targetChainId: 'cafe' as const,
            targetLevel: 4,
            rewardCoins: 125,
            rewardStars: 8
          },
          {
            customerId: 'waddles',
            customerName: '선장 펭귄 와들스',
            customerAvatar: '🐧',
            customerRole: '달콤 디저트 미식가',
            customerQuote: '마스카포네 치즈의 깊은 풍미! 클래식 티라미수를 부탁하네!',
            targetChainId: 'seafood' as const,
            targetLevel: 5,
            rewardCoins: 180,
            rewardStars: 11
          },
          {
            customerId: 'fiona',
            customerName: '여우 고고학자 피오나',
            customerAvatar: '🦊',
            customerRole: '고대 유적 탐사원',
            customerQuote: '고문서 연구 중 당 충전이 필요해요! 달콤한 초콜릿 에클레어를 부탁해요!',
            targetChainId: 'seafood' as const,
            targetLevel: 3,
            rewardCoins: 100,
            rewardStars: 7
          }
        ];

        let replCount = 0;
        const rawOrders = Array.isArray(parsed.orders) && parsed.orders.length > 0 ? parsed.orders : INITIAL_ORDERS;
        const sanitizedOrders = rawOrders.map((ord: CustomerOrder) => {
          if (ord.targetChainId === 'ruins') {
            const repl = BISTRO_REPLACEMENTS[replCount % BISTRO_REPLACEMENTS.length];
            replCount++;
            return {
              ...ord,
              ...repl,
              id: ord.id || `ord-migrated-${Date.now()}-${replCount}`
            };
          }
          return ord;
        });

        // Ensure exactly 4 active orders are maintained
        const activeOrders = sanitizedOrders.slice(0, 4);
        while (activeOrders.length < 4) {
          const poolOrd = ORDER_POOL[activeOrders.length % ORDER_POOL.length];
          activeOrders.push({
            ...poolOrd,
            id: `ord-init-${Date.now()}-${activeOrders.length}`
          });
        }

        set({
          board: sanitizedBoard,
          energy: Math.min(maxE, storedEnergy + recoveredOfflineEnergy),
          coins: typeof parsed.coins === 'number' ? parsed.coins : 150,
          stars: typeof parsed.stars === 'number' ? parsed.stars : 5,
          gems: typeof parsed.gems === 'number' ? parsed.gems : 30,
          followers: typeof parsed.followers === 'number' ? parsed.followers : 85,
          chefName: typeof parsed.chefName === 'string' && parsed.chefName.trim() ? parsed.chefName : '바닷마을 총괄 셰프',
          chefAvatar: typeof parsed.chefAvatar === 'string' && parsed.chefAvatar ? parsed.chefAvatar : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
          chefTitle: typeof parsed.chefTitle === 'string' && parsed.chefTitle ? parsed.chefTitle : '미슐랭 3스타 수석 셰프',
          orders: activeOrders,
          restorations: parsed.restorations || RESTORATION_NODES,
          posts: parsed.posts || COOKSTAGRAM_POSTS,
          inventoryPocket: parsed.inventoryPocket || [null, null, null, null],
          lastEnergyRecharge: Date.now()
        });

        // Immediately persist the sanitized state
        saveState(get());
      }
    } catch {
      // Fallback
    }

    if (recoveredOfflineEnergy > 0) {
      setTimeout(() => {
        get().showToast(`☕ 비스트로에 돌아오신 것을 환영합니다! 부재중 에너지 +${recoveredOfflineEnergy}⚡ 자동 충전!`);
      }, 800);
    }

    // Set up auto save listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        saveState(get());
      });
      // 5-second periodic auto-sync
      setInterval(() => {
        saveState(get());
      }, 5000);
    }
  },

  rechargeEnergyTick: () => {
    const { energy, maxEnergy, lastEnergyRecharge } = get();
    if (energy >= maxEnergy) {
      set({ lastEnergyRecharge: Date.now() });
      return;
    }

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastEnergyRecharge) / 1000);
    const rechargeInterval = 60; // 1 energy per 60 seconds

    if (elapsedSeconds >= rechargeInterval) {
      const recovered = Math.floor(elapsedSeconds / rechargeInterval);
      const newEnergy = Math.min(maxEnergy, energy + recovered);
      const newLastRecharge = lastEnergyRecharge + recovered * rechargeInterval * 1000;

      set({ energy: newEnergy, lastEnergyRecharge: newLastRecharge });
      saveState(get());
    }
  },

  selectTile: (index: number | null) => {
    set({ selectedTileIndex: index });
  },

  setDragOverIndex: (index: number | null) => {
    set({ dragOverIndex: index });
  },

  handleTileClick: (index: number) => {
    const state = get();
    const cell = state.board[index];
    if (!cell) return;

    sounds.playTapSound();

    // 1. If clicked on an OPEN Generator: tap to spawn
    if (cell.state === 'OPEN' && cell.item?.isGenerator) {
      state.tapGenerator(index);
      return;
    }

    // 2. Selection & Merging
    if (state.selectedTileIndex === null) {
      if (cell.item && cell.state === 'OPEN') {
        set({ selectedTileIndex: index });
      } else if (cell.state === 'COBWEB') {
        sounds.playErrorSound();
        state.showToast('🕸️ 거미줄에 묶인 아이템입니다! 같은 레벨의 아이템과 합성하거나 바로 옆에서 아이템을 합성하여 해금하세요.');
      }
    } else {
      if (state.selectedTileIndex === index) {
        set({ selectedTileIndex: null });
      } else {
        state.mergeOrMoveTile(state.selectedTileIndex, index);
      }
    }
  },

  tapGenerator: (index: number) => {
    const state = get();
    const cell = state.board[index];
    if (!cell || !cell.item || !cell.item.isGenerator || cell.state !== 'OPEN') return;

    const isFreeFever = state.isFeverActive;
    const cost = isFreeFever ? 0 : state.superchargeMultiplier;
    if (!isFreeFever && state.energy < cost) {
      sounds.playErrorSound();
      state.showToast(`⚡ 에너지가 부족합니다! (필요: ${cost}E)`);
      return;
    }

    const emptyCell = state.board.find(c => c.state === 'OPEN' && !c.item);
    if (!emptyCell) {
      sounds.playErrorSound();
      state.showToast('⚠️ 보드 공간이 가득 찼습니다! 아이템을 정리하거나 합성하세요.');
      return;
    }

    const newBoard = [...state.board];
    const targetCell = newBoard[emptyCell.index];

    let spawnLevel = 1;
    if (state.superchargeMultiplier === 2) spawnLevel = 2;
    if (state.superchargeMultiplier === 4) spawnLevel = 3;

    if (Math.random() < 0.1 && spawnLevel < 4) {
      spawnLevel += 1;
    }

    targetCell.item = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      chainId: cell.item.chainId,
      level: spawnLevel,
      isGenerator: false
    };

    sounds.playPop();

    // Burst sparkle at target
    if (typeof document !== 'undefined') {
      const el = document.getElementById(`tile-${emptyCell.index}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        emitMergeParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#FBBF24');
      }
    }

    const newEnergy = isFreeFever ? state.energy : state.energy - cost;
    set({
      board: newBoard,
      energy: newEnergy,
      selectedTileIndex: null
    });

    const itemDef = getItemDef(cell.item.chainId, spawnLevel);
    state.showToast(`✨ ${cell.item.chainId.toUpperCase()} [${itemDef?.name || '아이템'}] 생성 완료!`);
    saveState(get());
  },

  mergeOrMoveTile: (fromIndex: number, toIndex: number, clientPos?: { x: number; y: number }) => {
    const state = get();
    const fromCell = state.board[fromIndex];
    const toCell = state.board[toIndex];

    if (!fromCell || !toCell || !fromCell.item) {
      set({ selectedTileIndex: null, dragOverIndex: null });
      return;
    }

    const newBoard = state.board.map(c => ({ ...c }));
    const src = newBoard[fromIndex];
    const dest = newBoard[toIndex];

    // Case A: Merge check
    const canMerge =
      dest.item &&
      src.item &&
      src.item.chainId === dest.item.chainId &&
      src.item.level === dest.item.level &&
      !src.item.isGenerator &&
      !dest.item.isGenerator;

    if (canMerge && dest.item && src.item) {
      const nextLevel = dest.item.level + 1;
      const chainDef = ITEM_CHAINS[dest.item.chainId];
      const maxLvl = chainDef ? chainDef.items.length : 10;

      if (dest.item.level >= maxLvl) {
        sounds.playErrorSound();
        state.showToast('🌟 이미 해당 체인의 최고 레벨 아이템입니다!');
        set({ selectedTileIndex: null, dragOverIndex: null });
        return;
      }

      // Merge success!
      dest.item = {
        id: `merged-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        chainId: dest.item.chainId,
        level: nextLevel,
        isGenerator: false
      };

      let unlockedCount = 0;
      if (dest.state === 'COBWEB' || dest.state === 'LOCKED') {
        dest.state = 'OPEN';
        unlockedCount++;
      }

      src.item = null;

      // Directly unlock all 4 adjacent cobwebs or locked tiles in newBoard!
      const destRow = dest.row !== undefined ? dest.row : Math.floor(dest.index / 7);
      const destCol = dest.col !== undefined ? dest.col : (dest.index % 7);

      const neighbors = [
        { r: destRow - 1, c: destCol },
        { r: destRow + 1, c: destCol },
        { r: destRow, c: destCol - 1 },
        { r: destRow, c: destCol + 1 }
      ];

      neighbors.forEach(n => {
        const neighbor = newBoard.find(c => {
          const r = c.row !== undefined ? c.row : Math.floor(c.index / 7);
          const col = c.col !== undefined ? c.col : (c.index % 7);
          return r === n.r && col === n.c;
        });
        if (neighbor && (neighbor.state === 'COBWEB' || neighbor.state === 'LOCKED')) {
          neighbor.state = 'OPEN';
          unlockedCount++;
        }
      });

      if (unlockedCount > 0) {
        sounds.playUnlockSound();
      }

      sounds.playMerge(nextLevel);

      // Particle burst
      if (clientPos) {
        emitMergeParticles(clientPos.x, clientPos.y);
      } else if (typeof document !== 'undefined') {
        const el = document.getElementById(`tile-${dest.index}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          emitMergeParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }

      // Combo System
      const now = Date.now();
      const isQuickMerge = now - state.lastMergeTime < 2800;
      const newCombo = isQuickMerge ? state.comboCount + 1 : 1;
      let extraCoins = 0;

      if (state.isFeverActive) {
        extraCoins += 10;
      } else if (newCombo >= 2) {
        extraCoins += newCombo * 2;
        sounds.playCombo(newCombo);
      }

      // Check Fever Trigger at 5 combos
      let newFeverActive = state.isFeverActive;
      let newFeverTime = state.feverTimeLeft;
      if (newCombo >= 5 && !state.isFeverActive) {
        newFeverActive = true;
        newFeverTime = 15;
        sounds.playOrderComplete();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 }
        });
      }

      // Lucky Mystery Bubble System (28% chance on Lv.3+ merge, max 3 bubbles)
      const updatedBubbles = [...state.luckyBubbles];
      if (nextLevel >= 3 && Math.random() < 0.28 && updatedBubbles.length < 3) {
        const bubbleId = `bubble-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        updatedBubbles.push({
          id: bubbleId,
          cellIndex: dest.index,
          item: { ...dest.item },
          createdAt: now,
          expiresAt: now + 30000
        });
      }

      if (nextLevel >= 4) {
        confetti({
          particleCount: 25 + nextLevel * 4,
          spread: 50,
          origin: { y: 0.6 }
        });
      }

      const mergedDef = getItemDef(dest.item.chainId, nextLevel);
      if (newCombo >= 5 && !state.isFeverActive) {
        state.showToast('🔥 5연속 콤보 달성! 15초간 피버 타임 발동! (에너지 소모 0)');
      } else if (newCombo >= 2 && !state.isFeverActive) {
        state.showToast(`🔥 COMBO x${newCombo}! +${extraCoins}🪙 보너스 골드!`);
      } else if (unlockedCount > 0) {
        state.showToast(`🎉 합성 성공! [Lv.${nextLevel} ${mergedDef?.name || '아이템'}] & 🕸️ 거미줄 ${unlockedCount}곳 해금!`);
      } else {
        state.showToast(`🎉 합성 성공! [Lv.${nextLevel} ${mergedDef?.name || '아이템'}] 탄생!`);
      }

      set({
        board: newBoard,
        coins: state.coins + extraCoins,
        comboCount: newCombo,
        lastMergeTime: now,
        isFeverActive: newFeverActive,
        feverTimeLeft: newFeverTime,
        luckyBubbles: updatedBubbles,
        selectedTileIndex: null,
        dragOverIndex: null
      });
      saveState(get());
      return;
    }

    // Case B: Move to empty OPEN cell
    if (dest.state === 'OPEN' && !dest.item) {
      dest.item = src.item;
      src.item = null;
      sounds.playTapSound();
      set({ board: newBoard, selectedTileIndex: null, dragOverIndex: null });
      saveState(get());
      return;
    }

    // Case C: Invalid drop
    sounds.playErrorSound();
    set({ selectedTileIndex: null, dragOverIndex: null });
  },

  unlockAdjacentTiles: (row: number, col: number) => {
    const state = get();
    const newBoard = state.board.map(c => ({ ...c }));
    let unlockedAny = false;

    const neighbors = [
      { r: row - 1, c: col },
      { r: row + 1, c: col },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 }
    ];

    neighbors.forEach(n => {
      const cell = newBoard.find(c => {
        const r = c.row !== undefined ? c.row : Math.floor(c.index / 7);
        const col = c.col !== undefined ? c.col : (c.index % 7);
        return r === n.r && col === n.c;
      });
      if (cell && (cell.state === 'COBWEB' || cell.state === 'LOCKED')) {
        cell.state = 'OPEN';
        unlockedAny = true;
      }
    });

    if (unlockedAny) {
      sounds.playUnlockSound();
      set({ board: newBoard });
      saveState(get());
    }
  },

  fulfillOrder: (orderId: string) => {
    const state = get();
    const isVipMatch = state.vipRushOrder?.id === orderId;
    const order = isVipMatch ? state.vipRushOrder : state.orders.find(o => o.id === orderId);
    if (!order) return;

    const matchingCell = state.board.find(
      c => c.state === 'OPEN' && c.item && c.item.chainId === order.targetChainId && c.item.level === order.targetLevel && !c.item.isGenerator
    );

    if (!matchingCell || !matchingCell.item) {
      sounds.playErrorSound();
      state.showToast('주문 요구 아이템이 보드에 없습니다!');
      return;
    }

    const newBoard = state.board.map(c => (c.index === matchingCell.index ? { ...c, item: null } : c));
    const newCoins = state.coins + order.rewardCoins;
    const newStars = state.stars + order.rewardStars;
    const newFollowers = state.followers + Math.floor(order.rewardStars * 6);

    // VIP Order fulfillment
    if (order.isVIP || isVipMatch) {
      const extraGems = order.rewardGems || 3;
      sounds.playRestorationFanfare();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
      state.showToast(`👑 [VIP 특급 성공!] +${order.rewardCoins}🪙 +${order.rewardStars}⭐ +${extraGems}💎 보석 획득!`);
      set({
        board: newBoard,
        coins: newCoins,
        stars: newStars,
        gems: state.gems + extraGems,
        followers: newFollowers + 50,
        vipRushOrder: null,
        vipCountdown: 90
      });
      saveState(get());
      return;
    }

    sounds.playOrderComplete();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 }
    });

    const randomPoolOrder = ORDER_POOL[Math.floor(Math.random() * ORDER_POOL.length)];
    const newOrders = state.orders.map(o => {
      if (o.id === orderId) {
        return {
          ...randomPoolOrder,
          id: `ord-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`
        };
      }
      return o;
    });

    state.showToast(`🛎️ ${order.customerName} 서빙 완료! +${order.rewardCoins}🪙 +${order.rewardStars}⭐ 획득!`);

    set({
      board: newBoard,
      coins: newCoins,
      stars: newStars,
      followers: newFollowers,
      orders: newOrders
    });

    saveState(get());
  },

  openRestorationPicker: (node: RestorationNode) => {
    const state = get();
    if (state.stars < node.costStars) {
      sounds.playErrorSound();
      state.showToast(`⭐ 복원에 별이 부족합니다! (필요: ${node.costStars}⭐, 보유: ${state.stars}⭐)`);
      return;
    }
    set({
      activeModal: 'restoration-picker',
      pendingRestorationNode: node
    });
  },

  confirmRestoration: (nodeId: string, styleIndex: number) => {
    const state = get();
    const node = state.restorations.find(n => n.id === nodeId);
    if (!node || state.stars < node.costStars) return;

    const newStars = state.stars - node.costStars;
    const newFollowers = state.followers + node.chapter * 120;

    const newRestorations = state.restorations.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          isRestored: true,
          chosenStyle: styleIndex
        };
      }
      return n;
    });

    sounds.playRestorationFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.4 }
    });

    state.showToast(`🏰 [${node.title}] 복원 완료! 마을이 한층 더 아름다워졌습니다!`);

    set({
      stars: newStars,
      followers: newFollowers,
      restorations: newRestorations,
      activeModal: 'dialogue',
      currentDialogue: node.dialogue,
      dialogueIndex: 0,
      pendingRestorationNode: null
    });

    saveState(get());
  },

  nextDialogue: () => {
    const { currentDialogue, dialogueIndex } = get();
    if (!currentDialogue) return;

    if (dialogueIndex + 1 < currentDialogue.length) {
      set({ dialogueIndex: dialogueIndex + 1 });
      sounds.playTapSound();
    } else {
      set({ activeModal: 'none', currentDialogue: null, dialogueIndex: 0 });
    }
  },

  closeDialogue: () => {
    set({ activeModal: 'none', currentDialogue: null, dialogueIndex: 0 });
  },

  claimPostReward: (postId: string) => {
    const state = get();
    const post = state.posts.find(p => p.id === postId);
    if (!post || post.rewardClaimed) return;

    let { energy, coins, gems } = state;
    if (post.reward.type === 'energy') energy += post.reward.amount;
    if (post.reward.type === 'coins') coins += post.reward.amount;
    if (post.reward.type === 'gems') gems += post.reward.amount;

    const newPosts = state.posts.map(p => (p.id === postId ? { ...p, rewardClaimed: true } : p));

    sounds.playOrderComplete();
    state.showToast(`🎁 쿡스타그램 선물 [${post.reward.label}]을(를) 수령했습니다!`);

    set({
      posts: newPosts,
      energy,
      coins,
      gems
    });
    saveState(get());
  },

  setSupercharge: (multiplier: 1 | 2 | 4) => {
    sounds.playTapSound();
    set({ superchargeMultiplier: multiplier });
    get().showToast(`⚡ 생성기 슈퍼차지가 [${multiplier}x]로 변경되었습니다.`);
  },

  sellSelectedItem: () => {
    const state = get();
    if (state.selectedTileIndex === null) return;

    const cell = state.board[state.selectedTileIndex];
    if (!cell || !cell.item || cell.item.isGenerator || cell.state !== 'OPEN') {
      state.showToast('판매할 수 없는 아이템입니다.');
      return;
    }

    const itemDef = getItemDef(cell.item.chainId, cell.item.level);
    const price = itemDef ? itemDef.sellPrice : Math.pow(2, cell.item.level - 1);

    const newBoard = state.board.map(c => (c.index === cell.index ? { ...c, item: null } : c));
    const newCoins = state.coins + price;

    sounds.playTapSound();
    state.showToast(`🪙 ${itemDef?.name || '아이템'} 판매 완료 (+${price} 코인)`);

    set({
      board: newBoard,
      coins: newCoins,
      selectedTileIndex: null
    });
    saveState(get());
  },

  moveSelectedToInventory: () => {
    const state = get();
    if (state.selectedTileIndex === null) return;

    const cell = state.board[state.selectedTileIndex];
    if (!cell || !cell.item || cell.item.isGenerator || cell.state !== 'OPEN') return;

    const emptyIdx = state.inventoryPocket.findIndex(p => p === null);
    if (emptyIdx === -1) {
      sounds.playErrorSound();
      state.showToast('🎒 보관함(인벤토리) 슬롯이 가득 찼습니다!');
      return;
    }

    const newPocket = [...state.inventoryPocket];
    newPocket[emptyIdx] = cell.item;

    const newBoard = state.board.map(c => (c.index === cell.index ? { ...c, item: null } : c));

    sounds.playTapSound();
    state.showToast('🎒 아이템을 보관함으로 이동했습니다.');

    set({
      board: newBoard,
      inventoryPocket: newPocket,
      selectedTileIndex: null
    });
    saveState(get());
  },

  retrieveFromInventory: (pocketIdx: number) => {
    const state = get();
    const item = state.inventoryPocket[pocketIdx];
    if (!item) return;

    const emptyCell = state.board.find(c => c.state === 'OPEN' && !c.item);
    if (!emptyCell) {
      sounds.playErrorSound();
      state.showToast('보드 공간이 가득 차서 보관함에서 꺼낼 수 없습니다.');
      return;
    }

    const newBoard = state.board.map(c => (c.index === emptyCell.index ? { ...c, item } : c));
    const newPocket = [...state.inventoryPocket];
    newPocket[pocketIdx] = null;

    sounds.playTapSound();
    state.showToast('🎒 보관함에서 아이템을 보드로 꺼냈습니다.');

    set({
      board: newBoard,
      inventoryPocket: newPocket
    });
    saveState(get());
  },

  freeEnergyRefill: () => {
    const state = get();
    sounds.playOrderComplete();
    confetti({ particleCount: 30, spread: 40 });
    state.showToast('⚡ 무료 에너지 +50 충전 완료!');
    set({
      energy: Math.min(state.maxEnergy, state.energy + 50)
    });
    saveState(get());
  },

  addCoins: (amount: number) => {
    const state = get();
    sounds.playTapSound();
    state.showToast(`+${amount}🪙 코인 획득!`);
    set({
      coins: state.coins + amount
    });
    saveState(get());
  },

  spendCoins: (amount: number) => {
    const state = get();
    if (state.coins < amount) {
      sounds.playErrorSound();
      state.showToast('🪙 코인이 부족합니다!');
      return false;
    }
    set({ coins: state.coins - amount });
    saveState(get());
    return true;
  },

  addGems: (amount: number) => {
    const state = get();
    sounds.playTapSound();
    state.showToast(`+${amount}💎 보석 획득!`);
    set({
      gems: state.gems + amount
    });
    saveState(get());
  },

  spendGems: (amount: number) => {
    const state = get();
    if (state.gems < amount) {
      sounds.playErrorSound();
      state.showToast('💎 보석이 부족합니다!');
      return false;
    }
    set({ gems: state.gems - amount });
    saveState(get());
    return true;
  },

  addEnergy: (amount: number) => {
    const state = get();
    sounds.playTapSound();
    const newEnergy = Math.min(state.energy + amount, state.maxEnergy + 200);
    set({ energy: newEnergy });
    state.showToast(`+${amount}⚡ 에너지 충전 완료!`);
    saveState(get());
  },

  buyItemToBoard: (chainId: ItemChainId, level: number, costCoins: number, costGems: number, itemName: string) => {
    const state = get();
    if (costCoins > 0 && state.coins < costCoins) {
      sounds.playErrorSound();
      state.showToast('🪙 코인이 부족합니다!');
      return false;
    }
    if (costGems > 0 && state.gems < costGems) {
      sounds.playErrorSound();
      state.showToast('💎 보석이 부족합니다!');
      return false;
    }
    const emptyCell = state.board.find(c => c.state === 'OPEN' && !c.item);
    if (!emptyCell) {
      sounds.playErrorSound();
      state.showToast('⚠️ 보드 공간이 가득 찼습니다! 아이템을 정리하거나 보석함에 넣으세요.');
      return false;
    }

    const newBoard = [...state.board];
    const targetCell = { ...newBoard[emptyCell.index] };
    targetCell.item = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      chainId,
      level,
      isGenerator: false
    };
    newBoard[emptyCell.index] = targetCell;

    sounds.playOrderComplete();

    if (typeof document !== 'undefined') {
      const el = document.getElementById(`tile-${emptyCell.index}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        emitMergeParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#F59E0B');
      }
    }

    set({
      board: newBoard,
      coins: state.coins - costCoins,
      gems: state.gems - costGems
    });
    saveState(get());
    state.showToast(`🎉 [${itemName}] 배송 완료! 보드에 생성되었습니다.`);
    return true;
  },

  setChefProfile: (name: string, avatar: string, title?: string) => {
    const state = get();
    sounds.playTapSound();
    const updated = {
      chefName: name.trim() || state.chefName,
      chefAvatar: avatar || state.chefAvatar,
      chefTitle: title || state.chefTitle
    };
    set(updated);
    saveState(get());
    state.showToast('✨ 셰프 프로필이 업데이트되었습니다!');
  },

  triggerFeverMode: (durationSec = 15) => {
    sounds.playRestorationFanfare();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 }
    });
    set({
      isFeverActive: true,
      feverTimeLeft: durationSec
    });
    get().showToast('🔥 BISTRO FEVER! 15초간 에너지 소모 0 & 보너스 골드 폭포!');
  },

  popLuckyBubble: (bubbleId: string) => {
    const state = get();
    const bubble = state.luckyBubbles.find(b => b.id === bubbleId);
    if (!bubble) return;

    sounds.playBubblePop();
    if (typeof document !== 'undefined') {
      const el = document.getElementById(`tile-${bubble.cellIndex}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        emitMergeParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#EC4899');
      }
    }

    const roll = Math.random();
    const emptyCell = state.board.find(c => c.state === 'OPEN' && !c.item);
    let toastMsg = '';
    let newBoard = state.board;
    let extraEnergy = 0;
    let extraCoins = 0;
    let extraGems = 0;

    if (roll < 0.45 && emptyCell) {
      newBoard = [...state.board];
      const target = { ...newBoard[emptyCell.index] };
      target.item = {
        id: `bubble-item-${Date.now()}`,
        chainId: bubble.item.chainId,
        level: bubble.item.level,
        isGenerator: false
      };
      newBoard[emptyCell.index] = target;
      const def = getItemDef(bubble.item.chainId, bubble.item.level);
      toastMsg = `🫧 럭키 버블 팝! [Lv.${bubble.item.level} ${def?.name}] 무료 복사!`;
    } else if (roll < 0.75) {
      extraEnergy = 25;
      toastMsg = '🫧 럭키 버블 팝! +25⚡ 에너지 잭팟 획득!';
    } else {
      extraCoins = 60;
      extraGems = 2;
      toastMsg = '🫧 럭키 버블 팝! +60🪙 코인 & +2💎 보석 잭팟!';
    }

    set({
      board: newBoard,
      energy: Math.min(state.energy + extraEnergy, state.maxEnergy + 200),
      coins: state.coins + extraCoins,
      gems: state.gems + extraGems,
      luckyBubbles: state.luckyBubbles.filter(b => b.id !== bubbleId)
    });
    saveState(get());
    state.showToast(toastMsg);
  },

  spawnVIPRushOrder: () => {
    const state = get();
    if (state.vipRushOrder) return;

    const vipCustomers = [
      {
        name: '미식가 사자 공작 레오',
        avatar: '🦁',
        role: '황실 수석 미식 평론가',
        quote: '소문을 듣고 찾아왔네! 2분 안에 최고의 요리를 대접해주게!'
      },
      {
        name: '황금 고양이 국왕 펠릭스',
        avatar: '👑',
        role: '바닷마을 왕국 통치자',
        quote: '국왕의 혀를 만족시킬 디저트를 어서 내오너라냥!'
      },
      {
        name: '비스트로 마스터 펭귄 핀',
        avatar: '🐧',
        role: '남극 미슐랭 심사위원',
        quote: '신선함이 생명! 제한 시간 내에 완벽한 커피를 부탁해!'
      }
    ];

    const chosenVip = vipCustomers[Math.floor(Math.random() * vipCustomers.length)];
    const chains: ItemChainId[] = ['bakery', 'cafe', 'seafood', 'garden'];
    const randomChain = chains[Math.floor(Math.random() * chains.length)];
    const targetLevel = 3 + Math.floor(Math.random() * 2);

    const vipOrder: CustomerOrder = {
      id: `vip-order-${Date.now()}`,
      customerId: `vip-${Date.now()}`,
      customerName: chosenVip.name,
      customerAvatar: chosenVip.avatar,
      customerRole: chosenVip.role,
      customerQuote: chosenVip.quote,
      targetChainId: randomChain,
      targetLevel,
      rewardCoins: 350 + targetLevel * 50,
      rewardStars: 16 + targetLevel * 4,
      rewardGems: 3,
      isVIP: true,
      timeLeft: 120
    };

    set({
      vipRushOrder: vipOrder,
      vipCountdown: 120
    });
    sounds.playRestorationFanfare();
    state.showToast(`🚨 [돌발 VIP 주문!] ${chosenVip.name} 도착! (제한시간 2분)`);
  },

  tickGameLoop: () => {
    const state = get();
    const now = Date.now();

    // 1. Combo timeout reset
    let newCombo = state.comboCount;
    if (newCombo > 0 && now - state.lastMergeTime >= 3000) {
      newCombo = 0;
    }

    // 2. Fever countdown
    let newFeverActive = state.isFeverActive;
    let newFeverTime = state.feverTimeLeft;
    if (newFeverActive) {
      newFeverTime -= 1;
      if (newFeverTime <= 0) {
        newFeverActive = false;
        newFeverTime = 0;
        state.showToast('✨ 피버 타임이 종료되었습니다.');
      }
    }

    // 3. Clean up expired lucky bubbles
    const validBubbles = state.luckyBubbles.filter(b => b.expiresAt > now);

    // 4. VIP timer & spawn
    let vipOrder = state.vipRushOrder;
    let vipCountdown = state.vipCountdown;
    if (vipOrder && vipOrder.timeLeft !== undefined) {
      const nextTime = vipOrder.timeLeft - 1;
      if (nextTime <= 0) {
        vipOrder = null;
        vipCountdown = 90;
        state.showToast('🚨 VIP 손님이 시간이 지나 자리를 떴습니다.');
      } else {
        vipOrder = { ...vipOrder, timeLeft: nextTime };
      }
    } else {
      vipCountdown -= 1;
      if (vipCountdown <= 0) {
        state.spawnVIPRushOrder();
        return;
      }
    }

    set({
      comboCount: newCombo,
      isFeverActive: newFeverActive,
      feverTimeLeft: newFeverTime,
      luckyBubbles: validBubbles,
      vipRushOrder: vipOrder,
      vipCountdown
    });
  },

  showToast: (msg: string) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      if (get().toastMessage === msg) {
        set({ toastMessage: null });
      }
    }, 3200);
  },

  resetGame: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      board: createInitialBoard(),
      energy: 100,
      coins: 150,
      stars: 5,
      gems: 30,
      followers: 85,
      chefName: '바닷마을 총괄 셰프',
      chefAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      chefTitle: '미슐랭 3스타 수석 셰프',
      superchargeMultiplier: 1,
      selectedTileIndex: null,
      dragOverIndex: null,
      orders: INITIAL_ORDERS,
      restorations: RESTORATION_NODES,
      posts: COOKSTAGRAM_POSTS,
      inventoryPocket: [null, null, null, null],
      toastMessage: '🔄 게임이 초기 상태로 초기화되었습니다.'
    });
  }
}));

function saveState(state: GameState) {
  try {
    const payload = {
      board: state.board,
      energy: state.energy,
      coins: state.coins,
      stars: state.stars,
      gems: state.gems,
      followers: state.followers,
      chefName: state.chefName,
      chefAvatar: state.chefAvatar,
      chefTitle: state.chefTitle,
      orders: state.orders,
      restorations: state.restorations,
      posts: state.posts,
      inventoryPocket: state.inventoryPocket,
      lastEnergyRecharge: state.lastEnergyRecharge
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota
  }
}
