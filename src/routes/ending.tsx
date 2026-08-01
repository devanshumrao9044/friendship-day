import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { images } from "@/lib/site-data";

export const Route = createFileRoute("/ending")({
  head: () => ({
    meta: [
      { title: "One Last Thing — Friendship Day" },
      {
        name: "description",
        content: "The quiet ending: thank you for the years, and happy Friendship Day.",
      },
      { property: "og:title", content: "One Last Thing — Friendship Day" },
      { property: "og:description", content: "Thank you for the years. Happy Friendship Day." },
    ],
  }),
  component: EndingPage,
});

const lines = [
  "So that's it. That's the whole page.",
  "No occasion, no reason, nothing I need from you.",
  "Just a very long way of saying: thank you for the years.",
];

function EndingPage() {
  const [sealed, setSealed] = useState(false);

  useEffect(() => {
    if (!sealed) return;
    const id = window.setTimeout(() => setSealed(false), 4000);
    return () => window.clearTimeout(id);
  }, [sealed]);

  return (
    <PageShell eyebrow="One Last Thing" title="Happy Friendship Day" intro="thank you for the years ✿">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <img
            src={images.catsHug}
            alt="Two cartoon cats hugging"
            width={1024}
            height={1024}
            loading="lazy"
            className="mx-auto size-56 rounded-full object-cover shadow-lift"
          />
        </Reveal>

        <div className="mt-10 space-y-4">
          {lines.map((line, index) => (
            <Reveal key={line} delay={index * 120}>
              <p className="font-hand text-3xl leading-snug text-foreground">{line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-12">
          <button
            type="button"
            onClick={() => setSealed(true)}
            className="min-h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-[1.03]"
          >
            Send it back to me
          </button>
          <p aria-live="polite" className="mt-4 min-h-7 font-hand text-2xl text-primary">
            {sealed ? "sent. see you at 3am ✿" : ""}
          </p>
        </Reveal>

        <Reveal delay={480} className="mt-10">
          <Link
            to="/home"
            className="glass inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold text-foreground"
          >
            Start over from the beginning
          </Link>
        </Reveal>
      </div>
    </PageShell>
  );
}