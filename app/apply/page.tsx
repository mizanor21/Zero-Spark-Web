import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { program } from "@/content/program";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to the NextSpark full-stack web development and IT industrial training program.",
};

/**
 * Placeholder for the application flow. The form and its storage are not
 * built yet, so this page says so plainly instead of collecting data that
 * would go nowhere.
 */
export default function ApplyPage() {
  return (
    <main id="main" data-ground="bone" className="flex-1">
      <div className="shell grid gap-x-6 gap-y-12 pt-36 pb-section lg:grid-cols-12 lg:pt-44">
        <div className="lg:col-span-7">
          <h1 className="text-display">Apply to the program</h1>
          <p className="mt-7 max-w-[38ch] text-standfirst text-muted-foreground">
            Online applications are not open on this site yet. The application
            form is still being built.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-9">
            <Link href="/#curriculum">Read the curriculum</Link>
          </Button>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
          <h2 className="text-h3">What the program asks of you</h2>
          <ul className="mt-4">
            {program.prerequisites.map((item) => (
              <li
                key={item}
                className="border-b border-border py-2.5 last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 border-t border-foreground pt-5">
            <div>
              <dt className="text-label text-muted-foreground">
                Core curriculum
              </dt>
              <dd className="mt-1 font-medium">{program.weeks} weeks</dd>
            </div>
            <div>
              <dt className="text-label text-muted-foreground">Each week</dt>
              <dd className="mt-1 font-medium">{program.weeklyHours}</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
