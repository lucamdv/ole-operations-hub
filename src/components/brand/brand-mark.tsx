import { cn } from "@/lib/utils";

const LOGO_VIEWBOX = "70 163 371 185";
const LOGO_ASPECT_RATIO = 371 / 185;

export function BrandMark({ className, height = 32 }: { className?: string; height?: number }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label="OléX"
      style={{ height, width: height * LOGO_ASPECT_RATIO }}
      className={cn("shrink-0 select-none", className)}
    >
      <image href="/icon-512.png" width="512" height="512" />
    </svg>
  );
}
