import React, { useState } from 'react';
import type { VocabularyWord } from '../../types/comiclingo';
import { 
  Bookmark, 
  Search, 
  Volume2, 
  Check, 
  Trash2, 
  Sparkles, 
  RotateCw,
  BookOpen
} from 'lucide-react';
import { speakEnglishText, playSoundEffect } from '../../utils/audio';

interface VocabBankViewProps {
  vocabulary: VocabularyWord[];
  onToggleLearned: (id: string) => void;
  onRemoveWord: (id: string) => void;
}

export const VocabBankView: React.FC<VocabBankViewProps> = ({
  vocabulary,
  onToggleLearned,
  onRemoveWord,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'saved' | 'learned'>('all');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const filteredWords = vocabulary.filter((w) => {
    if (filter === 'learned' && !w.isLearned) return false;
    if (filter === 'saved' && w.isLearned) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.contextMeaning.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePronounce = (word: string) => {
    playSoundEffect('pop');
    speakEnglishText(word, 0.9);
  };

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-slide-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-600 fill-amber-600" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-comic text-slate-900">
              Interactive Vocabulary Bank
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Words saved directly from your AI comic dialogues. Practice meaning, context, and pronunciation.
          </p>
        </div>

        {/* Flashcard Toggle */}
        <button
          onClick={() => {
            playSoundEffect('click');
            setIsFlashcardMode(!isFlashcardMode);
            setIsCardFlipped(false);
          }}
          className={`px-4 py-2.5 rounded-xl border-2 border-slate-900 font-extrabold text-xs shadow-comic-sm transition-all flex items-center gap-2 ${
            isFlashcardMode ? 'bg-amber-400 text-slate-950' : 'bg-white hover:bg-slate-50 text-slate-800'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isFlashcardMode ? 'List View' : 'Flashcard Mode'}</span>
        </button>
      </div>

      {/* FLASHCARD MODE */}
      {isFlashcardMode ? (
        <div className="max-w-lg mx-auto py-8 space-y-6">
          {currentFlashcard ? (
            <>
              <div
                onClick={() => {
                  playSoundEffect('turn');
                  setIsCardFlipped(!isCardFlipped);
                }}
                className="min-h-[280px] bg-white border-3 border-slate-900 rounded-3xl p-8 shadow-comic-lg cursor-pointer flex flex-col justify-between text-center transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>Card {flashcardIndex + 1} of {filteredWords.length}</span>
                  <span className="text-teal-700 font-extrabold uppercase">{currentFlashcard.partOfSpeech}</span>
                </div>

                {!isCardFlipped ? (
                  <div className="my-auto space-y-2">
                    <h2 className="text-4xl font-extrabold font-comic text-slate-900">
                      {currentFlashcard.word}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono font-bold">
                      {currentFlashcard.phonetic}
                    </p>
                    <p className="text-[11px] text-coral-600 font-bold uppercase tracking-wider mt-4">
                      Tap card to reveal meaning & story context
                    </p>
                  </div>
                ) : (
                  <div className="my-auto space-y-3 animate-fade-in text-left">
                    <div className="p-3 bg-paper-100 rounded-xl border border-slate-300">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Meaning</span>
                      <p className="text-xs font-bold text-slate-800">{currentFlashcard.meaning}</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-xl border border-teal-300">
                      <span className="text-[10px] font-bold text-teal-800 uppercase block">Comic Context</span>
                      <p className="text-xs font-bold text-teal-950">{currentFlashcard.contextMeaning}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePronounce(currentFlashcard.word);
                    }}
                    className="p-2 bg-paper-100 hover:bg-paper-200 border border-slate-900 rounded-xl text-slate-800"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-400 font-medium">Click to flip</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    setFlashcardIndex(prev => Math.max(0, prev - 1));
                  }}
                  disabled={flashcardIndex === 0}
                  className="px-4 py-2 border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm disabled:opacity-40"
                >
                  Previous Card
                </button>
                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    setFlashcardIndex(prev => Math.min(filteredWords.length - 1, prev + 1));
                  }}
                  disabled={flashcardIndex >= filteredWords.length - 1}
                  className="px-4 py-2 bg-coral-500 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm disabled:opacity-40"
                >
                  Next Card
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8 bg-white rounded-2xl border-2 border-slate-900 shadow-comic">
              <p className="text-sm font-bold text-slate-600">No words match current filter.</p>
            </div>
          )}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-4">
          
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search saved vocabulary..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border-2 border-slate-900 bg-white text-xs font-semibold shadow-comic-sm focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {(['all', 'saved', 'learned'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilter(mode)}
                  className={`px-3 py-1.5 rounded-xl border-2 text-xs font-extrabold capitalize transition-all ${
                    filter === mode
                      ? 'bg-teal-900 text-white border-slate-900 shadow-comic-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((word) => (
              <div
                key={word.id}
                className="bg-white border-3 border-slate-900 rounded-2xl p-5 shadow-comic flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-lg font-comic text-slate-900">{word.word}</h3>
                        <span className="text-[10px] bg-paper-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-300 font-bold">
                          {word.partOfSpeech}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 font-bold">{word.phonetic}</span>
                    </div>

                    <button
                      onClick={() => handlePronounce(word.word)}
                      title="Audio Pronunciation"
                      className="p-2 rounded-xl border border-slate-900 bg-paper-100 hover:bg-paper-200 shadow-comic-sm"
                    >
                      <Volume2 className="w-4 h-4 text-teal-800" />
                    </button>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs">
                    <p className="text-slate-800 font-semibold leading-snug">
                      {word.meaning}
                    </p>
                    <p className="text-teal-900 font-medium bg-teal-50 p-2 rounded-lg border border-teal-200">
                      <span className="font-bold text-[10px] uppercase block text-teal-700">Context:</span>
                      {word.contextMeaning}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      playSoundEffect('pop');
                      onToggleLearned(word.id);
                    }}
                    className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg border transition-all ${
                      word.isLearned
                        ? 'bg-teal-100 text-teal-900 border-teal-400'
                        : 'bg-paper-50 text-slate-600 border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{word.isLearned ? 'Learned' : 'Mark Learned'}</span>
                  </button>

                  <button
                    onClick={() => onRemoveWord(word.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                    title="Remove word"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
