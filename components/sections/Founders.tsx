"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { Reveal, WordsReveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { founders, site } from "@/lib/content";
import { cn, EASE_EXPO } from "@/lib/utils";

function Seal() {
  const text = "SPOTMIES • EXPERIENCE THE EXCELLENCE • EST. 2019 • ";
  return (
    <div className="relative size-32 md:size-36" aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-muted font-mono text-[13.5px] uppercase tracking-[0.32em]">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[30%] grid place-items-center rounded-full bg-accent font-mono text-sm font-semibold text-black shadow-[0_0_40px_rgba(0,238,249,0.5)]">
        2019
      </div>
    </div>
  );
}

export function Founders() {
  return (
    <section id="founders" className="relative py-28 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col gap-7 md:col-span-5">
          <Eyebrow index="08">The founders</Eyebrow>
          <WordsReveal
            text="Built by makers, led by founders."
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]"
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              We help businesses elevate their value through custom software development, product design, QA and
              consulting services.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap items-center gap-8 pt-4">
            <Seal />
            <ButtonLink href={site.external.about} target="_blank" rel="noreferrer" variant="ghost">
              More about us
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-7 md:gap-5">
          {founders.map((f, i) => (
            <motion.figure
              key={f.name}
              className={cn("group/founder relative", i % 2 === 1 && "mt-10 md:mt-16")}
              initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)", y: 40 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1.2, ease: EASE_EXPO, delay: i * 0.1 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-surface">
                <Image
                  src={f.image}
                  alt={`${f.name}, ${f.role}`}
                  fill
                  sizes="(min-width: 768px) 28vw, 48vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-[var(--ease-smooth)] group-hover/founder:scale-105 group-hover/founder:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-black/50 text-fg backdrop-blur transition-colors duration-300 hover:bg-accent hover:text-black"
                  aria-label={`${f.name} on LinkedIn`}
                >
                  <SocialIcon name="LinkedIn" className="size-4" />
                </a>
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 md:p-6">
                  <span className="text-base font-medium leading-tight md:text-xl">{f.name}</span>
                  <span className="text-xs text-muted md:text-sm">{f.role}</span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
