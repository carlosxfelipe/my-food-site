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
        fullWidth ? "w-full" : ""
      } h-10 px-3 rounded-lg font-bold inline-flex items-center justify-center gap-2
        bg-primary-light text-onPrimary-light
        dark:bg-primary-dark dark:text-onPrimary-dark
        transition-opacity hover:opacity-90
        ${className}`}
    >
      {icon && <Icon name={icon} size={18} />}
      {text}
    </a>
  );
}
