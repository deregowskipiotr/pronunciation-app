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
    word: "rationale",
    explanation: "The underlying reason or logical basis for a course of action or a belief.",
    example: "I don't really understand the rationale behind this new company rule.",
    example1: "The CEO articulated a compelling rationale for the merger, emphasizing long-term synergies and market expansion."
  },
  {
    id: 2,
    word: "to abandon",
    explanation: "To leave a place, thing, or person forever, or to stop doing something before it is finished.",
    example: "We had to abandon the car because it broke down in the middle of nowhere.",
    example1: "The developers were forced to abandon the ambitious project due to a severe depletion of capital funding."
  },
  {
    id: 3,
    word: "fertility",
    explanation: "The quality of being able to produce young, or the ability of soil to support plant growth.",
    example: "The fertility of the soil in this region makes it perfect for farming.",
    example1: "The demographic report indicated a sharp decline in national fertility rates, prompting concerns about future labor shortages."
  },
  {
    id: 4,
    word: "to decelerate",
    explanation: "To slow down or to reduce the speed of something.",
    example: "You need to decelerate when you are driving near a school.",
    example1: "The central bank implemented measures designed to decelerate inflation without triggering an economic recession."
  },
  {
    id: 5,
    word: "to penalize",
    explanation: "To punish someone for breaking a rule or law, or to put someone at a disadvantage.",
    example: "The teacher will penalize you if you hand in your homework late.",
    example1: "New environmental regulations will heavily penalize corporations that fail to meet strict carbon emission targets."
  },
  {
    id: 6,
    word: "to sterilize",
    explanation: "To make something completely clean and free from bacteria, or to medically prevent reproduction.",
    example: "You must thoroughly sterilize the baby's bottles before using them.",
    example1: "The veterinary clinic launched a proactive campaign to sterilize feral cat populations to ethically manage urban wildlife."
  },
  {
    id: 7,
    word: "baby hatch",
    explanation: "A designated, safe place where parents can anonymously leave an infant they are unable to care for. (PL: okno życia)",
    example: "The local hospital installed a baby hatch to help desperate mothers who cannot keep their newborns.",
    example1: "The introduction of the baby hatch has sparked complex ethical debates regarding child welfare and the right to parental anonymity."
  },
  {
    id: 8,
    word: "to exacerbate",
    explanation: "To make a problem, bad situation, or negative feeling worse.",
    example: "Scratching your mosquito bites will only exacerbate the itching.",
    example1: "The government's sudden decision to cut public funding will undoubtedly exacerbate the ongoing housing crisis."
  },
  {
    id: 9,
    word: "lucid",
    explanation: "Expressed clearly and easy to understand; or showing an ability to think clearly.",
    example: "The teacher gave a very lucid explanation of the difficult math problem.",
    example1: "Despite his advanced age and declining health, the witness remained entirely lucid and capable of giving a reliable testimony."
  },
  {
    id: 10,
    word: "ca. (circa)",
    explanation: "An abbreviation meaning approximately or about. It is almost always used before dates, years, or numbers. (PL: około)",
    example: "The old town hall was built ca. 1920, though the exact year was lost in the records.",
    example1: "The artifact, carbon-dated to ca. 400 BCE, fundamentally challenges our previous understanding of ancient trade routes."
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
