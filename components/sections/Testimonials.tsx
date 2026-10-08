"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Eyebrow } from "@/components/ui/Button";
import { WordsReveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";
import { cn, EASE, pad } from "@/lib/utils";

const DURATION = 8;

/** One large quote at a time; auto-advances with a visible timer, pauses on hover or on demand. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hovering || stopped;
  const t = testimonials[index];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), DURATION * 1000);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-line bg-surface py-28 md:py-36"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <div className="pointer-events-none absolute -left-40 top-0 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,238,249,0.08),transparent_65%)]" />
      <div className="shell relative">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="09">Client stories</Eyebrow>
            <WordsReveal
              text="Founders who've built with us."
              className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => go(-1)} className="glass grid size-12 place-items-center rounded-full transition-colors hover:border-accent" aria-label="Previous testimonial">
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              className="glass grid size-12 place-items-center rounded-full transition-colors hover:border-accent"
              aria-label={stopped ? "Resume autoplay" : "Pause autoplay"}
            >
              {stopped ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <button type="button" onClick={() => go(1)} className="glass grid size-12 place-items-center rounded-full transition-colors hover:border-accent" aria-label="Next testimonial">
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-12" aria-live={paused ? "polite" : "off"}>
          <div className="relative min-h-[320px] md:col-span-8 md:min-h-[300px]">
            <span className="pointer-events-none absolute -left-2 -top-16 select-none font-serif text-[10rem] leading-none text-accent/20 md:-left-6 md:-top-20 md:text-[14rem]" aria-hidden>
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                className="relative"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.012 } },
                  exit: { opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.35 } },
                }}
              >
                <p className="text-[clamp(1.4rem,2.6vw,2.4rem)] font-normal leading-[1.3] tracking-[-0.02em]">
                  {t.quote.split(" ").map((w, i) => (
                    <motion.span
                      key={i}
                      className="inline-block pr-[0.25em]"
                      variants={{
                        hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
                      }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </p>
                <motion.footer
                  className="mt-10 flex items-center gap-4"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } } }}
                >
                  <Image src={t.image} alt={t.name} width={56} height={56} className="size-14 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </motion.footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <ul className="grid grid-cols-4 gap-3 self-end md:col-span-4 md:grid-cols-2">
            {testimonials.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "group/t relative flex w-full flex-col gap-2 rounded-2xl border p-2 text-left transition-colors duration-500 md:flex-row md:items-center md:gap-3 md:p-3",
                    i === index ? "border-accent/50 bg-white/[0.04]" : "border-line hover:border-line-strong",
                  )}
                  aria-label={`Show testimonial from ${p.name}`}
                  aria-current={i === index}
                >
                  <Image
                    src={p.image}
                    alt=""
                    width={40}
                    height={40}
                    className={cn("size-10 rounded-full object-cover transition-[filter] duration-500", i === index ? "" : "grayscale group-hover/t:grayscale-0")}
                  />
                  <span className="hidden min-w-0 md:block">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="block truncate text-xs text-muted">{p.company}</span>
                  </span>
                  {i === index ? (
                    <span className="absolute inset-x-3 bottom-1 h-px overflow-hidden bg-line">
                      <span
                        key={`${index}-${paused}`}
                        className="block h-full origin-left bg-accent"
                        style={{
                          animation: paused ? "none" : `progress-fill ${DURATION}s linear forwards`,
                          transform: paused ? "scaleX(0)" : undefined,
                        }}
                      />
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 font-mono text-xs text-muted">
          {pad(index + 1)} / {pad(testimonials.length)}
        </p>
      </div>
    </section>
  );
}
