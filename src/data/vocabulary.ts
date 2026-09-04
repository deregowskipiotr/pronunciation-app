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
    explanation: "Using exaggerated, dramatic stories to grab attention and boost engagement.",
    example: "My friend stopped watching that channel because it uses sensationalism instead of real news.",
    example1: "Critics argue that the network's reliance on sensationalism has eroded its journalistic integrity and public trust."
  },
  {
    id: 2,
    word: "bias",
    explanation: "An unfair tendency to favor one person, group, or opinion over others.",
    example: "I try to read news from a few different websites so I can spot any political bias.",
    example1: "The report was criticized for its inherent confirmation bias, selectively presenting data that reinforced the authors' preconceived conclusions."
  },
  {
    id: 3,
    word: "credibility",
    explanation: "The quality of being trusted and believed by others based on your track record.",
    example: "Once a journalist publishes a false story, it's very hard to rebuild their credibility.",
    example1: "The think tank's credibility was called into question after undisclosed funding ties to the industry it was evaluating came to light."
  },
  {
    id: 4,
    word: "clickbait",
    explanation: "Misleading or exaggerated headlines designed only to make you click a link.",
    example: "I clicked on that article, but it was just clickbait — there was nothing useful inside.",
    example1: "The platform's algorithm inadvertently incentivizes clickbait by rewarding engagement metrics over journalistic accuracy and substance."
  },
  {
    id: 5,
    word: "verification",
    explanation: "The process of confirming that information or facts are accurate and real.",
    example: "Before sharing anything online, do a quick verification to make sure it's actually true.",
    example1: "Independent source verification is a cornerstone of responsible reporting, safeguarding against the inadvertent propagation of misinformation."
  },
  {
    id: 6,
    word: "whistleblower",
    explanation: "Someone who reports illegal or dishonest activity happening inside their organization.",
    example: "A whistleblower from inside the company warned the public about the data breach.",
    example1: "Without robust legal protections for whistleblowers, employees face significant professional and personal risk when exposing institutional wrongdoing."
  },
  {
    id: 7,
    word: "editorial",
    explanation: "A newspaper or magazine article that gives the official opinion of its editors.",
    example: "The newspaper wrote an editorial calling on the government to change its media policy.",
    example1: "The editorial board issued a strongly worded statement condemning the proposed legislation as a direct threat to press freedom."
  },
  {
    id: 8,
    word: "allegation",
    explanation: "A claim that someone did something wrong, which hasn't been proven yet.",
    example: "The manager faced allegations of dishonesty, but nothing was confirmed.",
    example1: "The company categorically denied the allegations of financial misconduct, vowing to cooperate fully with the ongoing regulatory inquiry."
  },
  {
    id: 9,
    word: "distort",
    explanation: "To change or misrepresent facts so they no longer reflect the truth.",
    example: "Some politicians distort statistics to make their policies look better than they really are.",
    example1: "Selective editing can profoundly distort the meaning of an interview, leading viewers to draw entirely false conclusions."
  },
  {
    id: 10,
    word: "defamation",
    explanation: "The act of damaging someone's reputation by spreading false information about them.",
    example: "She considered taking the blogger to court for defamation after he posted lies about her.",
    example1: "The case established a significant precedent in digital defamation law, holding online platforms partially liable for hosting unverified damaging content."
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
