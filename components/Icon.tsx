import { memo } from "preact/compat";
import { ICONS } from "../icons/paths.ts";

export type IconName = keyof typeof ICONS;

type Props = {
  name: IconName;
  size?: number | string;
  class?: string;
  ariaLabel?: string;
};

function Icon({ name, size = 24, class: cls = "", ariaLabel }: Props) {
  const d = ICONS[name];
  const px = typeof size === "number" ? `${size}px` : size;
  const hasLabel = Boolean(ariaLabel);
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      class={cls}
      role={hasLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={hasLabel ? undefined : "true"}
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  );
}

export default memo(Icon);
