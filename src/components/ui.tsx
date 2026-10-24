import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  children,
  id,
  tone = "paper",
  labelledBy,
  padding = "py-20 sm:py-24 lg:py-28",
}: {
  className?: string;
  children: ReactNode;
  id?: string;
  tone?: "paper" | "white" | "mist" | "navy";
  labelledBy?: string;
  padding?: string;
}) {
  const tones = {
    paper: "bg-paper",
    white: "bg-white",
    mist: "bg-mist",
    navy: "bg-navy-900 text-white/80",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(padding, tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-sm font-semibold tracking-[0.14em] uppercase",
        onDark ? "text-gold-400" : "text-gold-700",
      )}
    >
      <span aria-hidden className={cn("h-px w-8", onDark ? "bg-gold-400" : "bg-gold-500")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  onDark = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "mt-4 font-serif text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem]",
          onDark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-lg leading-relaxed", onDark ? "text-white/75" : "text-slate")}>{intro}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost-light" | "gold";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-800",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400",
  secondary: "border border-navy-900/20 text-navy-900 hover:border-navy-900 hover:bg-white",
  "ghost-light": "border border-white/30 text-white hover:border-white hover:bg-white/5",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  arrow = false,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; arrow?: boolean }) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-6 py-3 text-base font-semibold transition-colors duration-200",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold text-navy-900 underline decoration-gold-500 decoration-2 underline-offset-[6px] transition-colors hover:text-gold-700",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
