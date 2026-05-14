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
    word: "if for Yes/No questions",
    explanation: "When a direct question has no question word (yes/no question), use 'if' to introduce the indirect question.",
    example: "Do they live here?",
    example1: "I wonder if they live here."
  },
  {
    id: 2,
    word: "whether (more formal)",
    explanation: "You can use 'whether' instead of 'if' in yes/no questions for a more formal tone.",
    example: "Can Mark join us?",
    example1: "Do you know whether Mark can join us?"
  },
  {
    id: 3,
    word: "Keep wh- words",
    explanation: "For wh- questions (who, what, when, where, why, how), keep the same question word in the indirect question.",
    example: "What time does the train leave?",
    example1: "Do you remember what time the train leaves?"
  },
  {
    id: 4,
    word: "Remove do/does/did",
    explanation: "Auxiliary verbs 'do/does/did' disappear in indirect questions. Change the main verb to past tense if needed.",
    example: "Why did she start crying?",
    example1: "Have you got any idea why she started crying?"
  },
  {
    id: 5,
    word: "I wonder + indirect question",
    explanation: "Use 'I wonder' as an introductory phrase for indirect questions expressing curiosity.",
    example: "Can Peter speak German?",
    example1: "I wonder if Peter can speak German."
  },
  {
    id: 6,
    word: "I'd like to know + indirect question",
    explanation: "Use 'I'd like to know' as a polite introductory phrase.",
    example: "Is Maria going to apply for this job?",
    example1: "I'd like to know if Maria is going to apply for this job."
  },
  {
    id: 7,
    word: "Could you tell me + indirect question",
    explanation: "Use 'Could you tell me' for a polite request. Keep normal subject-verb order.",
    example: "Where is the nearest taxi rank?",
    example1: "Could you tell me where the nearest taxi rank is?"
  },
  {
    id: 8,
    word: "Do you know + indirect question",
    explanation: "Use 'Do you know' to ask if someone has information about something.",
    example: "Have they ever been to China?",
    example1: "Do you know if they have ever been to China?"
  },
  {
    id: 9,
    word: "Would you mind telling me",
    explanation: "The most polite introductory phrase. Use 'would' and keep normal word order.",
    example: "When will you move out?",
    example1: "Would you mind telling me when you will move out?"
  },
  {
    id: 10,
    word: "No question mark",
    explanation: "Indirect questions that are part of a statement end with a period, not a question mark.",
    example: "Is everyone ready?",
    example1: "I'd like to know if everyone is ready."
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
