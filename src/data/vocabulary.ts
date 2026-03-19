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
    word: "to cease",
    explanation: "To stop or come to an end",
    example:
      "The company decided to cease production of the old model because nobody was buying it anymore.",
    example1:
      "Diplomatic efforts to cease hostilities intensified as civilian casualties continued to mount in the conflict zone.",
  },
  {
    id: 2,
    word: "staggering",
    explanation: "Extremely surprising, shocking, or large",
    example:
      "The cost of renovating the old house was staggering - we spent three times more than we expected.",
    example1:
      "The report revealed staggering inequalities in wealth distribution, with the top 1% controlling more than half of global assets.",
  },
  {
    id: 3,
    word: "paramount",
    explanation: "More important than anything else; supreme",
    example:
      "When driving in bad weather, safety is paramount - you should always slow down.",
    example1:
      "In diplomatic negotiations, maintaining mutual respect is paramount to achieving a sustainable long-term agreement.",
  },
  {
    id: 4,
    word: "to ascertain",
    explanation: "To find out or discover something with certainty",
    example:
      "The police are trying to ascertain what happened at the party last night.",
    example1:
      "Researchers conducted extensive interviews to ascertain the long-term effects of remote work on employee well-being.",
  },
  {
    id: 5,
    word: "constituent",
    explanation:
      "One of the parts that form something; or a voter in a particular area",
    example:
      "The basic constituents of this sauce are tomatoes, garlic, and olive oil.",
    example1:
      "The politician held a town hall meeting to address her constituents' growing concerns about local school funding.",
  },
  {
    id: 6,
    word: "tangible",
    explanation: "Real and visible; able to be touched or felt",
    example:
      "After months of work, we finally saw tangible results - the garden was full of flowers.",
    example1:
      "The company's rebranding efforts yielded tangible benefits, including a 40% increase in customer engagement within six months.",
  },
  {
    id: 7,
    word: "to be slated",
    explanation: "To be scheduled or planned for a future event",
    example:
      "The new shopping center is slated to open next spring if construction goes well.",
    example1:
      "The controversial legislation is slated for parliamentary debate next month, despite widespread public opposition.",
  },
  {
    id: 8,
    word: "shrouded in mystery",
    explanation: "Covered or hidden so that little is known about something",
    example:
      "The disappearance of the pilot remains shrouded in mystery - nobody knows what happened to him.",
    example1:
      "The artist's creative process was deliberately shrouded in mystery, adding to the mystique surrounding her most famous works.",
  },
  {
    id: 9,
    word: "laden",
    explanation: "Heavily loaded with something, or full of something",
    example:
      "The Christmas tree was laden with decorations and colorful lights.",
    example1:
      "The documentary was laden with emotional testimony from survivors, making it difficult to watch but impossible to forget.",
  },
  {
    id: 10,
    word: "sweltering",
    explanation: "Extremely and uncomfortably hot",
    example:
      "On that sweltering summer day, everyone stayed inside with the air conditioning on full blast.",
    example1:
      "Despite the sweltering conditions in the packed stadium, spectators remained remarkably enthusiastic throughout the match.",
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
