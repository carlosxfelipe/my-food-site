import { count } from "../state/cart.ts";

export default function CartBadge() {
  return count.value > 0
    ? (
      <span class="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] leading-none font-extrabold flex items-center justify-center bg-favorite-light text-white ring-2 ring-background-light dark:ring-background-dark">
        {count.value}
      </span>
    )
    : null;
}
