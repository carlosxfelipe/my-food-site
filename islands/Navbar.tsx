import { useSignal } from "@preact/signals";

export default function Navbar() {
  const isOpen = useSignal(false);
  const linkClass =
    "no-underline text-primary-light dark:text-primary-dark hover:underline";

  return (
    <nav class="w-full bg-surface-light dark:bg-surface-dark text-onSurface-light dark:text-onSurface-dark p-4 shadow">
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center space-x-2">
          <img src="/logo.svg" width="32" height="32" alt="Fresh logo" />
          <span class="font-bold text-lg">Meu Site Fresh</span>
        </div>

        <button
          type="button"
          class="md:hidden"
          onClick={() => (isOpen.value = !isOpen.value)}
          aria-label="Toggle menu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div class="hidden md:flex space-x-4">
          <a href="/" class={linkClass}>Início</a>
          <a href="/about" class={linkClass}>Sobre</a>
          <a href="/contact" class={linkClass}>Contato</a>
        </div>
      </div>

      {isOpen.value && (
        <div class="flex flex-col mt-2 space-y-2 md:hidden px-4">
          <a href="/" class={linkClass}>Início</a>
          <a href="/about" class={linkClass}>Sobre</a>
          <a href="/contact" class={linkClass}>Contato</a>
        </div>
      )}
    </nav>
  );
}
