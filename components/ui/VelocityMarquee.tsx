"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { wrap } from "motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite row that drifts on its own and speeds up / flips direction with scroll velocity.
 * `speed` is in percent of one copy per second; negative values run right-to-left reversed.
 */
export function VelocityMarquee({
  children,
  speed = 2,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);
  const hovered = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    const slow = hovered.current && pauseOnHover ? 0.15 : 1;
    let moveBy = direction.current * speed * (delta / 1000) * slow;
    moveBy += direction.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy / 2);
  });

  return (
    <div
      className={cn("mask-fade-x overflow-hidden", className)}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
