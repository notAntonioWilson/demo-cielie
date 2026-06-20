"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles.announce}>
        <div className={styles.announceTrack}>
          <span>Worldwide shipping</span>
          <span className={styles.dot} />
          <span>Made to order in Vienna</span>
          <span className={styles.dot} />
          <span>Complimentary returns within 14 days</span>
          <span className={styles.dot} />
          <span>Worldwide shipping</span>
          <span className={styles.dot} />
          <span>Made to order in Vienna</span>
          <span className={styles.dot} />
          <span>Complimentary returns within 14 days</span>
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.solid : ""}`}>
        <div className={styles.inner}>
          <button
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <nav className={styles.navLeft} aria-label="Primary">
            <Link href="/">New In</Link>
            <Link href="/#bestsellers">Gowns</Link>
            <Link href="/#atelier">Atelier</Link>
          </nav>

          <Link href="/" className={styles.logo} aria-label="CIÉLIE home">
            CIÉLIE
          </Link>

          <nav className={styles.navRight} aria-label="Account">
            <button className={styles.iconBtn} aria-label="Search">
              Search
            </button>
            <button
              className={styles.iconBtn}
              aria-label={`Cart, ${count} items`}
              onClick={open}
            >
              Cart {count > 0 && <span className={styles.badge}>{count}</span>}
            </button>
          </nav>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/" onClick={() => setMenuOpen(false)}>New In</Link>
            <Link href="/#bestsellers" onClick={() => setMenuOpen(false)}>Gowns</Link>
            <Link href="/#atelier" onClick={() => setMenuOpen(false)}>Atelier</Link>
          </div>
        )}
      </header>
    </>
  );
}
