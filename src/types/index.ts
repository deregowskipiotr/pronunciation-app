

// Core Vocabulary Data Structure
export interface VocabularyWord {
  id: number;
  word: string;
  explanation: string;
  example: string;
  example1: string;
}

// Speech Recognition States
export interface SpeechState {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  error: string | null;
}

// Flashcard Session Management
export interface SessionStats {
  currentCardIndex: number;
  totalCards: number;
  correct: number;
  streak: number;
  sessionId: string;
}

// Speech Feedback Results
export interface SpeechResult {
  isMatch: boolean;
  confidence: number;
  spokenWord: string;
  targetWord: string;
  timestamp: Date;
}

// Component Props
export interface CardProps {
  word: VocabularyWord;
  isFlipped: boolean;
  onFlip: () => void;
}

export interface MicButtonProps {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export interface FeedbackBadgeProps {
  result: SpeechResult | null;
}

export interface ProgressBarProps {
  stats: SessionStats;
}

// Hook Return Types
export interface UseSpeechTTSReturn {
  speakWord: (word: string) => void;
  speakExample: (sentence: string) => void;
  isSpeaking: boolean;
  supported: boolean;
  stopSpeaking?: () => void; // Add this (optional)
  availableVoices?: SpeechSynthesisVoice[]; // Add this (optional)
  selectedVoiceName: string | null;
  setVoice: (voiceName: string) => void;
}

export interface UseSpeechSTTReturn {
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  state: SpeechState;
}

export interface UseFlashcardSessionReturn {
  currentWord: VocabularyWord | null;
  stats: SessionStats;
  nextCard: (wasCorrect: boolean) => void;
  resetSession: () => void;
  isSessionActive: boolean;
}






