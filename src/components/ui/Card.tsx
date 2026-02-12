import { motion, AnimatePresence } from "framer-motion";
import type { CardProps } from "@/types";

interface CardComponentProps extends CardProps {
  className?: string;
}

export const Card = ({
  word,
  isFlipped,
  onFlip,
  className = "",
}: CardComponentProps) => {
  return (
    <div
      className={`
        relative w-full min-h-110 md:min-h-129 
        bg-slate-900/50 backdrop-blur-sm 
        border border-slate-700/50 hover:border-primary-400
        rounded-md shadow-lg p-8
        transition-colors duration-200
        cursor-pointer
        ${className}
      `}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onFlip();
        }
      }}
      aria-label={`Flashcard for ${word.word}. ${isFlipped ? "Showing definition" : "Showing word"}. Press space or enter to flip.`}
    >
      {/* MAIN CONTENT AREA - Fixed positioning grid */}
      <div className="absolute inset-0 flex flex-col p-6 md:p-8 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            // FRONT SIDE
            <motion.div
              key="front"
              className="absolute inset-0 grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-full w-full"
              initial={{ rotateY: 0, opacity: 1 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* TITLE - Fixed top-center position */}
              <div className="row-start-1 w-full flex justify-center pt-12 md:pt-16">
                <motion.h2
                  className="text-xl md:text-4xl font-serif uppercase italic text-blue-300/70 drop-shadow-lg text-center max-w-full truncate"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {word.word}
                </motion.h2>
              </div>

              {/* EXPLANATION - Fixed middle position */}
              <div className="row-start-2 w-full flex justify-center px-4">
                <motion.div
                  className="text-slate-400 max-w-md text-center leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-slate-300 text-md md:text-xl font-serif italic">
                    {word.explanation}
                  </p>
                </motion.div>
              </div>

              {/* TAP TO FLIP - Fixed bottom-left */}
              <div className="row-start-3 w-full flex justify-start pb-6 md:pb-8 pl-6">
                <motion.p
                  className="hidden md:block text-slate-500 text-sm bg-slate-900/50 px-3 py-1 rounded-md backdrop-blur-sm border border-slate-700/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  tap to flip ↔ see usage examples
                </motion.p>
              </div>
            </motion.div>
          ) : (
            // BACK SIDE - SAME STRUCTURE AS FRONT
            <motion.div
              key="back"
              className="absolute inset-0 grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-full w-full"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* TITLE - Fixed top-center position (WITH MOTION) */}
              <div className="row-start-1 w-full flex justify-center pt-10">
                <motion.h2 // ← ADDED MOTION ANIMATION
                  className="text-xl md:text-4xl font-serif uppercase italic text-blue-300/70 drop-shadow-lg text-center max-w-full truncate"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {word.word}
                </motion.h2>
              </div>

              {/* EXAMPLES - Fixed middle position */}
              <div className="row-start-2 w-full flex justify-center px-4">
                <div className="w-full space-y-4 px-2">
                  <motion.div
                    className="bg-slate-800/30 p-4 md:p-6 rounded-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <p className="text-sm md:text-[18px] font-medium text-primary-400 mb-2">
                      B1/B2 Example:
                    </p>
                    <p className="text-slate-300 italic leading-relaxed text-[12px] md:text-[16px]">
                      "{word.example}"
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-slate-800/30 p-4 md:p-6 rounded-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <p className="text-sm md:text-[18px] font-medium text-primary-400 mb-2">
                      C1 Example:
                    </p>
                    <p className="text-slate-300 italic font-semibold leading-relaxed text-[12px] md:text-[16px]">
                      "{word.example1}"
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* TAP TO FLIP - Fixed bottom-left */}
              <div className="row-start-3 w-full flex justify-start pb-6 md:pb-8 pl-6">
                <motion.p // ← ADDED MOTION ANIMATION
                  className="hidden md:block text-slate-500 text-sm bg-slate-900/50 px-3 py-1 rounded-md backdrop-blur-sm border border-slate-700/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  tap to flip ↔ back to word
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLIP INDICATOR - Fixed bottom-right (always visible) */}
      <div className="absolute bottom-6 md:bottom-8 right-6 pointer-events-none">
        <div className="text-slate-500 text-sm flex items-center gap-3 bg-slate-900/70 px-3 py-1 rounded-md backdrop-blur-sm border border-slate-700/40 shadow-lg">
          <motion.span
            className="transform transition-transform duration-500"
            animate={{ rotate: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            ↻
          </motion.span>
          <span >Flip</span>
        </div>
      </div>
    </div>
  );
};
