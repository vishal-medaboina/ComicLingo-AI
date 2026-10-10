import type { 
  Character, 
  CharacterCategory, 
  CharacterAppearance, 
  ExpressionType, 
  ActionType, 
  EntranceAnimation,
  AgeGroup,
  Situation
} from '../types/comiclingo';

// Copyrighted keyword map with safe transformation concepts
const PROTECTED_ENTITIES: Record<string, { name: string; concept: string; category: CharacterCategory; outfitStyle: CharacterAppearance['outfitStyle']; outfitColor: string }> = {
  'batman': { name: 'Shadow Knight Thorne', concept: 'A high-tech billionaire detective operating at midnight', category: 'Detectives', outfitStyle: 'detective', outfitColor: '#1e293b' },
  'spiderman': { name: 'Volt Arachnid Vance', concept: 'An energetic teenage science student with bio-electric reflexes', category: 'Heroes', outfitStyle: 'hero', outfitColor: '#dc2626' },
  'spider-man': { name: 'Volt Arachnid Vance', concept: 'An energetic teenage science student with bio-electric reflexes', category: 'Heroes', outfitStyle: 'hero', outfitColor: '#dc2626' },
  'ironman': { name: 'Exo-Forge Sterling', concept: 'An eccentric robotics inventor with jet-propelled titanium armor', category: 'Engineers', outfitStyle: 'scifi', outfitColor: '#b91c1c' },
  'iron man': { name: 'Exo-Forge Sterling', concept: 'An eccentric robotics inventor with jet-propelled titanium armor', category: 'Engineers', outfitStyle: 'scifi', outfitColor: '#b91c1c' },
  'superman': { name: 'Solaris Apex', concept: 'An optimistic cosmic guardian powered by stellar radiation', category: 'Heroes', outfitStyle: 'hero', outfitColor: '#1d4ed8' },
  'elsa': { name: 'Princess Glacia of Northspire', concept: 'A serene northern monarch attuned to glacial ice crystals', category: 'Royal Characters', outfitStyle: 'formal', outfitColor: '#38bdf8' },
  'pikachu': { name: 'Sparky Pipsqueak', concept: 'A spirited electric creature with lightning bolt ears', category: 'Fantasy', outfitStyle: 'casual', outfitColor: '#eab308' },
  'harry potter': { name: 'Archmage Lucian Drake', concept: 'A curious apprentice wizard who decodes ancient runic charms', category: 'Fantasy', outfitStyle: 'formal', outfitColor: '#4338ca' },
  'mickey mouse': { name: 'Barnaby Whiskers', concept: 'A cheerful vintage cartoon critter who loves musical slapstick', category: 'Comedy Characters', outfitStyle: 'casual', outfitColor: '#ef4444' },
  'goku': { name: 'Kaelon the Solar Striker', concept: 'A martial arts wanderer who channels inner spiritual radiance', category: 'Warriors', outfitStyle: 'casual', outfitColor: '#f97316' },
};

