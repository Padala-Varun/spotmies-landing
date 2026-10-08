"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const blur = useTransform(progress, range, ["blur(6px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, filter: blur }} className="inline-block">
      {children}
    </motion.span>
  );
}

/** Paragraph whose words light up one by one as it travels through the viewport. */
export function ScrollWords({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap gap-x-[0.28em]", className)} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        const clean = w.replace(/[^\w-]/g, "");
        return (
          <span key={i} aria-hidden className={highlight.includes(clean) ? "text-accent" : undefined}>
            <Word progress={scrollYProgress} range={[start, start + 1 / words.length]}>
              {w}
            </Word>
          </span>
        );
      })}
    </p>
  );
}
