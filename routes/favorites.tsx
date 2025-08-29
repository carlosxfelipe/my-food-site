import Layout from "../components/Layout.tsx";
import { type PageProps } from "$fresh/server.ts";
import FavoritesView from "../islands/FavoritesView.tsx";

export default function Favorites(props: PageProps) {
  return (
    <Layout fluid currentPath={props.url.pathname}>
      <div class="px-4">
        <h1 class="text-4xl font-bold mb-3">Favoritos</h1>
        <FavoritesView />
      </div>
    </Layout>
  );
}
