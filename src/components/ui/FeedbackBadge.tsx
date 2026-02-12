import type { FeedbackBadgeProps } from "@/types";

export const FeedbackBadge = ({ result }: FeedbackBadgeProps) => {
  if (!result) return null;

  const isCorrect = result.isMatch;

  return (
    <div
      className={`
      p-4 md:p-6 rounded-md shadow-md text-center
      border-2 transition-all duration-300
      ${
        isCorrect
          ? "bg-green-500/20 border-green-500/50 ring-2 ring-green-400/50"
          : "bg-red-500/20 border-red-500/50 ring-2 ring-red-400/50"
      }
    `}
    >
      <div
        className={`text-4xl mb-3 ${isCorrect ? "text-green-400" : "text-red-400"}`}
      >
        {isCorrect ? "✅" : "❌"}
      </div>

      <p className="text-lg font-semibold text-slate-100 mb-2">
        {isCorrect ? "Perfect!" : "Try again"}
      </p>

      <p className="text-sm text-slate-300">
        Target:{" "}
        <strong className="text-primary-400">{result.targetWord}</strong>
      </p>
      <p className="text-sm text-slate-400">
        You said: <strong>"{result.spokenWord}"</strong>
      </p>

      {result.confidence && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <div className="w-full bg-slate-800/50 rounded-full h-2">
            <div
              className="bg-linear-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(result.confidence * 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {Math.round(result.confidence * 100)}% match
          </p>
        </div>
      )}
    </div>
  );
};
