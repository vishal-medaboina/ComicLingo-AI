import React, { useState, useEffect } from 'react';
import type { 
  AppView, 
  UserProfile, 
  ComicStory, 
  Character, 
  VocabularyWord, 
  Achievement,
  AIEvaluationResult 
} from './types/comiclingo';
import { StorageService, DEFAULT_USER } from './services/storageService';
import { generateComicStory } from './services/aiService';
import type { GenerationParams } from './services/aiService';
import { Navbar } from './components/layout/Navbar';
import { AuthModal } from './components/auth/AuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { CreateComicModal } from './components/creation/CreateComicModal';
import { GenAILoading } from './components/creation/GenAILoading';
import { ComicReader } from './components/reader/ComicReader';
import { PracticeView } from './components/practice/PracticeView';
import { QuizView } from './components/quiz/QuizView';
import { AIEvaluationView } from './components/quiz/AIEvaluationView';
import { ResultsView } from './components/results/ResultsView';
import { CharacterStudio } from './components/character/CharacterStudio';
import { MyComicsView } from './components/pages/MyComicsView';
import { VocabBankView } from './components/pages/VocabBankView';
import { ProgressView } from './components/pages/ProgressView';
import { AchievementsView } from './components/pages/AchievementsView';
import { ProfileSettingsView } from './components/pages/ProfileSettingsView';
import { LandingPage } from './components/pages/LandingPage';
import { playSoundEffect } from './utils/audio';

