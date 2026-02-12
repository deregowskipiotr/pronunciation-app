import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 1,
    word: "to precipitate",
    explanation: "To cause something to happen suddenly or unexpectedly.",
    example: "The bad news precipitated an argument between them.",
    example1:
      "The economic crisis precipitated a wave of political unrest across the region.",
  },
  {
    id: 2,
    word: "sluggish",
    explanation: "Moving or reacting slowly; lacking energy.",
    example: "I feel sluggish after eating too much lunch.",
    example1:
      "The sluggish economy showed few signs of recovery despite government intervention.",
  },
  {
    id: 3,
    word: "incipient",
    explanation: "Just beginning; in an early stage.",
    example: "I noticed the incipient signs of a cold yesterday.",
    example1:
      "The incipient rebellion was quickly suppressed by the authorities.",
  },
  {
    id: 4,
    word: "irrevocable",
    explanation: "Impossible to change or undo.",
    example: "Once you sign the contract, the decision is irrevocable.",
    example1: "The judge's ruling was irrevocable, leaving no room for appeal.",
  },
  {
    id: 5,
    word: "by dint of",
    explanation: "Through the use of effort or hard work.",
    example: "She succeeded by dint of hard work and determination.",
    example1:
      "He gained promotion by dint of sheer persistence and meticulous attention to detail.",
  },
  {
    id: 6,
    word: "to depict",
    explanation: "To show or describe something, usually in art or writing.",
    example: "The painting depicts a beautiful landscape.",
    example1:
      "The novel depicts the harsh realities of life during wartime with unflinching honesty.",
  },
  {
    id: 7,
    word: "to scrutinize",
    explanation: "To examine something very carefully.",
    example: "The teacher scrutinized my homework for mistakes.",
    example1:
      "The auditor scrutinized the company's financial records for any irregularities.",
  },
  {
    id: 8,
    word: "foreseeable",
    explanation: "Possible to predict or expect in the future.",
    example: "There are no foreseeable problems with the plan.",
    example1:
      "In the foreseeable future, renewable energy will dominate global power production.",
  },
  {
    id: 9,
    word: "sane",
    explanation: "Having a healthy mind; reasonable.",
    example: "Nobody in their right mind would agree to that.",
    example1:
      "Only a sane approach to budget management will resolve the current fiscal crisis.",
  },
  {
    id: 10,
    word: "to fall prey to sth",
    explanation: "To be caught or harmed by something bad.",
    example: "Don't fall prey to scams on the internet.",
    example1:
      "Many investors fell prey to the fraudulent scheme promising unrealistic returns.",
  },
  // Add more words with sequential IDs as needed
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
