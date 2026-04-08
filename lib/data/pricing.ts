/**
 * SOURCE DE VÉRITÉ — Pricing & Financement MediBridge
 * Utilisé par : Pricing.tsx (page) + NavPricing.tsx (navbar desktop) + NavbarMobile.tsx
 */

import type { LucideIcon } from 'lucide-react'

/* ─── 3 FORFAITS PRINCIPAUX ────────────────────────────────────────────── */

export interface PricingPlan {
  id: 'essentiel' | 'serenite' | 'excellence'
  name: string
  tagline: string
  price: string
  priceSub: string | null
  badge: string | null
  highlighted: boolean
  cta: string
  shortDesc: string          // 1-line for navbar
  keyFeatures: string[]      // top 4 for navbar quick view
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    tagline: 'Pour commencer votre démarche',
    price: 'Gratuit',
    priceSub: null,
    badge: null,
    highlighted: false,
    cta: 'Choisir',
    shortDesc: 'Accès plateforme et premier devis médical, sans engagement.',
    keyFeatures: [
      'Accès plateforme MediBridge',
      'Mise en relation avec une clinique',
      'Devis médical personnalisé',
      'Aucun engagement',
    ],
  },
  {
    id: 'serenite',
    name: 'Sérénité',
    tagline: 'Le parcours complet, clé en main',
    price: 'Dès 490 €',
    priceSub: 'par séjour médical',
    badge: 'La plus demandée',
    highlighted: true,
    cta: 'Choisir Sérénité',
    shortDesc: 'Coordination complète : voyage, interprète, transferts, suivi post-op.',
    keyFeatures: [
      'Coordinateur dédié WhatsApp + Email',
      'Voyage, transferts et hébergement',
      'Interprète médical sur place',
      'Suivi post-opératoire 3 mois',
    ],
  },
  {
    id: 'excellence',
    name: 'Excellence',
    tagline: 'La prise en charge absolue',
    price: 'Sur mesure',
    priceSub: 'devis personnalisé',
    badge: null,
    highlighted: false,
    cta: 'Contact VIP',
    shortDesc: 'Conciergerie 24/7, accompagnateur personnel, hébergement 5★, suivi 12 mois.',
    keyFeatures: [
      'Concierge 24/7 pendant le séjour',
      'Accompagnateur personnel en clinique',
      'Hébergement 5★ sélectionné',
      'Suivi post-opératoire 12 mois',
    ],
  },
]

/* ─── COMPARATIF FEATURES (pour Pricing.tsx page) ──────────────────────── */

export interface PricingFeature {
  label: string
  essentiel: boolean
  serenite: boolean
  excellence: boolean
}

export const PRICING_FEATURES: PricingFeature[] = [
  { label: 'Accès à la plateforme MediBridge', essentiel: true,  serenite: true, excellence: true  },
  { label: 'Mise en relation avec une clinique', essentiel: true,  serenite: true, excellence: true  },
  { label: 'Devis médical personnalisé',          essentiel: true,  serenite: true, excellence: true  },
  { label: 'Coordinateur dédié (WhatsApp + Email)', essentiel: false, serenite: true, excellence: true },
  { label: 'Organisation du voyage (vols + hôtel)', essentiel: false, serenite: true, excellence: true },
  { label: 'Transferts aéroport & clinique',         essentiel: false, serenite: true, excellence: true },
  { label: 'Interprète médical sur place',           essentiel: false, serenite: true, excellence: true },
  { label: 'Assurance annulation & rapatriement',    essentiel: false, serenite: true, excellence: true },
  { label: 'Suivi post-opératoire (3 mois)',         essentiel: false, serenite: true, excellence: true },
  { label: 'Concierge 24/7 pendant le séjour',       essentiel: false, serenite: false, excellence: true },
  { label: 'Accompagnateur personnel en clinique',   essentiel: false, serenite: false, excellence: true },
  { label: 'Accès VIP aux meilleurs chirurgiens',    essentiel: false, serenite: false, excellence: true },
  { label: 'Hébergement 5★ sélectionné',             essentiel: false, serenite: false, excellence: true },
  { label: 'Suivi post-opératoire (12 mois)',        essentiel: false, serenite: false, excellence: true },
]

/* ─── ESTIMATIONS PAR SPÉCIALITÉ (transparence prix vs France) ─────────── */

export interface PriceEstimation {
  specialty: string
  iconKey: string
  rangeLow: number
  rangeHigh: number
  franceRangeLow: number
  franceRangeHigh: number
  savingsLabel: string  // ex: "−60% à −70%"
  recommendedHub: string
}

