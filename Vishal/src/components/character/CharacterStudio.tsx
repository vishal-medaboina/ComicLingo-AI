import React, { useState } from 'react';
import type { 
  Character, 
  CharacterCategory, 
  ExpressionType, 
  ActionType, 
  EntranceAnimation,
  ComicStyle,
  AgeGroup 
} from '../../types/comiclingo';
import { 
  generateCharacterFromPrompt, 
  PRESET_CHARACTERS 
} from '../../services/characterAiService';
import { CharacterAvatar } from './CharacterAvatar';
import { 
  Sparkles, 
  Search, 
  RotateCcw, 
  Bookmark, 
  Check, 
  Plus, 
  Trash2, 
  Sliders, 
  Play, 
  Users, 
  ShieldAlert, 
  Heart, 
  Copy, 
  Edit3,
  X
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface CharacterStudioProps {
  characters: Character[];
  onSaveCharacter: (character: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onUseInComic: (character: Character) => void;
}

export const CharacterStudio: React.FC<CharacterStudioProps> = ({
  characters,
  onSaveCharacter,
  onDeleteCharacter,
  onUseInComic,
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory | 'All'>('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);
  
  // Current active character in the preview stage
  const [activeCharacter, setActiveCharacter] = useState<Character>(characters[0] || PRESET_CHARACTERS[0]);
  const [previewExpression, setPreviewExpression] = useState<ExpressionType>('happy');
  const [previewAction, setPreviewAction] = useState<ActionType>('talk');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'studio' | 'library' | 'my-characters' | 'scene'>('studio');

  // Multi-character scene test state
  const [sceneChars, setSceneChars] = useState<Character[]>([
    characters[0] || PRESET_CHARACTERS[0],
    characters[1] || PRESET_CHARACTERS[1]
  ]);

  const CATEGORIES: { label: string; cat: CharacterCategory; icon: string }[] = [
    { label: 'Heroes', cat: 'Heroes', icon: '🦸' },
    { label: 'Heroines', cat: 'Heroines', icon: '👸' },
    { label: 'Villains', cat: 'Villains', icon: '🦹' },
    { label: 'Fantasy', cat: 'Fantasy', icon: '🧙' },
    { label: 'Sci-Fi', cat: 'Sci-Fi', icon: '🚀' },
    { label: 'Robots', cat: 'Robots', icon: '🤖' },
    { label: 'Students', cat: 'Students', icon: '🎒' },
    { label: 'Teachers', cat: 'Teachers', icon: '👨‍🏫' },
    { label: 'Doctors', cat: 'Doctors', icon: '👨‍⚕️' },
    { label: 'Scientists', cat: 'Scientists', icon: '🔬' },
    { label: 'Engineers', cat: 'Engineers', icon: '💻' },
    { label: 'Detectives', cat: 'Detectives', icon: '🕵️' },
    { label: 'Royal', cat: 'Royal Characters', icon: '👑' },
    { label: 'Warriors', cat: 'Warriors', icon: '⚔️' },
    { label: 'Business', cat: 'Business Characters', icon: '🧑‍💼' },
    { label: 'Kids', cat: 'Kids', icon: '👶' },
    { label: 'Teenagers', cat: 'Teenagers', icon: '🧑' },
    { label: 'Adults', cat: 'Adults', icon: '👨' },
    { label: 'Seniors', cat: 'Seniors', icon: '👴' },
    { label: 'Comedy', cat: 'Comedy Characters', icon: '🎭' },
    { label: 'Mystery', cat: 'Mystery Characters', icon: '👻' },
    { label: 'School', cat: 'School Characters', icon: '🏫' },
    { label: 'Travel', cat: 'Travel Characters', icon: '🌎' },
  ];

  const EXAMPLE_PROMPTS = [
    'A funny teenage superhero who controls electricity',
    'A brave female detective with a classic trench coat',
    'A friendly robot teacher who explains difficult grammar',
    'A mysterious fantasy villain with glowing eyes',
    'A clever scientist who loves inventions and coffee',
    'A patient doctor in an international hospital',
    'A charismatic chef with a curly mustache',
  ];

  const handleGenerate = (customPromptText?: string) => {
    const textToUse = customPromptText || prompt;
    if (!textToUse.trim()) return;

    playSoundEffect('pop');
    setIsGenerating(true);
    setGenerationNotice(null);

    setTimeout(() => {
      const result = generateCharacterFromPrompt(
        textToUse, 
        selectedCategory === 'All' ? undefined : selectedCategory
      );

      setActiveCharacter(result.character);
      setPreviewExpression(result.character.currentExpression || 'happy');
      setPreviewAction(result.character.currentAction || 'wave');

      if (result.isProtected && result.notice) {
        setGenerationNotice(result.notice);
      }

      setIsGenerating(false);
      playSoundEffect('triumph');
    }, 700);
  };

  const handleSave = () => {
    playSoundEffect('pop');
    onSaveCharacter(activeCharacter);
  };

  const handleActionClick = (act: ActionType) => {
    playSoundEffect('click');
    setPreviewAction(act);
    if (act === 'talk') {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2400);
    } else {
      setIsSpeaking(false);
    }
  };

  const handleExpressionClick = (exp: ExpressionType) => {
    playSoundEffect('click');
    setPreviewExpression(exp);
  };

  const filteredCharacters = characters.filter((c) => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (prompt.trim() && !c.name.toLowerCase().includes(prompt.toLowerCase()) && !c.role.toLowerCase().includes(prompt.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-slide-up">
      
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-850 to-teal-800 text-white rounded-3xl border-3 border-slate-900 p-6 sm:p-8 shadow-comic-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-coral-500 border border-slate-900 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="bg-teal-700 text-teal-100 text-[10px] font-extrabold px-2 py-0.5 rounded border border-teal-500 uppercase tracking-wider">
            AI CHARACTER STUDIO
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-comic tracking-tight">
          Create Any Character With AI
        </h1>
        <p className="text-xs sm:text-sm text-teal-200 font-medium max-w-2xl mt-1">
          Describe the character you imagine. ComicLingo will generate an original character with distinct visual style, expressive acting gestures, and educational storytelling traits.
        </p>

        {/* Search & Prompt Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Describe the character you want (e.g. A funny teenage superhero who controls electricity)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-900 bg-white text-slate-900 text-xs sm:text-sm font-semibold shadow-comic focus:outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !prompt.trim()}
            className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-2xl font-extrabold text-xs sm:text-sm shadow-comic hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Designing Character...' : 'AI Generate'}</span>
          </button>
        </div>

        {/* Copyright Notice Alert */}
        {generationNotice && (
          <div className="mt-4 p-3 bg-amber-400/95 text-slate-950 border-2 border-slate-900 rounded-xl text-xs font-bold flex items-center gap-2 shadow-comic-sm animate-fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0 text-slate-900" />
            <span>{generationNotice}</span>
          </div>
        )}

        {/* Example Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-teal-200 font-bold uppercase tracking-wider">Try Examples:</span>
          {EXAMPLE_PROMPTS.slice(0, 4).map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setPrompt(ex);
                handleGenerate(ex);
              }}
              className="text-[11px] bg-teal-950/60 hover:bg-teal-950 text-teal-100 hover:text-white px-2.5 py-1 rounded-full border border-teal-700 transition-all font-medium truncate max-w-xs"
            >
              "{ex}"
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b-2 border-slate-900 space-x-2">
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-t-xl transition-all border-t-2 border-x-2 ${
            activeTab === 'studio'
              ? 'bg-white text-teal-900 border-slate-900 -mb-0.5 font-comic'
              : 'bg-paper-200 text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          🎭 Interactive Stage & Customizer
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-t-xl transition-all border-t-2 border-x-2 ${
            activeTab === 'library'
              ? 'bg-white text-teal-900 border-slate-900 -mb-0.5 font-comic'
              : 'bg-paper-200 text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          📚 Explore Characters ({characters.length})
        </button>
        <button
          onClick={() => setActiveTab('scene')}
          className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-t-xl transition-all border-t-2 border-x-2 ${
            activeTab === 'scene'
              ? 'bg-white text-teal-900 border-slate-900 -mb-0.5 font-comic'
              : 'bg-paper-200 text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          🎬 Multi-Character Scene Test
        </button>
      </div>

      {/* TAB 1: STUDIO PREVIEW STAGE */}
      {activeTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Center Stage (Col 7) */}
          <div className="lg:col-span-7 bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic flex flex-col justify-between space-y-6">
            
            {/* Top Stage Bar */}
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
              <div>
                <span className="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-extrabold border border-teal-300">
                  {activeCharacter.category}
                </span>
                <h3 className="text-2xl font-extrabold font-comic text-slate-900 mt-1">
                  {activeCharacter.name}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {activeCharacter.role} • {activeCharacter.profession} ({activeCharacter.ageGroup})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  title="Save Character to Collection"
                  className="p-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 border-2 border-slate-900 rounded-xl shadow-comic-sm font-extrabold text-xs flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    playSoundEffect('triumph');
                    onUseInComic(activeCharacter);
                  }}
                  className="p-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl shadow-comic-sm font-extrabold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Use in Comic</span>
                </button>
              </div>
            </div>

            {/* Visual Stage Canvas */}
            <div className="relative min-h-[300px] sm:min-h-[340px] bg-gradient-to-b from-paper-100 to-paper-200 border-2 border-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 overflow-hidden shadow-inner">
              
              {/* Halftone / Comic Spotlight Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1b6170_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
              
              {/* Dynamic Animated Character */}
              <div className="z-10 text-center">
                <CharacterAvatar
                  character={activeCharacter}
                  expression={previewExpression}
                  action={previewAction}
                  isSpeaking={isSpeaking}
                  size="hero"
                  showShadow={true}
                />
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-sm border border-slate-900 px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-slate-800 shadow-comic-sm z-10">
                Action: <span className="text-coral-600 uppercase">{previewAction}</span> • Emotion: <span className="text-teal-700 uppercase">{previewExpression}</span>
              </div>
            </div>

            {/* Interactive Acting Controls (Emotions & Gestures) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
                <span>🎭 Test Facial Expressions</span>
                <span className="text-[10px] text-slate-400">Click to animate</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(['happy', 'surprised', 'thinking', 'worried', 'angry', 'confused', 'proud', 'default'] as ExpressionType[]).map((exp) => (
                  <button
                    key={exp}
                    onClick={() => handleExpressionClick(exp)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize transition-all ${
                      previewExpression === exp
                        ? 'bg-teal-900 text-white border-slate-900 shadow-comic-sm -translate-y-0.5'
                        : 'bg-paper-50 text-slate-700 border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 pt-1">
                <span>🎬 Test Body Actions & Gestures</span>
                <span className="text-[10px] text-slate-400">Synchronized movements</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(['idle', 'talk', 'wave', 'point', 'think', 'celebrate', 'laugh', 'nod'] as ActionType[]).map((act) => (
                  <button
                    key={act}
                    onClick={() => handleActionClick(act)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize transition-all ${
                      previewAction === act
                        ? 'bg-coral-500 text-white border-slate-900 shadow-comic-sm -translate-y-0.5'
                        : 'bg-paper-50 text-slate-700 border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Character DNA & Live Customizer (Col 5) */}
          <div className="lg:col-span-5 bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-5">
            
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg font-comic text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-800" />
                <span>Character Customization</span>
              </h3>
              <button
                onClick={() => {
                  playSoundEffect('click');
                  // Randomize appearance
                  const hairs: Character['appearance']['hairStyle'][] = ['short', 'curly', 'long', 'bob', 'spiky', 'buzz', 'ponytail', 'wavy'];
                  const outfits: Character['appearance']['outfitStyle'][] = ['casual', 'suit', 'labcoat', 'scrubs', 'uniform', 'detective', 'scifi', 'hero', 'chef'];
                  const colors = ['#134753', '#0f2b32', '#ff5c45', '#ca8a04', '#7c3aed', '#dc2626', '#0284c7'];

                  setActiveCharacter(prev => ({
                    ...prev,
                    appearance: {
                      ...prev.appearance,
                      hairStyle: hairs[Math.floor(Math.random() * hairs.length)],
                      outfitStyle: outfits[Math.floor(Math.random() * outfits.length)],
                      outfitColor: colors[Math.floor(Math.random() * colors.length)],
                    }
                  }));
                }}
                className="text-xs font-bold text-coral-600 hover:text-coral-700 underline"
              >
                Randomize 🎲
              </button>
            </div>

            {/* Customization Controls */}
            <div className="space-y-4 text-xs font-bold">
              {/* Hair Style */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Hairstyle
                </label>
                <select
                  value={activeCharacter.appearance.hairStyle}
                  onChange={(e) => setActiveCharacter(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, hairStyle: e.target.value as any }
                  }))}
                  className="w-full p-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 shadow-comic-sm focus:outline-none"
                >
                  <option value="short">Short Classic</option>
                  <option value="curly">Curly / Wavy</option>
                  <option value="long">Long Flowing</option>
                  <option value="bob">Sleek Bob</option>
                  <option value="spiky">Spiky Anime</option>
                  <option value="ponytail">Ponytail</option>
                  <option value="buzz">Buzz Cut</option>
                  <option value="afro">Afro / Volume</option>
                </select>
              </div>

              {/* Outfit Style */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Outfit Style
                </label>
                <select
                  value={activeCharacter.appearance.outfitStyle}
                  onChange={(e) => setActiveCharacter(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, outfitStyle: e.target.value as any }
                  }))}
                  className="w-full p-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 shadow-comic-sm focus:outline-none"
                >
                  <option value="casual">Casual Daily (Hoodie / Tee)</option>
                  <option value="suit">Professional Suit (Interview / Corporate)</option>
                  <option value="formal">Business Formal</option>
                  <option value="scrubs">Medical Scrubs / Doctor</option>
                  <option value="labcoat">Scientist Labcoat</option>
                  <option value="detective">Detective Trench Coat</option>
                  <option value="scifi">Sci-Fi Cyber Armor</option>
                  <option value="hero">Hero Tunic / Emblem</option>
                  <option value="chef">Culinary Chef Apron</option>
                </select>
              </div>

              {/* Skin Tone Palette */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Skin Tone
                </label>
                <div className="flex items-center gap-2">
                  {['#ffd1b3', '#f5c6a5', '#d19864', '#9b5a2f', '#683b19', '#bae6fd'].map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setActiveCharacter(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, skinTone: tone }
                      }))}
                      className={`w-7 h-7 rounded-full border-2 ${
                        activeCharacter.appearance.skinTone === tone ? 'border-slate-900 ring-2 ring-coral-500' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: tone }}
                    />
                  ))}
                </div>
              </div>

              {/* Character Backstory & Traits */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  AI Linguistic Personality
                </span>
                <p className="text-xs text-slate-700 leading-snug bg-paper-100 p-3 rounded-xl border border-slate-300">
                  {activeCharacter.backgroundStory}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {activeCharacter.abilities?.map((ab) => (
                    <span key={ab} className="bg-teal-50 text-teal-900 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                      ⚡ {ab}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: EXPLORE / CHARACTER LIBRARY */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 border-2 ${
                selectedCategory === 'All'
                  ? 'bg-teal-900 text-white border-slate-900 shadow-comic-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-800'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.cat}
                onClick={() => setSelectedCategory(cat.cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 border-2 flex items-center gap-1.5 ${
                  selectedCategory === cat.cat
                    ? 'bg-teal-900 text-white border-slate-900 shadow-comic-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Character Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCharacters.map((char) => (
              <div
                key={char.id}
                onClick={() => {
                  setActiveCharacter(char);
                  setActiveTab('studio');
                  playSoundEffect('click');
                }}
                className="bg-white border-3 border-slate-900 rounded-2xl p-4 shadow-comic hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between">
                  <span className="bg-paper-100 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-300">
                    {char.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">{char.ageGroup}</span>
                </div>

                <div className="my-3 flex justify-center py-2 bg-paper-100 rounded-xl border border-slate-200 group-hover:border-slate-900 transition-colors">
                  <CharacterAvatar
                    character={char}
                    size="md"
                    action="idle"
                    expression="happy"
                  />
                </div>

                <div>
                  <h4 className="font-extrabold text-base font-comic text-slate-900 group-hover:text-teal-900">
                    {char.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold truncate">
                    {char.role} • {char.profession}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-teal-800 font-extrabold group-hover:underline">
                    View & Animate →
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSoundEffect('triumph');
                      onUseInComic(char);
                    }}
                    className="p-1.5 bg-coral-500 hover:bg-coral-600 text-white rounded-lg border border-slate-900 shadow-comic-sm text-[10px] font-extrabold"
                  >
                    Use in Comic
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-CHARACTER SCENE TEST */}
      {activeTab === 'scene' && (
        <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-comic space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
            <div>
              <h3 className="text-xl font-extrabold font-comic text-slate-900">
                Multi-Character Dialogue Interaction
              </h3>
              <p className="text-xs text-slate-600">
                Verify that characters face each other, maintain distinct attire, and react naturally in a shared scene.
              </p>
            </div>
            <button
              onClick={() => {
                playSoundEffect('click');
                const shuffled = [...characters].sort(() => 0.5 - Math.random());
                setSceneChars([shuffled[0] || PRESET_CHARACTERS[0], shuffled[1] || PRESET_CHARACTERS[1]]);
              }}
              className="px-3 py-1.5 bg-paper-100 hover:bg-paper-200 border-2 border-slate-900 rounded-xl text-xs font-bold shadow-comic-sm"
            >
              Switch Scene Cast 🎭
            </button>
          </div>

          {/* Interactive Scene Stage */}
          <div className="bg-gradient-to-b from-sky-50 via-teal-50 to-slate-100 border-3 border-slate-900 rounded-2xl p-8 min-h-[380px] flex flex-col justify-between relative shadow-inner">
            {/* Top dialogue speech bubble */}
            <div className="flex justify-between items-start gap-4">
              <div className="speech-bubble speech-bubble-bottom max-w-sm">
                <span className="text-[10px] font-extrabold text-teal-900 uppercase block font-comic">
                  {sceneChars[0]?.name} (Speaking)
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  "Hello {sceneChars[1]?.name}! Are you ready for our collaborative English storytelling sprint?"
                </p>
              </div>

              <div className="speech-bubble speech-bubble-bottom max-w-sm">
                <span className="text-[10px] font-extrabold text-coral-600 uppercase block font-comic">
                  {sceneChars[1]?.name} (Listening & Reacting)
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  "Absolutely! Let's craft an unforgettable comic adventure!"
                </p>
              </div>
            </div>

            {/* Bottom characters facing each other */}
            <div className="flex items-end justify-around pt-8">
              <div className="text-center">
                <CharacterAvatar
                  character={sceneChars[0]}
                  size="xl"
                  action="talk"
                  expression="happy"
                  facing="right"
                />
                <span className="mt-1 font-extrabold text-xs text-slate-900 bg-white/90 px-3 py-1 rounded-full border border-slate-900 block shadow-comic-sm">
                  {sceneChars[0]?.name}
                </span>
              </div>

              <div className="text-center">
                <CharacterAvatar
                  character={sceneChars[1]}
                  size="xl"
                  action="wave"
                  expression="surprised"
                  facing="left"
                />
                <span className="mt-1 font-extrabold text-xs text-slate-900 bg-white/90 px-3 py-1 rounded-full border border-slate-900 block shadow-comic-sm">
                  {sceneChars[1]?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
