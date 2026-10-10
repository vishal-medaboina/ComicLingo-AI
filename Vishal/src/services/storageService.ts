import type { 
  UserProfile, 
  ComicStory, 
  VocabularyWord, 
  Character, 
  Achievement 
} from '../types/comiclingo';
import { PRESET_CHARACTERS } from './characterAiService';

const STORAGE_KEYS = {
  USER: 'comiclingo_user_v1',
  COMICS: 'comiclingo_comics_v1',
  VOCAB: 'comiclingo_vocab_v1',
  CHARACTERS: 'comiclingo_characters_v1',
  ACHIEVEMENTS: 'comiclingo_achievements_v1',
  SESSION: 'comiclingo_session_v1',
};

// Initial default user profile
export const DEFAULT_USER: UserProfile = {
  id: 'user-demo-01',
  name: 'Alex Mercer',
  email: 'alex.mercer@comiclingo.ai',
  avatarId: 'char-alex-interviewee',
  ageGroup: '15+',
  englishLevel: 'Intermediate',
  goals: ['Speaking', 'Interview English', 'Vocabulary'],
  interests: ['Technology', 'Business', 'Travel'],
  comicStyle: 'Graphic Novel',
  situation: 'Job Interview',
  learningSettings: {
    storyLength: 'Medium (3 pages)',
    difficulty: 'Medium',
    learningFocus: 'Speaking & Practical Fluency',
    vocabularyAmount: 4,
    quizDifficulty: 'Standard',
  },
  xp: 450,
  level: 4,
  streak: 5,
  lessonsCompleted: 3,
  savedWordsCount: 6,
  badges: ['First Comic', 'Vocabulary Explorer', 'Interview Ready'],
};

// Initial Achievements
export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-comic',
    title: 'First Comic',
    description: 'Read and complete your first animated comic story.',
    icon: '📖',
    unlocked: true,
    unlockedAt: '2 days ago',
    progress: 1,
    maxProgress: 1,
    category: 'comic',
  },
  {
    id: 'ach-streak-7',
    title: '7-Day Learner',
    description: 'Maintain a 7-day continuous comic reading streak.',
    icon: '🔥',
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    category: 'streak',
  },
  {
    id: 'ach-vocab-exp',
    title: 'Vocabulary Explorer',
    description: 'Save 5 interactive words into your Vocabulary Bank.',
    icon: '💡',
    unlocked: true,
    unlockedAt: 'Yesterday',
    progress: 5,
    maxProgress: 5,
    category: 'vocab',
  },
  {
    id: 'ach-conv-star',
    title: 'Conversation Starter',
    description: 'Complete 3 speaking & dialogue practice exercises.',
    icon: '💬',
    unlocked: true,
    unlockedAt: 'Today',
    progress: 3,
    maxProgress: 3,
    category: 'comic',
  },
  {
    id: 'ach-interview-ready',
    title: 'Interview Ready',
    description: 'Pass the AI Job Interview Evaluation with >80% score.',
    icon: '🎯',
    unlocked: true,
    unlockedAt: 'Today',
    progress: 1,
    maxProgress: 1,
    category: 'quiz',
  },
  {
    id: 'ach-10-comics',
    title: 'Comic Master',
    description: 'Complete 10 distinct AI-generated comic stories.',
    icon: '👑',
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    category: 'comic',
  },
];

export class StorageService {
  static getUser(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USER;
  }

  static saveUser(user: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static addXP(amount: number): { newXP: number; newLevel: number; leveledUp: boolean } {
    const user = this.getUser();
    const oldLevel = user.level;
    user.xp += amount;
    user.level = Math.floor(user.xp / 150) + 1;
    this.saveUser(user);
    return {
      newXP: user.xp,
      newLevel: user.level,
      leveledUp: user.level > oldLevel,
    };
  }

  static getComics(): ComicStory[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMICS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return [];
  }

  static saveComic(comic: ComicStory): void {
    const list = this.getComics();
    const existingIndex = list.findIndex(c => c.id === comic.id);
    if (existingIndex >= 0) {
      list[existingIndex] = comic;
    } else {
      list.unshift(comic);
    }
    localStorage.setItem(STORAGE_KEYS.COMICS, JSON.stringify(list));
  }

  static deleteComic(id: string): void {
    const list = this.getComics().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COMICS, JSON.stringify(list));
  }

