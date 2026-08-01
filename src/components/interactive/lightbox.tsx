import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Photo } from "@/lib/site-data";

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const photo = photos[index];

  const go = useCallback(
    (delta: number) => {
      setZoom(1);
      onNavigate((index + delta + photos.length) % photos.length);
    },
    [index, onNavigate, photos.length],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption}`}
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/70 p-4 backdrop-blur-md"
      style={{ animation: "fade-up .3s cubic-bezier(.22,1,.36,1) both" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="glass relative max-h-[88dvh] w-full max-w-3xl overflow-hidden rounded-3xl p-3">
        <div className="flex items-center justify-between gap-2 pb-2">
          <p className="truncate font-hand text-2xl text-primary">{photo.caption}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
              aria-label="Zoom out"
              className="grid size-11 place-items-center rounded-full text-primary hover:bg-secondary"
            >
              <ZoomOut className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
              aria-label="Zoom in"
              className="grid size-11 place-items-center rounded-full text-primary hover:bg-secondary"
            >
              <ZoomIn className="size-5" />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
              className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative grid max-h-[64dvh] place-items-center overflow-auto rounded-2xl bg-card">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="max-h-[64dvh] w-auto object-contain transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>

        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="inline-flex min-h-11 items-center gap-1 rounded-full bg-secondary px-4 text-sm font-medium text-foreground"
          >
            <ChevronLeft className="size-4" /> Previous
          </button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {index + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex min-h-11 items-center gap-1 rounded-full bg-secondary px-4 text-sm font-medium text-foreground"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}