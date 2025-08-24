import { useSignal } from "@preact/signals";
import Icon from "../components/Icon.tsx";

export default function Navbar() {
  const isOpen = useSignal(false);
  const linkClass =
    "no-underline text-primary-light dark:text-primary-dark hover:underline flex items-center justify-center";

  return (
    <nav class="w-full bg-surface-light dark:bg-surface-dark text-onSurface-light dark:text-onSurface-dark p-4 shadow">
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center space-x-2">
          <img src="/logo.svg" width="32" height="32" alt="Fresh logo" />
          <span class="font-bold text-lg">My Food</span>
        </div>

        <button
          type="button"
          class="md:hidden"
          onClick={() => (isOpen.value = !isOpen.value)}
          aria-label="Toggle menu"
        >
          {isOpen.value
            ? <Icon name="close" size={24} />
            : <Icon name="menu" size={24} />}
        </button>

        <div class="hidden md:flex space-x-6 text-2xl">
          <a href="/" class={linkClass}>
            <Icon name="home" size={24} />
          </a>
          <a href="/about" class={linkClass}>
            <Icon name="information-outline" size={24} />
          </a>
          <a href="/contact" class={linkClass}>
            <Icon name="email-outline" size={24} />
          </a>
        </div>
      </div>

      {isOpen.value && (
        <div class="flex flex-col mt-2 space-y-2 md:hidden px-4 text-2xl">
          <a href="/" class={linkClass}>
            <Icon name="home" size={24} />
          </a>
          <a href="/about" class={linkClass}>
            <Icon name="information-outline" size={24} />
          </a>
          <a href="/contact" class={linkClass}>
            <Icon name="email-outline" size={24} />
          </a>
        </div>
      )}
    </nav>
  );
}
