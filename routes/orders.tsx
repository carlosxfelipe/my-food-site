import Layout from "../components/Layout.tsx";
import { type PageProps } from "$fresh/server.ts";

export default function Orders(props: PageProps) {
  return (
    <Layout currentPath={props.url.pathname}>
      <div class="flex flex-col px-4 text-left">
        <h1 class="text-4xl font-bold mb-4">Pedidos</h1>
        <p class="mb-6">
          Esta é a página de Pedidos.
        </p>
      </div>
    </Layout>
  );
}
