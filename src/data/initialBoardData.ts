import { BoardCell, TileState } from '../types/gameSchema';

export const BOARD_COLS = 7;
export const BOARD_ROWS = 9;
export const TOTAL_TILES = BOARD_COLS * BOARD_ROWS; // 63

export function createInitialBoard(): BoardCell[] {
  const cells: BoardCell[] = [];

  for (let i = 0; i < TOTAL_TILES; i++) {
    const row = Math.floor(i / BOARD_COLS);
    const col = i % BOARD_COLS;

    // Center area (rows 2..6, cols 1..5) is OPEN
    const isCenterOpen = row >= 2 && row <= 6 && col >= 1 && col <= 5;

    // Perimeter tiles are COBWEB with trapped rewards
    const state: TileState = isCenterOpen ? 'OPEN' : 'COBWEB';

    cells.push({
      index: i,
      row,
      col,
      state,
      item: null
    });
  }

  // Helper to place item by row and col
  const place = (
    r: number,
    c: number,
    chainId: 'bakery' | 'cafe' | 'seafood' | 'garden',
    level: number,
    isGenerator = false,
    generatorLevel = 4
  ) => {
    const idx = r * BOARD_COLS + c;
    if (idx >= 0 && idx < TOTAL_TILES) {
      cells[idx].item = {
        id: `init-${r}-${c}-${chainId}-${level}`,
        chainId,
        level,
        isGenerator,
        generatorLevel: isGenerator ? generatorLevel : undefined
      };
    }
  };

  // 4 Center Spawners (Cross configuration):
  place(3, 3, 'seafood', 4, true, 4); // 디저트 쇼케이스 (제과 & 케이크)
  place(4, 2, 'bakery', 4, true, 4);  // 화덕 베이커리 오븐 (빵)
  place(4, 4, 'cafe', 4, true, 4);    // 에스프레소 머신 (커피)
  place(5, 3, 'garden', 4, true, 4);  // 과일 & 허브 바구니 (과일)

  // Starting Free Items in Open Tiles (Ready to merge in pairs!)
  place(3, 2, 'bakery', 1);  // 유기농 밀가루 (빵)
  place(3, 4, 'bakery', 1);  // 유기농 밀가루 (머지 시 반죽 Lv.2!)
  place(4, 3, 'cafe', 1);    // 로스팅 커피 원두 (커피)
  place(5, 2, 'cafe', 1);    // 로스팅 커피 원두 (머지 시 에스프레소 Lv.2!)
  place(2, 3, 'seafood', 1); // 무지개 마카롱 (제과)
  place(5, 4, 'seafood', 1); // 무지개 마카롱 (머지 시 도넛 Lv.2!)
  place(2, 2, 'garden', 1);  // 파릇파릇 새싹 (과일/허브)
  place(2, 4, 'garden', 1);  // 파릇파릇 새싹 (머지 시 바질 Lv.2!)

  // Outer Cobweb Trapped Items (Unlocked when neighboring items merge)
  place(1, 3, 'bakery', 2);  // 발효 반죽 (빵 Lv.2)
  place(7, 3, 'cafe', 2);    // 에스프레소 샷 (커피 Lv.2)
  place(3, 1, 'seafood', 2); // 딸기 글레이즈 도넛 (제과 Lv.2)
  place(3, 5, 'garden', 2);  // 스위트 바질 잎 (과일 Lv.2)
  place(4, 1, 'seafood', 3); // 초콜릿 에클레어 (제과 Lv.3)
  place(4, 5, 'bakery', 3);  // 노릇노릇 식빵 (빵 Lv.3)
  place(5, 1, 'cafe', 3);    // 아이스 아메리카노 (커피 Lv.3)
  place(5, 5, 'cafe', 4);    // 부드러운 카페라떼 (커피 Lv.4)
  place(0, 3, 'bakery', 4);  // 바삭 바게트 (빵 Lv.4)
  place(8, 3, 'seafood', 4); // 딸기 컵케이크 (제과 Lv.4)
  place(2, 1, 'garden', 2);  // 스위트 바질 잎 (과일 Lv.2)
  place(6, 1, 'bakery', 2);  // 발효 반죽 (빵 Lv.2)
  place(2, 5, 'seafood', 2); // 딸기 글레이즈 도넛 (제과 Lv.2)
  place(6, 5, 'garden', 3);  // 허브 꽃 화분 (과일 Lv.3)

  return cells;
}
