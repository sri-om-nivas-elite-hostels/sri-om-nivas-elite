import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Clock } from "lucide-react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props} />;
}

export function Section({ className = "", ...props }: ComponentProps<"section">) {
  return <section className={`py-16 sm:py-20 ${className}`} {...props} />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-700">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-2 text-3xl font-semibold text-forest-800 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

const buttonStyles = {
  primary:
    "bg-forest-700 text-white shadow-sm hover:bg-forest-800 active:bg-forest-800",
  secondary:
    "border border-forest-700/25 bg-white text-forest-800 hover:border-forest-700 hover:bg-forest-50",
  accent: "bg-terracotta-700 text-white shadow-sm hover:bg-[#743d26]",
} as const;

export type ButtonVariant = keyof typeof buttonStyles;

export const buttonClass = (variant: ButtonVariant = "primary", extra = "") =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200 ${buttonStyles[variant]} ${extra}`;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Visible marker for business details that management has not yet confirmed. */
export function Pending({ children = "Awaiting confirmation" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta-500/40 bg-terracotta-50 px-2.5 py-0.5 text-xs font-semibold text-terracotta-700">
      <Clock aria-hidden="true" className="size-3.5" />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-ivory-deep/60">
      <Container className="py-14 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-forest-800 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        {children}
      </Container>
    </section>
  );
}

export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`rounded-3xl border border-line bg-white ${className}`} {...props} />;
}
