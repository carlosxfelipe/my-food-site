import { ComponentChildren } from "preact";
import Navbar from "../components/Navbar.tsx";

interface LayoutProps {
  children: ComponentChildren;
  fluid?: boolean;
  currentPath?: string;
}

export default function Layout(
  { children, fluid = false, currentPath }: LayoutProps,
) {
  const mainClass = `px-4 pt-24 pb-12 flex-grow ${
    fluid ? "w-full" : "max-w-screen-lg mx-auto"
  }`;

  return (
    <>
      <Navbar currentPath={currentPath} />
      <main class={mainClass}>
        {children}
      </main>
      <div class="mt-[100px]" />
    </>
  );
}
