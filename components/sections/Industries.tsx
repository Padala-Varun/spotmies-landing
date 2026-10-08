"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Button";
import { useFinePointer } from "@/components/ui/hooks";
import { Reveal, WordsReveal } from "@/components/ui/Reveal";
import { industries } from "@/lib/content";
import { cn, EASE, pad } from "@/lib/utils";

/** Big type list; on desktop a preview of related work trails the cursor and tilts with its speed. */
export function Industries() {
  const fine = useFinePointer();
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const rotate = useTransform(useVelocity(sx), [-2000, 2000], [-14, 14], { clamp: true });

  return (
    <section id="industries" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="07">Industries</Eyebrow>
            <WordsReveal
              text="Fluent in your industry."
              className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              From healthcare to crypto, our work spans {industries.length} industries — so we speak your
              users&apos; language from day one.
            </p>
          </Reveal>
        </div>

        <ul
          className="border-t border-line"
          onPointerMove={(e) => {
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {industries.map((ind, i) => (
            <motion.li
              key={ind.name}
              className="group/row relative border-b border-line"
              onPointerEnter={() => setHover(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 5) * 0.05 }}
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-500 ease-[var(--ease-smooth)] group-hover/row:scale-y-100" />
              <div className="relative flex items-center gap-4 py-5 md:gap-8 md:py-7">
                <span className="w-8 font-mono text-xs text-dim md:w-12">{pad(i + 1)}</span>
                <span className="flex-1 text-[clamp(1.6rem,4.4vw,3.75rem)] font-medium leading-none tracking-[-0.035em] transition-[transform,color] duration-500 ease-[var(--ease-smooth)] group-hover/row:translate-x-3 group-hover/row:text-accent md:group-hover/row:translate-x-6">
                  {ind.name}
                </span>
                <span className="hidden text-sm text-muted md:block">
                  {ind.preview ? `e.g. ${ind.preview.caption}` : "Your product could be next"}
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-dim transition-all duration-500 group-hover/row:rotate-45 group-hover/row:text-accent md:size-6" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {fine ? (
        <motion.div className="pointer-events-none fixed left-0 top-0 z-30" style={{ x: sx, y: sy, rotate }} aria-hidden>
          <AnimatePresence>
            {hover !== null ? (
              <motion.div
                key="preview"
                className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
                style={{ width: 340, aspectRatio: "960 / 675" }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {industries.map((ind, i) => (
                  <div
                    key={ind.name}
                    className={cn("absolute inset-0 transition-opacity duration-300", hover === i ? "opacity-100" : "opacity-0")}
                  >
                    {ind.preview ? (
                      <Image
                        src={ind.preview.src}
                        alt=""
                        fill
                        sizes="340px"
                        className={ind.preview.fit === "cover" ? "object-cover" : "bg-white object-contain p-10"}
                      />
                    ) : (
                      <div className="flex size-full flex-col justify-end gap-1 bg-[radial-gradient(circle_at_30%_20%,rgba(0,238,249,0.35),transparent_60%),linear-gradient(135deg,#0b0b0c,#062a33)] p-6">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Your industry</span>
                        <span className="text-xl font-medium">Let&apos;s build for {ind.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </section>
  );
}
