# Bistro Fever & Rush Hour Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Merge Bistro from a static casual merge loop into an addictive, high-tension game by introducing Combo & Fever Mode (free generator tapping frenzy), Rush Hour VIP Urgent Timed Orders (high-reward challenges), and Lucky Mystery Bubbles (floating pop-able jackpots).

**Architecture:**
- Extend `useGameStore.ts` with real-time combo tracking, 15s Fever Mode state, floating Lucky Bubbles, and VIP Timed Orders.
- Integrate a high-frequency (500ms) game loop tick for precise countdowns.
- Update `MergeBoard.tsx` with floating interactive bubbles, combo hit markers, and full-screen golden Fever glow.
- Update `OrderQueueBar.tsx` with urgent VIP order cards featuring glowing golden frames, live countdown timers, and 3x/2x rewards.
- Add sound synthesizer fanfares and floating celebratory particle bursts.

**Tech Stack:** React 19, TypeScript, Zustand, Tailwind CSS, Lucide icons, Web Audio API SoundSynthesizer.

## Global Constraints
- Preserve all existing board state, order queues, customer data, and save persistence.
- Zero breaking changes to existing modal dialogues or restoration systems.
- Mobile 60fps performance; no layout thrashing or unbounded interval leaks.

## Review Focus
1. Combo timeout resetting properly without infinite fever loops.
2. Fever mode must safely cap generator taps at free energy cost without crashing when board is full.
3. Lucky bubbles must correctly occupy or float over tiles and clean up on expiration.
4. VIP order timer expiration must gracefully replace order without index corruption.
5. All UI overlays must stay responsive within the universal mobile view container (`max-w-[480px]`).

---

### Task 1: Store & Game Engine Expansion (`useGameStore.ts`)
**Files:**
- Modify: `src/store/useGameStore.ts`
- Modify: `src/types/gameSchema.ts`

- [ ] Add `comboCount`, `comboTimer`, `isFeverActive`, `feverTimeLeft`, `luckyBubbles`, `vipOrder` to `GameState`.
- [ ] Implement `handleComboOnMerge()` in `mergeOrMoveTile` (increments streak, triggers Fever Mode at 5 merges).
- [ ] Implement `triggerFeverMode(durationSec)` (zero energy cost on generator taps for 15s).
- [ ] Implement `spawnLuckyBubble(cellIndex, item)` on high-level merges (Lv.3+).
- [ ] Implement `popLuckyBubble(bubbleId)` awarding instant prizes (energy, coins, duplicate item).
- [ ] Implement `tickGameEngine()` to decrease combo timers, fever countdown, bubble expirations, and VIP countdown.
- [ ] Implement `spawnVIPRushOrder()` with 2-minute timer and 3x rewards.

### Task 2: Fever Mode & Combo Visuals (`MergeBoard.tsx` & Audio)
**Files:**
- Modify: `src/components/board/MergeBoard.tsx`
- Modify: `src/utils/soundSynthesizer.ts`

- [ ] Add upbeat arpeggio/fanfare sounds for Combo Streak, Fever Mode, and Bubble Pop in `soundSynthesizer.ts`.
- [ ] Add full-screen animated golden flame border and sparkling particles during `isFeverActive`.
- [ ] Render floating Combo Streak pill (`🔥 COMBO x3!`, `⚡ FEVER MAX!`) over the board with smooth animation.
- [ ] Add Fever Countdown Bar at top of board showing remaining fever seconds and energy-free status.

### Task 3: Interactive Lucky Mystery Bubbles (`MergeBoard.tsx`)
**Files:**
- Modify: `src/components/board/MergeBoard.tsx`
- Modify: `src/types/gameSchema.ts`

- [ ] Render translucent floating iridescent bubbles over tiles where high-level merges occurred.
- [ ] Add 30-second countdown ring and pulsing shine effect.
- [ ] Add click-to-pop interaction: plays pop audio, bursts particles, and claims reward.
- [ ] Softly pop expired bubbles into 1 gold coin without obstructing tile play.

### Task 4: Rush Hour VIP Urgent Timed Orders (`OrderQueueBar.tsx`)
**Files:**
- Modify: `src/components/board/OrderQueueBar.tsx`
- Modify: `src/store/useGameStore.ts`

- [ ] Support VIP order type with gold animated beacon, VIP crown avatar, and red timer badge (`🚨 01:59`).
- [ ] Display boosted rewards (`🪙 x3`, `⭐ x2`, `💎 +3`).
- [ ] Auto-trigger first VIP order shortly after game starts, and periodically every 5 order completions.
- [ ] Handle VIP success fanfare and graceful departure on timeout.

### Task 5: Verification & Production Deployment
- [ ] Run `npm run build` and resolve all TypeScript/Vite checks.
- [ ] Test combo accumulation, fever mode activation, lucky bubble popping, and VIP order delivery.
- [ ] Commit & push to `main` and verify live deployment on Vercel.
