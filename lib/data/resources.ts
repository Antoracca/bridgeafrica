/**
 * SOURCE DE VÉRITÉ — Ressources & Éducation Patient
 * Utilisé par : NavResources.tsx (navbar) + (futur) page /ressources
 *
 * Règles éditoriales
 *  · Aucun tiret cadratin (—) ni demi-cadratin (–) dans les phrases.
 *  · Ton factuel, concret, vérifiable. Pas de superlatifs vides.
 *  · Maroc en avant (hub prioritaire) : 3 guides Maroc sur 6.
 *  · Statistiques sourcées ou présentées comme indicatives.
 */

export type GuideStat = { label: string; value: string }

export interface PatientGuide {
  id: string
  hub: 'Maroc' | 'Tunisie' | 'Turquie' | 'France'
  hubCode: 'ma' | 'tn' | 'tr' | 'fr'
  priority: boolean
  /** ex: "01" pour le compteur du carousel */
  num: string
  /** Nom court de l'établissement de référence */
  reference: string
  /** Spécialité ciblée */
  specialty: string
  /** Titre éditorial du guide (sans tiret) */
  title: string
  /** Sous-titre court qui résume le bénéfice */
  excerpt: string
  /** 3 stats clés affichées sur la slide */
  stats: [GuideStat, GuideStat, GuideStat]
  /** 3 à 5 points abordés dans le guide */
  highlights: string[]
  /** Temps de lecture estimé */
  readTime: string
  /** Slug pour la route /guides/... */
  href: string
}

