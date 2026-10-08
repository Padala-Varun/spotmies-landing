"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer } from "./hooks";

/**
 * Soft follower ring for mouse users. Elements with `data-cursor="Label"` grow it into a pill
 * showing the label; `data-cursor=""` just enlarges it. The native cursor stays visible.
 */
export function Cursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  const active = label !== null;

  return (
    <motion.div
      aria-hidden
      className="cursor-follower pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 text-[11px] font-medium uppercase tracking-[0.18em] text-black"
        animate={{
          width: active ? (label ? 96 : 56) : 28,
          height: active ? (label ? 96 : 56) : 28,
          backgroundColor: label ? "rgba(0,238,249,1)" : "rgba(0,238,249,0)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
