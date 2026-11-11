import React, { useState, useEffect } from 'react';
import { Gamepad2, Hammer, Camera, Calculator, Terminal, BookOpen, Sparkles, ChefHat } from 'lucide-react';
import { useGameStore } from './store/useGameStore';
import { ResourceHeader } from './components/board/ResourceHeader';
import { OrderQueueBar } from './components/board/OrderQueueBar';
import { MergeBoard } from './components/board/MergeBoard';
import { BottomActionBar } from './components/board/BottomActionBar';
import { TownRestorationView } from './components/meta/TownRestorationView';
import { CookstagramView } from './components/meta/CookstagramView';
import { MathSimulatorView } from './components/meta/MathSimulatorView';
import { AntigravityPortalView } from './components/meta/AntigravityPortalView';
import { DialogueModal } from './components/modals/DialogueModal';
import { StylePickerModal } from './components/modals/StylePickerModal';
import { ResetConfirmModal } from './components/modals/ResetConfirmModal';
import { HelpGuideModal } from './components/modals/HelpGuideModal';
import { Toast } from './components/ui/Toast';
import { ParticleCanvas } from './components/ui/ParticleCanvas';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'game' | 'restoration' | 'cookstagram' | 'math' | 'antigravity'>('game');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const init = useGameStore(s => s.init);
  const restorations = useGameStore(s => s.restorations);
  const stars = useGameStore(s => s.stars);
  const openRestorationPicker = useGameStore(s => s.openRestorationPicker);

  useEffect(() => {
    setIsMounted(true);
    init();
  }, [init]);

  const nextRestorationNode = restorations.find(r => !r.isRestored);

  if (!isMounted) {
    return null; // SSR hydration safety guard
  }

  return (
    <div className="bg-[#FAF7F2] text-[#4E342E] font-sans min-h-[100dvh] flex flex-col antialiased selection:bg-amber-200">
      
      {/* 60fps Micro Particle Canvas Overlay */}
      <ParticleCanvas />

      {/* Top Resource & Settings Header */}
      <ResourceHeader
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenResetConfirm={() => setIsResetOpen(true)}
      />

      {/* Navigation Tabs Bar */}
      <nav className="bg-[#FAF7F2]/95 border-b-2 border-[#EBE3D5] sticky top-0 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 text-xs sm:text-sm font-black no-scrollbar">
            
            <button
              onClick={() => setCurrentTab('game')}
              className={`px-3.5 py-2 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'game'
                  ? 'bg-[#2A9D8F] text-white shadow-md ring-1 ring-[#2A9D8F]'
                  : 'text-[#4E342E] hover:bg-[#EBE3D5]'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>1. 머지 보드 & 주문</span>
            </button>

            <button
              onClick={() => setCurrentTab('restoration')}
              className={`px-3.5 py-2 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'restoration'
                  ? 'bg-[#2A9D8F] text-white shadow-md ring-1 ring-[#2A9D8F]'
                  : 'text-[#4E342E] hover:bg-[#EBE3D5]'
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
              className={`px-3.5 py-2 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'cookstagram'
                  ? 'bg-[#2A9D8F] text-white shadow-md ring-1 ring-[#2A9D8F]'
                  : 'text-[#4E342E] hover:bg-[#EBE3D5]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>3. 쿡스타그램 & 크루</span>
            </button>

            <button
              onClick={() => setCurrentTab('math')}
              className={`px-3.5 py-2 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'math'
                  ? 'bg-[#2A9D8F] text-white shadow-md ring-1 ring-[#2A9D8F]'
                  : 'text-[#4E342E] hover:bg-[#EBE3D5]'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>4. 수리 경제 시뮬레이터</span>
            </button>

            <button
              onClick={() => setCurrentTab('antigravity')}
              className={`px-3.5 py-2 rounded-2xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'antigravity'
                  ? 'bg-[#E76F51] text-white shadow-md ring-1 ring-[#E76F51]'
                  : 'text-[#4E342E] hover:bg-[#EBE3D5]'
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Center Merge Game Container - Authentic Mobile Casual Game Aesthetic */}
            <div className="lg:col-span-7 flex flex-col items-center max-w-[500px] mx-auto w-full space-y-2.5 p-2.5 sm:p-3.5 rounded-3xl shadow-2xl border-4 border-[#006f5c]"
              style={{
                background:
                  'repeating-linear-gradient(90deg, #008770 0px, #008770 38px, #007863 39px, #00937b 40px)'
              }}
            >
              {/* Active Orders Shelf with Window Cafe Backdrop */}
              <OrderQueueBar />

              {/* 7x9 Seamless Checkerboard Grid */}
              <MergeBoard />

              {/* Bottom 3-Section Navigation Bar (Backpack | Inspector Pill | Map) */}
              <BottomActionBar onOpenMap={() => setCurrentTab('restoration')} />
            </div>

              {/* Right Side Panel: Bistro Restoration Hero & Village Journal (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Bistro Hero Card */}
                <div className="bg-white rounded-3xl border-2 border-[#D4A373]/50 shadow-md overflow-hidden relative">
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#FAF7F2]">
                    <img
                      src="/bistro-hero.png"
                      alt="Merge Bistro"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                      <div className="text-white">
                        <span className="text-[10px] bg-[#E76F51] text-white font-black px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 w-max mb-1">
                          <ChefHat className="w-3 h-3" />
                          폭풍우를 이겨낸 따뜻한 안식처
                        </span>
                        <h2 className="text-base font-black drop-shadow">
                          머지 비스트로 (Merge Bistro)
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Next Restoration Quest Card */}
                  {nextRestorationNode ? (
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#E76F51] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E76F51]/30">
                          현재 복원 목표: Chapter {nextRestorationNode.chapter}
                        </span>
                        <span className="text-xs font-black text-amber-600">
                          필요: {nextRestorationNode.costStars}⭐ (보유: {stars}⭐)
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-[#4E342E]">
                        {nextRestorationNode.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {nextRestorationNode.description}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => setCurrentTab('restoration')}
                          className="text-xs text-slate-500 hover:text-slate-800 font-bold underline underline-offset-2"
                        >
                          전체 복원 목록 보기 →
                        </button>

                        <button
                          onClick={() => openRestorationPicker(nextRestorationNode)}
                          disabled={stars < nextRestorationNode.costStars}
                          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shadow ${
                            stars >= nextRestorationNode.costStars
                              ? 'bg-gradient-to-r from-amber-500 to-[#E76F51] hover:from-amber-600 hover:to-orange-700 text-white animate-pulse active:scale-95'
                              : 'bg-[#EBE3D5] text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <Hammer className="w-3.5 h-3.5" />
                          <span>지금 복원하기</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-gradient-to-br from-amber-50 to-emerald-50 text-center">
                      <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-1 animate-bounceSubtle" />
                      <h3 className="text-sm font-black text-[#4E342E]">
                        모든 시설 및 고대 유적 복원 완료!
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        실종된 사장님이 무사히 돌아왔습니다! 비스트로의 완전한 성공을 축하합니다!
                      </p>
                    </div>
                  )}
                </div>

                {/* Village Story Journal */}
                <div className="bg-white p-4 rounded-3xl border-2 border-[#D4A373]/50 shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b border-[#EBE3D5] pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#8C6239]" />
                      <h3 className="text-xs font-black text-[#4E342E]">
                        바닷마을 & 유적 스토리 일지
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      실종 사건 단서 추적 중
                    </span>
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EBE3D5] text-xs text-[#4E342E] space-y-2 max-h-56 overflow-y-auto leading-relaxed">
                    <div className="p-2.5 bg-white rounded-xl border border-[#EBE3D5] shadow-2xs">
                      <span className="font-black text-[#4E342E]">부엉이 촌장:</span>{' '}
                      "폭풍우로 레스토랑이 무너지고 사장님마저 일주일째 행방불명이라니... 자네가 이 식당을 구해주게!"
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-[#EBE3D5] shadow-2xs">
                      <span className="font-black text-[#4E342E]">바리스타 밀로:</span>{' '}
                      "사장님은 유적의 고대 향신료 레시피를 연구하러 가셨어요냥. 식당을 복구하면 단서를 찾을 수 있어요냥!"
                    </div>
                    {restorations.filter(r => r.isRestored).map(r => (
                      <div key={r.id} className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 text-amber-950">
                        <span className="font-black text-[#E76F51]">[{r.title} 완료]</span>{' '}
                        {r.dialogue[0]?.text || '성공적으로 구역을 복구했습니다.'}
                      </div>
                    ))}
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
      <footer className="mt-auto bg-[#3E2723] text-[#EBE3D5]/80 text-[11px] py-4 border-t-2 border-[#8C6239] text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            Project: Merge Bistro · 머지 비스트로 고도화 상용 퀄리티 에디션
          </span>
          <span className="text-[#D4A373]">
            React 19 + Framer Motion + Tailwind CSS + Web Audio API + PWA
          </span>
        </div>
      </footer>

    </div>
  );
};

export default App;
