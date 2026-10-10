import React from 'react';
import type { VocabularyWord } from '../../types/comiclingo';
import { Volume2, Bookmark, Check, X, Sparkles, BookOpen } from 'lucide-react';
import { speakEnglishText, playSoundEffect } from '../../utils/audio';

interface VocabModalProps {
  word: VocabularyWord;
  onClose: () => void;
  onToggleSave: (word: VocabularyWord) => void;
  onToggleLearned: (wordId: string) => void;
}

export const VocabModal: React.FC<VocabModalProps> = ({
  word,
  onClose,
  onToggleSave,
  onToggleLearned,
}) => {
  const handlePronounce = () => {
    playSoundEffect('pop');
    speakEnglishText(word.word, 0.9);
  };

  const handleSave = () => {
    playSoundEffect('pop');
    onToggleSave(word);
  };

  const handleLearned = () => {
    playSoundEffect('pop');
    onToggleLearned(word.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="max-w-md w-full bg-white border-3 border-slate-900 rounded-3xl shadow-comic-lg overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner */}
        <div className="bg-teal-900 text-white p-5 border-b-3 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-coral-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-900">
              STORY VOCABULARY
            </span>
            <span className="text-xs text-teal-200 font-semibold">{word.partOfSpeech}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-teal-850 hover:bg-teal-800 border border-teal-600 flex items-center justify-center text-teal-100 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Word Details */}
        <div className="p-6 space-y-5">
          
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-3xl font-extrabold font-comic text-slate-900 tracking-tight">
                {word.word}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">
                {word.phonetic}
              </p>
            </div>

            <button
              onClick={handlePronounce}
              title="Listen to audio pronunciation"
              className="p-3 bg-amber-400 hover:bg-amber-500 text-slate-950 border-2 border-slate-900 rounded-2xl shadow-comic-sm hover:-translate-y-0.5 transition-all flex items-center gap-1.5 font-extrabold text-xs"
            >
              <Volume2 className="w-4 h-4 text-slate-950" />
              <span>Pronounce</span>
            </button>
          </div>

          {/* Meaning Cards */}
          <div className="space-y-3">
            <div className="p-3.5 bg-paper-100 rounded-2xl border-2 border-slate-900">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                General Meaning
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                {word.meaning}
              </p>
            </div>

            <div className="p-3.5 bg-teal-50 rounded-2xl border-2 border-teal-800/80">
              <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-teal-700" />
                <span>Meaning in this Story Context</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-teal-950 leading-snug">
                {word.contextMeaning}
              </p>
            </div>

            <div className="p-3.5 bg-paper-50 rounded-2xl border border-slate-300">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                Example Usage
              </span>
              <p className="text-xs italic text-slate-700 leading-snug">
                "{word.example}"
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              className={`flex-1 py-2.5 px-4 rounded-xl border-2 border-slate-900 font-extrabold text-xs shadow-comic-sm flex items-center justify-center gap-1.5 transition-all ${
                word.isSaved
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{word.isSaved ? 'Saved in Bank' : 'Save to Vocab Bank'}</span>
            </button>

            <button
              onClick={handleLearned}
              className={`py-2.5 px-4 rounded-xl border-2 border-slate-900 font-extrabold text-xs shadow-comic-sm flex items-center justify-center gap-1.5 transition-all ${
                word.isLearned
                  ? 'bg-teal-700 text-white'
                  : 'bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{word.isLearned ? 'Learned' : 'Mark Learned'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
