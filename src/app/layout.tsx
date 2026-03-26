import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingFood from "@/components/effects/FloatingFood";
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
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
