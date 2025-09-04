import Layout from "../components/Layout.tsx";
import { type PageProps } from "$fresh/server.ts";
import ProductGrid from "../islands/ProductGrid.tsx";
import { MOCK_PRODUCTS } from "../data/products.ts";

export default function Home(props: PageProps) {
  const q = (props.url.searchParams.get("q") ?? "").trim();
  const query = q.toLocaleLowerCase();

  const products = query
    ? MOCK_PRODUCTS.filter((p) => {
      const haystack = [
        p.name,
        p.sku,
        p.description ?? "",
        ...(p.tags ?? []),
      ].join(" ").toLocaleLowerCase();
      return haystack.includes(query);
    })
    : MOCK_PRODUCTS;

  return (
    <Layout fluid currentPath={props.url.pathname}>
      <div class="flex flex-col px-4 text-left">
        <h1 class="text-4xl font-bold mb-2">Início</h1>
        <p class="mb-3">
          {q
            ? `Resultado${
              products.length !== 1 ? "s" : ""
            } para “${q}” (${products.length})`
            : "Confira nossos produtos:"}
        </p>
        {q && products.length === 0 && (
          <p class="mb-6 text-outline-light dark:text-outline-dark">
            Nada encontrado. Tente buscar por nome, SKU ou tag.
          </p>
        )}
        <ProductGrid products={products} gap={12} initialLoading />
      </div>
    </Layout>
  );
}
