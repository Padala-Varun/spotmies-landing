"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn, EASE } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "p";
};

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

export const maskParent: Variants = {
  hidden: {},
  show: (stagger: number = 0.06) => ({ transition: { staggerChildren: stagger } }),
};

export const maskChild: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
};

/** One word sliding up out of a clipping mask. Must sit inside a parent using `maskParent`. */
export function MaskWord({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
      <motion.span variants={maskChild} className={cn("inline-block origin-bottom-left will-change-transform", className)}>
        {children}
      </motion.span>
    </span>
  );
}

/** Splits plain text into masked words that rise in sequence when scrolled into view. */
export function WordsReveal({
  text,
  className,
  wordClassName,
  stagger = 0.05,
  as = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const Comp = motion[as];
  const words = text.split(" ");
  return (
    <Comp
      className={className}
      variants={maskParent}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <MaskWord className={wordClassName}>{w}</MaskWord>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Comp>
  );
}
