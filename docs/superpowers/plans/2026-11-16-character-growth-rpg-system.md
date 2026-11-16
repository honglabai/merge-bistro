# Character Growth RPG System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure Merge Bistro around an immersive, evolving character progression system where players level up, evolve across 5 chef tiers, allocate RPG stat points (Dexterity, Vitality, Luck, Charisma), unlock passive perks, and experience dynamic level-up rewards.

**Architecture:** 
- Add formal character progression types and mathematical EXP/tier curves in `src/types/gameSchema.ts` and `src/data/characterProgressionData.ts`.
- Integrate EXP accumulation, auto level-up triggers, stat point distribution, and perk bonuses into `useGameStore.ts`.
- Build a full-screen celebratory `LevelUpModal.tsx` with reward reveals, fanfare, and stat point prompts.
- Re-architect `MyPageModal.tsx` Profile tab into an interactive "셰프 성장 센터 (Chef Growth Center)" with stat point allocation, tier evolution badges, and milestone roadmap.
- Dynamically reflect current level and EXP progress in HUD avatars across `BottomActionBar.tsx`, `HomeMenuModal.tsx`, and `App.tsx`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand, Canvas Confetti, Web Audio API synthesizer.

**Spec:** User request to restructure the game around a growing character to heighten immersion as player level rises.

## Global Constraints
- Language: Korean (한국어) for all user-facing UI labels, lore, and dialogues.
- Performance: Must run 60fps on mobile viewports without layout shift or multiline text wrapping.
- Backward Compatibility: Existing saved states in `localStorage` must safely migrate without losing progress.
- Clean Architecture: Type-safe, modular files, 0 TypeScript compile errors.

## Review Focus
1. Offline & existing save migration: Ensure players loading existing saves don't have NaN level or missing stats.
2. Rapid consecutive level-ups: If a player gains enough EXP for multiple levels, handle sequentially without crashing.
3. Stat points integrity: Ensure stat allocation cannot decrement below base values or consume more points than available.
4. Maximum energy scaling: Vitality stat must immediately expand max energy and preserve current energy safely.
5. Mobile viewport safety: All stat controls (`[+]` buttons, EXP gauges, tier cards) must fit within `max-w-[480px]` without horizontal overflow or awkward two-line text wrapping.

---

### Task 1: Character Growth Data Models & Evolution Constants
**Files:**
- Modify: `src/types/gameSchema.ts`
- Create: `src/data/characterProgressionData.ts`

- [x] Add `CharacterStats`, `CharacterTier`, `CharacterPerk`, `LevelMilestone`, `LevelUpEvent` interfaces to `src/types/gameSchema.ts`.
- [x] Define the 5 Evolution Tiers (수습 요리사 ➔ 주니어 셰프 ➔ 수석 파티시에 ➔ 미식 기사단 ➔ 그랜드 마스터) in `src/data/characterProgressionData.ts`.
- [x] Implement `calculateExpForLevel(level)` and `getTierForLevel(level)` utility functions.
- [x] Define the 4 Core Stats:
  - 🍳 손놀림 (Dexterity): 머지 시 보너스 코인 & EXP 획득 확률 증가
  - ⚡ 활력 (Vitality): 최대 에너지 상한선 및 충전 속도 증가
  - 🍀 행운 (Luck): 럭키 버블 출현 확률 & 아이템 복제 확률 증가
  - 👑 카리스마 (Charisma): 주문 서빙 보상(코인/별) 배수 및 VIP 손님 호감도 증가
- [x] Define Level Milestone Perks (Lv.5, 10, 15, 20, 25, 30, 40, 50).

### Task 2: Zustand Store Character RPG Progression Engine
**Files:**
- Modify: `src/store/useGameStore.ts`

- [x] Add character progression state to `GameState`: `level`, `exp`, `expToNextLevel`, `statPoints`, `stats: CharacterStats`, `pendingLevelUp: LevelUpEvent | null`.
- [x] Implement `addExp(amount, reason)` action:
  - Detects level threshold.
  - Awards +3 Stat Points per level up, full energy refill + bonus 50⚡, and gems/coins.
  - Triggers `pendingLevelUp` event.
- [x] Implement `allocateStatPoint(stat)` action to increment Dexterity, Vitality, Luck, or Charisma.
- [x] Implement `dismissLevelUpModal()` action.
- [x] Hook `addExp` into gameplay loops:
  - Every item merge (`mergeOrMoveTile`): +5 to +25 EXP based on merged level.
  - Every order fulfilled (`fulfillOrder`): +30 to +120 EXP based on order stars and VIP status.
  - Every adventure mission reward claimed (`claimMissionReward`): +150 EXP.
  - Every lucky bubble popped (`popLuckyBubble`): +25 EXP.
  - Every fever mode triggered (`triggerFeverMode`): +35 EXP.
- [x] Apply stat effects in calculations:
  - `maxEnergy = 100 + stats.vitality * 5`.
  - Dexterity adds chance for extra coins/EXP on merges.
  - Luck increases lucky bubble spawn rate.
  - Charisma boosts order coins.
- [x] Persist progression in `saveState` and deserialize safely in `init()`.

### Task 3: Level Up Celebration Modal Component
**Files:**
- Create: `src/components/modals/LevelUpModal.tsx`

- [x] Render full-screen celebratory modal with golden radial rays, tier banner, and celebratory sound fanfare.
- [x] Display level advancement (`Lv. X ➔ Lv. X+1`) and newly unlocked Evolution Tier if applicable.
- [x] Display rewards received: +3 스탯 포인트, 에너지 전자동 충전(+50⚡ 보너스), 코인/보석 보너스.
- [x] Provide quick-action buttons: "스탯 분배하러 가기 (성장 센터)" and "계속 요리하기".

### Task 4: Chef Growth Center & Stat Distribution UI in MyPageModal
**Files:**
- Modify: `src/components/modals/MyPageModal.tsx`

- [x] Rebuild the `profile` tab into the **"셰프 캐릭터 성장 센터"**:
  - Hero Character Tier Card: displays current Tier badge, title, level, and next tier preview.
  - Animated EXP Progress Bar with numerical ratio (`EXP 140 / 220 (63%)`).
  - Available Stat Points counter with glowing indicator if points are unspent (`보유 포인트: N개 ✨`).
  - 4 Stat Attribute Cards with `[+]` allocate buttons, current stat values, and detailed perk descriptions.
  - Milestone Perks Roadmap list showcasing benefits unlocked at key levels.
  - Title & Avatar Customization drawer preserving existing customization features.

### Task 5: Dynamic HUD Level Display Across All Views
**Files:**
- Modify: `src/components/board/BottomActionBar.tsx`
- Modify: `src/components/modals/HomeMenuModal.tsx`
- Modify: `src/App.tsx`

- [x] In `BottomActionBar.tsx`, replace static `49` badge with dynamic `{level}` and add circular SVG progress ring around avatar button.
- [x] In `HomeMenuModal.tsx`, replace static `Lv.49` with dynamic `Lv.{level}` and current Evolution Tier title.
- [x] In `App.tsx`, mount `<LevelUpModal />`.

### Task 6: Testing, Build & Live Vercel Deployment
**Files:**
- Project-wide verification

- [x] Execute `npx tsc --noEmit` and `npm run build` to verify 0 errors.
- [ ] Verify EXP gains across merging, order fulfillment, and quest completion.
- [ ] Verify stat allocation and persistent storage across browser refresh.
- [ ] Git commit and push to `origin main`.
- [ ] Verify live Vercel deployment and test on production URL.
