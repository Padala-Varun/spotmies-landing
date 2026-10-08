"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Mail } from "lucide-react";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { Reveal, WordsReveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";
import { cn, EASE, pad } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-40">
      <div className="shell grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex flex-col gap-7 md:sticky md:top-36">
            <Eyebrow index="10">FAQ</Eyebrow>
            <WordsReveal text="Common questions." className="text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.035em]" />
            <Reveal delay={0.1}>
              <p className="max-w-sm text-base leading-relaxed text-muted md:text-lg">
                Everything you need to know about working with us. Can&apos;t find the answer you&apos;re looking for?
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ButtonLink href="#contact" variant="ghost" icon={<Mail className="size-4" />}>
                Contact our team
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <ul className="flex flex-col gap-3 md:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} as="li" delay={i * 0.05} y={20}>
                <div
                  className={cn(
                    "overflow-hidden rounded-3xl border transition-colors duration-500",
                    isOpen ? "border-accent/30 bg-surface-2" : "border-line bg-surface hover:border-line-strong",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center gap-5 px-6 py-6 text-left md:px-8"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      id={`faq-q-${i}`}
                    >
                      <span className="font-mono text-xs text-dim">{pad(i + 1)}</span>
                      <span className="flex-1 text-lg font-medium tracking-tight md:text-xl">{f.q}</span>
                      <span
                        className={cn(
                          "relative grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          isOpen ? "rotate-180 border-accent bg-accent text-black" : "border-line-strong",
                        )}
                        aria-hidden
                      >
                        <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                        <span
                          className={cn(
                            "absolute h-3 w-[1.5px] rounded-full bg-current transition-transform duration-500",
                            isOpen && "scale-y-0",
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <p className="px-6 pb-7 pl-[4.25rem] text-base leading-relaxed text-muted md:px-8 md:pl-[4.75rem]">{f.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
