import { SectionHeading } from "@/components/site/section-heading";
import { capstone, evaluation } from "@/content/program";

const listRow = "border-b border-border py-2 last:border-b-0";

export function Capstone() {
  return (
    <section
      id="capstone"
      data-ground="bone"
      aria-labelledby="capstone-heading"
      className="scroll-mt-16"
    >
      <div className="shell py-section">
        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="capstone-heading">
                The capstone: one application, built and deployed
              </SectionHeading>
              <p className="mt-7 max-w-[40ch] text-standfirst text-muted-foreground">
                {capstone.objective}
              </p>
              <dl className="mt-9 grid max-w-sm grid-cols-2 gap-x-6 border-t border-border pt-5">
                <div>
                  <dt className="text-label text-muted-foreground">When</dt>
                  <dd className="mt-1 font-medium">{capstone.when}</dd>
                </div>
                <div>
                  <dt className="text-label text-muted-foreground">
                    Share of evaluation
                  </dt>
                  <dd className="mt-1 font-medium">{evaluation[0].weight}%</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-12 lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="text-h3">Projects to choose from</h3>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {capstone.suggestedProjects.map((project) => (
                  <li key={project} className={listRow}>
                    {project}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-h3">Every capstone includes</h3>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {capstone.requiredFeatures.map((feature) => (
                  <li key={feature} className={listRow}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-h3">What you hand in</h3>
              <ol className="mt-4">
                {capstone.deliverables.map((item, i) => (
                  <li key={item} className={`flex gap-5 ${listRow}`}>
                    <span className="w-5 shrink-0 text-label leading-[1.7rem] text-signal">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-8 border-t border-foreground pt-8 lg:mt-28 lg:grid-cols-12 lg:pt-10">
          <div className="lg:col-span-4">
            <h3 className="text-h3">How the program is assessed</h3>
            <p className="mt-3 max-w-[34ch] text-muted-foreground">
              The recommended evaluation model. The capstone weighs as much as
              the weekly work and the technical assessments combined.
            </p>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6">
            {evaluation.map((row, i) => (
              <div
                key={row.area}
                className="flex items-baseline justify-between gap-6 border-b border-border py-3.5 first:pt-0"
              >
                <dt className={i === 0 ? "font-medium" : undefined}>
                  {row.area}
                </dt>
                <dd
                  className={`text-[1.375rem] leading-none font-medium tabular-nums [font-stretch:108%] ${i === 0 ? "text-signal" : ""}`}
                >
                  {row.weight}%
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
