import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { useMusic } from "@/components/music/music-player-provider";
import { ProgressBar } from "@/components/music/progress-bar";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Our Playlist — Friendship Day" },
      {
        name: "description",
        content: "The songs that are permanently attached to memories of you, with a full player.",
      },
      { property: "og:title", content: "Our Playlist — Friendship Day" },
      { property: "og:description", content: "Songs permanently attached to memories of you." },
    ],
  }),
  component: MusicPage,
});

function MusicPage() {
  const {
    tracks,
    current,
    currentIndex,
    isPlaying,
    toggle,
    play,
    next,
    previous,
    progress,
    duration,
    seek,
    volume,
    muted,
    setVolume,
    toggleMute,
  } = useMusic();

  return (
    <PageShell
      eyebrow="Now Playing"
      title="Our Playlist"
      intro="press play — these are attached to memories of you"
      nextTo="/games"
      nextLabel="Play a little game"
    >
      <Reveal>
        <section aria-label="Music player" className="glass mx-auto max-w-3xl rounded-3xl p-6">
          <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <img
              src={current.cover}
              alt=""
              width={320}
              height={320}
              loading="lazy"
              className="mx-auto size-40 rounded-3xl object-cover shadow-lift"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.28em] text-accent uppercase">
                Now playing
              </p>
              <h2 className="mt-1 truncate text-3xl font-bold text-foreground">{current.title}</h2>
              <p className="text-muted-foreground">{current.subtitle}</p>

              <div className="mt-5">
                <ProgressBar progress={progress} duration={duration} onSeek={seek} />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous track"
                  className="grid size-11 place-items-center rounded-full bg-secondary text-primary"
                >
                  <SkipBack className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
                >
                  {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next track"
                  className="grid size-11 place-items-center rounded-full bg-secondary text-primary"
                >
                  <SkipForward className="size-5" />
                </button>

                <div className="flex min-w-40 flex-1 items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                    className="grid size-11 place-items-center rounded-full text-primary hover:bg-secondary"
                  >
                    {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                    aria-label="Volume"
                    className="h-2 w-full min-w-0 cursor-pointer accent-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={120} className="mt-10">
        <h2 className="text-center text-2xl font-bold text-foreground">The playlist</h2>
        <ul className="mx-auto mt-5 max-w-3xl space-y-3">
          {tracks.map((track, index) => {
            const isCurrent = index === currentIndex;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => play(index)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`card-lift grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl p-3 text-left ${
                    isCurrent ? "bg-primary text-primary-foreground" : "glass text-foreground"
                  }`}
                >
                  <img
                    src={track.cover}
                    alt=""
                    width={128}
                    height={128}
                    loading="lazy"
                    className="size-14 shrink-0 rounded-xl object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{track.title}</span>
                    <span className="block truncate text-sm opacity-80">{track.subtitle}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 pr-2">
                    {isCurrent && isPlaying ? "❚❚" : "▶"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </PageShell>
  );
}