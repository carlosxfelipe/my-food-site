import { useSignal } from "@preact/signals";
import Icon from "../components/Icon.tsx";

export default function Navbar({ currentPath }: { currentPath?: string }) {
  const initialPath =
    typeof window !== "undefined" && globalThis.location?.pathname
      ? globalThis.location.pathname
      : (currentPath ?? "/");
  const activePath = useSignal(initialPath);

  const linkBase =
    "no-underline flex items-center justify-center px-3 py-2 rounded-full transition-colors " +
    "text-onSurface-light dark:text-onSurface-dark " +
    "hover:bg-surfaceVariant-light/60 dark:hover:bg-surfaceVariant-dark/60 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-light/60 dark:focus-visible:ring-outline-dark/60";

  const linkActive = "bg-surfaceVariant-light dark:bg-surfaceVariant-dark";

  const surface =
    "rounded-2xl border border-outline-light/30 dark:border-outline-dark/30 " +
    "shadow-md bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md";

  const topShell = "fixed top-0 inset-x-0 z-50 p-2";
  const topCard = `mx-3 md:mx-6 ${surface}`;
  const row =
    "flex items-center justify-between px-4 py-3 gap-3 text-onSurface-light dark:text-onSurface-dark";

  const inputClass = "flex-1 w-full max-w-md px-3 py-2 rounded-lg " +
    "bg-inputBackground-light dark:bg-inputBackground-dark " +
    "placeholder-placeholder-light dark:placeholder-placeholder-dark " +
    "text-onSurface-light dark:text-onSurface-dark " +
    "focus:outline-none focus:ring-2 focus:ring-outline-light dark:focus:ring-outline-dark";

  const mobileBar =
    "md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 px-3 py-2 text-2xl flex items-center gap-3 " +
    surface;

  const LinkItem = (
    props: { href: string; icon: string; iconOutline: string; size?: number },
  ) => {
    const isActive = activePath.value === props.href;
    return (
      <a
        href={props.href}
        class={`${linkBase} ${isActive ? linkActive : ""}`}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon name={isActive ? props.icon : props.iconOutline} size={26} />
      </a>
    );
  };

  return (
    <nav class={topShell}>
      <div class={topCard}>
        <div class={row}>
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="flex items-center gap-2 shrink-0">
              <img
                src="/logo.svg"
                alt="Logo Fresh"
                width="32"
                height="32"
                class="w-8 h-8"
              />
              <span class="hidden sm:inline font-bold text-lg">My Food</span>
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              aria-label="Buscar"
              class={inputClass}
            />
          </div>

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
      </div>

      <div class={mobileBar}>
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
