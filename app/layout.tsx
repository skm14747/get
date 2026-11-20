import type { Metadata } from "next";
import Script from "next/script";
import { ConsentBanner } from "@/components/consent-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site, siteUrl } from "@/lib/site";
import { messages } from "@/locales/en";
import "./globals.css";

const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: siteUrl() },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  ...(verification ? { verification: { google: verification } } : {}),
};

const themeScript = `(function(){try{var t=localStorage.getItem("goeasytools.theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.htmlLang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-adsense-account" content="ca-pub-4058029196087745" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4058029196087745"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-30 focus:bg-surface focus:px-3 focus:py-2 focus:text-ink">
          {messages.skipToContent}
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <ConsentBanner />
        <noscript>
          <p className="mx-auto max-w-5xl px-4 pb-8 text-sm">
            The tools on this site need JavaScript. Text and numbers are processed in the browser and are not sent to the server by the tool code.
          </p>
        </noscript>
      </body>
    </html>
  );
}
