import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { letters } from "@/lib/site-data";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "Letters For You — Friendship Day" },
      {
        name: "description",
        content: "Three handwritten letters: a note for today, a proper thank you, and one for later.",
      },
      { property: "og:title", content: "Letters For You — Friendship Day" },
      { property: "og:description", content: "Things I'm not great at saying out loud." },
    ],
  }),
  component: LettersPage,
});

function LettersPage() {
  const [activeId, setActiveId] = useState(letters[0]!.id);
  const active = letters.find((letter) => letter.id === activeId) ?? letters[0]!;

  return (
    <PageShell
      eyebrow="One Last Thing"
      title="Letters For You"
      intro="things I'm not great at saying out loud ✿"
      nextTo="/music"
      nextLabel="Play our playlist"
    >
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
        {letters.map((letter) => (
          <button
            key={letter.id}
            type="button"
            onClick={() => setActiveId(letter.id)}
            aria-pressed={letter.id === activeId}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
              letter.id === activeId
                ? "bg-primary text-primary-foreground"
                : "glass text-foreground hover:bg-secondary"
            }`}
          >
            {letter.title}
          </button>
        ))}
      </div>

      <Reveal key={active.id} className="mt-10">
        <article className="relative mx-auto max-w-2xl rounded-3xl bg-paper p-7 shadow-lift sm:p-10">
          <span
            aria-hidden="true"
            className="absolute -top-4 left-8 h-9 w-28 rotate-[-6deg] rounded-sm bg-accent/70"
          />
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            {active.date}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">{active.title}</h2>
          <div className="mt-6 space-y-5">
            {active.body.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-hand text-2xl leading-relaxed text-foreground"
                style={{ animation: `fade-up .7s cubic-bezier(.22,1,.36,1) ${i * 90}ms both` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 text-right font-hand text-3xl text-primary">— always, me ✿</p>
        </article>
      </Reveal>
    </PageShell>
  );
}