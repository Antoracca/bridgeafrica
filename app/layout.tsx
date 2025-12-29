import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Toaster } from "sonner";

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
      <head>
        {/* Loader immédiat qui s'affiche AVANT React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Créer le loader immédiatement
                const loader = document.createElement('div');
                loader.id = 'initial-loader';
                loader.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgb(239 246 255) 0%,rgb(255 255 255) 50%,rgb(236 254 255) 100%);';

                const content = document.createElement('div');
                content.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:1.5rem;margin-top:-4rem;';

                const animContainer = document.createElement('div');
                animContainer.id = 'lottie-container';
                animContainer.style.cssText = 'width:20rem;height:20rem;';

                content.appendChild(animContainer);
                loader.appendChild(content);
                document.body.appendChild(loader);
              })();
            `,
          }}
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('DOMContentLoaded', function() {
                const container = document.getElementById('lottie-container');
                if (container && window.lottie) {
                  window.lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: '/loarderpagehome.json'
                  });
                }
              });

              // Cacher le loader une fois que React est chargé
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const loader = document.getElementById('initial-loader');
                  if (loader) {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.3s ease-out';
                    setTimeout(function() {
                      loader.remove();
                    }, 300);
                  }
                }, 500);
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          {children}
          <Toaster position="top-right" richColors />
        </LoadingProvider>
      </body>
    </html>
  );
}
