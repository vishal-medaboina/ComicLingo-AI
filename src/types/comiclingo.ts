export type AgeGroup = '5-10' | '10-15' | '15+';

export type EnglishLevel = 
  | 'Beginner' 
  | 'Elementary' 
  | 'Intermediate' 
  | 'Upper-Intermediate' 
  | 'Advanced';

export type ComicStyle =
  | 'Classic Comic'
  | 'Anime-Inspired'
  | 'Cartoon'
  | 'Comedy'
  | 'Storybook'
  | 'Graphic Novel'
  | 'Cinematic'
  | 'Realistic'
  | 'Custom Style';

export type Situation =
  | 'Daily Life'
  | 'Friends & Social'
  | 'School & College'
  | 'Travel'
  | 'Shopping'
  | 'Workplace'
  | 'Job Interview'
  | 'Food & Restaurant'
  | 'Healthcare'
  | 'Technology'
  | 'Public Places'
  | 'Hotel'
  | 'Airport'
  | 'Phone Conversation'
  | 'Emergency / Practical Situations'
  | 'Custom Situation';

export type CharacterCategory =
  | 'Heroes'
  | 'Heroines'
  | 'Villains'
  | 'Fantasy'
  | 'Sci-Fi'
  | 'Robots'
  | 'Animals'
  | 'Students'
  | 'Teachers'
  | 'Doctors'
  | 'Scientists'
  | 'Engineers'
  | 'Detectives'
  | 'Royal Characters'
  | 'Warriors'
  | 'Business Characters'
  | 'Kids'
  | 'Teenagers'
  | 'Adults'
  | 'Seniors'
  | 'Comedy Characters'
  | 'Mystery Characters'
  | 'School Characters'
  | 'Travel Characters';

export type ExpressionType =
  | 'default'
  | 'happy'
  | 'sad'
  | 'angry'
  | 'surprised'
  | 'shocked'
  | 'confused'
  | 'curious'
  | 'scared'
  | 'worried'
  | 'embarrassed'
  | 'proud'
  | 'disappointed'
  | 'nervous'
  | 'relaxed'
  | 'thinking'
  | 'bored'
  | 'laughing'
  | 'crying'
  | 'frustrated'
  | 'determined'
  | 'talking'
  | 'waving'
  | 'pointing';

export type ActionType =
  | 'idle'
  | 'walk'
  | 'talk'
  | 'wave'
  | 'point'
  | 'nod'
  | 'shake-head'
  | 'think'
  | 'laugh'
  | 'celebrate'
  | 'explain'
  | 'react'
  | 'look-around';

export type EntranceAnimation =
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'fade-in'
  | 'pop-in'
  | 'zoom-in'
  | 'bounce-in'
  | 'walk-in';

export interface CharacterAppearance {
  skinTone: string;       // hex or token
  hairStyle: 'short' | 'curly' | 'long' | 'bob' | 'spiky' | 'buzz' | 'ponytail' | 'bald' | 'afro' | 'wavy' | 'anime';
  hairColor: string;      // hex
  outfitStyle: 'casual' | 'formal' | 'suit' | 'labcoat' | 'scrubs' | 'uniform' | 'detective' | 'hoodie' | 'scifi' | 'hero' | 'chef';
  outfitColor: string;    // primary hex
  accentColor: string;    // secondary hex
  accessories: ('glasses' | 'sunglasses' | 'headphone' | 'stethoscope' | 'badge' | 'tie' | 'hat' | 'antenna' | 'cape')[];
  eyeColor: string;
  facialHair?: 'none' | 'beard' | 'mustache' | 'goatee';
}

export interface Character {
  id: string;
  name: string;
  age: number | string;
  ageGroup: AgeGroup;
  gender: 'female' | 'male' | 'non-binary' | 'robot' | 'creature';
  role: string;
  profession: string;
  category: CharacterCategory;
  personality: string;
  appearance: CharacterAppearance;
  speakingStyle: string;
  backgroundStory: string;
  abilities?: string[];
  likes?: string[];
  dislikes?: string[];
  currentExpression?: ExpressionType;
  currentAction?: ActionType;
  currentAnimation?: EntranceAnimation;
  isCustom?: boolean;
  isFavorite?: boolean;
  isProtectedSubstitute?: boolean;
  protectedOriginalQuery?: string;
  createdAt: string;
}

