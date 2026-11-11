import { CustomerOrder, RestorationNode } from '../types/gameSchema';

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-1',
    customerId: 'barnaby',
    customerName: '부엉이 촌장 버나비',
    customerAvatar: '🦉',
    customerRole: '바닷마을 자치위원장',
    customerQuote: '폭풍우에 상심하지 말게! 이 따끈한 반죽으로 마을 사람들의 기운을 북돋아주게.',
    targetChainId: 'bakery',
    targetLevel: 2, // 발효 반죽
    rewardCoins: 40,
    rewardStars: 3
  },
  {
    id: 'ord-2',
    customerId: 'milo',
    customerName: '바리스타 고양이 밀로',
    customerAvatar: '🐱',
    customerRole: '비스트로 수석 바리스타',
    customerQuote: '모닝 커피 한 잔이 없으면 손님들이 안 와요냥! 갓 내린 샷 한 잔 부탁해냥!',
    targetChainId: 'cafe',
    targetLevel: 2, // 에스프레소 샷
    rewardCoins: 40,
    rewardStars: 3
  },
  {
    id: 'ord-3',
    customerId: 'toby',
    customerName: '집배원 강아지 토비',
    customerAvatar: '🐶',
    customerRole: '비스트로 전속 배달원',
    customerQuote: '멍멍! 아침 우편물 배달 돌기 전에 갓 구운 고소한 식빵이 꼭 필요해요!',
    targetChainId: 'bakery',
    targetLevel: 3, // 갓 구운 식빵
    rewardCoins: 75,
    rewardStars: 5
  },
  {
    id: 'ord-4',
    customerId: 'fiona',
    customerName: '여우 고고학자 피오나',
    customerAvatar: '🦊',
    customerRole: '고대 유적 탐사원',
    customerQuote: '유적 문서에 의하면 사장님이 즐겨 쓰던 약초가 있었어요. 신선한 바질을 구해줄 수 있나요?',
    targetChainId: 'garden',
    targetLevel: 2, // 스위트 바질 잎
    rewardCoins: 50,
    rewardStars: 4
  }
];

export const ORDER_POOL: Omit<CustomerOrder, 'id'>[] = [
  {
    customerId: 'bruno',
    customerName: '파티시에 곰 브루노',
    customerAvatar: '🐻',
    customerRole: '명예 제빵 마스터',
    customerQuote: '화덕의 온도가 올라가고 있어 곰! 파삭파삭한 프랑스식 바게트를 만들 차례라곰!',
    targetChainId: 'bakery',
    targetLevel: 4,
    rewardCoins: 110,
    rewardStars: 7
  },
  {
    customerId: 'barnaby',
    customerName: '부엉이 촌장 버나비',
    customerAvatar: '🦉',
    customerRole: '바닷마을 자치위원장',
    customerQuote: '회의 도중 마실 시원한 아메리카노가 간절하구려. 부탁하네!',
    targetChainId: 'cafe',
    targetLevel: 3,
    rewardCoins: 80,
    rewardStars: 5
  },
  {
    customerId: 'waddles',
    customerName: '선장 펭귄 와들스',
    customerAvatar: '🐧',
    customerRole: '항구 어시장 선장',
    customerQuote: '끄아악! 배 위에서 구워먹는 대하 꼬치의 불맛은 그 무엇과도 바꿀 수 없지!',
    targetChainId: 'seafood',
    targetLevel: 2,
    rewardCoins: 60,
    rewardStars: 4
  },
  {
    customerId: 'pip',
    customerName: '다람쥐 정원사 핍',
    customerAvatar: '🐿️',
    customerRole: '비스트로 플랜테리어',
    customerQuote: '텃밭에서 진한 향이 피어오르고 있어요! 로즈마리를 가져다주시면 장식해볼게요!',
    targetChainId: 'garden',
    targetLevel: 3,
    rewardCoins: 85,
    rewardStars: 6
  },
  {
    customerId: 'milo',
    customerName: '바리스타 고양이 밀로',
    customerAvatar: '🐱',
    customerRole: '비스트로 수석 바리스타',
    customerQuote: '부드러운 우유 거품과 바닐라 향의 조화! 바닐라 라떼를 주문받았냥!',
    targetChainId: 'cafe',
    targetLevel: 4,
    rewardCoins: 125,
    rewardStars: 8
  },
  {
    customerId: 'bruno',
    customerName: '파티시에 곰 브루노',
    customerAvatar: '🐻',
    customerRole: '명예 제빵 마스터',
    customerQuote: '이 버터의 층을 보라곰! 황금빛 결이 살아있는 명품 크루아상이다곰!',
    targetChainId: 'bakery',
    targetLevel: 5,
    rewardCoins: 180,
    rewardStars: 11
  },
  {
    customerId: 'waddles',
    customerName: '선장 펭귄 와들스',
    customerAvatar: '🐧',
    customerRole: '항구 어시장 선장',
    customerQuote: '노르웨이에서 공수한 최상급 연어를 허브에 재워 바삭하게 구워주게나!',
    targetChainId: 'seafood',
    targetLevel: 3,
    rewardCoins: 100,
    rewardStars: 7
  },
  {
    customerId: 'fiona',
    customerName: '여우 고고학자 피오나',
    customerAvatar: '🦊',
    customerRole: '고대 유적 탐사원',
    customerQuote: '유적 동굴은 짙은 안개로 둘러싸여 있어요. 방향을 잡아줄 청동 나침반이 필요합니다!',
    targetChainId: 'ruins',
    targetLevel: 3,
    rewardCoins: 140,
    rewardStars: 9
  },
  {
    customerId: 'toby',
    customerName: '집배원 강아지 토비',
    customerAvatar: '🐶',
    customerRole: '비스트로 전속 배달원',
    customerQuote: '배달 중 간식으로는 훈제연어 베이글이 최고예요! 꼬리가 절로 흔들려요!',
    targetChainId: 'bakery',
    targetLevel: 6,
    rewardCoins: 260,
    rewardStars: 15
  },
  {
    customerId: 'barnaby',
    customerName: '부엉이 촌장 버나비',
    customerAvatar: '🦉',
    customerRole: '바닷마을 자치위원장',
    customerQuote: '시나몬 가루를 듬뿍 얹은 카푸치노 한 모금에 하루의 피로가 사르르 녹는군.',
    targetChainId: 'cafe',
    targetLevel: 5,
    rewardCoins: 210,
    rewardStars: 13
  },
  {
    customerId: 'fiona',
    customerName: '여우 고고학자 피오나',
    customerAvatar: '🦊',
    customerRole: '고대 유적 탐사원',
    customerQuote: '유적 벽면에 새겨진 비밀 문양의 열쇠를 찾았어요! 별빛 문양 열쇠를 합성해주세요!',
    targetChainId: 'ruins',
    targetLevel: 5,
    rewardCoins: 350,
    rewardStars: 20
  }
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
