import { ChainDefinition, ItemChainId } from '../types/gameSchema';

export const ITEM_CHAINS: Record<ItemChainId, ChainDefinition> = {
  bakery: {
    id: 'bakery',
    name: '화덕 베이커리',
    categoryName: '갓 구운 빵 & 디저트',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    generatorName: '밀가루 포대',
    generatorIcon: '🌾',
    generatorLevels: [4, 5, 6, 7, 8],
    items: [
      { level: 1, name: '유기농 밀가루', icon: '🌾', description: '고소한 향이 살아있는 제분된 밀가루 가루', sellPrice: 1 },
      { level: 2, name: '발효 반죽', icon: '🥣', description: '천연 효모로 부드럽게 숙성된 빵 반죽', sellPrice: 2 },
      { level: 3, name: '갓 구운 식빵', icon: '🍞', description: '겉바속촉 노릇노릇하게 구워진 기본 식빵', sellPrice: 4 },
      { level: 4, name: '바삭 바게트', icon: '🥖', description: '전통 프랑스식으로 구워낸 고소한 바게트', sellPrice: 8 },
      { level: 5, name: '버터 크루아상', icon: '🥐', description: '겹겹이 쌓인 버터의 풍미가 예술인 크루아상', sellPrice: 16 },
      { level: 6, name: '훈제연어 베이글', icon: '🥯', description: '신선한 크림치즈와 훈제연어를 듬뿍 넣은 베이글', sellPrice: 32 },
      { level: 7, name: '생크림 팬케이크', icon: '🥞', description: '메이플 시럽과 푹신한 수플레 팬케이크', sellPrice: 64 },
      { level: 8, name: '딸기 쇼트케이크', icon: '🍰', description: '산딸기와 생크림이 조화로운 클래식 케이크', sellPrice: 128 },
      { level: 9, name: '초콜릿 퐁당', icon: '🍫', description: '칼을 대면 진한 초콜릿이 흘러내리는 명품 디저트', sellPrice: 256 },
      { level: 10, name: '화덕 바질 피자', icon: '🍕', description: '참나무 화덕에서 고온으로 바삭하게 구워낸 피자', sellPrice: 512 },
      { level: 11, name: '시그니처 과일 타르트', icon: '🥧', description: '비스트로 최고 전성기의 레시피로 재현한 걸작 타르트', sellPrice: 1024 },
    ]
  },

  cafe: {
    id: 'cafe',
    name: '바리스타 카페',
    categoryName: '스페셜티 커피 & 음료',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    generatorName: '에스프레소 머신',
    generatorIcon: '☕',
    generatorLevels: [4, 5, 6, 7, 8],
    items: [
      { level: 1, name: '로스팅 생두', icon: '🫘', description: '고산지대에서 공수한 최고급 스페셜티 커피콩', sellPrice: 1 },
      { level: 2, name: '에스프레소 샷', icon: '☕', description: '두터운 황금빛 크레마가 덮인 진한 샷', sellPrice: 2 },
      { level: 3, name: '아이스 아메리카노', icon: '🧊', description: '깔끔하고 시원한 비스트로 모닝 대표 음료', sellPrice: 4 },
      { level: 4, name: '바닐라 카페라떼', icon: '🥛', description: '고소한 우유와 천연 바닐라빈의 은은한 조화', sellPrice: 8 },
      { level: 5, name: '벨벳 카푸치노', icon: '☕', description: '풍성한 시나몬 거품이 올려진 따뜻한 카푸치노', sellPrice: 16 },
      { level: 6, name: '카라멜 마끼아또', icon: '🍮', description: '달콤한 수제 카라멜 드리즐이 가득한 음료', sellPrice: 32 },
      { level: 7, name: '콜드브루 플로트', icon: '🍨', description: '장시간 저온 추출 커피 위에 바닐라 아이스크림', sellPrice: 64 },
      { level: 8, name: '제주 유기농 말차라떼', icon: '🍵', description: '진한 초록빛 차광재배 말차와 우유의 만남', sellPrice: 128 },
      { level: 9, name: '로얄 얼그레이 밀크티', icon: '🫖', description: '베르가못 향 가득한 최고급 홍차를 우려낸 밀크티', sellPrice: 256 },
      { level: 10, name: '시그니처 구름 아인슈페너', icon: '✨', description: '바리스타 고양이 밀로의 특제 쫀득 크림 라떼', sellPrice: 512 },
    ]
  },

  seafood: {
    id: 'seafood',
    name: '항구 그릴 요리',
    categoryName: '신선한 바다 해산물 요리',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    generatorName: '해산물 보물 바구니',
    generatorIcon: '🧺',
    generatorLevels: [4, 5, 6, 7],
    items: [
      { level: 1, name: '싱싱한 비단조개', icon: '🐚', description: '새벽 항구 시장에서 갓 건져 올린 신선한 조개', sellPrice: 1 },
      { level: 2, name: '대하 숯불 꼬치', icon: '🦐', description: '불향을 입혀 탱글탱글하게 구워낸 왕새우', sellPrice: 2 },
      { level: 3, name: '허브 연어 스테이크', icon: '🐟', description: '껍질은 바삭하고 속은 부드러운 고급 연어구이', sellPrice: 4 },
      { level: 4, name: '지중해 문어 샐러드', icon: '🐙', description: '올리브유와 레몬즙을 곁들인 쫄깃한 문어 요리', sellPrice: 8 },
      { level: 5, name: '버터 가리비 구이', icon: '🦪', description: '마늘 버터 향이 입안 가득 퍼지는 대왕 가리비', sellPrice: 16 },
      { level: 6, name: '사프란 해물 빠에야', icon: '🥘', description: '황금빛 사프란 쌀과 해산물이 풍성한 스페인식 밥', sellPrice: 32 },
      { level: 7, name: '프로방스 부야베스', icon: '🍲', description: '다양한 생선과 허브를 오랜 시간 푹 끓인 프랑스 해물탕', sellPrice: 64 },
      { level: 8, name: '참치 참숯 타다키', icon: '🍣', description: '겉면만 센 불로 익혀 특제 폰즈 소스를 곁들인 별미', sellPrice: 128 },
      { level: 9, name: '갈릭 버터 랍스터 테일', icon: '🦞', description: '치즈와 마늘 버터를 올려 오븐에 구운 바닷가재', sellPrice: 256 },
      { level: 10, name: '로열 임페리얼 시푸드 플래터', icon: '👑', description: '항구 비스트로 만찬의 절정을 알리는 최고급 해산물 종합 세트', sellPrice: 512 },
    ]
  },

  garden: {
    id: 'garden',
    name: '비스트로 텃밭',
    categoryName: '유기농 야채 & 허브',
    badgeColor: 'bg-lime-100 text-lime-900 border-lime-300',
    generatorName: '씨앗 주머니',
    generatorIcon: '🌱',
    generatorLevels: [4, 5, 6, 7],
    items: [
      { level: 1, name: '파릇파릇 새싹', icon: '🌱', description: '비스트로 뒤뜰 텃밭에서 막 돋아난 유기농 새싹', sellPrice: 1 },
      { level: 2, name: '스위트 바질 잎', icon: '🌿', description: '향긋한 피자와 파스타의 필수 식재료', sellPrice: 2 },
      { level: 3, name: '생 로즈마리 줄기', icon: '🪴', description: '스테이크의 잡내를 잡고 풍미를 극대화하는 허브', sellPrice: 4 },
      { level: 4, name: '상큼한 야생 애플민트', icon: '🍃', description: '디저트와 칵테일의 청량감을 책임지는 민트', sellPrice: 8 },
      { level: 5, name: '골든 카모마일 꽃', icon: '🌼', description: '심신을 안정시켜주는 은은한 사과 향의 허브 꽃', sellPrice: 16 },
      { level: 6, name: '보랏빛 라벤더 다발', icon: '💐', description: '비스트로 테이블마다 향기를 채워주는 라벤더', sellPrice: 32 },
      { level: 7, name: '특제 허브 인퓨전 시럽', icon: '🍯', description: '텃밭 허브 5종을 황금 비율로 농축한 만능 시럽', sellPrice: 64 },
      { level: 8, name: '천연 아로마 허브 오일', icon: '🧪', description: '음식의 품격을 몇 단계 올려주는 마법의 오일', sellPrice: 128 },
      { level: 9, name: '미라클 골든 엘릭서 허브', icon: '🌟', description: '고대 유적의 기운을 받고 자란 전설의 식물', sellPrice: 256 },
    ]
  },

  ruins: {
    id: 'ruins',
    name: '유적 탐사 도구',
    categoryName: '미스터리 유적 발굴 장비',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    generatorName: '탐사 작업대',
    generatorIcon: '🧰',
    generatorLevels: [4, 5, 6],
    items: [
      { level: 1, name: '골동품 돋보기', icon: '🔍', description: '벽화와 작은 단서를 확대해 관찰하는 렌즈', sellPrice: 2 },
      { level: 2, name: '유적 발굴용 미세 솔', icon: '🖌️', description: '오랜 먼지를 털어내고 유물을 발굴하는 섬세한 도구', sellPrice: 4 },
      { level: 3, name: '고대 청동 나침반', icon: '🧭', description: '신비로운 자기장을 감지해 방향을 가리키는 나침반', sellPrice: 8 },
      { level: 4, name: '탐사용 방수 손전등', icon: '🔦', description: '어두컴컴한 동굴 유적 깊숙한 곳을 비추는 램프', sellPrice: 16 },
      { level: 5, name: '별빛 문양 청동 열쇠', icon: '🗝️', description: '닫혀 있는 유적 비밀의 방을 여는 열쇠', sellPrice: 32 },
      { level: 6, name: '신비의 룬 문자 석판', icon: '📜', description: '사라진 고대 문명의 지혜가 기록된 파편', sellPrice: 64 },
      { level: 7, name: '실종된 사장님의 비밀 일기', icon: '📖', description: '사장님이 유적으로 향한 이유가 적힌 결정적 일기장', sellPrice: 128 },
      { level: 8, name: '고대 별빛 성간 해독기', icon: '🔮', description: '유적 중앙 제단의 봉인을 풀고 사장님을 찾을 장치', sellPrice: 256 },
    ]
  }
};

export function getItemDef(chainId: ItemChainId, level: number) {
  const chain = ITEM_CHAINS[chainId];
  if (!chain) return null;
  const item = chain.items.find(i => i.level === level);
  return item || null;
}
