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

export const metadata = {
  title: {
    default: "PassiveIncomeToday - Start Your Passive Income Journey",
    template: "%s | PassiveIncomeToday"
  },
  description: "Calculate your potential returns and learn how to build passive income streams. Get expert guidance on real estate investing, stock market strategies, and more.",
  metadataBase: new URL('https://passiveincometoday.com'),
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#ffffff",
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
    google: 'your-google-site-verification', // You'll need to add your verification code
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
        url: '/og-image.jpg', // You'll need to create this image
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
    images: ['/og-image.jpg'], // Same as OG image
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
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
