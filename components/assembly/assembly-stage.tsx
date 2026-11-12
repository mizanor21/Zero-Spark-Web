"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { AssemblyDrawing } from "@/components/assembly/assembly-drawing";
import { program } from "@/content/program";
import {
  STAGE_SCROLL_VH,
  STEPS,
  activeStep,
  progressForStep,
  stageMode,
  type StageMode,
} from "@/lib/assembly";

const AssemblyScene = dynamic(
  () => import("@/components/assembly/assembly-scene"),
  { ssr: false },
);

/* ── Capability checks ───────────────────────────────────────────────────── */

// The pinned, scroll-driven stage is replaced by a plain layout when motion is
// reduced, or when the viewport is too short to hold the hero inside one screen.
const STATIC_QUERY = "(prefers-reduced-motion: reduce), (max-height: 560px)";

function subscribeStatic(onChange: () => void) {
  const media = window.matchMedia(STATIC_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

let webglSupport: boolean | undefined;
function hasWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(
        canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
      );
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const subscribeNever = () => () => {};

/* ── Shared pieces ───────────────────────────────────────────────────────── */

function HeroCopy() {
  return (
    <>
      <h1 className="text-display">
        From your first line of code to a live, deployed product.
      </h1>
      <p className="mt-5 max-w-[46ch] text-standfirst text-muted-foreground lg:mt-7">
        A 16-week program in full-stack web development and IT industrial
        training.
        <span className="max-sm:hidden">
          {" "}
          You learn how software companies plan, build, test and ship, then do
          it yourself.
        </span>
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-9">
        <Button asChild size="lg" className="max-sm:w-full">
          <Link href="/apply">Apply to the program</Link>
        </Button>
        <Button asChild variant="link" className="min-h-11">
          <Link href="/#curriculum">Read the curriculum</Link>
        </Button>
      </div>
      <dl className="mt-9 hidden max-w-xl grid-cols-3 gap-x-6 border-t border-border pt-5 sm:grid lg:mt-12">
        <div>
          <dt className="text-label text-muted-foreground">Core curriculum</dt>
          <dd className="mt-1 font-medium">{program.weeks} weeks</dd>
        </div>
        <div>
          <dt className="text-label text-muted-foreground">Each week</dt>
          <dd className="mt-1 font-medium">{program.weeklyHours}</dd>
        </div>
        <div>
          <dt className="text-label text-muted-foreground">To start</dt>
          <dd className="mt-1 font-medium">No coding experience</dd>
        </div>
      </dl>
    </>
  );
}

function StepText({
  step,
  headingClassName,
}: {
  step: (typeof STEPS)[number];
  headingClassName?: string;
}) {
  return (
    <>
      <h3
        className={cn(
          "text-[clamp(1.5rem,2.5vw,2.375rem)] leading-[1.05] font-medium tracking-[-0.02em] [font-stretch:110%]",
          headingClassName,
        )}
      >
        {step.title}
      </h3>
      <p className="mt-3 max-w-[42ch] text-muted-foreground">{step.body}</p>
      {step.builds ? (
        <p className="mt-3 max-w-[42ch] font-serif text-[1.125rem] leading-snug">
          {step.builds}
        </p>
      ) : null}
    </>
  );
}

/* ── Static layout: reduced motion and short viewports ───────────────────── */

function StaticStage() {
  return (
    <>
      <section data-ground="charcoal">
        <div className="shell grid items-center gap-x-6 gap-y-10 pt-28 pb-16 lg:min-h-svh lg:grid-cols-12 lg:pt-32">
          <div className="lg:col-span-7">
            <HeroCopy />
          </div>
          <AssemblyDrawing className="mx-auto w-full max-w-md lg:col-span-5" />
        </div>
      </section>

      <section
        id="program"
        data-ground="charcoal"
        aria-labelledby="program-heading"
        className="scroll-mt-24 border-t border-border"
      >
        <div className="shell grid gap-x-6 gap-y-12 py-section lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="program-heading" className="text-h2">
              How the program is put together
            </h2>
            <AssemblyDrawing
              exploded
              className="mt-10 w-full max-w-sm lg:sticky lg:top-28"
            />
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {STEPS.map((step) => (
              <li
                key={step.id}
                className="border-t border-border py-8 first:border-t-0 first:pt-0"
              >
                <p className="mb-3 text-label text-signal">{step.when}</p>
                <StepText step={step} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

/* ── Pinned, scroll-driven stage ─────────────────────────────────────────── */

function ScrollStage({ webgl }: { webgl: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<{ mode: StageMode; step: number }>({
    mode: "hero",
    step: -1,
  });
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const mode = stageMode(p);
    const step = activeStep(p);
    setView((current) =>
      current.mode === mode && current.step === step
        ? current
        : { mode, step },
    );
  });

  // The renderer only runs while the stage is on screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goToStep = (step: number) => {
    const node = sectionRef.current;
    if (!node) return;
    const top = node.getBoundingClientRect().top + window.scrollY;
    const distance = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + progressForStep(step) * distance });
  };

  const { mode, step } = view;

  return (
    <section
      ref={sectionRef}
      data-ground="charcoal"
      aria-labelledby="program-heading"
      className="relative"
      style={{ height: `${100 + STAGE_SCROLL_VH}svh` }}
    >
      {/* Anchor for "Program": lands on the first part of the sequence. */}
      <span
        id="program"
        aria-hidden
        className="absolute"
        style={{ top: `${progressForStep(0) * STAGE_SCROLL_VH}svh` }}
      />

      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        {/* The object: the whole stage on small screens, the right side on large. */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out-expo lg:left-auto lg:w-[58%]",
            webgl && !ready ? "opacity-0" : "opacity-100",
          )}
        >
          {webgl ? (
            <AssemblyScene
              progress={scrollYProgress}
              stageRef={stageRef}
              running={inView}
              onReady={() => setReady(true)}
            />
          ) : (
            <AssemblyDrawing
              exploded={mode === "steps"}
              className="absolute inset-x-0 top-20 mx-auto h-[46%] w-full p-4 lg:inset-0 lg:m-auto lg:h-full lg:p-10"
            />
          )}
        </div>

        <div className="shell relative grid h-full grid-rows-[minmax(0,1fr)_auto] pt-20 pb-5 lg:grid-cols-12 lg:grid-rows-1 lg:gap-x-6 lg:py-0">
          {/* Hero */}
          <div
            inert={mode !== "hero"}
            className={cn(
              "relative z-10 col-start-1 row-start-2 transition-[opacity,translate] duration-500 ease-out-expo lg:col-[1/span_6] lg:row-start-1 lg:self-center lg:pt-14",
              mode === "hero"
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0",
            )}
          >
            <HeroCopy />
          </div>

          {/* Parts, in the order the program runs */}
          <div
            inert={mode === "hero"}
            className={cn(
              "relative z-10 col-start-1 row-start-2 self-end transition-opacity duration-500 ease-out-expo max-lg:glass max-lg:p-5 lg:col-[1/span_5] lg:row-start-1 lg:self-stretch",
              mode === "hero" ? "opacity-0" : "opacity-100",
            )}
          >
            <h2 id="program-heading" className="sr-only">
              How the program is put together
            </h2>

            <ol
              className="grid lg:absolute lg:inset-x-0 lg:top-0 lg:block lg:[translate:0_clamp(26svh,var(--leader-y,50svh),60svh)]"
            >
              {STEPS.map((item, i) => (
                <StageCaption
                  key={item.id}
                  active={mode === "steps" && step === i}
                  label={item.when}
                >
                  <StepText step={item} />
                </StageCaption>
              ))}
              <StageCaption
                active={mode === "close"}
                label={`${program.units} units`}
              >
                <h3 className="text-[clamp(1.5rem,2.5vw,2.375rem)] leading-[1.05] font-medium tracking-[-0.02em] [font-stretch:110%]">
                  Put together, it is one program
                </h3>
                <p className="mt-3 max-w-[42ch] text-muted-foreground">
                  One opening session, sixteen weekly units and two industry
                  sessions.
                </p>
                <Button asChild variant="link" className="mt-3 min-h-11">
                  <Link href="/#curriculum">Read it week by week</Link>
                </Button>
              </StageCaption>
            </ol>

            {/* One axis: every part is a stop on the same scroll. */}
            <ol
              aria-label="Parts of the program"
              className="mt-4 flex gap-1 lg:absolute lg:inset-x-0 lg:bottom-9 lg:mt-0 lg:max-w-md"
            >
              {STEPS.map((item, i) => {
                const current = mode === "steps" && step === i;
                return (
                  <li key={item.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => goToStep(i)}
                      aria-current={current ? "step" : undefined}
                      className="group/tick flex h-11 w-full items-center"
                    >
                      <span
                        className={cn(
                          "block w-full transition-[height,background-color] duration-300 ease-out-expo",
                          current
                            ? "h-[3px] bg-signal"
                            : "h-px bg-rule group-hover/tick:h-[3px] group-hover/tick:bg-foreground",
                        )}
                      />
                      <span className="sr-only">
                        {item.when}: {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Leader line: from the label to the part it names. Desktop only. */}
        {webgl ? (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-0 top-0 hidden h-px origin-left bg-signal transition-[opacity,scale] duration-500 ease-out-expo lg:block",
              mode === "steps" ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
            )}
            style={{
              translate:
                "var(--caption-x, 4.5rem) clamp(26svh, var(--leader-y, 50svh), 60svh)",
              width: "calc(var(--leader-x, 50vw) - var(--caption-x, 4.5rem))",
            }}
          >
            <span className="absolute top-1/2 right-0 size-[7px] translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
          </div>
        ) : null}
        <CaptionEdge stageRef={stageRef} />
      </div>
    </section>
  );
}

/**
 * One caption. On small screens captions stack in one cell of the glass panel;
 * on large screens each hangs from the leader line's height, label above it and
 * text below, so the line runs straight from the label to the part it names.
 */
function StageCaption({
  active,
  label,
  children,
}: {
  active: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <li
      inert={!active}
      className={cn(
        "col-start-1 row-start-1 transition-[opacity,translate] duration-500 ease-out-expo lg:absolute lg:inset-x-0 lg:top-0",
        active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <p className="mb-3 text-label text-signal lg:absolute lg:bottom-full lg:mb-3.5">
        {label}
      </p>
      <div className="lg:pt-5">{children}</div>
    </li>
  );
}

/** Publishes the caption column's left edge so the leader line can start there. */
function CaptionEdge({
  stageRef,
}: {
  stageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const probe = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const node = probe.current;
    if (!stage || !node) return;
    const measure = () => {
      const x = node.getBoundingClientRect().left - stage.getBoundingClientRect().left;
      stage.style.setProperty("--caption-x", `${x.toFixed(1)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef]);

  return (
    <div aria-hidden className="shell pointer-events-none absolute inset-x-0 top-0 h-0">
      <div ref={probe} />
    </div>
  );
}

/* ── Entry ───────────────────────────────────────────────────────────────── */

export function AssemblyStage() {
  const isStatic = useSyncExternalStore(
    subscribeStatic,
    () => window.matchMedia(STATIC_QUERY).matches,
    () => false,
  );
  const webgl = useSyncExternalStore(subscribeNever, hasWebGL, () => true);

  return isStatic ? <StaticStage /> : <ScrollStage webgl={webgl} />;
}
