import type { VocabularyWord } from "@/types";

// Update VocabularyWord type to include id (you'll need to update types/index.ts too)
// Add this to your VocabularyWord interface:
// id: number;

export const vocabularyWords: VocabularyWord[] = [
  {
    id: 1,
    word: "benevolence",
    explanation: "Kindness, goodwill, or a desire to do good for others",
    example:
      "The old woman's benevolence was clear when she helped her neighbor with groceries every week.",
    example1:
      "The philanthropist's benevolence extended beyond mere financial contributions, encompassing genuine mentorship and community engagement.",
  },
  {
    id: 2,
    word: "phony",
    explanation: "Fake, not genuine, pretending to be something you're not",
    example:
      "I don't trust him - his smile looks phony, like he's pretending to be nice.",
    example1:
      "The art dealer was exposed for selling phony masterpieces, complete with forged certificates of authenticity.",
  },
  {
    id: 3,
    word: "noble",
    explanation: "Having high moral qualities, showing unselfish behavior",
    example:
      "It was noble of her to give up her seat on the crowded bus to the pregnant woman.",
    example1:
      "His noble pursuit of social justice, despite personal sacrifice, earned him respect across political divides.",
  },
  {
    id: 4,
    word: "gullibility",
    explanation: "The tendency to believe things too easily and be tricked",
    example:
      "His gullibility made him an easy target for online scammers selling fake products.",
    example1:
      "The company's marketing strategy deliberately exploited consumers' gullibility through misleading health claims.",
  },
  {
    id: 5,
    word: "ostensibly",
    explanation: "Apparently, seemingly (but maybe not really)",
    example:
      "He went to the library, ostensibly to study, but actually to meet his friends.",
    example1:
      "The meeting was ostensibly about budget planning, though its true purpose was to discuss leadership restructuring.",
  },
  {
    id: 6,
    word: "sham",
    explanation: "Something false that pretends to be real, a hoax",
    example:
      "The TV competition turned out to be a sham - the winners were chosen before the show started.",
    example1:
      "The clinical trial was exposed as a complete sham, with fabricated data and undisclosed conflicts of interest.",
  },
  {
    id: 7,
    word: "gloat (over somebody/something)",
    explanation:
      "To show too much satisfaction about your success or someone else's failure",
    example:
      "I know you won, but please don't gloat over my loss - it's not nice.",
    example1:
      "Rather than gloating over his rival's dismissal, he maintained a dignified silence that earned him respect.",
  },
  {
    id: 8,
    word: "to barrage",
    explanation:
      "To attack or overwhelm with many things at once (questions, criticisms, etc.)",
    example:
      "The reporters barraged the actor with questions about his private life as he left the theater.",
    example1:
      "During the press conference, the CEO was barraged with hostile questions regarding the company's environmental violations.",
  },
  {
    id: 9,
    word: "dubious",
    explanation: "Doubtful, uncertain, or probably not honest or true",
    example:
      "I'm dubious about his promises - he said he'd help before and never did.",
    example1:
      "The committee viewed his proposal with dubious skepticism, noting several inconsistencies in his methodology.",
  },
  {
    id: 10,
    word: "to cash in on somebody/something",
    explanation:
      "To make money from a situation or person, often in a way that's unfair",
    example:
      "After the singer died, many people tried to cash in on his memory by selling fake souvenirs.",
    example1:
      "Influencers rushed to cash in on the viral trend, producing sponsored content before public interest inevitably waned.",
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
