"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products, HERO_IMG, TWIRL_VIDEO } from "@/lib/products";
import SmartImage from "./SmartImage";
import styles from "./CinemaHero.module.css";

export default function CinemaHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [p, setP] = useState(0);
  const [ready, setReady] = useState(false);
  const durationRef = useRef(0);
  const hero = products[0];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      durationRef.current = v.duration || 0;
      setReady(true);
    };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

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
        const prog = total > 0 ? scrolled / total : 0;
        setP(prog);

        const v = videoRef.current;
        const dur = durationRef.current;
        if (v && dur) {
          const vp = Math.min(prog / 0.7, 1);
          const t = vp * (dur - 0.05);
          if (Math.abs(v.currentTime - t) > 0.02) {
            try { v.currentTime = t; } catch {}
          }
        }
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
  }, [ready]);

  const stageScale = 1.05 - p * 0.1;
  const stageOpacity = Math.max(0, 1 - Math.max(0, p - 0.7) * 3.3);
  const sideOpacity = Math.max(0, 1 - p * 1.8);
  const sideY = -p * 50;
  const enterOpacity = Math.max(0, Math.min(1, (p - 0.78) * 4));

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.sticky}>
        <div
          className={styles.stage}
          style={{ opacity: stageOpacity, transform: `scale(${stageScale})` }}
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={TWIRL_VIDEO}
            poster={HERO_IMG}
            muted
            playsInline
            preload="auto"
          />
          <div className={styles.posterFallback}>
            <SmartImage src={HERO_IMG} alt="CIELIE gown" />
          </div>
          <div className={styles.vignette} />
        </div>

        <div
          className={styles.left}
          style={{ opacity: sideOpacity, transform: "translateY(" + sideY + "px)" }}
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

        <div
          className={styles.right}
          style={{ opacity: sideOpacity, transform: "translateY(" + sideY + "px)" }}
        >
          <span className={styles.rBadge}>The Bestseller</span>
          <h2 className={styles.rName}>{hero.name}</h2>
          <p className={styles.rLine}>{hero.line}</p>
          <p className={styles.rPrice}>${hero.price}</p>
          <div className={styles.rStars}>
            ★★★★★ <span>{hero.reviewCount} reviews</span>
          </div>
          <Link href={"/products/" + hero.slug} className={styles.rCta}>
            Shop the {hero.name}
          </Link>
        </div>

        <div className={styles.hint} style={{ opacity: Math.max(0, 1 - p * 4) }}>
          <span>Scroll to enter</span>
          <span className={styles.hintLine} />
        </div>

        <div className={styles.enter} style={{ opacity: enterOpacity }}>
          <span>The Collection</span>
        </div>
      </div>
    </div>
  );
}
