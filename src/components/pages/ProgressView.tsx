import React from 'react';
import type { UserProfile } from '../../types/comiclingo';
import { 
  TrendingUp, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Award, 
  BarChart3, 
  Bookmark, 
  Target,
  CheckCircle2
} from 'lucide-react';

interface ProgressViewProps {
  user: UserProfile;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user }) => {
  const SKILLS = [
    { name: 'Situational Speaking & Fluency', level: 78, color: 'bg-teal-700' },
    { name: 'Contextual Vocabulary', level: 85, color: 'bg-coral-500' },
    { name: 'Listening & Pronunciation', level: 72, color: 'bg-amber-500' },
    { name: 'Grammar in Dialogue', level: 80, color: 'bg-indigo-600' },
  ];

  const WEEKLY_ACTIVITY = [
    { day: 'Mon', xp: 60 },
    { day: 'Tue', xp: 90 },
    { day: 'Wed', xp: 120 },
    { day: 'Thu', xp: 45 },
    { day: 'Fri', xp: 80 },
    { day: 'Sat', xp: 110 },
    { day: 'Sun', xp: 75 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-slide-up">
      
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-teal-900" />
          <h1 className="text-2xl sm:text-3xl font-extrabold font-comic text-slate-900">
            Learning Progress & Analytics
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Detailed breakdown of your English learning journey, XP trajectory, and vocabulary retention.
        </p>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border-3 border-slate-900 shadow-comic">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Total XP Earned</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 font-comic my-1">{user.xp}</div>
          <span className="text-xs text-teal-700 font-bold">Level {user.level} Scholar</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-3 border-slate-900 shadow-comic">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Daily Streak</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-comic my-1 flex items-center gap-1">
            <span>{user.streak} Days</span>
            <Flame className="w-5 h-5 fill-current animate-bounce-subtle" />
          </div>
          <span className="text-xs text-slate-600 font-bold">Consistent momentum</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-3 border-slate-900 shadow-comic">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Comics Finished</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-coral-600 font-comic my-1">{user.lessonsCompleted}</div>
          <span className="text-xs text-slate-600 font-bold">Situations experienced</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-3 border-slate-900 shadow-comic">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Vocabulary Growth</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-comic my-1">{user.savedWordsCount}</div>
          <span className="text-xs text-slate-600 font-bold">Words cataloged</span>
        </div>
      </div>

      {/* 2 Column Breakdown: Weekly Activity Chart & Skills Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Activity Visualizer */}
        <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg font-comic text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-800" />
              <span>Weekly Learning Activity</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">Last 7 Days</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b-2 border-slate-200">
            {WEEKLY_ACTIVITY.map((item) => {
              const heightPercent = Math.min(100, Math.round((item.xp / 130) * 100));
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 font-mono">{item.xp}</span>
                  <div className="w-full bg-paper-100 h-32 rounded-t-lg relative overflow-hidden border border-slate-300">
                    <div
                      className="w-full bg-teal-800 hover:bg-coral-500 transition-all rounded-t-lg absolute bottom-0"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">{item.day}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 font-medium text-center">
            Daily target: 50 XP/day. You are outperforming your target by 40%!
          </p>
        </div>

        {/* Skill Mastery Breakdown */}
        <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg font-comic text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-coral-600" />
              <span>Skill Mastery Assessment</span>
            </h3>
            <span className="text-xs font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded border border-teal-300">
              {user.englishLevel}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-extrabold text-slate-800">
                  <span>{skill.name}</span>
                  <span className="font-mono text-slate-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-paper-100 h-3.5 rounded-full border-2 border-slate-900 overflow-hidden p-0.5">
                  <div
                    className={`${skill.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 p-3 bg-paper-100 rounded-xl border border-slate-300 text-xs text-slate-600 font-medium">
            💡 <strong className="text-slate-900">AI Recommendation:</strong> Practice Airport or Hotel check-in dialogues next to boost Situational Speaking by another +10%!
          </div>
        </div>

      </div>

    </div>
  );
};
