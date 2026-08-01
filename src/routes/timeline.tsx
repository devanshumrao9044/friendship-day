import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { BlurImage } from "@/components/interactive/blur-image";
import { timeline } from "@/lib/site-data";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Our Timeline — Friendship Day" },
      {
        name: "description",
        content: "The story of us, year by year: how we met, the 3am calls, and everything after.",
      },
      { property: "og:title", content: "Our Timeline — Friendship Day" },
      { property: "og:description", content: "The story of us, year by year." },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <PageShell
      eyebrow="The Story So Far"
      title="Our Timeline"
      intro="a few chapters, in order ✿"
      nextTo="/gallery"
      nextLabel="See the photo wall"
    >
      <ol className="relative mx-auto max-w-3xl">
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-4 w-px bg-primary/25 md:left-1/2"
        />
        {timeline.map((entry, i) => (
          <li key={entry.title} className="relative pb-12 pl-12 md:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-6 left-4 size-4 -translate-x-1/2 rounded-full bg-accent shadow-glow md:left-1/2"
            />
            <Reveal delay={i * 60}>
              <article
                className={`glass card-lift rounded-3xl p-5 md:w-[calc(50%-2.25rem)] ${
                  i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                  <BlurImage
                    src={entry.image}
                    alt={entry.alt}
                    width={256}
                    height={256}
                    className="size-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                      {entry.year}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-foreground">{entry.title}</h2>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">{entry.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}