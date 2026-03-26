import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingFood from "@/components/effects/FloatingFood";
import FloatingBumper from "@/components/effects/FloatingBumper";
import { CartProvider } from "@/components/cart/CartProvider";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dilly Ray's Sweet Heat | BBQ Food Truck",
    template: "%s | Dilly Ray's Sweet Heat",
  },
  description:
    "Bold BBQ from our double-decker bus. Smoked meats, sweet heat sauces, and a dining experience like no other. Order online for pickup.",
  keywords: [
    "BBQ",
    "food truck",
    "Nashville",
    "smoked meats",
    "double decker bus",
    "sweet heat",
    "barbecue",
  ],
  authors: [{ name: "Dilly Ray's Sweet Heat" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dilly Ray's Sweet Heat",
    title: "Dilly Ray's Sweet Heat | BBQ Food Truck",
    description:
      "Bold BBQ from our double-decker bus. Order online for pickup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dilly Ray's Sweet Heat | BBQ Food Truck",
    description:
      "Bold BBQ from our double-decker bus. Order online for pickup.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen">
        <CartProvider>
          <FloatingFood />
          {/* Interactive flame-chili peppers */}
          <FloatingBumper src="/images/flame-chill.png" alt="Flaming chili pepper" startX={78} startY={30} size={130} />
          <FloatingBumper src="/images/flame-chill.png" alt="Flaming chili pepper" startX={8} startY={55} size={95} bumpStrength={150} />
          <FloatingBumper src="/images/flame-chill.png" alt="Flaming chili pepper" startX={85} startY={72} size={75} bumpRadius={120} />
          {/* Interactive pig mascot */}
          <FloatingBumper
            src="/images/pig.png"
            alt="Dilly Ray's pig mascot"
            startX={15}
            startY={25}
            size={160}
            bumpRadius={180}
            bumpStrength={100}
            bobDuration={6}
            bobDistance={16}
            glowColor="rgba(185,28,28,0.3)"
            z={3}
          />
          <Navbar />
          <main className="pt-20 md:pt-24">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
