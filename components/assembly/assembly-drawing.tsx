import {
  CORE,
  CORE_SPAN,
  PLATES,
  PLATE_EXPLODE,
  PLATE_Y,
  type PartMaterial,
} from "@/lib/assembly";

/**
 * The assembly as an isometric line drawing. It stands in for the WebGL
 * scene when motion is reduced or WebGL is unavailable, and shares the scene's
 * dimensions so both always describe the same object.
 */

const UNIT = 60;
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

const project = (x: number, y: number, z: number) =>
  `${((x - z) * COS * UNIT).toFixed(2)},${(((x + z) * SIN - y) * UNIT).toFixed(2)}`;

const FACES: Record<PartMaterial, { top: string; left: string; right: string }> =
  {
    charcoal: { top: "#3b3936", left: "#2c2b29", right: "#232221" },
    bone: { top: "#ede8df", left: "#cfc9bd", right: "#b6b0a3" },
    glass: {
      top: "rgb(237 232 223 / 0.2)",
      left: "rgb(237 232 223 / 0.12)",
      right: "rgb(237 232 223 / 0.07)",
    },
    red: { top: "#b3261e", left: "#8c1c16", right: "#6f1510" },
  };

function Box({
  half,
  bottom,
  top,
  material,
}: {
  half: number;
  bottom: number;
  top: number;
  material: PartMaterial;
}) {
  const a = half;
  const faces = FACES[material];
  const stroke =
    material === "bone" ? "rgb(28 28 28 / 0.35)" : "rgb(237 232 223 / 0.42)";
  return (
    <g stroke={stroke} strokeWidth={0.75} strokeLinejoin="round">
      <polygon
        fill={faces.left}
        points={[
          project(-a, top, a),
          project(a, top, a),
          project(a, bottom, a),
          project(-a, bottom, a),
        ].join(" ")}
      />
      <polygon
        fill={faces.right}
        points={[
          project(a, top, a),
          project(a, top, -a),
          project(a, bottom, -a),
          project(a, bottom, a),
        ].join(" ")}
      />
      <polygon
        fill={faces.top}
        points={[
          project(-a, top, -a),
          project(a, top, -a),
          project(a, top, a),
          project(-a, top, a),
        ].join(" ")}
      />
    </g>
  );
}

function Aperture({
  half,
  y,
  fill,
}: {
  half: number;
  y: number;
  fill: string;
}) {
  return (
    <polygon
      fill={fill}
      points={[
        project(-half, y, -half),
        project(half, y, -half),
        project(half, y, half),
        project(-half, y, half),
      ].join(" ")}
    />
  );
}

export function AssemblyDrawing({
  exploded = false,
  className,
}: {
  exploded?: boolean;
  className?: string;
}) {
  const e = exploded ? 1 : 0;
  const coreLift = PLATE_EXPLODE[3] * e;
  const coreHalf = CORE.size / 2;

  const core = (
    <Box
      key="core"
      half={coreHalf}
      bottom={CORE_SPAN.bottom + coreLift}
      top={CORE_SPAN.top + coreLift}
      material="red"
    />
  );

  return (
    <svg
      viewBox={exploded ? "-155 -200 310 400" : "-155 -125 310 250"}
      role="img"
      aria-label={
        exploded
          ? "Exploded drawing of the program as an assembly: six plates separated along one axis around a red core."
          : "Drawing of the program as one assembled object: six stacked plates with a red core showing through the top."
      }
      className={className}
    >
      {PLATES.map((plate, i) => {
        const lift = PLATE_EXPLODE[i] * e;
        const bottom = PLATE_Y[i] - plate.thickness / 2 + lift;
        const top = PLATE_Y[i] + plate.thickness / 2 + lift;
        return (
          <g key={plate.id}>
            {/* The core rests on the foundations plate and passes through the rest. */}
            {i === 2 ? core : null}
            <Box
              half={plate.size / 2}
              bottom={bottom}
              top={top}
              material={plate.material}
            />
            {plate.id === "fullstack" ? (
              <Aperture half={0.65} y={top} fill="rgb(28 28 28 / 0.55)" />
            ) : null}
            {i >= 2 ? (
              <Aperture half={coreHalf} y={top} fill={FACES.red.top} />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
