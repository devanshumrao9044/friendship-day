import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  nextTo?: LinkProps["to"];
  nextLabel?: string;
};

export function PageShell({ eyebrow, title, intro, children, nextTo, nextLabel }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-40 sm:px-6">
      <header className="text-center">
        <p className="animate-fade-up text-xs font-semibold tracking-[0.28em] text-accent uppercase">
          <span aria-hidden="true" className="mr-2 text-primary">
            ✦
          </span>
          {eyebrow}
        </p>
        <h1
          className="mt-4 text-4xl leading-tight font-bold text-foreground sm:text-5xl"
          style={{ animation: "fade-up .8s cubic-bezier(.22,1,.36,1) 80ms both" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mx-auto mt-4 max-w-2xl font-hand text-2xl text-primary"
            style={{ animation: "fade-up .8s cubic-bezier(.22,1,.36,1) 160ms both" }}
          >
            {intro}
          </p>
        )}
      </header>

      <div className="mt-12">{children}</div>

      {nextTo && nextLabel && (
        <Reveal className="mt-16 flex justify-center">
          <Link
            to={nextTo}
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-[1.03]"
          >
            {nextLabel}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}