import React, { useState, useEffect, useRef } from 'react';
import type { 
  ComicStory, 
  ComicPage, 
  ComicPanel, 
  DialogueEvent, 
  VocabularyWord,
  ExpressionType,
  ActionType 
} from '../../types/comiclingo';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { VocabModal } from './VocabModal';
import { speakEnglishText, stopSpeech, playSoundEffect } from '../../utils/audio';

interface ComicReaderProps {
  story: ComicStory;
  onFinishReading: () => void;
  onSaveVocab: (word: VocabularyWord) => void;
  onToggleLearned: (wordId: string) => void;
}

export const ComicReader: React.FC<ComicReaderProps> = ({
  story,
  onFinishReading,
  onSaveVocab,
  onToggleLearned,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAnimatedMode, setIsAnimatedMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedVocabWord, setSelectedVocabWord] = useState<VocabularyWord | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentPage: ComicPage = story.pages[currentPageIndex] || story.pages[0];
  const allDialoguesInCurrentPage: { panelId: string; dialogue: DialogueEvent }[] = [];

  currentPage.panels.forEach(p => {
    p.dialogues.forEach(d => {
      allDialoguesInCurrentPage.push({ panelId: p.id, dialogue: d });
    });
  });

  const currentDialogueItem = allDialoguesInCurrentPage[activeDialogueIndex];

  // Animated Playback Engine
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && isAnimatedMode && allDialoguesInCurrentPage.length > 0) {
      const current = allDialoguesInCurrentPage[activeDialogueIndex]?.dialogue;
      if (current) {
        if (isAudioEnabled) {
          speakEnglishText(current.text, 0.95);
        }

        const duration = Math.max(3000, (current.duration || 3200));
        timer = setTimeout(() => {
          if (activeDialogueIndex < allDialoguesInCurrentPage.length - 1) {
            setActiveDialogueIndex(prev => prev + 1);
          } else {
            // Check if there is a next page
            if (currentPageIndex < story.pages.length - 1) {
              setCurrentPageIndex(prev => prev + 1);
              setActiveDialogueIndex(0);
            } else {
              setIsPlaying(false);
            }
          }
        }, duration);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, activeDialogueIndex, currentPageIndex, isAnimatedMode, isAudioEnabled, allDialoguesInCurrentPage]);

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      playSoundEffect('turn');
      stopSpeech();
      setCurrentPageIndex(prev => prev - 1);
      setActiveDialogueIndex(0);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < story.pages.length - 1) {
      playSoundEffect('turn');
      stopSpeech();
      setCurrentPageIndex(prev => prev + 1);
      setActiveDialogueIndex(0);
    }
  };

  const handleTogglePlay = () => {
    playSoundEffect('click');
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      stopSpeech();
    }
  };

  const handleVocabClick = (wordStr: string) => {
    playSoundEffect('pop');
    const clean = wordStr.toLowerCase().replace(/[^a-z]/g, '');
    const found = story.vocabulary.find(v => v.word.toLowerCase() === clean) || {
      id: `word-${clean}`,
      word: wordStr,
      phonetic: '/.../',
      partOfSpeech: 'key term',
      meaning: 'Key context word from this comic scenario.',
      contextMeaning: `Essential conversational vocabulary used by the characters in this scene.`,
      example: `He used "${wordStr}" with clear confidence.`,
      difficulty: story.englishLevel,
      sourceComicTitle: story.title,
      sourceComicId: story.id,
      isSaved: false,
      isLearned: false,
    };
    setSelectedVocabWord(found);
  };

  const renderDialogueBubbleText = (text: string, highlightedVocab: string[] = []) => {
    const words = text.split(' ');
    return words.map((w, idx) => {
      const cleanW = w.toLowerCase().replace(/[^a-z]/g, '');
      const isHighlighted = highlightedVocab.some(hv => hv.toLowerCase() === cleanW) ||
        story.vocabulary.some(sv => sv.word.toLowerCase() === cleanW);

      if (isHighlighted) {
        return (
          <span
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              handleVocabClick(w);
            }}
            className="cursor-pointer font-black text-coral-600 underline decoration-2 decoration-coral-500 hover:bg-amber-100 rounded px-0.5 mx-0.5 transition-colors"
            title="Click to learn word definition & pronunciation"
          >
            {w}{' '}
          </span>
        );
      }
      return <span key={idx}>{w} </span>;
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`max-w-6xl mx-auto px-4 py-6 space-y-4 animate-slide-up ${
        isFullscreen ? 'fixed inset-0 z-50 bg-paper-100 overflow-y-auto p-4' : ''
      }`}
    >
      
      {/* Top Header & Reading Mode Bar */}
      <div className="bg-white border-3 border-slate-900 rounded-2xl p-4 shadow-comic flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-900 text-white font-bangers text-xs px-2 py-0.5 rounded tracking-wider">
              {story.comicStyle.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Page {currentPageIndex + 1} of {story.pages.length}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold font-comic text-slate-900 mt-0.5 truncate max-w-md">
            {story.title}
          </h2>
        </div>

        {/* Animated Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Animated Mode Switch */}
          <button
            onClick={() => {
              setIsAnimatedMode(!isAnimatedMode);
              setIsPlaying(false);
              stopSpeech();
            }}
            className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-extrabold shadow-comic-sm transition-all flex items-center gap-1.5 ${
              isAnimatedMode ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAnimatedMode ? 'Animated Acting' : 'Manual Reader'}</span>
          </button>

          {isAnimatedMode && (
            <div className="flex items-center gap-1 bg-paper-100 p-1 rounded-xl border-2 border-slate-900">
              <button
                onClick={() => {
                  if (activeDialogueIndex > 0) setActiveDialogueIndex(prev => prev - 1);
                }}
                disabled={activeDialogueIndex <= 0}
                className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-40"
              >
                <SkipBack className="w-4 h-4 text-slate-800" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="p-1.5 bg-coral-500 hover:bg-coral-600 text-white rounded-lg border border-slate-900 shadow-comic-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => {
                  if (activeDialogueIndex < allDialoguesInCurrentPage.length - 1) {
                    setActiveDialogueIndex(prev => prev + 1);
                  }
                }}
                disabled={activeDialogueIndex >= allDialoguesInCurrentPage.length - 1}
                className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-40"
              >
                <SkipForward className="w-4 h-4 text-slate-800" />
              </button>
            </div>
          )}

          {/* Audio TTS Narration Toggle */}
          <button
            onClick={() => {
              setIsAudioEnabled(!isAudioEnabled);
              if (isAudioEnabled) stopSpeech();
            }}
            title={isAudioEnabled ? 'Voice narration on' : 'Voice narration muted'}
            className="p-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 shadow-comic-sm"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-teal-800" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 shadow-comic-sm"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Comic Page Canvas */}
      <div 
        className="bg-paper-200 border-4 border-slate-900 rounded-3xl p-4 sm:p-6 shadow-comic-lg transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
      >
        {/* Page Title & Caption Banner */}
        <div className="flex items-center justify-between mb-4 border-b-2 border-slate-900/30 pb-2">
          <span className="caption-box">
            {currentPage.pageTitle}
          </span>
          <span className="text-[11px] font-extrabold text-slate-600 font-mono">
            COMICLINGO AI ORIGINAL • {story.situation}
          </span>
        </div>

        {/* Dynamic Multi-Panel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPage.panels.map((panel, pIdx) => {
            const isFullSpan = panel.layoutSpan === 'hero' || pIdx === 0 && currentPage.panels.length === 3;
            const gridClass = isFullSpan ? 'md:col-span-2' : 'col-span-1';

            // Background theme classes
            const bgClassMap = {
              office: 'bg-gradient-to-b from-sky-50 via-slate-100 to-slate-200',
              'tech-hub': 'bg-gradient-to-b from-teal-50 via-cyan-100 to-slate-200',
              cafe: 'bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200',
              airport: 'bg-gradient-to-b from-blue-50 via-indigo-100 to-slate-200',
              hospital: 'bg-gradient-to-b from-emerald-50 via-teal-100 to-slate-200',
              hotel: 'bg-gradient-to-b from-rose-50 via-amber-100 to-slate-200',
              park: 'bg-gradient-to-b from-green-50 via-emerald-100 to-teal-200',
              classroom: 'bg-gradient-to-b from-yellow-50 via-orange-100 to-amber-200',
              street: 'bg-gradient-to-b from-slate-100 via-gray-200 to-slate-300',
              space: 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white',
            };

            const bgClass = bgClassMap[panel.backgroundTheme] || bgClassMap.office;

            return (
              <div
                key={panel.id}
                className={`comic-panel rounded-2xl ${gridClass} min-h-[300px] sm:min-h-[340px] flex flex-col justify-between p-4 ${bgClass}`}
              >
                {/* Panel Header & Environment Caption */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bangers text-xs flex items-center justify-center">
                      {pIdx + 1}
                    </span>
                    {panel.caption && (
                      <span className="caption-box">
                        {panel.caption}
                      </span>
                    )}
                  </div>

                  {/* Sound Effect Badge */}
                  {panel.soundEffect && (
                    <div 
                      className="sfx-badge px-3 py-1 rounded-md text-white font-bangers text-xl tracking-wider border-2 border-slate-900 shadow-comic-sm animate-pulse-glow"
                      style={{ 
                        backgroundColor: panel.soundEffect.color,
                        transform: `rotate(${panel.soundEffect.rotation}deg)` 
                      }}
                    >
                      {panel.soundEffect.text}
                    </div>
                  )}
                </div>

                {/* Speech & Thought Bubbles Container */}
                <div className="space-y-3 my-2 z-20">
                  {panel.dialogues.map((dlg) => {
                    const isCurrentlySpeaking = currentDialogueItem?.dialogue.id === dlg.id;
                    const speakerChar = story.characters.find(c => c.id === dlg.characterId);

                    return (
                      <div
                        key={dlg.id}
                        onClick={() => {
                          if (isAudioEnabled) speakEnglishText(dlg.text);
                        }}
                        className={`transition-all duration-300 cursor-pointer ${
                          isCurrentlySpeaking ? 'scale-[1.02] ring-3 ring-coral-500 rounded-2xl' : 'opacity-90 hover:opacity-100'
                        }`}
                      >
                        <div className="speech-bubble speech-bubble-bottom">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-[11px] text-teal-900 font-comic uppercase tracking-wider">
                              {dlg.characterName}
                            </span>
                            <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold border border-slate-300">
                              {dlg.emotion}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                            {renderDialogueBubbleText(dlg.text, dlg.highlightedVocab)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Characters Acting Stage Inside the Panel */}
                <div className="flex items-end justify-around pt-4 border-t-2 border-slate-900/10 z-10">
                  {panel.actingCharacters.map((actor) => {
                    const charObj = story.characters.find(c => c.id === actor.characterId);
                    if (!charObj) return null;

                    // Dynamically coordinate acting & reactions
                    const isSpeakingNow = currentDialogueItem?.dialogue.characterId === charObj.id;
                    const isReactingNow = currentDialogueItem?.dialogue.reactionTargetId === charObj.id;

                    let dynamicExpression: ExpressionType = actor.initialExpression;
                    let dynamicAction: ActionType = actor.initialAction;

                    if (isSpeakingNow && currentDialogueItem) {
                      dynamicExpression = currentDialogueItem.dialogue.expression;
                      dynamicAction = currentDialogueItem.dialogue.gesture;
                    } else if (isReactingNow && currentDialogueItem) {
                      dynamicExpression = currentDialogueItem.dialogue.reactionExpression || 'happy';
                      dynamicAction = 'nod';
                    }

                    return (
                      <div key={actor.characterId} className="flex flex-col items-center">
                        <CharacterAvatar
                          character={charObj}
                          expression={dynamicExpression}
                          action={dynamicAction}
                          facing={actor.facing}
                          isSpeaking={isSpeakingNow}
                          size="md"
                          showShadow={true}
                        />
                        <span className="mt-1 text-[10px] font-extrabold text-slate-800 bg-white/90 px-2 py-0.5 rounded-full border border-slate-900 shadow-comic-sm">
                          {charObj.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Page Navigation & Next Step Footer */}
      <div className="bg-white border-3 border-slate-900 rounded-2xl p-4 shadow-comic flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Previous & Next Page */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-4 py-2 border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm disabled:opacity-40 disabled:hover:bg-white hover:bg-slate-100 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Page</span>
          </button>

          <span className="text-xs font-bold text-slate-700 px-2 font-mono">
            {currentPageIndex + 1} / {story.pages.length}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === story.pages.length - 1}
            className="px-4 py-2 border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm disabled:opacity-40 disabled:hover:bg-white hover:bg-slate-100 flex items-center gap-1.5"
          >
            <span>Next Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compulsory Flow CTA: Finish Reading & Proceed to Practice */}
        <button
          onClick={() => {
            playSoundEffect('triumph');
            onFinishReading();
          }}
          className="w-full sm:w-auto px-6 py-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>I've Read the Comic — Start Practice!</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

      {/* Vocabulary Modal Popup */}
      {selectedVocabWord && (
        <VocabModal
          word={selectedVocabWord}
          onClose={() => setSelectedVocabWord(null)}
          onToggleSave={(w) => {
            onSaveVocab(w);
            setSelectedVocabWord({ ...w, isSaved: !w.isSaved });
          }}
          onToggleLearned={(id) => {
            onToggleLearned(id);
            setSelectedVocabWord(prev => prev ? { ...prev, isLearned: !prev.isLearned } : null);
          }}
        />
      )}

    </div>
  );
};
