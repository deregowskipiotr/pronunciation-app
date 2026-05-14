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
    word: "try as (someone) might",
    explanation: "Used to say that although someone is trying very hard, they cannot do something.",
    example: "Try as he might, he couldn't open the jammed car door.",
    example1: "Try as they might to reconcile the conflicting data, the researchers found no logical correlation."
  },
  {
    id: 2,
    word: "ferocious",
    explanation: "Frighteningly violent, cruel, or intense.",
    example: "A ferocious dog barked at us from behind the garden fence.",
    example1: "The company faced ferocious competition that eventually forced a complete restructuring of their business model."
  },
  {
    id: 3,
    word: "allegedly",
    explanation: "Used when something is said to be true but has not been proved yet.",
    example: "The man allegedly stole a car from the parking lot last night.",
    example1: "The minister was allegedly involved in the embezzlement of public funds, though no formal charges have been filed."
  },
  {
    id: 4,
    word: "contraption",
    explanation: "A machine or device that looks strange or unnecessarily complicated.",
    example: "He built a strange contraption for making toast in the morning.",
    example1: "The basement was filled with various scientific contraptions that seemed to serve no discernable purpose."
  },
  {
    id: 5,
    word: "embedded",
    explanation: "Fixed firmly and deeply in a surrounding mass; an integral part of something.",
    example: "The thorn was deeply embedded in his finger and hard to remove.",
    example1: "Cultural biases are often so deeply embedded in societal structures that they go entirely unnoticed."
  },
  {
    id: 6,
    word: "to solidify",
    explanation: "To make or become hard or solid; to make a plan or idea certain and less likely to change.",
    example: "The molten rock began to solidify as soon as it reached the cold water.",
    example1: "This latest acquisition will help to solidify the corporation's position as a global market leader."
  },
  {
    id: 7,
    word: "capacity",
    explanation: "The maximum amount that something can contain; the ability or power to do something.",
    example: "The stadium has a seating capacity of over 50,000 people.",
    example1: "The intellectual capacity required to grasp these abstract philosophical concepts is quite significant."
  },
  {
    id: 8,
    word: "in its infancy",
    explanation: "To be in a very early stage of development.",
    example: "When my father started his business, the internet was still in its infancy.",
    example1: "While the technology is still in its infancy, its potential to revolutionize the energy sector is undeniable."
  },
  {
    id: 9,
    word: "to scavenge",
    explanation: "To search for and collect anything usable from discarded waste.",
    example: "Wild animals often scavenge for food in city trash cans.",
    example1: "Economically disadvantaged groups are often forced to scavenge for electronic components in massive landfills."
  },
  {
    id: 10,
    word: "extraction",
    explanation: "The process of taking something out, especially by effort or force.",
    example: "The extraction of the tooth was quick and relatively painless.",
    example1: "The environmental impact of mineral extraction in protected rainforests remains a contentious political issue."
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
