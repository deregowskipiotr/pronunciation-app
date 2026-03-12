import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 1,
    word: "I will call you tomorrow.",
    explanation:
      "will → would / tomorrow → the next day (future time reference changes)",
    example: "He said he would call me the next day.",
    example1:
      "He assured me that he would contact me the following day without fail.",
  },
  {
    id: 2,
    word: "I must finish this report today.",
    explanation: "must → had to (obligation in the past) / today → that day",
    example: "She said she had to finish the report that day.",
    example1:
      "She emphasized that it was absolutely essential for her to complete the report by the end of that day.",
  },
  {
    id: 3,
    word: "I can speak three languages.",
    explanation: "can → could (ability in the past remains)",
    example: "He told me he could speak three languages.",
    example1:
      "He mentioned during the interview that he was proficient in three different languages.",
  },
  {
    id: 4,
    word: "I am working on the project now.",
    explanation: "present continuous → past continuous / now → then",
    example: "She said she was working on the project then.",
    example1:
      "She explained that she was currently dedicating all her efforts to completing the project.",
  },
  {
    id: 5,
    word: "I have never been to Paris.",
    explanation: "present perfect → past perfect (backshift)",
    example: "He said he had never been to Paris.",
    example1:
      "He confessed that he had never had the opportunity to visit Paris despite his desire to go there.",
  },
  {
    id: 6,
    word: "Please don't tell anyone.",
    explanation: "imperative → ask/tell + infinitive (reporting requests)",
    example: "She asked me not to tell anyone.",
    example1:
      "She begged me to keep the information confidential and not to disclose it to anyone.",
  },
  {
    id: 7,
    word: "I may arrive late tonight.",
    explanation:
      "may → might (possibility becomes less certain) / tonight → that night",
    example: "He said he might arrive late that night.",
    example1:
      "He warned us that there was a possibility he would be delayed and might not arrive until much later that evening.",
  },
  {
    id: 8,
    word: "I bought this car here yesterday.",
    explanation: "this → that / here → there / yesterday → the day before",
    example: "He said he had bought that car there the day before.",
    example1:
      "He mentioned that he had purchased that vehicle at the local dealership just the previous day.",
  },
  {
    id: 9,
    word: "Why are you laughing?",
    explanation:
      "questions → asked + if/whether (yes/no) or question word (wh-questions)",
    example: "She asked me why I was laughing.",
    example1:
      "She inquired curiously what had amused me so much at that particular moment.",
  },
  {
    id: 10,
    word: "I should exercise more often.",
    explanation: "should often stays the same (advice/suggestion)",
    example: "He said he should exercise more often.",
    example1:
      "He admitted that he really ought to incorporate more physical activity into his daily routine.",
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
