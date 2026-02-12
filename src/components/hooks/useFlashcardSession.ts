import { useState, useCallback } from "react";
import { getShuffledWords } from "@/data/vocabulary";
import type {
  UseFlashcardSessionReturn,
  VocabularyWord,
  SessionStats,
} from "@/types";

export const useFlashcardSession = (
  words?: VocabularyWord[],
): UseFlashcardSessionReturn => {
  const [stats, setStats] = useState<SessionStats>(() => ({
    currentCardIndex: 0,
    totalCards: 10,
    correct: 0,
    streak: 0,
    sessionId: Date.now().toString(), // Now inside a function
  }));

  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>(() => {
    const shuffled = words
      ? getShuffledWords(words.length)
      : getShuffledWords();
    return shuffled;
  });

  const [currentWord, setCurrentWord] = useState<VocabularyWord | null>(() => {
    const shuffled = words
      ? getShuffledWords(words.length)
      : getShuffledWords();
    return shuffled[0] || null;
  });

  const nextCard = useCallback(
    (wasCorrect: boolean) => {
      const nextIndex = stats.currentCardIndex + 1;

      setStats((prev) => ({
        ...prev,
        currentCardIndex: nextIndex,
        ...(wasCorrect && {
          correct: prev.correct + 1,
          streak: prev.streak + 1,
        }),
        ...(nextIndex >= stats.totalCards && {
          streak: 0, // Reset streak on session end
        }),
      }));

      if (nextIndex < sessionWords.length) {
        setCurrentWord(sessionWords[nextIndex]);
      } else {
        // Session complete - restart
        setCurrentWord(null);
        setTimeout(() => {
          setStats(() => ({
            currentCardIndex: 0,
            totalCards: 10,
            correct: 0,
            streak: 0,
            sessionId: Date.now().toString(), // Also fixed here
          }));
          const newWords = getShuffledWords();
          setSessionWords(newWords);
          setCurrentWord(newWords[0]);
        }, 1500);
      }
    },
    [stats.currentCardIndex, stats.totalCards, sessionWords],
  );

  const resetSession = useCallback(() => {
    setStats(() => ({
      currentCardIndex: 0,
      totalCards: 10,
      correct: 0,
      streak: 0,
      sessionId: Date.now().toString(), // Also fixed here
    }));
    const newWords = getShuffledWords();
    setSessionWords(newWords);
    setCurrentWord(newWords[0]);
  }, []);

  return {
    currentWord,
    stats,
    nextCard,
    resetSession,
    isSessionActive: !!currentWord,
  };
};
