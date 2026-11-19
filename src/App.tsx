import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useGameStore } from './store/useGameStore';
import { ResourceHeader } from './components/board/ResourceHeader';
import { OrderQueueBar } from './components/board/OrderQueueBar';
import { MergeBoard } from './components/board/MergeBoard';
import { BottomActionBar } from './components/board/BottomActionBar';
import { Toast } from './components/ui/Toast';
import { ParticleCanvas } from './components/ui/ParticleCanvas';
import { GameTitleLandingScreen } from './components/modals/GameTitleLandingScreen';

// Code-split heavy views and secondary modals to reduce initial JS payload
const TownRestorationView = lazy(() => import('./components/meta/TownRestorationView').then(m => ({ default: m.TownRestorationView })));
const ContinentMapView = lazy(() => import('./components/adventure/ContinentMapView').then(m => ({ default: m.ContinentMapView })));
const CookstagramView = lazy(() => import('./components/meta/CookstagramView').then(m => ({ default: m.CookstagramView })));
const MathSimulatorView = lazy(() => import('./components/meta/MathSimulatorView').then(m => ({ default: m.MathSimulatorView })));

const DialogueModal = lazy(() => import('./components/modals/DialogueModal').then(m => ({ default: m.DialogueModal })));
const StylePickerModal = lazy(() => import('./components/modals/StylePickerModal').then(m => ({ default: m.StylePickerModal })));
const ResetConfirmModal = lazy(() => import('./components/modals/ResetConfirmModal').then(m => ({ default: m.ResetConfirmModal })));
const HelpGuideModal = lazy(() => import('./components/modals/HelpGuideModal').then(m => ({ default: m.HelpGuideModal })));
const HomeMenuModal = lazy(() => import('./components/modals/HomeMenuModal').then(m => ({ default: m.HomeMenuModal })));
const MyPageModal = lazy(() => import('./components/modals/MyPageModal').then(m => ({ default: m.MyPageModal })));
const ShopMarketModal = lazy(() => import('./components/modals/ShopMarketModal').then(m => ({ default: m.ShopMarketModal })));

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'game' | 'adventure' | 'restoration' | 'cookstagram' | 'math'>('game');
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [isTitleLandingOpen, setIsTitleLandingOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const init = useGameStore(s => s.init);

  useEffect(() => {
    setIsMounted(true);
    init();

    const loopTimer = setInterval(() => {
      useGameStore.getState().tickGameLoop();
    }, 1000);

    return () => clearInterval(loopTimer);
  }, [init]);

  if (!isMounted) {
    return null; // SSR hydration safety guard
  }

  return (
    <div className="bg-[#1f1510] text-[#4E342E] font-sans min-h-[100dvh] w-full flex items-center justify-center antialiased selection:bg-amber-200 overflow-hidden">
      
      {/* 60fps Micro Particle Canvas Overlay */}
      <ParticleCanvas />

      {/* Universal Mobile Container - Balanced & Uniform Across All Phone Screen Sizes */}
      <div
        className="w-full max-w-[480px] h-[100dvh] flex flex-col justify-between relative shadow-2xl overflow-hidden select-none touch-none mx-auto"
        style={{
          background:
            'repeating-linear-gradient(90deg, #008770 0px, #008770 38px, #007863 39px, #00937b 40px)'
        }}
      >
        {/* Top Resource & Currency Bar (Map/Board, Energy, Coins, Gems, Shop) */}
        <header role="banner" className="flex-shrink-0 z-30">
          <ResourceHeader
            currentTab={currentTab}
            onToggleAdventure={() => {
              if (currentTab === 'adventure') {
                setCurrentTab('game');
              } else {
                setCurrentTab('adventure');
              }
            }}
            onToggleRestoration={() => {
              if (currentTab === 'restoration') {
                setCurrentTab('game');
              } else {
                setCurrentTab('restoration');
              }
            }}
            onOpenMyPage={() => setIsMyPageOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenResetConfirm={() => setIsResetOpen(true)}
          />
        </header>

        {/* Main Content Area (Semantic Landmark for Accessibility) */}
        <main id="main-content" role="main" className="flex-1 min-h-0 flex flex-col justify-between w-full overflow-hidden">
          {/* 1번: 머지 보드 & 주문 메인 화면 */}
          {currentTab === 'game' && (
            <div className="flex-1 min-h-0 flex flex-col justify-between items-center w-full px-0 overflow-hidden">
              
              {/* Upper Stage: Active Orders Shelf with Cat & Bakery Hero Window (~21% of 19.5:9 viewport) */}
              <div className="w-full flex-shrink-0 px-0.5 pt-0">
                <OrderQueueBar />
              </div>

              {/* Middle Stage: 7x9 Seamless Edge-to-Edge Checkerboard Merge Grid (~58% of 19.5:9 viewport) */}
              <div className="w-full flex-1 min-h-0 flex items-center justify-center px-0.5 py-0 overflow-hidden">
                <MergeBoard />
              </div>

              {/* Bottom Stage: 3-Section Navigation Bar (Left Bag/Menu | Center Pill | Right MyPage/Settings) */}
              <div className="w-full flex-shrink-0 px-1 pb-[max(0.35rem,env(safe-area-inset-bottom,0.6rem))]">
                <BottomActionBar
                  currentTab={currentTab}
                  onOpenHomeMenu={() => setIsHomeMenuOpen(true)}
                  onGoToBoard={() => setCurrentTab('game')}
                  onGoToRestoration={() => setCurrentTab('adventure')}
                  onOpenMyPage={() => setIsMyPageOpen(true)}
                />
              </div>
            </div>
          )}

          {/* 1.5번: 아스테리아 대륙 모험 지도 (RPG 시나리오) 화면 */}
          {currentTab === 'adventure' && (
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-amber-200">지도를 불러오는 중...</div>}>
              <div className="flex-1 min-h-0 flex flex-col justify-between w-full bg-[#FAF7F2] overflow-hidden">
                <div className="flex-1 min-h-0 overflow-y-auto px-2.5 py-2.5 no-scrollbar">
                  <ContinentMapView
                    onBackToBoard={() => setCurrentTab('game')}
                    onGoToRestoration={() => setCurrentTab('restoration')}
                  />
                </div>
                <div className="flex-shrink-0 p-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0.75rem))] border-t border-[#D4A373]/40 bg-[#008770]">
                  <BottomActionBar
                    currentTab={currentTab}
                    onOpenHomeMenu={() => setIsHomeMenuOpen(true)}
                    onGoToBoard={() => setCurrentTab('game')}
                    onGoToRestoration={() => setCurrentTab('restoration')}
                    onOpenMyPage={() => setIsMyPageOpen(true)}
                  />
                </div>
              </div>
            </Suspense>
          )}

          {/* 2번: 식당 & 유적 복원 맵 화면 */}
          {currentTab === 'restoration' && (
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-amber-200">복원 맵을 불러오는 중...</div>}>
              <div className="flex-1 min-h-0 flex flex-col justify-between w-full bg-[#FAF7F2] overflow-hidden">
                <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 no-scrollbar">
                  <TownRestorationView
                    onBackToBoard={() => setCurrentTab('game')}
                    onGoToAdventure={() => setCurrentTab('adventure')}
                  />
                </div>
                <div className="flex-shrink-0 p-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0.75rem))] border-t border-[#D4A373]/40 bg-[#008770]">
                  <BottomActionBar
                    currentTab={currentTab}
                    onOpenHomeMenu={() => setIsHomeMenuOpen(true)}
                    onGoToBoard={() => setCurrentTab('game')}
                    onGoToRestoration={() => setCurrentTab('restoration')}
                    onOpenMyPage={() => setIsMyPageOpen(true)}
                  />
                </div>
              </div>
            </Suspense>
          )}

          {/* 3번: 쿡스타그램 & 크루 화면 */}
          {currentTab === 'cookstagram' && (
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-amber-200">쿡스타그램 로딩 중...</div>}>
              <div className="flex-1 min-h-0 flex flex-col justify-between w-full bg-[#FAF7F2] overflow-hidden">
                <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 no-scrollbar">
                  <CookstagramView onBackToBoard={() => setCurrentTab('game')} />
                </div>
                <div className="flex-shrink-0 p-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0.75rem))] border-t border-[#D4A373]/40 bg-[#008770]">
                  <BottomActionBar
                    currentTab={currentTab}
                    onOpenHomeMenu={() => setIsHomeMenuOpen(true)}
                    onGoToBoard={() => setCurrentTab('game')}
                    onGoToRestoration={() => setCurrentTab('restoration')}
                    onOpenMyPage={() => setIsMyPageOpen(true)}
                  />
                </div>
              </div>
            </Suspense>
          )}

          {/* 4번: 수리 경제 시뮬레이터 화면 */}
          {currentTab === 'math' && (
            <Suspense fallback={<div className="flex-1 flex items-center justify-center text-amber-200">시뮬레이터 로딩 중...</div>}>
              <div className="flex-1 min-h-0 flex flex-col justify-between w-full bg-[#FAF7F2] overflow-hidden">
                <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 no-scrollbar">
                  <MathSimulatorView onBackToBoard={() => setCurrentTab('game')} />
                </div>
                <div className="flex-shrink-0 p-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0.75rem))] border-t border-[#D4A373]/40 bg-[#008770]">
                  <BottomActionBar
                    currentTab={currentTab}
                    onOpenHomeMenu={() => setIsHomeMenuOpen(true)}
                    onGoToBoard={() => setCurrentTab('game')}
                    onGoToRestoration={() => setCurrentTab('restoration')}
                    onOpenMyPage={() => setIsMyPageOpen(true)}
                  />
                </div>
              </div>
            </Suspense>
          )}
        </main>

      </div>

      {/* Full-Screen Modals, Home Drawer & Toast Feedback (Code-Split / Suspense) */}
      <Suspense fallback={null}>
        {isHomeMenuOpen && (
          <HomeMenuModal
            isOpen={isHomeMenuOpen}
            onClose={() => setIsHomeMenuOpen(false)}
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
            onOpenMyPage={() => setIsMyPageOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenResetConfirm={() => setIsResetOpen(true)}
            onOpenLanding={() => setIsTitleLandingOpen(true)}
          />
        )}
        <DialogueModal />
        <StylePickerModal />
        {isResetOpen && <ResetConfirmModal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />}
        {isHelpOpen && <HelpGuideModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />}
        {isMyPageOpen && (
          <MyPageModal
            isOpen={isMyPageOpen}
            onClose={() => setIsMyPageOpen(false)}
            onOpenResetConfirm={() => setIsResetOpen(true)}
          />
        )}
        {isShopOpen && <ShopMarketModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />}
      </Suspense>
      <Toast />

      {/* Game Title & Story Landing Screen (Mobile-Optimized) */}
      <GameTitleLandingScreen
        isOpen={isTitleLandingOpen}
        onStart={() => setIsTitleLandingOpen(false)}
      />

    </div>
  );
};

export default App;
