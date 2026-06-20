"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products, HERO_IMG } from "@/lib/products";
import SmartImage from "./SmartImage";
import styles from "./CinemaHero.module.css";

export default function CinemaHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const hero = products[0];

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setP(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Eased scroll choreography (smooth, GPU transforms only — no decode stutter)
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const e = ease(Math.min(p, 1));

  // The gown: drifts up, gently rotates, scales, then dissolves into the store
  const gownScale = 1.0 + e * 0.16;
  const gownRotate = (0.5 - p) * 8; // subtle turn through the scroll
  const gownY = -e * 8;
  const gownOpacity = Math.max(0, 1 - Math.max(0, p - 0.62) * 3.2);
  const sweepX = -120 + e * 320; // light sweep across the gown

  // Flanking content
  const sideOpacity = Math.max(0, 1 - p * 1.9);
  const sideY = -p * 46;
  const enterOpacity = Math.max(0, Math.min(1, (p - 0.72) * 4));

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.sticky}>
        {/* GOWN STAGE */}
        <div className={styles.stage} style={{ opacity: gownOpacity }}>
          <div
            className={styles.gown}
            style={{
              transform: `translateY(${gownY}vh) scale(${gownScale}) rotate(${gownRotate}deg)`,
            }}
          >
            <SmartImage src={HERO_IMG} alt="CIELIE gown" />
            <div
              className={styles.sweep}
              style={{ transform: `translateX(${sweepX}%)` }}
            />
          </div>
          <div className={styles.vignette} />
        </div>

        {/* LEFT TEXT */}
        <div
          className={styles.left}
          style={{ opacity: sideOpacity, transform: `translateY(${sideY}px)` }}
        >
          <p className={styles.eyebrow}>Vienna · Maison de Couture</p>
          <h1 className={styles.title}>
            Made to be
            <span className={styles.titleItalic}>remembered</span>
          </h1>
          <p className={styles.lede}>
            Evening gowns cut by hand for the moments that deserve one.
          </p>
        </div>

        {/* RIGHT BESTSELLER */}
        <div
          className={styles.right}
          style={{ opacity: sideOpacity, transform: `translateY(${sideY}px)` }}
        >
          <span className={styles.rBadge}>The Bestseller</span>
          <h2 className={styles.rName}>{hero.name}</h2>
          <p className={styles.rLine}>{hero.line}</p>
          <p className={styles.rPrice}>${hero.price}</p>
          <div className={styles.rStars}>
            ★★★★★ <span>{hero.reviewCount} reviews</span>
          </div>
          <Link href={`/products/${hero.slug}`} className={styles.rCta}>
            Shop the {hero.name}
          </Link>
        </div>

        {/* SCROLL HINT */}
        <div className={styles.hint} style={{ opacity: Math.max(0, 1 - p * 4) }}>
          <span>Scroll to enter</span>
          <span className={styles.hintLine} />
        </div>

        {/* ENTER CUE */}
        <div className={styles.enter} style={{ opacity: enterOpacity }}>
          <span>The Collection</span>
        </div>
      </div>
    </div>
  );
}
