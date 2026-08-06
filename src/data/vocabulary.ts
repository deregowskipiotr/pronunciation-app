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
    word: "bewilderment",
    explanation: "A feeling of being extremely confused.",
    example: "She looked at the complicated instructions in total bewilderment.",
    example1: "The sudden and unannounced shift in corporate strategy was met with widespread bewilderment among the stakeholders."
  },
  {
    id: 2,
    word: "punitive",
    explanation: "Intended as a punishment.",
    example: "The teacher took punitive action against the students who cheated on the test.",
    example1: "The court imposed severe punitive damages on the corporation to deter future environmental negligence."
  },
  {
    id: 3,
    word: "captivity",
    explanation: "The state of being kept in a confined space, like a prison or a zoo.",
    example: "Animals born in captivity often cannot survive if released into the wild.",
    example1: "The documentary highlights the profound psychological toll that prolonged captivity exacts on political prisoners."
  },
  {
    id: 4,
    word: "adjacent",
    explanation: "Next to or joining something else.",
    example: "My hotel room is adjacent to the swimming pool, so it can be quite noisy.",
    example1: "The proposed infrastructure project will heavily impact the adjacent parcels of agricultural land."
  },
  {
    id: 5,
    word: "inmate",
    explanation: "A person living in an institution such as a prison or hospital.",
    example: "The inmates are allowed to exercise in the yard for one hour a day.",
    example1: "The facility implemented a rigorous educational program aimed at reducing recidivism rates among departing inmates."
  },
  {
    id: 6,
    word: "to incarcerate",
    explanation: "To put or keep someone in prison.",
    example: "He was incarcerated for five years after being caught stealing cars.",
    example1: "Critics argue that the current justice system is excessively prone to incarcerating non-violent drug offenders."
  },
  {
    id: 7,
    word: "heinous",
    explanation: "Very bad, shocking, and evil (usually describing a crime).",
    example: "Kidnapping is considered a heinous crime by the entire community.",
    example1: "The tribunal was convened to prosecute those responsible for the heinous atrocities committed during the conflict."
  },
  {
    id: 8,
    word: "penitentiary",
    explanation: "A state or federal prison for serious offenders.",
    example: "He was transferred to a high-security penitentiary on the other side of the country.",
    example1: "The investigative journalist exposed systemic corruption operating within the walls of the state penitentiary."
  },
  {
    id: 9,
    word: "to be entitled to",
    explanation: "Having the right to do or have something.",
    example: "If you work full-time, you are entitled to four weeks of paid vacation.",
    example1: "As a major shareholder, you are inherently entitled to scrutinize the company's financial disclosures before publication."
  },
  {
    id: 10,
    word: "to allocate",
    explanation: "To give a share of something (like time or money) for a specific purpose.",
    example: "The manager decided to allocate more money to the marketing team this year.",
    example1: "The steering committee faced a formidable challenge in attempting to allocate the finite resources equitably among competing departments."
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
