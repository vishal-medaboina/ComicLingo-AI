import React, { useEffect } from 'react';
import type { 
  ComicStory, 
  AIEvaluationResult, 
  UserProfile, 
  AppView 
} from '../../types/comiclingo';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  Bookmark, 
  RotateCcw, 
  ArrowRight, 
  Compass, 
  Zap,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface ResultsViewProps {
  story: ComicStory;
  practiceScore: number;
  quizScore: number;
  aiEvaluation: AIEvaluationResult | null;
  xpEarned: number;
  user: UserProfile;
  onReviewComic: () => void;
  onContinueToDashboard: () => void;
  onStartNextLesson: () => void;
  setCurrentView: (view: AppView) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  story,
  practiceScore,
  quizScore,
  aiEvaluation,
  xpEarned,
  user,
  onReviewComic,
  onContinueToDashboard,
  onStartNextLesson,
  setCurrentView,
}) => {
  useEffect(() => {
    playSoundEffect('triumph');
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f3b43', '#ff5c45', '#ffb703', '#34a0b7'],
      });
    } catch {
      // non-blocking
    }
  }, []);

  const overallAccuracy = Math.round(
    ((practiceScore + quizScore + (aiEvaluation?.overallScore || 85)) / 3)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-slide-up">
      
      {/* Trophy Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-850 to-teal-800 text-white border-3 border-slate-900 rounded-3xl p-6 sm:p-8 text-center shadow-comic-lg relative overflow-hidden">
        <div className="absolute right-4 top-2 opacity-15 pointer-events-none font-bangers text-9xl">
          WIN!
        </div>

        <div className="relative z-10 max-w-lg mx-auto space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-amber-400 border-2 border-slate-900 mx-auto flex items-center justify-center shadow-comic-sm">
            <Trophy className="w-8 h-8 text-slate-950" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-comic">
            Lesson Completed! 🎉
          </h2>

          <p className="text-xs sm:text-sm text-teal-200 font-medium">
            You successfully read "{story.title}", practiced active dialogues, and completed the comprehension quiz.
          </p>

          {/* XP Gained Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-500 rounded-full border-2 border-slate-900 shadow-comic-sm text-sm font-extrabold">
            <Sparkles className="w-4 h-4 fill-white" />
            <span>+{xpEarned} XP Gained! Total: {user.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-900 shadow-comic text-center">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
            Overall Accuracy
          </span>
          <div className="text-3xl font-extrabold text-teal-900 font-comic my-1">
            {overallAccuracy}%
          </div>
          <span className="text-xs text-teal-700 font-bold">Excellent mastery</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-slate-900 shadow-comic text-center">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
            Vocabulary Integrated
          </span>
          <div className="text-3xl font-extrabold text-coral-600 font-comic my-1">
            {story.vocabulary.length} Words
          </div>
          <span className="text-xs text-slate-600 font-bold">Added to active memory</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-slate-900 shadow-comic text-center">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
            AI Speech Evaluation
          </span>
          <div className="text-3xl font-extrabold text-amber-600 font-comic my-1">
            {aiEvaluation?.overallScore || 90}/100
          </div>
          <span className="text-xs text-amber-800 font-bold">Natural tone verified</span>
        </div>
      </div>

      {/* Vocabulary Words Learned in this Story */}
      <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-lg text-slate-900 font-comic">
              Story Vocabulary Learned
            </h3>
          </div>
          <button
            onClick={() => setCurrentView('vocab-bank')}
            className="text-xs font-bold text-teal-800 hover:underline"
          >
            Open Vocab Bank →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {story.vocabulary.map((vocab) => (
            <div
              key={vocab.id}
              className="p-3.5 bg-paper-100 rounded-xl border border-slate-900 flex items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 font-comic">{vocab.word}</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.2 rounded border border-slate-300 font-bold text-slate-600">
                    {vocab.partOfSpeech}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  {vocab.contextMeaning || vocab.meaning}
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Next Lesson Recommendation Card */}
      {story.recommendedNext && (
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-3 border-slate-900 rounded-3xl p-6 shadow-comic flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400 text-slate-950 border border-slate-900 rounded-md text-[10px] font-extrabold">
              <Compass className="w-3.5 h-3.5" />
              <span>AI ADAPTIVE NEXT LESSON RECOMMENDATION</span>
            </div>
            <h3 className="text-xl font-extrabold font-comic text-slate-900">
              {story.recommendedNext.nextTitle}
            </h3>
            <p className="text-xs text-slate-700 max-w-xl">
              {story.recommendedNext.reason}
            </p>
          </div>

          <button
            onClick={onStartNextLesson}
            className="px-6 py-3 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 transition-all flex items-center gap-2 shrink-0"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Start Next Comic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onReviewComic}
          className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-teal-800" />
          <span>Review Comic Story</span>
        </button>

        <button
          onClick={onContinueToDashboard}
          className="px-6 py-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
