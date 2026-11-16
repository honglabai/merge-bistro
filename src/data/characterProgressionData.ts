import { CharacterEvolutionTier, LevelMilestone, CharacterStats } from '../types/gameSchema';

export const CHARACTER_TIERS: CharacterEvolutionTier[] = [
  {
    tierId: 1,
    name: '수습 보조 요리사',
    title: '풋풋한 비스트로 견습생',
    badge: '🍳',
    frameColor: 'from-amber-600 to-amber-700 border-amber-500',
    minLevel: 1,
    maxLevel: 5,
    description: '기초 반죽과 식재료 손질을 배우며 위대한 셰프의 꿈을 키우는 견습 단계입니다.',
    passiveBonus: '최대 에너지 기본 +5 상한 확장'
  },
  {
    tierId: 2,
    name: '주니어 비스트로 셰프',
    title: '단골들이 인정하는 신예 요리사',
    badge: '🥐',
    frameColor: 'from-emerald-600 to-teal-700 border-emerald-400',
    minLevel: 6,
    maxLevel: 12,
    description: '숙련된 손놀림으로 따뜻한 빵과 커피를 능숙하게 서빙하는 유망주 요리사입니다.',
    passiveBonus: '머지 시 추가 코인 및 보너스 EXP 확률 +10%'
  },
  {
    tierId: 3,
    name: '수석 파티시에 & 바리스타',
    title: '디저트와 커피의 미식 장인',
    badge: '🍰',
    frameColor: 'from-sky-600 to-indigo-700 border-sky-400',
    minLevel: 13,
    maxLevel: 20,
    description: '환상적인 향미와 예술적인 플레이팅으로 비스트로의 명성을 드높인 수석 셰프입니다.',
    passiveBonus: '럭키 미스터리 버블 출현 확률 +15% 및 콤보 유지 시간 연장'
  },
  {
    tierId: 4,
    name: '왕국 미식 기사단 셰프',
    title: '대륙 유적을 탐험하는 요리 모험가',
    badge: '⚔️',
    frameColor: 'from-purple-600 to-rose-700 border-purple-400',
    minLevel: 21,
    maxLevel: 30,
    description: '고대 유적과 미지의 대륙을 누비며 전설의 레시피를 복원하는 모험가 셰프입니다.',
    passiveBonus: 'VIP 주문 보상 +25% 증폭 및 피버 모드 지속시간 +2초'
  },
  {
    tierId: 5,
    name: '전설의 그랜드 마스터 셰프',
    title: '신의 혀를 매료시킨 미식의 대현자',
    badge: '👑',
    frameColor: 'from-amber-400 via-yellow-500 to-orange-500 border-amber-300',
    minLevel: 31,
    maxLevel: 999,
    description: '아스테리아 대륙 역사상 가장 위대한 요리의 연금술사로 추앙받는 궁극의 마스터입니다.',
    passiveBonus: '모든 머지, 주문, 퀘스트 보상 1.5배 증가 & 황금빛 오라 발동'
  }
];

