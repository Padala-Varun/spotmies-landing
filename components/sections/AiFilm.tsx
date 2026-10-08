"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import { ButtonLink, Eyebrow } from "@/components/ui/Button";
import { film } from "@/lib/content";
import { pad } from "@/lib/utils";

/**
 * Pinned showreel: the frame starts as an inset card and opens to full-bleed as you scroll,
 * while the title splits apart. Video only loads once the section is near the viewport.
 */
export function AiFilm() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const load = useInView(ref, { margin: "60% 0px 60% 0px", once: true });
  const visible = useInView(ref, { margin: "0px" });
  const [reel, setReel] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const remaining = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1.25, 1]);
  const leftX = useTransform(scrollYProgress, [0, 0.45], ["0vw", "-55vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.45], ["0vw", "55vw"]);
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.45], [1, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.55, 0.72], [48, 0]);
  const shade = useTransform(scrollYProgress, [0.45, 0.75], [0.1, 0.55]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (visible && !paused) v.play().catch(() => {});
    else v.pause();
  }, [visible, paused, muted, reel, load]);

  const next = () => setReel((r) => (r + 1) % film.reels.length);

  return (
    <section id="film" ref={ref} className="relative h-[260vh]" aria-label="Generative AI filmmaking">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="absolute inset-0 overflow-hidden bg-surface [clip-path:inset(calc(var(--e)*20%)_calc(var(--e)*5%)_round_calc(var(--e)*28px))] md:[clip-path:inset(calc(var(--e)*14%)_calc(var(--e)*20%)_round_calc(var(--e)*40px))]"
          style={{ "--e": remaining } as React.CSSProperties}
        >
          <motion.div className="absolute inset-0" style={{ scale }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- poster sits under the video while it buffers */}
            <img src={film.poster} alt="" className="absolute inset-0 size-full object-cover" />
            <AnimatePresence initial={false}>
              {load ? (
                <motion.video
                  key={reel}
                  ref={(el) => {
                    // The exiting reel reports null on unmount; keep pointing at the newest one.
                    if (el) videoRef.current = el;
                  }}
                  src={film.reels[reel]}
                  className="absolute inset-0 size-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  onEnded={next}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  aria-label="Spotmies generative AI film reel"
                />
              ) : null}
            </AnimatePresence>
          </motion.div>
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        </motion.div>

        {/* Split title */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center md:flex-row md:gap-6"
          style={{ opacity: titleOpacity }}
          aria-hidden
        >
          <motion.span
            style={{ x: leftX }}
            className="text-[clamp(2.75rem,8vw,8rem)] font-medium leading-none tracking-[-0.04em] [text-shadow:0_10px_60px_rgba(0,0,0,0.6)]"
          >
            {film.title[0]}
          </motion.span>
          <motion.span
            style={{ x: rightX }}
            className="font-serif text-[clamp(2.75rem,8vw,8rem)] italic leading-none tracking-[-0.02em] text-accent [text-shadow:0_10px_60px_rgba(0,0,0,0.6)]"
          >
            {film.title[1]}
          </motion.span>
        </motion.div>

        {/* Closing copy */}
        <motion.div
          className="shell absolute inset-x-0 bottom-0 flex flex-col gap-8 pb-24 md:flex-row md:items-end md:justify-between md:pb-16"
          style={{ opacity: copyOpacity, y: copyY }}
        >
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow index="02" className="text-fg/80">
              AI film studio
            </Eyebrow>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              Generative <span className="font-serif italic text-accent">AI filmmaking</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-fg/80 md:text-lg">{film.copy}</p>
            <div>
              <ButtonLink href="#contact" variant="primary">
                Start your film project
              </ButtonLink>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 font-mono text-xs tabular-nums text-fg/80">
              Reel {pad(reel + 1)} / {pad(film.reels.length)}
            </span>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="glass grid size-11 place-items-center rounded-full"
              aria-label={paused ? "Play reel" : "Pause reel"}
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="glass grid size-11 place-items-center rounded-full"
              aria-label={muted ? "Unmute reel" : "Mute reel"}
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <button type="button" onClick={next} className="glass grid size-11 place-items-center rounded-full" aria-label="Next reel">
              <SkipForward className="size-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
