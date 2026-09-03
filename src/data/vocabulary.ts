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
    word: "sensationalism",
    explanation: "Exaggerating news to excite or shock people.",
    example: "Many online news channels use sensationalism to get more views.",
    example1: "The media outlets resorted to sensationalism, prioritizing shock value over factual accuracy."
  },
  {
    id: 2,
    word: "bias",
    explanation: "A strong preference or unfair favor toward one side of an issue.",
    example: "It is important to read news from different sources to notice political bias.",
    example1: "Unconscious editorial bias can subtly shape public perception without readers realizing it."
  },
  {
    id: 3,
    word: "credibility",
    explanation: "The quality of being trusted, believable, or respected.",
    example: "Spreading unverified stories quickly ruins a journalist's credibility.",
    example1: "The publication's long-standing credibility was severely undermined by the unvetted report."
  },
  {
    id: 4,
    word: "clickbait",
    explanation: "Content with misleading headlines designed to encourage online clicks.",
    example: "That article had a dramatic title, but it was just pure clickbait.",
    example1: "Aggressive clickbait tactics have diminished the overall quality of digital journalism."
  },
  {
    id: 5,
    word: "verification",
    explanation: "The process of checking whether something is accurate and true.",
    example: "Fact-checkers focus on the verification of news before publishing it.",
    example1: "Rigorous source verification remains essential to maintaining professional ethical standards."
  },
  {
    id: 6,
    word: "whistleblower",
    explanation: "A person who reveals secretive, unethical, or illegal actions in an organization.",
    example: "The leak came from a whistleblower inside the media company.",
    example1: "Protected by anonymity, the whistleblower exposed systemic corporate misconduct to the press."
  },
  {
    id: 7,
    word: "editorial",
    explanation: "An article expressing the official opinion of an editor or publisher.",
    example: "The newspaper published an editorial about social media rules.",
    example1: "The editor-in-chief authored a poignant editorial criticizing recent legislative changes."
  },
  {
    id: 8,
    word: "allegation",
    explanation: "A claim that someone did something wrong, made without proof yet.",
    example: "The politician denied all allegations of spreading fake news.",
    example1: "Substantiating such serious corruption allegations requires incontrovertible evidence."
  },
  {
    id: 9,
    word: "distort",
    explanation: "To twist or alter facts so they are no longer truthful.",
    example: "Some broadcasts distort the truth to make stories sound dramatic.",
    example1: "Manipulative headlines can distort public discourse by presenting out-of-context quotes."
  },
  {
    id: 10,
    word: "defamation",
    explanation: "The act of harming someone's reputation with false statements.",
    example: "The actor sued the magazine for defamation after they published fake rumors.",
    example1: "High-profile defamation lawsuits highlight the legal risks of circulating unverified claims."
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
