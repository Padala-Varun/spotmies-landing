"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "./hooks";

/** Card whose border and glow follow the cursor, with an optional subtle 3D tilt. */
export function SpotlightCard({
  children,
  className,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className={cn("spotlight rounded-[28px] bg-surface", className)}
      style={tilt && fine ? { rotateX: rx, rotateY: ry, transformPerspective: 1200 } : undefined}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        px.set(x);
        py.set(y);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
