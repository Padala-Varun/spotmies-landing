import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { site } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "Spotmies — Human + AI Product Studio";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · Spotmies" },
  description: site.description,
  keywords: [
    "Spotmies",
    "product studio",
    "software development",
    "AI development",
    "blockchain development",
    "Flutter app development",
    "SaaS development",
    "UI/UX design",
    "generative AI video",
    "Visakhapatnam",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Spotmies",
    title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@spotmies",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

/** Runs before paint: skips the intro for returning visitors and reduced-motion users (no flash). */
const introScript = `try{if(sessionStorage.getItem('sp-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.intro='done'}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}body{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
