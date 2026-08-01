import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { BlurImage } from "@/components/interactive/blur-image";
import { images, navLinks, photos } from "@/lib/site-data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "To My Favourite Person — Friendship Day" },
      {
        name: "description",
        content:
          "A little corner of the internet built for my favourite person: memories, photos, letters and a song.",
      },
      { property: "og:title", content: "To My Favourite Person — Friendship Day" },
      {
        property: "og:description",
        content: "A little corner of the internet built for my favourite person.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell
      eyebrow="Happy Friendship Day"
      title="To My Favourite Person"
      intro="to the best one ✿"
      nextTo="/timeline"
      nextLabel="Start with our timeline"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <Reveal>
          <figure className="relative mx-auto max-w-md -rotate-2 rounded-3xl bg-card p-4 shadow-lift">
            <BlurImage
              src={images.lilyCat}
              alt="A tiny cat peeking out of a pink lily"
              width={1024}
              height={1280}
              eager
              className="rounded-2xl object-cover"
            />
            <figcaption className="mt-3 text-center font-hand text-2xl text-primary">
              the flower you said looked like us
            </figcaption>
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-6 h-10 w-24 rotate-[-8deg] rounded-sm bg-primary/25"
            />
          </figure>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass rounded-3xl p-7">
            <p className="text-lg leading-relaxed text-foreground">
              Every year this day comes around and I think the same thing: I got so lucky with you.
              So instead of a text this time, I built you a tiny corner of the internet. Stay a
              while, there&apos;s a bit to see.
            </p>
            <img
              src={images.daisies}
              alt=""
              width={768}
              height={768}
              loading="lazy"
              className="mx-auto mt-6 size-24 animate-float object-contain"
            />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {photos.slice(1, 4).map((photo) => (
                <BlurImage
                  key={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="aspect-square rounded-2xl object-cover"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-14">
        <h2 className="text-center text-2xl font-bold text-foreground">Everything in here</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navLinks
            .filter((link) => link.to !== "/home")
            .map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="card-lift glass flex min-h-16 items-center justify-between rounded-2xl px-5 text-base font-semibold text-foreground"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-primary">
                    →
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </Reveal>
    </PageShell>
  );
}