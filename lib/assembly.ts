/**
 * The Assembly: one object whose parts are the program's real structure.
 * This file is the single source for both renderings of it (the WebGL scene
 * and the SVG drawing) and for the scroll choreography that drives them.
 */

export type PartMaterial = "charcoal" | "bone" | "glass" | "red";

export type AssemblyPart = {
  id: string;
  /** Where this part sits in the real program. */
  when: string;
  title: string;
  body: string;
  /** What the learner makes in this part, when the curriculum names it. */
  builds?: string;
  material: PartMaterial;
  /** Footprint (square) and thickness, in scene units. */
  size: number;
  thickness: number;
};

/** Plates, bottom to top. */
export const PLATES: AssemblyPart[] = [
  {
    id: "opening",
    when: "Session 01",
    title: "How the industry builds software",
    body: "Before any code: how software companies plan, develop, test, deliver and maintain a product, and who does what on the team.",
    builds: "You trace a sample project from client requirement to production.",
    material: "charcoal",
    size: 2.7,
    thickness: 0.16,
  },
  {
    id: "foundations",
    when: "Weeks 01–04",
    title: "Web development foundations",
    body: "HTML, CSS and responsive design, Tailwind CSS, then JavaScript fundamentals.",
    builds: "You build a responsive portfolio site and an interactive to-do app.",
    material: "bone",
    size: 2.4,
    thickness: 0.26,
  },
  {
    id: "frontend",
    when: "Weeks 05–08",
    title: "Frontend development",
    body: "React components, hooks and state, project structure, and fetching live data from APIs.",
    builds: "You build a weather app and an app that reads posts from an API.",
    material: "glass",
    size: 2.4,
    thickness: 0.12,
  },
  {
    id: "backend",
    when: "Weeks 09–12",
    title: "Backend and database development",
    body: "Node.js and Express servers, MongoDB with Mongoose, and complete CRUD REST APIs.",
    builds: "You build a Product Management System API.",
    material: "charcoal",
    size: 2.4,
    thickness: 0.46,
  },
  {
    id: "fullstack",
    when: "Weeks 13–16",
    title: "Next.js and full-stack applications",
    body: "The App Router, server and client components, route handlers, authentication and deployment preparation.",
    builds: "You build a full-stack Task Management System with Next.js and MongoDB.",
    material: "bone",
    size: 2.4,
    thickness: 0.2,
  },
  {
    id: "industry",
    when: "Sessions 17–18",
    title: "DevOps and Odoo",
    body: "Two sessions after the core weeks: CI/CD pipelines and hosting with GitHub Actions, then ERP development with Odoo.",
    builds: "You ship an automated deployment and a custom Odoo module.",
    material: "charcoal",
    size: 2.5,
    thickness: 0.14,
  },
];

/** The red core that runs through the frontend, backend and full-stack plates. */
export const CORE: AssemblyPart = {
  id: "capstone",
  when: "Weeks 15–16",
  title: "The capstone",
  body: "One complete application that uses everything before it: responsive frontend, backend API, database, authentication and deployment. It carries 40% of your evaluation.",
  builds: "You present it live, with source, documentation and a deployed URL.",
  material: "red",
  size: 0.66,
  thickness: 0,
};

/**
 * The order the visitor meets the parts in, which is chronological.
 * Indexes 0–4 are plates 0–4, 5 is the core, 6 is the top plate.
 */
export const STEPS: AssemblyPart[] = [
  PLATES[0],
  PLATES[1],
  PLATES[2],
  PLATES[3],
  PLATES[4],
  CORE,
  PLATES[5],
];

export const CORE_STEP = 5;
/** Step index for a plate index, and back. */
export const stepForPlate = (plate: number) => (plate === 5 ? 6 : plate);

/** Space opened between neighbouring plates when exploded, in scene units. */
export const EXPLODE_GAP = 0.34;

/** Assembled centre height of each plate, with the stack centred on y = 0. */
export const PLATE_Y: number[] = (() => {
  const total = PLATES.reduce((sum, p) => sum + p.thickness, 0);
  let cursor = -total / 2;
  return PLATES.map((p) => {
    const y = cursor + p.thickness / 2;
    cursor += p.thickness;
    return y;
  });
})();

/** How far each plate travels when fully exploded (centre plate stays put). */
export const PLATE_EXPLODE: number[] = PLATES.map(
  (_, i) => (i - (PLATES.length - 1) / 2) * EXPLODE_GAP,
);

/** The core spans plates 2–5 and sits flush with the top plate. */
export const CORE_SPAN = (() => {
  const bottom = PLATE_Y[2] - PLATES[2].thickness / 2;
  const top = PLATE_Y[5] + PLATES[5].thickness / 2;
  return { bottom, top, height: top - bottom, y: (top + bottom) / 2 };
})();

/* ── Scroll choreography ─────────────────────────────────────────────────── */

/** Scroll distance of the pinned stage, in viewport heights. */
export const STAGE_SCROLL_VH = 520;

const HERO_END = 0.07;
const EXPLODE_START = 0.08;
const STEPS_START = 0.2;
const STEPS_END = 0.9;
const CLOSE_END = 0.985;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export type StageMode = "hero" | "steps" | "close";

/** Which caption is on screen at scroll progress `p`. */
export function stageMode(p: number): StageMode {
  if (p < HERO_END) return "hero";
  if (p >= STEPS_END) return "close";
  return "steps";
}

/** Index into STEPS at progress `p`, or -1 outside the stepped range. */
export function activeStep(p: number): number {
  if (p < HERO_END || p >= STEPS_END) return -1;
  const t = (Math.max(p, STEPS_START) - STEPS_START) / (STEPS_END - STEPS_START);
  return Math.min(STEPS.length - 1, Math.floor(t * STEPS.length));
}

/** 0 when the object is closed, 1 when fully exploded. */
export function explodeAmount(p: number): number {
  return (
    smoothstep(EXPLODE_START, STEPS_START, p) *
    (1 - smoothstep(STEPS_END, CLOSE_END, p))
  );
}

/** Scroll progress that lands in the middle of a step. */
export function progressForStep(step: number): number {
  const span = (STEPS_END - STEPS_START) / STEPS.length;
  return STEPS_START + span * (step + 0.5);
}
