import React from 'react';
import { Heart, Gift, Users, Award, Check } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { STAFF_CHARACTERS } from '../../data/storyAndCookstagramData';

export const CookstagramView: React.FC = () => {
  const { posts, followers, claimPostReward, restorations } = useGameStore();

  const restoredChapters = restorations.filter(r => r.isRestored).map(r => r.chapter);
  const maxRestoredChapter = restoredChapters.length > 0 ? Math.max(...restoredChapters) : 0;

  // Follower Tier
  let tierTitle = '새내기 비스트로 (Lv.1)';
  let nextMilestone = 200;
  if (followers >= 2000) {
    tierTitle = '전설의 미식 성지 (Lv.5)';
    nextMilestone = 5000;
  } else if (followers >= 1000) {
    tierTitle = '전국구 명소 비스트로 (Lv.4)';
    nextMilestone = 2000;
  } else if (followers >= 500) {
    tierTitle = 'SNS 핫플레이스 식당 (Lv.3)';
    nextMilestone = 1000;
  } else if (followers >= 200) {
    tierTitle = '바닷마을 소문난 맛집 (Lv.2)';
    nextMilestone = 500;
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Follower Count & Milestones */}
      <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 p-5 rounded-2xl border border-rose-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📸</span>
            <h2 className="text-lg font-extrabold text-slate-900">
              비스트로 공식 쿡스타그램 (Cookstagram)
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            비스트로를 복원하고 요리를 서빙할 때마다 동물 직원들이 SNS에 비하인드 스토리와 맛있는 사진을 올립니다! 팔로워를 모아 푸짐한 보너스 재화를 획득하세요.
          </p>
        </div>

        {/* Follower Stats Card */}
        <div className="bg-white p-3.5 rounded-xl border border-rose-200 shadow-inner min-w-[220px]">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
            <span className="flex items-center gap-1 text-rose-600">
              <Users className="w-3.5 h-3.5" />
              총 팔로워
            </span>
            <span className="text-rose-600 font-black text-sm">
              {followers.toLocaleString()}명
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold mb-1">
            현재 등급: <strong className="text-slate-800">{tierTitle}</strong>
          </div>
          <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, (followers / nextMilestone) * 100)}%` }}
            />
          </div>
          <div className="text-[9px] text-slate-400 text-right mt-1">
            다음 등급까지 {Math.max(0, nextMilestone - followers)}명 남음
          </div>
        </div>
      </div>

      {/* Staff Characters Perks Bar */}
      <div className="bg-white p-4 rounded-2xl border border-cream-300 shadow-sm">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          비스트로 동물 직원 크루 & 패시브 버프
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STAFF_CHARACTERS.map(staff => {
            const isUnlocked = maxRestoredChapter >= staff.unlockedAtChapter;

            return (
              <div
                key={staff.id}
                className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'bg-cream-50 border-amber-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-xl shadow-inner">
                    {staff.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{staff.name}</div>
                    <div className="text-[10px] text-slate-500">{staff.role}</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 bg-white p-2 rounded-lg border border-cream-200 leading-tight">
                  {isUnlocked ? (
                    <span className="text-emerald-700 font-semibold">
                      ✨ {staff.passivePerk}
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      🔒 {staff.unlockedAtChapter}장 복원 시 잠금 해제
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feed Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => {
          const isUnlocked = maxRestoredChapter >= post.unlockedAtChapter;

          if (!isUnlocked) {
            return (
              <div
                key={post.id}
                className="bg-white/60 p-6 rounded-2xl border border-dashed border-cream-300 flex flex-col items-center justify-center text-center text-slate-400 min-h-[260px]"
              >
                <span className="text-3xl mb-2">🔒</span>
                <span className="text-xs font-bold text-slate-500">
                  {post.unlockedAtChapter}장 복원 완료 시 피드 공개
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  스토리를 진행하여 새로운 일상 사진을 해금하세요!
                </span>
              </div>
            );
          }

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-cream-300 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              {/* Post Header */}
              <div className="p-3 flex items-center justify-between border-b border-cream-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center text-base shadow-inner">
                    {post.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{post.author}</div>
                    <div className="text-[10px] text-slate-400">{post.handle}</div>
                  </div>
                </div>
                <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  {post.unlockedAtChapter}장 기념
                </span>
              </div>

              {/* Photo Card */}
              <div
                className={`w-full aspect-[4/3] bg-gradient-to-br ${post.bgGradient} flex items-center justify-center relative select-none`}
              >
                <span className="text-6xl drop-shadow-md animate-bounceSubtle">
                  {post.photoEmoji}
                </span>
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  {post.likes.toLocaleString()}
                </div>
              </div>

              {/* Caption & Reward */}
              <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {post.caption}
                </p>

                {/* Reward Box */}
                <div className="bg-cream-50 p-2.5 rounded-xl border border-cream-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="text-[10px] text-slate-500">팔로워 감사 선물</div>
                      <div className="text-xs font-extrabold text-slate-900">
                        {post.reward.label}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => claimPostReward(post.id)}
                    disabled={post.rewardClaimed}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      post.rewardClaimed
                        ? 'bg-cream-200 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-terracotta-500 text-white shadow hover:from-amber-600 hover:to-terracotta-600 active:scale-95'
                    }`}
                  >
                    {post.rewardClaimed ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>수령완료</span>
                      </>
                    ) : (
                      <span>선물 받기</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
