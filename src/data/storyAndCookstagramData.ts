import { CookstagramPost, StaffCharacter } from '../types/gameSchema';

export const STAFF_CHARACTERS: StaffCharacter[] = [
  {
    id: 'milo',
    name: '바리스타 고양이 밀로',
    role: '수석 바리스타',
    avatar: '🐱',
    unlockedAtChapter: 1,
    passivePerk: '커피 체인 아이템 생성 시 +10% 확률로 1단계 상위 아이템 스폰',
    lore: '비스트로가 열리기 전부터 문 앞을 지키던 미식가 고양이. 환상적인 우유 거품 라떼아트의 달인입니다.'
  },
  {
    id: 'toby',
    name: '집배원 강아지 토비',
    role: '특급 딜리버리',
    avatar: '🐶',
    unlockedAtChapter: 2,
    passivePerk: '손님 주문 서빙 완료 시 코인 보상 +15% 추가 획득',
    lore: '바닷마을의 모든 골목을 꿰뚫고 있는 씩씩한 비글. 갓 구운 빵 냄새를 1km 밖에서도 맡을 수 있습니다.'
  },
  {
    id: 'bruno',
    name: '파티시에 곰 브루노',
    role: '수석 제빵장',
    avatar: '🐻',
    unlockedAtChapter: 3,
    passivePerk: '화덕 베이커리 생성기 쿨다운 시간 20% 단축',
    lore: '거대한 몸집통만큼이나 섬세한 손길로 100겹 크루아상을 빚어내는 전설의 제빵 장인.'
  },
  {
    id: 'pip',
    name: '다람쥐 정원사 핍',
    role: '플랜테리어 & 텃밭 지기',
    avatar: '🐿️',
    unlockedAtChapter: 5,
    passivePerk: '텃밭 허브 체인 판매 가격 +25% 상승',
    lore: '식물들의 작은 목소리를 들을 줄 아는 다람쥐. 비스트로의 모든 요리에 신선한 생기를 불어넣습니다.'
  },
  {
    id: 'fiona',
    name: '여우 고고학자 피오나',
    role: '유적 미스터리 분석관',
    avatar: '🦊',
    unlockedAtChapter: 6,
    passivePerk: '유적 아이템 합성 시 +5% 확률로 무료 에너지 5 획득',
    lore: '고대 유적의 비밀을 풀기 위해 대도시에서 찾아온 엘리트 고고학자. 사장님의 오랜 친구이기도 합니다.'
  }
];

export const COOKSTAGRAM_POSTS: CookstagramPost[] = [
  {
    id: 'post-1',
    author: '바리스타 밀로',
    handle: '@milo_latte_art',
    avatar: '🐱',
    photoEmoji: '☕🥐',
    bgGradient: 'from-amber-100 to-orange-200',
    caption: '비스트로 오션 테라스 정식 오픈! 맑은 바닷바람 맞으면서 마시는 첫 에스프레소는 환상 그 자체다냥 🐾 #비스트로재건 #바리스타밀로 #모닝커피',
    likes: 142,
    unlockedAtChapter: 1,
    rewardClaimed: false,
    reward: { type: 'energy', amount: 30, label: '30 에너지' }
  },
  {
    id: 'post-2',
    author: '집배원 토비',
    handle: '@toby_express_paw',
    avatar: '🐶',
    photoEmoji: '🍞🛵',
    bgGradient: 'from-blue-100 to-sky-200',
    caption: '새 단장한 메인 다이닝 홀에서 갓 구운 식빵 배달 출발 준비 완료! 꼬리가 멈추질 않아요! 🐕💨 #폭풍우극복 #따끈따끈식빵 #바닷마을배달',
    likes: 289,
    unlockedAtChapter: 2,
    rewardClaimed: false,
    reward: { type: 'coins', amount: 150, label: '150 코인' }
  },
  {
    id: 'post-3',
    author: '파티시에 브루노',
    handle: '@bruno_bear_bakery',
    avatar: '🐻',
    photoEmoji: '🔥🥖',
    bgGradient: 'from-red-100 to-amber-200',
    caption: '참나무 화덕이 드디어 타오른다곰! 바삭하게 터져나오는 바게트의 소리가 예술이라곰. 옛 사장님의 손길이 느껴진다곰 🍯 #화덕부활 #인생바게트 #곰의손맛',
    likes: 512,
    unlockedAtChapter: 3,
    rewardClaimed: false,
    reward: { type: 'gems', amount: 20, label: '20 보석' }
  },
  {
    id: 'post-4',
    author: '부엉이 촌장 버나비',
    handle: '@mayor_barnaby_official',
    avatar: '🦉',
    photoEmoji: '☕✨',
    bgGradient: 'from-emerald-100 to-teal-200',
    caption: '에스프레소 바리스타 카운터에서 열린 마을 자치 티타임. 이탈리아 정통 머신에서 추출한 카푸치노 한 모금에 온 마을이 미소 짓소. 훌륭하네!',
    likes: 780,
    unlockedAtChapter: 4,
    rewardClaimed: false,
    reward: { type: 'energy', amount: 50, label: '50 에너지' }
  },
  {
    id: 'post-5',
    author: '정원사 핍',
    handle: '@pip_green_thumb',
    avatar: '🐿️',
    photoEmoji: '🌱🌼',
    bgGradient: 'from-lime-100 to-emerald-200',
    caption: '온실 유리창 사이로 쏟아지는 햇살! 유기농 바질과 카모마일이 벌써 꽃봉오리를 틔웠어요! 나비들도 놀러왔답니다 🦋 #유기농텃밭 #허브가든 #싱그러움',
    likes: 1045,
    unlockedAtChapter: 5,
    rewardClaimed: false,
    reward: { type: 'coins', amount: 300, label: '300 코인' }
  },
  {
    id: 'post-6',
    author: '여우 고고학자 피오나',
    handle: '@fiona_relic_hunter',
    avatar: '🦊',
    photoEmoji: '📜🗝️',
    bgGradient: 'from-purple-100 to-indigo-200',
    caption: '드디어 유적 입구 봉인 덩굴을 완전히 걷어냈습니다! 룬 석판 문양을 해석하는 중인데... 사장님께서 고대 향신료의 비밀을 거의 다 푸셨던 것 같아요!',
    likes: 1820,
    unlockedAtChapter: 6,
    rewardClaimed: false,
    reward: { type: 'gems', amount: 50, label: '50 보석' }
  },
  {
    id: 'post-7',
    author: '비스트로 패밀리 전원',
    handle: '@bistro_storm_reborn',
    avatar: '👨‍🍳',
    photoEmoji: '🎉🥧',
    bgGradient: 'from-yellow-100 to-rose-200',
    caption: '사장님 무사 귀환 & 비스트로 완전 부활 대축제! 기적의 시그니처 과일 타르트와 황금 랍스터 만찬! 여러분 모두 비스트로로 놀러오세요!! 💖🥂',
    likes: 3890,
    unlockedAtChapter: 7,
    rewardClaimed: false,
    reward: { type: 'gems', amount: 100, label: '100 보석 & 무한 에너지' }
  }
];
