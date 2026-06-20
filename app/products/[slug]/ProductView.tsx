"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/app/components/CartContext";
import ProductCard from "@/app/components/ProductCard";
import SmartImage from "@/app/components/SmartImage";
import styles from "./product.module.css";

export default function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [shake, setShake] = useState(false);

  // Build a gallery. Real catalogue has one render per product; we present it
  // as a primary plus framed crops so the layout reads as a full gallery.
  const gallery = [product.images[0], product.images[0], product.images[0]];

  function handleAdd() {
    if (!size) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      const el = document.getElementById("size-group");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    add({
      id: `${product.slug}-${color}-${size}`,
      name: product.name,
      line: product.line,
      color,
      size,
      price: product.price,
      image: product.images[0],
    });
  }

  const toggle = (k: string) =>
    setOpenSection((cur) => (cur === k ? null : k));

  return (
    <>
      <div className={styles.crumb}>
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#bestsellers">Gowns</Link>
          <span>/</span>
          <span className={styles.crumbCurrent}>{product.name}</span>
        </div>
      </div>

      <section className={styles.pdp}>
        <div className={styles.pdpInner}>
          {/* GALLERY */}
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {gallery.map((src, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${
                    activeImg === i ? styles.thumbOn : ""
                  }`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <SmartImage src={src} alt="" />
                </button>
              ))}
            </div>
            <div className={styles.stage}>
              {product.badge && (
                <span className={styles.stageBadge}>{product.badge}</span>
              )}
              <SmartImage
                src={gallery[activeImg]}
                alt={`${product.name} ${product.line}`}
                className={styles.stageImg}
              />
            </div>
          </div>

          {/* PURCHASE RAIL */}
          <div className={styles.rail}>
            <div className={styles.railInner}>
              <p className={styles.fabricTag}>{product.fabric}</p>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.line}>{product.line}</p>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>★★★★★</span>
                <a href="#reviews" className={styles.ratingLink}>
                  {product.rating} · {product.reviewCount} reviews
                </a>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price}</span>
                {product.compareAt && (
                  <>
                    <span className={styles.was}>${product.compareAt}</span>
                    <span className={styles.save}>
                      Save ${product.compareAt - product.price}
                    </span>
                  </>
                )}
              </div>

              <p className={styles.shortDesc}>{product.shortDescription}</p>

              {/* COLOR */}
              <div className={styles.optGroup}>
                <div className={styles.optHead}>
                  <span className={styles.optLabel}>Colour</span>
                  <span className={styles.optValue}>{color}</span>
                </div>
                <div className={styles.swatchRow}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      className={`${styles.swatch} ${
                        color === c.name ? styles.swatchOn : ""
                      }`}
                      style={{ background: c.hex }}
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      aria-pressed={color === c.name}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div
                className={`${styles.optGroup} ${shake ? styles.shake : ""}`}
                id="size-group"
              >
                <div className={styles.optHead}>
                  <span className={styles.optLabel}>Size</span>
                  <button className={styles.sizeGuide}>Size Guide</button>
                </div>
                <div className={styles.sizeRow}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`${styles.size} ${
                        size === s ? styles.sizeOn : ""
                      }`}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!size && shake && (
                  <p className={styles.sizeHint}>Please select a size</p>
                )}
              </div>

              <button className={styles.addBtn} onClick={handleAdd}>
                Add to Bag — ${product.price}
              </button>

              <p className={styles.makeNote}>
                Made to order · ships in 3–5 days · worldwide delivery
              </p>

              {/* TRUST ROW */}
              <div className={styles.trust}>
                <div className={styles.trustItem}>
                  <span className={styles.trustT}>Made in Vienna</span>
                  <span className={styles.trustD}>Handcraft atelier</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustT}>Cut to you</span>
                  <span className={styles.trustD}>Your measurements</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustT}>14-day returns</span>
                  <span className={styles.trustD}>Easy &amp; free</span>
                </div>
              </div>

              {/* ACCORDIONS */}
              <div className={styles.accordion}>
                <button
                  className={styles.accHead}
                  onClick={() => toggle("details")}
                  aria-expanded={openSection === "details"}
                >
                  <span>Details &amp; Craft</span>
                  <span className={styles.accIcon}>
                    {openSection === "details" ? "–" : "+"}
                  </span>
                </button>
                {openSection === "details" && (
                  <div className={styles.accBody}>
                    <p>{product.description}</p>
                    <ul className={styles.detailList}>
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className={styles.accHead}
                  onClick={() => toggle("shipping")}
                  aria-expanded={openSection === "shipping"}
                >
                  <span>Shipping &amp; Returns</span>
                  <span className={styles.accIcon}>
                    {openSection === "shipping" ? "–" : "+"}
                  </span>
                </button>
                {openSection === "shipping" && (
                  <div className={styles.accBody}>
                    <p>
                      As each gown is made to order, please allow three to five
                      days for our atelier to complete your piece. Priority
                      shipping worldwide delivers within seven to ten days.
                    </p>
                    <p>
                      Complimentary returns within 14 days of delivery on all
                      unworn pieces.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.reviews} id="reviews">
        <div className="container">
          <div className={styles.revTop}>
            <div>
              <p className="eyebrow">Verified</p>
              <h2 className={styles.revTitle}>What clients say</h2>
            </div>
            <div className={styles.revScore}>
              <span className={styles.revStars}>★★★★★</span>
              <span>
                {product.rating} out of 5 · {product.reviewCount} reviews
              </span>
            </div>
          </div>
          <div className={styles.revGrid}>
            {product.reviews.map((r) => (
              <figure className={styles.revCard} key={r.name}>
                <div className={styles.revCardStars}>
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>
                <p className={styles.revHeadline}>{r.title}</p>
                <blockquote>{r.body}</blockquote>
                <figcaption>
                  {r.name}
                  <span className={styles.verified}>Verified buyer</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className={styles.related}>
        <div className="container">
          <h2 className={styles.relTitle}>Complete the look</h2>
          <div className={styles.relGrid}>
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* STICKY MOBILE BAR */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyInfo}>
          <span className={styles.stickyName}>{product.name}</span>
          <span className={styles.stickyPrice}>${product.price}</span>
        </div>
        <button className={styles.stickyBtn} onClick={handleAdd}>
          Add to Bag
        </button>
      </div>
    </>
  );
}
