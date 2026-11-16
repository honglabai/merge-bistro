import { CustomerOrder, RestorationNode, ItemChainId } from '../types/gameSchema';
import { ITEM_CHAINS, getItemDef } from './itemsData';

export interface CustomerProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  preferredChains: ItemChainId[];
  quoteTemplates: string[];
}

export const CUSTOMER_ROSTER: CustomerProfile[] = [
  {
    id: 'bruno',
    name: '파티시에 곰 브루노',
    avatar: '🐻',
    role: '명예 제빵 마스터',
    preferredChains: ['bakery', 'seafood', 'ruins'],
    quoteTemplates: [
      '화덕의 열기가 최고조다곰! 황금빛 [ITEM]을 완성할 차례라곰!',
      '버터의 결이 살아 숨쉬는 완벽한 [ITEM]을 부탁한다곰!',
      '이 [ITEM]의 고소한 향은 온 마을 사람들을 행복하게 만든다곰!'
    ]
  },
  {
    id: 'milo',
    name: '바리스타 고양이 밀로',
    avatar: '🐱',
    role: '비스트로 수석 바리스타',
    preferredChains: ['cafe', 'seafood', 'ruins'],
    quoteTemplates: [
      '부드러운 크레마와 깊은 풍미! [ITEM]을 주문받았냥!',
      '골골송이 절로 나오는 환상적인 [ITEM] 부탁한다냥!',
      '나른한 오후엔 역시 갓 만든 [ITEM]이 최고다냥!'
    ]
  },
  {
    id: 'barnaby',
    name: '부엉이 촌장 버나비',
    avatar: '🦉',
    role: '바닷마을 자치위원장',
    preferredChains: ['cafe', 'bakery', 'ruins'],
    quoteTemplates: [
      '마을 주민 회의 전에 따끈한 [ITEM]이 큰 활력이 되겠구려.',
      '오랜 세월을 살았지만 비스트로의 [ITEM]은 언제나 명품일세.',
      '바닷바람을 맞으며 맛보는 [ITEM] 한 접시를 기대하겠네.'
    ]
  },
  {
    id: 'waddles',
    name: '선장 펭귄 와들스',
    avatar: '🐧',
    role: '달콤 디저트 미식가',
    preferredChains: ['seafood', 'cafe', 'garden'],
    quoteTemplates: [
      '끄아악! 거친 바다 항해를 마치고 즐기는 달콤한 [ITEM]은 천상의 맛이지!',
      '디저트 쇼케이스에서 가장 빛나는 [ITEM]을 부탁하네!',
      '선원들과 함께 당 충전을 하려면 [ITEM]이 제격일세!'
    ]
  },
  {
    id: 'fiona',
    name: '여우 고고학자 피오나',
    avatar: '🦊',
    role: '고대 유적 탐사원',
    preferredChains: ['garden', 'ruins', 'bakery'],
    quoteTemplates: [
      '고문서 해독 중 집중력을 높여줄 [ITEM]이 꼭 필요해요!',
      '대륙 유적 발굴 현장에서 팀원들과 함께 나눌 [ITEM]을 부탁해요!',
      '고대 벽화에도 기록된 전설의 맛, 바로 [ITEM]이군요!'
    ]
  },
  {
    id: 'toby',
    name: '집배원 강아지 토비',
    avatar: '🐶',
    role: '비스트로 전속 배달원',
    preferredChains: ['bakery', 'cafe', 'garden'],
    quoteTemplates: [
      '멍멍! 바닷마을 골목길 배달을 돌기 전에 든든한 [ITEM]이 꼭 필요해요!',
      '꼬리가 절로 흔들리는 환상의 [ITEM]! 얼른 맛보고 싶어요!',
      '마을 주민들에게 특종으로 자랑하고 싶은 [ITEM]이에요!'
    ]
  },
  {
    id: 'pip',
    name: '다람쥐 정원사 핍',
    avatar: '🐿️',
    role: '비스트로 플랜테리어',
    preferredChains: ['garden', 'bakery', 'cafe'],
    quoteTemplates: [
      '온실 텃밭 식물들도 반해버린 싱그러운 [ITEM]을 부탁드려요!',
      '테이블을 예쁘게 꾸미며 향긋한 [ITEM]도 곁들이고 싶어요!',
      '도토리보다 백 배는 더 달콤하고 신선한 [ITEM]이에요!'
    ]
  },
  {
    id: 'leo',
    name: '미식가 사자 공작 레오',
    avatar: '🦁',
    role: '황실 수석 미식 평론가',
    preferredChains: ['seafood', 'bakery', 'ruins'],
    quoteTemplates: [
      '황실의 이름으로 명하노라! 최고급 [ITEM]의 품격을 보여주게!',
      '왕립 미식 평론지에 실릴 세기의 명작, 바로 [ITEM]일세!',
      '이 맛... 입안 가득 감동이 밀려오는 완벽한 [ITEM]이로군!'
    ]
  },
  {
    id: 'felix',
    name: '황금 고양이 국왕 펠릭스',
    avatar: '👑',
    role: '바닷마을 왕국 통치자',
    preferredChains: ['bakery', 'cafe', 'seafood', 'ruins'],
    quoteTemplates: [
      '짐의 입맛을 사로잡을 궁극의 명작, [ITEM]을 대령하라!',
      '왕국의 번영을 축하하는 성대한 축제에 [ITEM]이 빠질 수 없지!',
      '비스트로의 셰프여, 그대의 실력을 담은 [ITEM]을 하사하라!'
    ]
  },
  {
    id: 'chloe',
    name: '토끼 소믈리에 클로이',
    avatar: '🐰',
    role: '허브 & 티 마스터',
    preferredChains: ['garden', 'cafe', 'seafood'],
    quoteTemplates: [
      '은은한 티 아로마와 완벽한 조화를 이루는 [ITEM]을 페어링할 시간이에요!',
      '달콤하고 싱그러운 [ITEM] 향에 귀가 쫑긋해져요!',
      '정원의 햇살을 듬뿍 머금은 [ITEM]을 부탁드려요!'
    ]
  },
  {
    id: 'bartolo',
    name: '물개 무역상 바르톨로',
    avatar: '🦭',
    role: '대양 향신료 무역상',
    preferredChains: ['seafood', 'garden', 'ruins'],
    quoteTemplates: [
      '남쪽 대양 군도에서 무역선을 타고 왔소! 소문난 [ITEM]을 맛보러 왔지!',
      '진귀한 향신료 자루를 풀기 전에 최고급 [ITEM] 한 상 부탁하오!',
      '바다 건너 전 대륙에서도 이만한 [ITEM]은 본 적이 없소!'
    ]
  },
  {
    id: 'ariel',
    name: '사슴 음유시인 아리엘',
    avatar: '🦌',
    role: '숲속의 궁정 악사',
    preferredChains: ['cafe', 'bakery', 'garden'],
    quoteTemplates: [
      '선율에 영감을 불어넣어 줄 감미로운 [ITEM]을 노래하고 싶어요.',
      '숲의 정령들도 춤추게 만드는 매혹적인 [ITEM]의 향기예요.',
      '비스트로의 따스함을 담은 [ITEM]으로 하프를 연주할게요.'
    ]
  }
];

