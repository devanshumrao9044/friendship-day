import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { images, wishes } from "@/lib/site-data";

export const Route = createFileRoute("/wishes")({
  head: () => ({
    meta: [
      { title: "Wishes For You — Friendship Day" },
      {
        name: "description",
        content: "Six small wishes for your year: softer mornings, louder laughs, and long drives.",
      },
      { property: "og:title", content: "Wishes For You — Friendship Day" },
      { property: "og:description", content: "Six small wishes for your year." },
    ],
  }),
  component: WishesPage,
});

function WishesPage() {
  return (
    <PageShell
      eyebrow="Sent With Flowers"
      title="Wishes For You"
      intro="a few things I want for your year ✿"
      nextTo="/ending"
      nextLabel="One last thing"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wishes.map((wish, index) => (
          <li key={wish.text}>
            <Reveal delay={index * 70}>
              <article className="card-lift glass relative h-full rounded-3xl p-6 pt-9">
                <img
                  src={images.daisies}
                  alt=""
                  width={128}
                  height={128}
                  loading="lazy"
                  className="absolute -top-6 left-6 size-14 animate-float object-contain"
                />
                <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
                  {wish.from}
                </p>
                <p className="mt-3 font-hand text-2xl leading-snug text-foreground">{wish.text}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}