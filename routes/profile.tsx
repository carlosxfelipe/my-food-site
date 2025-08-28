import Layout from "../components/Layout.tsx";
import { type PageProps } from "$fresh/server.ts";
import ProfileView from "../islands/ProfileView.tsx";

export default function Profile(props: PageProps) {
  return (
    <Layout fluid currentPath={props.url.pathname}>
      <div class="px-4">
        <h1 class="text-4xl font-bold mb-3">Perfil</h1>
        <ProfileView />
      </div>
    </Layout>
  );
}
