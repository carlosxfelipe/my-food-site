import type { JSX } from "preact";

type Props = {
  name: string;
  size?: number | string;
  color?: string;
  class?: string;
  ariaLabel?: string;
};

export default function Icon({
  name,
  size = 24,
  color,
  class: cls = "",
  ariaLabel,
}: Props) {
  const style: JSX.CSSProperties = {
    fontSize: typeof size === "number" ? `${size}px` : size,
    color,
    lineHeight: 1,
    display: "inline-flex",
  };

  return (
    <i
      class={`mdi mdi-${name} ${cls}`}
      style={style}
      aria-label={ariaLabel}
    />
  );
}
