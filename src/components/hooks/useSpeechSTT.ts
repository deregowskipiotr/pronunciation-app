import { useState, useCallback, useEffect, useRef } from "react";
import type { UseSpeechSTTReturn, SpeechState } from "@/types";

export const useSpeechSTT = (): UseSpeechSTTReturn => {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    transcript: "",
    isSupported: false,
    error: null,
  });

  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const isSupported = !!SpeechRecognitionAPI;
    

    if (isSupported) {
      try {
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setState((prev) => ({
            ...prev,
            isListening: true,
            error: null,
            transcript: "",
          }));
        };

        recognition.onresult = (event: any) => {
          if (event.results && event.results[0]) {
            const transcript = event.results[0][0].transcript;
            setState((prev) => ({
              ...prev,
              transcript,
              isListening: false,
            }));
          }
        };

        recognition.onerror = (event: any) => {
          const errorMessage =
            event.error === "not-allowed" || event.error === "permission-denied"
              ? "Microphone permission denied. Please allow microphone access."
              : `Speech recognition error: ${event.error}`;

          setState((prev) => ({
            ...prev,
            isListening: false,
            error: errorMessage,
          }));
        };

        recognition.onend = () => {
          setState((prev) => ({ ...prev, isListening: false }));
        };

        setState((prev) => ({ ...prev, isSupported: true }));
      } catch (error) {
        console.error("Failed to initialize speech recognition:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to initialize speech recognition",
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        error: "Speech recognition not supported in this browser",
      }));
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setState((prev) => ({
        ...prev,
        error: "Speech recognition not initialized",
      }));
      return;
    }

    if (state.isListening) return;

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Failed to start listening:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to start microphone. Please try again.",
      }));
    }
  }, [state.isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && state.isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Failed to stop listening:", error);
      }
    }
  }, [state.isListening]);

  const resetTranscript = useCallback(() => {
    setState((prev) => ({ ...prev, transcript: "" }));
  }, []);

  return {
    startListening,
    stopListening,
    resetTranscript,
    state,
  };
};
