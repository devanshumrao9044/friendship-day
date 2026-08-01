import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3">
      <nav
        aria-label="Main"
        className="glass mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-4 py-2.5 lg:flex lg:justify-between"
      >
        <Link
          to="/home"
          className="flex min-w-0 items-center gap-2 text-primary"
          aria-label="Friendship Day home"
        >
          <span aria-hidden="true" className="text-lg">
            ✿
          </span>
          <span className="truncate font-hand text-2xl leading-none">for you</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                className="inline-flex min-h-9 items-center rounded-full px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden"
          style={{ animation: "fade-up .35s cubic-bezier(.22,1,.36,1) both" }}
        >
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                  className="flex min-h-11 items-center rounded-2xl bg-card/70 px-4 text-sm font-medium text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}