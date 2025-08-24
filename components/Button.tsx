import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      disabled={!IS_BROWSER || props.disabled}
      class={`px-4 py-2 rounded font-medium transition-colors
        bg-primary-light text-onPrimary-light hover:opacity-90
        dark:bg-primary-dark dark:text-onPrimary-dark dark:hover:opacity-90`}
    />
  );
}
