import type { Metadata, Viewport } from "next";
import { Archivo, STIX_Two_Text } from "next/font/google";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

// One grotesque with a width axis: expanded for headlines, condensed for labels.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// A face made for technical publishing carries the editorial voice.
const stix = STIX_Two_Text({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-stix",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NextSpark: full-stack web development and IT industrial training",
    template: "%s | NextSpark",
  },
  description:
    "A 16-week program in full-stack web development and IT industrial training. Learn how software companies plan, build, test and ship, then build and deploy your own capstone application.",
};

export const viewport: Viewport = {
  themeColor: "#1c1c1c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${stix.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-[2px] bg-bone px-4 py-3 font-medium text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
