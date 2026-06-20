"use client";

import { useState } from "react";

// Elegant inline fallback so the demo never shows a broken image,
// even if a remote CDN URL becomes unavailable.
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'>
      <rect width='600' height='800' fill='#efe9dd'/>
      <text x='50%' y='49%' font-family='Cormorant Garamond, Georgia, serif'
        font-size='52' fill='#b08d4f' text-anchor='middle' letter-spacing='6'>CIÉLIE</text>
      <text x='50%' y='55%' font-family='Inter, sans-serif' font-size='13'
        fill='#8a847a' text-anchor='middle' letter-spacing='3'>VIENNA</text>
    </svg>`
  );

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function SmartImage({ src, alt, className }: Props) {
  const [err, setErr] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={err ? FALLBACK : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErr(true)}
    />
  );
}
