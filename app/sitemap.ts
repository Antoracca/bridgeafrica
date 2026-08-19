import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pontafriquesante.com'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    // ── Pages publiques — priorité max ──
    const publicPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/destinations/maroc`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
        { url: `${BASE_URL}/liste-pays`, lastModified: now, changeFrequency: 'weekly', priority: 0.90 },
        { url: `${BASE_URL}/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
        { url: `${BASE_URL}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.60 },
    ]

    // ── Pages destinations (SEO killer — une page par pays/ville) ──
    const destinationPages = [
        'maroc', 'tunisie', 'turquie', 'france',
        'maroc/casablanca', 'maroc/rabat', 'maroc/marrakech', 'maroc/tanger', 'maroc/fes',
        'tunisie/tunis', 'tunisie/sousse', 'tunisie/sfax',
        'turquie/istanbul', 'turquie/ankara', 'turquie/antalya',
        'france/paris', 'france/lyon', 'france/marseille',
    ].map(slug => ({
        url: `${BASE_URL}/destinations/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.90,
    }))

    // ── Pages spécialités médicales (long tail SEO) ──
    const specialtyPages = [
        'chirurgie-esthetique', 'greffe-cheveux', 'implant-dentaire', 'facette-dentaire',
        'rhinoplastie', 'liposuccion', 'augmentation-mammaire', 'abdominoplastie',
        'sleeve-gastrique', 'bypass-gastrique', 'chirurgie-bariatrique',
        'fiv-fecondation-in-vitro', 'lasik-chirurgie-yeux',
        'prothese-hanche', 'prothese-genou', 'chirurgie-cardiaque',
        'oncologie-traitement-cancer', 'check-up-medical',
        'hollywood-smile', 'blanchiment-dentaire', 'orthodontie',
        'lifting-visage', 'blepharoplastie', 'otoplastie',
        'botox-injections', 'acide-hyaluronique',
        'chirurgie-colonne-vertebrale', 'neurochirurgie',
    ].map(slug => ({
        url: `${BASE_URL}/specialites/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    // ── Pages informatives / blog (SEO content marketing) ──
    const contentPages = [
        'guide-tourisme-medical', 'comment-ca-marche', 'pourquoi-pont-afrique-sante',
        'tarifs-et-devis', 'temoignages-patients', 'faq',
        'guide-visa-medical', 'assurance-voyage-medical',
        'avant-apres-chirurgie', 'blog',
        'blog/prix-chirurgie-maroc', 'blog/prix-greffe-cheveux-turquie',
        'blog/meilleur-chirurgien-casablanca', 'blog/avis-tourisme-medical-maroc',
        'blog/combien-coute-sleeve-tunisie', 'blog/guide-fiv-maroc',
        'blog/implant-dentaire-maroc-prix', 'blog/rhinoplastie-tunisie-avis',
        'blog/hollywood-smile-turquie-prix', 'blog/chirurgie-bariatrique-maroc',
    ].map(slug => ({
        url: `${BASE_URL}/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.75,
    }))

    // ── Dashboard patient (indexable pour le SEO d'app) ──
    const patientPages = [
        'patient', 'patient/dossier', 'patient/dossier/new',
        'patient/messages', 'patient/notifications',
        'patient/profile', 'patient/settings', 'patient/help',
    ].map(path => ({
        url: `${BASE_URL}/${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.40,
    }))

    // ── Dashboard médecin ──
    const medecinPages = [
        'medecin', 'medecin/dossiers', 'medecin/patients', 'medecin/messages',
    ].map(path => ({
        url: `${BASE_URL}/${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.30,
    }))

    // ── Dashboard clinique ──
    const cliniquePages = [
        'clinique', 'clinique/dossiers', 'clinique/devis', 'clinique/planning',
    ].map(path => ({
        url: `${BASE_URL}/${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.30,
    }))

    return [
        ...publicPages,
        ...destinationPages,
        ...specialtyPages,
        ...contentPages,
        ...patientPages,
        ...medecinPages,
        ...cliniquePages,
    ]
}
