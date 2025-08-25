import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout>
      <div class="flex flex-col px-4 text-left">
        <h1 class="text-4xl font-bold mb-4">Início</h1>
        <p class="mb-6">
          Esta é a página de Início.
        </p>
      </div>
    </Layout>
  );
}
