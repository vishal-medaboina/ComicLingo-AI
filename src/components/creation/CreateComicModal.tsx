import React, { useState } from 'react';
import type { 
  UserProfile, 
  AgeGroup, 
  EnglishLevel, 
  ComicStyle, 
  Situation, 
  Character 
} from '../../types/comiclingo';
import type { GenerationParams } from '../../services/aiService';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Sliders, 
  MessageSquare, 
  Users, 
  Compass, 
  ArrowRight,
  HelpCircle,
  Palette,
  Check
} from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { PRESET_CHARACTERS } from '../../services/characterAiService';
import { playSoundEffect } from '../../utils/audio';

interface CreateComicModalProps {
  user: UserProfile;
  onSubmit: (params: GenerationParams) => void;
  onCancel: () => void;
  savedCharacters: Character[];
}

export const CreateComicModal: React.FC<CreateComicModalProps> = ({
  user,
  onSubmit,
  onCancel,
  savedCharacters,
}) => {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(user.ageGroup || '15+');
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>(user.englishLevel || 'Intermediate');
  const [selectedGoal, setSelectedGoal] = useState<string>(user.goals[0] || 'Speaking');
  const [selectedInterest, setSelectedInterest] = useState<string>(user.interests[0] || 'Technology');
  const [comicStyle, setComicStyle] = useState<ComicStyle>(user.comicStyle || 'Graphic Novel');
  const [situation, setSituation] = useState<Situation>(user.situation || 'Job Interview');
  const [storyLength, setStoryLength] = useState<'Short (2 pages)' | 'Medium (3 pages)' | 'Long (4 pages)'>('Medium (3 pages)');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Challenging'>('Medium');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [selectedChars, setSelectedChars] = useState<Character[]>([PRESET_CHARACTERS[0], PRESET_CHARACTERS[1]]);

  const AGE_GROUPS: { value: AgeGroup; label: string; desc: string }[] = [
    { value: '5-10', label: '5–10 Years', desc: 'Simple words, fun creatures & phonics' },
    { value: '10-15', label: '10–15 Years', desc: 'School, friendships & practical idioms' },
    { value: '15+', label: '15+ Years', desc: 'Professional, workplace, travel & college' },
  ];

  const LEVELS: EnglishLevel[] = [
    'Beginner',
    'Elementary',
    'Intermediate',
    'Upper-Intermediate',
    'Advanced',
  ];

  const GOALS = [
    'Speaking',
    'Interview English',
    'Vocabulary',
    'Everyday English',
    'Grammar',
    'Conversation',
    'Travel English',
    'Communication Confidence',
  ];

  const SITUATIONS: { value: Situation; icon: string }[] = [
    { value: 'Job Interview', icon: '💼' },
    { value: 'Workplace', icon: '💻' },
    { value: 'Airport', icon: '✈️' },
    { value: 'Hotel', icon: '🏨' },
    { value: 'Food & Restaurant', icon: '🍽️' },
    { value: 'Healthcare', icon: '🩺' },
    { value: 'Shopping', icon: '🛍️' },
    { value: 'School & College', icon: '🎓' },
    { value: 'Travel', icon: '🗺️' },
    { value: 'Technology', icon: '⚡' },
    { value: 'Friends & Social', icon: '🎉' },
    { value: 'Daily Life', icon: '☕' },
  ];

  const COMIC_STYLES: { value: ComicStyle; previewBg: string; border: string }[] = [
    { value: 'Graphic Novel', previewBg: 'from-slate-800 to-slate-900', border: 'border-slate-800' },
    { value: 'Anime-Inspired', previewBg: 'from-pink-500 to-indigo-600', border: 'border-pink-500' },
    { value: 'Classic Comic', previewBg: 'from-amber-500 to-red-600', border: 'border-amber-500' },
    { value: 'Cartoon', previewBg: 'from-sky-400 to-teal-500', border: 'border-sky-400' },
    { value: 'Comedy', previewBg: 'from-yellow-400 to-orange-500', border: 'border-yellow-400' },
    { value: 'Storybook', previewBg: 'from-emerald-400 to-teal-600', border: 'border-emerald-400' },
    { value: 'Cinematic', previewBg: 'from-purple-800 to-slate-950', border: 'border-purple-600' },
    { value: 'Realistic', previewBg: 'from-stone-700 to-stone-900', border: 'border-stone-600' },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    playSoundEffect('pop');
    onSubmit({
      ageGroup,
      englishLevel,
      goals: [selectedGoal],
      interests: [selectedInterest],
      comicStyle,
      situation,
      storyLength,
      difficulty,
      selectedCharacters: selectedChars,
      customPrompt: customPrompt.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-slide-up">
      <div className="bg-white border-3 border-slate-900 rounded-3xl shadow-comic-lg overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-teal-900 text-white p-6 sm:p-8 border-b-3 border-slate-900 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-coral-500 border-2 border-slate-900 flex items-center justify-center shadow-comic-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-comic tracking-tight">
                Create My Personalized Comic
              </h2>
              <p className="text-xs sm:text-sm text-teal-200 font-medium">
                Customize your age, English proficiency, situation, and comic style for instant AI generation.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleGenerate} className="p-6 sm:p-8 space-y-8">
          
          {/* 1. Age Group */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 bg-teal-100 text-teal-900 rounded-full flex items-center justify-center text-[11px] font-black border border-slate-900">1</span>
                <span>Select Learner Age Group</span>
              </label>
              <span className="text-[11px] text-slate-500 font-bold">Adapts sentence structure & tone</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {AGE_GROUPS.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => { playSoundEffect('click'); setAgeGroup(item.value); }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                    ageGroup === item.value
                      ? 'bg-teal-900 text-white border-slate-900 shadow-comic -translate-y-0.5'
                      : 'bg-paper-100 text-slate-800 border-slate-300 hover:border-slate-800'
                  }`}
                >
                  <div className="font-extrabold text-sm font-comic">{item.label}</div>
                  <div className={`text-[11px] mt-1 ${ageGroup === item.value ? 'text-teal-200' : 'text-slate-500'}`}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. English Level */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 bg-teal-100 text-teal-900 rounded-full flex items-center justify-center text-[11px] font-black border border-slate-900">2</span>
                <span>Current English Level</span>
              </label>
              <span className="text-[11px] text-slate-500 font-bold">Vocabulary & grammar complexity</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {LEVELS.map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => { playSoundEffect('click'); setEnglishLevel(level); }}
                  className={`py-2 px-3 rounded-xl border-2 text-xs font-extrabold transition-all text-center ${
                    englishLevel === level
                      ? 'bg-coral-500 text-white border-slate-900 shadow-comic-sm -translate-y-0.5'
                      : 'bg-paper-50 text-slate-700 border-slate-300 hover:border-slate-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Real-life Situation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 bg-teal-100 text-teal-900 rounded-full flex items-center justify-center text-[11px] font-black border border-slate-900">3</span>
                <span>Real-Life Situation / Context</span>
              </label>
              <span className="text-[11px] text-slate-500 font-bold">Where the story takes place</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {SITUATIONS.map((sit) => (
                <button
                  type="button"
                  key={sit.value}
                  onClick={() => { playSoundEffect('click'); setSituation(sit.value); }}
                  className={`p-2.5 rounded-xl border-2 text-xs font-extrabold transition-all flex items-center gap-2 ${
                    situation === sit.value
                      ? 'bg-teal-900 text-white border-slate-900 shadow-comic-sm -translate-y-0.5'
                      : 'bg-paper-50 text-slate-800 border-slate-300 hover:border-slate-800'
                  }`}
                >
                  <span className="text-base">{sit.icon}</span>
                  <span className="truncate">{sit.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Comic Visual Art Style */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 bg-teal-100 text-teal-900 rounded-full flex items-center justify-center text-[11px] font-black border border-slate-900">4</span>
                <span>Comic Visual Style</span>
              </label>
              <span className="text-[11px] text-slate-500 font-bold">You choose the aesthetic</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COMIC_STYLES.map((style) => (
                <button
                  type="button"
                  key={style.value}
                  onClick={() => { playSoundEffect('click'); setComicStyle(style.value); }}
                  className={`p-3 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                    comicStyle === style.value
                      ? 'border-slate-900 shadow-comic -translate-y-0.5 ring-2 ring-coral-500'
                      : 'border-slate-300 hover:border-slate-800'
                  }`}
                >
                  <div className={`h-8 rounded-lg bg-gradient-to-r ${style.previewBg} mb-2 border border-slate-900/30 flex items-center justify-center text-white text-[10px] font-bold tracking-wider uppercase`}>
                    {style.value.split(' ')[0]}
                  </div>
                  <div className="font-extrabold text-xs text-slate-800 font-comic flex items-center justify-between">
                    <span>{style.value}</span>
                    {comicStyle === style.value && <Check className="w-3.5 h-3.5 text-coral-600" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Primary Learning Goal & Story Length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Primary Learning Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
              >
                {GOALS.map((goal) => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Story Length
              </label>
              <select
                value={storyLength}
                onChange={(e) => setStoryLength(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
              >
                <option value="Short (2 pages)">Short (2 Pages • Quick Practice)</option>
                <option value="Medium (3 pages)">Medium (3 Pages • Standard Lesson)</option>
                <option value="Long (4 pages)">Long (4 Pages • Deep Immersion)</option>
              </select>
            </div>
          </div>

          {/* 6. Cast Preview (Consistent Characters) */}
          <div className="p-4 bg-teal-50 border-2 border-slate-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-4">
                <div className="w-12 h-14 bg-white rounded-xl border-2 border-slate-900 overflow-hidden shadow-comic-sm flex items-center justify-center">
                  <CharacterAvatar character={selectedChars[0]} size="xs" action="idle" />
                </div>
                <div className="w-12 h-14 bg-white rounded-xl border-2 border-slate-900 overflow-hidden shadow-comic-sm flex items-center justify-center">
                  <CharacterAvatar character={selectedChars[1]} size="xs" action="idle" facing="left" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-teal-800 tracking-wider">Story Cast Ready</span>
                <p className="text-xs font-extrabold text-slate-900">
                  {selectedChars[0]?.name || 'Alex'} & {selectedChars[1]?.name || 'Sarah'}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold">Visual consistency maintained across all comic pages.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                // Shuffle cast from preset
                playSoundEffect('click');
                const shuffled = [...PRESET_CHARACTERS].sort(() => 0.5 - Math.random());
                setSelectedChars([shuffled[0], shuffled[1]]);
              }}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-teal-900 border-2 border-slate-900 rounded-xl text-xs font-bold shadow-comic-sm shrink-0"
            >
              Shuffle Cast 🎲
            </button>
          </div>

          {/* 7. Optional Custom Situation Prompt */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Optional Custom Story Prompt / Scenario</span>
              <span className="text-[10px] text-slate-400 font-normal">Optional</span>
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. A developer explaining why asynchronous code failed in production..."
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 focus:bg-white text-xs font-semibold shadow-comic-sm focus:outline-none"
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 border-2 border-slate-900 rounded-xl font-extrabold text-xs text-slate-700 hover:bg-slate-100 shadow-comic-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-sm shadow-comic hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>GENERATE MY COMIC</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
