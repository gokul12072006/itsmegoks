"use client";

/**
 * CINEMATIC ENVIRONMENTAL BACKGROUND SYSTEM
 * 
 * Architecture:
 * - Wind system driven by mouse velocity (hover-based environmental activation)
 * - Per-leaf rAF physics with gravity, drag, turbulence, and inertia
 * - 3-layer parallax depth (bg/mid/fg) with Framer Motion springs
 * - Independent volumetric fog layers with staggered drift
 * - SVG feTurbulence water ripple distortion
 * - Cinematic mountain breathing motion
 * 
 * CONFIG object controls all motion intensity settings.
 */

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";

// ─── Configurable Motion Intensity ───────────────────────────────
const CONFIG = {
  wind: {
    sensitivity: 0.12,
    maxSpeed: 18,
    decay: 0.965,
    idleStrength: 0.4,
    gustChance: 0.002,
    gustStrength: 8,
  },
  leaf: {
    count: 35,
    gravity: 0.65,
    drag: 0.975,
    turbulenceScale: 0.8,
    rotationDamping: 0.6,
    // Spring physics
    pendulumFreq: 0.0012,   // Lateral sway frequency
    pendulumAmp: 1.8,       // Lateral sway amplitude
    flutterChance: 0.003,   // Chance per frame to catch air
    flutterLift: -0.6,      // Upward lift when catching air
    flutterDuration: 80,    // Frames a flutter lasts
    spiralTightness: 0.4,   // Tightness of spiral descent
  },
  parallax: {
    bg: 0.4,
    mid: 1.2,
    fg: 2.5,
  },
  breathing: {
    scale: 1.015,
    duration: 30,
  },
};

// ─── Realistic Autumn Leaf SVG Paths ─────────────────────────────
const LEAF_PATHS = [
  // Maple leaf
  "M256 32l-30 80-70-50 20 80-85 10 65 55-40 75 70-30 70 30-40-75 65-55-85-10 20-80-70 50z",
  // Oak-style rounded leaf
  "M256 480c-8 0-15-4-19-11L140 300c-20-30-30-65-30-100 0-90 65-168 146-168s146 78 146 168c0 35-10 70-30 100l-97 169c-4 7-11 11-19 11z",
  // Elm / teardrop leaf
  "M256 20c-50 60-120 140-120 240 0 90 54 160 120 220 66-60 120-130 120-220 0-100-70-180-120-240z",
  // Pointed birch leaf
  "M256 16L200 140l-80-20 50 90-60 50 90 20-10 90 66-60 66 60-10-90 90-20-60-50 50-90-80 20z",
  // Round aspen leaf
  "M256 40c-100 0-180 85-180 190s80 190 180 190 180-85 180-190S356 40 256 40zM256 50l8 170h-16L256 50z",
];

// ─── Seeded random for SSR-safe stable values ───────────────────
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Individual Leaf with rAF Physics ────────────────────────────
interface LeafProps {
  id: number;
  layer: "fg" | "mid" | "bg";
  windX: MotionValue<number>;
  windY: MotionValue<number>;
  pathIndex: number;
  color: string;
}

