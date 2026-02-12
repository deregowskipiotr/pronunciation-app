import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeechTTS } from "@/components/hooks/useSpeechTTS";

interface VoiceSelectorProps {
  tts: ReturnType<typeof useSpeechTTS>;
  className?: string;
}

export const VoiceSelector = ({ tts, className = "" }: VoiceSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter to only English voices
  const englishVoices =
    tts.availableVoices?.filter(
      (voice) =>
        voice.lang.startsWith("en") ||
        voice.lang.startsWith("en-US") ||
        voice.lang.startsWith("en-GB"),
    ) || [];

  // Group voices by language
  const usVoices = englishVoices.filter((v) => v.lang.includes("US"));
  const ukVoices = englishVoices.filter((v) => v.lang.includes("GB"));
  const otherVoices = englishVoices.filter(
    (v) => !v.lang.includes("US") && !v.lang.includes("GB"),
  );

  // Get current voice name for display
  const currentVoice = tts.availableVoices?.find(
    (v) => v.name === tts.selectedVoiceName,
  );

  const displayName = currentVoice
    ? currentVoice.name
        .replace(
          /(English|United States|United Kingdom|\(.\)|Microsoft|Google|Online|Natural|Neural|Multilingual)/gi,
          "",
        )
        .trim()
        .substring(0, 12) + (currentVoice.name.length > 12 ? "..." : "")
    : "Default";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Voice Button - EXACT same as Reset button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md shadow-md text-slate-400 hover:text-slate-300 transition-colors cursor-pointer text-[12px] md:text-sm font-medium whitespace-nowrap"
        aria-label="Select voice"
      >
        <span className="text-sm md:text-base">🎤</span>
        <span className="hidden md:inline text-slate-400">Voice:</span>
        <span className="font-medium text-blue-500/50 truncate max-w-15 md:max-w-20">
          {displayName}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] md:text-xs text-slate-500"
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Dropdown Menu - unchanged, keep as is */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-slate-900 border border-slate-700/50 rounded-lg shadow-xl z-50"
          >
            {/* ... rest of dropdown content unchanged ... */}
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-primary-400 border-b border-slate-700/50">
                Select Voice
              </div>

              {/* US Voices */}
              {usVoices.length > 0 && (
                <div className="mt-2">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                    American English
                  </div>
                  {usVoices.map((voice) => (
                    <VoiceOption
                      key={voice.name}
                      voice={voice}
                      isSelected={tts.selectedVoiceName === voice.name}
                      onSelect={() => {
                        tts.setVoice(voice.name);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* UK Voices */}
              {ukVoices.length > 0 && (
                <div className="mt-2">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                    British English
                  </div>
                  {ukVoices.map((voice) => (
                    <VoiceOption
                      key={voice.name}
                      voice={voice}
                      isSelected={tts.selectedVoiceName === voice.name}
                      onSelect={() => {
                        tts.setVoice(voice.name);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Other English voices */}
              {otherVoices.length > 0 && (
                <div className="mt-2">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                    Other English
                  </div>
                  {otherVoices.map((voice) => (
                    <VoiceOption
                      key={voice.name}
                      voice={voice}
                      isSelected={tts.selectedVoiceName === voice.name}
                      onSelect={() => {
                        tts.setVoice(voice.name);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Default option */}
              <div className="mt-2 pt-2 border-t border-slate-700/50">
                <VoiceOption
                  voice={
                    { name: "System Default", lang: "" } as SpeechSynthesisVoice
                  }
                  isSelected={!tts.selectedVoiceName}
                  onSelect={() => {
                    tts.setVoice("");
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Voice Option Component - unchanged
const VoiceOption = ({
  voice,
  isSelected,
  onSelect,
}: {
  voice: SpeechSynthesisVoice;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  // Clean up voice name for display
  const cleanName =
    voice.name
      ?.replace(
        /(\(.+?\)|Microsoft|Google|Natural|Online|Neural|Multilingual)/gi,
        "",
      )
      .trim() || "System Default";

  const langDisplay = voice.lang?.toUpperCase() || "DEFAULT";

  return (
    <motion.button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
        isSelected
          ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
          : "hover:bg-slate-800/80 text-slate-400 hover:text-slate-300"
      }`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium truncate max-w-35">{cleanName}</span>
        <span className="text-[10px] text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded">
          {langDisplay}
        </span>
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          ✅
        </motion.div>
      )}
    </motion.button>
  );
};
