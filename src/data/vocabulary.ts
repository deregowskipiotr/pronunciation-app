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
    word: "saunter",
    explanation: "To walk in a slow, relaxed manner, without hurry or effort.",
    example: "We decided to saunter along the beach after dinner to enjoy the sunset.",
    example1: "Rather than rushing to the meeting, he sauntered into the boardroom with an air of absolute confidence."
  },
  {
    id: 2,
    word: "to disown",
    explanation: "To refuse to acknowledge or maintain any connection with someone or something.",
    example: "His parents threatened to disown him if he decided to quit university.",
    example1: "The politician was forced to publicly disown the controversial remarks made by his former campaign manager."
  },
  {
    id: 3,
    word: "to put it bluntly",
    explanation: "To speak in a direct, honest, and sometimes rude way without trying to be polite.",
    example: "To put it bluntly, your performance on this project was simply not good enough.",
    example1: "To put it bluntly, the company’s current financial strategy is fundamentally flawed and entirely unsustainable."
  },
  {
    id: 4,
    word: "to surrender",
    explanation: "To stop fighting and admit defeat, or to give up control of something.",
    example: "After being surrounded by the police, the thieves finally decided to surrender.",
    example1: "The CEO was eventually compelled to surrender her executive powers following a prolonged and bitter boardroom dispute."
  },
  {
    id: 5,
    word: "batch",
    explanation: "A quantity or number of things produced or dealt with at one time.",
    example: "I baked a fresh batch of chocolate chip cookies for the school party.",
    example1: "The quality assurance team rejected the entire batch of microchips due to a microscopic anomaly detected during stress testing."
  },
  {
    id: 6,
    word: "trenchant",
    explanation: "Vigorous, clear, and sharply effective in expression or style.",
    example: "She wrote a trenchant review of the new movie, pointing out all its obvious flaws.",
    example1: "His trenchant critique of the administration's foreign policy resonated deeply with the disillusioned electorate."
  },
  {
    id: 7,
    word: "(to be) amenable to reason",
    explanation: "Willing to listen to logic, accept suggestions, and change one's mind.",
    example: "Luckily, the manager was amenable to reason and gave us an extra day to finish the work.",
    example1: "One hopes that the opposing counsel will prove amenable to reason during the arbitration proceedings, thereby avoiding a lengthy trial."
  },
  {
    id: 8,
    word: "nonplussed",
    explanation: "So surprised and confused that one is unsure how to react.",
    example: "I was completely nonplussed when my normally quiet coworker suddenly started yelling.",
    example1: "Even the veteran journalist was visibly nonplussed by the sudden, sweeping changes to the geopolitical landscape."
  },
  {
    id: 9,
    word: "inconclusive",
    explanation: "Not leading to a firm or final result; not ending doubt or dispute.",
    example: "The medical tests were inconclusive, so the doctor had to order more blood work.",
    example1: "Despite extensive cross-examination, the witness's testimony remained inconclusive, leaving the jury with substantial reasonable doubt."
  },
  {
    id: 10,
    word: "when push comes to shove",
    explanation: "When a situation becomes critical, serious, or requires a difficult decision to be made.",
    example: "He talks a lot about helping out, but when push comes to shove, he's never actually there.",
    example1: "Corporate sustainability pledges are laudable, but when push comes to shove, most conglomerates will prioritize shareholder dividends over environmental ethics."
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
