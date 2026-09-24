import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maidsmagicriverside.com"),
  title: "MaidsMagic | Premier Luxury Cleaning Services in Riverside, CA",
  description:
    "White-glove residential & commercial cleaning in Riverside, California. Serving Canyon Crest, Orangecrest, Hawarden Hills, Wood Streets, Victoria & UCR area. Insured, 5-Star rated, 100% Sparkle Guarantee.",
  keywords: [
    "MaidsMagic",
    "Maids Magic Riverside",
    "House cleaning Riverside CA",
    "Deep cleaning Riverside",
    "Move out cleaning Riverside",
    "Maid service Riverside California",
    "Canyon Crest house cleaners",
    "Orangecrest maid service",
    "Hawarden Hills luxury cleaning",
    "Airbnb cleaning Riverside CA",
  ],
  authors: [{ name: "MaidsMagic Riverside" }],
  openGraph: {
    title: "MaidsMagic | The Ultimate Clean for Riverside Homes",
    description:
      "Riverside's premier luxury cleaning service. Instant 60-second quote, background-checked specialists, and 100% Sparkle Guarantee.",
    url: "https://maidsmagicriverside.com",
    siteName: "MaidsMagic",
    images: [
      {
        url: "/images/maidsmagic-gmb-card.png",
        width: 1200,
        height: 630,
        alt: "MaidsMagic Riverside Cleaning Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#fafbfb] text-slate-900">
        {children}
      </body>
    </html>
  );
}
