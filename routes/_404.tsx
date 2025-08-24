import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  const linkClass =
    "no-underline hover:text-green-700 dark:hover:text-blue-400";

  return (
    <>
      <Head>
        <title>404 - Página não encontrada</title>
      </Head>
      <div class="px-4 py-12 min-h-screen bg-[#86efac] dark:bg-gray-900 text-black dark:text-white">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center text-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="Logo do Fresh: um limão fatiado pingando suco"
          />
          <h1 class="text-5xl font-extrabold mb-4">
            404 - Página não encontrada
          </h1>
          <p class="text-lg mb-6">
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
