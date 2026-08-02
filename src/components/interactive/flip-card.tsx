import { useState } from "react";

type Props = {
  image: string;
  alt: string;
  back: string;
};

export function FlipCard({ image, alt, back }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={flipped ? `Hide note behind ${alt}` : `Flip ${alt} to read the note`}
      className="flip-scene group block w-full touch-manipulation"
    >
      <div
        className="flip-inner relative aspect-4/5 w-full"
        style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
      >
        {/* Front Side */}
        <div className="flip-face absolute inset-0 overflow-hidden rounded-3xl bg-card p-3 shadow-soft transition-shadow group-hover:shadow-lift">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={512}
            height={640}
            className="size-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-primary"
          >
            ✿
          </span>
        </div>

        {/* Back Side */}
        <div
          className="flip-face absolute inset-0 overflow-y-auto rounded-3xl bg-paper p-6 shadow-lift"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex h-full items-center justify-center">
            <p className="font-hand text-xl leading-relaxed text-center text-foreground break-words">
              {back}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
    }
