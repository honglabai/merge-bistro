import React, { useState, useEffect } from 'react';
import { Gamepad2, Hammer, Camera, Calculator, Terminal, BookOpen } from 'lucide-react';
import { useGameStore } from './store/useGameStore';
import { ResourceHeader } from './components/board/ResourceHeader';
import { OrderQueueBar } from './components/board/OrderQueueBar';
import { MergeBoard } from './components/board/MergeBoard';
import { BackpackStorage } from './components/board/BackpackStorage';
import { ItemInspectorBar } from './components/board/ItemInspectorBar';
import { TownRestorationView } from './components/meta/TownRestorationView';
import { CookstagramView } from './components/meta/CookstagramView';
import { MathSimulatorView } from './components/meta/MathSimulatorView';
import { AntigravityPortalView } from './components/meta/AntigravityPortalView';
import { DialogueModal } from './components/modals/DialogueModal';
import { StylePickerModal } from './components/modals/StylePickerModal';
import { ResetConfirmModal } from './components/modals/ResetConfirmModal';
import { HelpGuideModal } from './components/modals/HelpGuideModal';
import { Toast } from './components/ui/Toast';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'game' | 'restoration' | 'cookstagram' | 'math' | 'antigravity'>('game');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const init = useGameStore(s => s.init);
  const restorations = useGameStore(s => s.restorations);
  const stars = useGameStore(s => s.stars);
  const openRestorationPicker = useGameStore(s => s.openRestorationPicker);

  useEffect(() => {
    init();
  }, [init]);

  const nextRestorationNode = restorations.find(r => !r.isRestored);

  return (
    <div className="bg-cream-100 text-slate-800 font-sans min-h-screen flex flex-col antialiased selection:bg-amber-200">
      
      {/* Top Resource & Settings Header */}
      <ResourceHeader
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenResetConfirm={() => setIsResetOpen(true)}
      />

      {/* Navigation Tabs Bar */}
      <nav className="bg-cream-200 border-b border-cream-300 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-cream-200/90">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 text-xs sm:text-sm font-extrabold no-scrollbar">
            
            <button
              onClick={() => setCurrentTab('game')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'game'
                  ? 'bg-sage-600 text-white shadow-sm ring-1 ring-sage-700'
                  : 'text-slate-700 hover:bg-cream-300'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>1. 머지 보드 & 주문</span>
            </button>

            <button
              onClick={() => setCurrentTab('restoration')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'restoration'
                  ? 'bg-sage-600 text-white shadow-sm ring-1 ring-sage-700'
                  : 'text-slate-700 hover:bg-cream-300'
              }`}
            >
              <Hammer className="w-4 h-4" />
              <span>2. 식당 & 유적 복원</span>
              {nextRestorationNode && stars >= nextRestorationNode.costStars && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('cookstagram')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'cookstagram'
                  ? 'bg-sage-600 text-white shadow-sm ring-1 ring-sage-700'
                  : 'text-slate-700 hover:bg-cream-300'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>3. 쿡스타그램 & 크루</span>
            </button>

            <button
              onClick={() => setCurrentTab('math')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'math'
                  ? 'bg-sage-600 text-white shadow-sm ring-1 ring-sage-700'
                  : 'text-slate-700 hover:bg-cream-300'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>4. 수리 경제 시뮬레이터</span>
            </button>

            <button
              onClick={() => setCurrentTab('antigravity')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'antigravity'
                  ? 'bg-terracotta-500 text-white shadow-sm ring-1 ring-terracotta-600'
                  : 'text-slate-700 hover:bg-cream-300'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>5. 안티그래비티 2.0 & 프롬프트</span>
            </button>

          </div>
        </div>
      </nav>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-6 flex-grow w-full">
        {currentTab === 'game' && (
          <div className="space-y-4">
            
            {/* Active Orders Queue */}
            <OrderQueueBar />

            {/* Core Board & Side Panel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              
              {/* Left / Center 63-Tile Merge Board (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <MergeBoard />
                <BackpackStorage />
                <ItemInspectorBar />
              </div>

              {/* Right Side Panel: Quick Restoration & Story Logs (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Next Restoration Quest Card */}
                {nextRestorationNode ? (
                  <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-terracotta-600 bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta-200">
                        현재 복원 목표: Chapter {nextRestorationNode.chapter}
                      </span>
                      <span className="text-xs font-black text-amber-600">
                        필요: {nextRestorationNode.costStars}⭐ (보유: {stars}⭐)
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900">
                      {nextRestorationNode.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {nextRestorationNode.description}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => setCurrentTab('restoration')}
                        className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-2"
                      >
                        전체 복원 목록 보기 →
                      </button>

                      <button
                        onClick={() => openRestorationPicker(nextRestorationNode)}
                        disabled={stars < nextRestorationNode.costStars}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow ${
                          stars >= nextRestorationNode.costStars
                            ? 'bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-amber-600 hover:to-terracotta-600 text-white animate-pulse active:scale-95'
                            : 'bg-cream-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Hammer className="w-3.5 h-3.5" />
                        <span>지금 복원하기</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-5 rounded-2xl border border-amber-300 shadow-sm text-center">
                    <span className="text-3xl">🎉</span>
                    <h3 className="text-sm font-black text-slate-900 mt-1">
                      모든 시설 및 고대 유적 복원 완료!
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      실종된 사장님이 무사히 돌아왔습니다! 비스트로의 전설적 성공을 축하합니다!
                    </p>
                  </div>
                )}

                {/* Village Story Journal */}
                <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-cream-200 pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-wood-600" />
                      <h3 className="text-xs font-extrabold text-slate-800">
                        바닷마을 & 유적 스토리 일지
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      실종 사건 추적 중
                    </span>
                  </div>

                  <div className="bg-cream-50 p-3 rounded-xl border border-cream-200 text-xs text-slate-700 space-y-2 max-h-56 overflow-y-auto leading-relaxed">
                    <div className="p-2.5 bg-white rounded-lg border border-cream-300 shadow-2xs">
                      <span className="font-extrabold text-slate-900">부엉이 촌장:</span>{' '}
                      "폭풍우로 레스토랑이 무너지고 사장님마저 일주일째 행방불명이라니... 자네가 이 식당을 구해주게!"
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-cream-300 shadow-2xs">
                      <span className="font-extrabold text-slate-900">바리스타 밀로:</span>{' '}
                      "사장님은 유적의 고대 향신료 레시피를 연구하러 가셨어요냥. 식당을 복구하면 단서를 찾을 수 있어요냥!"
                    </div>
                    {restorations.filter(r => r.isRestored).map(r => (
                      <div key={r.id} className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-950">
                        <span className="font-black text-terracotta-700">[{r.title} 완료]</span>{' '}
                        {r.dialogue[0]?.text || '성공적으로 구역을 복구했습니다.'}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {currentTab === 'restoration' && <TownRestorationView />}
        {currentTab === 'cookstagram' && <CookstagramView />}
        {currentTab === 'math' && <MathSimulatorView />}
        {currentTab === 'antigravity' && <AntigravityPortalView />}
      </main>

      {/* Modals & Toast */}
      <DialogueModal />
      <StylePickerModal />
      <ResetConfirmModal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />
      <HelpGuideModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <Toast />

      {/* Footer */}
      <footer className="mt-auto bg-wood-900 text-cream-300/80 text-[11px] py-4 border-t border-wood-700 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            Project: Storm & Bistro · 머지 타운 퍼즐 & 스토리 개발 연구 및 구글 안티그래비티 2.0
          </span>
          <span className="text-cream-400">
            Vite + React 19 + TypeScript + Tailwind CSS + Web Audio API
          </span>
        </div>
      </footer>

    </div>
  );
};

export default App;
