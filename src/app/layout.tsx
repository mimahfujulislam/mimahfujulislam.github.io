import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile, site, socials } from "@/content/profile";
import { SpotlightEffect } from "@/components/effects/spotlight-effect";
import { MotionProvider } from "@/components/providers/motion-provider";
import { themeScript } from "@/components/theme/theme-script";
import { withBase } from "@/lib/utils";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/** Rendered at build time by src/app/og.png/route.tsx. */
const socialImage = {
  url: `${site.url}/og.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Mahfujul Islam — Computer Science Undergraduate building with AI, Machine Learning & Data",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${profile.name}` },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Mahfujul",
    lastName: "Islam",
    username: socials.github.handle,
    url: "/",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
  applicationName: profile.name,
  appleWebApp: { title: profile.name },
  icons: {
    icon: [
      { url: withBase("/favicon.svg"), type: "image/svg+xml" },
      { url: withBase("/favicon.ico"), sizes: "32x32 48x48" },
    ],
    shortcut: withBase("/favicon.ico"),
    apple: { url: withBase("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
  },
  robots: { index: true, follow: true },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#06080d" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <SpotlightEffect />
        <div aria-hidden className="grain" />
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
