import { SectionHeading } from "@/components/site/section-heading";
import { industrySessions, industryStatement, pad } from "@/content/program";

export function IndustrySessions() {
  return (
    <section
      id="industry"
      data-ground="charcoal"
      aria-labelledby="industry-heading"
      className="scroll-mt-16"
    >
      <div className="shell py-section">
        <div className="grid gap-x-6 lg:grid-cols-12">
          <SectionHeading id="industry-heading" className="lg:col-span-7">
            Three sessions on how the industry works
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-x-6 lg:mt-24 lg:grid-cols-12">
          <figure className="lg:col-span-9 lg:col-start-4">
            <p className="font-serif text-[clamp(1.625rem,3.3vw,3rem)] leading-[1.16] tracking-[-0.01em] text-balance">
              {industryStatement}
            </p>
            <figcaption className="mt-5 text-label text-muted-foreground">
              What Session 01 is there to teach, in the curriculum&rsquo;s own
              words
            </figcaption>
          </figure>
        </div>

        <ol className="mt-16 lg:mt-28">
          {industrySessions.map((session) => (
            <li
              key={session.n}
              className="grid gap-x-6 gap-y-6 border-t border-border py-10 lg:grid-cols-12 lg:py-14"
            >
              <p className="text-label lg:col-span-2">
                <span className="block text-signal">
                  Session {pad(session.n)}
                </span>
                <span className="mt-1 block text-muted-foreground">
                  {session.when}
                </span>
              </p>

              <div className="lg:col-span-5">
                <h3 className="max-w-[22ch] text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.12] font-medium tracking-[-0.015em] [font-stretch:108%]">
                  {session.title}
                </h3>
                <p className="mt-4 max-w-[44ch] text-muted-foreground">
                  {session.objective}
                </p>
              </div>

              <div className="space-y-6 lg:col-span-4 lg:col-start-9">
                <div>
                  <h4 className="text-label text-muted-foreground">Covers</h4>
                  <ul className="mt-2 text-[0.9375rem] leading-relaxed">
                    {session.covers.map((item) => (
                      <li
                        key={item}
                        className="border-b border-border py-1.5 last:border-b-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-label text-signal">In the lab</h4>
                  <p className="mt-2 font-serif text-[1.125rem] leading-snug">
                    {session.lab}
                  </p>
                </div>
                {session.deliverables.length > 0 ? (
                  <div>
                    <h4 className="text-label text-muted-foreground">
                      You deliver
                    </h4>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed">
                      {session.deliverables.join(", ")}.
                    </p>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
