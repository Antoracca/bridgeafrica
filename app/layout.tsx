import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Toaster } from "sonner";
import { InitialPageLoader } from "@/components/loaders/InitialPageLoader";

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

export const metadata: Metadata = {
  title: "MediBridge - Votre pont vers les meilleurs soins",
  description: "Plateforme de tourisme médical connectant patients et cliniques d'excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect aux domaines d'images externes pour DNS lookup anticipé */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://plus.unsplash.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InitialPageLoader />
        <LoadingProvider>
          {children}
        </LoadingProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
