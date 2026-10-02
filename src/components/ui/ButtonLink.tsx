import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "solid" | "outline" | "text";

const variants: Record<Variant, string> = {
  solid: "bg-bone text-ink hover:bg-gold px-6 py-3.5",
  outline: "border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink px-6 py-3.5",
  text: "text-bone hover:text-gold",
};

type Props = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
};

export function ButtonLink({ variant = "solid", icon = "arrow-right", className, children, ...props }: Props) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full text-xs font-medium tracking-[0.18em] uppercase transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      <Icon name={icon} className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
