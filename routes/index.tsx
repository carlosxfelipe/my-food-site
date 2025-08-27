import Layout from "../components/Layout.tsx";
import { type PageProps } from "$fresh/server.ts";
import ProductGrid from "../islands/ProductGrid.tsx";
import { MOCK_PRODUCTS } from "../data/products.ts";

export default function Home(props: PageProps) {
  return (
    <Layout currentPath={props.url.pathname}>
      <div class="flex flex-col px-4 text-left">
        <h1 class="text-4xl font-bold mb-2">Início</h1>
        <p class="mb-6">Confira nossos produtos:</p>

        <ProductGrid products={MOCK_PRODUCTS} columns={2} gap={12} />
      </div>
    </Layout>
  );
}
