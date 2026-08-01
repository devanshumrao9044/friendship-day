import { useMemo } from "react";

const GLYPHS = ["✿", "❀", "♥", "✦", "❁", "✧"];

export function Particles({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        delay: `${(i * 1.7) % 14}s`,
        duration: `${16 + ((i * 3) % 12)}s`,
        size: `${0.7 + ((i * 7) % 9) / 10}rem`,
        glyph: GLYPHS[i % GLYPHS.length],
      })),
    [count],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute bottom-0 text-primary/25"
          style={{
            left: item.left,
            fontSize: item.size,
            animation: `rise ${item.duration} linear ${item.delay} infinite`,
          }}
        >
          {item.glyph}
        </span>
      ))}
    </div>
  );
}