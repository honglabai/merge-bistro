import React, { useState } from 'react';
import {
  X,
  User,
  Award,
  Sliders,
  HelpCircle,
  Check,
  Edit2,
  Volume2,
  VolumeX,
  Music,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Star,
  Zap,
  Lock,
  ChevronRight,
  ChefHat,
  Heart,
  TrendingUp,
  Package
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sounds } from '../../utils/soundSynthesizer';
import { getTierForLevel, LEVEL_MILESTONES, STAT_INFO } from '../../data/characterProgressionData';
import { CharacterStats } from '../../types/gameSchema';

interface MyPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResetConfirm: () => void;
  initialTab?: 'profile' | 'stats' | 'settings' | 'guide';
}

interface AvatarOption {
  id: string;
  name: string;
  role: string;
  badge: string;
  url: string;
  desc: string;
}

const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'ella',
    name: '엘라 (Ella)',
    role: '총괄 수석 셰프',
    badge: '👩‍🍳',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    desc: '비스트로를 이끄는 당차고 열정적인 오리지널 총괄 셰프'
  },
  {
    id: 'milo',
    name: '밀로 (Milo)',
    role: '수석 바리스타',
    badge: '🐱',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=160&q=80',
    desc: '극상의 크레마 에스프레소와 라떼 아트를 선보이는 고양이'
  },
  {
    id: 'bruno',
    name: '브루노 (Bruno)',
    role: '명예 제빵 마스터',
    badge: '🐻',
    url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=160&q=80',
    desc: '황금빛 결이 살아있는 버터 크루아상 장인 곰돌이'
  },
  {
    id: 'pierre',
    name: '피에르 (Pierre)',
    role: '미슐랭 마스터',
    badge: '👨‍🍳',
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=160&q=80',
    desc: '정통 프랑스 해산물 코스 요리의 전설적인 대가'
  },
  {
    id: 'sophia',
    name: '소피아 (Sophia)',
    role: '수석 파티시에',
    badge: '🧁',
    url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=160&q=80',
    desc: '달콤한 딸기 마카롱과 예술적인 케이크를 만드는 파티시에'
  },
  {
    id: 'charlie',
    name: '찰리 (Charlie)',
    role: '캡틴 오션 셰프',
    badge: '🐶',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&q=80',
    desc: '싱싱한 바다 식재료를 찾아 항해하는 열정의 댕댕이'
  },
  {
    id: 'luna',
    name: '루나 (Luna)',
    role: '헤드 소믈리에',
    badge: '🦊',
    url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=160&q=80',
    desc: '요리와 완벽한 조화를 이루는 음료와 티를 페어링하는 여우'
  },
  {
    id: 'chloe',
    name: '클로이 (Chloe)',
    role: '가든 파밍 셰프',
    badge: '🐰',
    url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=160&q=80',
    desc: '온실 텃밭에서 유기농 허브와 과일을 수확하는 토끼'
  }
];

const CHEF_TITLES = [
  '미슐랭 3스타 수석 셰프',
  '바닷마을 비스트로 총괄 셰프',
  '전설의 골든 베이커리 명장',
  '커피 & 라떼아트 연금술사',
  '고대 레시피를 깨운 전설의 마스터'
];

