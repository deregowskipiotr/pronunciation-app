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
    word: "sepulchral",
    explanation: "Suggesting a tomb or grave; very sad, serious, or gloomy.",
    example: "The old, empty house had a dark and sepulchral atmosphere.",
    example1: "The manager delivered the bad news about the company's restructuring in a sepulchral tone that chilled the boardroom."
  },
  {
    id: 2,
    word: "to condemn",
    explanation: "To say very strongly that you think something is bad or wrong.",
    example: "The local community was quick to condemn the vandalism in the park.",
    example1: "International human rights organizations vehemently condemned the regime for its systemic suppression of political dissidents."
  },
  {
    id: 3,
    word: "with the intent of",
    explanation: "With the purpose or goal of doing something.",
    example: "He went to the store with the intent of buying ingredients for dinner.",
    example1: "The legislation was drafted with the express intent of curbing monopolistic practices within the tech industry."
  },
  {
    id: 4,
    word: "to undergo",
    explanation: "To experience something that changes you, or something that is difficult.",
    example: "My grandfather has to undergo surgery on his knee next week.",
    example1: "The corporation will undergo a rigorous internal audit to ensure compliance with the newly enacted financial regulations."
  },
  {
    id: 5,
    word: "to stipulate",
    explanation: "To say exactly how something must be done or what must be included in an agreement.",
    example: "The rental contract stipulates that no pets are allowed in the apartment.",
    example1: "The terms of the settlement stipulate that neither party may disclose the financial details of the agreement to the press."
  },
  {
    id: 6,
    word: "to relieve",
    explanation: "To reduce or remove pain, stress, or a difficult feeling.",
    example: "Taking a hot bath is a great way to relieve stress after a long day at work.",
    example1: "The central bank introduced new fiscal policies to relieve the intense economic pressure on small businesses."
  },
  {
    id: 7,
    word: "rebuke",
    explanation: "To speak angrily to someone because they have done something wrong, or a sharp criticism.",
    example: "The employee received a harsh rebuke from his boss for arriving late again.",
    example1: "The senator's public resignation was widely interpreted as a stinging rebuke of the administration's controversial domestic policies."
  },
  {
    id: 8,
    word: "dignity",
    explanation: "Calm, serious, and controlled behavior that makes people respect you; a sense of self-worth.",
    example: "Despite losing the game, the team accepted their defeat with dignity.",
    example1: "The palliative care program is designed to ensure that terminally ill patients can maintain their autonomy and dignity through the end of life."
  },
  {
    id: 9,
    word: "to administer",
    explanation: "To manage or organize something, or to give someone a medicine or a test.",
    example: "The nurse will administer the pain medication every four hours.",
    example1: "The newly appointed trustee was authorized to administer the estate in accordance with the deceased's final will and testament."
  },
  {
    id: 10,
    word: "consent",
    explanation: "Permission or agreement to do something.",
    example: "You cannot share these photos online without my consent.",
    example1: "In medical research, obtaining informed consent from participants is a non-negotiable ethical and legal prerequisite."
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
