import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Toaster } from "sonner";
import { InitialPageLoader } from "@/components/loaders/InitialPageLoader";
import {
    BASE_URL, SITE_NAME, SITE_TAGLINE,
    SEO_KEYWORDS, SEO_DESCRIPTION, SEO_DESCRIPTION_LONG,
    getOrganizationSchema, getWebsiteSchema, getFAQSchema,
} from "@/lib/seo";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// ── Viewport (Next.js 15 best practice: separate from metadata) ──
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
}

// ── Metadata SEO Nucléaire ──
export const metadata: Metadata = {
    // ─ Base
    metadataBase: new URL(BASE_URL),
    title: {
        default: `${SITE_NAME} — ${SITE_TAGLINE}`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SEO_DESCRIPTION,
    keywords: SEO_KEYWORDS,
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,

    // ─ Robots
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // ─ Open Graph (Facebook, LinkedIn, WhatsApp)
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        alternateLocale: ['en_US', 'ar_MA'],
        url: BASE_URL,
        siteName: SITE_NAME,
        title: `${SITE_NAME} — Tourisme Médical Premium | Maroc, Tunisie, Turquie`,
        description: SEO_DESCRIPTION_LONG,
        images: [
            {
                url: `${BASE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: `${SITE_NAME} — Plateforme de tourisme médical en Afrique`,
                type: 'image/png',
            },
        ],
    },

    // ─ Twitter Cards
    twitter: {
        card: 'summary_large_image',
        site: '@pontafriquesante',
        creator: '@pontafriquesante',
        title: `${SITE_NAME} — Tourisme Médical Premium`,
        description: SEO_DESCRIPTION,
        images: [`${BASE_URL}/og-image.png`],
    },

    // ─ App & Icons
    applicationName: SITE_NAME,
    appleWebApp: {
        capable: true,
        title: SITE_NAME,
        statusBarStyle: 'default',
    },
    icons: {
        icon: [
            { url: '/FaviconFinal.png', type: 'image/png' },
            { url: '/favicon.png', type: 'image/png' },
        ],
        shortcut: '/FaviconFinal.png',
        apple: [
            { url: '/FaviconFinal.png', sizes: '180x180', type: 'image/png' },
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },

    // ─ Alternates (hreflang pour SEO multilingue)
    alternates: {
        canonical: BASE_URL,
        languages: {
            'fr': BASE_URL,
            'en': `${BASE_URL}/en`,
            'ar': `${BASE_URL}/ar`,
        },
    },

    // ─ Category (vérification Google faite via DNS)
    category: 'health',

    // ─ Autres
    referrer: 'origin-when-cross-origin',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" dir="ltr">
            <head>
                {/* Schema.org JSON-LD — Organisation Médicale */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
                />
                {/* Schema.org JSON-LD — WebSite (Google Sitelinks Search) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteSchema()) }}
                />
                {/* Schema.org JSON-LD — FAQ (Rich Snippets Google) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema()) }}
                />
                {/* Geo Tags pour SEO local */}
                <meta name="geo.region" content="MA" />
                <meta name="geo.placename" content="Casablanca" />
                <meta name="geo.position" content="33.5731;-7.5898" />
                <meta name="ICBM" content="33.5731, -7.5898" />

                {/* Dublin Core pour les moteurs de recherche académiques */}
                <meta name="DC.title" content={`${SITE_NAME} — Tourisme Médical`} />
                <meta name="DC.creator" content={SITE_NAME} />
                <meta name="DC.subject" content="Tourisme médical, santé, chirurgie, Afrique, Maroc" />
                <meta name="DC.description" content={SEO_DESCRIPTION} />
                <meta name="DC.language" content="fr" />
                <meta name="DC.type" content="Service" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <InitialPageLoader />
                <LoadingProvider>
                    <div id="app-scroll">
                        {children}
                    </div>
                </LoadingProvider>
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
