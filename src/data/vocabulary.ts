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
    word: "to flout",
    explanation: "to intentionally disobey or show no respect for a rule or law",
    example: "Some drivers continue to flout the speed limit even though they know it's dangerous.",
    example1: "The corporation's decision to flout environmental regulations was met with widespread public condemnation and subsequent litigation."
  },
  {
    id: 2,
    word: "entropy",
    explanation: "a gradual decline into disorder or lack of predictability",
    example: "If we don't organize the files soon, the whole system will fall into complete entropy.",
    example1: "The political scientist argued that the nation was experiencing institutional entropy, with long-established norms steadily eroding into chaos."
  },
  {
    id: 3,
    word: "to reign supreme",
    explanation: "to be the most powerful, important, or impressive in a particular area",
    example: "When it comes to mobile photography, that brand still reigns supreme over its competitors.",
    example1: "Despite the influx of innovative startups, the family-owned vineyard reigned supreme, its unparalleled heritage eclipsing any modern marketing campaign."
  },
  {
    id: 4,
    word: "ruling",
    explanation: "an official decision made by a judge, court, or authority",
    example: "The court's ruling stated that the company had to pay compensation to all affected workers.",
    example1: "The landmark ruling set a legal precedent that would reverberate through the industry's regulatory framework for decades to come."
  },
  {
    id: 5,
    word: "to detain",
    explanation: "to officially keep someone somewhere, or to delay them from leaving",
    example: "I'm so sorry I'm late; I was detained at the office by an unexpected phone call.",
    example1: "Border officials have the discretionary authority to detain individuals should their documentation give rise to any substantive suspicion."
  },
  {
    id: 6,
    word: "to put a finger on something",
    explanation: "to identify or describe something that feels wrong or different (often used in the negative: 'can't put my finger on it')",
    example: "There's something different about her haircut, but I can't quite put my finger on it.",
    example1: "The design is aesthetically pleasing, yet I'm unable to put my finger on precisely what undermines the overall cohesion of the piece."
  },
  {
    id: 7,
    word: "remorse",
    explanation: "a strong feeling of guilt and regret for something wrong you have done",
    example: "He showed no remorse for missing the meeting, which really annoyed his manager.",
    example1: "The defendant's palpable lack of remorse was deemed an aggravating factor during the sentencing phase of the trial."
  },
  {
    id: 8,
    word: "untoward",
    explanation: "unexpected and inappropriate or inconvenient",
    example: "If you notice anything untoward happening in the building, please report it to security immediately.",
    example1: "The board assured shareholders that there had been no untoward financial transactions leading up to the merger announcement."
  },
  {
    id: 9,
    word: "preventive",
    explanation: "intended to stop something bad from happening before it occurs",
    example: "The doctor recommended some preventive exercises to help avoid future back pain.",
    example1: "The administration implemented stringent preventive measures in an effort to forestall any potential breach of data security."
  },
  {
    id: 10,
    word: "to plot",
    explanation: "to make a secret plan to do something, often harmful or illegal",
    example: "The group of friends gathered in the kitchen to plot a surprise party for their housemate.",
    example1: "Whistleblower testimony revealed that senior executives had been plotting to manipulate the company's stock valuation for personal gain."
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
