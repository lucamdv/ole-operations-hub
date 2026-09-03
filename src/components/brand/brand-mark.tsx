import { useState } from "react";
import olexAsset from "@/assets/olex.png.asset.json";
import { cn } from "@/lib/utils";

export function BrandMark({ className, height = 32 }: { className?: string; height?: number }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <span
        role="img"
        aria-label="Oléx"
        style={{ height, lineHeight: `${height}px`, fontSize: Math.max(18, height * 0.62) }}
        className={cn(
          "inline-flex select-none items-center font-display font-semibold tracking-[-0.055em] text-primary",
          className,
        )}
      >
        OLÉX
      </span>
    );
  }

  return (
    <img
      src={olexAsset.url}
      alt="Oléx"
      style={{ height, width: "auto" }}
      className={cn("object-contain select-none", className)}
      onError={() => setImageFailed(true)}
      draggable={false}
    />
  );
}
