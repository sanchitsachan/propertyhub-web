import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "PropertyHub - Find Your Dream Property", template: "%s | PropertyHub" },
  description: "PropertyHub is the leading real estate platform. Browse verified properties for sale and rent across premium locations.",
  openGraph: { title: "PropertyHub - Find Your Dream Property", description: "Browse verified properties for sale and rent.", type: "website", siteName: "PropertyHub" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization",
          name: "PropertyHub", url: "https://www.propertyhub.com",
          contactPoint: { "@type": "ContactPoint", telephone: "+971-4-1234567", contactType: "customer service" },
        }) }} />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
