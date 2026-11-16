import { ContinentRegion } from '../types/gameSchema';

export const CONTINENT_REGIONS: ContinentRegion[] = [
  {
    id: 'region-1',
    stageNumber: 1,
    name: '바람의 항구 비스트로',
    subtitle: '모험의 출발점, 바닷바람과 갓 구운 빵의 향기',
    themeColor: 'from-amber-500 to-emerald-600',
    accentBg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    icon: '⛵',
    mapCoords: { x: 28, y: 76 },
    recommendedLevel: 1,
    lore: '폭풍우를 겪고 재건을 시작한 항구 비스트로. 실종된 사장님이 남긴 고대 대륙 탐험 일지의 첫 페이지를 발견하고, 모험가 셰프로서의 첫 발을 내딛습니다.',
    isUnlocked: true,
    isCompleted: false,
    relicReward: {
      id: 'relic-compass',
      name: '바람의 황금 풍차 나침반',
      icon: '🧭',
      description: '대륙 전역의 신선한 미식 기운을 감지하는 고대 항해 나침반입니다.',
      perk: '에너지 자연 충전 속도 향상 & 출항 행운 증가',
      unlockedAtRegion: 'region-1'
    },
    missions: [
      {
        id: 'm-1-1',
        regionId: 'region-1',
        title: '출항 준비 식빵 머지',
        description: '탐험을 떠나기 전 든든한 식량을 위해 레벨 3(식빵) 이상의 빵을 2회 머지하세요.',
        storyQuote: {
          speaker: '부엉이 촌장 버나비',
          avatar: '🦉',
          text: '모험의 첫걸음은 든든한 배 채우기부터라네! 고소한 빵을 챙기게나.'
        },
        type: 'merge_item',
        targetCount: 2,
        targetLevel: 3,
        targetChainId: 'bakery',
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 120, gems: 3, stars: 2 }
      },
      {
        id: 'm-1-2',
        regionId: 'region-1',
        title: '아침 항해자들의 주문 배달',
        description: '항구 손님들의 활력을 북돋아주는 주문을 2회 성공적으로 납품하세요.',
        storyQuote: {
          speaker: '집배원 강아지 토비',
          avatar: '🐶',
          text: '모험 일지 조각을 찾으려면 마을 주민들의 신뢰를 얻어야 해요 멍멍!'
        },
        type: 'fulfill_order',
        targetCount: 2,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 150, gems: 5, stars: 3 }
      },
      {
        id: 'm-1-3',
        regionId: 'region-1',
        title: '모험의 불꽃 콤보',
        description: '빠른 손놀림으로 머지 콤보 2스트릭 이상을 달성하세요.',
        storyQuote: {
          speaker: '바리스타 고양이 밀로',
          avatar: '🐱',
          text: '리듬을 타면 주방이 신나게 돌아간다냥! 연속 머지를 보여줘냥!'
        },
        type: 'reach_combo',
        targetCount: 2,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 180, gems: 6, stars: 4 }
      }
    ]
  },
  {
    id: 'region-2',
    stageNumber: 2,
    name: '속삭이는 에메랄드 숲 & 고대 유적',
    subtitle: '이끼 낀 룬 석조와 숲속 비밀 허브의 성소',
    themeColor: 'from-emerald-600 to-teal-700',
    accentBg: 'bg-teal-50 border-teal-300 text-teal-900',
    icon: '🌿',
    mapCoords: { x: 23, y: 46 },
    recommendedLevel: 5,
    lore: '고대 문명의 석조 아치와 마법 허브가 자생하는 신비로운 태고의 숲. 유적 벽화에 새겨진 사장님의 흔적과 전설의 비스트로 비밀 조미료 병을 추적합니다.',
    isUnlocked: false,
    isCompleted: false,
    relicReward: {
      id: 'relic-bottle',
      name: '고대 에메랄드 양념 보틀',
      icon: '🏺',
      description: '어떤 요리에 넣어도 깊은 감칠맛을 내는 고대 룬 문양 유리병입니다.',
      perk: '머지 시 보너스 코인 획득 확률 +15%',
      unlockedAtRegion: 'region-2'
    },
    missions: [
      {
        id: 'm-2-1',
        regionId: 'region-2',
        title: '유적 허브 & 식물 머지',
        description: '숲의 고대 기운을 머금은 레벨 3 이상의 아이템을 2회 머지하세요.',
        storyQuote: {
          speaker: '여우 고고학자 피오나',
          avatar: '🦊',
          text: '이 유적 석판에 그려진 허브와 똑같은 모양이에요! 신비한 향이 나요.'
        },
        type: 'merge_item',
        targetCount: 2,
        targetLevel: 3,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 200, gems: 6, stars: 4 }
      },
      {
        id: 'm-2-2',
        regionId: 'region-2',
        title: '고고학 탐사대 특별 납품',
        description: '숲속 탐사팀 손님들의 주문을 3회 완성하여 납품하세요.',
        storyQuote: {
          speaker: '다람쥐 정원사 핍',
          avatar: '🐿️',
          text: '탐사팀 친구들이 든든하게 먹어야 더 깊은 숲길을 열 수 있어요!'
        },
        type: 'fulfill_order',
        targetCount: 3,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 240, gems: 8, stars: 5 }
      },
      {
        id: 'm-2-3',
        regionId: 'region-2',
        title: '숲의 정령 럭키 버블',
        description: '머지 중 나타나는 영롱한 럭키 미스터리 버블을 1회 터뜨려 대박 보상을 받으세요.',
        storyQuote: {
          speaker: '선장 펭귄 와들스',
          avatar: '🐧',
          text: '끄아악! 영롱한 거품 속에 반짝이는 보물이 들어있군!'
        },
        type: 'pop_bubble',
        targetCount: 1,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 280, gems: 10, stars: 6 }
      }
    ]
  },
  {
    id: 'region-3',
    stageNumber: 3,
    name: '타오르는 화산 협곡 & 제과 광산',
    subtitle: '400도 마그마 화덕과 진귀한 암염의 땅',
    themeColor: 'from-amber-600 to-rose-700',
    accentBg: 'bg-orange-50 border-orange-300 text-orange-950',
    icon: '🌋',
    mapCoords: { x: 67, y: 55 },
    recommendedLevel: 10,
    lore: '대지의 열기로 달궈진 천연 용암 화덕과 루비 암염이 채굴되는 붉은 협곡. 극한의 바삭함을 완성하기 위해 화산의 불꽃 오븐을 가동합니다.',
    isUnlocked: false,
    isCompleted: false,
    relicReward: {
      id: 'relic-ember',
      name: '불꽃 화덕의 영구 불씨',
      icon: '🔥',
      description: '꺼지지 않는 마그마의 온기를 품은 전설의 화덕 불씨입니다.',
      perk: '피버 모드 지속시간 +3초 연장 및 피버 코인 보너스 증폭',
      unlockedAtRegion: 'region-3'
    },
    missions: [
      {
        id: 'm-3-1',
        regionId: 'region-3',
        title: '마그마 오븐 바게트 머지',
        description: '강력한 화력으로 구워낸 레벨 4 이상의 아이템을 2회 머지하세요.',
        storyQuote: {
          speaker: '파티시에 곰 브루노',
          avatar: '🐻',
          text: '화덕 바닥이 펄펄 끓고 있다곰! 최고의 바게트를 구울 완벽한 타이밍이라곰!'
        },
        type: 'merge_item',
        targetCount: 2,
        targetLevel: 4,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 300, gems: 10, stars: 6 }
      },
      {
        id: 'm-3-2',
        regionId: 'region-3',
        title: '열정의 비스트로 피버',
        description: '연속 5콤보를 달성하여 뜨거운 비스트로 피버 모드를 1회 발동시키세요.',
        storyQuote: {
          speaker: '바리스타 고양이 밀로',
          avatar: '🐱',
          text: '에너지가 0이 되는 무한 탭 피버 타임으로 주방을 불태워라냥!'
        },
        type: 'trigger_fever',
        targetCount: 1,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 350, gems: 12, stars: 7 }
      },
      {
        id: 'm-3-3',
        regionId: 'region-3',
        title: '광산 작업반 보급 납품',
        description: '화산 협곡 손님들의 주문을 3회 완성하여 납품하세요.',
        storyQuote: {
          speaker: '부엉이 촌장 버나비',
          avatar: '🦉',
          text: '광부들에게 달콤한 간식을 배달해주면 다음 설원 관문의 열쇠를 줄 걸세.'
        },
        type: 'fulfill_order',
        targetCount: 3,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 400, gems: 15, stars: 8 }
      }
    ]
  },
  {
    id: 'region-4',
    stageNumber: 4,
    name: '얼어붙은 별빛 빙하 & 수정 설원',
    subtitle: '오로라가 춤추는 얼음 동굴과 극지 디저트 성채',
    themeColor: 'from-sky-500 to-indigo-700',
    accentBg: 'bg-sky-50 border-sky-300 text-sky-950',
    icon: '❄️',
    mapCoords: { x: 26, y: 22 },
    recommendedLevel: 15,
    lore: '천 년 동안 녹지 않은 만년설과 영롱한 크리스탈이 솟아있는 순백의 설원. 사장님이 극지의 희귀 설탕 결정을 찾기 위해 남겨둔 빙하 베이스캠프에 도달합니다.',
    isUnlocked: false,
    isCompleted: false,
    relicReward: {
      id: 'relic-chalice',
      name: '서리 크리스탈 잔',
      icon: '🍸',
      description: '어떤 음료도 영롱하고 차갑게 유지해주는 신비한 얼음 크리스탈 잔입니다.',
      perk: '상점 및 버블 보너스 보석/골드 획득량 +20%',
      unlockedAtRegion: 'region-4'
    },
    missions: [
      {
        id: 'm-4-1',
        regionId: 'region-4',
        title: '극지 크리스탈 머지',
        description: '얼음처럼 투명하고 정교한 레벨 4 이상의 아이템을 2회 머지하세요.',
        storyQuote: {
          speaker: '여우 고고학자 피오나',
          avatar: '🦊',
          text: '이 빙하 아래에 고대 천공 신전으로 향하는 마법 포탈 문이 얼어붙어 있어요!'
        },
        type: 'merge_item',
        targetCount: 2,
        targetLevel: 4,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 450, gems: 15, stars: 8 }
      },
      {
        id: 'm-4-2',
        regionId: 'region-4',
        title: '혹한기 손님 주문 완수',
        description: '설원 캠프 손님들의 까다로운 주문을 4회 완성하여 납품하세요.',
        storyQuote: {
          speaker: '집배원 강아지 토비',
          avatar: '🐶',
          text: '눈보라를 뚫고 따뜻한 음료를 배달했더니 손님들이 감동했어요 멍!'
        },
        type: 'fulfill_order',
        targetCount: 4,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 500, gems: 18, stars: 10 }
      },
      {
        id: 'm-4-3',
        regionId: 'region-4',
        title: '오로라 연속 콤보 3스트릭',
        description: '손발이 척척 맞는 스피드로 머지 콤보 3스트릭 이상을 달성하세요.',
        storyQuote: {
          speaker: '선장 펭귄 와들스',
          avatar: '🐧',
          text: '오로라 빛처럼 화려한 콤보를 보여주게나! 천공의 문이 열릴 것이네!'
        },
        type: 'reach_combo',
        targetCount: 3,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 550, gems: 20, stars: 12 }
      }
    ]
  },
  {
    id: 'region-5',
    stageNumber: 5,
    name: '천공의 황금 신전 & 미식 성역',
    subtitle: '구름 위로 떠오른 전설의 마스터 셰프 성소',
    themeColor: 'from-amber-400 via-yellow-500 to-amber-600',
    accentBg: 'bg-amber-50 border-amber-300 text-amber-950',
    icon: '👑',
    mapCoords: { x: 74, y: 22 },
    recommendedLevel: 20,
    lore: '찬란한 무지개 다리와 천상의 폭포가 흐르는 공중 부유섬. 실종되었던 사장님이 드디어 고대 최고 셰프의 비급서를 손에 쥐고 우리를 반갑게 맞이합니다!',
    isUnlocked: false,
    isCompleted: false,
    relicReward: {
      id: 'relic-crown',
      name: '천공의 마스터 셰프 왕관',
      icon: '👑',
      description: '아스테리아 대륙의 모든 미식과 모험을 제패한 전설의 마스터에게 수여되는 황금 왕관입니다.',
      perk: '모든 머지 및 주문 보상 1.5배 증가 & 대륙 마스터 칭호 부여',
      unlockedAtRegion: 'region-5'
    },
    missions: [
      {
        id: 'm-5-1',
        regionId: 'region-5',
        title: '천상의 마스터 요리 머지',
        description: '최상급의 장인 정신으로 레벨 5 이상의 최고급 요리를 2회 머지하세요.',
        storyQuote: {
          speaker: '실종된 사장님',
          avatar: '👨‍🍳',
          text: '자네들이 여기까지 오다니! 내 평생 연구한 천상의 레시피를 함께 완성해보세!'
        },
        type: 'merge_item',
        targetCount: 2,
        targetLevel: 5,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 700, gems: 25, stars: 15 }
      },
      {
        id: 'm-5-2',
        regionId: 'region-5',
        title: '대륙 전역의 명사 오더 달성',
        description: '천공의 신전에 모인 귀빈 손님들의 주문을 5회 완성하여 납품하세요.',
        storyQuote: {
          speaker: '부엉이 촌장 버나비',
          avatar: '🦉',
          text: '비스트로의 이름이 온 대륙에 울려 퍼지고 있소! 최고의 축제요!'
        },
        type: 'fulfill_order',
        targetCount: 5,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 800, gems: 30, stars: 18 }
      },
      {
        id: 'm-5-3',
        regionId: 'region-5',
        title: '궁극의 피버 피날레',
        description: '비스트로 피버 모드를 1회 발동시켜 황금 신전을 찬란하게 밝히세요.',
        storyQuote: {
          speaker: '모두 함께',
          avatar: '🎉',
          text: '와아아아! 아스테리아 대륙 최고의 마스터 셰프 탄생을 축하합니다냥!'
        },
        type: 'trigger_fever',
        targetCount: 1,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false,
        reward: { coins: 1000, gems: 50, stars: 25 }
      }
    ]
  }
];
