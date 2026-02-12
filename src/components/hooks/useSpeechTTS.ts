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
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(
    () => {
      // Load saved voice preference from localStorage
      if (typeof window !== "undefined") {
        return localStorage.getItem("preferredVoice");
      }
      return null;
    },
  );

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

  // Save voice preference
  const saveVoicePreference = useCallback((voiceName: string) => {
    setSelectedVoiceName(voiceName);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredVoice", voiceName);
    }
  }, []);

  const getPreferredVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null;

    // 1. Try to use saved voice preference
    if (selectedVoiceName) {
      const savedVoice = availableVoices.find(
        (voice) => voice.name === selectedVoiceName,
      );
      if (savedVoice) return savedVoice;
    }

    // 2. Try to find a female US English voice
    const usVoices = availableVoices.filter((voice) =>
      voice.lang.startsWith("en-US"),
    );

    const femaleVoice = usVoices.find(
      (voice) =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("samantha") || // macOS
        voice.name.toLowerCase().includes("google") || // Android/Chrome
        voice.name.toLowerCase().includes("zira") || // Windows
        voice.name.toLowerCase().includes("helena") || // Some systems
        voice.name.toLowerCase().includes("sara"), // Some systems
    );

    // 3. Fallback to any US English voice
    if (femaleVoice) {
      // Save this as preference for next time
      saveVoicePreference(femaleVoice.name);
      return femaleVoice;
    }

    if (usVoices[0]) {
      saveVoicePreference(usVoices[0].name);
      return usVoices[0];
    }

    // 4. Last resort: any voice
    if (availableVoices[0]) {
      saveVoicePreference(availableVoices[0].name);
      return availableVoices[0];
    }

    return null;
  }, [availableVoices, selectedVoiceName, saveVoicePreference]);

  const speak = useCallback(
    (text: string, rate: number = 0.9, isExample: boolean = false) => {
      if (!supported || !window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return;
      }

      // Cancel current speech
      if (currentUtterance.current) {
        window.speechSynthesis.cancel();
        currentUtterance.current = null;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utterance;

      // Apply voice preference
      const voice = getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.lang = "en-US";
      utterance.rate = isExample ? 0.85 : rate;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;

      // Set up event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
        currentUtterance.current = null;
      };

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

  const setVoice = useCallback(
    (voiceName: string) => {
      saveVoicePreference(voiceName);
    },
    [saveVoicePreference],
  );

  return {
    speakWord,
    speakExample,
    isSpeaking,
    supported,
    stopSpeaking,
    availableVoices,
    selectedVoiceName,
    setVoice, // Add this to change voice programmatically
  };
};
