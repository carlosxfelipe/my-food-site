import Layout from "../components/Layout.tsx";

export default function About() {
  return (
    <Layout>
      <div class="flex flex-col px-4 text-left">
        <h1 class="text-4xl font-bold mb-4">Sobre Nós</h1>
        <p class="mb-6">
          Esta é a página "Sobre" do seu site feito com Fresh. Você pode
          adicionar mais informações aqui.
        </p>
      </div>
    </Layout>
  );
}
