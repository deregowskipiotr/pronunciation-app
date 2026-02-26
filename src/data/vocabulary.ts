import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 1,
    word: "Wednesday",
    explanation: "In a sad or depressed manner.",
    example: "She looked gloomily at the rain outside.",
    example1: "He sighed gloomily, contemplating the futility of his efforts.",
  },
  {
    id: 2,
    word: "February",
    explanation: "Extremely frightened; unable to move.",
    example: "The child was petrified of the big dog.",
    example1:
      "She stood petrified, her heart racing in the face of imminent danger.",
  },
  {
    id: 3,
    word: "Receipt",
    explanation: "To hesitate or be indecisive.",
    example: "He started to dither about which shirt to wear.",
    example1: "The committee continued to dither, exacerbating the crisis.",
  },
  {
    id: 4,
    word: "Iron",
    explanation: "Without success.",
    example: "I tried to fix it, but to no avail.",
    example1:
      "Their diplomatic efforts proved to no avail amid escalating tensions.",
  },
  {
    id: 5,
    word: "Think",
    explanation: "To invent a new word or phrase.",
    example: "She likes to coin funny names for her pets.",
    example1: "The author coined the term to describe modern alienation.",
  },
  {
    id: 6,
    word: "Pizza",
    explanation: "A difficult or dangerous situation.",
    example: "The plight of homeless people is sad.",
    example1:
      "The refugees' plight highlighted systemic failures in aid distribution.",
  },
  {
    id: 7,
    word: "Those",
    explanation: "To move quickly from place to place.",
    example: "Butterflies flit from flower to flower.",
    example1: "Thoughts flitted through her mind as she pondered the proposal.",
  },
  {
    id: 8,
    word: "Water",
    explanation: "Wealthy; having plenty of money.",
    example: "They live in an affluent neighborhood.",
    example1: "Affluent suburbs often boast superior amenities and schools.",
  },
  {
    id: 9,
    word: "Women",
    explanation: "The world is full of opportunities.",
    example: "With your skills, the world is your oyster.",
    example1: "Having graduated top of her class, the world was her oyster.",
  },
  {
    id: 10,
    word: "who zjeść my sandwiches",
    explanation: "Great size, extent, or importance.",
    example: "The magnitude of the problem is huge.",
    example1: "The scandal's magnitude threatened to topple the government.",
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
