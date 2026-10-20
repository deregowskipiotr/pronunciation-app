import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export interface Flashcard {
  id: number;
  word: string;
  explanation: string;
  example: string;
  example1: string;
}

export const vocabularyWords: Flashcard[] = [
  {
    id: 1,
    word: "nefarious",
    explanation: "Wicked, evil, or criminal in nature.",
    example: "The company discovered a nefarious plot to steal customer data.",
    example1: "The investigation exposed a nefarious scheme orchestrated by senior executives to manipulate financial markets."
  },
  {
    id: 2,
    word: "perturbing",
    explanation: "Causing anxiety, worry, or distress.",
    example: "It is perturbing to see how fast fake news spreads online.",
    example1: "The report presented perturbing evidence of accelerating environmental degradation across the region."
  },
  {
    id: 3,
    word: "monetary",
    explanation: "Relating to money, currency, or finance.",
    example: "The old picture had high emotional value but low monetary value.",
    example1: "Central banks adjusted their monetary policies to curb rising inflation rates."
  },
  {
    id: 4,
    word: "appreciable",
    explanation: "Large or significant enough to be noticed or measured.",
    example: "We noticed an appreciable improvement in his English after a few months.",
    example1: "The new strategy yielded an appreciable increase in market share within the first quarter."
  },
  {
    id: 5,
    word: "to lament",
    explanation: "To express sorrow, regret, or disappointment about something.",
    example: "Many citizens lament the loss of green spaces in the city.",
    example1: "Economists lament the government's failure to implement structural reforms during the economic boom."
  },
  {
    id: 6,
    word: "counterintuitive",
    explanation: "Going against what common sense or expectation would suggest.",
    example: "It sounds counterintuitive, but taking short breaks can boost productivity.",
    example1: "The study revealed a counterintuitive outcome: higher tax rates in this specific sector actually stimulated investment."
  },
  {
    id: 7,
    word: "to endure",
    explanation: "To suffer through difficulty with patience, or to last over time.",
    example: "Commuters have to endure long traffic jams every morning.",
    example1: "Despite facing harsh economic sanctions, the local manufacturing sector managed to endure the prolonged crisis."
  },
  {
    id: 8,
    word: "imperative",
    explanation: "Extremely important, urgent, or essential.",
    example: "It is imperative to check your car oil before long drives.",
    example1: "It is imperative that regulatory bodies enforce strict compliance to prevent systemic financial failure."
  },
  {
    id: 9,
    word: "to adhere",
    explanation: "To follow rules or instructions strictly, or to stick to something.",
    example: "All employees must adhere to the company safety guidelines.",
    example1: "Organizations must strictly adhere to international data protection standards to avoid severe penalties."
  },
  {
    id: 10,
    word: "forewarned is forearmed",
    explanation: "Knowing about a problem in advance helps you prepare for it.",
    example: "Knowing about the road construction helped us plan a better route—forewarned is forearmed.",
    example1: "Analyzing competitor strategy gave the board a distinct advantage; after all, forewarned is forearmed."
  }
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
