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
  animation = "pulse",
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
        <div class="sk-shimmer">
          <div class="sk-bar" />
        </div>
      )}

      <style>
        {`
        @media (prefers-reduced-motion: reduce) {
          .sk-pulse, .sk-shimmer { animation: none !important; }
          .sk-pulse::before, .sk-shimmer, .sk-bar { opacity: 0.4 !important; }
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

        .sk-shimmer {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
        }
        .sk-bar {
          position: absolute;
          top: -10%;
          bottom: -10%;
          width: 50%;
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(0,0,0,0) 35%,
            var(--sk-hl) 50%,
            rgba(0,0,0,0) 65%,
            transparent 100%
          );
          transform: translateX(-150%);
          animation: sk-shimmer-x 1.1s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes sk-shimmer-x {
          100% { transform: translateX(150%); }
        }
      `}
      </style>
    </div>
  );
}
