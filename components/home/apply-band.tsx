import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";

export function ApplyBand() {
  return (
    <section data-ground="red" aria-labelledby="apply-heading">
      <div className="shell grid gap-x-6 gap-y-10 py-section lg:grid-cols-12">
        <SectionHeading
          id="apply-heading"
          className="text-display lg:col-span-10"
        >
          In sixteen weeks, present an application you built and deployed.
        </SectionHeading>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-[36ch] text-standfirst">
            Four to six hours a week. No programming experience required.
          </p>
          <Button asChild size="lg" className="mt-8 max-sm:w-full">
            <Link href="/apply">Apply to the program</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
