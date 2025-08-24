export default function Footer() {
  const linkClass =
    "no-underline hover:text-green-700 dark:hover:text-blue-400";

  return (
    <footer class="w-full bg-[#86efac] dark:bg-gray-800 text-black dark:text-white py-4 mt-12 text-center text-sm">
      <p>
        © {new Date().getFullYear()} Meu Site Fresh ·
        <a
          href="/about"
          class={`${linkClass} mx-2`}
        >
          Sobre
        </a>·
        <a
          href="/contact"
          class={`${linkClass} mx-2`}
        >
          Contato
        </a>
      </p>
    </footer>
  );
}
