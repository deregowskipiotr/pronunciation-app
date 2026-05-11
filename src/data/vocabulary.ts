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
    word: "No subject-verb inversion",
    explanation: "In indirect questions, keep subject before verb — do not invert like in direct questions.",
    example: "Where is the station?",
    example1: "Can you tell me where the station is?"
  },
  {
    id: 2,
    word: "Remove 'do/does/did' helpers",
    explanation: "Auxiliary verbs 'do/does/did' disappear in indirect questions.",
    example: "What does he want?",
    example1: "I wonder what he wants."
  },
  {
    id: 3,
    word: "Use an introductory phrase",
    explanation: "Start with phrases like 'Could you tell me...', 'Do you know...', 'I wonder...' instead of a direct question.",
    example: "When does the train leave?",
    example1: "Could you tell me when the train leaves?"
  },
  {
    id: 4,
    word: "Use 'if/whether' for yes/no questions",
    explanation: "When the direct question has no question word, add 'if' or 'whether'.",
    example: "Does she like coffee?",
    example1: "I wonder if she likes coffee."
  },
  {
    id: 5,
    word: "Backshift tenses (past main verb)",
    explanation: "If the main verb is past, shift the tense one step back.",
    example: "Where is the bank?",
    example1: "He asked where the bank was."
  },
  {
    id: 6,
    word: "Adjust pronouns",
    explanation: "Change pronouns to match the perspective of the speaker.",
    example: "Do you like my car?",
    example1: "He asked if I liked his car."
  },
  {
    id: 7,
    word: "No question mark (usually)",
    explanation: "Indirect questions as statements end with a period, not a question mark.",
    example: "Where is the station?",
    example1: "I wonder where the station is."
  },
  {
    id: 8,
    word: "'Who/What' as subject",
    explanation: "If who/what is the subject, word order stays almost the same without 'did'.",
    example: "Who called?",
    example1: "I wonder who called."
  },
  {
    id: 9,
    word: "Politeness from intro phrase",
    explanation: "Change formality by changing the introductory phrase (I wonder → Would you mind telling me).",
    example: "What time is it?",
    example1: "Would you mind telling me what time it is?"
  },
  {
    id: 10,
    word: "Embedded questions follow same rules",
    explanation: "Inside longer statements, keep indirect question word order.",
    example: "Why is he sad?",
    example1: "I can't understand why he is sad."
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