// Seed / Pre-generated character catalog
export const PRESET_CHARACTERS: Character[] = [
  {
    id: 'char-alex-interviewee',
    name: 'Alex Rivera',
    age: 24,
    ageGroup: '15+',
    gender: 'male',
    role: 'Job Candidate',
    profession: 'Software Engineer',
    category: 'Engineers',
    personality: 'Ambitious, slightly nervous, well-prepared, thoughtful',
    appearance: {
      skinTone: '#ffd1b3',
      hairStyle: 'short',
      hairColor: '#26170d',
      outfitStyle: 'suit',
      outfitColor: '#134753',
      accentColor: '#ff5c45',
      accessories: ['glasses', 'tie'],
      eyeColor: '#2b2b2b',
      facialHair: 'none',
    },
    speakingStyle: 'Polite, structured, speaks with technical clarity',
    backgroundStory: 'Graduated in Computer Science, excited for his first international tech interview.',
    abilities: ['Problem Solving', 'Algorithm Design', 'English Idioms'],
    likes: ['Coffee', 'Clean Code', 'Reading Tech Blogs'],
    dislikes: ['Vague Requirements', 'Network Lag'],
    currentExpression: 'confident' as ExpressionType || 'happy',
    currentAction: 'talk',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-sarah-interviewer',
    name: 'Sarah Jenkins',
    age: 38,
    ageGroup: '15+',
    gender: 'female',
    role: 'Hiring Manager',
    profession: 'Engineering Director',
    category: 'Business Characters',
    personality: 'Sharp, encouraging, observant, professional',
    appearance: {
      skinTone: '#f5c6a5',
      hairStyle: 'bob',
      hairColor: '#854d0e',
      outfitStyle: 'formal',
      outfitColor: '#0e3740',
      accentColor: '#fbbf24',
      accessories: ['badge'],
      eyeColor: '#15803d',
    },
    speakingStyle: 'Articulate, inquisitive, warmly welcoming',
    backgroundStory: 'Leads a global team of 40 engineers; values clear communicators.',
    likes: ['System Design', 'Collaboration', 'Mentorship'],
    dislikes: ['Jargon Overuse', 'Dishonesty'],
    currentExpression: 'happy',
    currentAction: 'nod',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-liam-kid',
    name: 'Liam Chen',
    age: 8,
    ageGroup: '5-10',
    gender: 'male',
    role: 'Explorer Child',
    profession: 'Elementary Student',
    category: 'Kids',
    personality: 'Curious, cheerful, imaginative, energetic',
    appearance: {
      skinTone: '#ffd1b3',
      hairStyle: 'short',
      hairColor: '#18181b',
      outfitStyle: 'hoodie',
      outfitColor: '#ff5c45',
      accentColor: '#fbbf24',
      accessories: ['hat'],
      eyeColor: '#1e293b',
    },
    speakingStyle: 'Playful, uses short, vibrant sentences',
    backgroundStory: 'Loves discovering animals and space facts with his robot friend.',
    likes: ['Dinosaurs', 'Building Blocks', 'Comic Books'],
    dislikes: ['Broccoli', 'Bedtime'],
    currentExpression: 'excited' as ExpressionType || 'happy',
    currentAction: 'wave',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-roby-tutor',
    name: 'Bolt-3000',
    age: '2 yrs built',
    ageGroup: '5-10',
    gender: 'robot',
    role: 'AI Learning Tutor',
    profession: 'Robotic Assistant',
    category: 'Robots',
    personality: 'Supportive, patient, full of sound effects, witty',
    appearance: {
      skinTone: '#bae6fd',
      hairStyle: 'bald',
      hairColor: '#0284c7',
      outfitStyle: 'scifi',
      outfitColor: '#0284c7',
      accentColor: '#38bdf8',
      accessories: ['antenna'],
      eyeColor: '#38bdf8',
    },
    speakingStyle: 'Beeps cheerful greetings and highlights key vocabulary',
    backgroundStory: 'Built in the Tokyo Innovation Lab to help kids around the globe master English.',
    abilities: ['Instant Pronunciation', 'Hologram Flashcards'],
    likes: ['Solar Energy', 'Grammar Games'],
    dislikes: ['Water Spills', 'Rust'],
    currentExpression: 'happy',
    currentAction: 'celebrate',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-dr-arun',
    name: 'Dr. Arun Patel',
    age: 42,
    ageGroup: '15+',
    gender: 'male',
    role: 'Chief Physician',
    profession: 'Cardiologist',
    category: 'Doctors',
    personality: 'Calm, empathetic, reassuring, methodical',
    appearance: {
      skinTone: '#d19864',
      hairStyle: 'short',
      hairColor: '#3f3f46',
      outfitStyle: 'scrubs',
      outfitColor: '#0d9488',
      accentColor: '#ffffff',
      accessories: ['stethoscope'],
      eyeColor: '#451a03',
      facialHair: 'mustache',
    },
    speakingStyle: 'Gentle, speaks in steady, reassuring phrases',
    backgroundStory: 'Practices medicine in an international clinic helping patients of all nationalities.',
    likes: ['Tea', 'Stethoscope Acoustics', 'Wellness Tips'],
    dislikes: ['Cold Weather', 'Skipping Sleep'],
    currentExpression: 'default',
    currentAction: 'explain',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-elena-detective',
    name: 'Elena Vance',
    age: 29,
    ageGroup: '15+',
    gender: 'female',
    role: 'Lead Investigator',
    profession: 'Private Detective',
    category: 'Detectives',
    personality: 'Perceptive, witty, observant, relentless',
    appearance: {
      skinTone: '#f5c6a5',
      hairStyle: 'long',
      hairColor: '#7c2d12',
      outfitStyle: 'detective',
      outfitColor: '#b49372',
      accentColor: '#1e293b',
      accessories: ['hat'],
      eyeColor: '#047857',
    },
    speakingStyle: 'Direct, sharp, spots linguistic clues in dialogue',
    backgroundStory: 'Solves international mystery cases where language and idioms unlock hidden secrets.',
    likes: ['Coffee', 'Ciphers', 'Rainy London Evenings'],
    dislikes: ['False Leads', 'Loud Siren Alarms'],
    currentExpression: 'curious' as ExpressionType || 'thinking',
    currentAction: 'think',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-chef-marco',
    name: 'Marco Rossi',
    age: 35,
    ageGroup: '15+',
    gender: 'male',
    role: 'Executive Chef',
    profession: 'Culinary Artist',
    category: 'Travel Characters',
    personality: 'Passionate, expressive, generous, proud',
    appearance: {
      skinTone: '#f5c6a5',
      hairStyle: 'curly',
      hairColor: '#1c1917',
      outfitStyle: 'chef',
      outfitColor: '#ffffff',
      accentColor: '#ef4444',
      accessories: [],
      eyeColor: '#78350f',
      facialHair: 'mustache',
    },
    speakingStyle: 'Vibrant, descriptive, uses rich culinary vocabulary',
    backgroundStory: 'Runs a renowned bistro welcoming travelers from all continents.',
    likes: ['Fresh Basil', 'Woodfire Oven', 'Happy Diners'],
    dislikes: ['Overcooked Pasta', 'Cold Plates'],
    currentExpression: 'happy',
    currentAction: 'explain',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'char-chloe-student',
    name: 'Chloe Dubois',
    age: 14,
    ageGroup: '10-15',
    gender: 'female',
    role: 'Exchange Student',
    profession: 'High School Student',
    category: 'Students',
    personality: 'Friendly, tech-savvy, enthusiastic, curious',
    appearance: {
      skinTone: '#f5c6a5',
      hairStyle: 'ponytail',
      hairColor: '#ca8a04',
      outfitStyle: 'casual',
      outfitColor: '#7c3aed',
      accentColor: '#f43f5e',
      accessories: ['headphone'],
      eyeColor: '#2563eb',
    },
    speakingStyle: 'Casual modern English, expressive with idioms',
    backgroundStory: 'Studying in Vancouver on an exchange program, making lifelong friends.',
    likes: ['Podcasts', 'Photography', 'Language Clubs'],
    dislikes: ['Heavy Rain', 'Early Morning Bells'],
    currentExpression: 'happy',
    currentAction: 'talk',
    createdAt: new Date().toISOString(),
  }
];

