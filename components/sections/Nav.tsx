"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { useIntro } from "@/components/providers/Providers";
import { ButtonLink } from "@/components/ui/Button";
import { nav, site } from "@/lib/content";
import { cn, EASE, EASE_EXPO } from "@/lib/utils";

export function Nav() {
  const { ready } = useIntro();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 24);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so Lenis is running again before scrolling.
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(href, { duration: 1.4 });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-3 z-50 md:top-5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -110, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE_EXPO, delay: ready && !scrolled ? 0.5 : 0 }}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "shell flex items-center justify-between rounded-full transition-[background-color,border-color,padding] duration-500",
          )}
        >
          <div
            className={cn(
              "flex w-full items-center justify-between rounded-full py-2 pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-500 md:pl-6",
              scrolled || open ? "glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]" : "border border-transparent",
            )}
          >
            <a href="#hero" onClick={(e) => go(e, "#hero")} className="relative z-10 flex items-center" aria-label="Spotmies home">
              <Image src="/brand/logo.png" alt="Spotmies" width={3330} height={741} priority className="h-7 w-auto md:h-8" />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      active === item.href ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {active === item.href ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ButtonLink
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
                variant="accent"
                icon={<CalendarDays className="size-4" />}
                className="hidden sm:inline-flex"
              >
                Schedule a call
              </ButtonLink>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="relative grid size-11 place-items-center rounded-full bg-white/[0.07] lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-[1.5px] w-full bg-fg transition-transform duration-500 ease-[var(--ease-smooth)]",
                      open && "translate-y-[5.5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[1.5px] w-full bg-fg transition-transform duration-500 ease-[var(--ease-smooth)]",
                      open && "-translate-y-[5.5px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg/95 px-5 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
          >
            <ul className="flex flex-col gap-1">
              {[...nav, { label: "Contact", href: "#contact" }].map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="flex items-baseline gap-4 py-1 text-[clamp(2.5rem,12vw,4rem)] font-medium leading-tight tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex flex-col gap-5 border-t border-line pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col gap-1 text-sm text-muted">
                <a href={`mailto:${site.email}`} className="text-fg">
                  {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </div>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-full bg-accent px-6 py-4 font-medium text-black"
              >
                Schedule a call <ArrowUpRight className="size-5" />
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
