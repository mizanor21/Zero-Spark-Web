"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/site/wordmark";
import { NAV_LINKS } from "@/content/nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-ground="charcoal"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-transparent pt-3"
    >
      <div className="shell">
        {/* Denser than the default glass: this bar also crosses bone and red grounds. */}
        <div className="glass pointer-events-auto flex h-14 items-center justify-between gap-4 bg-charcoal/82 pr-1.5 pl-4 [--glass-shadow:0_8px_20px_-14px_rgb(0_0_0/0.4)]">
          <Link
            href="/"
            aria-label="NextSpark, home"
            className="-ml-1 flex h-11 items-center rounded-[2px] px-1"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex h-11 items-center rounded-[2px] px-3.5 text-[0.9375rem] transition-colors duration-200 hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Button asChild>
              <Link href="/apply">Apply</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <MenuIcon className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="glass inset-x-3 top-3 gap-0 p-0 text-foreground sm:inset-x-6"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Sections of the NextSpark program page.
                </SheetDescription>
                <div className="flex h-14 items-center pl-4">
                  <Wordmark />
                </div>
                <nav aria-label="Main" className="border-t border-border p-2">
                  <ul>
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="flex min-h-13 items-center rounded-[2px] px-3 text-[1.375rem] leading-tight font-medium tracking-[-0.01em] [font-stretch:108%] hover:text-signal"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t border-border p-4">
                  <SheetClose asChild>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/apply">Apply to the program</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