// Contextual Character Recommender
export function getRecommendedCharactersForSituation(
  situation: Situation, 
  ageGroup: AgeGroup
): Character[] {
  switch (situation) {
    case 'Job Interview':
      return [
        PRESET_CHARACTERS[0], // Alex (Candidate)
        PRESET_CHARACTERS[1], // Sarah (Interviewer)
      ];
    case 'Healthcare':
      return [
        PRESET_CHARACTERS[4], // Dr. Arun
        PRESET_CHARACTERS[7], // Chloe (Patient/Student)
      ];
    case 'Food & Restaurant':
      return [
        PRESET_CHARACTERS[6], // Chef Marco
        PRESET_CHARACTERS[7], // Chloe
      ];
    case 'School & College':
      return [
        PRESET_CHARACTERS[7], // Chloe
        PRESET_CHARACTERS[3], // Bolt-3000
      ];
    case 'Technology':
      return [
        PRESET_CHARACTERS[0], // Alex
        PRESET_CHARACTERS[3], // Bolt-3000
      ];
    default:
      if (ageGroup === '5-10') {
        return [PRESET_CHARACTERS[2], PRESET_CHARACTERS[3]]; // Liam + Bolt
      }
      return [PRESET_CHARACTERS[0], PRESET_CHARACTERS[5]]; // Alex + Elena
  }
}

// Copyright checker & safe transformer
export function checkCopyrightAndTransform(input: string): {
  isProtected: boolean;
  protectedEntity?: string;
  transformedCharacter?: Partial<Character>;
  systemMessage?: string;
} {
  const lower = input.toLowerCase();
  for (const [key, replacement] of Object.entries(PROTECTED_ENTITIES)) {
    if (lower.includes(key)) {
      return {
        isProtected: true,
        protectedEntity: key.toUpperCase(),
        systemMessage: `“${key}” is a protected character. Let's create an original character inspired by the general concept.`,
        transformedCharacter: {
          name: replacement.name,
          role: 'Inspired Original',
          category: replacement.category,
          personality: 'Bold, distinctive, charismatic, independent',
          backgroundStory: replacement.concept,
          appearance: {
            skinTone: '#ffd1b3',
            hairStyle: 'spiky',
            hairColor: '#1e293b',
            outfitStyle: replacement.outfitStyle,
            outfitColor: replacement.outfitColor,
            accentColor: '#38bdf8',
            accessories: replacement.outfitStyle === 'detective' ? ['hat'] : ['glasses'],
            eyeColor: '#0284c7',
          }
        }
      };
    }
  }
  return { isProtected: false };
}

