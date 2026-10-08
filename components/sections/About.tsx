"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { MaskWord, maskParent, Reveal } from "@/components/ui/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { about, mastery } from "@/lib/content";
import { cn, EASE } from "@/lib/utils";

const dotColors = ["#f59e0b", "#3b82f6", "#ef4444", "#00eef9", "#22c55e", "#6366f1", "#a855f7"];

function MasteryMap() {
  const core = mastery.filter((m) => m.core);
  return (
    <div className="relative mt-20 hidden h-[460px] md:block" aria-label="Mastery areas from brand to product">
      {/* Orbit rings */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden>
        <motion.line
          x1="70"
          y1="230"
          x2="930"
          y2="230"
          stroke="rgba(255,255,255,0.18)"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/25" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,238,249,0.12),transparent_70%)]" />

      <span className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-3 text-lg font-medium">
        Brand <span className="size-2 rounded-full bg-fg" />
      </span>
      <span className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3 text-lg font-medium">
        <span className="size-2 rounded-full bg-fg" /> Product
      </span>

      {mastery.map((m, i) => {
        const coreIndex = core.indexOf(m);
        return (
          <motion.div
            key={m.label}
            className="absolute"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            initial={{ opacity: 0, scale: 0.4, x: `${(50 - m.x) * 6}%`, y: `${(50 - m.y) * 4}%` }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.2 + i * 0.04 }}
          >
            <span
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1",
                m.core
                  ? "bg-fg font-medium text-black shadow-[0_10px_30px_-10px_rgba(0,238,249,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(0,238,249,0.8)]"
                  : "border border-line-strong bg-surface-2 text-muted hover:text-fg",
              )}
              style={{ animation: `float ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }}
            >
              {m.core ? (
                <span className="size-2 rounded-full" style={{ background: dotColors[coreIndex % dotColors.length] }} />
              ) : null}
              {m.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function MasteryList() {
  const sorted = [...mastery].sort((a, b) => a.x - b.x);
  return (
    <div className="mt-14 md:hidden">
      <div className="mb-5 flex items-center justify-between text-sm font-medium">
        <span>Brand</span>
        <span className="mx-4 h-px flex-1 bg-gradient-to-r from-fg/40 via-accent to-fg/40" />
        <span>Product</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sorted.map((m, i) => (
          <Reveal key={m.label} as="span" delay={i * 0.03} y={12}>
            <span
              className={cn(
                "inline-block rounded-full px-3.5 py-1.5 text-sm",
                m.core ? "bg-fg font-medium text-black" : "border border-line-strong bg-surface-2 text-muted",
              )}
            >
              {m.label}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div className="shell">
        <Eyebrow index="03">Who we are</Eyebrow>
        <motion.h2
          variants={maskParent}
          custom={0.06}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
          aria-label="At the intersection of product and brand."
        >
          <span aria-hidden>
            <MaskWord>At</MaskWord> <MaskWord>the</MaskWord> <MaskWord>intersection</MaskWord> <MaskWord>of</MaskWord>{" "}
            <MaskWord className="font-serif font-normal italic text-accent">product</MaskWord> <MaskWord>and</MaskWord>{" "}
            <MaskWord className="font-serif font-normal italic">brand.</MaskWord>
          </span>
        </motion.h2>

        <ScrollWords
          text={about.statement}
          highlight={["consistent", "experience"]}
          className="mt-14 max-w-5xl text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.02em] md:mt-20"
        />

        <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line pt-10 md:mt-28 md:grid-cols-4">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col gap-2 pr-4">
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 text-[clamp(2.75rem,6vw,5rem)] font-medium leading-none tracking-[-0.04em]">
                <Counter to={s.value} from={s.plain ? 2000 : 0} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <MasteryMap />
        <MasteryList />
      </div>
    </section>
  );
}
