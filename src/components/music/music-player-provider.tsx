import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { playlist, type Track } from "@/lib/site-data";

type MusicContextValue = {
  tracks: Track[];
  current: Track;
  currentIndex: number;
  isPlaying: boolean;
  duration: number;
  progress: number;
  volume: number;
  muted: boolean;
  toggle: () => void;
  play: (index?: number) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.7;
    audioRef.current = audio;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setCurrentIndex((i) => (i + 1) % playlist.length);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Load the selected track, keeping playback state in sync.
  const wasPlayingRef = useRef(false);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[currentIndex]!.src;
    audio.load();
    setProgress(0);
    setDuration(0);
    if (wasPlayingRef.current) {
      void audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  useEffect(() => {
    wasPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const play = useCallback((index?: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (typeof index === "number") {
      wasPlayingRef.current = true;
      setCurrentIndex((prev) => {
        if (prev === index) {
          void audio.play().catch(() => setIsPlaying(false));
        }
        return index;
      });
      return;
    }
    void audio.play().catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, []);

  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % playlist.length), []);
  const previous = useCallback(
    () => setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length),
    [],
  );

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(seconds)) return;
    audio.currentTime = seconds;
    setProgress(seconds);
  }, []);

  const setVolume = useCallback((value: number) => {
    const audio = audioRef.current;
    setVolumeState(value);
    if (audio) {
      audio.volume = value;
      audio.muted = value === 0;
    }
    setMuted(value === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
  }, []);

  const value = useMemo<MusicContextValue>(
    () => ({
      tracks: playlist,
      current: playlist[currentIndex]!,
      currentIndex,
      isPlaying,
      duration,
      progress,
      volume,
      muted,
      toggle,
      play,
      pause,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
    }),
    [
      currentIndex,
      isPlaying,
      duration,
      progress,
      volume,
      muted,
      toggle,
      play,
      pause,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
    ],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicPlayerProvider");
  return ctx;
}