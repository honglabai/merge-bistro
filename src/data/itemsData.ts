import { ChainDefinition, ItemChainId } from '../types/gameSchema';

export const ITEM_CHAINS: Record<ItemChainId, ChainDefinition> = {
  bakery: {
    id: 'bakery',
    name: '화덕 베이커리 (빵)',
    categoryName: '갓 구운 장인의 빵 & 브레드',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    generatorName: '화덕 오븐',
    generatorIcon: '🥖',
    generatorLevels: [4, 5, 6, 7, 8],
    items: [
      { level: 1, name: '유기농 밀가루', icon: '🌾', description: '고소한 향이 살아있는 제분된 유기농 밀가루', sellPrice: 1 },
      { level: 2, name: '발효 반죽', icon: '🥣', description: '천연 효모로 부드럽게 숙성된 빵 반죽', sellPrice: 2 },
      { level: 3, name: '노릇노릇 식빵', icon: '🍞', description: '겉바속촉 갓 구워낸 따뜻한 우유 식빵', sellPrice: 4 },
      { level: 4, name: '바삭 바게트', icon: '🥖', description: '전통 프랑스식으로 구워낸 고소한 바게트', sellPrice: 8 },
      { level: 5, name: '골든 버터 크루아상', icon: '🥐', description: '겹겹이 쌓인 버터의 풍미가 예술인 크루아상', sellPrice: 16 },
      { level: 6, name: '구운 소시지 핫도그', icon: '🌭', description: '육즙 가득한 소시지와 머스터드 핫도그', sellPrice: 32 },
      { level: 7, name: '수플레 팬케이크', icon: '🥞', description: '메이플 시럽과 버터를 얹은 푹신한 팬케이크', sellPrice: 64 },
      { level: 8, name: '브리오슈 수제버거', icon: '🍔', description: '육즙 가득한 패티와 신선한 채소의 프리미엄 버거', sellPrice: 128 },
      { level: 9, name: '화덕 바질 피자', icon: '🍕', description: '참나무 화덕에서 고온으로 구워낸 나폴리 피자', sellPrice: 256 },
      { level: 10, name: '골든 베이커리 바구니', icon: '🧺', description: '비스트로 베이커리 인기 빵이 가득 담긴 세트', sellPrice: 512 },
      { level: 11, name: '장인의 사워도우 깜파뉴', icon: '👑', description: '비스트로 최고 전성기의 비법으로 빚어낸 명품 사워도우', sellPrice: 1024 },
    ]
  },

  cafe: {
    id: 'cafe',
    name: '바리스타 카페 (커피)',
    categoryName: '스페셜티 커피 & 카페 음료',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    generatorName: '에스프레소 머신',
    generatorIcon: '☕',
    generatorLevels: [4, 5, 6, 7, 8],
    items: [
      { level: 1, name: '로스팅 커피 원두', icon: '🫘', description: '고산지대에서 공수한 최고급 스페셜티 원두', sellPrice: 1 },
      { level: 2, name: '진한 에스프레소 샷', icon: '☕', description: '두터운 황금빛 크레마가 덮인 깊은 풍미의 샷', sellPrice: 2 },
      { level: 3, name: '아이스 아메리카노', icon: '🧊', description: '깔끔하고 시원한 비스트로 모닝 대표 음료', sellPrice: 4 },
      { level: 4, name: '부드러운 카페라떼', icon: '🥛', description: '고소한 우유와 에스프레소의 실키한 조화', sellPrice: 8 },
      { level: 5, name: '벨벳 카푸치노', icon: '☕', description: '풍성한 시나몬 거품이 올려진 따뜻한 카푸치노', sellPrice: 16 },
      { level: 6, name: '달콤 카라멜 마끼아또', icon: '🍮', description: '달콤한 수제 카라멜 드리즐이 가득한 음료', sellPrice: 32 },
      { level: 7, name: '바닐라 콜드브루 플로트', icon: '🍨', description: '저온 추출 커피 위에 달콤한 바닐라 아이스크림', sellPrice: 64 },
      { level: 8, name: '제주 유기농 말차라떼', icon: '🍵', description: '진한 초록빛 차광재배 말차와 부드러운 우유', sellPrice: 128 },
      { level: 9, name: '로얄 얼그레이 티팟', icon: '🫖', description: '베르가못 향 가득한 최고급 홍차 티팟 세트', sellPrice: 256 },
      { level: 10, name: '시그니처 구름 아인슈페너', icon: '✨', description: '바리스타 밀로의 특제 쫀득 크림 라떼', sellPrice: 512 },
    ]
  },

  seafood: {
    id: 'seafood',
    name: '달콤 파티시에 (제과)',
    categoryName: '수제 마카롱, 도넛 & 프리미엄 케이크',
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300',
    generatorName: '디저트 쇼케이스',
    generatorIcon: '🧁',
    generatorLevels: [4, 5, 6, 7],
    items: [
      { level: 1, name: '무지개 마카롱', icon: '🍬', description: '바삭하고 쫀득한 프랑스 전통 수제 마카롱', sellPrice: 1 },
      { level: 2, name: '딸기 글레이즈 도넛', icon: '🍩', description: '핑크빛 딸기 글레이즈와 스프링클이 올라간 도넛', sellPrice: 2 },
      { level: 3, name: '초콜릿 에클레어', icon: '🍫', description: '진한 다크 초콜릿 글레이즈와 커스터드 크림 에클레어', sellPrice: 4 },
      { level: 4, name: '딸기 생크림 컵케이크', icon: '🧁', description: '부드러운 스펀지 위에 솜사탕 같은 딸기 크림', sellPrice: 8 },
      { level: 5, name: '클래식 티라미수', icon: '🍰', description: '에스프레소에 적신 사보이아르디와 마스카포네 치즈', sellPrice: 16 },
      { level: 6, name: '클래식 딸기 쇼트케이크', icon: '🍰', description: '새빨간 생딸기와 순우유 생크림의 시그니처 케이크', sellPrice: 32 },
      { level: 7, name: '프랑스 몽블랑 밤케이크', icon: '🌰', description: '은은한 밤 퓌레 크림을 듬뿍 올린 가을의 명작', sellPrice: 64 },
      { level: 8, name: '3단 로열 파티 케이크', icon: '🎂', description: '축제의 화려함을 장식하는 3단 생크림 케이크', sellPrice: 128 },
      { level: 9, name: '골든 샤인머스캣 타르트', icon: '🥧', description: '아삭한 샤인머스캣과 바닐라 커스터드 크림 타르트', sellPrice: 256 },
      { level: 10, name: '그랜드 파티시에 디저트 타워', icon: '👑', description: '비스트로 파티시에 장인의 모든 디저트가 총망라된 걸작 타워', sellPrice: 512 },
    ]
  },

  garden: {
    id: 'garden',
    name: '비스트로 과일 & 텃밭',
    categoryName: '신선한 생과일 & 유기농 베이킹 허브',
    badgeColor: 'bg-lime-100 text-lime-900 border-lime-300',
    generatorName: '과일 & 씨앗 바구니',
    generatorIcon: '🌱',
    generatorLevels: [4, 5, 6, 7],
    items: [
      { level: 1, name: '파릇파릇 새싹', icon: '🌱', description: '비스트로 텃밭에서 갓 돋아난 유기농 새싹', sellPrice: 1 },
      { level: 2, name: '스위트 바질 잎', icon: '🌿', description: '향긋한 피자와 샐러드의 필수 허브', sellPrice: 2 },
      { level: 3, name: '허브 꽃 화분', icon: '🪴', description: '향기로운 꽃을 피우는 비스트로 전용 화분', sellPrice: 4 },
      { level: 4, name: '싱그러운 블루베리', icon: '🫐', description: '타르트와 팬케이크에 올리는 싱싱한 블루베리', sellPrice: 8 },
      { level: 5, name: '썬키스트 레몬', icon: '🍋', description: '디저트의 풍미를 돋우는 상큼한 노란 레몬', sellPrice: 16 },
      { level: 6, name: '달콤 꿀사과', icon: '🍎', description: '애플파이와 잼에 사용하는 아삭한 사과', sellPrice: 32 },
      { level: 7, name: '루비 레드 체리', icon: '🍒', description: '케이크 꼭대기를 장식하는 탐스러운 빨간 체리', sellPrice: 64 },
      { level: 8, name: '수제 딸기잼 병', icon: '🍯', description: '생과일을 듬뿍 졸여 만든 달콤한 수제 잼', sellPrice: 128 },
      { level: 9, name: '미라클 골든 과수', icon: '🌟', description: '황금빛 열매가 열리는 전설의 과일 나무', sellPrice: 256 },
    ]
  },

  ruins: {
    id: 'ruins',
    name: '마스터 셰프 도구',
    categoryName: '장인의 베이킹 & 조리 기구',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    generatorName: '셰프 작업대',
    generatorIcon: '🧰',
    generatorLevels: [4, 5, 6],
    items: [
      { level: 1, name: '우드 롤링핀', icon: '🪵', description: '반죽을 고르게 밀어 펴는 단단한 나무 밀대', sellPrice: 2 },
      { level: 2, name: '스테인리스 거품기', icon: '🥣', description: '달걀과 생크림을 부드럽게 휘핑하는 도구', sellPrice: 4 },
      { level: 3, name: '황동 앤틱 커피밀', icon: '☕', description: '원두를 균일하게 분쇄하는 클래식 핸드밀', sellPrice: 8 },
      { level: 4, name: '파티시에 계량 스푼', icon: '🥄', description: '정확한 황금 레시피 계량을 위한 스푼 세트', sellPrice: 16 },
      { level: 5, name: '프랑스 구리 소스팬', icon: '🍳', description: '열전도율이 뛰어난 최고급 구리 소스팬', sellPrice: 32 },
      { level: 6, name: '마스터 셰프 나이프', icon: '🔪', description: '식재료를 섬세하게 다듬는 장인의 산토쿠 칼', sellPrice: 64 },
      { level: 7, name: '크리스탈 케이크 돔', icon: '🍽️', description: '케이크의 촉촉함을 보존하는 투명 크리스탈 돔', sellPrice: 128 },
      { level: 8, name: '골든 셰프 마스터 트로피', icon: '🏆', description: '비스트로 재건을 증명하는 전설의 명예 트로피', sellPrice: 256 },
    ]
  }
};

export function getItemDef(chainId: ItemChainId, level: number) {
  const chain = ITEM_CHAINS[chainId];
  if (!chain) return null;
  const item = chain.items.find(i => i.level === level);
  return item || null;
}
