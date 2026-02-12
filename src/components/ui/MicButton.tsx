import { motion } from "framer-motion";
import type { MicButtonProps } from "@/types";

export const MicButton = ({
  isListening,
  onStart,
  onStop,
  disabled = false,
}: MicButtonProps) => {
  const handleClick = () => {
    if (disabled) return;
    if (isListening) {
      onStop();
    } else {
      onStart();
    }
  };

  const getAriaLabel = () => {
    if (disabled) return "Microphone disabled";
    return isListening ? "Stop listening" : "Start listening";
  };

  return (
    <motion.button
      className={`
        relative w-20 h-20 md:w-24 md:h-24 mx-auto
        border rounded-full shadow-md
        flex items-center justify-center
        transition-all duration-200
        active:scale-[0.97]
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-900
        ${
          disabled
            ? "bg-slate-700/30 border-slate-600/10 cursor-not-allowed"
            : isListening
              ? "bg-primary-500/40 border-primary-400/70 ring-2 ring-primary-400/70 shadow-xl shadow-primary-500/25 cursor-pointer"
              : "bg-primary-500/20 border-primary-400/50 hover:bg-primary-500/30 hover:border-primary-400 cursor-pointer"
        }
      `}
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.001 }}
      whileTap={disabled ? {} : { scale: 0.999 }}
      aria-label={getAriaLabel()}
      aria-live="polite"
      aria-busy={isListening}
    >
      {/* Mic Icon */}
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className={`transition-colors ${
          disabled ? "text-slate-500" : "text-primary-300"
        }`}
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: disabled ? 0.5 : isListening ? 1 : 0.8,
          scale: disabled ? 1 : isListening ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        {!isListening ? (
          // Mic off state
          <>
            <path
              d="M12 15c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3s-3 1.343-3 3v6c0 1.657 1.343 3 3 3z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 10v1a7 7 0 0 1-14 0v-1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 19v-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        ) : (
          // Mic on (listening) state
          <>
            {/* Outer ring animation */}
            <motion.path
              d="M12 15c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3s-3 1.343-3 3v6c0 1.657 1.343 3 3 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                strokeWidth: [1.5, 2.5, 1.5],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <path
              d="M19 10v1a7 7 0 0 1-14 0v-1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12 19v-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Inner dot */}
            <circle cx="12" cy="11" r="2" fill="currentColor">
              <animate
                attributeName="r"
                values="2;3;2"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </motion.svg>

      {/* Listening indicator dot */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900"
        initial={{ scale: 0 }}
        animate={{
          scale: isListening && !disabled ? 1 : 0,
          backgroundColor: isListening ? "#ef4444" : "#3b82f6",
        }}
        transition={{ type: "spring", stiffness: 500 }}
      />

      {/* Status text for screen readers */}
      <span className="sr-only">
        {disabled
          ? "Microphone disabled"
          : isListening
            ? "Listening... Speak now"
            : "Click to start speaking"}
      </span>

      {/* Tooltip for better UX */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        {disabled
          ? "Unavailable"
          : isListening
            ? "Click to stop"
            : "Click to speak"}
      </div>
    </motion.button>
  );
};
