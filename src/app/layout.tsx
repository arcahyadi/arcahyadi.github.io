import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/site.config";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const { site } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url + "/",
    images: ["/social-share.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.shortTitle,
    description: site.description,
    images: ["/social-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-mono antialiased selection:bg-[var(--color-background-interactive)] selection:text-[var(--color-text-strong)]">
        {children}
      </body>
    </html>
  );
}
