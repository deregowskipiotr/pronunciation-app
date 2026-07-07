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
    word: "Present Simple (Positive → Negative)",
    explanation: "When the main sentence is a positive present tense statement without 'to be', use 'don't' or 'doesn't' in the tag.",
    example: "You manage the key accounts, don't you?",
    example1: "He oversees the marketing settlements for the entire division, doesn't he?"
  },
  {
    id: 2,
    word: "Verb 'To Be' (Positive → Negative)",
    explanation: "If the main verb is a form of 'to be' (is/are), simply use its negative form in the tag.",
    example: "The new frontend setup is ready, isn't it?",
    example1: "The overarching architecture is ostensibly flawless, isn't it?"
  },
  {
    id: 3,
    word: "The 'I am' Exception",
    explanation: "This is a strict exception. The negative tag for 'I am' is always 'aren't I?', never 'amn't I'.",
    example: "I am responsible for this project, aren't I?",
    example1: "I am slated to spearhead the upcoming initiative, aren't I?"
  },
  {
    id: 4,
    word: "Negative Statements (Negative → Positive)",
    explanation: "If the main sentence contains a negative auxiliary verb (don't, isn't, haven't), the tag must flip to positive.",
    example: "You don't like dealing with old bugs, do you?",
    example1: "We haven't circumvented the regulatory requirements, have we?"
  },
  {
    id: 5,
    word: "Past Simple (Positive → Negative)",
    explanation: "For positive statements in the past simple tense, the auxiliary verb used in the tag is always 'didn't'.",
    example: "You finished the bootcamp last year, didn't you?",
    example1: "They orchestrated a hostile takeover of the competitor, didn't they?"
  },
  {
    id: 6,
    word: "Present Perfect",
    explanation: "Use 'haven't' or 'hasn't' for positive statements, and 'have' or 'has' for negative ones.",
    example: "We have met before, haven't we?",
    example1: "The board has already ratified the proposed amendments, hasn't it?"
  },
  {
    id: 7,
    word: "Modals (can, will, should)",
    explanation: "Repeat the exact same modal verb in the opposite polarity for the tag.",
    example: "You can write this component in TypeScript, can't you?",
    example1: "Stakeholders shouldn't deviate from the established protocol, should they?"
  },
  {
    id: 8,
    word: "Negative Adverbs (Hidden Negatives)",
    explanation: "Sentences with words like 'never', 'rarely', or 'hardly' are treated as grammatically negative. The tag must be positive.",
    example: "She rarely makes mistakes in her code, does she?",
    example1: "One seldom encounters such an egregious oversight, does one?"
  },
  {
    id: 9,
    word: "Imperatives (Commands)",
    explanation: "For commands or requests, the tag is usually 'will you?' or 'won't you?', regardless of whether the command is positive or negative. Telling someone to do something? → ...will you? / could you? Telling someone NOT to do something? → ...will you? Offering them cake or a chair? (polite requests) → ...won't you?",
    example: "Pass me the laptop, will you?",
    example1: "Join us for a coffee in the kitchen, won't you?"
  },
  {
    id: 10,
    word: "Suggestions with 'Let's'",
    explanation: "When making a suggestion starting with 'Let's', the tag is always fixed as 'shall we?'.",
    example: "Let's review these flashcards, shall we?",
    example1: "Let's endeavor to mitigate the latent risks before proceeding, shall we?"
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
