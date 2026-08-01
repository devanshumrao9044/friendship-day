import { formatTime } from "./music-player-provider";

type Props = {
  progress: number;
  duration: number;
  onSeek: (seconds: number) => void;
  label?: string;
  compact?: boolean;
};

export function ProgressBar({ progress, duration, onSeek, label = "Seek track", compact }: Props) {
  const max = duration > 0 ? duration : 0;
  const percent = max > 0 ? (progress / max) * 100 : 0;

  return (
    <div className="flex w-full min-w-0 items-center gap-3">
      <div className="relative h-2 min-w-0 flex-1">
        <div className="absolute inset-0 rounded-full bg-secondary" aria-hidden="true" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-150"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
        <input
          type="range"
          min={0}
          max={max || 1}
          step={0.1}
          value={Math.min(progress, max || 1)}
          onChange={(event) => onSeek(Number(event.target.value))}
          aria-label={label}
          aria-valuetext={`${formatTime(progress)} of ${formatTime(max)}`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      {!compact && (
        <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
          {formatTime(progress)} / {formatTime(max)}
        </span>
      )}
    </div>
  );
}