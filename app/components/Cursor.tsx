"use client";

import { useEffect, useRef } from "react";

/** Custom trailing cursor with a magnetic grow over interactive elements. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor]");
      ring.classList.toggle("cursorRingHover", !!interactive);
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    loop();
    document.body.classList.add("hasCustomCursor");
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("hasCustomCursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursorRing" aria-hidden />
      <div ref={dotRef} className="cursorDot" aria-hidden />
    </>
  );
}
