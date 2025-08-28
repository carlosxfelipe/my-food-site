import { JSX } from "preact";
import { Button } from "./Button.tsx";
import type { IconName } from "./Icon.tsx";

type IconButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  icon: IconName;
  ariaLabel: string;
  square?: boolean;
};

export default function IconButton({
  icon,
  ariaLabel,
  square = true,
  class: className = "",
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      text=""
      icon={icon}
      aria-label={ariaLabel}
      class={`${
        square ? "w-10 h-9" : ""
      } bg-transparent dark:bg-transparent border
        border-outline-light/60 dark:border-outline-dark/60
        text-onSurface-light dark:text-onSurface-dark
        ${props.disabled ? "opacity-50" : "hover:opacity-90"}
        ${className}`}
    />
  );
}