export const MyPageModal: React.FC<MyPageModalProps> = ({
  isOpen,
  onClose,
  onOpenResetConfirm,
  initialTab = 'profile'
}) => {
  const {
    chefName,
    chefAvatar,
    chefTitle,
    setChefProfile,
    stars,
    coins,
    gems,
    followers,
    restorations,
    inventoryPocket,
    energy,
    maxEnergy,
    level,
    exp,
    expToNextLevel,
    statPoints,
    stats,
    allocateStatPoint
  } = useGameStore();

  const tier = getTierForLevel(level);
  const progressPercent = Math.min(100, Math.round((exp / (expToNextLevel || 1)) * 100));

  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'settings' | 'guide'>(initialTab);

  // Profile Edit State
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(chefName || '바닷마을 총괄 셰프');
  const [selectedTitle, setSelectedTitle] = useState(chefTitle || '미슐랭 3스타 수석 셰프');

  // Settings State
  const [soundOn, setSoundOn] = useState(sounds.enabled);
  const [bgmOn, setBgmOn] = useState(() => {
    return localStorage.getItem('merge_bistro_bgm_enabled') !== 'false';
  });
  const [hapticOn, setHapticOn] = useState(() => {
    return localStorage.getItem('merge_bistro_haptic_enabled') !== 'false';
  });
  const [energyNotifyOn, setEnergyNotifyOn] = useState(true);

  if (!isOpen) return null;

  const handleSaveName = () => {
    const trimmed = nameInput.trim() || '바닷마을 총괄 셰프';
    setNameInput(trimmed);
    setChefProfile(trimmed, chefAvatar, selectedTitle);
    setIsEditingName(false);
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setChefProfile(chefName, avatarUrl, selectedTitle);
  };

  const handleSelectTitle = (title: string) => {
    setSelectedTitle(title);
    setChefProfile(chefName, chefAvatar, title);
  };

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
  };

  const handleToggleBgm = () => {
    const next = !bgmOn;
    setBgmOn(next);
    localStorage.setItem('merge_bistro_bgm_enabled', String(next));
    sounds.playTapSound();
  };

  const handleToggleHaptic = () => {
    const next = !hapticOn;
    setHapticOn(next);
    localStorage.setItem('merge_bistro_haptic_enabled', String(next));
    if (next && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
    sounds.playTapSound();
  };

  const restoredCount = restorations.filter(r => r.isRestored).length;
  const restorationPercent = Math.round((restoredCount / restorations.length) * 100);
  const pocketCount = inventoryPocket.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-pop select-none">
      <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl border-4 border-[#8C6239] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#3E2723] via-[#4E342E] to-[#3E2723] text-amber-100 px-4 py-3 sm:py-3.5 flex items-center justify-between border-b-2 border-amber-600/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-amber-100 flex items-center gap-1.5">
                <span>마이페이지 & 설정</span>
                <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-black">
                  Lv.{level}
                </span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-amber-200/80 font-medium">
                {tier.badge} {tier.name} · {tier.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="flex items-center bg-[#ECE4D8] border-b border-[#D4A373]/40 px-1 pt-1.5 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveTab('profile');
              sounds.playTapSound();
            }}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-t-xl flex items-center justify-center gap-1 transition-all whitespace-nowrap relative ${
              activeTab === 'profile'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="whitespace-nowrap">셰프 성장</span>
            {statPoints > 0 && (
              <span className="text-[9px] bg-rose-500 text-white font-black px-1 rounded-full animate-pulse shadow-xs">
                +{statPoints}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('stats');
              sounds.playTapSound();
            }}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-t-xl flex items-center justify-center gap-1 transition-all whitespace-nowrap ${
              activeTab === 'stats'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="whitespace-nowrap">통계</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              sounds.playTapSound();
            }}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-t-xl flex items-center justify-center gap-1 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="whitespace-nowrap">설정</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('guide');
              sounds.playTapSound();
            }}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-t-xl flex items-center justify-center gap-1 transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-[#FAF7F2] text-[#4E342E] border-t-2 border-x-2 border-[#8C6239] shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="whitespace-nowrap">도움말</span>
          </button>
        </div>

        {/* Modal Tab Content Area */}
        <div className="p-3.5 sm:p-4 overflow-y-auto space-y-4 no-scrollbar flex-1 text-slate-800">
          
          {/* TAB 1: 셰프 캐릭터 성장 센터 & 프로필 */}
          {activeTab === 'profile' && (
            <div className="space-y-3.5">
              
              {/* 1. Hero Character Tier & Growth Card */}
              <div className="bg-gradient-to-br from-[#fffdfa] via-amber-50/70 to-orange-50/50 border-2 border-amber-300/80 rounded-2xl p-3 sm:p-3.5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Avatar with Tier Ring & Level Badge */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-md overflow-hidden border-2 border-white">
                      <img
                        src={chefAvatar}
                        alt="Current Chef Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-[11px] px-1.5 py-0.5 rounded-full border-2 border-white shadow flex items-center justify-center">
                      Lv.{level}
                    </div>
                  </div>

                  {/* Profile Details & Tier Name */}
                  <div className="flex-1 w-full text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      {isEditingName ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            maxLength={12}
                            className="px-2 py-0.5 rounded-lg border-2 border-amber-400 text-xs sm:text-sm font-extrabold text-slate-900 bg-white focus:outline-hidden"
                            placeholder="셰프 닉네임"
                            autoFocus
                          />
                          <button
                            onClick={handleSaveName}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black shadow-xs"
                          >
                            저장
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-1">
                            <span>{chefName}</span>
                          </h3>
                          <button
                            onClick={() => {
                              setIsEditingName(true);
                              setNameInput(chefName);
                            }}
                            className="p-1 rounded-full text-stone-400 hover:text-amber-700 hover:bg-amber-100 transition-colors"
                            title="닉네임 변경"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Tier Badge & Title */}
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                      <span className="text-xs bg-amber-600/10 text-amber-900 font-extrabold px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                        <span>{tier.badge}</span>
                        <span>{tier.name}</span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-bold truncate">
                        ({tier.title})
                      </span>
                    </div>

                    {/* Live EXP Gauge */}
                    <div className="mt-2.5 w-full">
                      <div className="flex justify-between items-center text-[10px] font-black text-stone-600 mb-1">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>EXP 진행도 (Lv.{level} ➔ Lv.{level + 1})</span>
                        </span>
                        <span className="text-amber-700 font-black">
                          {exp.toLocaleString()} / {expToNextLevel.toLocaleString()} ({progressPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-amber-200/50 rounded-full h-2.5 overflow-hidden border border-amber-300/80 p-0.5 shadow-inner">
                        <div
                          className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 h-full rounded-full transition-all duration-500 shadow-xs"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evolution Tier Passive Perk */}
                <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center gap-2 text-[11px] text-amber-950 font-medium bg-amber-100/50 rounded-xl px-2.5 py-1.5">
                  <span className="text-sm flex-shrink-0">✨</span>
                  <span className="leading-snug">
                    <strong className="text-amber-900 font-black">티어 특전:</strong> {tier.passiveBonus}
                  </span>
                </div>
              </div>

              {/* 2. RPG Stat Points & Attribute Allocation */}
              <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-black text-stone-900">셰프 역량 강화 (RPG 스탯)</span>
                  </div>
                  <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border flex items-center gap-1 ${
                    statPoints > 0
                      ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>
                    <span>보유 포인트:</span>
                    <strong className="text-xs">{statPoints} PT</strong>
                  </div>
                </div>

                {statPoints > 0 && (
                  <div className="mb-2.5 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 border border-rose-300 rounded-xl p-2 text-center text-[11px] font-bold text-rose-900">
                    🎉 레벨업으로 스탯 포인트 획득! 원하는 능력치의 <strong className="text-rose-700 font-black">[+]</strong> 버튼을 눌러 강화하세요!
                  </div>
                )}

                {/* 4 Core Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(['dexterity', 'vitality', 'luck', 'charisma'] as (keyof CharacterStats)[]).map((statKey) => {
                    const info = STAT_INFO[statKey];
                    const val = stats[statKey] || 0;
                    return (
                      <div
                        key={statKey}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between ${info.bgColor} transition-all`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{info.icon}</span>
                            <span className="text-xs font-black text-stone-800">{info.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-stone-900">+{val}</span>
                            <button
                              onClick={() => allocateStatPoint(statKey)}
                              disabled={statPoints <= 0}
                              className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center transition-all ${
                                statPoints > 0
                                  ? 'bg-amber-500 hover:bg-amber-600 active:scale-90 text-white shadow-md shadow-amber-500/30 cursor-pointer'
                                  : 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                              }`}
                              title={statPoints > 0 ? `${info.name} +1 투자` : '스탯 포인트 부족'}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-[10px] text-stone-600 font-semibold leading-tight">
                          {info.effectText(val)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Level Milestones Roadmap */}
              <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-black text-stone-900">레벨 마일스톤 특전</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">주요 성장 혜택</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar pr-0.5">
                  {LEVEL_MILESTONES.map((m) => {
                    const isReached = level >= m.level;
                    return (
                      <div
                        key={m.level}
                        className={`p-2 rounded-xl border flex items-center justify-between text-left transition-all ${
                          isReached
                            ? 'bg-emerald-50/70 border-emerald-300 text-stone-900'
                            : 'bg-stone-50 border-stone-200 text-stone-500 opacity-80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{m.icon}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                                isReached ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                              }`}>
                                Lv.{m.level}
                              </span>
                              <span className="text-xs font-black">{m.title}</span>
                            </div>
                            <div className="text-[10px] font-medium text-stone-600 mt-0.5">
                              ✨ {m.bonusPerk}
                            </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                          {isReached ? (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                              달성 완료 ✓
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" />
                              잠김
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Title Selector */}
              <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-stone-200 shadow-xs">
                <div className="text-xs font-extrabold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>셰프 칭호 선택</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CHEF_TITLES.map((title) => (
                    <button
                      key={title}
                      onClick={() => handleSelectTitle(title)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold border transition-all ${
                        selectedTitle === title
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs scale-102'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {selectedTitle === title && <span className="mr-1">✓</span>}
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Avatar Selection Grid */}
              <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-stone-200 shadow-xs">
                <div className="text-xs font-extrabold text-stone-800 mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>아바타 캐릭터 변경 (8종)</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-semibold">클릭 시 즉시 적용</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AVATAR_OPTIONS.map((av) => {
                    const isSelected = chefAvatar === av.url;
                    return (
                      <div
                        key={av.id}
                        onClick={() => handleSelectAvatar(av.url)}
                        className={`p-2 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300/60 shadow-sm'
                            : 'bg-stone-50/70 border-stone-200 hover:border-amber-300 hover:bg-amber-50/40'
                        }`}
                      >
                        <div className="relative mb-1.5">
                          <img
                            src={av.url}
                            alt={av.name}
                            className="w-12 h-12 rounded-full object-cover border border-white shadow-xs"
                          />
                          <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 shadow-xs border">
                            {av.badge}
                          </span>
                          {isSelected && (
                            <div className="absolute inset-0 bg-amber-600/30 rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white drop-shadow stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="text-[11px] font-black text-stone-800 leading-tight">
                          {av.name}
                        </div>
                        <div className="text-[9px] font-bold text-amber-700 leading-tight mt-0.5">
                          {av.role}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 비스트로 통계 & 업적 */}
          {activeTab === 'stats' && (
            <div className="space-y-3.5">
              
              {/* 4 Core Stats Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/70 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-xl shadow-xs">
                    ⭐
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-900/70">보유 복원 별</div>
                    <div className="text-sm font-black text-amber-950">{stars} 개</div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-xl shadow-xs">
                    🪙
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-900/70">보유 골드 코인</div>
                    <div className="text-sm font-black text-amber-950">{coins.toLocaleString()}</div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-rose-200 shadow-xs flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-400 flex items-center justify-center text-xl shadow-xs">
                    💎
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-rose-900/70">보유 보석 다이아</div>
                    <div className="text-sm font-black text-rose-950">{gems} 개</div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-200 shadow-xs flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-400 flex items-center justify-center text-xl shadow-xs">
                    👥
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-sky-900/70">단골 팬 (팔로워)</div>
                    <div className="text-sm font-black text-sky-950">{followers} 명</div>
                  </div>
                </div>
              </div>

              {/* Progress Detail 1: 마을 & 유적 복원도 */}
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                    <span>🏛️</span>
                    <span>마을 & 유적 복구 진행도</span>
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    {restoredCount} / {restorations.length} 구역 완료 ({restorationPercent}%)
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${restorationPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-stone-500 mt-1.5 leading-relaxed">
                  손님 주문을 납품하여 획득한 별(⭐)로 테라스, 화덕 오븐, 온실 텃밭, 와인 저장고를 단계별로 복원하세요!
                </p>
              </div>

              {/* Progress Detail 2: 셰프 배낭 & 보관함 */}
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-xs font-black text-stone-800">비스트로 보관함 (배낭)</div>
                    <div className="text-[10px] text-stone-500">보드 공간 확보용 임시 보관 슬롯</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    {pocketCount} / 4 슬롯 사용 중
                  </span>
                </div>
              </div>

              {/* Progress Detail 3: 에너지 & 회복 시스템 */}
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-sky-500" />
                  <div>
                    <div className="text-xs font-black text-stone-800">에너지 자동 충전소</div>
                    <div className="text-[10px] text-stone-500">60초마다 1⚡ 자동 회복 (최대 {maxEnergy}⚡)</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-300">
                    {energy} / {maxEnergy} ⚡
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: 게임 설정 */}
          {activeTab === 'settings' && (
            <div className="space-y-3.5">
              
              {/* Sound Controls */}
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-3">
                <div className="text-xs font-black text-stone-800 flex items-center gap-1.5 pb-1 border-b border-stone-100">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>사운드 & 오디오</span>
                </div>

                {/* SFX Switch */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">효과음 (SFX)</div>
                    <div className="text-[10px] text-stone-500">머지, 스폰, 납품 완료 사운드</div>
                  </div>
                  <button
                    onClick={handleToggleSound}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      soundOn ? 'bg-emerald-500' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                        soundOn ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* BGM Switch */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-xs font-bold text-stone-800">배경음악 (BGM)</div>
                    <div className="text-[10px] text-stone-500">따뜻한 비스트로 카페 앰비언스</div>
                  </div>
                  <button
                    onClick={handleToggleBgm}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      bgmOn ? 'bg-emerald-500' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                        bgmOn ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Gameplay & System Feedback */}
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-3">
                <div className="text-xs font-black text-stone-800 flex items-center gap-1.5 pb-1 border-b border-stone-100">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span>진동 & 편의 기능</span>
                </div>

                {/* Haptic Vibration */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800">햅틱 진동 피드백</div>
                    <div className="text-[10px] text-stone-500">아이템 합성 및 버튼 터치 시 진동</div>
                  </div>
                  <button
                    onClick={handleToggleHaptic}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      hapticOn ? 'bg-emerald-500' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                        hapticOn ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Energy Full Notification */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-xs font-bold text-stone-800">에너지 완충 알림</div>
                    <div className="text-[10px] text-stone-500">100⚡ 에너지 완전 회복 시 알림</div>
                  </div>
                  <button
                    onClick={() => {
                      setEnergyNotifyOn(!energyNotifyOn);
                      sounds.playTapSound();
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      energyNotifyOn ? 'bg-emerald-500' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                        energyNotifyOn ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* System & Data Management */}
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-3">
                <div className="text-xs font-black text-stone-800 flex items-center gap-1.5 pb-1 border-b border-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>계정 및 데이터 관리</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>데이터 저장 상태</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1 text-[11px]">
                    <Check className="w-3.5 h-3.5" />
                    <span>로컬 자동 세이브 동기화됨</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>앱 버전</span>
                  <span className="text-stone-500 text-[11px] font-mono">v1.5.0-bistro</span>
                </div>

                {/* Reset Data Danger Zone */}
                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenResetConfirm();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-200 text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-500" />
                    <span>게임 데이터 전체 초기화</span>
                  </button>
                  <p className="text-[10px] text-stone-400 text-center mt-1">
                    초기화 시 보드 아이템, 복원 상태, 재화가 처음 상태로 되돌아갑니다.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: 플레이 가이드 */}
          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs">
              
              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-xs">
                <h4 className="font-extrabold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>1. 생성기 탭 & 에너지 관리</span>
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  보드 위의 <strong>밀가루 포대, 커피 머신, 씨앗 주머니</strong> 등 생성기 타일을 클릭하면 에너지를 소모해 기본 재료가 스폰됩니다. 슈퍼차지(1x, 2x, 4x)를 켜면 에너지를 더 소모하여 2~3레벨 상위 아이템을 바로 생산할 수 있습니다!
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-xs">
                <h4 className="font-extrabold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>2. 2개 합성 & 상위 레벨 진화</span>
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  <strong>같은 체인, 같은 레벨</strong>의 아이템을 서로 드래그하거나 순서대로 클릭하면 합쳐져 레벨이 1단계 상승합니다! 최고 11레벨의 전설적인 시그니처 요리까지 완성해보세요.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-xs">
                <h4 className="font-extrabold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Lock className="w-4 h-4 text-stone-600" />
                  <span>3. 거미줄 & 상자 연쇄 해금</span>
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  거미줄(🕸️)에 묶인 아이템은 동일한 자유 아이템을 합성하면 해제됩니다. 또한 아이템이 합성될 때마다 인접한 잠긴 상자(🔒)들이 흔들리며 잠금이 연쇄적으로 풀려 보드 공간이 넓어집니다!
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-xs">
                <h4 className="font-extrabold text-stone-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>4. 손님 주문 서빙 & 식당 복구</span>
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  마을 동물 손님들이 주문한 요리를 완성하면 <strong>코인(🪙)</strong>과 <strong>별(⭐)</strong>을 얻습니다. 별을 모아 폭풍우로 무너진 테라스, 화덕 오븐, 온실 텃밭, 고대 유적을 복구하고 마을의 전설을 확인하세요!
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FAF7F2] border-t border-[#D4A373]/40 text-center flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white font-black text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-98 transition-all"
          >
            확인 및 게임 계속하기
          </button>
        </div>

      </div>
    </div>
  );
};
