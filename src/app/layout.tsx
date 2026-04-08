import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/src/components/cartStore";
import Navbar from "@/src/components/layout/Nav";
import CartDrawer from "@/src/components/CartDrawer";
import { Footer } from "@/src/components/layout/Footer";

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Homedine",
  description: "Thoughtfully crafted furniture for modern living.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dm.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          {children}
          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}
