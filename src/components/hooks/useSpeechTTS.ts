import { useState, useCallback, useEffect, useRef } from "react";
import type { UseSpeechTTSReturn } from "@/types";

export const useSpeechTTS = (): UseSpeechTTSReturn => {
  const [supported] = useState(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    if (!supported) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentUtterance.current) {
        // Remove event listeners
        const utterance = currentUtterance.current;
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
      }
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  const getPreferredVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null;

    // Prefer US English voices
    const usVoices = availableVoices.filter((voice) =>
      voice.lang.startsWith("en-US"),
    );

    // Try to find a female voice first (common for language learning)
    const femaleVoice = usVoices.find(
      (voice) =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("samantha"), // Common macOS voice
    );

    return femaleVoice || usVoices[0] || availableVoices[0];
  }, [availableVoices]);

  const speak = useCallback(
    (text: string, rate: number = 0.9, isExample: boolean = false) => {
      if (!supported || !window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return;
      }

      // Cancel only our own utterance, not all speech
      if (currentUtterance.current) {
        window.speechSynthesis.cancel();
        currentUtterance.current = null;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utterance;

      const voice = getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.lang = "en-US";
      utterance.rate = isExample ? 0.85 : rate; // Slower for examples
      utterance.pitch = 1.0;
      utterance.volume = 0.9;

      // Clean up previous listeners
      utterance.onstart = null;
      utterance.onend = null;
      utterance.onerror = null;

      const handleStart = () => setIsSpeaking(true);
      const handleEnd = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      const handleError = (event: SpeechSynthesisErrorEvent) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
        currentUtterance.current = null;

        // Provide user-friendly error messages
        switch (event.error) {
          case "interrupted":
            console.warn("Speech was interrupted");
            break;
          case "audio-busy":
            console.warn("Audio device is busy");
            break;
          case "audio-hardware":
            console.warn("Audio hardware error");
            break;
          case "network":
            console.warn("Network error");
            break;
          default:
            console.warn("Speech synthesis failed");
        }
      };

      utterance.onstart = handleStart;
      utterance.onend = handleEnd;
      utterance.onerror = handleError;

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Failed to speak:", error);
        setIsSpeaking(false);
        currentUtterance.current = null;
      }
    },
    [supported, getPreferredVoice],
  );

  const speakWord = useCallback(
    (word: string) => {
      speak(word, 0.9, false);
    },
    [speak],
  );

  const speakExample = useCallback(
    (sentence: string) => {
      speak(sentence, 0.85, true);
    },
    [speak],
  );

  const stopSpeaking = useCallback(() => {
    if (supported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      currentUtterance.current = null;
    }
  }, [supported]);

  return {
    speakWord,
    speakExample,
    isSpeaking,
    supported,
    stopSpeaking, // Optional: add to your types
    availableVoices, // Optional: for debugging
  };
};
