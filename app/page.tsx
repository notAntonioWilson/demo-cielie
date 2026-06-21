import Link from "next/link";
import { products, SEASONAL_IMG, FABRIC_IMG } from "@/lib/products";
import ProductCard from "./components/ProductCard";
import SmartImage from "./components/SmartImage";
import CinemaHero from "./components/CinemaHero";
import Reveal from "./components/Reveal";
import Parallax from "./components/Parallax";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <CinemaHero />

      {/* MARQUEE STATEMENT */}
      <section className={styles.statement}>
        <Reveal>
          <p className={styles.statementText}>
            Nothing is made until it is yours. Every gown is cut to your
            measurements and finished by hand in our Vienna atelier.
          </p>
        </Reveal>
      </section>

      {/* THE EDIT */}
      <section className={styles.collection} id="bestsellers">
        <div className="container">
          <Reveal>
            <div className={styles.secHead}>
              <p className="eyebrow">The Edit</p>
              <h2 className={styles.secTitle}>Three gowns to know</h2>
              <p className={styles.secSub}>
                The pieces our clients come back for. Each made to order, in
                limited make slots each week.
              </p>
            </div>
          </Reveal>
          <div className={styles.grid}>
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEASONAL EDITORIAL SPLIT */}
      <section className={styles.seasonal}>
        <div className={styles.seasonalImg}>
          <Parallax speed={0.14} className={styles.parallaxInner}>
            <SmartImage src={SEASONAL_IMG} alt="CIÉLIE wedding season editorial" />
          </Parallax>
        </div>
        <div className={styles.seasonalText}>
          <Reveal>
            <p className="eyebrow">Wedding Season · 2026</p>
            <h2 className={styles.seasonalTitle}>
              Dressed for every<br />occasion that matters
            </h2>
            <p className={styles.seasonalBody}>
              From garden ceremonies to black-tie galas, the new season is built
              around colour, movement, and the kind of silhouette that turns a
              room. Reserve your piece before the season fills.
            </p>
            <Link href="#bestsellers" className={styles.seasonalCta}>
              Explore the Season
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ATELIER PROCESS */}
      <section className={styles.atelier} id="atelier">
        <div className="container">
          <Reveal>
            <div className={styles.atelierHead}>
              <p className="eyebrow">Made to Order</p>
              <h2 className={styles.secTitle}>
                The craft behind the gown
              </h2>
            </div>
          </Reveal>
          <div className={styles.steps}>
            {[
              { n: "01", t: "Design", d: "Every silhouette is drawn and developed in-house for each new collection." },
              { n: "02", t: "Your Order", d: "You choose the piece, the colour, and your size. We begin only then." },
              { n: "03", t: "Handcrafted", d: "Our tailors cut and finish each gown individually over three to five days." },
              { n: "04", t: "Delivered", d: "Priority shipping worldwide. Your piece arrives within seven to ten days." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className={styles.step}>
                  <span className={styles.stepN}>{s.n}</span>
                  <h3 className={styles.stepT}>{s.t}</h3>
                  <p className={styles.stepD}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FABRIC FEATURE */}
      <section className={styles.fabric}>
        <div className={styles.fabricText}>
          <Reveal>
            <p className="eyebrow">The Material</p>
            <h2 className={styles.fabricTitle}>Fabric you can feel in a photograph</h2>
            <p className={styles.fabricBody}>
              We source liquid satins, fine pleated crepes, and matte jerseys
              that hold their line from the first fitting to the last dance.
              Weight, drape, and finish are chosen for how they move on you, not
              how they cut on a spreadsheet.
            </p>
          </Reveal>
        </div>
        <div className={styles.fabricImg}>
          <Parallax speed={0.14} className={styles.parallaxInner}>
            <SmartImage src={FABRIC_IMG} alt="CIÉLIE couture fabric detail" />
          </Parallax>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.reviews}>
        <div className="container">
          <Reveal>
            <div className={styles.revHead}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.revCount}>4.9 average · 273 verified reviews</p>
            </div>
          </Reveal>
          <div className={styles.revGrid}>
            {[
              { q: "Love the quality. I wore it for a wedding and felt incredible.", a: "Andrea" },
              { q: "Beautiful fabric and shape. The fit is unreal for the price.", a: "Aliona" },
              { q: "Arrived in three days, beautifully packaged. So fast.", a: "Klara" },
            ].map((r, i) => (
              <Reveal key={r.a} delay={i * 90}>
                <figure className={styles.rev}>
                  <div className={styles.revStars}>★★★★★</div>
                  <blockquote>{r.q}</blockquote>
                  <figcaption>{r.a}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className={styles.closing}>
        <Reveal>
          <p className="eyebrow" style={{ color: "var(--gold-soft)" }}>
            Limited Make Slots
          </p>
          <h2 className={styles.closingTitle}>
            Your entrance is<br />waiting to be made
          </h2>
          <Link href="#bestsellers" className={styles.closingCta}>
            Begin Your Gown
          </Link>
        </Reveal>
      </section>
    </>
  );
}
