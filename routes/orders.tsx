import Layout from "../components/Layout.tsx";
import { type PageProps } from "$fresh/server.ts";
import OrdersView from "../islands/OrdersView.tsx";

export default function Orders(props: PageProps) {
  return (
    <Layout currentPath={props.url.pathname}>
      <OrdersView />
    </Layout>
  );
}
