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
    word: "Insufficient",
    explanation: "Not enough in quantity, amount, strength, or quality to meet a particular need or requirement.",
    example: "We don't have sufficient time to finish the project today.",
    example1: "The evidence provided was insufficient to support the company's claims."
  },
  {
    id: 2,
    word: "Inadequate",
    explanation: "Not good enough or not suitable for a particular purpose, standard, or situation.",
    example: "The hotel provided inadequate facilities for its guests.",
    example1: "The current safety measures are inadequate to protect employees from potential risks."
  },
  {
    id: 3,
    word: "Disrupts",
    explanation: "Interrupts or prevents something from continuing normally, often causing problems or delays.",
    example: "Loud construction work disrupts my concentration when I'm working from home.",
    example1: "The unexpected staff shortage disrupts the company's ability to maintain its usual level of service."
  },
  {
    id: 4,
    word: "Futile",
    explanation: "Unsuccessful or pointless because there is little or no chance of achieving the desired result.",
    example: "It's futile to argue with him when he refuses to listen.",
    example1: "Without additional funding, any attempt to complete the project on time would be futile."
  },
  {
    id: 5,
    word: "Deprivation",
    explanation: "The condition of not having something essential or important, such as food, sleep, freedom, or basic living conditions.",
    example: "Lack of sleep can lead to serious sleep deprivation.",
    example1: "Prolonged deprivation of basic resources can have a lasting impact on people's physical and mental well-being."
  },
  {
    id: 6,
    word: "Neglect",
    explanation: "The failure to give someone or something the care, attention, or consideration they need; it can also mean to fail to do something important.",
    example: "Don't neglect your health just because you're busy at work.",
    example1: "The company neglected to address employees' concerns, which eventually damaged workplace morale."
  },
  {
    id: 7,
    word: "Snaps",
    explanation: "Can mean suddenly breaks, speaks angrily or impatiently, or suddenly loses emotional control. The exact meaning depends on context.",
    example: "He sometimes snaps at people when he's under a lot of pressure.",
    example1: "After weeks of constant criticism and stress, she finally snaps and tells her manager exactly what she thinks."
  },
  {
    id: 8,
    word: "Aforementioned",
    explanation: "Used in formal English to refer to someone or something that has already been mentioned.",
    example: "Please contact the aforementioned person for more information.",
    example1: "The aforementioned issues must be resolved before the company can proceed with the proposed changes."
  },
  {
    id: 9,
    word: "Congestive",
    explanation: "Relating to congestion, especially an abnormal build-up of fluid or blood in a part of the body; commonly used in medical terminology.",
    example: "The doctor explained that congestive heart failure is a serious medical condition.",
    example1: "Congestive heart failure can cause fluid to accumulate in the lungs and other parts of the body."
  },
  {
    id: 10,
    word: "Substantially",
    explanation: "To a large or considerable degree; significantly in amount, size, or importance.",
    example: "The new system has substantially reduced the time needed to process orders.",
    example1: "The company's operating costs increased substantially following the expansion into new markets."
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
