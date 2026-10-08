"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { CalendarDays } from "lucide-react";
import { useIntro } from "@/components/providers/Providers";
import { ButtonLink } from "@/components/ui/Button";
import { MaskWord, maskParent } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/webgl/HeroVisual";
import { hero, logos, site, testimonials } from "@/lib/content";
import { EASE } from "@/lib/utils";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="spark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#7af8ff" />
          <stop offset="100%" stopColor="#00b8d9" />
        </radialGradient>
      </defs>
      <path
        d="M12 0c.6 5.6 3.1 9.4 12 12-8.9 2.6-11.4 6.4-12 12-.6-5.6-3.1-9.4-12-12C8.9 9.4 11.4 5.6 12 0Z"
        fill="url(#spark)"
      />
    </svg>
  );
}

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay } },
});

export function Hero() {
  const { ready } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px 0px 0px 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const morph = useTransform(scrollYProgress, [0.02, 0.36], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0.04, 0.26], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0.04, 0.26], ["blur(0px)", "blur(8px)"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const state = ready ? "show" : "hidden";

  return (
    <section id="hero" ref={ref} className="relative h-[150svh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroVisual progress={morph} active={inView} ready={ready} />

        {/* Legibility veils */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(5,5,5,0.85),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

        <motion.div
          className="shell relative flex h-full flex-col justify-end pb-24 pt-32 md:justify-center md:pb-0"
          style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }}
        >
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={state} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-xs text-fg">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                <span className="relative size-2 rounded-full bg-accent" />
              </span>
              {hero.badge}
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:inline">
              Est. {site.founded} — Visakhapatnam
            </span>
          </motion.div>

          <motion.h1
            variants={maskParent}
            custom={0.07}
            initial="hidden"
            animate={state}
            className="max-w-[15ch] text-[clamp(2.9rem,8vw,7.75rem)] font-medium leading-[0.95] tracking-[-0.045em]"
            aria-label="The future of development is human + AI"
          >
            <span className="block" aria-hidden>
              <MaskWord>The</MaskWord> <MaskWord>future</MaskWord> <MaskWord>of</MaskWord>
            </span>
            <span className="block" aria-hidden>
              <MaskWord>development</MaskWord> <MaskWord className="text-muted">is</MaskWord>
            </span>
            <span className="block whitespace-nowrap" aria-hidden>
              <MaskWord className="pr-[0.06em] font-serif font-normal italic tracking-[-0.02em]">human</MaskWord>{" "}
              <MaskWord className="font-light text-muted">+</MaskWord>{" "}
              <MaskWord className="text-accent-gradient">AI</MaskWord>
              <motion.span
                className="ml-[0.06em] inline-block align-top"
                initial={{ scale: 0, rotate: -90 }}
                animate={ready ? { scale: 1, rotate: 0 } : undefined}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.9 }}
              >
                <Sparkle className="size-[0.42em] animate-spin-slow drop-shadow-[0_0_18px_rgba(0,238,249,0.9)]" />
              </motion.span>
            </span>
          </motion.h1>

          <div className="mt-9 flex flex-col gap-10 md:mt-12 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-xl flex-col gap-8">
              <motion.p variants={fadeUp(0.55)} initial="hidden" animate={state} className="text-base leading-relaxed text-muted md:text-lg">
                {hero.sub}
              </motion.p>
              <motion.div variants={fadeUp(0.7)} initial="hidden" animate={state} className="flex flex-wrap items-center gap-3">
                <ButtonLink href={site.bookingUrl} target="_blank" rel="noreferrer" variant="primary" icon={<CalendarDays className="size-4" />}>
                  Schedule a call
                </ButtonLink>
                <ButtonLink href="#contact" variant="ghost">
                  Get a quote
                </ButtonLink>
              </motion.div>
            </div>

            <motion.div variants={fadeUp(0.85)} initial="hidden" animate={state} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 4).map((t) => (
                  <Image
                    key={t.name}
                    src={t.image}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 rounded-full border-2 border-bg object-cover"
                  />
                ))}
              </div>
              <p className="text-sm leading-snug text-muted">
                <span className="block font-medium text-fg">Loved by founders</span>
                across {logos.length}+ brands
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 animate-scroll-cue bg-accent" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
