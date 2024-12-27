import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "PassiveIncomeToday - Start Your Passive Income Journey",
    template: "%s | PassiveIncomeToday"
  },
  description: "Calculate your potential returns and learn how to build passive income streams.",
  metadataBase: new URL('https://passiveincometoday.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