export interface DynamicOrderParams {
  playerLevel: number;
  existingOrders?: CustomerOrder[];
  slotIndex?: number;
  isVIP?: boolean;
}

export function generateDynamicOrder({
  playerLevel = 1,
  existingOrders = [],
  slotIndex = 0,
  isVIP = false
}: DynamicOrderParams): CustomerOrder {
  // 1. Calculate Target Item Level based on Player Level & Slot Role
  let baseLevel = 2;
  const safeLvl = Math.max(1, playerLevel);

  if (slotIndex === 0) {
    // Slot 0: Quick Turnover Order (Low-Medium)
    baseLevel = Math.max(2, Math.min(Math.floor(safeLvl * 0.22) + 2, 5));
  } else if (slotIndex === 1) {
    // Slot 1: Balanced Menu Order
    baseLevel = Math.max(2, Math.min(Math.floor(safeLvl * 0.32) + 2, 7));
  } else if (slotIndex === 2) {
    // Slot 2: Specialty / Delicacy Order
    baseLevel = Math.max(3, Math.min(Math.floor(safeLvl * 0.42) + 2, 8));
  } else {
    // Slot 3: Challenge Gourmet Order (High Level Aspirations)
    baseLevel = Math.max(3, Math.min(Math.floor(safeLvl * 0.52) + 3, 10));
  }

  if (isVIP) {
    baseLevel = Math.min(10, baseLevel + 1);
  }

  // Small random level jitter (-1, 0, +1)
  const jitter = Math.floor(Math.random() * 3) - 1;
  const targetLevel = Math.max(2, baseLevel + jitter);

  // 2. Select Chain with Strict Diversity Balancing (Avoid repeating chains)
  const allChains: ItemChainId[] = ['bakery', 'cafe', 'seafood', 'garden', 'ruins'];
  const chainCounts: Record<ItemChainId, number> = {
    bakery: 0,
    cafe: 0,
    seafood: 0,
    garden: 0,
    ruins: 0
  };

  existingOrders.forEach(o => {
    if (chainCounts[o.targetChainId] !== undefined) {
      chainCounts[o.targetChainId]++;
    }
  });

  const minCount = Math.min(...Object.values(chainCounts));
  const candidateChains = allChains.filter(c => chainCounts[c] === minCount);
  const selectedChain = candidateChains[Math.floor(Math.random() * candidateChains.length)];

  // Cap target level by chain's actual maximum item level
  const chainDef = ITEM_CHAINS[selectedChain];
  const maxChainLevel = chainDef ? chainDef.items.length : 10;
  const finalLevel = Math.min(targetLevel, maxChainLevel);

  // Get item metadata
  const itemDef = getItemDef(selectedChain, finalLevel) || {
    name: '특제 비스트로 요리',
    icon: '🍽️',
    description: '',
    sellPrice: 10,
    level: finalLevel
  };

  // 3. Select Matching Customer
  const candidateCustomers = CUSTOMER_ROSTER.filter(c => c.preferredChains.includes(selectedChain));
  const customer = candidateCustomers.length > 0
    ? candidateCustomers[Math.floor(Math.random() * candidateCustomers.length)]
    : CUSTOMER_ROSTER[Math.floor(Math.random() * CUSTOMER_ROSTER.length)];

  const quoteTemplate = customer.quoteTemplates[Math.floor(Math.random() * customer.quoteTemplates.length)];
  const customerQuote = quoteTemplate.replace(/\[ITEM\]/g, itemDef.name);

  // 4. Calculate Scaled Rewards
  const rewardCoins = Math.floor(25 + Math.pow(finalLevel, 2.15) * 8.5 + (isVIP ? 120 : 0));
  const rewardStars = Math.max(3, Math.floor(finalLevel * 2.2));
  let rewardGems = 0;
  if (isVIP) rewardGems = 3;
  else if (finalLevel >= 9) rewardGems = 2;
  else if (finalLevel >= 7) rewardGems = 1;

  return {
    id: `ord-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    customerId: customer.id,
    customerName: customer.name,
    customerAvatar: customer.avatar,
    customerRole: customer.role,
    customerQuote,
    targetChainId: selectedChain,
    targetLevel: finalLevel,
    rewardCoins,
    rewardStars,
    isVIP,
    rewardGems
  };
}

export function generateInitialOrders(playerLevel = 1): CustomerOrder[] {
  const result: CustomerOrder[] = [];
  for (let i = 0; i < 4; i++) {
    result.push(
      generateDynamicOrder({
        playerLevel,
        existingOrders: result,
        slotIndex: i
      })
    );
  }
  return result;
}

export const INITIAL_ORDERS: CustomerOrder[] = generateInitialOrders(1);

export const ORDER_POOL: Omit<CustomerOrder, 'id'>[] = [
  ...generateInitialOrders(3).map(({ id, ...rest }) => rest),
  ...generateInitialOrders(6).map(({ id, ...rest }) => rest),
  ...generateInitialOrders(10).map(({ id, ...rest }) => rest),
  ...generateInitialOrders(15).map(({ id, ...rest }) => rest)
];

export const RESTORATION_NODES: RestorationNode[] = [
  {
    id: 'rest-1',
    chapter: 1,
    title: '1장: 폭풍우에 무너진 테라스 & 입구 복구',
    location: '비스트로 오션 테라스',
    description: '폭풍우로 부서진 데크 목재를 교체하고, 바다 전망을 한눈에 감상할 수 있는 화사한 휴식 공간을 만듭니다.',
    costStars: 5,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '클래식 프로방스', theme: '우드 & 라벤더', icon: '🏡', color: 'bg-emerald-600', description: '자연스러운 원목 테이블과 라벤더 화분이 어우러진 따뜻한 남프랑스풍' },
      { name: '모던 샌드비치', theme: '화이트 & 블루', icon: '🏖️', color: 'bg-sky-600', description: '지중해 휴양지 리조트 느낌의 깔끔한 화이트 데크와 스카이블루 파라솔' },
      { name: '앤틱 브리티시', theme: '다크 브라운 & 놋쇠', icon: '🪵', color: 'bg-amber-800', description: '고급스러운 앤틱 가구와 놋쇠 랜턴이 빛나는 클래식한 분위기' }
    ],
    dialogue: [
      { speaker: '부엉이 촌장', avatar: '🦉', text: '오오! 테라스 바닥이 새것처럼 반짝이는구려! 이제 손님들이 바닷바람을 쐬며 쉴 수 있겠어.' },
      { speaker: '바리스타 고양이', avatar: '🐱', text: '테라스에 햇살이 비추니까 정말 눈부시다냥! 커피 향이 바닷바람을 타고 마을 전체로 퍼질 거야냥!' }
    ]
  },
  {
    id: 'rest-2',
    chapter: 2,
    title: '2장: 침수된 홀 바닥과 앤틱 다이닝 테이블 수리',
    location: '메인 다이닝 홀',
    description: '물이 찼던 식당 내부를 건조하고, 따뜻한 조명과 안락한 가죽 의자를 배치하여 손님들을 맞이합니다.',
    costStars: 8,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '월넛 브라운', theme: '중후한 호두나무 원목', icon: '🪑', color: 'bg-stone-700', description: '따뜻한 온기와 아늑함을 주는 천연 월넛 원목 테이블' },
      { name: '선샤인 보태니컬', theme: '초록 식물 & 베이지', icon: '🪴', color: 'bg-green-600', description: '실내 정원처럼 싱그러운 공기정화 식물들과 화사한 린넨' },
      { name: '로맨틱 캔들라이트', theme: '촛대 조명 & 와인레드', icon: '🕯️', color: 'bg-rose-700', description: '은은한 촛불 조명과 와인레드 가죽으로 품격을 높인 다이닝' }
    ],
    dialogue: [
      { speaker: '파티시에 곰', avatar: '🐻', text: '테이블에서 갓 칠한 왁스 냄새가 좋다곰! 손님 10팀은 거뜬히 앉을 수 있겠다곰!' },
      { speaker: '집배원 강아지', avatar: '🐶', text: '우와! 푹신한 카펫 덕분에 발바닥이 하나도 안 아파요! 마을 소식지에 특종으로 실을게요!' }
    ]
  },
  {
    id: 'rest-3',
    chapter: 3,
    title: '3장: 참나무 화덕 베이커리 메인 오븐 정비',
    location: '센트럴 키친 & 베이커리',
    description: '그을음으로 가득 찬 화덕 내부를 청소하고, 특수 내화 벽돌을 교체하여 400도의 불꽃을 되살립니다.',
    costStars: 12,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '참나무 장작 화덕', theme: '전통 붉은 점토 벽돌', icon: '🔥', color: 'bg-red-700', description: '은은한 참나무 훈연 향이 빵 속에 깊게 배어드는 전통 화덕' },
      { name: '스위스 스톤 오븐', theme: '천연 화강암 석판', icon: '🪨', color: 'bg-slate-600', description: '화강암에서 뿜어져 나오는 원적외선으로 겉은 바삭 속은 촉촉' },
      { name: '골든 엠페러 오븐', theme: '황금빛 황동 테두리', icon: '👑', color: 'bg-yellow-600', description: '황동과 세라믹으로 마감된 비스트로 시그니처 럭셔리 오븐' }
    ],
    dialogue: [
      { speaker: '파티시에 곰', avatar: '🐻', text: '불꽃이 살아났다곰! 화덕 깊은 곳에서 사장님이 숨겨둔 구리 레시피 링을 발견했다곰!' },
      { speaker: '여우 고고학자', avatar: '🦊', text: '잠깐만요! 그 레시피 링에 고대 유적의 나침반 문양과 똑같은 각인이 새겨져 있어요...!' }
    ]
  },
  {
    id: 'rest-4',
    chapter: 4,
    title: '4장: 에스프레소 바리스타 카운터 & 쇼케이스 오픈',
    location: '바리스타 라운지',
    description: '최첨단 3그룹 황동 에스프레소 머신과 투명 유리 디저트 쇼케이스를 완비하여 음료 주문을 2배로 촉진합니다.',
    costStars: 16,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '이탈리안 코퍼 바', theme: '황동 & 마블 대리석', icon: '☕', color: 'bg-amber-700', description: '클래식한 반짝이는 황동 파이프와 순백의 비앙코 대리석 상판' },
      { name: '스칸디나비아 라이트', theme: '자작나무 & 민트', icon: '🌿', color: 'bg-teal-600', description: '군더더기 없는 미니멀리즘 감성과 민트색 포인트의 에스프레소 바' },
      { name: '인더스트리얼 브릭', theme: '노출 벽돌 & 블랙 메탈', icon: '🏭', color: 'bg-neutral-800', description: '뉴욕 소호 카페 분위기의 시크하고 세련된 바리스타 공간' }
    ],
    dialogue: [
      { speaker: '바리스타 고양이', avatar: '🐱', text: '골골송이 절로 나온다냥! 스팀 압력이 완벽해서 라떼 아트를 환상적으로 그릴 수 있다냥!' },
      { speaker: '부엉이 촌장', avatar: '🦉', text: '홀에서 흘러나오는 커피 향에 이끌려 윗마을 주민들까지 몰려오고 있소!' }
    ]
  },
  {
    id: 'rest-5',
    chapter: 5,
    title: '5장: 뒤뜰 유기농 온실 텃밭 & 허브 가든 개간',
    location: '비스트로 온실 뒤뜰',
    description: '무성하게 자란 잡초를 정리하고, 유리 온실과 스프링클러를 설치하여 사계절 신선한 허브를 자급합니다.',
    costStars: 20,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '빅토리아 글래스하우스', theme: '고풍스러운 온실 궁전', icon: '🏛️', color: 'bg-emerald-800', description: '높은 아치형 유리 천장으로 사계절 내내 온실 햇살이 쏟아지는 정원' },
      { name: '코티지 플라워 팜', theme: '야생화 & 목가적 울타리', icon: '🌻', color: 'bg-lime-700', description: '알록달록한 야생화와 나비가 찾아오는 소박하고 정겨운 허브 텃밭' },
      { name: '선셋 오렌지 하이드로', theme: '스마트 수경재배 시스템', icon: '💧', color: 'bg-blue-500', description: '맑은 지하수가 흐르는 현대식 자동 수경재배 정원' }
    ],
    dialogue: [
      { speaker: '다람쥐 정원사', avatar: '🐿️', text: '텃밭 흙을 파다가 이상한 돌판 조각을 찾았어요! 사장님의 손글씨로 "별빛이 가리키는 곳"이라고 적혀있어요!' },
      { speaker: '여우 고고학자', avatar: '🦊', text: '그 돌판은 뒷산 유적 입구의 봉인석 일부예요! 사장님은 유적의 비밀을 풀기 위해 산으로 올라가신 게 틀림없어요!' }
    ]
  },
  {
    id: 'rest-6',
    chapter: 6,
    title: '6장: 뒷산 고대 유적 입구의 가시 덩굴 제거',
    location: '안개 낀 유적 입구',
    description: '수백 년간 입구를 가로막던 고대 가시 덩굴을 특제 허브 용액으로 녹여내고, 안전한 탐사 베이스캠프를 차립니다.',
    costStars: 25,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '고고학자 탐사 캠프', theme: '캔버스 텐트 & 램프', icon: '⛺', color: 'bg-yellow-800', description: '야간 발굴을 위한 조명 발전기와 지도 테이블이 갖춰진 정통 탐사 기지' },
      { name: '스톤 아치 게이트웨이', theme: '고대 석문 & 횃불', icon: '🚪', color: 'bg-purple-800', description: '빛나는 신비한 룬 석조 아치를 복원하여 웅장한 입구를 구축' },
      { name: '별빛 랜턴 패스웨이', theme: '유리등불 & 수정석', icon: '✨', color: 'bg-indigo-700', description: '밤하늘의 은하수를 바닥에 옮겨놓은 듯한 영롱한 수정 불빛 길' }
    ],
    dialogue: [
      { speaker: '여우 고고학자', avatar: '🦊', text: '덩굴이 걷혔어요! 문 안쪽에 사장님의 배낭과 랜턴이 그대로 놓여있어요!' },
      { speaker: '부엉이 촌장', avatar: '🦉', text: '사장님이 안전하게 살아있다는 희망이 생겼소! 어서 안쪽 제단으로 가세!' }
    ]
  },
  {
    id: 'rest-7',
    chapter: 7,
    title: '7장: 사장님의 비밀 레시피 금고 & 별빛 제단 해독',
    location: '고대 유적 성간 중심 제단',
    description: '비스트로의 전설적 번영을 이끌었던 고대 미식의 비밀과 사장님의 행방을 완벽히 밝혀내는 최종 클라이맥스!',
    costStars: 30,
    isRestored: false,
    chosenStyle: 0,
    styles: [
      { name: '황금 별빛 제단', theme: '천상 미식의 성역', icon: '🌟', color: 'bg-amber-500', description: '별자리 빛이 쏟아져 내려 고대 레시피의 마법이 비스트로를 축복하는 제단' },
      { name: '크리스탈 미러 생텀', theme: '영원한 조화의 수정', icon: '💎', color: 'bg-cyan-600', description: '찬란한 푸른 크리스탈 빛이 모든 어둠을 몰아내고 진실을 비추는 성소' },
      { name: '마스터 셰프 헤리티지', theme: '영광의 명예의 전당', icon: '🏆', color: 'bg-rose-600', description: '마을과 비스트로를 살린 영웅들의 이름과 요리가 영원히 기록되는 전당' }
    ],
    dialogue: [
      { speaker: '실종된 사장님', avatar: '👨‍🍳', text: '자네들이 해냈구나! 유적의 고대 향신료를 찾다가 갇혔었는데... 자네가 식당을 이렇게 훌륭하게 재건해줄 줄이야! 정말 고맙네!' },
      { speaker: '모두 함께', avatar: '🎉', text: '와아아아! 비스트로의 완전한 부활을 축하합니다! 마을 최고의 축제를 열어요!' }
    ]
  }
];
