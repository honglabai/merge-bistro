export type ItemChainId = 'bakery' | 'cafe' | 'seafood' | 'garden' | 'ruins';

export interface ChainItemDef {
  level: number;
  name: string;
  icon: string;
  description: string;
  sellPrice: number;
}

export interface ChainDefinition {
  id: ItemChainId;
  name: string;
  categoryName: string;
  badgeColor: string;
  generatorName: string;
  generatorIcon: string;
  generatorLevels: number[];
  items: ChainItemDef[];
}

export interface BoardItem {
  id: string; // Unique instance id
  chainId: ItemChainId;
  level: number;
  isGenerator: boolean;
  generatorLevel?: number;
}

export type TileState = 'OPEN' | 'COBWEB' | 'LOCKED';

export interface BoardCell {
  index: number; // 0..62
  row: number; // 0..8
  col: number; // 0..6
  state: TileState;
  item: BoardItem | null;
}

export interface CustomerOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  customerRole: string;
  customerQuote: string;
  targetChainId: ItemChainId;
  targetLevel: number;
  rewardCoins: number;
  rewardStars: number;
  isVIP?: boolean;
  timeLeft?: number; // VIP countdown seconds
  rewardGems?: number; // VIP bonus gems
}

export interface LuckyBubble {
  id: string;
  cellIndex: number;
  item: BoardItem;
  createdAt: number;
  expiresAt: number;
}

export interface RestorationStyle {
  name: string;
  theme: string;
  icon: string;
  color: string;
  description: string;
}

export interface RestorationNode {
  id: string;
  chapter: number;
  title: string;
  location: string;
  description: string;
  costStars: number;
  isRestored: boolean;
  chosenStyle: number; // 0, 1, 2
  styles: RestorationStyle[];
  dialogue: {
    speaker: string;
    avatar: string;
    text: string;
  }[];
}

export interface CookstagramPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  photoEmoji: string;
  bgGradient: string;
  caption: string;
  likes: number;
  unlockedAtChapter: number;
  rewardClaimed: boolean;
  reward: {
    type: 'energy' | 'coins' | 'gems';
    amount: number;
    label: string;
  };
}

export interface StaffCharacter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  unlockedAtChapter: number;
  passivePerk: string;
  lore: string;
}

export type AdventureMissionType =
  | 'merge_item'
  | 'fulfill_order'
  | 'reach_combo'
  | 'spend_stars'
  | 'pop_bubble'
  | 'trigger_fever';

export interface AdventureMission {
  id: string;
  regionId: string;
  title: string;
  description: string;
  storyQuote: {
    speaker: string;
    avatar: string;
    text: string;
  };
  type: AdventureMissionType;
  targetCount: number;
  targetLevel?: number;
  targetChainId?: ItemChainId;
  currentCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
  reward: {
    coins: number;
    gems: number;
    stars: number;
  };
}

export interface ContinentRelic {
  id: string;
  name: string;
  icon: string;
  description: string;
  perk: string;
  unlockedAtRegion: string;
}

export interface ContinentRegion {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  themeColor: string;
  accentBg: string;
  icon: string;
  mapCoords: {
    x: number; // 0..100% on map
    y: number; // 0..100% on map
  };
  recommendedLevel: number;
  lore: string;
  missions: AdventureMission[];
  isUnlocked: boolean;
  isCompleted: boolean;
  relicReward: ContinentRelic;
}

// ==========================================
// Character RPG Progression Types
// ==========================================
export interface CharacterStats {
  dexterity: number; // 🍳 손놀림: 머지 추가 코인 & 추가 EXP 획득 확률
  vitality: number;  // ⚡ 활력: 최대 에너지 상한선 및 충전 속도 증가
  luck: number;      // 🍀 행운: 럭키 버블 출현율 및 아이템 복제 확률 증가
  charisma: number;  // 👑 카리스마: 주문 서빙 보상(코인/별) 배수 및 VIP 손님 호감도
}

export interface CharacterEvolutionTier {
  tierId: number; // 1..5
  name: string;
  title: string;
  badge: string;
  frameColor: string;
  minLevel: number;
  maxLevel: number;
  description: string;
  passiveBonus: string;
}

export interface LevelMilestone {
  level: number;
  title: string;
  icon: string;
  description: string;
  rewardCoins: number;
  rewardGems: number;
  bonusPerk: string;
}

export interface LevelUpEvent {
  oldLevel: number;
  newLevel: number;
  statPointsGained: number;
  rewardCoins: number;
  rewardGems: number;
  energyRefilled: number;
  newTier?: CharacterEvolutionTier;
  milestone?: LevelMilestone;
}


