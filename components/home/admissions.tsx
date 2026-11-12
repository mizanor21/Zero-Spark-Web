import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import {
  careerPreparation,
  certificate,
  faqs,
  program,
} from "@/content/program";

export function Admissions() {
  return (
    <section
      id="admissions"
      data-ground="bone"
      aria-labelledby="admissions-heading"
      className="scroll-mt-16 border-t border-border"
    >
      <div className="shell py-section">
        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="admissions-heading">
              Who the program is for
            </SectionHeading>
            <ul className="mt-8 max-w-[34ch] text-standfirst">
              {program.prerequisites.map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-3 first:pt-0 last:border-b-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-7 lg:col-span-5 lg:col-start-8 lg:pt-3">
            <div>
              <dt className="text-label text-muted-foreground">
                Core curriculum
              </dt>
              <dd className="mt-1 text-[1.375rem] leading-tight font-medium">
                {program.weeks} weeks
              </dd>
            </div>
            <div>
              <dt className="text-label text-muted-foreground">
                Recommended each week
              </dt>
              <dd className="mt-1 text-[1.375rem] leading-tight font-medium">
                {program.weeklyHours}
              </dd>
            </div>
            <div>
              <dt className="text-label text-muted-foreground">
                Structured learning units
              </dt>
              <dd className="mt-1 text-[1.375rem] leading-tight font-medium">
                {program.units}
              </dd>
            </div>
            <div>
              <dt className="text-label text-muted-foreground">
                Industry sessions
              </dt>
              <dd className="mt-1 text-[1.375rem] leading-tight font-medium">
                {program.industrySessions}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-label text-muted-foreground">
                How you learn
              </dt>
              <dd className="mt-1">{program.approach.join(", ")}.</dd>
            </div>
          </dl>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-8 border-t border-foreground pt-8 lg:mt-28 lg:grid-cols-12 lg:pt-10">
          <div className="lg:col-span-4">
            <h3 className="text-h3">Preparing for the job search</h3>
            <p className="mt-3 max-w-[34ch] text-muted-foreground">
              {certificate}
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {careerPreparation.map((item) => (
              <li key={item} className="border-b border-border py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-4 border-t border-foreground pt-8 lg:mt-28 lg:grid-cols-12 lg:pt-10">
          <h3 className="text-h3 lg:col-span-4">Questions before you apply</h3>
          <Accordion
            type="single"
            collapsible
            className="-mt-4 lg:col-span-7 lg:col-start-6"
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger>
                  <span className="text-[1.1875rem] leading-snug font-medium tracking-[-0.01em]">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-[60ch] text-muted-foreground">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
