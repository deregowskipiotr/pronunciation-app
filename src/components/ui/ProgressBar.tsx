import type { ProgressBarProps } from "@/types";

export const ProgressBar = ({ stats }: ProgressBarProps) => {
  const progress = (stats.currentCardIndex / stats.totalCards) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-slate-400">
        <span>
          {stats.currentCardIndex + 1} / {stats.totalCards}
        </span>
        <span>Streak: {stats.streak}</span>
      </div>

      <div className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-primary-400 to-primary-500 rounded-full shadow-sm transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
