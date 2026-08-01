import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Image with a blur-up placeholder and native lazy loading. */
export function BlurImage({ src, alt, width, height, className, eager }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block overflow-hidden bg-secondary">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "block size-full transition-[filter,opacity,transform] duration-700",
          loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-xl",
          className,
        )}
      />
    </span>
  );
}