import type { CSSProperties, ReactNode } from "react";

/**
 * Subtle fade-up as the element scrolls into view, using CSS scroll-driven
 * animations (see globals.css). Content is always rendered visible: browsers
 * without support, users who prefer reduced motion, and no-JS visitors simply
 * see it without animation.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-offset": `${delay * 100}px` } as CSSProperties}>
      {children}
    </div>
  );
}
