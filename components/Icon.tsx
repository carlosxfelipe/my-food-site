import {
  mdiAccount,
  mdiAccountOutline,
  mdiCartOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiHome,
  mdiHomeOutline,
  mdiMinus,
  mdiPackageVariant,
  mdiPackageVariantClosed,
  mdiPlus,
  mdiStar,
  mdiStarHalfFull,
  mdiStarOutline,
} from "https://esm.sh/@mdi/js@7.4.47";

const MAP = {
  home: mdiHome,
  "home-outline": mdiHomeOutline,
  "package-variant": mdiPackageVariant,
  "package-variant-closed": mdiPackageVariantClosed,
  heart: mdiHeart,
  "heart-outline": mdiHeartOutline,
  account: mdiAccount,
  "account-outline": mdiAccountOutline,
  "cart-outline": mdiCartOutline,
  star: mdiStar,
  "star-outline": mdiStarOutline,
  "star-half-full": mdiStarHalfFull,
  minus: mdiMinus,
  plus: mdiPlus,
} as const;

type Props = {
  name: keyof typeof MAP;
  size?: number | string;
  class?: string;
  ariaLabel?: string;
};

export default function Icon(
  { name, size = 24, class: cls = "", ariaLabel }: Props,
) {
  const path = MAP[name];
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
      <path d={path} />
    </svg>
  );
}
