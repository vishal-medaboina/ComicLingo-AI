import React, { useEffect, useState } from 'react';
import { Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { PRESET_CHARACTERS } from '../../services/characterAiService';

interface GenAILoadingProps {
  currentStage: string;
  progressPercent: number;
}

export const GenAILoading: React.FC<GenAILoadingProps> = ({
  currentStage,
  progressPercent,
}) => {
  const STAGES = [
    'Understanding your learning profile...',
    'Choosing the story & setting...',
    'Creating original characters...',
    'Building the story narrative & conflict...',
    'Adapting the English level & idioms...',
    'Designing comic panels & composition...',
    'Preparing interactive vocabulary bank...',
    'Creating practice exercises...',
    'Preparing your story quiz...',
    'Almost ready...',
  ];

  // Visual pulses & character acting during generation
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCharIndex((prev) => (prev + 1) % PRESET_CHARACTERS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white border-3 border-slate-900 rounded-3xl shadow-comic-lg overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="bg-teal-900 text-white p-6 border-b-3 border-slate-900 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral-500 rounded-full text-xs font-extrabold border border-slate-900 shadow-comic-sm mb-3">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span>GENAI PIPELINE ACTIVE</span>
          </div>
          <h2 className="text-2xl font-extrabold font-comic">
            Creating Your Comic Story...
          </h2>
          <p className="text-xs text-teal-200 mt-1">
            Adapting practical dialogue, custom panels, and interactive learning assets.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Animated Characters Workshop Scene */}
          <div className="bg-paper-100 rounded-2xl border-2 border-slate-900 p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-6">
              <CharacterAvatar
                character={PRESET_CHARACTERS[activeCharIndex % PRESET_CHARACTERS.length]}
                size="md"
                action="talk"
                expression="happy"
              />
              <div className="speech-bubble speech-bubble-bottom max-w-xs text-xs font-bold text-slate-800 shadow-comic-sm">
                "{currentStage || 'Designing the story panels...'}"
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-coral-500 animate-ping" />
              <span>AI Engine analyzing language constructs & dialogue reactions...</span>
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold text-slate-700">
              <span className="truncate pr-2 font-comic">{currentStage || 'Processing...'}</span>
              <span className="text-coral-600 font-mono text-sm">{Math.min(100, Math.round(progressPercent))}%</span>
            </div>

            <div className="w-full bg-paper-200 h-4 rounded-full border-2 border-slate-900 overflow-hidden shadow-inner p-0.5">
              <div
                className="bg-gradient-to-r from-teal-700 via-teal-500 to-coral-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.max(8, progressPercent))}%` }}
              />
            </div>
          </div>

          {/* Step Indicators Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {STAGES.slice(0, 6).map((stage, idx) => {
              const stagePercent = ((idx + 1) / 6) * 100;
              const isCompleted = progressPercent >= stagePercent;
              const isCurrent = !isCompleted && progressPercent >= stagePercent - 20;

              return (
                <div
                  key={stage}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-teal-50 border-teal-300 text-teal-900 font-bold'
                      : isCurrent
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold animate-pulse'
                      : 'bg-transparent border-transparent text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isCompleted ? 'text-teal-600 fill-teal-100' : 'text-slate-300'
                    }`}
                  />
                  <span className="truncate">{stage}</span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
