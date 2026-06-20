"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products, HERO_IMG } from "@/lib/products";
import SmartImage from "./SmartImage";
import styles from "./CinemaHero.module.css";

export default function CinemaHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0..1 scroll progress through the pinned scene
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

  // Scene choreography derived from scroll progress.
  const imgScale = 1.18 - p * 0.18; // settles from zoomed-in to framed
  const vignette = 0.55 - p * 0.3; // room brightens as you descend
  const introOpacity = Math.max(0, 1 - p * 2.2); // opening title fades early
  const cardOpacity = Math.max(0, Math.min(1, (p - 0.45) * 2.6)); // bestseller rises in
  const cardY = 40 - cardOpacity * 40;

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.sticky}>
        <div
          className={styles.scene}
          style={{ transform: `scale(${imgScale})` }}
        >
          <SmartImage src={HERO_IMG} alt="CIÉLIE gown in a Viennese salon" />
          <div
            className={styles.vignette}
            style={{ opacity: vignette }}
          />
        </div>

        {/* OPENING TITLE */}
        <div
          className={styles.intro}
          style={{ opacity: introOpacity, transform: `translateY(${-p * 60}px)` }}
        >
          <p className={styles.eyebrow}>Vienna · Maison de Couture</p>
          <h1 className={styles.title}>
            Made to be
            <span className={styles.titleItalic}>remembered</span>
          </h1>
          <div className={styles.scrollHint}>
            <span>Enter the atelier</span>
            <span className={styles.scrollLine} />
          </div>
        </div>

        {/* BESTSELLER REVEAL */}
        <div
          className={styles.feature}
          style={{
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
            pointerEvents: cardOpacity > 0.5 ? "auto" : "none",
          }}
        >
          <div className={styles.featureInner}>
            <span className={styles.featureBadge}>The Bestseller</span>
            <h2 className={styles.featureName}>{hero.name}</h2>
            <p className={styles.featureLine}>{hero.line}</p>
            <p className={styles.featurePrice}>${hero.price}</p>
            <p className={styles.featureDesc}>{hero.shortDescription}</p>
            <Link href={`/products/${hero.slug}`} className={styles.featureCta}>
              Shop the Sonila
            </Link>
            <div className={styles.featureMeta}>
              <span>★★★★★</span>
              <span>{hero.rating} · {hero.reviewCount} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