export const PRICE_ESTIMATIONS: PriceEstimation[] = [
  {
    specialty: 'Greffe Capillaire',
    iconKey: 'scissors',
    rangeLow: 1800, rangeHigh: 3500,
    franceRangeLow: 6000, franceRangeHigh: 12000,
    savingsLabel: '−65% à −70%',
    recommendedHub: 'Turquie',
  },
  {
    specialty: 'Chirurgie Esthétique',
    iconKey: 'syringe',
    rangeLow: 2500, rangeHigh: 6000,
    franceRangeLow: 7000, franceRangeHigh: 18000,
    savingsLabel: '−55% à −70%',
    recommendedHub: 'Tunisie',
  },
  {
    specialty: 'Chirurgie Bariatrique',
    iconKey: 'heartpulse',
    rangeLow: 3500, rangeHigh: 7000,
    franceRangeLow: 9000, franceRangeHigh: 18000,
    savingsLabel: '−55% à −65%',
    recommendedHub: 'Maroc',
  },
  {
    specialty: 'PMA & Fertilité',
    iconKey: 'baby',
    rangeLow: 2500, rangeHigh: 5500,
    franceRangeLow: 5000, franceRangeHigh: 12000,
    savingsLabel: '−45% à −55%',
    recommendedHub: 'Maroc',
  },
  {
    specialty: 'Cardiologie',
    iconKey: 'heart',
    rangeLow: 8000, rangeHigh: 18000,
    franceRangeLow: 25000, franceRangeHigh: 60000,
    savingsLabel: '−65% à −70%',
    recommendedHub: 'France · Maroc',
  },
  {
    specialty: 'Oncologie',
    iconKey: 'dna',
    rangeLow: 5000, rangeHigh: 25000,
    franceRangeLow: 15000, franceRangeHigh: 80000,
    savingsLabel: '−65% à −70%',
    recommendedHub: 'France',
  },
  {
    specialty: 'Orthopédie',
    iconKey: 'bone',
    rangeLow: 4500, rangeHigh: 12000,
    franceRangeLow: 12000, franceRangeHigh: 35000,
    savingsLabel: '−60% à −65%',
    recommendedHub: 'France · Maroc',
  },
  {
    specialty: 'Dentaire & Implantologie',
    iconKey: 'scan',
    rangeLow: 1200, rangeHigh: 4500,
    franceRangeLow: 4000, franceRangeHigh: 15000,
    savingsLabel: '−65% à −75%',
    recommendedHub: 'Turquie · Maroc',
  },
]

/* ─── SOLUTIONS DE FINANCEMENT ─────────────────────────────────────────── */

export interface FinancingOption {
  name: string
  desc: string
  details: string
  badgeKey: 'mensuel' | 'partenaire' | 'employer' | 'insurance'
}

export const FINANCING_OPTIONS: FinancingOption[] = [
  {
    name: 'Paiement échelonné',
    desc: 'Réglez votre séjour en 3, 6 ou 12 mensualités sans frais supplémentaires.',
    details: 'Étalez le coût de votre traitement sur plusieurs mois. Disponible dès 1 500 €.',
    badgeKey: 'mensuel',
  },
  {
    name: 'Crédit santé partenaire',
    desc: 'Solutions de crédit dédiées via nos partenaires bancaires panafricains.',
    details: 'Accord rapide sous 72 h avec Ecobank, Coris Bank, BGFI Bank. Taux préférentiels patients MediBridge.',
    badgeKey: 'partenaire',
  },
  {
    name: 'Prise en charge employeur',
    desc: 'Facturation B2B centralisée pour les entreprises et leurs collaborateurs.',
    details: 'Convention DRH avec facturation directe. Parfait pour cadres et expatriés.',
    badgeKey: 'employer',
  },
  {
    name: 'Tiers-payant assurance',
    desc: 'Intégration directe avec votre assurance santé internationale.',
    details: 'Partenariats actifs avec AXA, Allianz, Cigna et Bupa. Aucune avance de frais.',
    badgeKey: 'insurance',
  },
]

/* ─── GARANTIES MEDIBRIDGE ─────────────────────────────────────────────── */

export interface Guarantee {
  title: string
  desc: string
}

export const GUARANTEES: Guarantee[] = [
  {
    title: 'Aucun frais caché',
    desc: 'Devis détaillé et engageant avant tout paiement. Prix garanti.',
  },
  {
    title: 'Annulation gratuite',
    desc: 'Annulez sans frais jusqu\'à 72 heures avant le départ.',
  },
  {
    title: 'Remboursement si refus',
    desc: 'Si votre dossier n\'est pas validé médicalement, vous êtes remboursé intégralement.',
  },
  {
    title: 'Devis sous 48 heures',
    desc: 'Réponse médicale et financière en moins de 48 h après envoi du dossier.',
  },
]
