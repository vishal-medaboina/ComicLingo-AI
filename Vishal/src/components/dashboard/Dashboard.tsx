import React from 'react';
import type { 
  UserProfile, 
  ComicStory, 
  AppView 
} from '../../types/comiclingo';
import { 
  Sparkles, 
  Flame, 
  PlusCircle, 
  BookOpen, 
  ArrowRight, 
  Users, 
  Trophy, 
  Bookmark, 
  Compass, 
  Clock, 
  Award,
  Zap,
  PlayCircle
} from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { PRESET_CHARACTERS } from '../../services/characterAiService';
import { playSoundEffect } from '../../utils/audio';

interface DashboardProps {
  user: UserProfile;
  recentComics: ComicStory[];
  onStartPersonalization: () => void;
  onOpenComic: (comic: ComicStory) => void;
  setCurrentView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  recentComics,
  onStartPersonalization,
  onOpenComic,
  setCurrentView,
}) => {
  // Calculate level progress
  const currentLevelBaseXP = (user.level - 1) * 150;
  const nextLevelXP = user.level * 150;
  const xpInCurrentLevel = Math.max(0, user.xp - currentLevelBaseXP);
  const xpNeeded = 150;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpNeeded) * 100));

  const handleStart = () => {
    playSoundEffect('pop');
    onStartPersonalization();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-slide-up">
      
      {/* Hero Welcome Banner */}
      <div className="relative bg-gradient-to-r from-teal-900 via-teal-850 to-teal-800 rounded-3xl border-3 border-slate-900 p-6 sm:p-8 text-white shadow-comic-lg overflow-hidden">
        {/* Background Halftone / Bangers Effect */}
        <div className="absolute right-4 top-2 opacity-10 pointer-events-none select-none">
          <span className="font-bangers text-9xl">READ!</span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral-500 text-white rounded-full text-xs font-extrabold border border-slate-900 shadow-comic-sm">
              <Zap className="w-3.5 h-3.5" />
              <span>LEARN ENGLISH THROUGH GENERATIVE COMIC STORIES</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-comic tracking-tight leading-tight">
              Welcome back, {user.name}! 🚀
            </h1>

            <p className="text-sm text-teal-100 font-medium leading-relaxed">
              Experience language learning where you live the narrative. Customize characters, read multi-panel animated scenes, and master situational English dialogue.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleStart}
                className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-2xl font-extrabold text-sm shadow-comic hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create New AI Comic</span>
              </button>

              <button
                onClick={() => setCurrentView('character-studio')}
                className="px-5 py-3 bg-white hover:bg-paper-100 text-teal-950 border-2 border-slate-900 rounded-2xl font-extrabold text-sm shadow-comic hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-teal-700" />
                <span>AI Character Studio</span>
              </button>
            </div>
          </div>

          {/* Interactive Character Avatar Hero Showcase */}
          <div className="hidden sm:flex items-center gap-3 bg-teal-950/60 p-4 rounded-2xl border-2 border-teal-700/80 shadow-inner">
            <div className="text-center">
              <CharacterAvatar 
                character={PRESET_CHARACTERS[0]} // Alex
                size="md" 
                action="talk" 
                expression="happy"
              />
              <span className="block mt-1 text-[11px] font-bold text-teal-200">Alex (Lead)</span>
            </div>
            <div className="text-center">
              <CharacterAvatar 
                character={PRESET_CHARACTERS[1]} // Sarah
                size="md" 
                action="nod" 
                expression="happy"
                facing="left"
              />
              <span className="block mt-1 text-[11px] font-bold text-teal-200">Sarah (Director)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Level & XP */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Level {user.level}</span>
            <div className="w-7 h-7 rounded-lg bg-teal-100 border border-slate-900 flex items-center justify-center">
              <Award className="w-4 h-4 text-teal-800" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-xl font-extrabold text-teal-900 font-comic">{user.xp} XP</div>
            <div className="w-full bg-slate-100 h-2 rounded-full border border-slate-400 overflow-hidden mt-1.5">
              <div 
                className="bg-coral-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-bold">{xpNeeded - xpInCurrentLevel} XP to Level {user.level + 1}</span>
        </div>

        {/* Daily Streak */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Daily Streak</span>
            <div className="w-7 h-7 rounded-lg bg-orange-100 border border-slate-900 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-xl font-extrabold text-orange-600 font-comic flex items-center gap-1">
              <span>{user.streak} Days</span>
              <span className="text-sm">🔥</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Read today to keep streak active!</p>
          </div>
          <span className="text-[10px] text-teal-700 font-extrabold">Next Reward at 7 Days</span>
        </div>

        {/* English Level */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">English Level</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 border border-slate-900 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-indigo-700" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-lg font-extrabold text-slate-900 font-comic">{user.englishLevel}</div>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Target: {user.goals[0] || 'Speaking'}</p>
          </div>
          <span className="text-[10px] text-indigo-700 font-extrabold">Age Group: {user.ageGroup}</span>
        </div>

        {/* Vocabulary Saved */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Vocab Bank</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 border border-slate-900 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-xl font-extrabold text-amber-800 font-comic">{user.savedWordsCount} Words</div>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Interactive dialogue words</p>
          </div>
          <button 
            onClick={() => setCurrentView('vocab-bank')}
            className="text-[10px] text-teal-800 font-extrabold hover:underline text-left"
          >
            Review Word Bank →
          </button>
        </div>
      </div>

      {/* Main Grid: Continue Reading & AI Character Studio Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Continue Learning & Recent Stories */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-900" />
              <h2 className="text-xl font-extrabold font-comic text-slate-900">
                Continue Learning
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('my-comics')}
              className="text-xs font-extrabold text-teal-800 hover:text-teal-950 flex items-center gap-1"
            >
              <span>View All Comics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentComics.length > 0 ? (
            <div className="space-y-4">
              {recentComics.slice(0, 2).map((comic) => (
                <div 
                  key={comic.id}
                  className="bg-white border-3 border-slate-900 rounded-2xl p-5 shadow-comic hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-teal-900 rounded-xl border-2 border-slate-900 flex flex-col items-center justify-center text-white shrink-0 shadow-comic-sm">
                      <span className="font-bangers text-coral-400 text-lg">ACT 1</span>
                      <span className="text-[9px] font-bold uppercase">{comic.comicStyle.split(' ')[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-900 border border-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                          {comic.situation}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">
                          {comic.pages.length} Pages • {comic.difficulty}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 font-comic mt-1">
                        {comic.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {comic.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onOpenComic(comic)}
                      className="w-full sm:w-auto px-4 py-2 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm flex items-center justify-center gap-1.5"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Read Comic</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-3 border-dashed border-slate-400 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-coral-100 rounded-2xl border-2 border-slate-900 mx-auto flex items-center justify-center shadow-comic-sm">
                <BookOpen className="w-6 h-6 text-coral-600" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-800 font-comic">No Comics Generated Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ready for your first animated English story? Select your learning situation, and the AI will craft your comic in seconds!
              </p>
              <button
                onClick={handleStart}
                className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create My First Comic</span>
              </button>
            </div>
          )}

          {/* AI Character Studio Feature Highlight Card */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-slate-900 rounded-2xl p-5 shadow-comic flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-400 text-slate-950 border border-slate-900 rounded-md text-[10px] font-extrabold">
                <Sparkles className="w-3 h-3" />
                <span>AI CHARACTER STUDIO</span>
              </div>
              <h3 className="text-base font-extrabold font-comic text-slate-900">
                Create & Animate Any Original Character
              </h3>
              <p className="text-xs text-slate-700">
                Describe detectives, superheroes, scientists or teachers. Preview realistic speech gestures and use them in your custom comics!
              </p>
            </div>
            <button
              onClick={() => setCurrentView('character-studio')}
              className="px-4 py-2.5 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm shrink-0"
            >
              Open Studio →
            </button>
          </div>
        </div>

        {/* Right Col: AI Recommendation & Vocabulary Review */}
        <div className="space-y-6">
          
          {/* AI Recommendation Widget */}
          <div className="bg-white border-3 border-slate-900 rounded-2xl p-5 shadow-comic space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-900">
                <Compass className="w-4 h-4 text-coral-500" />
                <span className="font-extrabold text-xs uppercase tracking-wider">AI Recommended For You</span>
              </div>
              <span className="bg-coral-100 text-coral-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-slate-900">
                Adaptive
              </span>
            </div>

            <div className="bg-paper-100 p-3.5 rounded-xl border-2 border-slate-900 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Situation: Job Interview</span>
              <h4 className="font-extrabold text-sm text-slate-900 font-comic">
                The Ace Interview: Pitching with Confidence
              </h4>
              <p className="text-xs text-slate-600 leading-snug">
                Practice answering behavioral questions with clarity, polite idioms, and structural communication.
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-2 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Start Recommended Comic</span>
            </button>
          </div>

          {/* Quick Vocabulary Snapshot */}
          <div className="bg-white border-3 border-slate-900 rounded-2xl p-5 shadow-comic space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-600" />
                <h3 className="font-extrabold text-sm text-slate-900 font-comic">Recent Vocab</h3>
              </div>
              <button
                onClick={() => setCurrentView('vocab-bank')}
                className="text-[11px] font-bold text-teal-800 hover:underline"
              >
                View all ({user.savedWordsCount})
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-paper-100 rounded-xl border border-slate-900 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-slate-900 font-comic">Articulate</span>
                  <p className="text-[10px] text-slate-500">Express ideas coherently</p>
                </div>
                <span className="text-[9px] bg-teal-100 text-teal-900 px-1.5 py-0.5 rounded font-bold border border-teal-300">
                  Verb
                </span>
              </div>
              <div className="p-2.5 bg-paper-100 rounded-xl border border-slate-900 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-slate-900 font-comic">Pragmatic</span>
                  <p className="text-[10px] text-slate-500">Sensible and practical</p>
                </div>
                <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                  Adj
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
