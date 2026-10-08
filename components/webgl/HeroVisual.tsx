"use client";

import dynamic from "next/dynamic";
import { motion, type MotionValue } from "motion/react";
import { useClientValue, usePrefersReducedMotion } from "@/components/ui/hooks";

const HeroCore = dynamic(() => import("./HeroCore"), { ssr: false });

let webgl: boolean | undefined;

function supportsWebGL() {
  if (webgl === undefined) {
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

/** Particle budget for this device, or null when WebGL is unavailable. */
function particleCount() {
  if (!supportsWebGL()) return null;
  const small = window.innerWidth < 768;
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
  return small || lowPower ? 6000 : 14000;
}

/** Particle core on capable devices; a soft CSS glow everywhere else (and while WebGL loads). */
export function HeroVisual({ progress, active, ready }: { progress: MotionValue<number>; active: boolean; ready: boolean }) {
  const reduce = usePrefersReducedMotion();
  const count = useClientValue(particleCount, null);

  const useGL = count !== null && !reduce;

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Fallback glow, sits under the canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[22%] size-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,238,249,0.22),transparent_62%)] blur-2xl md:left-[68%] md:top-1/2 md:size-[46vw] md:-translate-y-1/2" />
        <div className="absolute left-1/2 top-[22%] size-[38vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,116,144,0.35),transparent_65%)] md:left-[68%] md:top-1/2 md:size-[24vw] md:-translate-y-1/2" />
      </div>
      {useGL ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroCore progress={progress} active={active} count={count} />
        </motion.div>
      ) : null}
    </div>
  );
}
