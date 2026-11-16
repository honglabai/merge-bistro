import { create } from 'zustand';
import confetti from 'canvas-confetti';
import {
  BoardCell,
  BoardItem,
  CustomerOrder,
  RestorationNode,
  CookstagramPost,
  ItemChainId,
  LuckyBubble,
  ContinentRegion,
  ContinentRelic,
  AdventureMissionType,
  CharacterStats,
  CharacterEvolutionTier,
  LevelMilestone,
  LevelUpEvent
} from '../types/gameSchema';
import { createInitialBoard } from '../data/initialBoardData';
import { INITIAL_ORDERS, ORDER_POOL, RESTORATION_NODES } from '../data/ordersAndMetaData';
import { COOKSTAGRAM_POSTS } from '../data/storyAndCookstagramData';
import { CONTINENT_REGIONS } from '../data/adventureMissionsData';
import { calculateExpForLevel, getTierForLevel, LEVEL_MILESTONES, STAT_INFO } from '../data/characterProgressionData';
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

  // Character RPG Progression State
  level: number;
  exp: number;
  expToNextLevel: number;
  statPoints: number;
  stats: CharacterStats;
  pendingLevelUp: LevelUpEvent | null;

  // Adventure RPG Continent State
  continentRegions: ContinentRegion[];
  activeRegionId: string;
  relicsInventory: ContinentRelic[];
  activeAdventureDialogue: { speaker: string; avatar: string; text: string } | null;

  // Actions
  init: () => void;
  addExp: (amount: number, reason?: string) => void;
  allocateStatPoint: (stat: keyof CharacterStats) => void;
  dismissLevelUpModal: () => void;
  selectAdventureRegion: (regionId: string) => void;
  checkMissionProgress: (
    type: AdventureMissionType,
    params?: {
      level?: number;
      chainId?: ItemChainId;
      combo?: number;
    }
  ) => void;
  claimMissionReward: (missionId: string) => void;
  closeAdventureDialogue: () => void;
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
  level: 1,
  exp: 0,
  expToNextLevel: calculateExpForLevel(1),
  statPoints: 0,
  stats: { dexterity: 0, vitality: 0, luck: 0, charisma: 0 },
  pendingLevelUp: null,
  continentRegions: CONTINENT_REGIONS,
  activeRegionId: 'region-1',
  relicsInventory: [],
  activeAdventureDialogue: null,

  init: () => {
    let recoveredOfflineEnergy = 0;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const storedLastRecharge = typeof parsed.lastEnergyRecharge === 'number' ? parsed.lastEnergyRecharge : Date.now();
        const storedEnergy = typeof parsed.energy === 'number' ? parsed.energy : 100;
        const storedLevel = typeof parsed.level === 'number' && parsed.level >= 1 ? parsed.level : 1;
        const storedExp = typeof parsed.exp === 'number' && parsed.exp >= 0 ? parsed.exp : 0;
        const storedStatPoints = typeof parsed.statPoints === 'number' && parsed.statPoints >= 0 ? parsed.statPoints : 0;
        const storedStats: CharacterStats = parsed.stats && typeof parsed.stats.dexterity === 'number'
          ? {
              dexterity: parsed.stats.dexterity || 0,
              vitality: parsed.stats.vitality || 0,
              luck: parsed.stats.luck || 0,
              charisma: parsed.stats.charisma || 0
            }
          : { dexterity: 0, vitality: 0, luck: 0, charisma: 0 };
        const maxE = 100 + storedStats.vitality * 5;

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
          maxEnergy: maxE,
          level: storedLevel,
          exp: storedExp,
          expToNextLevel: calculateExpForLevel(storedLevel),
          statPoints: storedStatPoints,
          stats: storedStats,
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
          continentRegions: Array.isArray(parsed.continentRegions) && parsed.continentRegions.length === 5 ? parsed.continentRegions : CONTINENT_REGIONS,
          activeRegionId: typeof parsed.activeRegionId === 'string' ? parsed.activeRegionId : 'region-1',
          relicsInventory: Array.isArray(parsed.relicsInventory) ? parsed.relicsInventory : [],
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

  addExp: (amount: number, reason?: string) => {
    const state = get();
    if (amount <= 0) return;

    let currentLevel = state.level;
    let currentExp = state.exp + amount;
    let expRequired = calculateExpForLevel(currentLevel);
    let levelsGained = 0;
    let totalStatPointsGained = 0;
    let totalRewardCoins = 0;
    let totalRewardGems = 0;

    while (currentExp >= expRequired && currentLevel < 100) {
      currentExp -= expRequired;
      currentLevel++;
      levelsGained++;
      totalStatPointsGained += 3;
      totalRewardCoins += currentLevel * 100;
      totalRewardGems += Math.min(25, 5 + Math.floor(currentLevel / 2));
      expRequired = calculateExpForLevel(currentLevel);
    }

    if (levelsGained > 0) {
      const oldTier = getTierForLevel(state.level);
      const newTier = getTierForLevel(currentLevel);
      const hasTierUp = newTier.tierId > oldTier.tierId;
      const milestone = LEVEL_MILESTONES.find(m => m.level === currentLevel);

      if (milestone) {
        totalRewardCoins += milestone.rewardCoins;
        totalRewardGems += milestone.rewardGems;
      }

      const maxE = 100 + state.stats.vitality * 5;
      const energyBonus = 50;
      const refilledEnergy = maxE + energyBonus;

      const levelUpEvent: LevelUpEvent = {
        oldLevel: state.level,
        newLevel: currentLevel,
        statPointsGained: totalStatPointsGained,
        rewardCoins: totalRewardCoins,
        rewardGems: totalRewardGems,
        energyRefilled: refilledEnergy,
        newTier: hasTierUp ? newTier : undefined,
        milestone: milestone || undefined
      };

      sounds.playRestorationFanfare();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.4 }
      });

      set({
        level: currentLevel,
        exp: currentExp,
        expToNextLevel: expRequired,
        statPoints: state.statPoints + totalStatPointsGained,
        coins: state.coins + totalRewardCoins,
        gems: state.gems + totalRewardGems,
        energy: Math.max(state.energy, refilledEnergy),
        pendingLevelUp: levelUpEvent
      });

      saveState(get());
    } else {
      set({
        exp: currentExp,
        expToNextLevel: expRequired
      });
    }
  },

  allocateStatPoint: (stat: keyof CharacterStats) => {
    const state = get();
    if (state.statPoints <= 0) {
      sounds.playErrorSound();
      state.showToast('사용 가능한 스탯 포인트가 부족합니다!');
      return;
    }

    sounds.playUnlockSound();
    const newStats = {
      ...state.stats,
      [stat]: (state.stats[stat] || 0) + 1
    };
    const newMaxEnergy = 100 + newStats.vitality * 5;

    set({
      statPoints: state.statPoints - 1,
      stats: newStats,
      maxEnergy: newMaxEnergy,
      energy: stat === 'vitality' ? state.energy + 5 : state.energy
    });

    saveState(get());
    state.showToast(`✨ ${STAT_INFO[stat].name} +1 상승!`);
  },

  dismissLevelUpModal: () => {
    set({ pendingLevelUp: null });
  },

  selectAdventureRegion: (regionId: string) => {
    set({ activeRegionId: regionId });
  },

  checkMissionProgress: (
    type: AdventureMissionType,
    params?: {
      level?: number;
      chainId?: ItemChainId;
      combo?: number;
    }
  ) => {
    const state = get();
    let updatedAny = false;
    let newlyCompletedTitle: string | null = null;

    const newRegions = state.continentRegions.map(region => {
      // Check missions in unlocked & incomplete regions
      if (!region.isUnlocked || region.isCompleted) return region;

      let regionUpdated = false;
      const newMissions = region.missions.map(mission => {
        if (mission.isCompleted || mission.type !== type) return mission;

        let shouldIncrement = false;

        if (type === 'merge_item') {
          const lvlMatch = !mission.targetLevel || (params?.level !== undefined && params.level >= mission.targetLevel);
          const chainMatch = !mission.targetChainId || (params?.chainId !== undefined && params.chainId === mission.targetChainId);
          if (lvlMatch && chainMatch) {
            shouldIncrement = true;
          }
        } else if (type === 'fulfill_order') {
          shouldIncrement = true;
        } else if (type === 'reach_combo') {
          if (params?.combo !== undefined && params.combo >= mission.targetCount) {
            shouldIncrement = true;
          }
        } else if (type === 'pop_bubble' || type === 'trigger_fever') {
          shouldIncrement = true;
        }

        if (shouldIncrement) {
          regionUpdated = true;
          updatedAny = true;
          const nextCount =
            type === 'reach_combo' && params?.combo
              ? Math.max(mission.currentCount, params.combo)
              : mission.currentCount + 1;
          const isDone = nextCount >= mission.targetCount;
          if (isDone && !mission.isCompleted) {
            newlyCompletedTitle = mission.title;
          }
          return {
            ...mission,
            currentCount: Math.min(nextCount, mission.targetCount),
            isCompleted: isDone
          };
        }

        return mission;
      });

      if (regionUpdated) {
        return {
          ...region,
          missions: newMissions
        };
      }
      return region;
    });

    if (updatedAny) {
      set({ continentRegions: newRegions });
      saveState(get());
      if (newlyCompletedTitle) {
        sounds.playOrderComplete();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.4 } });
        get().showToast(`🎯 [모험 미션 달성!] "${newlyCompletedTitle}" 완료! 지도에서 보상을 수령하세요!`);
      }
    }
  },

  claimMissionReward: (missionId: string) => {
    const state = get();
    let targetReward: { coins: number; gems: number; stars: number } | null = null;
    let targetRegionId: string | null = null;

    const newRegions = state.continentRegions.map(region => {
      let regionModified = false;
      const newMissions = region.missions.map(m => {
        if (m.id === missionId && m.isCompleted && !m.isClaimed) {
          targetReward = m.reward;
          targetRegionId = region.id;
          regionModified = true;
          return { ...m, isClaimed: true };
        }
        return m;
      });

      if (!regionModified) return region;

      // Check if all missions in this region are completed & claimed
      const allDone = newMissions.every(m => m.isCompleted && m.isClaimed);
      return {
        ...region,
        missions: newMissions,
        isCompleted: allDone
      };
    });

    if (!targetReward) {
      sounds.playErrorSound();
      return;
    }

    sounds.playRestorationFanfare();
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.5 } });

    // Check if region was newly completed and unlock next region
    const currentReg = newRegions.find(r => r.id === targetRegionId);
    const updatedRelics = [...state.relicsInventory];
    let nextRegionId = state.activeRegionId;
    let completionDialogue: { speaker: string; avatar: string; text: string } | null = null;

    if (currentReg && currentReg.isCompleted) {
      // Award relic if not present
      if (!updatedRelics.some(r => r.id === currentReg.relicReward.id)) {
        updatedRelics.push(currentReg.relicReward);
      }

      // Unlock next region by stageNumber
      const nextStage = currentReg.stageNumber + 1;
      const nextReg = newRegions.find(r => r.stageNumber === nextStage);
      if (nextReg) {
        nextReg.isUnlocked = true;
        nextRegionId = nextReg.id;
      }

      completionDialogue = {
        speaker: '여우 고고학자 피오나',
        avatar: '🦊',
        text: `대단해요! [${currentReg.name}]의 모든 미션을 완수하고 전설의 유물 [${currentReg.relicReward.name}]을(를) 손에 넣었습니다! 다음 여정지로 이동할 수 있어요!`
      };
    }

    const { coins: rCoins, gems: rGems, stars: rStars } = targetReward;
    set({
      continentRegions: newRegions,
      coins: state.coins + rCoins,
      gems: state.gems + rGems,
      stars: state.stars + rStars,
      relicsInventory: updatedRelics,
      activeRegionId: nextRegionId,
      activeAdventureDialogue: completionDialogue
    });

    // Award Adventure Mission EXP
    get().addExp(120, '대륙 모험 미션 완수');

    saveState(get());
    state.showToast(`🎁 [모험 보상 수령!] +${rCoins}🪙 +${rGems}💎 +${rStars}⭐ +120 EXP 획득!`);
  },

  closeAdventureDialogue: () => {
    set({ activeAdventureDialogue: null });
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

      // Combo System & Dexterity Coin Bonus
      const now = Date.now();
      const isQuickMerge = now - state.lastMergeTime < 2800;
      const newCombo = isQuickMerge ? state.comboCount + 1 : 1;
      let extraCoins = Math.floor((state.stats.dexterity || 0) * 3);

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

      // Track Adventure Missions: merge_item, reach_combo, trigger_fever
      state.checkMissionProgress('merge_item', {
        level: nextLevel,
        chainId: dest.item.chainId
      });
      if (newCombo >= 2) {
        state.checkMissionProgress('reach_combo', { combo: newCombo });
      }
      if (newCombo >= 5 && !state.isFeverActive) {
        state.checkMissionProgress('trigger_fever');
      }

      // Lucky Mystery Bubble System (28% base chance + Luck stat boost, max 3 bubbles)
      const updatedBubbles = [...state.luckyBubbles];
      const luckBonusRate = (state.stats.luck || 0) * 0.015;
      if (nextLevel >= 3 && Math.random() < (0.28 + luckBonusRate) && updatedBubbles.length < 3) {
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

      // Award EXP for successful merge with Dexterity boost
      const mergeExp = Math.max(6, nextLevel * 3 + Math.floor((state.stats.dexterity || 0) * 1.5));
      get().addExp(mergeExp, '아이템 합성');

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
    const charismaMultiplier = 1 + ((state.stats.charisma || 0) * 0.02);
    const awardedCoins = Math.floor(order.rewardCoins * charismaMultiplier);
    const awardedStars = Math.max(1, Math.floor(order.rewardStars * charismaMultiplier));
    const newCoins = state.coins + awardedCoins;
    const newStars = state.stars + awardedStars;
    const newFollowers = state.followers + Math.floor(awardedStars * 6);

    // Track Adventure Mission progress for orders
    state.checkMissionProgress('fulfill_order');

    // VIP Order fulfillment
    if (order.isVIP || isVipMatch) {
      const extraGems = order.rewardGems || 3;
      sounds.playRestorationFanfare();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
      state.showToast(`👑 [VIP 특급 성공!] +${awardedCoins}🪙 +${awardedStars}⭐ +${extraGems}💎 보석 획득!`);
      set({
        board: newBoard,
        coins: newCoins,
        stars: newStars,
        gems: state.gems + extraGems,
        followers: newFollowers + 50,
        vipRushOrder: null,
        vipCountdown: 90
      });

      // Award VIP Order EXP
      const vipExp = Math.floor(60 + order.rewardStars * 12 + ((state.stats.charisma || 0) * 4));
      get().addExp(vipExp, 'VIP 특급 서빙 완료');

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

    state.showToast(`🛎️ ${order.customerName} 서빙 완료! +${awardedCoins}🪙 +${awardedStars}⭐ 획득!`);

    set({
      board: newBoard,
      coins: newCoins,
      stars: newStars,
      followers: newFollowers,
      orders: newOrders
    });

    // Award Normal Order EXP
    const normalExp = Math.floor(25 + order.rewardStars * 8 + ((state.stats.charisma || 0) * 3));
    get().addExp(normalExp, '손님 주문 서빙 완료');

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
    get().checkMissionProgress('trigger_fever');
    get().addExp(35, '피버 타임 발동');
    get().showToast('🔥 BISTRO FEVER! 15초간 에너지 소모 0 & 보너스 골드 폭포!');
  },

  popLuckyBubble: (bubbleId: string) => {
    const state = get();
    const bubble = state.luckyBubbles.find(b => b.id === bubbleId);
    if (!bubble) return;

    sounds.playBubblePop();
    state.checkMissionProgress('pop_bubble');
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

    get().addExp(25, '럭키 버블 오픈');
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
      maxEnergy: 100,
      level: 1,
      exp: 0,
      expToNextLevel: calculateExpForLevel(1),
      statPoints: 0,
      stats: { dexterity: 0, vitality: 0, luck: 0, charisma: 0 },
      pendingLevelUp: null,
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
      continentRegions: CONTINENT_REGIONS,
      activeRegionId: 'region-1',
      relicsInventory: [],
      activeAdventureDialogue: null,
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
      level: state.level,
      exp: state.exp,
      statPoints: state.statPoints,
      stats: state.stats,
      orders: state.orders,
      restorations: state.restorations,
      posts: state.posts,
      inventoryPocket: state.inventoryPocket,
      continentRegions: state.continentRegions,
      activeRegionId: state.activeRegionId,
      relicsInventory: state.relicsInventory,
      lastEnergyRecharge: state.lastEnergyRecharge
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota
  }
}