  static toggleFavoriteComic(id: string): void {
    const list = this.getComics();
    const found = list.find(c => c.id === id);
    if (found) {
      found.isFavorite = !found.isFavorite;
      localStorage.setItem(STORAGE_KEYS.COMICS, JSON.stringify(list));
    }
  }

  static getVocabulary(): VocabularyWord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOCAB);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    // Seed initial vocabulary
    return [
      {
        id: 'seed-v1',
        word: 'Articulate',
        phonetic: '/ɑːrˈtɪk.jə.leɪt/',
        partOfSpeech: 'verb',
        meaning: 'To express an idea or feeling fluently and coherently.',
        contextMeaning: 'Articulating complex technical ideas in an interview.',
        example: 'She was able to articulate the software architecture with precision.',
        difficulty: 'Intermediate',
        sourceComicTitle: 'The Ace Interview',
        sourceComicId: 'c1',
        isSaved: true,
        isLearned: true,
      },
      {
        id: 'seed-v2',
        word: 'Pragmatic',
        phonetic: '/præɡˈmæt.ɪk/',
        partOfSpeech: 'adjective',
        meaning: 'Dealing with things sensibly and realistically.',
        contextMeaning: 'Making practical software design trade-offs.',
        example: 'He gave a pragmatic response that impressed the director.',
        difficulty: 'Intermediate',
        sourceComicTitle: 'The Ace Interview',
        sourceComicId: 'c1',
        isSaved: true,
        isLearned: false,
      },
      {
        id: 'seed-v3',
        word: 'Breakthrough',
        phonetic: '/ˈbreɪk.θruː/',
        partOfSpeech: 'noun',
        meaning: 'A sudden, dramatic, and important discovery or development.',
        contextMeaning: 'Overcoming a stubborn engineering challenge.',
        example: 'The team celebrated a major breakthrough during code review.',
        difficulty: 'Intermediate',
        sourceComicTitle: 'The Ace Interview',
        sourceComicId: 'c1',
        isSaved: true,
        isLearned: false,
      }
    ];
  }

  static saveVocabularyWord(word: VocabularyWord): void {
    const list = this.getVocabulary();
    const existing = list.findIndex(w => w.word.toLowerCase() === word.word.toLowerCase());
    if (existing >= 0) {
      list[existing] = { ...list[existing], ...word, isSaved: true };
    } else {
      list.unshift({ ...word, isSaved: true });
    }
    localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(list));

    const user = this.getUser();
    user.savedWordsCount = list.filter(w => w.isSaved).length;
    this.saveUser(user);
  }

  static toggleWordLearned(id: string): void {
    const list = this.getVocabulary();
    const word = list.find(w => w.id === id);
    if (word) {
      word.isLearned = !word.isLearned;
      localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(list));
    }
  }

  static removeWordFromSaved(id: string): void {
    const list = this.getVocabulary().filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(list));
    const user = this.getUser();
    user.savedWordsCount = list.length;
    this.saveUser(user);
  }

  static getCharacters(): Character[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHARACTERS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return PRESET_CHARACTERS;
  }

  static saveCharacter(character: Character): void {
    const list = this.getCharacters();
    const existingIndex = list.findIndex(c => c.id === character.id);
    if (existingIndex >= 0) {
      list[existingIndex] = character;
    } else {
      list.unshift(character);
    }
    localStorage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(list));
  }

  static deleteCharacter(id: string): void {
    const list = this.getCharacters().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(list));
  }

  static getAchievements(): Achievement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ACHIEVEMENTS;
  }

  static unlockAchievement(id: string): void {
    const list = this.getAchievements();
    const item = list.find(a => a.id === id);
    if (item && !item.unlocked) {
      item.unlocked = true;
      item.unlockedAt = 'Just now';
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
    }
  }

  static isSessionActive(): boolean {
    return localStorage.getItem(STORAGE_KEYS.SESSION) === 'true';
  }

  static setSessionActive(active: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SESSION, active ? 'true' : 'false');
  }
}
