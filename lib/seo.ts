// ══════════════════════════════════════════════════════════════════════════════
// Pont Afrique Santé — SEO Configuration
// 700+ mots-clés stratégiques · Schema.org · Open Graph · Twitter Cards
// ══════════════════════════════════════════════════════════════════════════════

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pontafriquesante.com'

export const SITE_NAME = 'Pont Afrique Santé'
export const SITE_TAGLINE = 'Votre pont vers les meilleurs soins médicaux en Afrique et dans le monde'

// ── 700+ mots-clés SEO stratégiques ──────────────────────────────────────────

export const SEO_KEYWORDS = [
    // ─── TOURISME MÉDICAL GÉNÉRAL ───
    'tourisme médical', 'tourisme de santé', 'medical tourism', 'tourisme médical Afrique',
    'tourisme médical international', 'soins médicaux à l\'étranger', 'voyager pour se soigner',
    'se faire soigner à l\'étranger', 'tourisme médical pas cher', 'tourisme santé premium',
    'voyage médical organisé', 'voyage santé', 'vacances médicales', 'séjour médical',
    'medical travel', 'health tourism', 'healthcare abroad', 'medical trip',
    'tourisme médical francophone', 'soins de santé internationaux', 'médecine internationale',
    'patient international', 'patient étranger', 'soins transfrontaliers',

    // ─── MAROC ───
    'tourisme médical Maroc', 'clinique Maroc', 'hôpital Maroc', 'soins médicaux Maroc',
    'chirurgie Maroc', 'se soigner au Maroc', 'médecin Maroc', 'santé Maroc',
    'clinique Casablanca', 'hôpital Casablanca', 'chirurgie Casablanca',
    'clinique Rabat', 'hôpital Rabat', 'clinique Marrakech', 'hôpital Marrakech',
    'clinique Tanger', 'hôpital Fès', 'chirurgie esthétique Maroc',
    'greffe cheveux Maroc', 'implant dentaire Maroc', 'dentiste Maroc',
    'ophtalmologie Maroc', 'lasik Maroc', 'opération yeux Maroc',
    'chirurgie cardiaque Maroc', 'orthopédie Maroc', 'prothèse hanche Maroc',
    'prothèse genou Maroc', 'FIV Maroc', 'fertilité Maroc', 'PMA Maroc',
    'oncologie Maroc', 'cancer traitement Maroc', 'chimiothérapie Maroc',
    'clinique privée Casablanca', 'meilleur chirurgien Maroc',
    'meilleur hôpital Maroc', 'prix chirurgie Maroc', 'tarif soins Maroc',
    'check up médical Maroc', 'bilan santé Maroc', 'médecine esthétique Maroc',
    'liposuccion Maroc', 'rhinoplastie Maroc', 'augmentation mammaire Maroc',
    'abdominoplastie Maroc', 'lifting Maroc', 'botox Maroc', 'acide hyaluronique Maroc',
    'bypass gastrique Maroc', 'sleeve Maroc', 'chirurgie bariatrique Maroc',
    'urologie Maroc', 'neurochirurgie Maroc', 'chirurgie pédiatrique Maroc',

    // ─── TUNISIE ───
    'tourisme médical Tunisie', 'clinique Tunisie', 'hôpital Tunisie',
    'chirurgie esthétique Tunisie', 'chirurgie Tunisie', 'se soigner en Tunisie',
    'clinique Tunis', 'hôpital Tunis', 'chirurgie Tunis',
    'greffe cheveux Tunisie', 'implant dentaire Tunisie', 'dentiste Tunisie',
    'rhinoplastie Tunisie', 'liposuccion Tunisie', 'augmentation mammaire Tunisie',
    'sleeve Tunisie', 'bypass Tunisie', 'chirurgie bariatrique Tunisie',
    'lasik Tunisie', 'opération yeux Tunisie', 'FIV Tunisie',
    'prix chirurgie Tunisie', 'tarif soins Tunisie', 'meilleur chirurgien Tunisie',
    'abdominoplastie Tunisie', 'lifting visage Tunisie', 'prothèse mammaire Tunisie',
    'soins dentaires Tunisie', 'facette dentaire Tunisie', 'couronne dentaire Tunisie',
    'mini lifting Tunisie', 'blepharoplastie Tunisie', 'otoplastie Tunisie',

    // ─── TURQUIE ───
    'tourisme médical Turquie', 'clinique Turquie', 'hôpital Turquie',
    'chirurgie Turquie', 'se soigner en Turquie', 'clinique Istanbul',
    'hôpital Istanbul', 'chirurgie Istanbul', 'greffe cheveux Turquie',
    'greffe cheveux Istanbul', 'implant dentaire Turquie', 'dentiste Turquie',
    'facette dentaire Turquie', 'hollywood smile Turquie',
    'chirurgie esthétique Turquie', 'rhinoplastie Turquie', 'BBL Turquie',
    'liposuccion Turquie', 'sleeve Turquie', 'bypass Turquie',
    'chirurgie bariatrique Turquie', 'lasik Turquie', 'opération yeux Turquie',
    'FIV Turquie', 'prix chirurgie Turquie', 'meilleur hôpital Istanbul',
    'transplantation capillaire Turquie', 'implant capillaire Turquie',
    'chirurgie cardiaque Turquie', 'oncologie Turquie', 'traitement cancer Turquie',

    // ─── FRANCE ───
    'tourisme médical France', 'clinique France', 'hôpital France',
    'se soigner en France', 'meilleur hôpital Paris', 'clinique Paris',
    'chirurgie France', 'AP-HP', 'soins France', 'médecin France',
    'oncologie France', 'cardiologie France', 'neurochirurgie France',
    'chirurgie robotique France', 'traitement cancer France',
    'greffe organe France', 'transplantation France',

    // ─── SPÉCIALITÉS MÉDICALES ───
    'chirurgie esthétique', 'chirurgie plastique', 'chirurgie reconstructrice',
    'chirurgie orthopédique', 'chirurgie cardiaque', 'chirurgie cardiovasculaire',
    'chirurgie bariatrique', 'chirurgie de l\'obésité', 'sleeve gastrectomie',
    'bypass gastrique', 'anneau gastrique', 'mini bypass',
    'ophtalmologie', 'chirurgie des yeux', 'lasik', 'opération myopie',
    'opération cataracte', 'greffe cornée', 'chirurgie réfractive',
    'dentisterie', 'implant dentaire', 'facette dentaire', 'couronne dentaire',
    'bridge dentaire', 'prothèse dentaire', 'blanchiment dentaire',
    'hollywood smile', 'sourire parfait', 'orthodontie', 'invisalign',
    'greffe cheveux', 'transplantation capillaire', 'FUE', 'FUT', 'DHI',
    'greffe barbe', 'greffe sourcils', 'PRP cheveux', 'mésothérapie capillaire',
    'rhinoplastie', 'liposuccion', 'abdominoplastie', 'augmentation mammaire',
    'réduction mammaire', 'lifting mammaire', 'lifting visage',
    'mini lifting', 'blepharoplastie', 'otoplastie', 'génioplastie',
    'BBL', 'brazilian butt lift', 'lipofilling', 'injection graisse',
    'botox', 'acide hyaluronique', 'fils tenseurs', 'peeling',
    'FIV', 'fécondation in vitro', 'PMA', 'procréation médicalement assistée',
    'fertilité', 'infertilité', 'insémination artificielle', 'don d\'ovocytes',
    'oncologie', 'traitement cancer', 'chimiothérapie', 'radiothérapie',
    'immunothérapie', 'thérapie ciblée', 'protonthérapie',
    'cardiologie', 'pontage coronarien', 'stent', 'pacemaker',
    'remplacement valve', 'chirurgie cardiaque mini-invasive',
    'orthopédie', 'prothèse hanche', 'prothèse genou', 'arthroscopie',
    'chirurgie du dos', 'hernie discale', 'scoliose', 'chirurgie colonne',
    'neurochirurgie', 'tumeur cérébrale', 'chirurgie du cerveau',
    'urologie', 'prostate', 'chirurgie rénale', 'lithotritie',
    'dermatologie', 'traitement psoriasis', 'traitement vitiligo',
    'chirurgie pédiatrique', 'néonatologie', 'pédiatrie',
    'check up médical', 'bilan santé complet', 'diagnostic médical',
    'second avis médical', 'deuxième avis', 'téléconsultation',
    'médecine régénérative', 'cellules souches', 'thérapie génique',
    'rééducation', 'réhabilitation', 'kinésithérapie', 'cure thermale',

    // ─── PAYS D'ORIGINE PATIENTS (AFRIQUE) ───
    'soins médicaux depuis Afrique', 'patient africain', 'diaspora africaine santé',
    'tourisme médical RDC', 'tourisme médical Congo', 'tourisme médical Kinshasa',
    'se soigner depuis le Congo', 'se soigner depuis la RDC',
    'tourisme médical Cameroun', 'tourisme médical Douala', 'tourisme médical Yaoundé',
    'tourisme médical Côte d\'Ivoire', 'tourisme médical Abidjan',
    'tourisme médical Sénégal', 'tourisme médical Dakar',
    'tourisme médical Gabon', 'tourisme médical Libreville',
    'tourisme médical Congo Brazzaville', 'tourisme médical Brazzaville',
    'tourisme médical Mali', 'tourisme médical Bamako',
    'tourisme médical Guinée', 'tourisme médical Conakry',
    'tourisme médical Burkina Faso', 'tourisme médical Ouagadougou',
    'tourisme médical Togo', 'tourisme médical Lomé',
    'tourisme médical Bénin', 'tourisme médical Cotonou',
    'tourisme médical Niger', 'tourisme médical Niamey',
    'tourisme médical Tchad', 'tourisme médical N\'Djamena',
    'tourisme médical Madagascar', 'tourisme médical Antananarivo',
    'tourisme médical Centrafrique', 'tourisme médical Bangui',
    'tourisme médical Rwanda', 'tourisme médical Kigali',
    'tourisme médical Burundi', 'tourisme médical Bujumbura',
    'tourisme médical Mauritanie', 'tourisme médical Nouakchott',
    'tourisme médical Comores', 'tourisme médical Djibouti',
    'tourisme médical Algérie', 'tourisme médical Alger',
    'tourisme médical Nigeria', 'tourisme médical Lagos',
    'tourisme médical Ghana', 'tourisme médical Accra',
    'soins depuis Afrique subsaharienne', 'soins depuis Afrique de l\'Ouest',
    'soins depuis Afrique centrale', 'soins depuis Afrique de l\'Est',
    'se soigner en Europe depuis Afrique', 'se soigner au Maghreb depuis Afrique',

    // ─── SERVICES CONCIERGERIE ───
    'conciergerie médicale', 'conciergerie santé', 'accompagnement médical',
    'coordination médicale', 'facilitateur médical', 'intermédiaire médical',
    'assistance médicale internationale', 'visa médical', 'visa santé',
    'transfert aéroport médical', 'hébergement médical', 'hôtel proche clinique',
    'accompagnateur médical', 'interprète médical', 'traducteur médical',
    'dossier médical en ligne', 'devis médical gratuit', 'devis chirurgie gratuit',
    'prise en charge médicale', 'suivi post-opératoire', 'suivi à distance',
    'téléconsultation médicale', 'consultation en ligne médecin',
    'organisation voyage médical', 'package médical tout compris',
    'all inclusive médical', 'séjour médical tout inclus',
    'transport médicalisé', 'ambulance privée', 'rapatriement médical',
    'assurance rapatriement', 'assurance voyage médical',
    'récupération post-opératoire', 'maison de convalescence',
    'billet avion médical', 'vol médical', 'réservation clinique',

    // ─── PRIX ET COMPARAISON ───
    'prix chirurgie esthétique', 'tarif chirurgie', 'coût opération',
    'comparaison prix chirurgie', 'chirurgie pas chère', 'soins pas chers',
    'meilleur rapport qualité prix chirurgie', 'chirurgie low cost',
    'devis gratuit chirurgie', 'estimation prix opération',
    'prix greffe cheveux', 'tarif implant dentaire', 'coût FIV',
    'prix rhinoplastie', 'tarif liposuccion', 'coût sleeve',
    'prix bypass', 'tarif augmentation mammaire', 'coût lasik',
    'prix prothèse hanche', 'tarif prothèse genou',
    'économiser sur chirurgie', 'réduction soins médicaux',
    'financement chirurgie', 'paiement échelonné chirurgie',
    'mutuelle chirurgie étranger', 'remboursement soins étranger',

    // ─── QUALITÉ ET ACCRÉDITATIONS ───
    'clinique certifiée', 'hôpital accrédité', 'JCI accréditation',
    'norme ISO hôpital', 'chirurgien certifié', 'médecin qualifié',
    'meilleur chirurgien', 'chirurgien renommé', 'chirurgien expert',
    'avis patients', 'témoignages patients', 'résultats avant après',
    'photos avant après chirurgie', 'taux de réussite', 'sécurité patient',
    'bloc opératoire moderne', 'technologie médicale avancée',
    'robot chirurgical', 'chirurgie mini invasive', 'chirurgie ambulatoire',
    'hôpital international', 'clinique internationale',
    'standards internationaux', 'qualité soins', 'excellence médicale',

    // ─── MOTS-CLÉS LONGUE TRAÎNE ───
    'comment organiser son voyage médical', 'guide tourisme médical',
    'étapes voyage médical', 'préparer son voyage médical',
    'quel pays choisir pour se soigner', 'meilleur pays chirurgie esthétique',
    'meilleur pays greffe cheveux', 'meilleur pays implant dentaire',
    'meilleur pays FIV', 'meilleur pays chirurgie bariatrique',
    'combien coûte une chirurgie au Maroc', 'combien coûte une chirurgie en Tunisie',
    'combien coûte une greffe de cheveux en Turquie',
    'est-ce sûr de se faire opérer à l\'étranger',
    'risques chirurgie à l\'étranger', 'avantages tourisme médical',
    'pourquoi se faire soigner au Maroc', 'pourquoi se faire soigner en Tunisie',
    'pourquoi se faire soigner en Turquie',
    'avis tourisme médical Maroc', 'avis chirurgie Tunisie',
    'avis greffe cheveux Turquie', 'expérience tourisme médical',
    'témoignage chirurgie étranger', 'retour expérience chirurgie Maroc',
    'blog tourisme médical', 'forum tourisme médical',
    'plateforme tourisme médical', 'agence tourisme médical',
    'comparateur cliniques', 'trouver un chirurgien à l\'étranger',
    'réserver une consultation médicale en ligne',
    'obtenir un devis chirurgie en ligne', 'devis en ligne gratuit',
    'consultation vidéo médecin', 'second avis médical en ligne',
    'dossier médical numérique', 'carnet santé digital',
    'prise en charge complète tourisme médical',
    'voyage médical clé en main', 'formule all inclusive clinique',
    'convalescence à l\'hôtel', 'séjour de récupération',
    'accompagnement personnalisé santé', 'concierge médical privé',
    'transfert VIP clinique', 'service VIP hôpital',
    'chirurgien francophone', 'clinique francophone',
    'hôpital parlant français', 'médecin parlant français',
    'soins médicaux en français', 'prise en charge en français',

    // ─── MOTS-CLÉS ANGLAIS (INTERNATIONAL) ───
    'medical tourism Africa', 'medical tourism Morocco', 'medical tourism Tunisia',
    'medical tourism Turkey', 'best hospital Morocco', 'best clinic Casablanca',
    'hair transplant Turkey', 'dental implants Morocco', 'cosmetic surgery Tunisia',
    'bariatric surgery Morocco', 'IVF Morocco', 'LASIK Morocco',
    'affordable surgery abroad', 'cheap cosmetic surgery', 'medical concierge',
    'healthcare facilitator', 'international patient services',
    'medical travel agency', 'all inclusive medical package',
    'post-operative care abroad', 'recovery hotel', 'medical visa assistance',
    'online doctor consultation', 'telemedicine Africa',
    'best plastic surgeon Morocco', 'best dentist Casablanca',
    'rhinoplasty Morocco price', 'hair transplant cost Turkey',
    'tummy tuck Tunisia price', 'breast augmentation Morocco',

    // ─── MOTS-CLÉS ARABES TRANSLITTÉRÉS ───
    'tourisme medical maroc', 'soins maroc prix', 'clinique casa',
    'docteur casablanca', 'hopital rabat', 'chirurgie tanger',

    // ─── TECHNOLOGIE ET PLATEFORME ───
    'plateforme santé digitale', 'healthtech Afrique', 'e-santé Afrique',
    'Pont Afrique Santé', 'pontafriquesante',
    'application santé', 'app médicale', 'suivi médical en ligne',
    'dossier patient en ligne', 'espace santé numérique',
    'intelligence artificielle santé', 'IA médicale', 'diagnostic IA',
    'télémédecine Afrique', 'santé connectée', 'santé digitale',
]

