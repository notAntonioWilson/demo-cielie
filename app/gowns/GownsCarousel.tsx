"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gownsCatalog } from "@/lib/products";
import SmartImage from "../components/SmartImage";
import styles from "./gowns.module.css";

export default function GownsCarousel() {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate the set so the marquee loops seamlessly.
  const loop = [...gownsCatalog, ...gownsCatalog];

  // Drag-to-spin: let the visitor flick through the rail like a rack.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let scrollStart = 0;
    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      scrollStart = el.scrollLeft;
      setPaused(true);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = scrollStart - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
      setPaused(false);
    };
    // vertical wheel scrolls the rail horizontally
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta !== 0) {
        el.scrollLeft += delta;
        setPaused(true);
        clearTimeout((el as any)._wheelT);
        (el as any)._wheelT = setTimeout(() => setPaused(false), 600);
        e.preventDefault();
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    setPaused(true);
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 600), behavior: "smooth" });
    setTimeout(() => setPaused(false), 900);
  };

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className="eyebrow">The Dressing Room</p>
        <h1 className={styles.title}>Every gown, in rotation</h1>
        <p className={styles.sub}>
          The full collection turns past you like a rack in the atelier. Hover
          to pause, drag to spin, click to step inside any piece.
        </p>
      </header>

      <div
        className={styles.rail}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => nudge(-1)}
          aria-label="Previous gowns"
        >
          ‹
        </button>
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => nudge(1)}
          aria-label="Next gowns"
        >
          ›
        </button>
        <div
          ref={trackRef}
          className={`${styles.track} ${paused ? styles.paused : ""}`}
        >
          {loop.map((g, i) => (
            <Link
              key={`${g.name}-${g.colour}-${i}`}
              href={`/products/${g.slug}`}
              className={styles.card}
              draggable={false}
            >
              <div className={styles.imgWrap}>
                <SmartImage src={g.img} alt={`${g.name} gown in ${g.colour}`} />
                <span className={styles.cardCta}>View Piece</span>
              </div>
              <div className={styles.meta}>
                <div className={styles.metaRow}>
                  <span className={styles.cName}>{g.name}</span>
                  <span className={styles.cPrice}>${g.price}</span>
                </div>
                <span className={styles.cColour}>{g.colour}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.footNote}>
        <span>{gownsCatalog.length} styles · scroll, drag, or use the arrows</span>
        <Link href="/#bestsellers" className={styles.allLink}>
          Shop the Edit
        </Link>
      </div>
    </div>
  );
}
