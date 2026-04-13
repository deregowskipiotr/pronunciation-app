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
    word: "to loom",
    explanation: "to appear as a large, unclear, and often threatening shape; (of an event) to be imminent and cause worry",
    example: "A big storm was looming on the horizon, so we decided to stay home.",
    example1: "The prospect of mass layoffs loomed over the company, casting a pall on the annual meeting.",
  },
  {
    id: 2,
    word: "augury",
    explanation: "a sign of what will happen in the future; an omen",
    example: "They saw the rainbow as a good augury for their journey.",
    example1: "The sudden drop in consumer confidence was an ominous augury of the impending recession.",
  },
  {
    id: 3,
    word: "to aggravate",
    explanation: "to make a problem or situation worse; to annoy someone",
    example: "Don't scratch the mosquito bite, or you'll aggravate the itching.",
    example1: "His dismissive comments only served to aggravate the already tense diplomatic negotiations.",
  },
  {
    id: 4,
    word: "to prohibit",
    explanation: "to officially forbid something by law, rule, or authority",
    example: "The school strictly prohibits students from using phones during class.",
    example1: "International law unequivocally prohibits the use of chemical weapons under any circumstances.",
  },
  {
    id: 5,
    word: "to delineate",
    explanation: "to describe, outline, or mark the boundaries of something precisely",
    example: "The map clearly delineates the borders between the two countries.",
    example1: "In her latest paper, the researcher meticulously delineates the causal mechanisms driving climate change.",
  },
  {
    id: 6,
    word: "legitimate",
    explanation: "allowed by law or rules; reasonable and acceptable",
    example: "You have a legitimate reason to ask for a refund if the product is damaged.",
    example1: "The government must find a balance between national security and citizens' legitimate expectation of privacy.",
  },
  {
    id: 7,
    word: "inappropriate",
    explanation: "not suitable, proper, or acceptable in a particular situation",
    example: "Wearing flip-flops to a job interview is highly inappropriate.",
    example1: "The CEO resigned after making inappropriate remarks that violated the company's code of conduct.",
  },
  {
    id: 8,
    word: "to disclose",
    explanation: "to reveal or make known information that was previously secret",
    example: "The doctor cannot disclose your medical records without your permission.",
    example1: "The whistleblower was protected by law after choosing to disclose classified evidence of fraud.",
  },
  {
    id: 9,
    word: "primarily",
    explanation: "mainly; for the most part",
    example: "The course is primarily designed for beginners, but advanced students can also join.",
    example1: "While the study focuses primarily on economic factors, it does not entirely disregard sociocultural influences.",
  },
  {
    id: 10,
    word: "incentive",
    explanation: "something that motivates or encourages someone to do something",
    example: "The company offers a cash incentive for employees who meet their sales targets.",
    example1: "Tax incentives are often deployed to stimulate investment in renewable energy infrastructure.",
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
