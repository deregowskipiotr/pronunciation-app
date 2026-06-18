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
    word: "to decimate",
    explanation: "To kill, destroy, or remove a large percentage of something.",
    example: "The disease managed to decimate the local rabbit population in just a few months.",
    example1: "The unexpected economic downturn decimated the startup's revenue, forcing them to pivot their entire business model."
  },
  {
    id: 2,
    word: "replete",
    explanation: "Filled or well-supplied with something.",
    example: "The library is replete with books on every imaginable subject.",
    example1: "His lecture was replete with complex data sets, yet he managed to present them in an accessible, engaging manner."
  },
  {
    id: 3,
    word: "omnicidal",
    explanation: "Inclined to kill everyone or everything; referring to universal destruction.",
    example: "The movie's villain had an omnicidal plan to destroy the entire planet.",
    example1: "The essay offered a bleak analysis of the late 20th-century obsession with nuclear proliferation and its potential omnicidal consequences."
  },
  {
    id: 4,
    word: "in the early aughts",
    explanation: "Referring to the decade from 2000 to 2009.",
    example: "I bought my first mobile phone back in the early aughts.",
    example1: "The rapid expansion of social media platforms fundamentally altered communication patterns, a trend that truly took root in the early aughts."
  },
  {
    id: 5,
    word: "to dissipate",
    explanation: "To gradually disappear, fade away, or scatter.",
    example: "The morning fog began to dissipate as soon as the sun came out.",
    example1: "The initial excitement surrounding the new policy quickly dissipated once the public realized its long-term implementation costs."
  },
  {
    id: 6,
    word: "levee",
    explanation: "An embankment built to prevent the overflow of a river.",
    example: "We walked along the levee to get a better view of the river.",
    example1: "Engineers worked tirelessly to reinforce the levee, fearing that the record-breaking rainfall would lead to catastrophic flooding."
  },
  {
    id: 7,
    word: "to inundate",
    explanation: "To overwhelm someone with things to deal with, or to flood with water.",
    example: "After the commercial aired, the company was inundated with calls from new customers.",
    example1: "The coastal regions were completely inundated following the storm, necessitating an immediate and large-scale emergency response."
  },
  {
    id: 8,
    word: "ineptitude",
    explanation: "A lack of skill or ability; incompetence.",
    example: "The project failed mainly because of the team leader's sheer ineptitude.",
    example1: "The report highlighted a systemic bureaucratic ineptitude that had delayed the infrastructure project by over three years."
  },
  {
    id: 9,
    word: "willful",
    explanation: "Done deliberately, often ignoring the consequences or rights of others.",
    example: "He was accused of willful neglect for failing to fix the dangerous broken stairs.",
    example1: "The prosecutor argued that the defendant's actions constituted willful misconduct, clearly demonstrating an intent to bypass established safety protocols."
  },
  {
    id: 10,
    word: "to skirmish",
    explanation: "To engage in a minor, short-term fight or conflict.",
    example: "The two players started to skirmish briefly after a foul during the match.",
    example1: "Despite the broader ceasefire agreement, forces continued to skirmish along the disputed border, undermining diplomatic efforts."
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
