---
name: merge2-economy-validator
description: 머지-2 게임의 아이템 체인, 생성기 드롭 확률표, 주문 큐 요구사항을 생성하거나 수정할 때 활성화합니다.
---
# Merge-2 Economy & Balance Validation Protocol
1. 모든 아이템 등가 가치는 2^(level - 1)로 계산하십시오.
2. 생성기 dropTable 확률 총합은 반드시 정확히 1.0 이어야 합니다.
3. 활성 주문 큐 4슬롯 중 희귀 생성기 주문은 최대 1개로 제한하십시오.
4. 보드 데드락 방지를 위해 항상 최소 1개 이상의 생산 체인이 스폰 가능해야 합니다.
