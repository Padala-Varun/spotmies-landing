"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { EASE_EXPO } from "@/lib/utils";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group/top inline-flex items-center gap-3 self-start text-sm text-muted transition-colors hover:text-fg"
    >
      Back to top
      <span className="grid size-10 place-items-center overflow-hidden rounded-full border border-line transition-colors group-hover/top:border-accent group-hover/top:text-accent">
        <ArrowUp className="size-4 transition-transform duration-500 group-hover/top:-translate-y-0.5" />
      </span>
    </button>
  );
}

/** Oversized wordmark whose letters rise in one by one when the footer comes into view. */
export function Wordmark() {
  return (
    <div className="mt-10 select-none overflow-hidden" aria-hidden>
      <motion.p
        className="flex justify-center whitespace-nowrap text-[19vw] font-semibold leading-[0.78] tracking-[-0.06em]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {"SPOTMIES".split("").map((l, i) => (
          <motion.span
            key={i}
            className="inline-block bg-gradient-to-b from-fg via-fg/60 to-transparent bg-clip-text pb-[0.06em] text-transparent"
            variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE_EXPO } } }}
          >
            {l}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
