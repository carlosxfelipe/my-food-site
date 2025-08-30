import Icon, { IconName } from "./Icon.tsx";
import Logo from "./Logo.tsx";
import CartBadge from "../islands/CartBadge.tsx";

type LinkDef = {
  href: string;
  icon: IconName;
  iconOutline: IconName;
  withBadge?: boolean;
};

const linkBase =
  "no-underline flex items-center justify-center px-3 py-2 rounded-full transition-colors " +
  "text-onSurface-light dark:text-onSurface-dark " +
  "hover:bg-surfaceVariant-light/60 dark:hover:bg-surfaceVariant-dark/60 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-light/60 dark:focus-visible:ring-outline-dark/60";

const linkActive = "bg-surfaceVariant-light dark:bg-surfaceVariant-dark";

const surfaceGlass =
  "rounded-2xl border border-outline-light/30 dark:border-outline-dark/30 " +
  "shadow-md bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md";

const topShell = "fixed top-0 inset-x-0 z-50 p-2";
const row =
  "flex items-center justify-between px-4 py-3 gap-3 text-onSurface-light dark:text-onSurface-dark";

const inputClass = "flex-1 w-full max-w-md px-3 py-2 rounded-lg " +
  "bg-inputBackground-light dark:bg-inputBackground-dark " +
  "placeholder-placeholder-light dark:placeholder-placeholder-dark " +
  "text-onSurface-light dark:text-onSurface-dark " +
  "focus:outline-none focus:ring-2 focus:ring-outline-light dark:focus:ring-outline-dark";

const NAV_LINKS: LinkDef[] = [
  { href: "/", icon: "home", iconOutline: "home-outline" },
  {
    href: "/orders",
    icon: "package-variant",
    iconOutline: "package-variant-closed",
    withBadge: true,
  },
  { href: "/favorites", icon: "heart", iconOutline: "heart-outline" },
  { href: "/profile", icon: "account", iconOutline: "account-outline" },
];

function NavLink(
  { link, currentPath }: { link: LinkDef; currentPath: string },
) {
  const isActive = currentPath === link.href;
  return (
    <a
      href={link.href}
      class={`${linkBase} ${isActive ? linkActive : ""} relative`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon name={isActive ? link.icon : link.iconOutline} size={26} />
      {link.withBadge && <CartBadge />}
    </a>
  );
}

export default function Navbar({ currentPath }: { currentPath?: string }) {
  const path = currentPath ?? "/";
  return (
    <nav class={topShell}>
      {/* topo */}
      <div class={`mx-3 md:mx-6 ${surfaceGlass}`}>
        <div class={row}>
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <a href="/" class="flex items-center gap-2">
              <Logo size={32} />
              <span class="hidden sm:inline font-bold text-lg">My Food</span>
            </a>

            <form
              action="/"
              method="GET"
              class="flex-1 flex"
              onSubmit={(e) => {
                const form = e.currentTarget as HTMLFormElement;
                const input = form.querySelector(
                  'input[name="q"]',
                ) as HTMLInputElement | null;
                if (input && input.value.trim() === "") input.disabled = true;
              }}
            >
              <input
                type="text"
                name="q"
                placeholder="Buscar por nome, SKU, tag…"
                aria-label="Buscar produtos"
                class={inputClass}
                defaultValue=""
              />
            </form>
          </div>

          {/* desktop */}
          <div class="hidden md:flex items-center gap-3 text-2xl">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} link={link} currentPath={path} />
            ))}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div
        class={`md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 px-3 py-2 text-2xl flex items-center gap-3 ${surfaceGlass}`}
      >
        {NAV_LINKS.map((link) => (
          <NavLink key={link.href} link={link} currentPath={path} />
        ))}
      </div>
    </nav>
  );
}
