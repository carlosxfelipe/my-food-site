import { useMemo } from "preact/hooks";

type Animation = "pulse" | "shimmer" | "none";
type Variant = "rect" | "circle";

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  variant?: Variant;
  animation?: Animation;
  class?: string;
  "aria-label"?: string;
}

export default function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  variant = "rect",
  animation = "shimmer",
  class: className = "",
  "aria-label": ariaLabel = "Carregando",
}: SkeletonProps) {
  const style = useMemo(
    () => ({
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius: variant === "circle"
        ? "9999px"
        : typeof radius === "number"
        ? `${radius}px`
        : radius,
    }),
    [width, height, radius, variant],
  );

  // Define cores e a variável --sk-hl via Tailwind (processado em build)
  const baseClasses = [
    "relative overflow-hidden",
    "bg-skeletonBase-light dark:bg-skeletonBase-dark",
    "[--sk-hl:theme(colors.skeletonHighlight.light)]",
    "dark:[--sk-hl:theme(colors.skeletonHighlight.dark)]",
  ].join(" ");

  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      style={style}
      class={`${baseClasses} ${className}`}
    >
      {animation === "pulse" && (
        <div class="sk-pulse before:content-[''] before:absolute before:inset-0 before:rounded-inherit before:bg-[var(--sk-hl)]" />
      )}

      {animation === "shimmer" && (
        <div class="sk-shimmer before:content-[''] before:absolute before:inset-0 before:rounded-inherit before:bg-[linear-gradient(100deg,transparent_0%,rgba(0,0,0,0)_35%,var(--sk-hl)_50%,rgba(0,0,0,0)_65%,transparent_100%)]" />
      )}

      <style>
        {`
        /* Acessibilidade: respeita prefer-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .sk-pulse, .sk-shimmer { animation: none !important; }
          .sk-pulse::before, .sk-shimmer::before { opacity: 0.4; }
        }

        .sk-pulse::before {
          opacity: 0.4;
          animation: sk-pulse 1.2s ease-in-out infinite;
        }
        @keyframes sk-pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        .sk-shimmer::before {
          animation: sk-shimmer 1.25s ease-in-out infinite;
          background-size: 200% 100%;
          background-position: -150% 0;
          opacity: 0.85;
        }
        @keyframes sk-shimmer {
          100% { background-position: 150% 0; }
        }

        .sk-pulse::before,
        .sk-shimmer::before {
          border-radius: inherit;
        }
      `}
      </style>
    </div>
  );
}
