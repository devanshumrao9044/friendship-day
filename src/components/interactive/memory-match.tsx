import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { photos } from "@/lib/site-data";

type Card = { key: string; photoId: string; src: string; alt: string };

function buildDeck(): Card[] {
  const picks = photos.slice(0, 6);
  const deck = picks.flatMap((photo, i) => [
    { key: `${photo.id}-a`, photoId: photo.id, src: photo.src, alt: photo.alt, order: (i * 7) % 13 },
    { key: `${photo.id}-b`, photoId: photo.id, src: photo.src, alt: photo.alt, order: (i * 5) % 11 },
  ]);
  return deck
    .sort((a, b) => a.order - b.order)
    .map(({ key, photoId, src, alt }) => ({ key, photoId, src, alt }));
}

export function MemoryMatch() {
  const initialDeck = useMemo(buildDeck, []);
  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const flip = useCallback(
    (card: Card) => {
      if (flipped.length === 2 || flipped.includes(card.key) || matched.includes(card.photoId))
        return;
      const nextFlipped = [...flipped, card.key];
      setFlipped(nextFlipped);
      if (nextFlipped.length !== 2) return;

      setMoves((m) => m + 1);
      const [first, second] = nextFlipped;
      const firstCard = deck.find((c) => c.key === first);
      const secondCard = deck.find((c) => c.key === second);
      if (firstCard && secondCard && firstCard.photoId === secondCard.photoId) {
        setMatched((prev) => [...prev, firstCard.photoId]);
        setFlipped([]);
        return;
      }
      timerRef.current = window.setTimeout(() => setFlipped([]), 800);
    },
    [deck, flipped, matched],
  );

  const restart = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setDeck(buildDeck().reverse());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const won = matched.length === 6;

  return (
    <div className="glass rounded-3xl p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-bold text-foreground">Memory match</h3>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {won ? `You did it in ${moves} moves ✿` : `${matched.length} of 6 pairs · ${moves} moves`}
          </p>
        </div>
        <button
          type="button"
          onClick={restart}
          className="min-h-11 shrink-0 rounded-full bg-secondary px-4 text-sm font-semibold text-foreground"
        >
          Restart
        </button>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {deck.map((card) => {
          const isOpen = flipped.includes(card.key) || matched.includes(card.photoId);
          return (
            <li key={card.key}>
              <button
                type="button"
                onClick={() => flip(card)}
                aria-label={isOpen ? card.alt : "Hidden card, click to reveal"}
                aria-pressed={isOpen}
                className="flip-scene block aspect-square w-full"
              >
                <span
                  className="flip-inner relative block size-full"
                  style={{ transform: isOpen ? "rotateY(180deg)" : undefined }}
                >
                  <span className="flip-face absolute inset-0 grid place-items-center rounded-2xl bg-primary text-2xl text-primary-foreground">
                    ✿
                  </span>
                  <span
                    className="flip-face absolute inset-0 overflow-hidden rounded-2xl bg-card"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <img
                      src={card.src}
                      alt=""
                      width={256}
                      height={256}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}