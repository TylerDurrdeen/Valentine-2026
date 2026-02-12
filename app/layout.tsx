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
  title: "Dorka bébi valentin nap 💝",
  description: "2026 na csumicsumi - Egy különleges valentin napi meglepetés Dorkának",
  keywords: ["valentin nap", "szerelem", "meglepetés", "2026", "Dorka"],
  authors: [{ name: "TylerDurrdeen" }],
  openGraph: {
    title: "Dorka bébi valentin nap 💝",
    description: "2026 na csumicsumi - Egy különleges valentin napi meglepetés",
    type: "website",
    locale: "hu_HU",
    siteName: "Dorka Valentine 2026",
    images: [
      {
        url: "/opengraph.jpeg",
        width: 1200,
        height: 630,
        alt: "Valentine's Day 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dorka bébi valentin nap 💝",
    description: "2026 na csumicsumi - Egy különleges valentin napi meglepetés",
    images: ["/opengraph.jpeg"],
  },
  icons: {
    icon: [
      { url: "/icon.webp", type: "image/webp" },
    ],
  },
  metadataBase: new URL("https://valentine-2026.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
