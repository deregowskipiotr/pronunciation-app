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
    word: "venturing",
    explanation: "daring to go somewhere or do something that may be risky or uncertain",
    example: "After years of working from home, she's finally venturing back into the office a few days a week.",
    example1: "The multinational corporation is venturing into untapped emerging markets, fully cognizant of the regulatory and logistical hurdles that lie ahead."
  },
  {
    id: 2,
    word: "dogged",
    explanation: "showing persistent determination to continue doing something despite difficulties",
    example: "Her dogged determination to finish the marathon, even with an injured knee, impressed everyone watching.",
    example1: "The journalist's dogged pursuit of the truth, in the face of considerable institutional obstruction, ultimately unearthed a scandal of unprecedented proportions."
  },
  {
    id: 3,
    word: "relayed",
    explanation: "passed on or communicated information from one person to another",
    example: "I relayed your message to the team leader, so she should know about the change by now.",
    example1: "The ambassador relayed the confidential communiqué to the foreign ministry with the utmost discretion, fully aware of its potential diplomatic ramifications."
  },
  {
    id: 4,
    word: "blip",
    explanation: "a small, temporary problem or change from what is normal or expected",
    example: "The drop in sales last month was just a blip; overall, the business is doing really well this year.",
    example1: "The chief economist dismissed the quarterly downturn as a mere statistical blip rather than an indicator of any structural recession."
  },
  {
    id: 5,
    word: "pave the way",
    explanation: "to create conditions that make it possible for something to happen or succeed later",
    example: "Learning English well can really pave the way for better job opportunities in the future.",
    example1: "The groundbreaking bilateral agreement is expected to pave the way for unprecedented economic cooperation between the two historically antagonistic nations."
  },
  {
    id: 6,
    word: "presence",
    explanation: "the state of being in a particular place, or the noticeable effect someone or something has",
    example: "The company wants to expand its presence in the Asian market over the next five years.",
    example1: "Her formidable presence at the negotiating table commanded unwavering attention from all delegates, fundamentally shifting the trajectory of the discussions."
  },
  {
    id: 7,
    word: "beset",
    explanation: "troubled or affected by many problems or difficulties constantly",
    example: "The construction project has been beset by delays since day one, mainly due to bad weather.",
    example1: "The fledgling democracy, already beset by rampant corruption and civil unrest, now faces the looming spectre of economic collapse."
  },
  {
    id: 8,
    word: "nonrecurring",
    explanation: "happening only once and not repeated, often used in finance for one-time costs",
    example: "Don't worry about that expensive repair bill in the report; it's a nonrecurring cost this year only.",
    example1: "Investors are advised to disregard the nonrecurring impairment charge when assessing the company's underlying profitability and long-term growth trajectory."
  },
  {
    id: 9,
    word: "passed on",
    explanation: "given or transmitted something to someone else, also can mean to decline an opportunity or to die",
    example: "I was offered the manager position, but I passed on it because the timing wasn't right for my family.",
    example1: "Having meticulously cultivated his expertise over decades, he passed on the intricate craft to his apprentice, ensuring the tradition would not die with him."
  },
  {
    id: 10,
    word: "under way",
    explanation: "already started and currently happening or in progress",
    example: "The preparations for the annual conference are already under way, so we need to finalize the guest list soon.",
    example1: "A comprehensive investigation into the systemic failures is now under way, with a parliamentary committee expected to deliver its findings within the fiscal quarter."
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
