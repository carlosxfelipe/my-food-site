export default function Footer() {
  return (
    <footer class="w-full bg-surface-light dark:bg-surface-dark text-onSurface-light dark:text-onSurface-dark py-4 mt-12 text-center text-sm">
      <p>
        © {new Date().getFullYear()} My Food ·
        <a
          href="/about"
          class="mx-2 no-underline text-primary-light dark:text-primary-dark hover:underline"
        >
          Sobre
        </a>
        ·
        <a
          href="/contact"
          class="mx-2 no-underline text-primary-light dark:text-primary-dark hover:underline"
        >
          Contato
        </a>
      </p>
    </footer>
  );
}
