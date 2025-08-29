import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabas Rojas",
  description: "Computer Science Graduate and Software Developer. Problem solver passionate about technology & innovation. Open to tech opportunities.",
  keywords: "Sabas Rojas, Computer Science Graduate, Software Developer, UTEP, React Native, Python, Portfolio",
  authors: [{ name: "Sabas Rojas" }],
  creator: "Sabas Rojas",
  openGraph: {
    title: "Sabas Rojas",
    description: "Computer Science Graduate and Software Developer from El Paso, TX",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
