import Link from "next/link";

import { program } from "@/content/program";
import { NAV_LINKS } from "@/content/nav";
import { Mark } from "@/components/site/wordmark";

export function SiteFooter() {
  return (
    <footer data-ground="charcoal" className="overflow-hidden">
      <div className="shell pt-20 pb-10 md:pt-28">
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <Mark className="size-9" />
            <p className="mt-6 max-w-[24ch] text-standfirst">
              {program.philosophy}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-3 md:col-start-8 lg:col-start-8"
          >
            <h2 className="text-label text-muted-foreground">On this page</h2>
            <ul className="mt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-label text-muted-foreground">Admissions</h2>
            <ul className="mt-3">
              <li>
                <Link
                  href="/apply"
                  className="flex min-h-11 items-center hover:text-signal"
                >
                  Apply to the program
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* The wordmark as the page's closing plate: full measure, one line. */}
        <p
          aria-hidden
          className="mt-20 text-[clamp(2.5rem,14.2vw,12.75rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap select-none [font-stretch:125%] md:mt-28"
        >
          NextSpark
        </p>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-border pt-5 text-label text-muted-foreground">
          <p>© NextSpark</p>
          <p>{program.shortName}</p>
        </div>
      </div>
    </footer>
  );
}
