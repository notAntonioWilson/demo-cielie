"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import SmartImage from "./SmartImage";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <SmartImage src={product.images[0]} alt={`${product.name} gown`} />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <span className={styles.quick}>View Piece</span>
      </div>
      <div className={styles.info}>
        <div className={styles.row}>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.price}>
            {product.compareAt && (
              <span className={styles.was}>${product.compareAt}</span>
            )}
            <span>${product.price}</span>
          </div>
        </div>
        <p className={styles.line}>{product.line}</p>
        <div className={styles.swatches}>
          {product.colors.map((c) => (
            <span
              key={c.name}
              className={styles.sw}
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
