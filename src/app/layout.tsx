import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/site.config";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const { site } = siteConfig;

// Inline script anti-FOUC — runs before hydration
const themeScript = `var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.classList.toggle("light",t==="light");document.documentElement.setAttribute("data-theme",t)`;
// Set <html lang> early from persisted locale (avoids flicker; LocaleProvider also syncs post-hydration)
const localeScript = `try{var l=localStorage.getItem("locale");if(l==="en"||l==="id")document.documentElement.lang=l;}catch(e){}`;

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
    <html lang="en" className={`${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-mono antialiased selection:bg-[var(--color-background-interactive)] selection:text-[var(--color-text-strong)]">
        <LocaleProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
