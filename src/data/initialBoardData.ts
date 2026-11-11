import { BoardCell, TileState } from '../types/gameSchema';

export function createInitialBoard(): BoardCell[] {
  const cells: BoardCell[] = [];

  for (let i = 0; i < 63; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;

    const isCenter = row >= 3 && row <= 5 && col >= 2 && col <= 4;
    const isBorder = row === 0 || row === 8 || col === 0 || col === 6;

    let state: TileState = 'COBWEB';
    if (isBorder) {
      state = 'LOCKED';
    } else if (isCenter) {
      state = 'OPEN';
    }

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
    const idx = r * 7 + c;
    if (idx >= 0 && idx < 63) {
      cells[idx].item = {
        id: `init-${r}-${c}-${chainId}-${level}`,
        chainId,
        level,
        isGenerator,
        generatorLevel: isGenerator ? generatorLevel : undefined
      };
    }
  };

  // Center Generators (Open)
  place(4, 3, 'bakery', 4, true, 4); // 밀가루 포대 (중앙)
  place(4, 4, 'cafe', 4, true, 4);   // 커피 머신 (우측)
  place(4, 2, 'garden', 4, true, 4); // 씨앗 주머니 (좌측)

  // Starting Free Items (Ready to merge in Open 3x3)
  place(3, 3, 'bakery', 1); // 밀가루
  place(3, 4, 'bakery', 1); // 밀가루 (합성하면 반죽 Lv.2)
  place(5, 3, 'cafe', 1);   // 원두
  place(5, 4, 'cafe', 1);   // 원두 (합성하면 에스프레소 Lv.2)
  place(3, 2, 'garden', 1); // 새싹
  place(5, 2, 'garden', 1); // 새싹

  // Cobweb trapped items for rewarding unlocks
  place(2, 3, 'bakery', 2); // 반죽 (Lv.2)
  place(2, 4, 'cafe', 2);   // 에스프레소 (Lv.2)
  place(2, 2, 'garden', 2); // 바질 (Lv.2)

  place(3, 1, 'bakery', 2); // 반죽 (Lv.2)
  place(4, 1, 'seafood', 1); // 비단조개 (Lv.1)
  place(5, 1, 'ruins', 1);  // 돋보기 (Lv.1)

  place(3, 5, 'seafood', 1); // 비단조개 (Lv.1)
  place(4, 5, 'garden', 2); // 바질 (Lv.2)
  place(5, 5, 'cafe', 2);   // 에스프레소 (Lv.2)

  place(6, 3, 'bakery', 3); // 식빵 (Lv.3)
  place(6, 4, 'cafe', 3);   // 아메리카노 (Lv.3)
  place(6, 2, 'ruins', 2);  // 미세 솔 (Lv.2)

  place(1, 3, 'bakery', 4); // 바게트 (Lv.4)
  place(1, 4, 'cafe', 4);   // 바닐라 라떼 (Lv.4)
  place(7, 3, 'seafood', 2); // 대하 꼬치 (Lv.2)
  place(7, 4, 'garden', 3); // 로즈마리 (Lv.3)

  return cells;
}
