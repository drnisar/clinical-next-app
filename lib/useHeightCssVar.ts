"use client";
import { useEffect, type RefObject } from "react";

/**
 * Publishes an element's current height as a CSS variable on <html>
 * (e.g. --dashboard-nav-h: 64px), kept up to date as it resizes. Lets other
 * sticky elements sit just below it: top: var(--dashboard-nav-h, 0px).
 */
export function useHeightCssVar(
  ref: RefObject<HTMLElement | null>,
  name: `--${string}`,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const root = document.documentElement;
    const update = () =>
      root.style.setProperty(name, `${el.getBoundingClientRect().height}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty(name);
    };
  }, [ref, name]);
}