export const PATIENT_GUIDES: PatientGuide[] = [
  {
    id: 'ma-cardio-cheikh-khalifa',
    hub: 'Maroc',
    hubCode: 'ma',
    priority: true,
    num: '01',
    reference: 'Hôpital Cheikh Khalifa, Casablanca',
    specialty: 'Chirurgie cardiaque adulte',
    title: 'Pontages et chirurgie valvulaire à Casablanca',
    excerpt: 'Plateau technique JCI, équipes francophones formées en France et au Canada, prise en charge en moins de 21 jours.',
    stats: [
      { label: 'Séjour', value: '8 à 12 jours' },
      { label: 'Forfait', value: 'Dès 8 400 €' },
      { label: 'Récupération', value: '6 semaines' },
    ],
    highlights: [
      'Bilan pré-opératoire complet en 48 heures',
      'Coordination cardiologue référent du patient',
      'Hébergement famille à proximité de l\'hôpital',
      'Suivi post-opératoire à distance pendant 6 mois',
    ],
    readTime: '7 min',
    href: '/guides/cardiologie-casablanca',
  },
  {
    id: 'ma-pma-rabat',
    hub: 'Maroc',
    hubCode: 'ma',
    priority: true,
    num: '02',
    reference: 'Polyclinique Internationale, Rabat',
    specialty: 'Procréation médicalement assistée',
    title: 'FIV, ICSI et préservation de fertilité au Maroc',
    excerpt: 'Cliniques certifiées ESHRE, taux de grossesse comparable aux meilleurs centres européens, cadre réglementaire francophone clair.',
    stats: [
      { label: 'Cycle FIV', value: '14 à 18 jours' },
      { label: 'Forfait', value: 'Dès 2 800 €' },
      { label: 'Taux succès', value: '38 % par cycle' },
    ],
    highlights: [
      'Bilan hormonal et échographie inclus',
      'Anonymat et confidentialité du dossier',
      'Conventions avec hôtels partenaires longs séjours',
      'Téléconsultation post-transfert pendant 12 semaines',
    ],
    readTime: '9 min',
    href: '/guides/pma-maroc',
  },
  {
    id: 'ma-checkup-marrakech',
    hub: 'Maroc',
    hubCode: 'ma',
    priority: true,
    num: '03',
    reference: 'Clinique Internationale, Marrakech',
    specialty: 'Bilan exécutif et dépistage',
    title: 'Check-up complet en 48 heures à Marrakech',
    excerpt: 'Imagerie 3 Tesla, cardiologie, oncologie, biologie. Un compte rendu unique remis avant le départ, traduit en français et en anglais.',
    stats: [
      { label: 'Durée', value: '2 jours' },
      { label: 'Forfait', value: 'Dès 1 200 €' },
      { label: 'Examens', value: '32 actes' },
    ],
    highlights: [
      'IRM 3T, scanner faible dose, échographie cœur',
      'Marqueurs tumoraux et bilan métabolique',
      'Consultation médecin interne en clôture',
      'Convention avec hôtels riads pour accompagnants',
    ],
    readTime: '6 min',
    href: '/guides/checkup-marrakech',
  },
  {
    id: 'tr-greffe-istanbul',
    hub: 'Turquie',
    hubCode: 'tr',
    priority: false,
    num: '04',
    reference: 'Cliniques agréées, Istanbul',
    specialty: 'Greffe capillaire FUE et DHI',
    title: 'Greffe capillaire saphir à Istanbul, sans surprise',
    excerpt: 'Choisir une clinique certifiée par le ministère turc de la santé, comprendre la différence FUE, DHI, saphir, anticiper la chute initiale.',
    stats: [
      { label: 'Séjour', value: '3 jours' },
      { label: 'Forfait', value: 'Dès 1 800 €' },
      { label: 'Greffons', value: '3 500 à 5 000' },
    ],
    highlights: [
      'Consultation trichoscopique avant signature',
      'Hôtel 4 étoiles et transferts inclus',
      'Kit post-greffe livré au retour',
      'Photos de suivi à 3, 6 et 12 mois',
    ],
    readTime: '8 min',
    href: '/guides/greffe-capillaire-istanbul',
  },
  {
    id: 'fr-onco-paris',
    hub: 'France',
    hubCode: 'fr',
    priority: false,
    num: '05',
    reference: 'Centres de référence, Paris',
    specialty: 'Oncologie de pointe',
    title: 'Accéder à un centre anticancer parisien en visa médical',
    excerpt: 'Constituer un dossier RCP recevable, obtenir le visa médical en moins de 21 jours, organiser la prise en charge financière.',
    stats: [
      { label: 'Délai visa', value: '14 à 21 jours' },
      { label: 'Devis', value: 'Personnalisé' },
      { label: 'Hébergement', value: 'Maison patients' },
    ],
    highlights: [
      'Traduction et harmonisation du dossier médical',
      'Lettre d\'invitation hospitalière fournie',
      'Coordination interprète sur place si besoin',
      'Suivi à distance après retour au pays',
    ],
    readTime: '11 min',
    href: '/guides/oncologie-paris',
  },
  {
    id: 'tn-esthetique-tunis',
    hub: 'Tunisie',
    hubCode: 'tn',
    priority: false,
    num: '06',
    reference: 'Cliniques privées, Tunis',
    specialty: 'Chirurgie esthétique et reconstructrice',
    title: 'Chirurgie esthétique à Tunis, sécurité avant tout',
    excerpt: 'Vérifier les qualifications du chirurgien, exiger un bloc certifié ISO 9001, prévoir 7 jours de récupération sur place.',
    stats: [
      { label: 'Séjour', value: '6 à 8 jours' },
      { label: 'Forfait', value: 'Dès 2 100 €' },
      { label: 'Suivi', value: '3 mois inclus' },
    ],
    highlights: [
      'Consultation anesthésie 24 heures avant',
      'Convalescence en résidence médicalisée',
      'Drains et pansements changés à la clinique',
      'Téléconsultation contrôle à 30 et 90 jours',
    ],
    readTime: '7 min',
    href: '/guides/esthetique-tunis',
  },
]

/* ─── OUTILS PRATIQUES ─────────────────────────────────────────────────── */

export interface PatientTool {
  id: string
  iconKey:
    | 'clipboard'
    | 'glossary'
    | 'calculator'
    | 'compare'
    | 'logbook'
    | 'video'
  name: string
  shortDesc: string
  longDesc: string
  metric: string
  href: string
}

