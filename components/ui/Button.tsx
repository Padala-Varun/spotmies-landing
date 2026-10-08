import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "accent";

const base =
  "group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full text-sm font-medium tracking-tight transition-[color,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-smooth)]";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-black pl-6 pr-1.5 py-1.5 hover:shadow-[0_0_40px_-6px_rgba(0,238,249,0.55)]",
  accent: "bg-accent text-black pl-6 pr-1.5 py-1.5 shadow-[0_0_40px_-10px_rgba(0,238,249,0.8)] hover:shadow-[0_0_60px_-6px_rgba(0,238,249,0.9)]",
  ghost: "glass text-fg pl-6 pr-1.5 py-1.5 hover:border-line-strong",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-black text-fg",
  accent: "bg-black text-accent",
  ghost: "bg-white/10 text-fg",
};

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: Variant;
  icon?: ReactNode;
  magnetic?: boolean;
};

/** Pill link with a rolling label and an icon that slides through on hover. */
export function ButtonLink({
  variant = "primary",
  icon,
  magnetic = true,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const content = (
    <a className={cn(base, variants[variant], className)} {...props}>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-smooth)] group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-smooth)] group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={cn(
          "relative grid size-9 place-items-center overflow-hidden rounded-full",
          iconWrap[variant],
        )}
      >
        <span className="transition-transform duration-500 ease-[var(--ease-smooth)] group-hover/btn:translate-x-6 group-hover/btn:-translate-y-6">
          {icon ?? <ArrowUpRight className="size-4" />}
        </span>
        <span
          aria-hidden
          className="absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
        >
          {icon ?? <ArrowUpRight className="size-4" />}
        </span>
      </span>
    </a>
  );
  return magnetic ? <Magnetic strength={0.25}>{content}</Magnetic> : content;
}

/** Small mono label used above section titles, e.g. "(01) Services". */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted", className)}>
      {index ? <span className="text-accent">({index})</span> : null}
      <span className="h-px w-8 bg-line-strong" aria-hidden />
      {children}
    </p>
  );
}
