"use client";

import { useEffect } from "react";

/**
 * Lightweight momentum scroll: eases the page toward the native scroll target
 * so movement feels weighted and fluid (Lusion-style), without hijacking
 * accessibility. Disabled for reduced-motion and touch devices (which already
 * have native inertia).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || touch) return;

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = 0;
    let running = false;

    const onScroll = () => {
      target = window.scrollY;
      if (!running) {
        running = true;
        loop();
      }
    };

    const loop = () => {
      current += (target - current) * 0.12;
      const diff = Math.abs(target - current);
      // We don't move the scrollbar (that would fight the browser); instead we
      // translate the content for the eased feel on wheel-driven motion.
      const root = document.getElementById("smooth-root");
      if (root) {
        const delta = current - target;
        root.style.transform = `translate3d(0, ${(-delta).toFixed(2)}px, 0)`;
      }
      if (diff > 0.4) {
        raf = requestAnimationFrame(loop);
      } else {
        if (root) root.style.transform = "translate3d(0,0,0)";
        running = false;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
