"use client";

import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useClientValue } from "@/components/ui/hooks";
import { useIntro } from "@/components/providers/Providers";
import { EASE_EXPO, pad } from "@/lib/utils";

const LETTERS = "SPOTMIES".split("");

/**
 * First-visit intro: a 0→100 counter and wordmark, then a curtain that lifts to reveal the hero.
 * Skipped for the rest of the session and for reduced-motion users (see the head script in layout).
 */
export function Preloader() {
  const { setReady } = useIntro();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");
  // The head script marks returning / reduced-motion visitors before React loads.
  const skipped = useClientValue(() => document.documentElement.dataset.intro === "done", false);

  useEffect(() => {
    if (skipped) {
      setReady(true);
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.3,
      delay: 0.15,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setPhase("exit");
        setReady(true);
      },
    });
    return () => controls.stop();
  }, [skipped, setReady]);

  const finish = () => {
    try {
      sessionStorage.setItem("sp-intro", "1");
    } catch {}
    document.documentElement.dataset.intro = "done";
    setPhase("done");
  };

  if (skipped || phase === "done") return null;

  return (
    <motion.div
      className="preloader fixed inset-0 z-[200] flex-col justify-between bg-bg px-5 py-6 md:px-10 md:py-8"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={phase === "exit" ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
      transition={{ duration: 1, ease: EASE_EXPO }}
      onAnimationComplete={() => phase === "exit" && finish()}
      aria-hidden
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        <span>Human + AI product studio</span>
        <span>Est. 2019</span>
      </div>

      <motion.div
        className="flex flex-col items-center gap-4"
        animate={phase === "exit" ? { y: -60, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
      >
        <div className="flex overflow-hidden text-[clamp(2.75rem,11vw,9rem)] font-semibold leading-none tracking-[-0.04em]">
          {LETTERS.map((l, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.1 + i * 0.045 }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="font-serif text-xl italic text-muted md:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.55 }}
        >
          Experience the excellence
        </motion.p>
      </motion.div>

      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <span className="font-mono text-[clamp(3rem,9vw,7rem)] font-light leading-none tabular-nums tracking-tight">
            {pad(count, 3)}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Loading experience</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-line">
          <div
            className="h-full origin-left bg-accent shadow-[0_0_12px_rgba(0,238,249,0.8)]"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
