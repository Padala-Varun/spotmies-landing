"use client";

import { useCallback, useSyncExternalStore } from "react";

/** SSR-safe media query: the server snapshot is `false`, the client re-renders with the real value. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/** Reads a browser-only value after hydration without a setState-in-effect round trip. */
export function useClientValue<T>(getSnapshot: () => T, serverValue: T) {
  return useSyncExternalStore(noopSubscribe, getSnapshot, () => serverValue);
}

export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
