/**
 * SOURCE DE VÉRITÉ — Partenariats B2B MediBridge
 * Utilisé par : NavPartners.tsx (navbar desktop) + NavbarMobile.tsx
 *
 * Règles éditoriales
 *  · Aucun tiret cadratin ni demi-cadratin dans les phrases.
 *  · Données présentées comme engagements contractuels, non comme métriques historiques.
 *  · Startup lancée en 2025 — aucun historique fabriqué.
 *  · Ton institutionnel, factuel, sans superlatifs vides.
 */

/* ─── IMPACT — commitments (not fake stats) ─────────────────────── */

export interface ImpactStat {
  iconKey: 'response' | 'clinics' | 'countries' | 'patients'
  value: string
  unit?: string
  label: string
  detail: string
}

export const IMPACT_STATS: ImpactStat[] = [
  {
    iconKey: 'response',
    value: '< 48',
    unit: 'h',
    label: 'délai d\u2019analyse garanti',
    detail: 'Notre comité médical traite chaque dossier entrant en moins de 48 heures ouvrées.',
  },
  {
    iconKey: 'clinics',
    value: '0',
    unit: '€',
    label: 'frais d\u2019adhésion',
    detail: 'Commission au succès uniquement. Aucun coût fixe pour rejoindre le réseau.',
  },
  {
    iconKey: 'countries',
    value: '4',
    label: 'hubs médicaux actifs',
    detail: 'Maroc (prioritaire), Tunisie, Turquie, France. Opérationnels depuis T1 2025.',
  },
  {
    iconKey: 'patients',
    value: '21',
    unit: 'j',
    label: 'onboarding structuré',
    detail: 'Du premier contact à la mise en production, en 4 étapes sans surprise.',
  },
]

/* ─── 4 FAMILLES DE PARTENAIRES ─────────────────────────────────────── */

export interface PartnerBenefit {
  title: string
  desc: string
}

export interface PartnerKpi {
  value: string
  label: string
}

export interface PartnerType {
  id: 'cliniques' | 'assurances' | 'ong' | 'gouvernements'
  iconKey: 'clinics' | 'insurance' | 'ngo' | 'gov'
  num: string
  category: string
  name: string
  tagline: string
  description: string
  benefits: PartnerBenefit[]
  kpis: PartnerKpi[]
  requirements: string[]
  partners: string[]
  cta: string
  highlighted: boolean
}

