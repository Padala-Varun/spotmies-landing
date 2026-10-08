"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Button";
import { Reveal, WordsReveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services, type Service } from "@/lib/content";
import { cn, EASE, pad } from "@/lib/utils";

const layout: Record<Service["layout"], string> = {
  wide: "md:col-span-4 md:row-span-1 min-h-[340px] md:min-h-[380px]",
  tall: "md:col-span-2 md:row-span-2 min-h-[340px]",
  base: "md:col-span-2 min-h-[340px] md:min-h-[360px]",
  full: "md:col-span-6 min-h-[340px] md:min-h-[300px]",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const wide = service.layout === "wide";
  const tall = service.layout === "tall";
  const full = service.layout === "full";

  return (
    <motion.div
      ref={ref}
      className={cn("[perspective:1200px]", layout[service.layout])}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <SpotlightCard className="group/card h-full overflow-hidden">
        <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-9">
          <span className="font-mono text-xs text-dim">{pad(index + 1)}</span>

          <div className={cn("relative z-10 flex flex-col gap-3", wide || full ? "max-w-md" : "max-w-xs")}>
            <h3 className="text-2xl font-medium tracking-tight md:text-[1.75rem]">{service.title}</h3>
            <p className="text-sm leading-relaxed text-muted md:text-[15px]">{service.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {service.tags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-bg/40 px-2.5 py-1 text-[11px] text-muted backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          style={{ y: imgY }}
          className={cn(
            "pointer-events-none absolute z-0",
            wide && "-right-6 top-1/2 size-[300px] -translate-y-1/2 md:right-6 md:size-[340px]",
            tall && "-right-10 bottom-10 size-[260px] md:bottom-24 md:left-1/2 md:right-auto md:size-[300px] md:-translate-x-1/2",
            service.layout === "base" && "-right-8 -top-6 size-[200px] md:size-[210px]",
            full && "-right-6 -top-4 size-[220px] md:right-[12%] md:top-1/2 md:size-[300px] md:-translate-y-1/2",
          )}
        >
          <Image
            src={service.image}
            alt=""
            fill
            sizes="340px"
            className="object-contain opacity-80 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[var(--ease-smooth)] group-hover/card:-rotate-6 group-hover/card:scale-110"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-surface via-surface/70 to-transparent" />
      </SpotlightCard>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="01">What we do</Eyebrow>
            <WordsReveal
              text="Everything you need to launch, scale and stay ahead."
              className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.15}>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              We build with the latest, most robust technologies — and pair them with design that people actually enjoy
              using.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
