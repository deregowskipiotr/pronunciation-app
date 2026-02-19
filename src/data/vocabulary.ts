import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 21,
    word: "specific",
    explanation: "Clearly defined or identified; precise and detailed.",
    example:
      "Please be more specific about your requirements so I can help you better.",
    example1:
      "The doctor gave specific instructions about when to take the medication.",
  },
  {
    id: 22,
    word: "clothes",
    explanation: "Items worn to cover the body; garments.",
    example: "I need to buy new clothes for the job interview tomorrow.",
    example1:
      "The designer's clothes were featured in fashion magazines worldwide.",
  },
  {
    id: 23,
    word: "picture",
    explanation:
      "A visual representation created using paint, photography, or other methods.",
    example: "Let me take a picture of the beautiful sunset.",
    example1:
      "The artist's picture captured the raw emotion of the moment perfectly.",
  },
  {
    id: 24,
    word: "vegetable",
    explanation:
      "A plant or part of a plant used as food, typically savory rather than sweet.",
    example: "You should eat at least five portions of vegetables every day.",
    example1: "The restaurant sources its vegetables from local organic farms.",
  },
  {
    id: 25,
    word: "suite",
    explanation:
      "A set of rooms designed for a particular purpose, or a set of matching furniture.",
    example: "We booked a suite at the hotel for our anniversary weekend.",
    example1:
      "The software suite includes programs for word processing, spreadsheets, and presentations.",
  },
  {
    id: 26,
    word: "entrepreneur",
    explanation:
      "A person who organizes and operates a business, taking on financial risk.",
    example:
      "She's a young entrepreneur who started her own tech company at age 22.",
    example1:
      "The entrepreneur pitched her innovative idea to several investors.",
  },
  {
    id: 27,
    word: "height",
    explanation: "The measurement of how tall a person or object is.",
    example: "What's the height of that building? It looks enormous.",
    example1: "The athlete's height gave him an advantage in basketball.",
  },
  {
    id: 28,
    word: "queue",
    explanation: "A line of people or vehicles waiting for something.",
    example: "There was a long queue outside the cinema for the new movie.",
    example1:
      "Customers joined the virtual queue online before the product launch.",
  },
  {
    id: 29,
    word: "almond",
    explanation:
      "An edible oval nut with a hard shell, or the tree that produces it.",
    example: "Would you like some almond milk in your coffee?",
    example1: "The cake was decorated with sliced almonds and fresh berries.",
  },
  {
    id: 30,
    word: "comfortable",
    explanation:
      "Providing physical ease and relaxation; free from stress or discomfort.",
    example: "These shoes are very comfortable for walking long distances.",
    example1:
      "She felt comfortable enough with the team to share her honest opinion.",
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
