import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/providers/AppProviders";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CRM-ERP",
    template: "%s | CRM-ERP"
  },
  description:
    "Advanced realtime operations cockpit with comprehensive theme controls, multi-language support, and secure authentication. Monitor your business metrics in real-time.",
  metadataBase: new URL("https://kendis-pulse.local"),
  keywords: [
    "dashboard", 
    "analytics", 
    "realtime", 
    "operations", 
    "business intelligence", 
    "monitoring",
    "theme customization",
    "multi-language"
  ],
  authors: [{ name: "Kendis Team" }],
  creator: "Mehmet Onur ARIK",
  publisher: "Mehmet Onur ARIK",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    url: "https://kendis-pulse.local",
    siteName: "Kendis Pulse",
    title: "Kendis Pulse - Realtime Operations Dashboard",
    description: "Advanced realtime operations cockpit with comprehensive theme controls, multi-language support, and secure authentication.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kendis Pulse Dashboard Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@kendis",
    creator: "@kendis",
    title: "Kendis Pulse - Realtime Operations Dashboard",
    description: "Advanced realtime operations cockpit with comprehensive theme controls, multi-language support, and secure authentication.",
    images: ["/twitter-image.jpg"]
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
  classification: "Business Intelligence Dashboard"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#3788d8" />
        <meta name="msapplication-TileColor" content="#3788d8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="canonical" href="https://kendis-pulse.local" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <AppProviders>{children}</AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
