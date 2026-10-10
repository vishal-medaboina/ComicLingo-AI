import React, { useState } from 'react';
import type { Achievement } from '../../types/comiclingo';
import { Trophy, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface AchievementsViewProps {
  achievements: Achievement[];
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ achievements }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filtered = achievements.filter((a) => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-slide-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 fill-amber-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-comic text-slate-900">
              Achievements & Badges
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Unlock achievements by reading comics, mastering vocabulary, and passing comprehension quizzes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'unlocked', 'locked'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                playSoundEffect('click');
                setFilter(mode);
              }}
              className={`px-3 py-1.5 rounded-xl border-2 text-xs font-extrabold capitalize transition-all ${
                filter === mode
                  ? 'bg-teal-900 text-white border-slate-900 shadow-comic-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-800'
              }`}
            >
              {mode} ({mode === 'all' ? achievements.length : mode === 'unlocked' ? unlockedCount : achievements.length - unlockedCount})
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const progressPercent = Math.min(100, Math.round((item.progress / item.maxProgress) * 100));

          return (
            <div
              key={item.id}
              className={`border-3 border-slate-900 rounded-2xl p-5 shadow-comic transition-all flex flex-col justify-between ${
                item.unlocked ? 'bg-white' : 'bg-paper-100 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-paper-100 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic-sm">
                    {item.icon}
                  </div>
                  {item.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full border border-teal-400">
                      <CheckCircle2 className="w-3 h-3 text-teal-700" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full border border-slate-400">
                      <Lock className="w-3 h-3 text-slate-600" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <h3 className="font-extrabold text-base font-comic text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 space-y-1.5">
                <div className="flex justify-between text-[11px] font-extrabold text-slate-600 font-mono">
                  <span>Progress</span>
                  <span>{item.progress} / {item.maxProgress}</span>
                </div>
                <div className="w-full bg-paper-200 h-2.5 rounded-full border border-slate-400 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.unlocked ? 'bg-amber-400' : 'bg-slate-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {item.unlockedAt && (
                  <span className="text-[10px] text-teal-700 font-bold block pt-0.5">
                    Unlocked {item.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
