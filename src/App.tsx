import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { ResourceHeader } from './components/board/ResourceHeader';
import { OrderQueueBar } from './components/board/OrderQueueBar';
import { MergeBoard } from './components/board/MergeBoard';
import { BottomActionBar } from './components/board/BottomActionBar';
import { TownRestorationView } from './components/meta/TownRestorationView';
import { CookstagramView } from './components/meta/CookstagramView';
import { MathSimulatorView } from './components/meta/MathSimulatorView';
import { DialogueModal } from './components/modals/DialogueModal';
import { StylePickerModal } from './components/modals/StylePickerModal';
import { ResetConfirmModal } from './components/modals/ResetConfirmModal';
import { HelpGuideModal } from './components/modals/HelpGuideModal';
import { HomeMenuModal } from './components/modals/HomeMenuModal';
import { MyPageModal } from './components/modals/MyPageModal';
import { Toast } from './components/ui/Toast';
import { ParticleCanvas } from './components/ui/ParticleCanvas';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'game' | 'restoration' | 'cookstagram' | 'math'>('game');
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const init = useGameStore(s => s.init);

  useEffect(() => {
    setIsMounted(true);
    init();
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
        <div className="flex-shrink-0 z-30">
          <ResourceHeader
            currentTab={currentTab}
            onToggleRestoration={() => {
              if (currentTab === 'restoration') {
                setCurrentTab('game');
              } else {
                setCurrentTab('restoration');
              }
            }}
            onOpenMyPage={() => setIsMyPageOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenResetConfirm={() => setIsResetOpen(true)}
          />
        </div>

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
                onGoToRestoration={() => setCurrentTab('restoration')}
                onOpenMyPage={() => setIsMyPageOpen(true)}
              />
            </div>
          </div>
        )}

        {/* 2번: 식당 & 유적 복원 맵 화면 */}
        {currentTab === 'restoration' && (
          <div className="flex-1 min-h-0 flex flex-col justify-between w-full bg-[#FAF7F2] overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 no-scrollbar">
              <TownRestorationView onBackToBoard={() => setCurrentTab('game')} />
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
        )}

        {/* 3번: 쿡스타그램 & 크루 화면 */}
        {currentTab === 'cookstagram' && (
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
        )}

        {/* 4번: 수리 경제 시뮬레이터 화면 */}
        {currentTab === 'math' && (
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
        )}

      </div>

      {/* Full-Screen Modals, Home Drawer & Toast Feedback */}
      <HomeMenuModal
        isOpen={isHomeMenuOpen}
        onClose={() => setIsHomeMenuOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenMyPage={() => setIsMyPageOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenResetConfirm={() => setIsResetOpen(true)}
      />
      <DialogueModal />
      <StylePickerModal />
      <ResetConfirmModal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />
      <HelpGuideModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <MyPageModal
        isOpen={isMyPageOpen}
        onClose={() => setIsMyPageOpen(false)}
        onOpenResetConfirm={() => setIsResetOpen(true)}
      />
      <Toast />

    </div>
  );
};

export default App;
