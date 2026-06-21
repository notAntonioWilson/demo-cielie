import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";

export const metadata: Metadata = {
  title: "CIÉLIE | Luxury Occasionwear, Made in Vienna",
  description:
    "Made-to-order evening gowns and statement dresses. Designed in Vienna, crafted from the finest fabrics, shipped worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Cursor />
          <SmoothScroll />
          <Header />
          <CartDrawer />
          <div id="smooth-root">
            <main>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
