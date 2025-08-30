import { ICONS } from "../icons/paths.ts";

export type IconName = keyof typeof ICONS;

type Props = {
  name: IconName;
  size?: number | string;
  class?: string;
  ariaLabel?: string;
};

export default function Icon(
  { name, size = 24, class: cls = "", ariaLabel }: Props,
) {
  const d = ICONS[name];
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      class={cls}
      role="img"
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  );
}
