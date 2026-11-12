"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { easing } from "maath";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

import {
  CORE,
  CORE_SPAN,
  CORE_STEP,
  PLATES,
  PLATE_EXPLODE,
  PLATE_Y,
  activeStep,
  explodeAmount,
  stepForPlate,
} from "@/lib/assembly";

/* ── Geometry ────────────────────────────────────────────────────────────── */

function roundedSquare<T extends THREE.Path>(path: T, size: number, r: number) {
  const a = size / 2;
  path.moveTo(-a + r, -a);
  path.lineTo(a - r, -a);
  path.absarc(a - r, -a + r, r, -Math.PI / 2, 0, false);
  path.lineTo(a, a - r);
  path.absarc(a - r, a - r, r, 0, Math.PI / 2, false);
  path.lineTo(-a + r, a);
  path.absarc(-a + r, a - r, r, Math.PI / 2, Math.PI, false);
  path.lineTo(-a, -a + r);
  path.absarc(-a + r, -a + r, r, Math.PI, Math.PI * 1.5, false);
  return path;
}

/** A machined plate lying flat, centred on the origin, with an optional aperture. */
function plateGeometry(
  size: number,
  thickness: number,
  radius: number,
  aperture?: number,
  apertureRadius = 0.09,
) {
  const shape = roundedSquare(new THREE.Shape(), size, radius);
  if (aperture) {
    shape.holes.push(roundedSquare(new THREE.Path(), aperture, apertureRadius));
  }
  const bevel = Math.min(0.018, thickness * 0.18);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: 3,
    curveSegments: 10,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.center();
  return geometry;
}

const APERTURE = CORE.size + 0.05;
/** How far a focused part slides out of the stack, toward the caption. */
const SLIDE = 0.62;
/** Camera position, and how much of a vertical unit it shows on screen. */
const CAMERA: [number, number, number] = [6, 4.9, 6];
const VIEW_COS = Math.hypot(CAMERA[0], CAMERA[2]) / Math.hypot(...CAMERA);

function useAssemblyAssets() {
  const assets = useMemo(() => {
    const geometries = {
      opening: plateGeometry(PLATES[0].size, PLATES[0].thickness, 0.2),
      foundations: plateGeometry(PLATES[1].size, PLATES[1].thickness, 0.16),
      stud: new THREE.CylinderGeometry(0.05, 0.05, 0.03, 20),
      frontend: plateGeometry(
        PLATES[2].size,
        PLATES[2].thickness,
        0.16,
        APERTURE,
      ),
      backendBody: plateGeometry(
        PLATES[3].size - 0.12,
        PLATES[3].thickness,
        0.12,
        APERTURE,
      ),
      backendFin: plateGeometry(PLATES[3].size, 0.05, 0.16, APERTURE),
      fullstack: plateGeometry(
        PLATES[4].size,
        PLATES[4].thickness,
        0.16,
        1.3,
        0.14,
      ),
      industry: plateGeometry(
        PLATES[5].size,
        PLATES[5].thickness,
        0.18,
        APERTURE,
      ),
      port: new THREE.CylinderGeometry(0.15, 0.15, 0.05, 40),
      core: plateGeometry(CORE.size, CORE_SPAN.height, 0.09),
    };

    const materials = {
      charcoal: new THREE.MeshStandardMaterial({
        color: "#4c4c4e",
        metalness: 0.7,
        roughness: 0.44,
      }),
      bone: new THREE.MeshPhysicalMaterial({
        color: "#ede8df",
        metalness: 0,
        roughness: 0.52,
        clearcoat: 0.3,
        clearcoatRoughness: 0.45,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#ede8df",
        metalness: 0,
        roughness: 0.12,
        transmission: 1,
        thickness: 0.35,
        ior: 1.45,
      }),
      red: new THREE.MeshPhysicalMaterial({
        color: "#b3261e",
        metalness: 0.05,
        roughness: 0.34,
        clearcoat: 0.55,
        clearcoatRoughness: 0.3,
        emissive: "#b3261e",
        emissiveIntensity: 0.04,
      }),
    };

    return { geometries, materials };
  }, []);

  useEffect(
    () => () => {
      Object.values(assets.geometries).forEach((g) => g.dispose());
      Object.values(assets.materials).forEach((m) => m.dispose());
    },
    [assets],
  );

  return assets;
}

