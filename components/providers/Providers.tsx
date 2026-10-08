"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

type IntroState = { ready: boolean; setReady: (v: boolean) => void };

const IntroContext = createContext<IntroState>({ ready: false, setReady: () => {} });

/** `ready` flips once the preloader has finished, so entrance animations start in sync. */
export const useIntro = () => useContext(IntroContext);

function ScrollLock({ locked }: { locked: boolean }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [smoothWheel, setSmoothWheel] = useState(false);

  useEffect(() => {
    // Smooth wheel only when the user hasn't asked for reduced motion; touch stays native.
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSmoothWheel(!mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return (
    <IntroContext.Provider value={{ ready, setReady }}>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ lerp: 0.1, smoothWheel, anchors: true, autoRaf: true }}>
          <ScrollLock locked={!ready} />
          {children}
        </ReactLenis>
      </MotionConfig>
    </IntroContext.Provider>
  );
}
