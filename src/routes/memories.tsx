import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { FlipCard } from "@/components/interactive/flip-card";
import { flipCards } from "@/lib/site-data";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Memory Wall — Friendship Day" },
      {
        name: "description",
        content: "Flip each photo over — every one of them has something written on the back.",
      },
      { property: "og:title", content: "Memory Wall — Friendship Day" },
      { property: "og:description", content: "Every photo has something written on the back." },
    ],
  }),
  component: MemoriesPage,
});

function MemoriesPage() {
  return (
    <PageShell
      eyebrow="The Memory Wall"
      title="Flip One Over"
      intro="every photo has something written on the back"
      nextTo="/scratch"
      nextLabel="Scratch to reveal"
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {flipCards.map((card, index) => (
          <Reveal key={card.id} delay={index * 60}>
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 z-10 size-5 -translate-x-1/2 rounded-full bg-accent shadow-soft"
              />
              <FlipCard image={card.image} alt={card.alt} back={card.back} />
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center font-hand text-2xl text-muted-foreground">
        tap a photo to flip it ✿
      </p>
    </PageShell>
  );
}