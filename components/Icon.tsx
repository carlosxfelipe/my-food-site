import {
  mdiAccount,
  mdiAccountOutline,
  mdiBellOutline,
  mdiCartOutline,
  mdiChevronRight,
  mdiCookieOff,
  mdiCreditCardOutline,
  mdiHeart,
  mdiHeartOff,
  mdiHeartOutline,
  mdiHelpCircleOutline,
  mdiHome,
  mdiHomeOutline,
  mdiLockOutline,
  mdiMapMarkerOutline,
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
  "heart-off": mdiHeartOff,
  account: mdiAccount,
  "account-outline": mdiAccountOutline,
  "cart-outline": mdiCartOutline,
  star: mdiStar,
  "star-outline": mdiStarOutline,
  "star-half-full": mdiStarHalfFull,
  minus: mdiMinus,
  plus: mdiPlus,
  "cookie-off": mdiCookieOff,
  "map-marker-outline": mdiMapMarkerOutline,
  "credit-card-outline": mdiCreditCardOutline,
  "bell-outline": mdiBellOutline,
  "help-circle-outline": mdiHelpCircleOutline,
  "lock-outline": mdiLockOutline,
  "chevron-right": mdiChevronRight,
} as const;

export type IconName = keyof typeof MAP;

type Props = {
  name: IconName;
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
