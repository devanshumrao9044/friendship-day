import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  index: string;
  title: string;
  body: string;
  onRevealed?: () => void;
};

export function ScratchCard({ index, title, body, onRevealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.scale(dpr, dpr);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#a8ccc2");
    gradient.addColorStop(1, "#6fae9d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 40; i += 1) {
      ctx.beginPath();
      ctx.arc(((i * 53) % rect.width) | 0, ((i * 97) % rect.height) | 0, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(20,60,50,0.6)";
    ctx.font = "600 14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("scratch", rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    if (revealed) return;
    paint();
    let frame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(paint);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [paint, revealed]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i] === 0) clear += 1;
    }
    const ratio = clear / (data.length / 40);
    if (ratio > 0.45) {
      revealedRef.current = true;
      setRevealed(true);
      onRevealed?.();
    }
  }, [onRevealed]);

  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 24, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const reveal = () => {
    revealedRef.current = true;
    setRevealed(true);
    onRevealed?.();
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-card p-5 shadow-soft">
      <div className="flex h-full flex-col justify-center">
        <p className="text-sm font-semibold tracking-widest text-accent">{index}</p>
        <h3 className="mt-1 text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>

      {!revealed && (
        <>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 size-full cursor-grab touch-none rounded-3xl"
            onPointerDown={(event) => {
              drawingRef.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              scratchAt(event.clientX, event.clientY);
            }}
            onPointerMove={(event) => {
              if (!drawingRef.current) return;
              scratchAt(event.clientX, event.clientY);
            }}
            onPointerUp={() => {
              drawingRef.current = false;
              checkProgress();
            }}
            onPointerLeave={() => {
              if (!drawingRef.current) return;
              drawingRef.current = false;
              checkProgress();
            }}
          />
          <button
            type="button"
            onClick={reveal}
            className="absolute right-3 bottom-3 min-h-11 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Reveal {title}
          </button>
        </>
      )}
    </div>
  );
}