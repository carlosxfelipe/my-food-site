import type { JSX } from "preact";

type IconFamily = "material" | "material-community" | "ionicons";
type MaterialVariant = "filled" | "outlined";

type Props = {
  name: string;
  family?: IconFamily;
  size?: number | string;
  color?: string;
  class?: string;
  materialVariant?: MaterialVariant;
  ariaLabel?: string;
};

export default function Icon({
  name,
  family = "material-community",
  size = 24,
  color,
  class: cls = "",
  materialVariant = "filled",
  ariaLabel,
}: Props) {
  const style: JSX.CSSProperties = {
    fontSize: typeof size === "number" ? `${size}px` : size,
    color,
    lineHeight: 1,
    display: "inline-flex",
  };

  if (family === "material-community") {
    return (
      <i
        class={`mdi mdi-${name} ${cls}`}
        style={style}
        aria-label={ariaLabel}
      />
    );
  }

  if (family === "material") {
    const variantClass = materialVariant === "outlined"
      ? "material-icons-outlined"
      : "material-icons";
    return (
      <span
        class={`${variantClass} ${cls}`}
        style={style}
        aria-label={ariaLabel}
      >
        {name}
      </span>
    );
  }

  if (family === "ionicons") {
    return (
      <ion-icon name={name} class={cls} style={style} aria-label={ariaLabel} />
    );
  }

  return null;
}
