import { cn } from "cn";

/**
 * Section headings are labelled the way parts are: a red leader line comes in
 * from the page edge and stops at the heading.
 */
export function SectionHeading({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("relative text-h2", className)}>
      <span
        aria-hidden
        className="absolute top-[0.5em] right-full mr-3 h-px w-screen bg-signal md:mr-5"
      />
      {children}
    </h2>
  );
}
