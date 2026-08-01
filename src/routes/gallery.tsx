import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/layout/reveal";
import { BlurImage } from "@/components/interactive/blur-image";
import { Lightbox } from "@/components/interactive/lightbox";
import { photos } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Wall — Friendship Day" },
      {
        name: "description",
        content: "A masonry photo wall of our favourite moments, with a full-screen zoomable viewer.",
      },
      { property: "og:title", content: "Photo Wall — Friendship Day" },
      { property: "og:description", content: "A masonry photo wall of our favourite moments." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <PageShell
      eyebrow="The Photo Wall"
      title="Look At Us"
      intro="tap any photo to open it ✿"
      nextTo="/memories"
      nextLabel="Flip the memory cards"
    >
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {photos.map((photo, index) => (
          <Reveal key={photo.id} delay={index * 50} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open photo: ${photo.caption}`}
              className="card-lift group block w-full overflow-hidden rounded-3xl bg-card p-3 text-left shadow-soft"
            >
              <BlurImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="mt-3 block font-hand text-xl text-primary">{photo.caption}</span>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </PageShell>
  );
}