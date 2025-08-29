import Icon, { type IconName } from "./Icon.tsx";

type LinkButtonProps = {
  href: string;
  text: string;
  icon?: IconName;
  fullWidth?: boolean;
  class?: string;
};

export function LinkButton({
  href,
  text,
  icon,
  fullWidth = false,
  class: className = "",
}: LinkButtonProps) {
  return (
    <a
      href={href}
      class={`${
        fullWidth ? "w-full" : "px-3"
      } h-10 rounded-lg font-bold inline-flex items-center justify-center gap-2
        bg-primary-light text-onPrimary-light
        dark:bg-primary-dark dark:text-onPrimary-dark
        transition-opacity disabled:opacity-50 hover:enabled:opacity-90
        ${className}`}
    >
      {icon && <Icon name={icon} size={18} />}
      {text}
    </a>
  );
}
