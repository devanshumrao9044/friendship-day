import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { ScratchCard } from "@/components/interactive/scratch-card";
import { scratchTruths } from "@/lib/site-data";

export const Route = createFileRoute("/scratch")({
  head: () => ({
    meta: [
      { title: "Six Little Truths — Friendship Day" },
      {
        name: "description",
        content: "Six scratch cards, six honest things I mean about you. Rub each one to reveal it.",
      },
      { property: "og:title", content: "Six Little Truths — Friendship Day" },
      { property: "og:description", content: "Rub each card — there's something under it." },
    ],
  }),
  component: ScratchPage,
});

function ScratchPage() {
  const [revealed, setRevealed] = useState<string[]>([]);

  const markRevealed = useCallback((id: string) => {
    setRevealed((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return (
    <PageShell
      eyebrow="Six Little Truths"
      title="Scratch These Open"
      intro="rub each one — there's something under it ✿"
      nextTo="/letters"
      nextLabel="Read the letters"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {scratchTruths.map((truth, index) => (
          <Reveal key={truth.id} delay={index * 60}>
            <ScratchCard
              index={truth.index}
              title={truth.title}
              body={truth.body}
              onRevealed={() => markRevealed(truth.id)}
            />
          </Reveal>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-8 text-center font-hand text-2xl text-muted-foreground tabular-nums"
      >
        {revealed.length} of {scratchTruths.length} uncovered
      </p>
    </PageShell>
  );
}