export const PATIENT_TOOLS: PatientTool[] = [
  {
    id: 'checklist',
    iconKey: 'clipboard',
    name: 'Checklist de départ',
    shortDesc: 'Visa, ordonnances, assurance, devises et bagage médical.',
    longDesc: 'Une liste vérifiée par nos coordinateurs, adaptée à votre destination et à votre intervention.',
    metric: '47 points contrôlés',
    href: '/ressources/checklist-depart',
  },
  {
    id: 'glossary',
    iconKey: 'glossary',
    name: 'Glossaire médical',
    shortDesc: 'Les termes techniques expliqués en français, anglais, arabe.',
    longDesc: 'Plus de 600 entrées vulgarisées, avec exemples concrets et schémas anatomiques.',
    metric: '600 termes traduits',
    href: '/ressources/glossaire',
  },
  {
    id: 'calculator',
    iconKey: 'calculator',
    name: 'Calculateur de devis',
    shortDesc: 'Estimation indicative en 90 secondes selon votre intervention.',
    longDesc: 'Sélectionnez la spécialité, le hub et la classe de séjour. Reçoit une fourchette à 10 % près.',
    metric: 'Réponse en 90 s',
    href: '/devis',
  },
  {
    id: 'compare',
    iconKey: 'compare',
    name: 'Comparateur de cliniques',
    shortDesc: 'Équipements, certifications, volumes opératoires, langues parlées.',
    longDesc: 'Comparez côte à côte trois établissements sur les mêmes critères mesurables.',
    metric: '120 cliniques indexées',
    href: '/ressources/comparateur',
  },
  {
    id: 'logbook',
    iconKey: 'logbook',
    name: 'Carnet post opératoire',
    shortDesc: 'Alertes médicaments, rendez vous, symptômes à surveiller.',
    longDesc: 'Votre journal de récupération, partagé avec votre coordinateur et votre médecin référent.',
    metric: 'Synchronisé clinique',
    href: '/ressources/carnet-post-op',
  },
  {
    id: 'testimonials',
    iconKey: 'video',
    name: 'Témoignages vidéo vérifiés',
    shortDesc: 'Patients réels, parcours documentés, identités vérifiées.',
    longDesc: 'Plus de 80 témoignages classés par spécialité, hub et tranche d\'âge.',
    metric: '83 témoignages',
    href: '/ressources/temoignages',
  },
]

/* ─── POURQUOI CES RESSOURCES (slides chiffrées) ───────────────────────── */

export interface ResourceArgument {
  id: string
  iconKey: 'brain' | 'shield' | 'activity' | 'users'
  metric: string
  metricLabel: string
  title: string
  body: string
  source: string
}

export const RESOURCE_ARGUMENTS: ResourceArgument[] = [
  {
    id: 'informed',
    iconKey: 'brain',
    metric: 'x3',
    metricLabel: 'questions pertinentes en consultation',
    title: 'Décisions vraiment éclairées',
    body: 'Un patient préparé pose trois fois plus de questions utiles à son médecin et comprend mieux les alternatives thérapeutiques qui lui sont proposées.',
    source: 'Health Affairs, 2022',
  },
  {
    id: 'anxiety',
    iconKey: 'shield',
    metric: '67 %',
    metricLabel: 'd\'anxiété pré opératoire en moins',
    title: 'Une anxiété nettement réduite',
    body: 'L\'éducation structurée du patient avant l\'intervention diminue significativement le stress et améliore la qualité du sommeil dans les jours qui précèdent le bloc.',
    source: 'Étude AHRQ, 2023',
  },
  {
    id: 'outcomes',
    iconKey: 'activity',
    metric: '+40 %',
    metricLabel: 'd\'adhésion thérapeutique post opératoire',
    title: 'Des résultats cliniques meilleurs',
    body: 'Les patients qui ont accès à des ressources éducatives suivent mieux leur traitement, leurs prescriptions et leurs séances de rééducation.',
    source: 'The Lancet, 2021',
  },
  {
    id: 'family',
    iconKey: 'users',
    metric: '92 %',
    metricLabel: 'des proches se sentent informés et rassurés',
    title: 'Une famille qui n\'est plus dans le flou',
    body: 'Nos guides destinés aux accompagnants couvrent le séjour à l\'hôtel, les visites en chambre, les démarches consulaires et le retour au pays.',
    source: 'Sondage interne MediBridge, 2024',
  },
]