export interface DialogueEvent {
  id: string;
  characterId: string;
  characterName: string;
  text: string;
  bubbleType: 'speech' | 'thought' | 'shout' | 'whisper';
  position: { x: number; y: number }; // percentage 0-100
  emotion: string;
  expression: ExpressionType;
  gesture: ActionType;
  animation: EntranceAnimation;
  duration: number; // ms
  reactionTargetId?: string;
  reactionExpression?: ExpressionType;
  highlightedVocab?: string[];
  audioNarrationUrl?: string;
}

export interface ActingCharacter {
  characterId: string;
  position: 'left' | 'center' | 'right' | 'far-left' | 'far-right';
  facing: 'right' | 'left';
  scale?: number;
  initialExpression: ExpressionType;
  initialAction: ActionType;
}

export interface ComicPanel {
  id: string;
  panelNumber: number;
  layoutSpan: 'full' | 'half' | 'third' | 'hero';
  caption?: string;
  setting: string;
  backgroundTheme: 'office' | 'airport' | 'cafe' | 'lab' | 'park' | 'classroom' | 'street' | 'hotel' | 'hospital' | 'tech-hub' | 'space';
  soundEffect?: { text: string; color: string; rotation: number };
  dialogues: DialogueEvent[];
  actingCharacters: ActingCharacter[];
}

export interface ComicPage {
  pageNumber: number;
  pageTitle: string;
  layout: '2-panel' | '3-panel' | '4-panel' | '5-panel' | '6-panel';
  panels: ComicPanel[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  contextMeaning: string;
  example: string;
  difficulty: EnglishLevel;
  sourceComicTitle: string;
  sourceComicId: string;
  isSaved: boolean;
  isLearned: boolean;
}

export interface PracticeQuestion {
  id: string;
  type: 'complete-dialogue' | 'best-response' | 'fill-blank' | 'match-meaning';
  prompt: string;
  scenario: string;
  speaker: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  vocabTarget: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'scenario' | 'grammar';
  question: string;
  context?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface AIEvaluationResult {
  userAnswer: string;
  promptQuestion: string;
  overallScore: number; // 0 - 100
  criteria: {
    meaning: { score: number; feedback: string };
    grammar: { score: number; feedback: string };
    vocabulary: { score: number; feedback: string };
    naturalness: { score: number; feedback: string };
  };
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
}

export interface LessonRecommendation {
  nextTitle: string;
  nextSituation: Situation;
  nextGoal: string;
  nextStyle: ComicStyle;
  reason: string;
  estimatedMinutes: number;
  previewSnippet: string;
}

export interface ComicStory {
  id: string;
  title: string;
  subtitle: string;
  coverImage?: string;
  situation: Situation;
  comicStyle: ComicStyle;
  ageGroup: AgeGroup;
  englishLevel: EnglishLevel;
  goal: string;
  interest: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  storyLength: 'Short (2 pages)' | 'Medium (3 pages)' | 'Long (4 pages)';
  summary: string;
  learningFocus: string[];
  characters: Character[];
  pages: ComicPage[];
  vocabulary: VocabularyWord[];
  practice: PracticeQuestion[];
  quiz: QuizQuestion[];
  evaluationScenario: {
    prompt: string;
    context: string;
    characterPrompt: string;
    expectedConcepts: string[];
  };
  recommendedNext: LessonRecommendation;
  createdAt: string;
  isFavorite?: boolean;
  progressPercent?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarId: string;
  ageGroup: AgeGroup;
  englishLevel: EnglishLevel;
  goals: string[];
  interests: string[];
  comicStyle: ComicStyle;
  situation: Situation;
  learningSettings: {
    storyLength: 'Short (2 pages)' | 'Medium (3 pages)' | 'Long (4 pages)';
    difficulty: 'Easy' | 'Medium' | 'Challenging';
    learningFocus: string;
    vocabularyAmount: number;
    quizDifficulty: 'Standard' | 'Challenging';
  };
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  savedWordsCount: number;
  badges: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'comic' | 'vocab' | 'streak' | 'quiz';
}

export type AppView =
  | 'auth'
  | 'dashboard'
  | 'personalization'
  | 'genai-processing'
  | 'comic-reader'
  | 'practice'
  | 'quiz'
  | 'ai-evaluation'
  | 'results'
  | 'progress'
  | 'my-comics'
  | 'vocab-bank'
  | 'character-studio'
  | 'achievements'
  | 'profile-settings'
  | 'landing-page';

export const COMICLINGO_VERSION = '1.0.0';