export const App: React.FC = () => {
  // App Core State
  const [user, setUser] = useState<UserProfile>(StorageService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(StorageService.isSessionActive());
  const [currentView, setCurrentView] = useState<AppView>(StorageService.isSessionActive() ? 'dashboard' : 'auth');

  // Active Story & Flow State
  const [activeStory, setActiveStory] = useState<ComicStory | null>(null);
  const [comics, setComics] = useState<ComicStory[]>(StorageService.getComics());
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>(StorageService.getVocabulary());
  const [characters, setCharacters] = useState<Character[]>(StorageService.getCharacters());
  const [achievements, setAchievements] = useState<Achievement[]>(StorageService.getAchievements());

  // Generation Loading State
  const [generationStage, setGenerationStage] = useState<string>('Initializing AI engine...');
  const [generationPercent, setGenerationPercent] = useState<number>(10);

  // Flow Scores
  const [practiceScore, setPracticeScore] = useState<number>(100);
  const [quizScore, setQuizScore] = useState<number>(100);
  const [aiEvaluation, setAiEvaluation] = useState<AIEvaluationResult | null>(null);
  const [lastXpEarned, setLastXpEarned] = useState<number>(120);

  // Sync initial story if available
  useEffect(() => {
    if (comics.length > 0 && !activeStory) {
      setActiveStory(comics[0]);
    }
  }, [comics]);

  // Auth Handlers
  const handleAuthSuccess = (authedUser: UserProfile) => {
    setUser(authedUser);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    playSoundEffect('click');
    StorageService.setSessionActive(false);
    setIsAuthenticated(false);
    setCurrentView('auth');
  };

  // Generation Handlers
  const handleStartPersonalization = () => {
    setCurrentView('personalization');
  };

  const handleSubmitPersonalization = async (params: GenerationParams) => {
    setCurrentView('genai-processing');
    setGenerationStage('Understanding your learning profile...');
    setGenerationPercent(15);

    try {
      const generatedComic = await generateComicStory(params, (stage, pct) => {
        setGenerationStage(stage);
        setGenerationPercent(pct);
      });

      // Save to local storage
      StorageService.saveComic(generatedComic);
      setComics(StorageService.getComics());
      setActiveStory(generatedComic);

      // Save vocabulary words from story into vocab bank
      generatedComic.vocabulary.forEach(w => {
        StorageService.saveVocabularyWord(w);
      });
      setVocabulary(StorageService.getVocabulary());

      // Transition immediately to the Comic Reader
      playSoundEffect('triumph');
      setCurrentView('comic-reader');
    } catch (err) {
      console.error('Generation error:', err);
      setCurrentView('dashboard');
    }
  };

  // Compulsory Evaluator Learning Flow Steps
  const handleFinishReading = () => {
    setCurrentView('practice');
  };

  const handleCompletePractice = (score: number) => {
    setPracticeScore(score);
    setCurrentView('quiz');
  };

  const handleCompleteQuiz = (score: number) => {
    setQuizScore(score);
    setCurrentView('ai-evaluation');
  };

  const handleFinishEvaluation = (evalRes: AIEvaluationResult) => {
    setAiEvaluation(evalRes);

    // Calculate XP reward
    const earned = 120 + Math.round((evalRes.overallScore / 100) * 40);
    setLastXpEarned(earned);
    const xpResult = StorageService.addXP(earned);
    
    // Increment lessons completed
    const updatedUser = StorageService.getUser();
    updatedUser.lessonsCompleted = (updatedUser.lessonsCompleted || 0) + 1;
    StorageService.saveUser(updatedUser);
    setUser(updatedUser);

    // Unlock achievements
    StorageService.unlockAchievement('ach-first-comic');
    if (evalRes.overallScore >= 80) {
      StorageService.unlockAchievement('ach-interview-ready');
    }
    setAchievements(StorageService.getAchievements());

    setCurrentView('results');
  };

  const handleStartNextRecommended = () => {
    // Jump straight into the next recommended personalization preset
    setCurrentView('personalization');
  };

  // Character Studio Handlers
  const handleSaveCharacter = (char: Character) => {
    StorageService.saveCharacter(char);
    setCharacters(StorageService.getCharacters());
  };

  const handleDeleteCharacter = (id: string) => {
    StorageService.deleteCharacter(id);
    setCharacters(StorageService.getCharacters());
  };

  const handleUseCharacterInComic = (char: Character) => {
    // Launch comic creation with this character preselected
    setCurrentView('personalization');
  };

  // Vocabulary Handlers
  const handleSaveVocabWord = (word: VocabularyWord) => {
    StorageService.saveVocabularyWord(word);
    setVocabulary(StorageService.getVocabulary());
    const updated = StorageService.getUser();
    setUser(updated);
  };

  const handleToggleVocabLearned = (id: string) => {
    StorageService.toggleWordLearned(id);
    setVocabulary(StorageService.getVocabulary());
  };

  const handleRemoveVocab = (id: string) => {
    StorageService.removeWordFromSaved(id);
    setVocabulary(StorageService.getVocabulary());
    const updated = StorageService.getUser();
    setUser(updated);
  };

  // Comics Handlers
  const handleOpenComic = (comic: ComicStory) => {
    setActiveStory(comic);
    setCurrentView('comic-reader');
  };

  const handleDeleteComic = (id: string) => {
    StorageService.deleteComic(id);
    setComics(StorageService.getComics());
  };

  const handleToggleFavoriteComic = (id: string) => {
    StorageService.toggleFavoriteComic(id);
    setComics(StorageService.getComics());
  };

  // Render main screen according to currentView
  return (
    <div className="min-h-screen flex flex-col bg-paper-100 text-slate-800 font-sans selection:bg-coral-500 selection:text-white">
      
      {/* Global Navigation Header (Shown when authenticated or on landing page) */}
      {isAuthenticated && currentView !== 'auth' && (
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {/* 1. AUTHENTICATION */}
        {(!isAuthenticated || currentView === 'auth') && (
          <AuthModal onSuccess={handleAuthSuccess} />
        )}

        {/* 2. MAIN COMICLINGO DASHBOARD */}
        {isAuthenticated && currentView === 'dashboard' && (
          <Dashboard
            user={user}
            recentComics={comics}
            onStartPersonalization={handleStartPersonalization}
            onOpenComic={handleOpenComic}
            setCurrentView={setCurrentView}
          />
        )}

        {/* 3. USER INPUT / PERSONALIZATION */}
        {isAuthenticated && currentView === 'personalization' && (
          <CreateComicModal
            user={user}
            savedCharacters={characters}
            onSubmit={handleSubmitPersonalization}
            onCancel={() => setCurrentView('dashboard')}
          />
        )}

        {/* 4. GENAI PROCESSING / LOADING */}
        {isAuthenticated && currentView === 'genai-processing' && (
          <GenAILoading
            currentStage={generationStage}
            progressPercent={generationPercent}
          />
        )}

        {/* 5. ACTUAL COMIC READER */}
        {isAuthenticated && currentView === 'comic-reader' && activeStory && (
          <ComicReader
            story={activeStory}
            onFinishReading={handleFinishReading}
            onSaveVocab={handleSaveVocabWord}
            onToggleLearned={handleToggleVocabLearned}
          />
        )}

        {/* 6. INTERACTIVE STORY-BASED PRACTICE */}
        {isAuthenticated && currentView === 'practice' && activeStory && (
          <PracticeView
            story={activeStory}
            onCompletePractice={handleCompletePractice}
          />
        )}

        {/* 7. STORY COMPREHENSION QUIZ */}
        {isAuthenticated && currentView === 'quiz' && activeStory && (
          <QuizView
            story={activeStory}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {/* 8. AI ANSWER EVALUATION */}
        {isAuthenticated && currentView === 'ai-evaluation' && activeStory && (
          <AIEvaluationView
            story={activeStory}
            onFinishEvaluation={handleFinishEvaluation}
          />
        )}

        {/* 9. FINAL RESULTS & GAMIFICATION */}
        {isAuthenticated && currentView === 'results' && activeStory && (
          <ResultsView
            story={activeStory}
            practiceScore={practiceScore}
            quizScore={quizScore}
            aiEvaluation={aiEvaluation}
            xpEarned={lastXpEarned}
            user={user}
            onReviewComic={() => setCurrentView('comic-reader')}
            onContinueToDashboard={() => setCurrentView('dashboard')}
            onStartNextLesson={handleStartNextRecommended}
            setCurrentView={setCurrentView}
          />
        )}

        {/* 10. AI CHARACTER STUDIO & LIBRARY */}
        {isAuthenticated && currentView === 'character-studio' && (
          <CharacterStudio
            characters={characters}
            onSaveCharacter={handleSaveCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onUseInComic={handleUseCharacterInComic}
          />
        )}

        {/* 11. MY COMICS COLLECTION */}
        {isAuthenticated && currentView === 'my-comics' && (
          <MyComicsView
            comics={comics}
            onOpenComic={handleOpenComic}
            onDeleteComic={handleDeleteComic}
            onToggleFavorite={handleToggleFavoriteComic}
            onCreateNew={handleStartPersonalization}
          />
        )}

        {/* 12. VOCABULARY BANK */}
        {isAuthenticated && currentView === 'vocab-bank' && (
          <VocabBankView
            vocabulary={vocabulary}
            onToggleLearned={handleToggleVocabLearned}
            onRemoveWord={handleRemoveVocab}
          />
        )}

        {/* 13. PROGRESS DASHBOARD */}
        {isAuthenticated && currentView === 'progress' && (
          <ProgressView user={user} />
        )}

        {/* 14. ACHIEVEMENTS */}
        {isAuthenticated && currentView === 'achievements' && (
          <AchievementsView achievements={achievements} />
        )}

        {/* 15. PROFILE & SETTINGS */}
        {isAuthenticated && currentView === 'profile-settings' && (
          <ProfileSettingsView
            user={user}
            onUpdateUser={(updated) => {
              StorageService.saveUser(updated);
              setUser(updated);
            }}
            onLogout={handleLogout}
          />
        )}

        {/* 16. COMMERCIAL LANDING PAGE */}
        {currentView === 'landing-page' && (
          <LandingPage
            onStartLearning={() => {
              if (isAuthenticated) setCurrentView('personalization');
              else setCurrentView('auth');
            }}
            onSignIn={() => setCurrentView('auth')}
          />
        )}
      </main>

      {/* ComicLingo Footer */}
      <footer className="bg-teal-950 text-teal-200 border-t-3 border-slate-900 py-8 px-4 text-center text-xs font-semibold space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-coral-500 border border-slate-900 flex items-center justify-center text-white font-bangers text-sm">
            CL
          </div>
          <span className="font-comic font-extrabold text-white text-sm">ComicLingo AI</span>
          <span className="text-teal-400">• Learn English. Live the Story.</span>
        </div>
        <p className="text-teal-400/80">
          Generative AI Language Learning Platform • Character Studio • Multi-panel Comic Engine
        </p>
      </footer>

    </div>
  );
};

export default App;