export const LEVEL_MILESTONES: LevelMilestone[] = [
  {
    level: 5,
    title: '견습생 졸업식',
    icon: '🎓',
    description: '첫 번째 수습 단계를 통과하여 주니어 셰프로의 승급 자격을 얻습니다.',
    rewardCoins: 300,
    rewardGems: 15,
    bonusPerk: '생성기 쿨다운 속도 +5%'
  },
  {
    level: 10,
    title: '비스트로 에이스',
    icon: '⭐',
    description: '마을 전체에 소문난 최고의 요리사로 인정받습니다.',
    rewardCoins: 600,
    rewardGems: 25,
    bonusPerk: '최대 에너지 한도 영구 +10⚡'
  },
  {
    level: 15,
    title: '장인의 손길',
    icon: '✨',
    description: '완벽한 굽기와 로스팅으로 수석 파티시에의 경지에 오릅니다.',
    rewardCoins: 1000,
    rewardGems: 35,
    bonusPerk: '머지 시 보너스 복제 버블 출현율 +8%'
  },
  {
    level: 20,
    title: '왕실 공인 훈장',
    icon: '🏅',
    description: '국왕과 귀족들이 찬사를 아끼지 않는 왕립 미식가 협회의 공인을 받습니다.',
    rewardCoins: 1500,
    rewardGems: 50,
    bonusPerk: '손님 주문 서빙 시 코인 보상 +15%'
  },
  {
    level: 25,
    title: '고대 유적 탐험가',
    icon: '🧭',
    description: '대륙 전역의 잊혀진 레시피를 되살리는 미식 탐험대의 리더가 됩니다.',
    rewardCoins: 2200,
    rewardGems: 70,
    bonusPerk: '피버 타임 지속시간 +3초'
  },
  {
    level: 30,
    title: '전설의 서막',
    icon: '🌟',
    description: '미식 기사단의 최고 지휘관으로서 천공의 성역으로 향합니다.',
    rewardCoins: 3000,
    rewardGems: 100,
    bonusPerk: '모든 스탯 보너스 효과 20% 증폭'
  },
  {
    level: 40,
    title: '천공의 미식 마스터',
    icon: '🌈',
    description: '구름 위 황금 신전에서 신들에게 바치는 요리를 완성합니다.',
    rewardCoins: 5000,
    rewardGems: 150,
    bonusPerk: '에너지 자연 회복 속도 2배 가속'
  },
  {
    level: 50,
    title: '불멸의 마스터 셰프',
    icon: '👑',
    description: '아스테리아 대륙 역사에 영원히 기록될 궁극의 셰프 명예의 전당에 등극합니다.',
    rewardCoins: 10000,
    rewardGems: 300,
    bonusPerk: '전설의 영구 칭호 및 최고 등급 다이아몬드 프레임 활성화'
  }
];

export const STAT_INFO: Record<
  keyof CharacterStats,
  {
    name: string;
    icon: string;
    color: string;
    bgColor: string;
    description: string;
    effectText: (value: number) => string;
  }
> = {
  dexterity: {
    name: '손놀림 (Dexterity)',
    icon: '🍳',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    description: '정교하고 빠른 손동작으로 재료를 다루는 기술입니다.',
    effectText: (v) => `머지 시 추가 코인 +${v * 3}🪙 & 보너스 EXP 확률 +${v * 2}%`
  },
  vitality: {
    name: '활력 (Vitality)',
    icon: '⚡',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50 border-sky-200',
    description: '쉬지 않고 주방을 지휘할 수 있는 강인한 체력입니다.',
    effectText: (v) => `최대 에너지 한도 +${v * 5}⚡ (현재 상한: ${100 + v * 5}⚡)`
  },
  luck: {
    name: '행운 (Luck)',
    icon: '🍀',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    description: '기적 같은 레시피 번뜩임과 우연한 대박 행운입니다.',
    effectText: (v) => `럭키 미스터리 버블 출현율 +${(v * 1.5).toFixed(1)}%`
  },
  charisma: {
    name: '카리스마 (Charisma)',
    icon: '👑',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    description: '손님들의 마음을 사로잡고 충성도를 높이는 셰프의 품격입니다.',
    effectText: (v) => `주문 서빙 시 코인/별 보상 +${v * 2}% & VIP 방문 확률 증가`
  }
};

/**
 * Calculates EXP required to reach next level from current level
 */
export function calculateExpForLevel(level: number): number {
  if (level <= 1) return 80;
  return Math.floor(60 + Math.pow(level, 1.55) * 22);
}

/**
 * Finds the evolution tier corresponding to a given level
 */
export function getTierForLevel(level: number): CharacterEvolutionTier {
  const found = CHARACTER_TIERS.find(t => level >= t.minLevel && level <= t.maxLevel);
  return found || CHARACTER_TIERS[CHARACTER_TIERS.length - 1];
}
