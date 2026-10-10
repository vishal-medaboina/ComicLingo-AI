import React, { useState } from 'react';
import type { 
  PracticeQuestion, 
  ComicStory 
} from '../../types/comiclingo';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  MessageSquare, 
  BookOpen,
  Award
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface PracticeViewProps {
  story: ComicStory;
  onCompletePractice: (score: number) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  story,
  onCompletePractice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions: PracticeQuestion[] = story.practice;
  const currentQ: PracticeQuestion = questions[currentIndex] || questions[0];

  const handleSelectOption = (opt: string) => {
    if (hasSubmitted) return;
    playSoundEffect('click');
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);

    const isCorrect = selectedOption.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      playSoundEffect('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      playSoundEffect('pop');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      playSoundEffect('click');
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      playSoundEffect('triumph');
      const finalScore = Math.round(((correctCount + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100);
      onCompletePractice(finalScore);
    }
  };

  const isCorrect = selectedOption?.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-up">
      <div className="bg-white border-3 border-slate-900 rounded-3xl shadow-comic-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-teal-900 text-white p-6 border-b-3 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-coral-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-900 uppercase">
              INTERACTIVE PRACTICE
            </span>
            <span className="text-xs text-teal-200 font-semibold font-comic">
              Exercise {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <span className="text-xs font-bold bg-teal-850 px-2.5 py-1 rounded-full border border-teal-700">
            Target: {currentQ.vocabTarget}
          </span>
        </div>

        {/* Question Area */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Scenario Context */}
          <div className="bg-paper-100 p-4 rounded-2xl border-2 border-slate-900">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Story Scenario Context
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              {currentQ.scenario}
            </p>
          </div>

          {/* Dialogue Speaker Prompt */}
          <div className="speech-bubble speech-bubble-bottom max-w-xl mx-auto">
            <span className="text-[10px] font-extrabold text-teal-900 uppercase tracking-wider block mb-1 font-comic">
              {currentQ.speaker}
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-900">
              "{currentQ.prompt}"
            </p>
          </div>

          {/* Multiple Options Grid */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options?.map((opt) => {
              const isSelected = selectedOption === opt;
              let btnClass = 'bg-paper-50 border-slate-300 text-slate-800 hover:border-slate-800';

              if (hasSubmitted) {
                if (opt.toLowerCase() === currentQ.correctAnswer.toLowerCase()) {
                  btnClass = 'bg-teal-100 border-teal-600 text-teal-950 font-bold ring-2 ring-teal-600';
                } else if (isSelected) {
                  btnClass = 'bg-red-100 border-red-500 text-red-900 font-bold';
                }
              } else if (isSelected) {
                btnClass = 'bg-teal-900 text-white border-slate-900 shadow-comic-sm font-bold -translate-y-0.5';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {hasSubmitted && opt.toLowerCase() === currentQ.correctAnswer.toLowerCase() && (
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 ml-2" />
                  )}
                  {hasSubmitted && isSelected && opt.toLowerCase() !== currentQ.correctAnswer.toLowerCase() && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Card */}
          {hasSubmitted && (
            <div className={`p-4 rounded-2xl border-2 animate-fade-in ${
              isCorrect ? 'bg-teal-50 border-teal-600 text-teal-950' : 'bg-amber-50 border-amber-600 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                    <span className="font-extrabold text-sm font-comic">Well done! Accurate situational response.</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-amber-700" />
                    <span className="font-extrabold text-sm font-comic">Not quite. Here is the reason:</span>
                  </>
                )}
              </div>
              <p className="text-xs font-medium leading-relaxed mt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 font-mono">
              Score: {correctCount} / {currentIndex + (hasSubmitted ? 1 : 0)}
            </span>

            {!hasSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className="px-6 py-2.5 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm disabled:opacity-40"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Exercise' : 'Proceed to Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
