import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" }
  ],
};

export const metadata = {
  title: {
    default: "PassiveIncomeToday - Start Your Passive Income Journey",
    template: "%s | PassiveIncomeToday"
  },
  description: "Calculate your potential returns and learn how to build passive income streams. Get expert guidance on real estate investing, stock market strategies, and more.",
  metadataBase: new URL('https://passiveincometoday.com'),
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://passiveincometoday.com',
    title: 'PassiveIncomeToday - Start Your Passive Income Journey',
    description: 'Calculate your potential returns and learn how to build passive income streams. Get expert guidance on real estate investing, stock market strategies, and more.',
    siteName: 'PassiveIncomeToday',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PassiveIncomeToday - Your Guide to Financial Freedom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PassiveIncomeToday - Start Your Passive Income Journey',
    description: 'Calculate your potential returns and learn how to build passive income streams. Get expert guidance on real estate investing, stock market strategies, and more.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://passiveincometoday.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PassiveIncomeToday',
  description: 'Calculate your potential returns and learn how to build passive income streams. Get expert guidance on real estate investing, stock market strategies, and more.',
  url: 'https://passiveincometoday.com',
  potentialAction: {
    '@type': 'SearchAction',
    'target': 'https://passiveincometoday.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  sameAs: [
    // Add your social media profiles here
    // 'https://twitter.com/passiveincometoday',
    // 'https://facebook.com/passiveincometoday',
    // 'https://linkedin.com/company/passiveincometoday'
  ],
  publisher: {
    '@type': 'Organization',
    name: 'PassiveIncomeToday',
    logo: {
      '@type': 'ImageObject',
      url: 'https://passiveincometoday.com/logo.png'
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
