import { JSX } from "preact";
import Icon, { type IconName } from "./Icon.tsx";

type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  text: string;
  icon?: IconName;
  fullWidth?: boolean;
};

export function Button({
  text,
  icon,
  fullWidth = false,
  class: className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      class={`${
        fullWidth ? "w-full" : ""
      } h-10 rounded-lg font-bold inline-flex items-center justify-center gap-2
        bg-primary-light text-onPrimary-light
        dark:bg-primary-dark dark:text-onPrimary-dark
        transition-opacity disabled:opacity-50 hover:enabled:opacity-90
        ${className}`}
    >
      {icon && <Icon name={icon} size={18} />}
      {text}
    </button>
  );
}
