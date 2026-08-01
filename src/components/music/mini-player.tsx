import { useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { useMusic } from "./music-player-provider";
import { ProgressBar } from "./progress-bar";

export function MiniPlayer() {
  const { current, isPlaying, toggle, next, previous, progress, duration, seek, muted, toggleMute } =
    useMusic();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Mini music player"
      className="fixed right-3 bottom-3 left-3 z-40 sm:left-auto sm:w-[22rem]"
    >
      <div className="glass grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-3xl p-3">
        <img
          src={current.cover}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          className="size-12 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{current.title}</p>
          <div className="mt-1.5">
            <ProgressBar
              progress={progress}
              duration={duration}
              onSeek={seek}
              label="Seek in mini player"
              compact
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous track"
            className="hidden size-9 place-items-center rounded-full text-primary hover:bg-secondary sm:grid"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="hidden size-9 place-items-center rounded-full text-primary hover:bg-secondary sm:grid"
          >
            <SkipForward className="size-4" />
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="grid size-9 place-items-center rounded-full text-primary hover:bg-secondary"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Hide mini player"
            className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}