/** Stud positions on the foundations plate, leaving the core's seat clear. */
const STUDS: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let ix = -3; ix <= 3; ix++) {
    for (let iz = -3; iz <= 3; iz++) {
      if (Math.abs(ix) <= 1 && Math.abs(iz) <= 1) continue;
      out.push([ix * 0.3, iz * 0.3]);
    }
  }
  return out;
})();

/* ── The object ──────────────────────────────────────────────────────────── */

type RigProps = {
  progress: MotionValue<number>;
  /** Element that receives --leader-x / --leader-y, in its own pixel space. */
  stageRef: RefObject<HTMLElement | null>;
};

function Assembly({ progress, stageRef }: RigProps) {
  const { geometries: g, materials: m } = useAssemblyAssets();

  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  // Part nodes are looked up by name once, on the first frame.
  const parts = useRef<{ plates: THREE.Object3D[]; core: THREE.Object3D } | null>(
    null,
  );

  const intro = useRef({ v: 1 });
  const pointer = useRef({ x: 0, y: 0 });
  const corner = useMemo(() => new THREE.Vector3(), []);
  const lastLeader = useRef({ x: -1, y: -1 });

  const size = useThree((s) => s.size);
  const camera = useThree((s) => s.camera) as THREE.OrthographicCamera;
  const gl = useThree((s) => s.gl);

  // The object leans slightly toward a fine pointer. Touch input is left alone.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = progress.get();
    const exploded = explodeAmount(p);
    const step = exploded > 0.45 ? activeStep(p) : -1;

    // Load: the object arrives slightly open and closes.
    easing.damp(intro.current, "v", 0, 0.42, dt);
    const e = exploded + intro.current.v * 0.3;

    if (!parts.current && tilt.current) {
      const find = (id: string) => tilt.current!.getObjectByName(id)!;
      parts.current = {
        plates: PLATES.map((plate) => find(plate.id)),
        core: find(CORE.id),
      };
    }
    if (!parts.current) return;
    const { plates, core } = parts.current;

    let focusY = 0;
    let focusSize = 0;
    let focusNode: THREE.Object3D | null = null;

    for (let i = 0; i < PLATES.length; i++) {
      const node = plates[i];
      const focused = step === stepForPlate(i);
      const y = PLATE_Y[i] + PLATE_EXPLODE[i] * e;
      easing.damp(node.position, "y", y, 0.2, dt);
      easing.damp(node.position, "z", focused ? SLIDE : 0, 0.26, dt);
      if (focused) {
        focusY = y;
        focusSize = PLATES[i].size;
        focusNode = node;
      }
    }

    {
      const focused = step === CORE_STEP;
      const y = CORE_SPAN.y + PLATE_EXPLODE[3] * e;
      easing.damp(core.position, "y", y, 0.2, dt);
      easing.damp(core.position, "z", focused ? SLIDE * 3.2 : 0, 0.26, dt);
      if (focused) {
        focusY = y;
        focusSize = CORE.size;
        focusNode = core;
      }
    }

    // Frame the object: larger when closed, pulled back when exploded. On a
    // portrait stage the object owns the upper half and the copy the lower.
    const portrait = size.height > size.width * 1.2;
    const fit = portrait
      ? Math.min(size.width / 4.3, (size.height * 0.48) / 4.1)
      : Math.min(size.width / 4.7, size.height / 4.1);
    easing.damp(camera, "zoom", fit * (1 - 0.36 * exploded), 0.34, dt);
    camera.updateProjectionMatrix();

    if (root.current && tilt.current) {
      // Bring the focused part most of the way to the centre, without pushing
      // the far end of the stack out of the frame.
      const focusShift = focusNode ? -focusY * 0.68 : 0;
      const lift = portrait ? (size.height * 0.2) / (camera.zoom * VIEW_COS) : 0;
      easing.damp(root.current.position, "y", focusShift + lift, 0.34, dt);

      const idle = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 * (1 - exploded);
      easing.damp(
        root.current.rotation,
        "y",
        idle + p * 0.42 + pointer.current.x * 0.1,
        0.4,
        dt,
      );
      easing.damp(tilt.current.rotation, "x", pointer.current.y * 0.05, 0.4, dt);
    }

    // Tell the DOM where the focused part's near corner is, for the leader line.
    const stage = stageRef.current;
    if (stage && focusNode) {
      corner.set(-focusSize / 2, 0, focusSize / 2);
      focusNode.localToWorld(corner).project(camera);
      const canvasBox = gl.domElement.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      const x = canvasBox.left - stageBox.left + (corner.x * 0.5 + 0.5) * canvasBox.width;
      const y = canvasBox.top - stageBox.top + (-corner.y * 0.5 + 0.5) * canvasBox.height;
      const last = lastLeader.current;
      if (Math.abs(x - last.x) > 0.5 || Math.abs(y - last.y) > 0.5) {
        last.x = x;
        last.y = y;
        stage.style.setProperty("--leader-x", `${x.toFixed(1)}px`);
        stage.style.setProperty("--leader-y", `${y.toFixed(1)}px`);
      }
    }
  });

  return (
    <group ref={root}>
      <group ref={tilt}>
        {/* Session 01: the base everything stands on */}
        <group name={PLATES[0].id} position-y={PLATE_Y[0]}>
          <mesh geometry={g.opening} material={m.charcoal} />
        </group>

        {/* Weeks 01–04: foundations */}
        <group name={PLATES[1].id} position-y={PLATE_Y[1]}>
          <mesh geometry={g.foundations} material={m.bone} />
          {STUDS.map(([x, z]) => (
            <mesh
              key={`${x}:${z}`}
              geometry={g.stud}
              material={m.charcoal}
              position={[x, PLATES[1].thickness / 2 + 0.012, z]}
            />
          ))}
        </group>

        {/* Weeks 05–08: frontend, the layer you see through */}
        <group name={PLATES[2].id} position-y={PLATE_Y[2]}>
          <mesh geometry={g.frontend} material={m.glass} />
        </group>

        {/* Weeks 09–12: backend and database, the heavy block */}
        <group name={PLATES[3].id} position-y={PLATE_Y[3]}>
          <mesh geometry={g.backendBody} material={m.charcoal} />
          {[-0.15, 0, 0.15].map((y) => (
            <mesh
              key={y}
              geometry={g.backendFin}
              material={m.charcoal}
              position-y={y}
            />
          ))}
        </group>

        {/* Weeks 13–16: full-stack, the frame that holds it together */}
        <group name={PLATES[4].id} position-y={PLATE_Y[4]}>
          <mesh geometry={g.fullstack} material={m.bone} />
        </group>

        {/* Sessions 17–18: DevOps and Odoo, two ports on the lid */}
        <group name={PLATES[5].id} position-y={PLATE_Y[5]}>
          <mesh geometry={g.industry} material={m.charcoal} />
          {[0.78, 0.3].map((z) => (
            <mesh
              key={z}
              geometry={g.port}
              material={m.bone}
              position={[-0.8, PLATES[5].thickness / 2 + 0.02, z]}
            />
          ))}
        </group>

        {/* The capstone: the red core through the middle */}
        <group name={CORE.id} position-y={CORE_SPAN.y}>
          <mesh geometry={g.core} material={m.red} />
        </group>
      </group>
    </group>
  );
}

/* ── Canvas ──────────────────────────────────────────────────────────────── */

export default function AssemblyScene({
  progress,
  stageRef,
  running,
  onReady,
}: RigProps & { running: boolean; onReady: () => void }) {
  return (
    <Canvas
      orthographic
      camera={{ position: CAMERA, zoom: 140, near: 0.1, far: 60 }}
      dpr={[1, 1.75]}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        // Keeps the brand colours close to their specified values.
        gl.toneMapping = THREE.NeutralToneMapping;
        onReady();
      }}
      aria-hidden
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[2.5, 6, 3.5]} intensity={2.3} />
      <directionalLight position={[-4, 2, -2]} intensity={0.55} color="#ede8df" />
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.1}
          position={[0, 5, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[-5, 1.5, 3]}
          rotation-y={Math.PI / 2}
          scale={[6, 1.2, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[4, 1, -5]}
          scale={[5, 2, 1]}
        />
      </Environment>
      <Assembly progress={progress} stageRef={stageRef} />
    </Canvas>
  );
}
