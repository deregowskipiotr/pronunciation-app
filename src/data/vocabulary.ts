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
    word: "obtuse",
    explanation: "Slow to understand or insensitive.",
    example: "Don't be so obtuse; it was obvious she was just trying to help.",
    example1: "His deliberate attempt to remain obtuse during policy negotiations frustrated the whole committee."
  },
  {
    id: 2,
    word: "conduit",
    explanation: "A channel or means through which something passes or spreads.",
    example: "The port city acts as a major conduit for trade between the two regions.",
    example1: "Financial institutions can inadvertently become conduits for illicit international monetary transfers."
  },
  {
    id: 3,
    word: "to lead somebody up (down) the garden path",
    explanation: "To intentionally deceive or mislead someone.",
    example: "I thought he was being honest, but he was leading me down the garden path.",
    example1: "The inflated revenue projections were designed to lead potential investors up the garden path."
  },
  {
    id: 4,
    word: "to jettison",
    explanation: "To discard or get rid of something no longer useful.",
    example: "We had to jettison our outdoor party plans when the severe storm hit.",
    example1: "To maintain fiscal stability, the board voted to jettison several underperforming subsidiaries."
  },
  {
    id: 5,
    word: "phenomenon",
    explanation: "A remarkable, observable event or occurrence.",
    example: "The northern lights are a natural phenomenon that draws visitors worldwide.",
    example1: "Sociologists are analyzing the phenomenon of remote work and its long-term impact on urban infrastructure."
  },
  {
    id: 6,
    word: "renowned",
    explanation: "Famous and respected for a specific quality or achievement.",
    example: "She is a renowned chef who owns three popular restaurants downtown.",
    example1: "The symposium featured several world-renowned scholars addressing climate economics."
  },
  {
    id: 7,
    word: "insomuch",
    explanation: "To the extent or degree that (often used as 'insomuch as').",
    example: "The campaign succeeded insomuch as it raised public awareness quickly.",
    example1: "The policy was controversial, insomuch as it restricted individual freedoms under the guise of public safety."
  },
  {
    id: 8,
    word: "cutting-edge",
    explanation: "Extremely modern, advanced, or innovative.",
    example: "The university built a new research facility equipped with cutting-edge tools.",
    example1: "Leveraging cutting-edge machine learning algorithms gave the startup a significant market advantage."
  },
  {
    id: 9,
    word: "to sift",
    explanation: "To examine something thoroughly to find what is useful or important.",
    example: "I had to sift through hundreds of emails to locate the receipt.",
    example1: "Investigators had to sift through gigabytes of raw metadata to reconstruct the sequence of events."
  },
  {
    id: 10,
    word: "eerily (similar)",
    explanation: "Strange, unsettling, or mysterious (often describing a resemblance).",
    example: "Their singing voices sound eerily similar over the phone.",
    example1: "The geopolitical tension today bears an eerily similar resemblance to the conditions prior to the conflict."
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
