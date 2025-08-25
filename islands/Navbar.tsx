import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Icon from "../components/Icon.tsx";

export default function Navbar() {
  const activePath = useSignal("/");

  useEffect(() => {
    activePath.value = globalThis.location?.pathname ?? "/";
  }, []);

  const baseLink =
    "no-underline flex items-center justify-center px-3 py-2 rounded-full transition-colors " +
    "text-onSurface-light dark:text-onSurface-dark " +
    "hover:text-primary-light dark:hover:text-primary-dark " +
    "hover:bg-surfaceVariant-light/60 dark:hover:bg-surfaceVariant-dark/60 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/60 dark:focus-visible:ring-primary-dark/60";

  const activeLink = "bg-surfaceVariant-light dark:bg-surfaceVariant-dark " +
    "text-primary-light dark:text-primary-dark";

  const LinkItem = (
    props: { href: string; icon: string; iconOutline: string; size?: number },
  ) => {
    const isActive = activePath.value === props.href;
    return (
      <a
        href={props.href}
        class={`${baseLink} ${isActive ? activeLink : ""}`}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon name={isActive ? props.icon : props.iconOutline} size={26} />
      </a>
    );
  };

  return (
    <nav class="w-full bg-surface-light dark:bg-surface-dark text-onSurface-light dark:text-onSurface-dark p-4 shadow relative">
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center space-x-2">
          <Icon name="food" size={32} />
          <span class="font-bold text-lg">My Food</span>
        </div>

        {/* links desktop */}
        <div class="hidden md:flex items-center gap-3 text-2xl">
          <LinkItem href="/" icon="home" iconOutline="home-outline" />
          <LinkItem
            href="/orders"
            icon="package-variant"
            iconOutline="package-variant-closed"
          />
          <LinkItem
            href="/favorites"
            icon="heart"
            iconOutline="heart-outline"
          />
          <LinkItem
            href="/profile"
            icon="account"
            iconOutline="account-outline"
          />
        </div>
      </div>

      {/* bottom navigation só em mobile */}
      <div class="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur rounded-2xl px-3 py-2 shadow-lg flex items-center gap-3 text-2xl">
        <LinkItem href="/" icon="home" iconOutline="home-outline" />
        <LinkItem
          href="/orders"
          icon="package-variant"
          iconOutline="package-variant-closed"
        />
        <LinkItem href="/favorites" icon="heart" iconOutline="heart-outline" />
        <LinkItem
          href="/profile"
          icon="account"
          iconOutline="account-outline"
        />
      </div>
    </nav>
  );
}
