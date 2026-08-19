import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pontafriquesante.com'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/auth/',
                    '/check-email',
                    '/complete-profile',
                    '/success',
                    '/admin',
                ],
            },
            {
                // Bloquer les crawlers agressifs
                userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot'],
                disallow: '/',
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
