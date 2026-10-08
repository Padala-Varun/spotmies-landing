"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { MaskWord, maskParent } from "@/components/ui/Reveal";
import { designColumns, site } from "@/lib/content";

/** Tilted wall of real design shots; alternate columns drift against each other with scroll. */
export function DesignWall() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["8%", "-30%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-30%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden md:h-[130vh]" aria-label="Design archive">
      <motion.div className="absolute inset-0 flex items-center justify-center [perspective:1600px]" style={{ scale }}>
        <div className="grid w-[180vw] origin-center grid-cols-4 gap-3 [transform:rotateX(32deg)_rotateZ(-16deg)] md:w-[115vw] md:gap-6">
          {designColumns.map((col, i) => (
            <motion.div key={i} style={{ y: i % 2 ? down : up }} className="flex flex-col gap-3 md:gap-6">
              {col.map((src) => (
                <div key={src} className="relative aspect-video overflow-hidden rounded-lg border border-line bg-surface md:rounded-2xl">
                  <Image src={src} alt="" fill sizes="(min-width: 768px) 28vw, 45vw" className="object-cover" />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.78)_0%,rgba(5,5,5,0.9)_50%,#050505_80%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="shell relative flex h-full flex-col items-center justify-center gap-7 text-center">
        <Eyebrow index="05">Design archive</Eyebrow>
        <motion.h2
          variants={maskParent}
          custom={0.07}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="max-w-4xl text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          aria-label="Crafted pixel by pixel."
        >
          <span aria-hidden>
            <MaskWord>Crafted</MaskWord> <MaskWord className="font-serif font-normal italic text-accent">pixel</MaskWord>{" "}
            <MaskWord>by</MaskWord> <MaskWord className="font-serif font-normal italic">pixel.</MaskWord>
          </span>
        </motion.h2>
        <p className="max-w-lg text-base text-muted md:text-lg">
          Landing pages, apps and brand systems from the Spotmies design archive.
        </p>
        <ButtonLink href={site.external.work} target="_blank" rel="noreferrer" variant="ghost">
          Explore our designs
        </ButtonLink>
      </div>
    </section>
  );
}
