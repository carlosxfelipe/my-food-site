import Layout from "../components/Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

// Define o handler para renderizar a piada do servidor
export const handler: Handlers = {
  async GET(_req, ctx) {
    const res = await fetch(`${ctx.url.origin}/api/joke`);
    const joke = await res.text();
    return ctx.render({ joke });
  },
};

export default function About({ data }: PageProps<{ joke: string }>) {
  return (
    <Layout>
      <div class="flex flex-col px-4 text-left">
        <h1 class="text-4xl font-bold mb-4">Sobre Nós</h1>
        <p class="mb-6">
          Esta é a página "Sobre" do seu site feito com Fresh. Você pode
          adicionar mais informações aqui.
        </p>

        <div class="mt-4 p-4 border-l-4 italic rounded
         border-green-500 bg-green-100 text-green-900
         dark:border-lime-400 dark:bg-lime-950 dark:text-lime-100">
          💡 Curiosidade para devs:
          <br />
          {data.joke}
        </div>
      </div>
    </Layout>
  );
}
