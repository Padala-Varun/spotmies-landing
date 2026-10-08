"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { Reveal, WordsReveal } from "@/components/ui/Reveal";
import { process, site } from "@/lib/content";
import { cn, pad } from "@/lib/utils";

/** Sticky intro on the left; a line draws down the steps and lights each one as you pass it. */
export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.6", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const n = process.length;
    let count = 0;
    for (let i = 0; i < n; i++) if (p >= (i + 0.05) / n) count = i + 1;
    setReached(count);
  });

  return (
    <section id="process" className="relative py-28 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex flex-col gap-7 md:sticky md:top-36">
            <Eyebrow index="06">How we work</Eyebrow>
            <WordsReveal
              text="From idea to impact in four steps."
              className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
            />
            <Reveal delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
                We strip away complexity to deliver robust, scalable and beautiful digital solutions that drive real
                growth.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ButtonLink href={site.bookingUrl} target="_blank" rel="noreferrer" variant="primary" icon={<CalendarDays className="size-4" />}>
                Book a discovery call
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <ol ref={list} className="relative md:col-span-6 md:col-start-7">
          <div className="absolute bottom-6 left-[19px] top-6 w-px bg-line" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-accent shadow-[0_0_14px_rgba(0,238,249,0.9)]"
              style={{ scaleY: fill }}
            />
          </div>

          {process.map((step, i) => {
            const on = reached > i;
            return (
              <li key={step.title} className="relative flex gap-8 pb-20 last:pb-0 md:min-h-[42vh] md:gap-10">
                <span
                  className={cn(
                    "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border font-mono text-xs transition-all duration-700",
                    on ? "border-accent bg-accent text-black shadow-[0_0_24px_rgba(0,238,249,0.7)]" : "border-line-strong bg-bg text-muted",
                  )}
                >
                  {pad(i + 1)}
                </span>
                <div className={cn("flex flex-col gap-4 pt-1 transition-opacity duration-700", on ? "opacity-100" : "opacity-40")}>
                  <h3 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-none tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-muted">{step.description}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {step.points.map((p) => (
                      <li key={p} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
