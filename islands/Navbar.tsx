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
    "hover:bg-surfaceVariant-light/60 dark:hover:bg-surfaceVariant-dark/60 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-light/60 dark:focus-visible:ring-outline-dark/60";

  const activeLink = "bg-surfaceVariant-light dark:bg-surfaceVariant-dark";

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
    <nav class="w-full p-2">
      <div class="mx-3 md:mx-6 rounded-2xl shadow
               bg-background-light/80 dark:bg-background-dark/80
               backdrop-blur">
        <div class="flex items-center justify-between px-4 py-3 gap-3 text-onSurface-light dark:text-onSurface-dark">
          {/* Logo + nome + input */}
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <div class="flex items-center gap-2 shrink-0">
              <Icon name="food" size={32} />
              {/* Esconde o nome no smartphone, mostra a partir de sm */}
              <span class="hidden sm:inline font-bold text-lg">My Food</span>
            </div>

            <input
              type="text"
              placeholder="Buscar..."
              aria-label="Buscar"
              class="flex-1 w-full max-w-md px-3 py-2 rounded-lg
                     bg-inputBackground-light dark:bg-inputBackground-dark
                     placeholder-placeholder-light dark:placeholder-placeholder-dark
                     text-onSurface-light dark:text-onSurface-dark
                     focus:outline-none focus:ring-2 focus:ring-outline-light dark:focus:ring-outline-dark"
            />
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
