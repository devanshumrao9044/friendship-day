import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Open Me — A Friendship Day Letter" },
      {
        name: "description",
        content: "Tap the envelope to open a handmade Friendship Day keepsake made just for you.",
      },
      { property: "og:title", content: "Open Me — A Friendship Day Letter" },
      {
        property: "og:description",
        content: "Tap the envelope to open a handmade Friendship Day keepsake made just for you.",
      },
    ],
  }),
  component: IntroPage,
});

function IntroPage() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);

  const open = useCallback(() => {
    setOpening(true);
  }, []);

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => {
      void navigate({ to: "/home" });
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [opening, navigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") open();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section
      className="grid min-h-dvh place-items-center px-4 py-10"
      style={{ opacity: opening ? 0 : 1, transition: "opacity .9s ease" }}
    >
      <div className="w-full max-w-lg text-center">
        <button
          type="button"
          onClick={open}
          aria-label="Open the envelope and begin"
          className="group relative block w-full"
        >
          <div
            className="relative mx-auto w-full max-w-md rounded-3xl bg-card px-6 py-10 shadow-lift"
            style={{
              animation: opening
                ? "fade-up .9s cubic-bezier(.22,1,.36,1) reverse both"
                : "pop-in .9s cubic-bezier(.22,1,.36,1) both",
              transform: opening ? "translateY(-40px)" : undefined,
              transition: "transform .9s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <span aria-hidden="true" className="absolute top-4 left-5 text-2xl text-accent">
              ♥
            </span>
            <span aria-hidden="true" className="absolute top-4 right-5 text-2xl text-accent">
              ♥
            </span>
            <h1 className="font-hand text-5xl text-foreground">Hey You!</h1>
            <p className="mt-5 font-hand text-3xl leading-relaxed text-muted-foreground">
              I made a little something just for you...
            </p>
            <p className="mt-4 font-hand text-3xl text-primary">happy friendship day ✿</p>
          </div>

          <div className="relative -mt-10">
            <div className="mx-auto aspect-16/9 w-full max-w-md rounded-3xl border-2 border-primary/30 bg-secondary shadow-soft">
              <div
                className="mx-auto h-full w-full origin-top rounded-3xl"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--color-primary) 18%, white), color-mix(in oklab, var(--color-primary) 30%, white))",
                  clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
                  transform: opening ? "rotateX(-160deg)" : "rotateX(0deg)",
                  transformOrigin: "top",
                  transition: "transform .8s cubic-bezier(.22,1,.36,1)",
                }}
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-accent text-2xl text-accent-foreground shadow-glow transition-transform group-hover:scale-110"
            >
              ♥
            </span>
          </div>
        </button>

        <p className="mt-10 animate-float text-sm font-semibold tracking-[0.35em] text-muted-foreground uppercase">
          Tap anywhere to begin
        </p>
      </div>
    </section>
  );
}
