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
    word: "obtuse",
    explanation: "Annoyingly slow to understand; deliberately failing to grasp something obvious.",
    example: "Stop being so obtuse — everyone can see the deadline was moved to Friday.",
    example1: "His strategically obtuse responses during the inquiry served only to cast further suspicion on his conduct."
  },
  {
    id: 2,
    word: "conduit",
    explanation: "A person, channel, or system through which something is transmitted or passed.",
    example: "The local NGO acts as a conduit between the government and rural communities.",
    example1: "Regulatory bodies have raised concerns that shell companies may serve as conduits for capital flight and tax evasion."
  },
  {
    id: 3,
    word: "to lead somebody up (down) the garden path",
    explanation: "To deliberately mislead or deceive someone into a false belief.",
    example: "The salesperson led me down the garden path about the hidden subscription fees.",
    example1: "The glossy prospectus, replete with selective data, was widely seen as an attempt to lead institutional investors up the garden path."
  },
  {
    id: 4,
    word: "to jettison",
    explanation: "To abandon or throw out something that has become a burden or liability.",
    example: "The team decided to jettison the old software and switch to a cloud-based solution.",
    example1: "Faced with mounting regulatory pressure, the conglomerate was compelled to jettison its most contentious overseas acquisitions."
  },
  {
    id: 5,
    word: "phenomenon",
    explanation: "A notable fact, event, or trend that is observed and often studied.",
    example: "Social media influencers are a modern phenomenon that has changed how brands advertise.",
    example1: "The rapid gentrification of inner-city districts constitutes a socioeconomic phenomenon that continues to polarise urban planners and community advocates alike."
  },
  {
    id: 6,
    word: "renowned",
    explanation: "Widely known and admired for a particular skill, quality, or achievement.",
    example: "The city is renowned for its street food and vibrant night markets.",
    example1: "Renowned for her groundbreaking work in behavioural economics, the professor was invited to address the World Economic Forum in Davos."
  },
  {
    id: 7,
    word: "insomuch",
    explanation: "To the degree or extent that; used to qualify a statement's scope.",
    example: "The training was useful insomuch as it covered the basics of data protection.",
    example1: "The reform was only partially effective, insomuch as it addressed procedural shortcomings while leaving the underlying structural inequities entirely intact."
  },
  {
    id: 8,
    word: "cutting-edge",
    explanation: "At the most advanced or innovative stage of development in a field.",
    example: "Their new app uses cutting-edge design to make budgeting feel effortless.",
    example1: "The defence contractor's reliance on cutting-edge satellite imaging capabilities has fundamentally redefined real-time battlefield intelligence."
  },
  {
    id: 9,
    word: "to sift",
    explanation: "To carefully sort through a large amount of information to find what matters.",
    example: "She spent the afternoon sifting through job listings to find roles that matched her skills.",
    example1: "The forensic audit team was tasked with sifting through years of fragmented financial records to identify irregularities concealed across multiple jurisdictions."
  },
  {
    id: 10,
    word: "eerily (similar)",
    explanation: "In a strangely unsettling way, often describing an uncanny resemblance.",
    example: "The twins speak eerily similar to each other, even finishing each other's sentences.",
    example1: "Historians have noted that the sequence of diplomatic miscalculations leading to the current standoff is eerily similar to the brinkmanship that preceded the 1962 Cuban Missile Crisis."
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
