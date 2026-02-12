import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 1,
    word: "revolting",
    explanation: "Extremely disgusting or offensive, making you want to puke.",
    example: "That revolting smell from the gym socks made everyone run away.",
    example1:
      "The politician's revolting lies during the debate had the crowd chanting for pizza instead of votes.",
  },
  {
    id: 2,
    word: "to get to grips with",
    explanation: "To start understanding and handling something difficult.",
    example: "I need time to get to grips with this new React hook.",
    example1:
      "My cat finally got to grips with the laser pointer—now it's chasing it like a drunk coder debugging Tailwind at 3 AM.",
  },
  {
    id: 3,
    word: "to ridicule",
    explanation: "To make fun of someone in a mean or mocking way.",
    example: "They started to ridicule his old phone in front of everyone.",
    example1:
      "The boss ridiculed Dave's bourbon tasting notes, saying his 'oaky vibes' sounded like a tree got lost in a whiskey barrel party.",
  },
  {
    id: 4,
    word: "to insult",
    explanation: "To say something rude or hurtful to offend someone.",
    example: "Don't insult your friend by laughing at their outfit.",
    example1:
      "She insulted the barista by calling his latte art 'a sad cloud that looks like my ex's coding skills'.",
  },
  {
    id: 5,
    word: "to take sb for a ride",
    explanation: "To cheat or deceive someone, often for money or fun.",
    example: "The salesman tried to take us for a ride with a fake deal.",
    example1:
      "That shady Uber driver took me for a ride—drove me around Warsaw hood blasting polka remixes while my bourbon buzz wore off.",
  },
  {
    id: 6,
    word: "embellishment",
    explanation:
      "An added detail that makes a story more interesting, sometimes exaggerated.",
    example: "His fishing story had too many embellishments to be true.",
    example1:
      "Her resume's embellishment claimed she coded Next.js apps while wrestling bears in the Mazovia woods.",
  },
  {
    id: 7,
    word: "gross",
    explanation: "Disgusting or nasty, often about something slimy or yucky.",
    example: "The gross leftovers in the fridge were growing fur.",
    example1:
      "That gross glitch in my React app made buttons fart emojis every time I clicked deploy—like Docker throwing a tantrum.",
  },
  {
    id: 8,
    word: "to resemble",
    explanation: "To look like or be similar to someone or something.",
    example: "She resembles her mom a lot in photos.",
    example1:
      "My TypeScript error messages resemble angry drunk uncles at a whiskey tasting—yelling vague complaints with no fixes.",
  },
  {
    id: 9,
    word: "to pull oneself together",
    explanation: "To calm down and control your emotions after getting upset.",
    example: "After the bad news, he had to pull himself together quickly.",
    example1:
      "After spilling premium bourbon on his keyboard mid-code sprint, he pulled himself together by pretending it was a fancy glitch art install.",
  },
  {
    id: 10,
    word: "abnormality",
    explanation: "Something unusual or not normal, like a weird feature.",
    example: "The doctor checked for any abnormality in the test results.",
    example1:
      "The abnormality in my flashcard app? It quizzes you on words while animating dancing vodka bottles with Framer Motion.",
  },
];


/**
 * Fisher-Yates shuffle algorithm for proper random distribution
 * @param array Array to shuffle
 * @returns Shuffled array (new array, doesn't mutate original)
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get shuffled vocabulary words
 * @param count Optional - number of words to return (default: all words)
 * @returns Array of shuffled VocabularyWord objects
 */
export const getShuffledWords = (count?: number): VocabularyWord[] => {
  const shuffled = shuffleArray(vocabularyWords);

  // If count is specified and valid, return subset
  if (count && count > 0) {
    // Ensure we don't request more words than available
    const safeCount = Math.min(count, vocabularyWords.length);
    return shuffled.slice(0, safeCount);
  }

  return shuffled;
};

/**
 * Get words for a session with validation
 * @param count Number of words for the session
 * @returns Array of shuffled words
 * @throws Error if vocabulary is empty
 */
export const getSessionWords = (count: number = 10): VocabularyWord[] => {
  if (vocabularyWords.length === 0) {
    throw new Error("Vocabulary list is empty");
  }

  if (count <= 0) {
    console.warn(`Invalid count: ${count}. Using default: 10`);
    count = 10;
  }

  if (count > vocabularyWords.length) {
    console.warn(
      `Requested ${count} words but only ${vocabularyWords.length} available. Using all words.`,
    );
    return getShuffledWords(); // Return all shuffled words
  }

  return getShuffledWords(count);
};

/**
 * Get a specific word by ID
 * @param id Word ID
 * @returns VocabularyWord or undefined if not found
 */
export const getWordById = (id: number): VocabularyWord | undefined => {
  return vocabularyWords.find((word) => word.id === id);
};

/**
 * Get a specific word by text (case-insensitive)
 * @param wordText Word to find
 * @returns VocabularyWord or undefined if not found
 */
export const getWordByText = (wordText: string): VocabularyWord | undefined => {
  return vocabularyWords.find(
    (word) => word.word.toLowerCase() === wordText.toLowerCase(),
  );
};
