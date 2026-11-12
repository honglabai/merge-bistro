import { BoardCell, TileState } from '../types/gameSchema';

export const BOARD_COLS = 6;
export const BOARD_ROWS = 8;
export const TOTAL_TILES = BOARD_COLS * BOARD_ROWS; // 48

export function createInitialBoard(): BoardCell[] {
  const cells: BoardCell[] = [];

  for (let i = 0; i < TOTAL_TILES; i++) {
    const row = Math.floor(i / BOARD_COLS);
    const col = i % BOARD_COLS;

    // Center area (rows 2..5, cols 1..4) is OPEN
    const isCenterOpen = row >= 2 && row <= 5 && col >= 1 && col <= 4;

    // Perimeter tiles are COBWEB with trapped rewards (No locked 'box' walls)
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
    chainId: 'bakery' | 'cafe' | 'seafood' | 'garden' | 'ruins',
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

  // Center Open Generators (4 chains)
  place(3, 2, 'bakery', 4, true, 4); // 화덕 베이커리 스포너
  place(3, 3, 'cafe', 4, true, 4);   // 바리스타 커피 스포너
  place(4, 2, 'garden', 4, true, 4); // 정원 텃밭 스포너
  place(4, 3, 'seafood', 4, true, 4); // 항구 해산물 스포너

  // Starting Free Items in Open Tiles (Ready to merge!)
  place(2, 2, 'bakery', 1); // 밀가루
  place(2, 3, 'bakery', 1); // 밀가루 (합성 시 반죽 Lv.2)
  place(5, 2, 'cafe', 1);   // 원두
  place(5, 3, 'cafe', 1);   // 원두 (합성 시 에스프레소 Lv.2)
  place(3, 1, 'garden', 1); // 새싹
  place(4, 1, 'garden', 1); // 새싹 (합성 시 바질 Lv.2)
  place(3, 4, 'seafood', 1); // 비단조개
  place(4, 4, 'seafood', 1); // 비단조개 (합성 시 대하꼬치 Lv.2)

  // Outer Cobweb Trapped Items (Unlocked when neighboring items are merged)
  place(1, 2, 'bakery', 2); // 반죽 (Lv.2)
  place(1, 3, 'cafe', 2);   // 에스프레소 (Lv.2)
  place(2, 1, 'garden', 2); // 바질 (Lv.2)
  place(2, 4, 'seafood', 2); // 대하 꼬치 (Lv.2)
  place(5, 1, 'ruins', 1);  // 가죽 스트랩 (Lv.1)
  place(5, 4, 'ruins', 2);  // 필름 스트립 (Lv.2)
  place(6, 2, 'bakery', 3); // 식빵 (Lv.3)
  place(6, 3, 'cafe', 3);   // 아메리카노 (Lv.3)
  place(0, 2, 'bakery', 4); // 바게트 (Lv.4)
  place(0, 3, 'cafe', 4);   // 라떼 (Lv.4)
  place(7, 2, 'seafood', 3); // 블루 피쉬 (Lv.3)
  place(7, 3, 'garden', 3); // 허브 화분 (Lv.3)

  return cells;
}
