import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      disabled={!IS_BROWSER || props.disabled}
      class={`px-2 py-1 border-2 rounded transition-colors
        border-gray-500 text-black bg-white hover:bg-gray-200
        dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600`}
    />
  );
}