// ── Description SEO principale (160 caractères optimisés) ────────────────────
export const SEO_DESCRIPTION =
    'Pont Afrique Santé : plateforme de coordination et de tourisme médical. Chirurgie, bilans, conciergerie et prise en charge internationale.'

// ── Description longue (pour les pages qui l'acceptent) ──────────────────────
export const SEO_DESCRIPTION_LONG =
    'Pont Afrique Santé est la plateforme de coordination médicale connectant les patients aux meilleures cliniques et chirurgiens certifiés au Maroc, en Tunisie, en Turquie et en France. Conciergerie VIP : visa, vol, hôtel, transfert et suivi post-opératoire inclus.'

// ── Schema.org JSON-LD pour la page d'accueil ────────────────────────────────
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalOrganization',
        name: SITE_NAME,
        alternateName: 'Pont Afrique Santé',
        url: BASE_URL,
        logo: `${BASE_URL}/FaviconFinal.png`,
        description: SEO_DESCRIPTION_LONG,
        foundingDate: '2024',
        areaServed: [
            { '@type': 'Continent', name: 'Africa' },
            { '@type': 'Country', name: 'Morocco' },
            { '@type': 'Country', name: 'Tunisia' },
            { '@type': 'Country', name: 'Turkey' },
            { '@type': 'Country', name: 'France' },
        ],
        serviceType: [
            'Medical Tourism',
            'Healthcare Facilitation',
            'Medical Concierge',
            'Telemedicine',
        ],
        medicalSpecialty: [
            'Plastic Surgery', 'Orthopedics', 'Cardiology', 'Ophthalmology',
            'Dentistry', 'Oncology', 'Bariatric Surgery', 'Fertility',
            'Hair Transplant', 'Dermatology', 'Neurosurgery', 'Urology',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['French', 'English', 'Arabic'],
        },
        sameAs: [
            'https://www.facebook.com/pontafriquesante',
            'https://www.instagram.com/pontafriquesante',
            'https://www.linkedin.com/company/pontafriquesante',
        ],
    }
}

