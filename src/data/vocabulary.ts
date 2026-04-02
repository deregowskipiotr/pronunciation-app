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

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 1,
    word: "transfixed",
    explanation: "unable to move or stop looking at something because you are so surprised, interested, or frightened",
    example: "She was transfixed by the magician's performance and couldn't look away.",
    example1: "The entire audience remained transfixed as the orchestra delivered a breathtaking rendition of the symphony."
  },
  {
    id: 2,
    word: "vertiginous",
    explanation: "causing or experiencing a feeling of spinning and dizziness, often from great heights",
    example: "The view from the top of the skyscraper was vertiginous and made me step back.",
    example1: "The country's vertiginous economic growth over the past decade has astonished international analysts."
  },
  {
    id: 3,
    word: "to unveil",
    explanation: "to show or make known something new for the first time",
    example: "The company will unveil its new smartphone model at the conference tomorrow.",
    example1: "The museum director will unveil the recently restored Renaissance masterpiece at a private ceremony next week."
  },
  {
    id: 4,
    word: "audacious",
    explanation: "showing a willingness to take bold risks or behaving in a shocking and disrespectful way",
    example: "The young artist made an audacious decision to paint the entire mural in just one day.",
    example1: "The entrepreneur's audacious plan to colonize Mars captured the imagination of millions worldwide."
  },
  {
    id: 5,
    word: "luminary",
    explanation: "a person who is famous and highly respected in a particular field or profession",
    example: "The conference will feature several luminaries from the world of science and technology.",
    example1: "Nobel laureates and other distinguished luminaries gathered at the summit to address climate change."
  },
  {
    id: 6,
    word: "dweller",
    explanation: "a person or animal that lives in a particular type of place",
    example: "City dwellers often dream of moving to the countryside for a quieter life.",
    example1: "The forest dwellers have developed an intricate understanding of medicinal plants over generations."
  },
  {
    id: 7,
    word: "in dire need of",
    explanation: "requiring something very urgent and serious attention or help",
    example: "After hiking for hours without water, they were in dire need of rest and hydration.",
    example1: "The crumbling infrastructure is in dire need of comprehensive renovation before it becomes a safety hazard."
  },
  {
    id: 8,
    word: "to harness",
    explanation: "to control and use something natural, especially energy or power, for a particular purpose",
    example: "Engineers are finding new ways to harness solar energy for everyday use.",
    example1: "The pioneering technology enables farmers to harness rainwater efficiently during the monsoon season."
  },
  {
    id: 9,
    word: "to bid farewell",
    explanation: "to say goodbye to someone, often with good wishes",
    example: "The whole office gathered to bid farewell to their retiring manager.",
    example1: "After three decades of service, colleagues from around the world assembled to bid farewell to the beloved professor."
  },
  {
    id: 10,
    word: "woe",
    explanation: "great sadness or problems that cause suffering",
    example: "She listened patiently as her friend shared all his financial woes.",
    example1: "The novel's protagonist endured countless woes, from betrayal to bankruptcy, before finding redemption."
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
