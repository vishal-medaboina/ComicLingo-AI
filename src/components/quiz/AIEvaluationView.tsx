import React, { useState } from 'react';
import type { ComicStory, AIEvaluationResult } from '../../types/comiclingo';
import { evaluateUserResponse } from '../../services/aiService';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  MessageSquare,
  Award,
  Zap,
  Mic
} from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { playSoundEffect } from '../../utils/audio';

interface AIEvaluationViewProps {
  story: ComicStory;
  onFinishEvaluation: (evalResult: AIEvaluationResult) => void;
}

export const AIEvaluationView: React.FC<AIEvaluationViewProps> = ({
  story,
  onFinishEvaluation,
}) => {
  const [userText, setUserText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<AIEvaluationResult | null>(null);

  const scenario = story.evaluationScenario || {
    prompt: `Sarah asks: "Could you describe a challenging project situation and how you communicated with your team to resolve it?"`,
    context: 'Job Interview • Behavioral Round',
    characterPrompt: 'Speak in full sentences. Use terms like "collaborative", "articulate", or "pragmatic".',
  };

  const sampleAnswer = "When our team faced tight release deadlines, I articulated a pragmatic plan to prioritize core features and held collaborative daily syncs, resulting in a successful launch.";

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;

    playSoundEffect('pop');
    setIsEvaluating(true);

    try {
      const res = await evaluateUserResponse(userText, scenario.prompt);
      setEvaluation(res);
      playSoundEffect('triumph');
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleUseSample = () => {
    playSoundEffect('click');
    setUserText(sampleAnswer);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-slide-up">
      <div className="bg-white border-3 border-slate-900 rounded-3xl shadow-comic-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-teal-900 text-white p-6 border-b-3 border-slate-900">
          <div className="flex items-center gap-2">
            <span className="bg-coral-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-900 uppercase">
              GENAI ANSWER EVALUATION
            </span>
            <span className="text-xs text-teal-200 font-semibold">
              Context-Aware Natural Language Feedback
            </span>
          </div>
          <h2 className="text-2xl font-extrabold font-comic mt-1">
            Real Situational Response Challenge
          </h2>
        </div>

        {/* Challenge Stage */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Character Asking Question Scene */}
          <div className="p-5 bg-paper-100 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row items-center gap-5">
            <CharacterAvatar
              character={story.characters[1] || story.characters[0]}
              size="md"
              action="talk"
              expression="thinking"
            />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-extrabold text-teal-900 uppercase tracking-wider block font-comic">
                {scenario.context}
              </span>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                "{scenario.prompt}"
              </p>
              <p className="text-xs text-slate-600 font-medium italic">
                Tip: {scenario.characterPrompt}
              </p>
            </div>
          </div>

          {/* User Input Form */}
          {!evaluation ? (
            <form onSubmit={handleEvaluate} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Your English Response
                  </label>
                  <button
                    type="button"
                    onClick={handleUseSample}
                    className="text-xs font-bold text-coral-600 hover:text-coral-700 underline"
                  >
                    Insert Model Example
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Type your response to Sarah here. Use full sentences..."
                  className="w-full p-4 rounded-2xl border-2 border-slate-900 bg-paper-50 focus:bg-white text-xs sm:text-sm font-semibold shadow-comic-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  {userText.split(/\s+/).filter(Boolean).length} words
                </span>

                <button
                  type="submit"
                  disabled={isEvaluating || !userText.trim()}
                  className="px-6 py-3 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 disabled:opacity-40 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-coral-400" />
                  <span>{isEvaluating ? 'Evaluating Response...' : 'Evaluate with AI'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* AI Feedback Report */
            <div className="space-y-6 animate-fade-in">
              {/* Overall Score Badge */}
              <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white p-5 rounded-2xl border-2 border-slate-900 flex items-center justify-between shadow-comic">
                <div>
                  <span className="text-xs text-teal-200 font-bold uppercase tracking-wider">Overall Proficiency Score</span>
                  <div className="text-3xl font-extrabold font-comic text-coral-400 mt-0.5">
                    {evaluation.overallScore} / 100
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-700 flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
              </div>

              {/* 4 Rubric Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-paper-100 rounded-xl border border-slate-900">
                  <span className="font-extrabold text-slate-600 block">Meaning</span>
                  <span className="text-base font-black text-teal-900">{evaluation.criteria.meaning.score}%</span>
                </div>
                <div className="p-3 bg-paper-100 rounded-xl border border-slate-900">
                  <span className="font-extrabold text-slate-600 block">Grammar</span>
                  <span className="text-base font-black text-teal-900">{evaluation.criteria.grammar.score}%</span>
                </div>
                <div className="p-3 bg-paper-100 rounded-xl border border-slate-900">
                  <span className="font-extrabold text-slate-600 block">Vocabulary</span>
                  <span className="text-base font-black text-teal-900">{evaluation.criteria.vocabulary.score}%</span>
                </div>
                <div className="p-3 bg-paper-100 rounded-xl border border-slate-900">
                  <span className="font-extrabold text-slate-600 block">Naturalness</span>
                  <span className="text-base font-black text-teal-900">{evaluation.criteria.naturalness.score}%</span>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-3">
                <div className="p-4 bg-teal-50 rounded-2xl border-2 border-teal-600/80">
                  <span className="text-xs font-extrabold text-teal-900 flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>Key Strengths</span>
                  </span>
                  <ul className="text-xs text-teal-950 space-y-1 list-disc list-inside font-medium">
                    {evaluation.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-600/80">
                  <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-700" />
                    <span>Areas to Enhance</span>
                  </span>
                  <ul className="text-xs text-amber-950 space-y-1 list-disc list-inside font-medium">
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Comparison */}
              <div className="p-4 bg-paper-100 rounded-2xl border border-slate-400">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Native Model Phrasing
                </span>
                <p className="text-xs font-semibold text-slate-800 italic">
                  {evaluation.modelAnswer}
                </p>
              </div>

              {/* Continue Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    playSoundEffect('triumph');
                    onFinishEvaluation(evaluation);
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-sm shadow-comic hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>View Final Results & Rewards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
