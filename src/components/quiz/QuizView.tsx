import React, { useState } from 'react';
import type { 
  QuizQuestion, 
  ComicStory 
} from '../../types/comiclingo';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award, 
  HelpCircle,
  Trophy
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface QuizViewProps {
  story: ComicStory;
  onCompleteQuiz: (score: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  story,
  onCompleteQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions: QuizQuestion[] = story.quiz;
  const currentQ: QuizQuestion = questions[currentIndex] || questions[0];

  const handleSelect = (opt: string) => {
    if (hasSubmitted) return;
    playSoundEffect('click');
    setSelectedOption(opt);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      playSoundEffect('correct');
      setCorrectAnswers(prev => prev + 1);
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
      const finalScore = Math.round(((correctAnswers + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / questions.length) * 100);
      onCompleteQuiz(finalScore);
    }
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-up">
      <div className="bg-white border-3 border-slate-900 rounded-3xl shadow-comic-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-teal-900 text-white p-6 border-b-3 border-slate-900 flex items-center justify-between">
          <div>
            <span className="bg-coral-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-900 uppercase">
              STORY COMPREHENSION QUIZ
            </span>
            <h2 className="text-xl font-extrabold font-comic mt-1">
              {story.title}
            </h2>
          </div>
          <span className="text-xs font-bold bg-teal-850 px-3 py-1.5 rounded-full border border-teal-700 font-mono">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Question Area */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Type: {currentQ.type}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-comic leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              let btnClass = 'bg-paper-50 border-slate-300 text-slate-800 hover:border-slate-800';

              if (hasSubmitted) {
                if (opt === currentQ.correctAnswer) {
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
                  onClick={() => handleSelect(opt)}
                  disabled={hasSubmitted}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {hasSubmitted && opt === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 ml-2" />
                  )}
                  {hasSubmitted && isSelected && opt !== currentQ.correctAnswer && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {hasSubmitted && (
            <div className={`p-4 rounded-2xl border-2 animate-fade-in ${
              isCorrect ? 'bg-teal-50 border-teal-600 text-teal-950' : 'bg-amber-50 border-amber-600 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-teal-700" />
                    <span className="font-extrabold text-sm font-comic">Correct! Excellent reading comprehension.</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-amber-700" />
                    <span className="font-extrabold text-sm font-comic">Incorrect. Review the lesson explanation:</span>
                  </>
                )}
              </div>
              <p className="text-xs font-medium leading-relaxed mt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="pt-4 border-t-2 border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 font-mono">
              Score: {correctAnswers} / {currentIndex + (hasSubmitted ? 1 : 0)}
            </span>

            {!hasSubmitted ? (
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className="px-6 py-2.5 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm disabled:opacity-40"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Proceed to AI Evaluation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
