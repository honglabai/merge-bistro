import React, { useState } from 'react';
import { Copy, Check, Terminal, Cpu, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const AntigravityPortalView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'>('A');
  const [copied, setCopied] = useState(false);
  const showToast = useGameStore(s => s.showToast);

  const stepsDB = {
    A: {
      badge: 'Step A',
      title: '워크스페이스 초기화, 에이전트 스킬 주입 & 스키마 구축',
      text: `[R: 역할 부여]
당신은 수석 게임 시스템 아키텍트이자 Google Antigravity 환경 전문가입니다. 빈 워크스페이스에서 『머지 타운: 퍼즐 & 스토리』 스타일 게임(코드명: Merge Bistro: Mystery of the Ruins)을 구축합니다.

[O: 명확한 목표 및 종료 조건]
1. Vite + React + TypeScript + Tailwind CSS + Zustand 기반 구조 스캐폴딩.
2. 프로젝트 루트에 \`.agents/skills/merge2-economy-validator/SKILL.md\` 및 \`.agents/skills/merge-town-ui-polish/SKILL.md\` 스킬 생성.
3. \`src/types/gameSchema.ts\`에 63타일(7x9) 보드, 생성기, 아이템 체인, 고객 주문 큐, 복원 노드, 쿡스타그램 스키마 정의.
4. 종료 조건: \`npm run build\` 실행 시 타입 에러 0건 및 스킬 파일 정상 배치.

[C: 맥락 제공]
폭풍우로 파산 위기에 처한 레스토랑 재건과 실종된 사장님 및 고대 유적 미스터리를 다루는 머지-2 게임입니다.

[K: 핵심 제약 조건]
- 코드 작성 전 \`implementation_plan.md\` 아티팩트를 먼저 제시하고 승인을 대기하십시오.`
    },
    B: {
      badge: 'Step B',
      title: '기획자 에이전트 — 5대 아이템 체인 및 유적 미스터리 DB',
      text: `/merge2-economy-validator

[R: 역할 부여]
시니어 게임 디자이너 에이전트로서 수리 밸런스에 부합하는 정적 데이터베이스 파일 4개를 생성하십시오.

[O: 명확한 목표 및 종료 조건]
1. \`src/data/itemsData.ts\`: 5대 생산 체인 (베이커리, 카페, 해산물, 텃밭, 유적) 및 주 생성기 드롭 테이블 정의.
2. \`src/data/initialBoardData.ts\`: 7x9 그리드 데이터 (중앙 3x3 OPEN, 외곽 30타일 LOCKED_CRATE, 완충 24타일 COBWEB).
3. \`src/data/ordersAndMetaData.ts\`: 25개 순차 고정 주문 및 10개 레스토랑/유적 복원 노드 데이터.
4. \`src/data/storyAndCookstagramData.ts\`: 10개 미스터리 대화 스크립트 및 쿡스타그램 피드 12종.
- 종료 조건: 모든 생성기 드롭 확률 합계 1.0, 1레벨 등가 가격 수식 2^(L-1) 부합.`
    },
    C: {
      badge: 'Step C',
      title: '코어 엔진 에이전트 — 63타일 머지 보드 & 상태 머신',
      text: `/merge-town-ui-polish

[R: 역할 부여]
리드 클라이언트 엔지니어 에이전트로서 63타일 보드 엔진과 Zustand 스토어를 작성하십시오.

[O: 명확한 목표 및 종료 조건]
1. \`src/store/useGameStore.ts\`: 보드 상태, 에너지 자동 회복(2분당 1E), 생성기 쿨다운, 슈퍼차지(1x, 2x, 4x), localStorage 영속성.
2. \`src/components/board/MergeBoard.tsx\`: 7x9 그리드 렌더링, 드래그 앤 드롭 합성, 인접 잠금 상자 연쇄 해금.
3. 종료 조건: 동일 아이템 합성 시 레벨 +1 전환, COBWEB 타일 인접 해금, 새로고침 시 상태 100% 보존.`
    },
    D: {
      badge: 'Step D',
      title: '경제·순환 에이전트 — 주문 큐 & 보드 효율성 측정기',
      text: `/merge2-economy-validator

[R: 역할 부여]
게임 경제 시스템 엔지니어로서 능동형 주문 큐와 보드 효율성 측정 위젯을 통합하십시오.

[O: 명확한 목표 및 종료 조건]
1. \`useGameStore.ts\`에 주문 준비 검사 \`checkOrderReadiness()\` 및 서빙 \`fulfillOrder()\` 액션 추가.
2. \`OrderQueueBar.tsx\` 작성: 손님 초상화, 요구 아이콘, 보유 시 초록 체크 배지 및 [서빙하기] 버튼.
3. 종료 조건: 서빙 시 요구 아이템 소멸, 코인/별 지급, 빈 슬롯 신규 주문 자동 충원.`
    },
    E: {
      badge: 'Step E',
      title: '메타·내러티브 에이전트 — 레스토랑 재건 & 쿡스타그램',
      text: `/merge-town-ui-polish

[R: 역할 부여]
내러티브 연출 및 메타게임 프론트엔드 개발자 에이전트입니다.

[O: 명확한 목표 및 종료 조건]
1. \`TownRestorationView.tsx\`: 코인/별 소모 시설 복구 & 3종 인테리어 스타일 선택.
2. \`StoryDialogueModal.tsx\`: 타이핑 효과 및 유적 미스터리 일지 해금.
3. \`CookstagramView.tsx\`: 동물 직원 프로필 패시브 및 쿡스타그램 팔로워 보상.
4. 종료 조건: 메타 복원 시 스토리 재생 ➔ 쿡스타그램 해금 ➔ 팔로워 보상 에너지가 코어 보드로 환류.`
    },
    F: {
      badge: 'Step F',
      title: '라이브옵스 이벤트 주입 & 시각 에셋 수정 워크플로',
      text: `/merge-town-ui-polish

[R: 역할 부여]
LiveOps 및 비주얼/오디오 디렉터 에이전트입니다.

[O: 명확한 목표 및 종료 조건]
1. '머지 잇 업!' 주간 패스 보상 트랙 및 '슈퍼차지' 2배/4배 스폰 이벤트 헤더 위젯.
2. \`soundSynthesizer.ts\`: Web Audio API 절차적 콤보 sound (피치 상승 팝음) 구현.
3. 종료 조건: 전체 프로덕션 빌드 (\`npm run build\`) 성공 및 브라우저 오디오 동기화.`
    },
    G: {
      badge: 'Step G',
      title: '/swarm QA, 브라우저 서브에이전트 & 배포',
      text: `/swarm

[R: 역할 부여]
멀티 에이전트 오케스트레이터 및 QA/DevOps 리드 에이전트입니다.

[O: 명확한 목표 및 종료 조건]
1. Sub-Agent 1 (Monte Carlo): \`simulateEconomy.ts\` 1,000회 시뮬레이션 (데드락 0% 검증).
2. Sub-Agent 2 (Browser Sub-Agent): 로컬 서버 실행 후 합성 ➔ 서빙 ➔ 복원 5단계 E2E 테스트 스크린샷 및 영상 캡처.
3. Sub-Agent 3 (DevOps): Firebase Hosting & Cloud Run 배포 설정.
4. 종료 조건: Walkthrough 아티팩트에 E2E 검증 결과 첨부 및 프로덕션 배포 완료.`
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(`📋 [Step ${activeStep}] 프롬프트가 복사되었습니다!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="bg-cream-50 p-5 rounded-2xl border border-cream-300 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-terracotta-500" />
          <span>Google Antigravity 2.0 아키텍처 & A to Z 실전 프롬프트</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          본 프로젝트는 Google Antigravity 개발 방법론(ROCK 프롬프트, 3단계 아티팩트 검증 루프, 제미나이 4 모델 라우팅)을 완벽하게 구현하였습니다. 각 단계별 프롬프트를 확인하고 복사할 수 있습니다.
        </p>
      </div>

      {/* Model Routing Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm border-t-4 border-t-slate-800">
          <div className="flex justify-between items-center mb-1">
            <span className="font-extrabold text-slate-900">Gemini 4 Carbon</span>
            <span className="text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded font-bold">Complex</span>
          </div>
          <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
            /swarm 멀티 에이전트 오케스트레이션, 전체 시스템 아키텍처 및 몬테카를로 수리 밸런스 QA 검증.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm border-t-4 border-t-emerald-600">
          <div className="flex justify-between items-center mb-1">
            <span className="font-extrabold text-slate-900">Gemini 4 Argon</span>
            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">Code</span>
          </div>
          <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
            조 단위 엣지 그래프 기반. 63타일 보드 상태 머신 및 React 드래그 앤 드롭 합성 고속 구현.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm border-t-4 border-t-blue-500">
          <div className="flex justify-between items-center mb-1">
            <span className="font-extrabold text-slate-900">Gemini 3.8 Flash</span>
            <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold">Fast Mode</span>
          </div>
          <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
            UI 스타일 경량 수정, 브라우저 서브에이전트 E2E 플레이테스트 상시 구동.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-cream-300 shadow-sm border-t-4 border-t-purple-600">
          <div className="flex justify-between items-center mb-1">
            <span className="font-extrabold text-slate-900">Claude 4.5 / GPT-OSS</span>
            <span className="text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-bold">Optional</span>
          </div>
          <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
            서드파티 모델 선택권. PRD 요구사항 교차 검증 및 미스터리 대화 대본 다듬기.
          </p>
        </div>
      </div>

      {/* 3-Step Artifact Workflow Visual */}
      <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>3단계 아티팩트(Artifact) 신뢰 검증 루프</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300">
            <span className="text-[10px] bg-terracotta-500 text-white font-bold px-2 py-0.5 rounded">
              Artifact 1
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">1. Implementation Plan</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              코드 작성 전 사전 설계 문서를 제시하여 개발자의 사전 승인을 대기.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300">
            <span className="text-[10px] bg-sage-500 text-white font-bold px-2 py-0.5 rounded">
              Artifact 2
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">2. Dynamic Tasks</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              패키지 설치 및 파일 생성 진행에 따라 실시간으로 체크박스가 자동 갱신.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 border border-cream-300">
            <span className="text-[10px] bg-wood-500 text-white font-bold px-2 py-0.5 rounded">
              Artifact 3
            </span>
            <h4 className="text-xs font-bold text-slate-900 mt-2">3. Interactive Walkthrough</h4>
            <p className="text-[11px] text-slate-600 mt-1">
              브라우저 서브에이전트가 자동 수행한 E2E 플레이테스트 스크린샷 및 영상 첨부.
            </p>
          </div>
        </div>
      </div>

      {/* Step Prompt Stepper */}
      <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-cream-200 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-terracotta-500" />
            <h3 className="text-sm font-bold text-slate-900">
              A to Z 단계별 실전 프롬프트 (ROCK 포맷)
            </h3>
          </div>
          <button
            onClick={() => handleCopy(stepsDB[activeStep].text)}
            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사 완료!' : '프롬프트 복사하기'}</span>
          </button>
        </div>

        {/* Step Buttons */}
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {(['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const).map(step => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                activeStep === step
                  ? 'bg-terracotta-500 text-white shadow'
                  : 'bg-cream-100 text-slate-700 hover:bg-cream-200 border border-cream-300'
              }`}
            >
              Step {step}
            </button>
          ))}
        </div>

        {/* Prompt Card */}
        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed">
          <div className="text-emerald-400 font-bold mb-2 pb-1 border-b border-slate-800 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>{stepsDB[activeStep].badge}: {stepsDB[activeStep].title}</span>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs">
            {stepsDB[activeStep].text}
          </pre>
        </div>
      </div>

    </div>
  );
};
