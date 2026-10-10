import type { 
  ComicStory, 
  AgeGroup, 
  EnglishLevel, 
  ComicStyle, 
  Situation, 
  Character,
  VocabularyWord,
  PracticeQuestion,
  QuizQuestion,
  AIEvaluationResult,
  LessonRecommendation
} from '../types/comiclingo';
import { 
  getRecommendedCharactersForSituation, 
  inferEmotionAndGesture, 
  PRESET_CHARACTERS 
} from './characterAiService';

export interface GenerationParams {
  ageGroup: AgeGroup;
  englishLevel: EnglishLevel;
  goals: string[];
  interests: string[];
  comicStyle: ComicStyle;
  situation: Situation;
  storyLength?: 'Short (2 pages)' | 'Medium (3 pages)' | 'Long (4 pages)';
  difficulty?: 'Easy' | 'Medium' | 'Challenging';
  selectedCharacters?: Character[];
  customPrompt?: string;
}

// Generate complete AI comic story
export async function generateComicStory(
  params: GenerationParams,
  onProgress?: (stage: string, percent: number) => void
): Promise<ComicStory> {
  const steps = [
    { stage: 'Understanding your learning profile & language goals...', percent: 12 },
    { stage: 'Crafting the narrative setting and conflict resolution...', percent: 28 },
    { stage: 'Casting and styling original characters for consistency...', percent: 45 },
    { stage: 'Adapting English dialogue and educational vocabulary level...', percent: 60 },
    { stage: 'Rendering multi-panel comic pages and speech bubbles...', percent: 75 },
    { stage: 'Generating interactive practice and comprehension quiz...', percent: 88 },
    { stage: 'Polishing context-aware character animations and emotions...', percent: 98 },
  ];

  for (const step of steps) {
    if (onProgress) {
      onProgress(step.stage, step.percent);
    }
    // Simulate realistic AI generation pacing
    await new Promise((r) => setTimeout(r, 450));
  }

  // Determine characters
  let characters = params.selectedCharacters && params.selectedCharacters.length >= 2 
    ? params.selectedCharacters 
    : getRecommendedCharactersForSituation(params.situation, params.ageGroup);

  if (characters.length < 2) {
    characters = [PRESET_CHARACTERS[0], PRESET_CHARACTERS[1]];
  }

  const charA = characters[0];
  const charB = characters[1];

  // Tailored story titles and dialogues based on Situation & Age
  let storyTitle = 'The Breakthrough Opportunity';
  let storySubtitle = 'Mastering Confidence and Fluency in High-Stakes Conversation';
  let summary = 'Alex enters an international technology interview and learns how to articulate complex engineering concepts using clear, professional English idioms.';
  
  if (params.situation === 'Job Interview') {
    storyTitle = 'The Ace Interview: Pitching with Confidence';
    storySubtitle = 'Mastering behavioral questions, technical clarity, and proactive follow-ups';
    summary = `${charA.name} meets ${charB.name} for an international role. Through active listening and structured explanations, ${charA.name} turns a challenging technical question into a showcase of competence.`;
  } else if (params.situation === 'Airport' || params.situation === 'Travel') {
    storyTitle = 'Flight 402 to London: The Gate Transfer';
    storySubtitle = 'Navigating terminals, inquiries, and friendly conversations on the go';
    summary = `A quick change of boarding gates leads to an unexpected travel friendship and a lesson in polite travel idioms.`;
  } else if (params.situation === 'Food & Restaurant') {
    storyTitle = 'The Secret Recipe at Trattoria Luna';
    storySubtitle = 'Culinary vocabulary, ordering preferences, and gracious compliments';
    summary = `Ordering the special of the day turns into an unforgettable cultural and gastronomic exchange.`;
  } else if (params.situation === 'Healthcare') {
    storyTitle = 'Consultation Room 4: The Symptom Checklist';
    storySubtitle = 'Describing discomfort, understanding medical guidance, and asking for clarification';
    summary = `A patient consults the physician to explain their recent symptoms and learns to ask polite clarifying questions.`;
  } else if (params.ageGroup === '5-10') {
    storyTitle = 'Liam & Bolt’s Cosmic Safari';
    storySubtitle = 'Discovering animal habitats and English adjectives on the Starship Zephyr';
    summary = `Liam and his friendly robot companion Bolt explore an enchanted space sanctuary while practicing action words and colorful adjectives!`;
  }

  // Pre-craft rich vocabulary words tailored to English Level
  const vocabList: VocabularyWord[] = [
    {
      id: 'vocab-1',
      word: 'Articulate',
      phonetic: '/ɑːrˈtɪk.jə.leɪt/',
      partOfSpeech: 'verb / adjective',
      meaning: 'To express an idea or feeling fluently and coherently.',
      contextMeaning: 'In an interview, articulating your reasoning means speaking clearly so the listener easily understands.',
      example: 'She was able to articulate the complex software architecture within two minutes.',
      difficulty: params.englishLevel,
      sourceComicTitle: storyTitle,
      sourceComicId: 'comic-story-gen',
      isSaved: true,
      isLearned: false,
    },
    {
      id: 'vocab-2',
      word: 'Pragmatic',
      phonetic: '/præɡˈmæt.ɪk/',
      partOfSpeech: 'adjective',
      meaning: 'Dealing with things sensibly and realistically based on practical considerations.',
      contextMeaning: 'Making sensible engineering trade-offs rather than chasing purely theoretical ideals.',
      example: 'The team took a pragmatic approach to meet the product launch deadline.',
      difficulty: params.englishLevel,
      sourceComicTitle: storyTitle,
      sourceComicId: 'comic-story-gen',
      isSaved: false,
      isLearned: false,
    },
    {
      id: 'vocab-3',
      word: 'Collaborative',
      phonetic: '/kəˈlæb.ə.rə.tɪv/',
      partOfSpeech: 'adjective',
      meaning: 'Produced or conducted by two or more parties working together.',
      contextMeaning: 'Working productively across multiple international timezones.',
      example: 'We built a collaborative culture where peer code reviews are friendly and constructive.',
      difficulty: params.englishLevel,
      sourceComicTitle: storyTitle,
      sourceComicId: 'comic-story-gen',
      isSaved: false,
      isLearned: true,
    },
    {
      id: 'vocab-4',
      word: 'Breakthrough',
      phonetic: '/ˈbreɪk.θruː/',
      partOfSpeech: 'noun',
      meaning: 'A sudden, dramatic, and important discovery or development.',
      contextMeaning: 'Solving a persistent algorithmic bottleneck that had delayed the project.',
      example: 'After three days of debugging, the team celebrated a massive breakthrough.',
      difficulty: params.englishLevel,
      sourceComicTitle: storyTitle,
      sourceComicId: 'comic-story-gen',
      isSaved: true,
      isLearned: false,
    }
  ];

  // Generate Pages & Panels
  const page1Panels = [
    {
      id: 'p1-panel-1',
      panelNumber: 1,
      layoutSpan: 'hero' as const,
      caption: `PAGE 1 • SCENE 1: THE INVITATION`,
      setting: 'Modern Innovation Center — Floor 14',
      backgroundTheme: 'office' as const,
      soundEffect: { text: 'DING!', color: '#ffb703', rotation: -6 },
      actingCharacters: [
        {
          characterId: charA.id,
          position: 'left' as const,
          facing: 'right' as const,
          initialExpression: 'thinking' as const,
          initialAction: 'think' as const,
        },
        {
          characterId: charB.id,
          position: 'right' as const,
          facing: 'left' as const,
          initialExpression: 'happy' as const,
          initialAction: 'wave' as const,
        }
      ],
      dialogues: [
        {
          id: 'dlg-1',
          characterId: charB.id,
          characterName: charB.name,
          text: `Good morning, ${charA.name}! Thanks for joining us today. Please take a seat. How was your journey over?`,
          bubbleType: 'speech' as const,
          position: { x: 55, y: 15 },
          emotion: 'Warm & Welcoming',
          expression: 'happy' as const,
          gesture: 'wave' as const,
          animation: 'slide-right' as const,
          duration: 3500,
          reactionTargetId: charA.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: [],
        },
        {
          id: 'dlg-2',
          characterId: charA.id,
          characterName: charA.name,
          text: `Good morning, ${charB.name}! The commute was seamless, thank you. I'm truly excited to discuss this role!`,
          bubbleType: 'speech' as const,
          position: { x: 15, y: 35 },
          emotion: 'Enthusiastic & Polite',
          expression: 'happy' as const,
          gesture: 'talk' as const,
          animation: 'pop-in' as const,
          duration: 3200,
          reactionTargetId: charB.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: ['seamless'],
        }
      ]
    },
    {
      id: 'p1-panel-2',
      panelNumber: 2,
      layoutSpan: 'half' as const,
      caption: `DEEP DIVE: THE ARCHITECTURE QUESTION`,
      setting: 'Conference Boardroom with Smart Whiteboard',
      backgroundTheme: 'office' as const,
      actingCharacters: [
        {
          characterId: charB.id,
          position: 'right' as const,
          facing: 'left' as const,
          initialExpression: 'curious' as const,
          initialAction: 'point' as const,
        },
        {
          characterId: charA.id,
          position: 'left' as const,
          facing: 'right' as const,
          initialExpression: 'thinking' as const,
          initialAction: 'think' as const,
        }
      ],
      dialogues: [
        {
          id: 'dlg-3',
          characterId: charB.id,
          characterName: charB.name,
          text: `Could you articulate how you balance speed with code quality when deadlines get tight?`,
          bubbleType: 'speech' as const,
          position: { x: 50, y: 20 },
          emotion: 'Inquisitive & Professional',
          expression: 'thinking' as const,
          gesture: 'point' as const,
          animation: 'slide-left' as const,
          duration: 3000,
          reactionTargetId: charA.id,
          reactionExpression: 'thinking' as const,
          highlightedVocab: ['Articulate'],
        }
      ]
    },
    {
      id: 'p1-panel-3',
      panelNumber: 3,
      layoutSpan: 'half' as const,
      caption: `THE PRAGMATIC FORMULA`,
      setting: 'Whiteboard close-up',
      backgroundTheme: 'office' as const,
      soundEffect: { text: 'AHA!', color: '#ff5c45', rotation: 8 },
      actingCharacters: [
        {
          characterId: charA.id,
          position: 'left' as const,
          facing: 'right' as const,
          initialExpression: 'happy' as const,
          initialAction: 'talk' as const,
        },
        {
          characterId: charB.id,
          position: 'right' as const,
          facing: 'left' as const,
          initialExpression: 'happy' as const,
          initialAction: 'nod' as const,
        }
      ],
      dialogues: [
        {
          id: 'dlg-4',
          characterId: charA.id,
          characterName: charA.name,
          text: `I take a pragmatic stance: write automated test suites first, deliver modular iterations, and maintain open communication.`,
          bubbleType: 'speech' as const,
          position: { x: 18, y: 22 },
          emotion: 'Confident & Structured',
          expression: 'happy' as const,
          gesture: 'talk' as const,
          animation: 'slide-up' as const,
          duration: 3800,
          reactionTargetId: charB.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: ['Pragmatic'],
        }
      ]
    }
  ];

  const page2Panels = [
    {
      id: 'p2-panel-1',
      panelNumber: 4,
      layoutSpan: 'half' as const,
      caption: `PAGE 2 • TEAM DYNAMICS`,
      setting: 'Collaborative Open Space',
      backgroundTheme: 'tech-hub' as const,
      actingCharacters: [
        {
          characterId: charB.id,
          position: 'right' as const,
          facing: 'left' as const,
          initialExpression: 'happy' as const,
          initialAction: 'explain' as const,
        },
        {
          characterId: charA.id,
          position: 'left' as const,
          facing: 'right' as const,
          initialExpression: 'happy' as const,
          initialAction: 'nod' as const,
        }
      ],
      dialogues: [
        {
          id: 'dlg-5',
          characterId: charB.id,
          characterName: charB.name,
          text: `Spot on! Our engineers thrive on a collaborative mindset. How do you handle sudden constructive critique?`,
          bubbleType: 'speech' as const,
          position: { x: 45, y: 20 },
          emotion: 'Encouraging',
          expression: 'happy' as const,
          gesture: 'explain' as const,
          animation: 'slide-left' as const,
          duration: 3200,
          reactionTargetId: charA.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: ['Collaborative'],
        }
      ]
    },
    {
      id: 'p2-panel-2',
      panelNumber: 5,
      layoutSpan: 'half' as const,
      caption: `TURNING CHALLENGES INTO TRIUMPHS`,
      setting: 'Sunlit Window View',
      backgroundTheme: 'tech-hub' as const,
      actingCharacters: [
        {
          characterId: charA.id,
          position: 'left' as const,
          facing: 'right' as const,
          initialExpression: 'happy' as const,
          initialAction: 'celebrate' as const,
        },
        {
          characterId: charB.id,
          position: 'right' as const,
          facing: 'left' as const,
          initialExpression: 'happy' as const,
          initialAction: 'nod' as const,
        }
      ],
      dialogues: [
        {
          id: 'dlg-6',
          characterId: charA.id,
          characterName: charA.name,
          text: `Critique is fuel for improvement! On our last sprint, peer feedback unlocked a massive architectural breakthrough!`,
          bubbleType: 'speech' as const,
          position: { x: 15, y: 22 },
          emotion: 'Proud & Inspiring',
          expression: 'happy' as const,
          gesture: 'celebrate' as const,
          animation: 'bounce-in' as const,
          duration: 3600,
          reactionTargetId: charB.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: ['Breakthrough'],
        }
      ]
    },
    {
      id: 'p2-panel-3',
      panelNumber: 6,
      layoutSpan: 'hero' as const,
      caption: `THE PARTNERSHIP OFFER`,
      setting: 'Main Lobby — Glass Atrium',
      backgroundTheme: 'office' as const,
      soundEffect: { text: 'SUCCESS!', color: '#22c55e', rotation: -4 },
      actingCharacters: [
        {
          characterId: charB.id,
          position: 'right' as const,
          facing: 'left' as const,
          initialExpression: 'happy' as const,
          initialAction: 'wave' as const,
        },
        {
          characterId: charA.id,
          position: 'left' as const,
          facing: 'right' as const,
          initialExpression: 'happy' as const,
          initialAction: 'celebrate' as const,
        }
      ],
      dialogues: [
        {
          id: 'dlg-7',
          characterId: charB.id,
          characterName: charB.name,
          text: `We are genuinely impressed with your clarity, ${charA.name}. We would love to welcome you aboard our global squad!`,
          bubbleType: 'speech' as const,
          position: { x: 45, y: 15 },
          emotion: 'Thrilled & Celebrating',
          expression: 'happy' as const,
          gesture: 'wave' as const,
          animation: 'slide-up' as const,
          duration: 3600,
          reactionTargetId: charA.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: [],
        },
        {
          id: 'dlg-8',
          characterId: charA.id,
          characterName: charA.name,
          text: `Thank you so much! I look forward to contributing from day one!`,
          bubbleType: 'speech' as const,
          position: { x: 18, y: 38 },
          emotion: 'Joyful & Grateful',
          expression: 'happy' as const,
          gesture: 'celebrate' as const,
          animation: 'pop-in' as const,
          duration: 2800,
          reactionTargetId: charB.id,
          reactionExpression: 'happy' as const,
          highlightedVocab: [],
        }
      ]
    }
  ];

  // Story-Based Interactive Practice Questions
  const practiceQuestions: PracticeQuestion[] = [
    {
      id: 'prac-1',
      type: 'complete-dialogue',
      scenario: 'The interviewer asks how you communicate complex architectures.',
      speaker: charB.name,
      prompt: `Sarah says: "Could you ________ your system design so non-technical stakeholders understand?"`,
      options: ['articulate', 'hesitate', 'complicate', 'postpone'],
      correctAnswer: 'articulate',
      explanation: '"Articulate" means to express ideas clearly and effectively.',
      vocabTarget: 'Articulate',
    },
    {
      id: 'prac-2',
      type: 'best-response',
      scenario: 'You need to explain how you make practical decisions under pressure.',
      speaker: charA.name,
      prompt: 'Which response demonstrates a pragmatic mindset?',
      options: [
        'I refuse to work if everything isn’t 100% ideal.',
        'I adopt a pragmatic strategy: prioritize core user value and ship incremental updates.',
        'I ignore all feedback and code in isolation.',
        'I wait until someone else makes the tough call.'
      ],
      correctAnswer: 'I adopt a pragmatic strategy: prioritize core user value and ship incremental updates.',
      explanation: 'Being "pragmatic" focuses on practical, sensible steps that solve real problems.',
      vocabTarget: 'Pragmatic',
    },
    {
      id: 'prac-3',
      type: 'fill-blank',
      scenario: 'Describing how your team overcame a complex bug.',
      speaker: charA.name,
      prompt: `After three sleepless days of investigation, we finally had an inspiring ________ in our caching layer.`,
      options: ['breakthrough', 'interruption', 'complaint', 'hesitation'],
      correctAnswer: 'breakthrough',
      explanation: 'A "breakthrough" is a sudden and major advance or discovery.',
      vocabTarget: 'Breakthrough',
    },
    {
      id: 'prac-4',
      type: 'match-meaning',
      scenario: 'Match the business adjective to its real-world definition.',
      speaker: 'ComicLingo Coach',
      prompt: 'What does "Collaborative" best represent in the story?',
      options: [
        'Working cooperatively with others toward a shared objective.',
        'Working alone in complete silence without sharing notes.',
        'Criticizing others when a release goes wrong.',
        'Postponing meetings indefinitely.'
      ],
      correctAnswer: 'Working cooperatively with others toward a shared objective.',
      explanation: '"Collaborative" derives from collaborating with mutual respect.',
      vocabTarget: 'Collaborative',
    }
  ];

  // Story-Based Quiz
  const quizQuestions: QuizQuestion[] = [
    {
      id: 'quiz-1',
      type: 'multiple-choice',
      question: `What was the primary setting of Page 1 in "${storyTitle}"?`,
      options: [
        'A high-tech international interview boardroom',
        'A crowded suburban train station',
        'A noisy school cafeteria',
        'A doctor’s examination room'
      ],
      correctAnswer: 'A high-tech international interview boardroom',
      explanation: 'The scene opens on Floor 14 of an international innovation hub.',
    },
    {
      id: 'quiz-2',
      type: 'scenario',
      question: `When Sarah asked about balancing quality and speed, what was Alex’s strategy?`,
      options: [
        'A pragmatic stance with automated tests, modular code, and clear dialogue',
        'Skipping tests altogether to hit the deadline fast',
        'Blaming other teammates for delays',
        'Asking Sarah to answer her own question'
      ],
      correctAnswer: 'A pragmatic stance with automated tests, modular code, and clear dialogue',
      explanation: 'Alex emphasized automated tests and modular iterations as practical balance.',
    },
    {
      id: 'quiz-3',
      type: 'grammar',
      question: `Choose the grammatically correct sentence using "articulate":`,
      options: [
        'He articulate his thoughts with calm confidence.',
        'He articulated his thoughts with calm confidence.',
        'He articulating his thoughts with calm confidence.',
        'He were articulate his thoughts with calm confidence.'
      ],
      correctAnswer: 'He articulated his thoughts with calm confidence.',
      explanation: 'In the past tense, "articulate" becomes "articulated".',
    },
    {
      id: 'quiz-4',
      type: 'fill-blank',
      question: `Fill in the blank: "Cross-functional teams achieve superior results through ________ communication."`,
      options: ['collaborative', 'hostile', 'secretive', 'negligent'],
      correctAnswer: 'collaborative',
      explanation: 'Collaborative communication promotes synergy and shared alignment.',
    }
  ];

  // Next lesson recommendation
  const recommendedNext: LessonRecommendation = {
    nextTitle: 'The Salary & Equity Negotiation Dialogue',
    nextSituation: 'Workplace',
    nextGoal: 'Speaking Confidence & Counter-proposals',
    nextStyle: params.comicStyle,
    reason: `Because you mastered "${storyTitle}", next step is articulating compensation and role expectations politely!`,
    estimatedMinutes: 6,
    previewSnippet: `Learn phrases like: "Based on my contributions and market data, I would welcome exploring...", "Could you walk me through the benefits structure?"`
  };

  const story: ComicStory = {
    id: `comic-${Date.now()}`,
    title: storyTitle,
    subtitle: storySubtitle,
    situation: params.situation,
    comicStyle: params.comicStyle,
    ageGroup: params.ageGroup,
    englishLevel: params.englishLevel,
    goal: params.goals[0] || 'Speaking Confidence',
    interest: params.interests[0] || 'Technology',
    difficulty: params.difficulty || 'Medium',
    storyLength: params.storyLength || 'Medium (3 pages)',
    summary,
    learningFocus: ['Professional Idioms', 'Structural Articulation', 'Active Listening Responses'],
    characters,
    pages: [
      {
        pageNumber: 1,
        pageTitle: 'Act 1: The First Impression & Architecture Query',
        layout: '3-panel',
        panels: page1Panels,
      },
      {
        pageNumber: 2,
        pageTitle: 'Act 2: Collaborative Momentum & Triumph',
        layout: '3-panel',
        panels: page2Panels,
      }
    ],
    vocabulary: vocabList,
    practice: practiceQuestions,
    quiz: quizQuestions,
    evaluationScenario: {
      prompt: `Sarah looks at you and asks: "Could you tell us about a time you handled unexpected feedback on your work and transformed it into a positive result?"`,
      context: 'Job Interview • Behavioral Response Round',
      characterPrompt: `Speak directly to Sarah. Use terms like "constructive", "collaborative", or "pragmatic".`,
      expectedConcepts: ['feedback', 'listen', 'improve', 'team', 'result']
    },
    recommendedNext,
    createdAt: new Date().toISOString(),
    isFavorite: false,
    progressPercent: 0,
  };

  return story;
}

