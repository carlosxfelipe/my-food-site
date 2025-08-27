import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  const linkClass =
    "no-underline text-primary-light dark:text-primary-dark hover:opacity-80";

  return (
    <>
      <Head>
        <title>404 - Página não encontrada</title>
      </Head>
      <div class="px-4 py-12 min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="Logo do Fresh: um limão fatiado pingando suco"
          />
          <h1 class="text-5xl font-extrabold mb-4 text-onSurface-light dark:text-onSurface-dark">
            404 - Página não encontrada
          </h1>
          <p class="text-lg mb-6 text-onSurface-light dark:text-onSurface-dark">
            A página que você está tentando acessar não existe ou foi movida.
          </p>
          <a href="/" class={linkClass}>
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </>
  );
}
