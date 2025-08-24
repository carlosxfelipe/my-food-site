import { ComponentChildren } from "preact";
import Navbar from "../islands/Navbar.tsx";

interface LayoutProps {
  children: ComponentChildren;
  fluid?: boolean;
}

export default function Layout({ children, fluid = false }: LayoutProps) {
  const mainClass = `px-4 py-12 flex-grow ${
    fluid ? "w-full" : "max-w-screen-lg mx-auto"
  }`;

  return (
    <>
      <Navbar />
      <main class={mainClass}>
        {children}
      </main>
    </>
  );
}
