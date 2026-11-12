import { cn } from "cn";

/**
 * Placeholder identity until a real logo file exists: the assembly seen from
 * directly above, a plate with the red core showing through its aperture.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-6 shrink-0", className)}
    >
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="8" y="8" width="8" height="8" rx="1.25" fill="var(--color-red)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark />
      <span className="text-[1.0625rem] leading-none font-semibold tracking-[-0.01em] [font-stretch:112%]">
        NextSpark
      </span>
    </span>
  );
}