// Dynamic AI Character Generator from description or category
export function generateCharacterFromPrompt(
  prompt: string, 
  categoryOverride?: CharacterCategory,
  ageGroupPreference?: AgeGroup
): { character: Character; isProtected: boolean; notice?: string } {
  const copyrightCheck = checkCopyrightAndTransform(prompt);
  const promptLower = prompt.toLowerCase();

  // Determine skin tone
  const skinTones = ['#ffd1b3', '#f5c6a5', '#d19864', '#9b5a2f', '#683b19'];
  const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];

  // Determine hair
  const hairStyles: CharacterAppearance['hairStyle'][] = ['short', 'curly', 'long', 'bob', 'spiky', 'buzz', 'ponytail', 'wavy', 'anime'];
  let chosenHair: CharacterAppearance['hairStyle'] = hairStyles[Math.floor(Math.random() * hairStyles.length)];
  let hairColor = '#2b1d0c';

  if (promptLower.includes('blonde') || promptLower.includes('gold')) hairColor = '#eab308';
  else if (promptLower.includes('red') || promptLower.includes('ginger')) hairColor = '#c2410c';
  else if (promptLower.includes('silver') || promptLower.includes('gray')) hairColor = '#94a3b8';
  else if (promptLower.includes('blue') || promptLower.includes('cyan')) hairColor = '#0284c7';

  // Determine outfit
  let outfitStyle: CharacterAppearance['outfitStyle'] = 'casual';
  let outfitColor = '#134753';
  let accessories: CharacterAppearance['accessories'] = [];

  if (promptLower.includes('suit') || promptLower.includes('interview') || promptLower.includes('business')) {
    outfitStyle = 'suit';
    outfitColor = '#0f2b32';
    accessories.push('tie');
  } else if (promptLower.includes('doctor') || promptLower.includes('hospital') || promptLower.includes('nurse')) {
    outfitStyle = 'scrubs';
    outfitColor = '#0d9488';
    accessories.push('stethoscope');
  } else if (promptLower.includes('detective') || promptLower.includes('mystery')) {
    outfitStyle = 'detective';
    outfitColor = '#b49372';
    accessories.push('hat');
  } else if (promptLower.includes('robot') || promptLower.includes('cyber') || promptLower.includes('sci-fi')) {
    outfitStyle = 'scifi';
    outfitColor = '#0284c7';
    accessories.push('antenna');
  } else if (promptLower.includes('hero') || promptLower.includes('superhero')) {
    outfitStyle = 'hero';
    outfitColor = '#dc2626';
    chosenHair = 'spiky';
  } else if (promptLower.includes('chef') || promptLower.includes('cook')) {
    outfitStyle = 'chef';
    outfitColor = '#ffffff';
  } else if (promptLower.includes('glasses')) {
    accessories.push('glasses');
  }

  // Age group inference
  let age = 22;
  let ageGroup: AgeGroup = ageGroupPreference || '15+';
  if (promptLower.includes('kid') || promptLower.includes('child') || promptLower.includes('elementary')) {
    age = 8;
    ageGroup = '5-10';
  } else if (promptLower.includes('teen') || promptLower.includes('high school')) {
    age = 15;
    ageGroup = '10-15';
  } else if (promptLower.includes('senior') || promptLower.includes('grandpa') || promptLower.includes('elder')) {
    age = 65;
    ageGroup = '15+';
    hairColor = '#cbd5e1';
  }

  // Name generation
  const firstNames = [
    'Jordan', 'Maya', 'Lucas', 'Aria', 'Ethan', 'Zoe', 'Leo', 'Nora', 'Felix', 'Sora', 'Kiran', 'Amara', 'Kai'
  ];
  const surnames = [
    'Vanguard', 'Sterling', 'Brooks', 'Castillo', 'Novak', 'Kim', 'Patel', 'Hawthorne', 'Mercer', 'Solari'
  ];
  const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;

  let name = copyrightCheck.isProtected && copyrightCheck.transformedCharacter?.name 
    ? copyrightCheck.transformedCharacter.name 
    : randomName;

  if (prompt.trim() && !copyrightCheck.isProtected && prompt.length < 25 && !prompt.includes(' ')) {
    name = prompt.trim();
  }

  const category: CharacterCategory = categoryOverride || 
    (copyrightCheck.isProtected ? copyrightCheck.transformedCharacter?.category || 'Heroes' : 'Heroes');

  const newChar: Character = {
    id: `char-ai-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name,
    age,
    ageGroup,
    gender: promptLower.includes('female') || promptLower.includes('girl') || promptLower.includes('woman') ? 'female' : 'male',
    role: prompt.length > 3 ? prompt.slice(0, 30) : 'Adventurer',
    profession: outfitStyle === 'suit' ? 'Specialist' : outfitStyle === 'scrubs' ? 'Medical Practitioner' : 'Explorer',
    category,
    personality: 'Dynamic, insightful, curious, communicates with expressive clarity',
    appearance: copyrightCheck.isProtected && copyrightCheck.transformedCharacter?.appearance ? copyrightCheck.transformedCharacter.appearance : {
      skinTone,
      hairStyle: chosenHair,
      hairColor,
      outfitStyle,
      outfitColor,
      accentColor: '#ff5c45',
      accessories,
      eyeColor: '#1e293b',
      facialHair: 'none',
    },
    speakingStyle: 'Clear, engaging, uses vivid contextual expressions',
    backgroundStory: copyrightCheck.isProtected 
      ? copyrightCheck.transformedCharacter?.backgroundStory || '' 
      : `An original character created for ComicLingo AI. Inspired by: "${prompt.slice(0, 80)}"`,
    abilities: ['Linguistic Agility', 'Situational English', 'Active Listening'],
    likes: ['Storytelling', 'Learning New Idioms'],
    dislikes: ['Misunderstandings', 'Silence'],
    currentExpression: 'happy',
    currentAction: 'wave',
    currentAnimation: 'slide-up',
    isCustom: true,
    isProtectedSubstitute: copyrightCheck.isProtected,
    protectedOriginalQuery: copyrightCheck.protectedEntity,
    createdAt: new Date().toISOString(),
  };

  return {
    character: newChar,
    isProtected: copyrightCheck.isProtected,
    notice: copyrightCheck.systemMessage
  };
}

// Context-aware emotion & animation inference pipeline for dialogue
export function inferEmotionAndGesture(
  dialogueText: string,
  contextSpeaker: string,
  sceneSetting: string
): {
  emotion: string;
  expression: ExpressionType;
  gesture: ActionType;
  animation: EntranceAnimation;
  reactionExpression: ExpressionType;
} {
  const text = dialogueText.toLowerCase();

  // Surprised / Shocked
  if (text.includes('really?') || text.includes('what?!') || text.includes('wow') || text.includes('no way') || text.includes('unbelievable')) {
    return {
      emotion: 'Surprised',
      expression: 'surprised',
      gesture: 'react',
      animation: 'pop-in',
      reactionExpression: 'happy',
    };
  }

  // Excited / Celebratory
  if (text.includes('congratulations') || text.includes('passed') || text.includes('won') || text.includes('amazing') || text.includes('fantastic') || text.includes('great news')) {
    return {
      emotion: 'Excited',
      expression: 'happy',
      gesture: 'celebrate',
      animation: 'bounce-in',
      reactionExpression: 'happy',
    };
  }

  // Thinking / Confused / Explaining
  if (text.includes('explain') || text.includes('how does') || text.includes('let me think') || text.includes('in other words') || text.includes('concept')) {
    return {
      emotion: 'Thinking',
      expression: 'thinking',
      gesture: 'think',
      animation: 'slide-up',
      reactionExpression: 'curious' as ExpressionType || 'default',
    };
  }

  // Worried / Nervous
  if (text.includes('nervous') || text.includes('worried') || text.includes('forgot') || text.includes('oh no') || text.includes('problem') || text.includes('error')) {
    return {
      emotion: 'Worried',
      expression: 'worried',
      gesture: 'react',
      animation: 'pop-in',
      reactionExpression: 'thinking',
    };
  }

  // Greeting / Introducing
  if (text.includes('hello') || text.includes('welcome') || text.includes('pleased to meet') || text.includes('good morning') || text.includes('hi ')) {
    return {
      emotion: 'Friendly',
      expression: 'happy',
      gesture: 'wave',
      animation: 'slide-right',
      reactionExpression: 'happy',
    };
  }

  // Pointing / Directing
  if (text.includes('look at') || text.includes('over there') || text.includes('this chart') || text.includes('notice that')) {
    return {
      emotion: 'Informative',
      expression: 'talking',
      gesture: 'point',
      animation: 'slide-left',
      reactionExpression: 'thinking',
    };
  }

  // Default Speaking Cadence
  return {
    emotion: 'Conversational',
    expression: 'happy',
    gesture: 'talk',
    animation: 'fade-in',
    reactionExpression: 'default',
  };
}
