import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/Card";
import { MicButton } from "./ui/MicButton";
import { vocabularyWords } from "@/data/vocabulary";
import { useSpeechTTS } from "@/components/hooks/useSpeechTTS";
import { useSpeechSTT } from "@/components/hooks/useSpeechSTT";

// Helper function for similarity check
const checkPronunciationMatch = (spoken: string, target: string): boolean => {
  const cleanSpoken = spoken
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "");
  const cleanTarget = target
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "");

  if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget)) {
    return true;
  }

  const minLength = Math.min(cleanSpoken.length, cleanTarget.length);
  const maxLength = Math.max(cleanSpoken.length, cleanTarget.length);

  if (maxLength === 0) return false;

  let matches = 0;
  for (let i = 0; i < minLength; i++) {
    if (cleanSpoken[i] === cleanTarget[i]) {
      matches++;
    }
  }

  return matches / maxLength >= 0.7;
};

export const SpeechFlashcard = () => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isFeedbackPositive, setIsFeedbackPositive] = useState(true);

  const feedbackTimeoutRef = useRef<number | null>(null);
  const hasProcessedTranscript = useRef(false);

  // Hooks
  const tts = useSpeechTTS();
  const stt = useSpeechSTT();

  // Get current word
  const currentWord = vocabularyWords[currentWordIndex] || vocabularyWords[0];

  // Reset feedback when word changes
  useEffect(() => {
    setShowFeedback(false);
    hasProcessedTranscript.current = false;

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
  }, [currentWordIndex]);

  // Check speech recognition result
  useEffect(() => {
    if (
      !stt.state.transcript ||
      stt.state.isListening ||
      hasProcessedTranscript.current ||
      showFeedback
    ) {
      return;
    }

    const isMatch = checkPronunciationMatch(
      stt.state.transcript,
      currentWord.word,
    );

    setIsFeedbackPositive(isMatch);
    setShowFeedback(true);
    hasProcessedTranscript.current = true;

    setScore((prev) => ({
      correct: prev.correct + (isMatch ? 1 : 0),
      total: prev.total + 1,
    }));

    feedbackTimeoutRef.current = window.setTimeout(() => {
      const nextIndex = (currentWordIndex + 1) % vocabularyWords.length;
      setCurrentWordIndex(nextIndex);
      setIsCardFlipped(false);
      setShowFeedback(false);
      hasProcessedTranscript.current = false;
      stt.resetTranscript();
    }, 2000);

    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, [
    stt.state.transcript,
    stt.state.isListening,
    currentWord.word,
    currentWordIndex,
    showFeedback,
    stt,
  ]);

  // Handlers
  const handleCardFlip = useCallback(() => {
    setIsCardFlipped((prev) => !prev);
  }, []);

  const handleSpeakWord = useCallback(() => {
    if (tts.supported && currentWord?.word) {
      tts.speakWord(currentWord.word);
    }
  }, [tts, currentWord]);

  const handleSpeakExample = useCallback(() => {
    if (tts.supported && currentWord?.example) {
      tts.speakExample(currentWord.example);
    }
  }, [tts, currentWord]);

  const handleStartListening = useCallback(() => {
    if (stt.state.isSupported && !stt.state.error) {
      stt.resetTranscript();
      stt.startListening();
    }
  }, [stt]);

  const handleStopListening = useCallback(() => {
    if (stt.state.isListening) {
      stt.stopListening();
    }
  }, [stt]);

  const handleResetSession = useCallback(() => {
  // Reset to first word
  setCurrentWordIndex(0);
  
  // Reset all stats
  setScore({ correct: 0, total: 0 });
  
  // Reset UI state
  setIsCardFlipped(false);
  setShowFeedback(false);
  setIsFeedbackPositive(true);
  
  // Reset transcript
  stt.resetTranscript();
  
  // Clear any pending timeouts
  if (feedbackTimeoutRef.current) {
    clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = null;
  }
  hasProcessedTranscript.current = false;
}, [stt]);

  const handleNextWord = useCallback(() => {
    const nextIndex = (currentWordIndex + 1) % vocabularyWords.length;
    setCurrentWordIndex(nextIndex);
    setIsCardFlipped(false);
    setShowFeedback(false);
    hasProcessedTranscript.current = false;
    stt.resetTranscript();
  }, [currentWordIndex, stt]);

  const handlePreviousWord = useCallback(() => {
    const prevIndex =
      currentWordIndex === 0
        ? vocabularyWords.length - 1
        : currentWordIndex - 1;
    setCurrentWordIndex(prevIndex);
    setIsCardFlipped(false);
    setShowFeedback(false);
    hasProcessedTranscript.current = false;
    stt.resetTranscript();
  }, [currentWordIndex, stt]);

  // Calculate accuracy
  const accuracy =
    score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  // Unsupported browser
  if (!tts.supported || !stt.state.isSupported) {
    return (
      <div className="flex flex-col items-center gap-6 p-8 text-center min-h-125 justify-center">
        <h2 className="text-2xl md:text-3xl font-serif text-slate-200 mb-6">
          Speech Flashcards
        </h2>
        <div className="space-y-3 text-slate-400 max-w-md">
          <p className="text-lg">🎤 Requires microphone access</p>
          <p className="text-sm">
            Use Chrome, Edge, or Safari for best results
          </p>
          {!tts.supported && (
            <p className="text-red-400">Text-to-speech not supported</p>
          )}
          {!stt.state.isSupported && (
            <p className="text-red-400">Speech recognition not supported</p>
          )}
          {stt.state.error && <p className="text-red-400">{stt.state.error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 p-2 md:p-4 border border-slate-700/50 rounded-md bg-slate-900/50 backdrop-blur-sm shadow-lg">
      {/* SPLIT SCREEN LAYOUT - Card Left / Controls Right */}
      <div className="flex flex-col lg:flex-row gap-4 w-full md:pt-4 md:px-4">
        {/* LEFT COLUMN - Card only, full height */}
        <div className="w-full lg:w-1/2 flex items-stretch">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWordIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Card
                  word={currentWord}
                  isFlipped={isCardFlipped}
                  onFlip={handleCardFlip}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN - Control Panel, same height */}
        <div className="lg:w-1/2 flex flex-col justify-between min-h-100 md:min-h-120 bg-slate-800/20 rounded-md p-6 border border-slate-700/50">
          {/* TOP SECTION - Stats & Progress */}
          <div className="space-y-2">
            {/* Reset Button - Replaces Streak Badge */}
            <div className="flex justify-end">
              <motion.button
                onClick={handleResetSession}
                className="flex items-center gap-3 md:gap-2 px-4.5 md:px-6.5 py-2 md:mr-0.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-md shadow-md text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <span className="text-md">↻</span>
                <span className="text-slate-400 text-[12px] md:text-md">
                  Reset
                </span>
                <span className="text-sm text-slate-400">
                  session
                </span>
              </motion.button>
            </div>

            {/* Stats Cards - Horizontal */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-md border border-slate-700/50 text-center">
                <div className="text-xs text-slate-400 mb-1">Accuracy</div>
                <div className="text-xl font-bold text-blue-500/50">
                  {accuracy}%
                </div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-md border border-slate-700/50 text-center">
                <div className="text-xs text-slate-400 mb-1">Correct</div>
                <div className="text-xl font-bold text-blue-500/50">
                  {score.correct}
                </div>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-md border border-slate-700/50 text-center">
                <div className="text-xs text-slate-400 mb-1">Total</div>
                <div className="text-xl font-bold text-blue-500/50">
                  {score.total}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[12px] md:text-sm text-slate-400">
                  Session Progress
                </span>
                <span className="text-slate-300 font-medium text-[12px] md:text-sm">
                  {currentWordIndex + 1} / {vocabularyWords.length}
                </span>
              </div>
              <div className="w-full bg-slate-800/50 rounded-full h-2.5 border border-slate-700/50 overflow-hidden">
                <div
                  className="h-full bg-blue-500/50 rounded-full"
                  style={{
                    width: `${((currentWordIndex + 1) / vocabularyWords.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION - TTS Buttons + Mic (Centered) */}
          <div className="space-y-8 py-4">
            {/* TTS Buttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={handleSpeakWord}
                disabled={tts.isSpeaking}
                className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 text-[12px] md:text-sm font-medium transition-colors cursor-pointer"
              >
                🔊 {tts.isSpeaking ? "Speaking..." : "Hear Word"}
              </motion.button>

              <motion.button
                onClick={handleSpeakExample}
                disabled={tts.isSpeaking}
                className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 text-[12px] md:text-sm font-medium transition-colors cursor-pointer"
              >
                💬 Example
              </motion.button>
            </div>

            {/* Mic Button - Centered */}
            <div className="flex flex-col items-center gap-3">
              <MicButton
                isListening={stt.state.isListening}
                onStart={handleStartListening}
                onStop={handleStopListening}
                disabled={tts.isSpeaking || showFeedback}
              />
              <span className="text-[12px] md:text-sm text-slate-400">
                {stt.state.isListening
                  ? "🎤 Listening... Speak now"
                  : "Tap the microphone to speak"}
              </span>
            </div>
          </div>

          {/* BOTTOM SECTION - Navigation */}
          <div className="flex gap-3 pt-4 border-t border-slate-700/50">
            <motion.button
              onClick={handlePreviousWord}
              className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 text-[12px] md:text-sm font-medium transition-colors cursor-pointer"
            >
              ← Previous Word
            </motion.button>
            <motion.button
              onClick={handleNextWord}
              className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 text-[12px] md:text-sm font-medium transition-colors cursor-pointer"
            >
              Next Word →
            </motion.button>
          </div>
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH SECTION - Feedback & Transcript */}
      <div className="w-full mt-2 space-y-4">
        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`py-4 pl-4 md:mx-4 rounded-md ${
                isFeedbackPositive
                  ? "bg-green-500/10 border border-green-400/30"
                  : "bg-amber-500/10 border border-amber-400/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-xl md:text-3xl">
                  {isFeedbackPositive ? "✅" : "⚠️"}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-lg font-semibold text-slate-100">
                    {isFeedbackPositive
                      ? "Great pronunciation!"
                      : "Almost there!"}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Target:{" "}
                    <span className="font-medium text-slate-300">
                      {currentWord.word}
                    </span>
                    {" • "}
                    You said:{" "}
                    <span className="font-medium text-primary-400">
                      "{stt.state.transcript}"
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Transcript - Only when no feedback */}
        {stt.state.transcript && !showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-md text-center"
          >
            <p className="text-slate-400 text-sm">
              You said:{" "}
              <span className="font-semibold text-primary-400">
                "{stt.state.transcript}"
              </span>
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {stt.state.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm text-center"
          >
            {stt.state.error}
          </motion.div>
        )}
      </div>
    </div>
  );
};
