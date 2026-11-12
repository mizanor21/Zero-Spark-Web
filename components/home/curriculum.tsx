import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { pad, phases, program } from "@/content/program";

export function Curriculum() {
  return (
    <section
      id="curriculum"
      data-ground="bone"
      aria-labelledby="curriculum-heading"
      className="scroll-mt-16"
    >
      <div className="shell py-section">
        <div className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
          <SectionHeading id="curriculum-heading" className="lg:col-span-8">
            Sixteen weeks, and what you build in each
          </SectionHeading>
          <p className="text-standfirst text-muted-foreground lg:col-span-4 lg:pt-2">
            Every week has a practical assignment and an assessment. Open a
            week to see what it covers.
          </p>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-2 border-t border-border pt-5 lg:mt-16 lg:grid-cols-12">
          <h3 className="text-label text-muted-foreground lg:col-span-4">
            Technologies covered
          </h3>
          <p className="max-w-[64ch] lg:col-span-8">
            {program.technologies.join(", ")}.
          </p>
        </div>

        <div className="mt-14 lg:mt-20">
          {phases.map((phase) => {
            const first = phase.weeks[0].n;
            const last = phase.weeks[phase.weeks.length - 1].n;
            return (
              <div
                key={phase.id}
                className="grid gap-x-6 gap-y-6 border-t border-foreground pt-8 pb-12 lg:grid-cols-12 lg:pt-10 lg:pb-20"
              >
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="text-label">
                      <span className="text-signal">Phase {pad(phase.n)}</span>
                      <span className="ml-3 text-muted-foreground">
                        Weeks {pad(first)}–{pad(last)}
                      </span>
                    </p>
                    <h3 className="mt-3 max-w-[16ch] text-[clamp(1.5rem,2.3vw,2.125rem)] leading-[1.08] font-medium tracking-[-0.02em] [font-stretch:108%]">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                <Accordion
                  type="multiple"
                  className="-mt-4 lg:col-span-8 lg:-mt-4"
                >
                  {phase.weeks.map((week) => (
                    <AccordionItem key={week.n} value={`week-${week.n}`}>
                      <AccordionTrigger>
                        <span className="flex items-baseline gap-4 sm:gap-6">
                          <span className="w-15 shrink-0 text-label text-muted-foreground">
                            Week {pad(week.n)}
                          </span>
                          <span className="text-[1.1875rem] leading-snug font-medium tracking-[-0.01em]">
                            {week.title}
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="grid gap-x-10 gap-y-7 sm:pl-21 md:grid-cols-2">
                        <div>
                          <p className="font-serif text-[1.125rem] leading-snug">
                            {week.objective}
                          </p>
                          <dl className="mt-6 space-y-4">
                            <div>
                              <dt className="text-label text-signal">
                                You build
                              </dt>
                              <dd className="mt-1">{week.assignment}</dd>
                            </div>
                            <div>
                              <dt className="text-label text-muted-foreground">
                                Assessed by
                              </dt>
                              <dd className="mt-1 text-muted-foreground">
                                {week.assessment}
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-label text-muted-foreground">
                            Topics
                          </h4>
                          <ul className="mt-2 text-[0.9375rem] leading-relaxed">
                            {week.topics.map((topic) => (
                              <li
                                key={topic}
                                className="border-b border-border py-1.5 last:border-b-0"
                              >
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