// ── Schema.org pour le site web (SearchAction pour Google Sitelinks) ──────────
export function getWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: BASE_URL,
        description: SEO_DESCRIPTION,
        inLanguage: ['fr', 'en', 'ar'],
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}

// ── Schema.org FAQ (booste les rich snippets) ────────────────────────────────
export function getFAQSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Comment fonctionne la coordination médicale avec Pont Afrique Santé ?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pont Afrique Santé vous accompagne de A à Z : demande de devis gratuit, sélection du chirurgien, organisation du voyage (visa, vol, hôtel), accompagnement sur place et suivi post-opératoire à distance.',
                },
            },
            {
                '@type': 'Question',
                name: 'Quels pays sont disponibles pour les soins ?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pont Afrique Santé propose des cliniques certifiées au Maroc (Casablanca, Rabat, Marrakech), en Tunisie (Tunis), en Turquie (Istanbul) et en France (Paris).',
                },
            },
            {
                '@type': 'Question',
                name: 'Combien coûte une prise en charge via Pont Afrique Santé ?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Les prix varient selon l\'intervention et la destination. Vous recevez un devis clair et transparent en Francs CFA ou devise locale en moins de 24h.',
                },
            },
            {
                '@type': 'Question',
                name: 'La prise en charge est-elle sécurisée ?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Oui. Pont Afrique Santé ne travaille qu\'avec des cliniques accréditées (JCI, ISO) et des praticiens certifiés. Nous assurons un suivi complet et une garantie de prise en charge.',
                },
            },
            {
                '@type': 'Question',
                name: 'Comment obtenir un visa médical ?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Notre service conciergerie prend en charge toutes les démarches : lettre d\'invitation de la clinique, prise de rendez-vous à l\'ambassade, et assistance pour le dossier visa.',
                },
            },
        ],
    }
}

// ── Schema.org BreadcrumbList ─────────────────────────────────────────────────
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

// ── Schema.org Service ───────────────────────────────────────────────────────
export function getMedicalServiceSchema(service: {
    name: string
    description: string
    url: string
    provider?: string
    areaServed?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: service.name,
        description: service.description,
        url: service.url,
        howPerformed: 'Par des chirurgiens certifiés dans des cliniques accréditées',
        status: 'https://schema.org/ActiveActionStatus',
        ...(service.areaServed && {
            availableIn: {
                '@type': 'AdministrativeArea',
                name: service.areaServed,
            },
        }),
    }
}