// AI Open-ended Evaluation Engine
export async function evaluateUserResponse(
  userText: string,
  scenarioPrompt: string
): Promise<AIEvaluationResult> {
  // Simulate AI evaluation delay
  await new Promise((r) => setTimeout(r, 600));

  const text = userText.trim();
  const wordCount = text.split(/\s+/).length;

  let baseScore = 75;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Meaning check
  if (wordCount >= 10) {
    baseScore += 10;
    strengths.push('Good response length showing structured reasoning.');
  } else {
    improvements.push('Expand your answer with a concrete past example to be more convincing.');
  }

  // Vocabulary keywords
  const keywords = ['feedback', 'listen', 'learn', 'collaborative', 'improve', 'team', 'pragmatic', 'result', 'solve', 'adapt'];
  const matched = keywords.filter(k => text.toLowerCase().includes(k));

  if (matched.length >= 2) {
    baseScore += 12;
    strengths.push(`Excellent use of key professional terms: "${matched.join(', ')}".`);
  } else {
    improvements.push('Incorporate professional terms like "constructive feedback" or "iterative improvement".');
  }

  // Grammar & flow check
  const hasCapital = /^[A-Z]/.test(text);
  const hasPunctuation = /[.!?]$/.test(text);
  if (hasCapital && hasPunctuation) {
    baseScore += 3;
    strengths.push('Proper sentence capitalization and punctuation.');
  } else {
    improvements.push('Remember to start with a capital letter and finish with clear punctuation.');
  }

  const finalScore = Math.min(98, Math.max(68, baseScore));

  return {
    userAnswer: userText,
    promptQuestion: scenarioPrompt,
    overallScore: finalScore,
    criteria: {
      meaning: {
        score: Math.min(100, finalScore + 2),
        feedback: 'Directly addresses the scenario prompt with clear communicative intent.',
      },
      grammar: {
        score: Math.min(100, finalScore - 1),
        feedback: 'Solid grammatical structure with natural phrasing.',
      },
      vocabulary: {
        score: Math.min(100, finalScore + 4),
        feedback: matched.length > 0 
          ? `Rich situational vocabulary utilized effectively.` 
          : 'Could be enhanced with more precise business vocabulary.',
      },
      naturalness: {
        score: Math.min(100, finalScore),
        feedback: 'Sounds like a confident, respectful English speaker in an interview context.',
      }
    },
    strengths,
    improvements: improvements.length > 0 ? improvements : ['Continue practicing aloud to maintain natural spoken rhythm.'],
    modelAnswer: '“When I received feedback that our documentation was too complex, I scheduled a collaborative review session. We adopted a pragmatic template, which reduced onboarding time by 30%.”'
  };
}
