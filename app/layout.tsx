import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OGForge — AI Social Card Generator",
  description:
    "Generate beautiful OG images, Twitter cards, and LinkedIn banners in seconds. $9 per image.",
  metadataBase: new URL("https://ogforge.ai"),
  openGraph: {
    title: "OGForge — AI Social Card Generator",
    description:
      "Generate beautiful OG images, Twitter cards, and LinkedIn banners in seconds. $9 per image.",
    url: "https://ogforge.ai",
    siteName: "OGForge",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "OGForge — AI Social Card Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OGForge — AI Social Card Generator",
    description:
      "Generate beautiful OG images, Twitter cards, and LinkedIn banners in seconds. $9 per image.",
    images: ["/api/og"],
    creator: "@ogforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "OGForge",
              description:
                "Generate beautiful OG images, Twitter cards, and LinkedIn banners in seconds. AI-powered social card generator.",
              url: "https://ogforge.ai",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "9",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Analytics product="ogforge" />
        {children}
      </body>
    </html>
  );
}
