import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Toaster } from "sonner";
import { InitialPageLoader } from "@/components/loaders/InitialPageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