const Leaf = React.memo(({ id, layer, windX, windY, pathIndex, color }: LeafProps) => {
  const rng = useMemo(() => seededRandom(id * 7919 + 1), [id]);

  // Stable per-leaf random values (computed once)
  const initX = useMemo(() => rng() * 100, [rng]);
  const initY = useMemo(() => -(rng() * 80 + 10), [rng]);
  const phase = useMemo(() => rng() * Math.PI * 2, [rng]);
  const phaseY = useMemo(() => rng() * Math.PI * 2, [rng]);
  const pendulumPhase = useMemo(() => rng() * Math.PI * 2, [rng]);
  const pendulumAmp = useMemo(() => CONFIG.leaf.pendulumAmp * (0.6 + rng() * 0.8), [rng]);
  const pendulumFreq = useMemo(() => CONFIG.leaf.pendulumFreq * (0.7 + rng() * 0.6), [rng]);
  const spiralDir = useMemo(() => (rng() > 0.5 ? 1 : -1), [rng]);

  const size = useMemo(() =>
    layer === "fg" ? 22 + rng() * 14
    : layer === "mid" ? 14 + rng() * 8
    : 8 + rng() * 6, [layer, rng]);

  const depthBlur = layer === "fg" ? 2.5 : layer === "mid" ? 0.6 : 0;
  const depthOpacity = layer === "fg" ? 0.9 : layer === "mid" ? 0.6 : 0.3;
  const mass = layer === "fg" ? 1.5 : layer === "mid" ? 1.0 : 0.6;
  const windMult = layer === "fg" ? 1.0 : layer === "mid" ? 0.55 : 0.2;

  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({
    x: initX, y: initY,
    vx: (rng() - 0.5) * 0.6, vy: CONFIG.leaf.gravity * mass * 0.3,
    rz: rng() * 360, rx: rng() * 40, ry: rng() * 40,
    vrz: (rng() - 0.5) * 1.0,
    vrx: (rng() - 0.5) * 0.4,
    vry: (rng() - 0.5) * 0.4,
    // Spring physics state
    flutterTimer: 0,        // Countdown when catching air
    isFluttering: false,     // Currently caught in an updraft
    scaleX: 1,               // For flip/tumble visual
  });

  useAnimationFrame((t, delta) => {
    const el = ref.current;
    if (!el) return;
    const dt = Math.min(delta / 16.67, 3);
    const s = state.current;
    const wx = windX.get() * windMult;
    const wy = windY.get() * windMult;

    // ── SPRING PENDULUM SWAY ──
    // Leaves swing side-to-side like a pendulum as they fall
    const pendulumSwing = Math.sin(t * pendulumFreq + pendulumPhase) * pendulumAmp;
    const pendulumAccel = Math.cos(t * pendulumFreq + pendulumPhase) * pendulumAmp * 0.02;

    // ── FLUTTER / AIR-CATCHING ──
    // Random chance the leaf catches air and momentarily lifts
    if (!s.isFluttering && Math.random() < CONFIG.leaf.flutterChance) {
      s.isFluttering = true;
      s.flutterTimer = CONFIG.leaf.flutterDuration * (0.5 + Math.random());
      // Sudden tumble rotation burst
      s.vrx += (Math.random() - 0.5) * 4;
      s.vry += (Math.random() - 0.5) * 4;
      s.vrz += (Math.random() - 0.5) * 3;
    }

    if (s.isFluttering) {
      s.flutterTimer -= dt;
      // Lift force (leaf catches air, slows fall)
      const liftProgress = s.flutterTimer / CONFIG.leaf.flutterDuration;
      const liftEase = Math.sin(liftProgress * Math.PI); // smooth bell curve
      s.vy += CONFIG.leaf.flutterLift * liftEase * dt * 0.08;
      // Extra lateral drift during flutter
      s.vx += spiralDir * 0.03 * liftEase * dt;
      if (s.flutterTimer <= 0) s.isFluttering = false;
    }

    // ── ORGANIC TURBULENCE (multi-frequency) ──
    const driftX = Math.sin(t / 2200 + phase) * CONFIG.leaf.turbulenceScale
                 + Math.sin(t / 3800 + phase * 1.7) * CONFIG.leaf.turbulenceScale * 0.35
                 + Math.sin(t / 900 + phase * 2.3) * CONFIG.leaf.turbulenceScale * 0.1;
    const driftY = Math.cos(t / 2800 + phaseY) * CONFIG.leaf.turbulenceScale * 0.25
                 + Math.sin(t / 1400 + phaseY * 1.3) * CONFIG.leaf.turbulenceScale * 0.08;

    // ── SPIRAL DESCENT ──
    const spiralX = Math.sin(t / 1600 + phase) * CONFIG.leaf.spiralTightness * spiralDir;
    const spiralY = Math.cos(t / 1600 + phase) * CONFIG.leaf.spiralTightness * 0.3;

    // ── WIND FORCE ──
    s.vx += (wx * CONFIG.wind.sensitivity + driftX * 0.04 + pendulumAccel) * dt;
    s.vy += (wy * CONFIG.wind.sensitivity * 0.25 + driftY * 0.015) * dt;

    // ── AIR RESISTANCE & GRAVITY (spring-damped) ──
    s.vx *= CONFIG.leaf.drag;
    s.vy = s.vy * CONFIG.leaf.drag + CONFIG.leaf.gravity * mass * 0.025 * dt;

    // ── POSITION INTEGRATION ──
    s.x += (s.vx + driftX * 0.12 + pendulumSwing * 0.04 + spiralX * 0.08) * dt * 0.12;
    s.y += (s.vy + spiralY * 0.04) * dt * 0.12;

    // ── ROTATION (spring-damped, wind-reactive) ──
    s.vrz += wx * 0.006 * dt;
    // Pendulum induces gentle Z-rotation
    s.vrz += pendulumAccel * 0.15 * dt;
    s.vrz *= 0.98;
    s.vrx *= 0.985;
    s.vry *= 0.985;
    s.rz += s.vrz * dt * CONFIG.leaf.rotationDamping;
    s.rx += s.vrx * dt * 0.5;
    s.ry += s.vry * dt * 0.5;

    // ScaleX flip (leaf tumble visual — looks like it's turning over)
    s.scaleX = 0.4 + Math.abs(Math.cos(t / 1800 + phase)) * 0.6;

    // ── RESPAWN ──
    if (s.y > 115) {
      s.y = -(rng() * 20 + 5);
      s.x = rng() * 110 - 5;
      s.vx = (rng() - 0.5) * 0.4;
      s.vy = CONFIG.leaf.gravity * mass * 0.2;
      s.vrz = (rng() - 0.5) * 0.8;
      s.vrx = (rng() - 0.5) * 0.3;
      s.vry = (rng() - 0.5) * 0.3;
      s.isFluttering = false;
      s.flutterTimer = 0;
    }
    if (s.x > 112) s.x = -10;
    if (s.x < -12) s.x = 110;

    // GPU transform
    el.style.transform = `translate3d(${s.x}%, ${s.y}%, 0) rotateZ(${s.rz}deg) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scaleX(${s.scaleX})`;
  });

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 will-change-transform"
      style={{
        width: size,
        height: size,
        filter: depthBlur > 0 ? `blur(${depthBlur}px)` : undefined,
        opacity: depthOpacity,
        zIndex: layer === "fg" ? 30 : layer === "mid" ? 20 : 10,
      }}
    >
      <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-sm" style={{ fill: color }}>
        <path d={LEAF_PATHS[pathIndex]} />
      </svg>
    </div>
  );
});
Leaf.displayName = "Leaf";

