import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/site.config";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { defaultLocale, htmlLang } from "@/i18n/config";
import { translations } from "@/i18n/translations";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const { site } = siteConfig;
const defaultTranslation = translations[defaultLocale];

// Inline script anti-FOUC — runs before hydration
const themeScript = `var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark")t="light";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.classList.toggle("light",t==="light");document.documentElement.setAttribute("data-theme",t)`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: defaultTranslation.site.title,
  description: defaultTranslation.site.description,
  openGraph: {
    title: defaultTranslation.site.title,
    description: defaultTranslation.site.description,
    url: site.url + "/",
  },
  twitter: {
    card: "summary",
    title: site.shortTitle,
    description: defaultTranslation.site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={htmlLang[defaultLocale]} className={`${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-mono antialiased selection:bg-[var(--color-background-interactive)] selection:text-[var(--color-text-strong)]">
        <LocaleProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
