"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { useIsDesktop } from "@/components/ui/hooks";
import { WordsReveal } from "@/components/ui/Reveal";
import { site, works, type Work } from "@/lib/content";
import { cn, pad } from "@/lib/utils";

function WorkCard({ work, index, skew }: { work: Work; index: number; skew?: ReturnType<typeof useSpring> }) {
  return (
    <motion.article
      style={skew ? { skewX: skew } : undefined}
      className="group/work relative flex w-[82vw] shrink-0 snap-start flex-col gap-5 sm:w-[60vw] md:w-[46vw] lg:w-[34vw]"
    >
      <a
        href={site.external.work}
        target="_blank"
        rel="noreferrer"
        data-cursor="View"
        className="relative block aspect-[960/675] overflow-hidden rounded-[24px] border border-line bg-surface"
        aria-label={`${work.name} — view case studies on spotmies.com`}
      >
        <Image
          src={work.image}
          alt={`${work.name} product screens`}
          fill
          sizes="(min-width: 1024px) 34vw, (min-width: 768px) 46vw, 82vw"
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-smooth)] group-hover/work:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/work:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-fg backdrop-blur">
          {pad(index + 1)} / {pad(works.length)}
        </span>
      </a>
      <div className="flex items-start justify-between gap-6 px-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-medium tracking-tight transition-colors duration-300 group-hover/work:text-accent md:text-3xl">
              {work.name}
            </h3>
            <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">{work.category}</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-[15px]">{work.description}</p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-transform duration-500 group-hover/work:-translate-y-1 group-hover/work:translate-x-1 group-hover/work:text-accent" />
      </div>
    </motion.article>
  );
}

function Header() {
  return (
    <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow index="04">Featured work</Eyebrow>
        <WordsReveal
          text="Products we've designed & built."
          className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
        />
      </div>
      <ButtonLink href={site.external.work} target="_blank" rel="noreferrer" variant="ghost" className="self-start md:self-auto">
        See all work
      </ButtonLink>
    </div>
  );
}

/** Desktop: the section pins and the cards travel sideways with scroll. Mobile: a native swipe row. */
export function Works() {
  const isDesktop = useIsDesktop();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      const el = track.current;
      if (!el) return;
      distance.current = Math.max(0, el.scrollWidth - window.innerWidth);
      setHeight(distance.current + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance.current);
  const velocity = useVelocity(scrollYProgress);
  const skew = useSpring(useTransform(velocity, [-1, 1], [2, -2], { clamp: true }), { stiffness: 200, damping: 40 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!isDesktop) {
    return (
      <section id="work" ref={section} className="py-24">
        <Header />
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4">
          {works.map((w, i) => (
            <WorkCard key={w.name} work={w} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={section} className="relative" style={{ height: height ?? "300vh" }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden py-12">
        <Header />
        <motion.div ref={track} style={{ x }} className={cn("flex w-max gap-6 pl-[max(2rem,calc((100vw-1320px)/2+2rem))] pr-[8vw]")}>
          {works.map((w, i) => (
            <WorkCard key={w.name} work={w} index={i} skew={skew} />
          ))}
          <a
            href={site.external.work}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className="group/all flex w-[24vw] shrink-0 flex-col items-center justify-center gap-4 self-start rounded-[24px] border border-dashed border-line-strong text-center transition-colors duration-500 hover:border-accent"
            style={{ aspectRatio: "960 / 675" }}
          >
            <span className="grid size-16 place-items-center rounded-full bg-accent text-black transition-transform duration-500 group-hover/all:rotate-45">
              <ArrowUpRight className="size-6" />
            </span>
            <span className="text-lg font-medium">Explore all work</span>
            <span className="text-sm text-muted">More case studies on spotmies.com</span>
          </a>
        </motion.div>
        <div className="shell">
          <div className="h-px w-full overflow-hidden bg-line">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
