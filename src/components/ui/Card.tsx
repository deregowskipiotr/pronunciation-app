import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CardProps } from "@/types";

interface CardComponentProps extends CardProps {
  className?: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const Card = ({
  word,
  isFlipped,
  onFlip,
  onNext,
  onPrevious,
  className = "",
}: CardComponentProps) => {
  // Track flip direction for correct rotation
  const [, setFlipKey] = useState(0);
  const prevFlipped = useRef(isFlipped);

  // Detect flip direction change
  if (prevFlipped.current !== isFlipped) {
    prevFlipped.current = isFlipped;
    setFlipKey((k) => k + 1);
  }

  // Content crossfade for Prev/Next word changes
  const textVariants = {
    enter: { opacity: 0, filter: "blur(6px)" },
    center: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(6px)" },
  };

  const textTransition = {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  return (
    <div
      className={`
        relative w-full min-h-100 md:min-h-129 
        bg-slate-900/50 backdrop-blur-sm 
        border border-slate-700/50
        rounded-md shadow-lg p-8
        transition-colors duration-500
        cursor-pointer
        ${className}
      `}
      style={{ perspective: "1200px" }}
      onClick={onFlip}
      aria-label={`Flashcard for ${word.word}. ${isFlipped ? "Showing definition" : "Showing word"}. Press space or enter to flip.`}
    >
      {/* MAIN CONTENT AREA */}
      <div className="absolute inset-0 p-6 md:px-4 md:py-1 pointer-events-none">
        {/* Static Title - always visible, no animation */}
        <div className="absolute top-0 left-0 right-0 pt-4 md:pt-6 pointer-events-none">
          <h2 className="text-xl md:text-3xl font-serif uppercase italic text-blue-500/50 drop-shadow-lg text-center max-w-md mx-auto">
            {word.word}
          </h2>
        </div>

        {/* Flip Container - only the middle content flips */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            top: "15%", 
            bottom: "15%",
            perspective: "1200px"
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* ──── FRONT FACE (Explanation) ──── */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center px-4"
              style={{ backfaceVisibility: "hidden" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={word.explanation + "-front-explanation"}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ ...textTransition }}
                  className="text-slate-400 max-w-md text-center leading-relaxed"
                >
                  <p className="text-slate-300 text-md md:text-xl font-serif italic">
                    {word.explanation}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ──── BACK FACE (Examples) ──── */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center px-4"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={word.word + "-back-examples"}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ ...textTransition }}
                  className="w-full max-w-md space-y-4 px-2"
                >
                  <div className="bg-slate-800/30 p-4 md:p-6 rounded-md">
                    <p className="text-sm md:text-[18px] font-medium text-primary-400 mb-2">
                      B1/B2 Example:
                    </p>
                    <p className="text-slate-300 italic leading-relaxed text-[12px] md:text-[16px]">
                      "{word.example}"
                    </p>
                  </div>

                  <div className="bg-slate-800/30 p-4 md:p-6 rounded-md">
                    <p className="text-sm md:text-[18px] font-medium text-primary-400 mb-2">
                      C1 Example:
                    </p>
                    <p className="text-slate-300 italic font-semibold leading-relaxed text-[12px] md:text-[16px]">
                      "{word.example1}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Static Buttons - always visible, no animation */}
        <div className="absolute bottom-0 left-0 right-0 pb-4 md:pb-6 px-2 md:px-4 pointer-events-auto">
          <div className="w-full flex gap-2 md:gap-3">
            <button
              type="button"
              className="flex-1 px-2 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 transition-colors cursor-pointer text-[12px] md:text-sm font-medium whitespace-nowrap"
              onClick={(e) => { e.stopPropagation(); onPrevious?.(); }}
            >
              <span className="md:hidden">← Prev</span>
              <span className="hidden md:inline">← Previously Word</span>
            </button>
            <button
              type="button"
              className="flex-1 flex justify-center items-center gap-1.5 px-2 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 transition-colors cursor-pointer text-[12px] md:text-sm font-medium whitespace-nowrap"
              onClick={(e) => { e.stopPropagation(); onFlip(); }}
            >
              <motion.span
                animate={{ rotate: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="text-base md:text-lg leading-none"
              >
                ↻
              </motion.span>
              <span>Flip</span>
            </button>
            <button
              type="button"
              className="flex-1 px-2 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-md text-slate-400 hover:text-slate-300 transition-colors cursor-pointer text-[12px] md:text-sm font-medium whitespace-nowrap"
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
            >
              <span className="md:hidden">Next →</span>
              <span className="hidden md:inline">Next Word →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};