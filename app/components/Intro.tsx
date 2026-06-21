"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

export default function Intro() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    // brand holds, then the curtain lifts to reveal the site
    const t1 = setTimeout(() => setPhase("out"), 1500);
    const t2 = setTimeout(() => setPhase("done"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.intro} ${phase === "out" ? styles.lift : ""}`}
      aria-hidden
    >
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Vienna · Est. Couture</span>
        <span className={styles.word}>CIÉLIE</span>
        <span className={styles.line} />
      </div>
    </div>
  );
}
