"use client";

import { useCart } from "./CartContext";
import SmartImage from "./SmartImage";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQty, subtotal } = useCart();

  return (
    <>
      <div
        className={`${styles.scrim} ${isOpen ? styles.scrimOn : ""}`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>Your Bag</h2>
          <button className={styles.close} onClick={close} aria-label="Close bag">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Your bag is empty</p>
            <p className={styles.emptyText}>
              Every piece is made to order in our Vienna atelier.
            </p>
            <button className={styles.cont} onClick={close}>
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {items.map((it) => (
                <div className={styles.item} key={it.id}>
                  <SmartImage
                    src={it.image}
                    alt={it.name}
                    className={styles.thumb}
                  />
                  <div className={styles.meta}>
                    <p className={styles.iName}>{it.name}</p>
                    <p className={styles.iLine}>{it.line}</p>
                    <p className={styles.iOpt}>
                      {it.color} · Size {it.size}
                    </p>
                    <div className={styles.qtyRow}>
                      <div className={styles.qty}>
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span>{it.qty}</span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.remove}
                        onClick={() => remove(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className={styles.iPrice}>${it.price * it.qty}</p>
                </div>
              ))}
            </div>

            <div className={styles.foot}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <p className={styles.note}>
                Shipping and taxes calculated at checkout.
              </p>
              <button className={styles.checkout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
