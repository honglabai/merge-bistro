import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { BoardCell, BoardItem, CustomerOrder, RestorationNode, CookstagramPost } from '../types/gameSchema';
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

  // Actions
  init: () => void;
  rechargeEnergyTick: () => void;
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

        set({
          board: parsed.board || createInitialBoard(),
          energy: Math.min(maxE, storedEnergy + recoveredOfflineEnergy),
          coins: typeof parsed.coins === 'number' ? parsed.coins : 150,
          stars: typeof parsed.stars === 'number' ? parsed.stars : 5,
          gems: typeof parsed.gems === 'number' ? parsed.gems : 30,
          followers: typeof parsed.followers === 'number' ? parsed.followers : 85,
          orders: parsed.orders || INITIAL_ORDERS,
          restorations: parsed.restorations || RESTORATION_NODES,
          posts: parsed.posts || COOKSTAGRAM_POSTS,
          inventoryPocket: parsed.inventoryPocket || [null, null, null, null],
          lastEnergyRecharge: Date.now()
        });
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

    const cost = state.superchargeMultiplier;
    if (state.energy < cost) {
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

    const newEnergy = state.energy - cost;
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

      if (dest.state === 'COBWEB') {
        dest.state = 'OPEN';
        sounds.playUnlockSound();
      }

      src.item = null;
      state.unlockAdjacentTiles(dest.row, dest.col);

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

      if (nextLevel >= 4) {
        confetti({
          particleCount: 25 + nextLevel * 4,
          spread: 50,
          origin: { y: 0.6 }
        });
      }

      const mergedDef = getItemDef(dest.item.chainId, nextLevel);
      state.showToast(`🎉 합성 성공! [Lv.${nextLevel} ${mergedDef?.name || '아이템'}] 탄생!`);

      set({ board: newBoard, selectedTileIndex: null, dragOverIndex: null });
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
      if (n.r >= 0 && n.r < 9 && n.c >= 0 && n.c < 7) {
        const idx = n.r * 7 + n.c;
        const cell = newBoard[idx];
        if (cell && cell.state === 'LOCKED') {
          cell.state = 'COBWEB';
          unlockedAny = true;
        }
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
    const order = state.orders.find(o => o.id === orderId);
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
