import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { MemoryMatch } from "@/components/interactive/memory-match";
import { Quiz } from "@/components/interactive/quiz";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Friendship Games — Friendship Day" },
      {
        name: "description",
        content: "Two small games: match our photos into pairs, then prove how well you know us.",
      },
      { property: "og:title", content: "Friendship Games — Friendship Day" },
      { property: "og:description", content: "Match our photos, then take the quiz." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <PageShell
      eyebrow="A Little Fun"
      title="Friendship Games"
      intro="two small games, zero stakes ✿"
      nextTo="/wishes"
      nextLabel="Read the wishes"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <MemoryMatch />
        </Reveal>
        <Reveal delay={120}>
          <Quiz />
        </Reveal>
      </div>
    </PageShell>
  );
}