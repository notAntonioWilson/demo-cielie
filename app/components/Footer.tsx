import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <p className={styles.logo}>CIÉLIE</p>
          <p className={styles.tag}>
            Timeless, feminine occasionwear. Designed in Vienna, crafted from
            the finest fabrics, shipped worldwide.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="TikTok">TikTok</a>
          </div>
        </div>

        <div className={styles.linkCol}>
          <p className={styles.colHead}>Help</p>
          <Link href="#">Size &amp; Fit</Link>
          <Link href="#">Shipping</Link>
          <Link href="#">Returns</Link>
          <Link href="#">Contact</Link>
        </div>

        <div className={styles.linkCol}>
          <p className={styles.colHead}>House</p>
          <Link href="#">The Atelier</Link>
          <Link href="#">Made to Order</Link>
          <Link href="#">Journal</Link>
        </div>

        <div className={styles.news}>
          <p className={styles.colHead}>The List</p>
          <p className={styles.newsText}>
            First access to new collections and atelier releases.
          </p>
          <div className={styles.newsForm}>
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
            />
            <button aria-label="Subscribe">Join</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} CIÉLIE. All rights reserved.</span>
        <span className={styles.credit}>
          Demo build by OTAI Systems
        </span>
      </div>
    </footer>
  );
}