// ─── Fog Cloud Element ───────────────────────────────────────────
const FogCloud = ({ className, xRange, yRange, opacityRange, duration, delay = 0 }: {
  className: string;
  xRange: [string, string, string];
  yRange?: [string, string, string];
  opacityRange: [number, number, number];
  duration: number;
  delay?: number;
}) => (
  <motion.div
    className={className}
    animate={{
      x: xRange,
      ...(yRange ? { y: yRange } : {}),
      opacity: opacityRange,
    }}
    transition={{
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    }}
  />
);

// ─── Main Component ──────────────────────────────────────────────
const CinematicBackground = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Cinematic parallax springs (heavy, slow, smooth)
  const parallaxSpring = { damping: 80, stiffness: 20, mass: 2.5 };
  const smoothX = useSpring(mouseX, parallaxSpring);
  const smoothY = useSpring(mouseY, parallaxSpring);

  // Wind physics (springy, responsive to cursor velocity)
  const windX = useSpring(0, { damping: 35, stiffness: 40, mass: 1.2 });
  const windY = useSpring(0, { damping: 45, stiffness: 35, mass: 1.5 });

  // Depth-based parallax transforms
  const bgX = useTransform(smoothX, [0, 1], [`-${CONFIG.parallax.bg}%`, `${CONFIG.parallax.bg}%`]);
  const bgY = useTransform(smoothY, [0, 1], [`-${CONFIG.parallax.bg * 0.6}%`, `${CONFIG.parallax.bg * 0.6}%`]);
  const midX = useTransform(smoothX, [0, 1], [`-${CONFIG.parallax.mid}%`, `${CONFIG.parallax.mid}%`]);
  const midY = useTransform(smoothY, [0, 1], [`-${CONFIG.parallax.mid * 0.6}%`, `${CONFIG.parallax.mid * 0.6}%`]);
  const fgX = useTransform(smoothX, [0, 1], [`-${CONFIG.parallax.fg}%`, `${CONFIG.parallax.fg}%`]);
  const fgY = useTransform(smoothY, [0, 1], [`-${CONFIG.parallax.fg * 0.5}%`, `${CONFIG.parallax.fg * 0.5}%`]);

  // Mouse velocity tracking for wind generation
  const lastMouse = useRef({ x: 0, y: 0, t: performance.now() });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set(nx);
    mouseY.set(ny);

    const now = performance.now();
    const dt = now - lastMouse.current.t;
    if (dt > 8) {
      const vx = ((nx - lastMouse.current.x) / dt) * 1000;
      const vy = ((ny - lastMouse.current.y) / dt) * 1000;
      // Only add wind when cursor moves with intent
      if (Math.abs(vx) > 0.3) windX.set(Math.max(-CONFIG.wind.maxSpeed, Math.min(CONFIG.wind.maxSpeed, windX.get() + vx * 12)));
      if (Math.abs(vy) > 0.3) windY.set(Math.max(-CONFIG.wind.maxSpeed, Math.min(CONFIG.wind.maxSpeed, windY.get() + vy * 8)));
      lastMouse.current = { x: nx, y: ny, t: now };
    }
  }, [mouseX, mouseY, windX, windY]);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Wind decay + idle breeze + random gusts
  useAnimationFrame((t) => {
    let wx = windX.get();
    let wy = windY.get();

    // Natural decay
    wx *= CONFIG.wind.decay;
    wy *= CONFIG.wind.decay;

    // Idle ambient breeze (scene stays alive)
    wx += Math.sin(t / 4000) * CONFIG.wind.idleStrength * 0.05;
    wy += Math.cos(t / 5500) * CONFIG.wind.idleStrength * 0.02;

    // Occasional random gusts
    if (Math.random() < CONFIG.wind.gustChance) {
      wx += (Math.random() - 0.5) * CONFIG.wind.gustStrength;
    }

    windX.set(wx);
    windY.set(wy);
  });

  // Generate leaf data (stable across renders)
  const AUTUMN_COLORS = ["#d97736", "#c4592a", "#e8943a", "#b8472a", "#d4783c", "#cf6830", "#e2a04e"];
  const leaves = useMemo(() => {
    const rng = seededRandom(42);
    return Array.from({ length: CONFIG.leaf.count }, (_, i) => ({
      id: i,
      layer: (i % 5 === 0 ? "fg" : i % 3 === 0 ? "mid" : "bg") as "fg" | "mid" | "bg",
      pathIndex: Math.floor(rng() * LEAF_PATHS.length),
      color: AUTUMN_COLORS[Math.floor(rng() * AUTUMN_COLORS.length)],
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 overflow-hidden bg-[#0b1018] pointer-events-none select-none rounded-b-3xl sm:rounded-b-none"
    >
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="water-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.015" numOctaves="3" seed="2" result="noise">
              <animate attributeName="baseFrequency" values="0.004 0.015;0.006 0.022;0.004 0.015" dur="24s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="fog-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
      </svg>

      {/* Cinematic Breathing Container */}
      <motion.div
        className="absolute inset-[-8%] w-[116%] h-[116%]"
        animate={{ scale: [1, CONFIG.breathing.scale, 1] }}
        transition={{ duration: CONFIG.breathing.duration, ease: "easeInOut", repeat: Infinity }}
      >
        {/* ── LAYER 1: SKY & DISTANT MOUNTAINS ── */}
        <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY }}>
          <motion.div
            className="w-full h-full"
            animate={{ x: ["0%", "0.3%", "-0.2%", "0%"] }}
            transition={{ duration: 45, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src={`${basePath}/images/hero-sec/banner-bg-img.png`}
              alt="Distant mountains"
              fill
              className="object-cover object-top"
              priority
              style={{
                maskImage: "linear-gradient(to bottom, black 35%, transparent 68%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 68%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Deep Background Volumetric Fog */}
        <motion.div className="absolute inset-0 mix-blend-screen" style={{ x: bgX, y: bgY, filter: "blur(45px)" }}>
          <FogCloud
            className="absolute top-[8%] left-[15%] w-[55%] h-[35%] rounded-full bg-blue-100/25"
            xRange={["-3%", "3%", "-3%"]}
            opacityRange={[0.12, 0.22, 0.12]}
            duration={38}
          />
          <FogCloud
            className="absolute top-[15%] right-[10%] w-[40%] h-[25%] rounded-full bg-slate-200/15"
            xRange={["2%", "-4%", "2%"]}
            opacityRange={[0.08, 0.18, 0.08]}
            duration={42}
            delay={8}
          />
        </motion.div>

        {/* ── LAYER 2: MIDGROUND MOUNTAINS ── */}
        <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
          <motion.div
            className="w-full h-full"
            animate={{ y: ["0%", "0.6%", "0%"], x: ["0%", "-0.2%", "0%"] }}
            transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src={`${basePath}/images/hero-sec/banner-bg-img.png`}
              alt="Mid mountains"
              fill
              className="object-cover object-center"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 12%, black 42%, black 58%, transparent 78%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 12%, black 42%, black 58%, transparent 78%)",
                transform: "scale(1.03) translateY(3%)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Mid-Level Independent Fog Wisps */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ filter: "blur(32px)" }}>
          <FogCloud
            className="absolute top-[28%] left-[-12%] w-[55%] h-[28%] rounded-full bg-cyan-50/15 mix-blend-screen"
            xRange={["0%", "22%", "0%"]}
            yRange={["0%", "2%", "0%"]}
            opacityRange={[0.15, 0.35, 0.15]}
            duration={44}
          />
          <FogCloud
            className="absolute top-[38%] right-[-8%] w-[60%] h-[32%] rounded-full bg-white/10 mix-blend-screen"
            xRange={["0%", "-18%", "0%"]}
            yRange={["0%", "-1%", "0%"]}
            opacityRange={[0.1, 0.28, 0.1]}
            duration={50}
            delay={6}
          />
          <FogCloud
            className="absolute top-[44%] left-[20%] w-[35%] h-[18%] rounded-full bg-slate-100/12 mix-blend-screen"
            xRange={["-5%", "8%", "-5%"]}
            opacityRange={[0.08, 0.2, 0.08]}
            duration={36}
            delay={12}
          />
        </motion.div>

        {/* ── LAYER 3: FOREGROUND WATER & SHORE ── */}
        <motion.div className="absolute inset-0" style={{ x: fgX, y: fgY }}>
          <div
            className="absolute inset-0"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 42%, black 62%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 42%, black 62%, black 100%)",
              transform: "scale(1.05) translateY(5%)",
            }}
          >
            <Image
              src={`${basePath}/images/hero-sec/banner-bg-img.png`}
              alt="Water and shore"
              fill
              className="object-cover object-bottom"
              style={{ filter: "url(#water-distort)" }}
            />
            {/* Water shimmer — gentle light play */}
            <motion.div
              className="absolute bottom-0 w-full h-[40%] mix-blend-overlay"
              style={{
                background: "linear-gradient(to top, rgba(180,210,230,0.15), rgba(255,255,255,0.03), transparent)",
              }}
              animate={{ opacity: [0.08, 0.3, 0.08], y: ["0%", "2%", "0%"] }}
              transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            />
            {/* Secondary shimmer, offset timing */}
            <motion.div
              className="absolute bottom-[5%] left-[20%] w-[60%] h-[25%] rounded-full mix-blend-overlay bg-white/5"
              animate={{ opacity: [0, 0.12, 0], scaleX: [0.9, 1.1, 0.9] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 3 }}
            />
          </div>
        </motion.div>

        {/* Low-Hanging Foreground Mist */}
        <motion.div
          className="absolute bottom-[-8%] left-0 w-full h-[45%] mix-blend-screen"
          style={{ x: fgX, filter: "blur(22px)" }}
        >
          <FogCloud
            className="absolute bottom-[8%] left-[-18%] w-[75%] h-[55%] rounded-full bg-slate-200/12"
            xRange={["-2%", "4%", "-2%"]}
            yRange={["0%", "-2%", "0%"]}
            opacityRange={[0.1, 0.22, 0.1]}
            duration={30}
          />
          <FogCloud
            className="absolute bottom-[3%] right-[-12%] w-[85%] h-[45%] rounded-full bg-cyan-50/10"
            xRange={["2%", "-3%", "2%"]}
            opacityRange={[0.08, 0.18, 0.08]}
            duration={34}
            delay={4}
          />
        </motion.div>

        {/* ── LAYER 4: AUTUMN LEAVES ── */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden" style={{ perspective: 800 }}>
            {leaves.map((leaf) => (
              <Leaf
                key={leaf.id}
                id={leaf.id}
                layer={leaf.layer}
                windX={windX}
                windY={windY}
                pathIndex={leaf.pathIndex}
                color={leaf.color}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Cinematic vignette & depth gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(11,16,24,0.35) 0%, transparent 30%, transparent 60%, rgba(11,16,24,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 80px 20px rgba(11,16,24,0.4)",
        }}
      />
    </div>
  );
};

export default CinematicBackground;