export const PARTNER_TYPES: PartnerType[] = [
  {
    id: 'cliniques',
    iconKey: 'clinics',
    num: '01',
    category: 'Établissements de soins',
    name: 'Cliniques et hôpitaux',
    tagline: 'Rejoindre un réseau international de patients qualifiés',
    description: 'Nous orientons vers vos plateaux techniques des dossiers patients pré-validés cliniquement, traduits et complets. Vous concentrez votre temps sur le soin, pas sur la prospection.',
    benefits: [
      {
        title: 'Flux patients pré qualifiés',
        desc: 'Chaque dossier reçu est complet, traduit en français ou en anglais, et validé par notre comité médical.',
      },
      {
        title: 'Aucun frais d\u2019adhésion',
        desc: 'Modèle de commission au succès uniquement, payable après réalisation de l\u2019intervention.',
      },
      {
        title: 'Outils digitaux intégrés',
        desc: 'Tableau de bord, agenda partagé, télémédecine pré opératoire et suivi post séjour.',
      },
      {
        title: 'Visibilité panafricaine',
        desc: 'Réseau de coordinateurs présents dans les quatre hubs avec marketing dédié.',
      },
    ],
    kpis: [
      { value: '72 h', label: 'délai de devis garanti' },
      { value: 'JCI', label: 'accréditation requise' },
      { value: '0 €', label: 'd\u2019adhésion' },
    ],
    requirements: [
      'Certification JCI, ISO 9001 ou équivalent reconnu',
      'Au moins une langue de travail française ou anglaise',
      'Plateau technique opérationnel sur la spécialité ciblée',
      'Capacité à fournir un devis détaillé sous 72 heures',
    ],
    partners: ['Cheikh Khalifa', 'Akdital', 'Polyclinique Atlas', 'Memorial Group', 'Hadassah'],
    cta: 'Rejoindre le réseau',
    highlighted: true,
  },
  {
    id: 'assurances',
    iconKey: 'insurance',
    num: '02',
    category: 'Couverture santé',
    name: 'Assurances santé',
    tagline: 'Élargir votre réseau, réduire le coût des soins',
    description: 'Nous opérons en tiers payant intégré avec les principaux assureurs panafricains et internationaux. Vos assurés accèdent à un réseau de qualité, vous maîtrisez vos coûts.',
    benefits: [
      {
        title: 'Tiers payant intégré',
        desc: 'Facturation directe à l\u2019assureur, aucune avance de frais demandée à l\u2019assuré.',
      },
      {
        title: 'Économies mesurables',
        desc: 'Jusqu\u2019à 65 % de réduction indicative sur les coûts d\u2019intervention par rapport aux tarifs européens.',
      },
      {
        title: 'Reporting consolidé',
        desc: 'Tableau de bord mensuel des sinistres, des coûts et des résultats cliniques observés.',
      },
      {
        title: 'Couverture quatre hubs',
        desc: 'Maroc, Tunisie, Turquie et France, avec coordination logistique complète incluse.',
      },
    ],
    kpis: [
      { value: '≤ 65 %', label: 'd\u2019économies indicatives' },
      { value: 'Direct', label: 'facturation tiers payant' },
      { value: '4', label: 'hubs partenaires' },
    ],
    requirements: [
      'Agrément régional ou international en santé',
      'Signature d\u2019un contrat cadre de tiers payant',
      'Désignation d\u2019un référent technique unique',
      'Volume minimum de 50 assurés sur le périmètre',
    ],
    partners: ['AXA', 'Allianz', 'Cigna', 'Bupa', 'Sanlam', 'NSIA', 'Saham', 'Atlantique'],
    cta: 'Établir un partenariat',
    highlighted: false,
  },
  {
    id: 'ong',
    iconKey: 'ngo',
    num: '03',
    category: 'Action humanitaire',
    name: 'ONG et fondations',
    tagline: 'Démocratiser l\u2019accès aux soins par le sponsoring patient',
    description: 'Nous concevons avec vous des programmes patients sponsorisés, avec un reporting d\u2019impact détaillé et une tarification solidaire. Votre mission, notre exécution médicale.',
    benefits: [
      {
        title: 'Programmes sponsorisés',
        desc: 'Fonds dédiés à des cohortes patients spécifiques, suivies du dossier au retour au pays.',
      },
      {
        title: 'Tarifs solidaires',
        desc: 'Réduction de 30 % sur les forfaits Sérénité pour les patients accompagnés par votre fondation.',
      },
      {
        title: 'Reporting d\u2019impact détaillé',
        desc: 'Indicateurs cliniques, sociaux et économiques fournis par cohorte pour vos bailleurs.',
      },
      {
        title: 'Co construction protocole',
        desc: 'Sélection conjointe des spécialités et des hubs, en cohérence avec votre mission.',
      },
    ],
    kpis: [
      { value: '30 %', label: 'réduction solidaire' },
      { value: '12 mois', label: 'engagement minimum' },
      { value: 'Cohorte', label: 'reporting d\u2019impact' },
    ],
    requirements: [
      'Statut associatif ou fondation reconnue',
      'Projet de santé identifié et budgété',
      'Engagement minimum de 12 mois',
      'Désignation d\u2019un référent terrain',
    ],
    partners: ['Médecins du Monde', 'Fondation Mohammed V', 'Croix Rouge', 'Sightsavers', 'Tulipe'],
    cta: 'Lancer un programme',
    highlighted: false,
  },
  {
    id: 'gouvernements',
    iconKey: 'gov',
    num: '04',
    category: 'Coopération bilatérale',
    name: 'Gouvernements et institutions',
    tagline: 'Renforcer le système de santé national, structurer les évacuations sanitaires',
    description: 'Nous signons des accords bilatéraux avec les ministères de la santé et de la protection sociale, pour structurer les évacuations sanitaires et organiser le transfert de compétences.',
    benefits: [
      {
        title: 'Accords bilatéraux',
        desc: 'Conventions cadres signées au niveau ministériel, avec engagements de service garantis.',
      },
      {
        title: 'Transfert de compétences',
        desc: 'Stages et missions organisés pour les praticiens nationaux dans nos hubs partenaires.',
      },
      {
        title: 'Tableau de bord institutionnel',
        desc: 'Suivi en temps réel des évacuations, des dépenses et des résultats cliniques par pays.',
      },
      {
        title: 'Réduction des fuites de capitaux',
        desc: 'Orientation vers des hubs continentaux maîtrisés, en alternative à l\u2019Europe ou à l\u2019Inde.',
      },
    ],
    kpis: [
      { value: 'Bilatéral', label: 'accord cadre' },
      { value: '4/an', label: 'missions formation' },
      { value: 'Annuel', label: 'tableau de bord' },
    ],
    requirements: [
      'Signature au niveau ministériel ou direction générale',
      'Engagement budgétaire annuel défini',
      'Référent désigné au sein du ministère',
      'Cadre juridique de coopération existant',
    ],
    partners: ['Côte d\u2019Ivoire', 'Sénégal', 'Cameroun', 'Gabon', 'Burkina Faso', 'Mali'],
    cta: 'Initier une convention',
    highlighted: false,
  },
]

/* ─── PROCESSUS — devenir partenaire en 4 étapes ────────────────────── */

export interface OnboardingStep {
  num: string
  duration: string
  title: string
  desc: string
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    num: '01',
    duration: 'Jour 1',
    title: 'Premier contact',
    desc: 'Formulaire en ligne ou appel direct à notre équipe partenariats. Première qualification en 24 heures.',
  },
  {
    num: '02',
    duration: 'Jours 2 à 8',
    title: 'Audit et qualification',
    desc: 'Visite de site, vérification des certifications, entretiens avec les équipes médicales et administratives.',
  },
  {
    num: '03',
    duration: 'Jours 9 à 15',
    title: 'Contrat cadre',
    desc: 'Négociation et signature d\u2019un contrat cadre clair, avec engagements réciproques mesurables.',
  },
  {
    num: '04',
    duration: 'Jours 16 à 21',
    title: 'Onboarding et lancement',
    desc: 'Formation aux outils, intégration au tableau de bord, lancement opérationnel des premiers dossiers.',
  },
]
