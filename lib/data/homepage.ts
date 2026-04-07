/**
 * SOURCE DE VÉRITÉ — Données partagées homepage
 */

// ─── 4 HUBS PRINCIPAUX ────────────────────────────────────────────────────────
export const NAV_DESTINATIONS = [
  { name: 'Maroc',     code: 'ma', type: 'Hub Prioritaire' },
  { name: 'Tunisie',   code: 'tn', type: 'Excellence Hospitalière' },
  { name: 'France',    code: 'fr', type: 'Centres de Référence' },
  { name: 'Turquie',   code: 'tr', type: 'Spécialité Esthétique' },
]

// ─── ÉTABLISSEMENTS PAR HUB (Hôpitaux & Cliniques séparés) ───────────────────
export const NAV_CLINICS = [
  // ── Maroc ──
  {
    name: 'Hôpital Universitaire Cheikh Zaid',
    code: 'ma',
    loc: 'Rabat',
    rating: 4.9,
    category: 'hôpital' as const,
    website: 'https://www.hcz.ma',
    spec: 'Pluridisciplinaire (Cardiologie, Neurochirurgie, Orthopédie, Oncologie)',
    specialties: ['Cardiologie', 'Neurologie', 'Orthopédie', 'Oncologie'],
  },
  {
    name: 'Clinique Agdal',
    code: 'ma',
    loc: 'Rabat',
    rating: 4.8,
    category: 'clinique' as const,
    website: 'https://www.clinique-agdal.com',
    spec: 'Chirurgie (Digestif, Laparoscopie, Tumeurs, Chirurgie Bariatrique)',
    specialties: ['Chirurgie Bariatrique', 'Chirurgie Générale'],
  },
  {
    name: 'Clinique Dar Salam',
    code: 'ma',
    loc: 'Casablanca',
    rating: 4.7,
    category: 'clinique' as const,
    website: 'https://www.cliniquedarsalam.ma',
    spec: 'Maternité & Procréation Médicalement Assistée (PMA : FIV, Insémination, Préservation)',
    specialties: ['PMA & Fertilité'],
  },
  {
    name: 'Clinique Internationale de Marrakech',
    code: 'ma',
    loc: 'Marrakech',
    rating: 4.8,
    category: 'clinique' as const,
    website: 'https://www.clinique-internationale-marrakech.com',
    spec: 'Chirurgie Esthétique (Rhinoplastie, Liposuccion, Abdominoplastie, Lifting)',
    specialties: ['Chirurgie Esthétique'],
  },
  // ── Tunisie ──
  {
    name: 'Clinique Pasteur',
    code: 'tn',
    loc: 'Tunis',
    rating: 4.9,
    category: 'clinique' as const,
    website: 'https://www.cliniquepasteurtunis.com',
    spec: 'Chirurgie Générale (Digestif, Obésité, Hernies, Thyroïde)',
    specialties: ['Chirurgie Bariatrique', 'Chirurgie Générale'],
  },
  {
    name: 'Clinique Hannibal',
    code: 'tn',
    loc: 'Tunis',
    rating: 4.8,
    category: 'clinique' as const,
    website: 'https://taoufikhospitalsgroup.com',
    spec: 'Cardiologie (Interventionnelle, Insuffisance Cardiaque, Arythmie, Écho)',
    specialties: ['Cardiologie', 'Chirurgie Esthétique'],
  },
  // ── Turquie ──
  {
    name: 'Acibadem Hospital',
    code: 'tr',
    loc: 'Istanbul',
    rating: 4.9,
    category: 'hôpital' as const,
    website: 'https://www.acibadem.com.tr',
    spec: 'Greffe Capillaire (DHI, FUE, Barbe, Sourcils) & Chirurgie Esthétique',
    specialties: ['Greffe Capillaire', 'Chirurgie Esthétique'],
  },
  {
    name: 'Memorial Şişli Hospital',
    code: 'tr',
    loc: 'Istanbul',
    rating: 4.8,
    category: 'hôpital' as const,
    website: 'https://www.memorial.com.tr',
    spec: 'Oncologie (Radiothérapie ciblée, Chimiothérapie, Immunothérapie, Biopsies)',
    specialties: ['Oncologie', 'Chirurgie Générale'],
  },
  // ── France ──
  {
    name: 'Hôpital Américain de Paris',
    code: 'fr',
    loc: 'Neuilly-sur-Seine',
    rating: 5.0,
    category: 'hôpital' as const,
    website: 'https://www.american-hospital.org',
    spec: 'Neurologie (Neurochirurgie, Spine, Traitement AVC, Épilepsie)',
    specialties: ['Neurologie', 'Cardiologie', 'Orthopédie'],
  },
  {
    name: 'Institut Curie',
    code: 'fr',
    loc: 'Paris',
    rating: 4.9,
    category: 'hôpital' as const,
    website: 'https://curie.fr',
    spec: 'Oncologie de Pointe (Cancérologie, Radiothérapie, Recherche clinique, Génomique)',
    specialties: ['Oncologie'],
  },
]

// ─── SPÉCIALITÉS (enrichies + sous-spécialités + hubs recommandés) ───────────
export const NAV_SPECIALTY_DATA = [
  {
    name: 'Oncologie',
    desc: 'Protocoles de pointe et radiothérapie ciblée. Spécialisation Française.',
    iconKey: 'dna',
    subSpecialties: ['Radiothérapie ciblée', 'Chimiothérapie', 'Immunothérapie', 'Oncologie pédiatrique', 'Tumeurs digestives', 'Cancérologie mammaire'],
    recommended: ['fr'],
  },
  {
    name: 'PMA & Fertilité',
    desc: 'FIV, Insémination et Préservation. Expertise et excellence Marocaine.',
    iconKey: 'baby',
    subSpecialties: ['FIV (Fécondation In Vitro)', 'Insémination artificielle', 'Préservation ovocytaire', 'Don d\'ovocytes', 'ICSI', 'Diagnostic pré-implantatoire'],
    recommended: ['ma'],
  },
  {
    name: 'Greffe Capillaire',
    desc: 'Techniques FUE et DHI dernière génération. Le hub majeur de la Turquie.',
    iconKey: 'scissors',
    subSpecialties: ['Technique FUE', 'Technique DHI', 'Greffe de barbe', 'Greffe de sourcils', 'PRP capillaire', 'Mésothérapie'],
    recommended: ['tr'],
  },
  {
    name: 'Chirurgie Esthétique',
    desc: 'Liposuccion, Rhinoplastie et silhouette. Expertise historique Tunisienne.',
    iconKey: 'syringe',
    subSpecialties: ['Rhinoplastie', 'Liposuccion', 'Abdominoplastie', 'Lifting facial', 'Augmentation mammaire', 'Blépharoplastie'],
    recommended: ['tn'],
  },
  {
    name: 'Ophtalmologie',
    desc: 'Lasik, Cataracte et Chirurgie de la cornée. Technologies de pointe mondiales.',
    iconKey: 'eye',
    subSpecialties: ['LASIK', 'Chirurgie de la cataracte', 'Traitement du glaucome', 'Greffe de cornée', 'Rétine & Vitré', 'Chirurgie réfractive'],
    recommended: ['ma', 'fr'],
  },
  {
    name: 'Chirurgie Bariatrique',
    desc: 'Sleeve, Bypass et encadrement post-opératoire pluridisciplinaire.',
    iconKey: 'heartpulse',
    subSpecialties: ['Sleeve gastrectomie', 'Bypass gastrique', 'Anneau gastrique', 'Ballon intragastrique', 'Suivi nutritionnel', 'Mini-bypass'],
    recommended: ['ma', 'tn'],
  },
  {
    name: 'Cardiologie',
    desc: 'Chirurgie cardiaque, cathétérisme interventionnel et réhabilitation cardiaque.',
    iconKey: 'heart',
    subSpecialties: ['Cathétérisme cardiaque', 'Pontage coronarien', 'Remplacement valvulaire', 'Ablation d\'arythmie', 'Insuffisance cardiaque', 'Échocardiographie'],
    recommended: ['fr', 'ma'],
  },
  {
    name: 'Neurologie',
    desc: 'Neurochirurgie, traitement AVC, épilepsie et pathologies du rachis.',
    iconKey: 'brain',
    subSpecialties: ['Neurochirurgie', 'Traitement AVC', 'Épilepsie', 'Chirurgie du rachis', 'Tumeurs cérébrales', 'Maladie de Parkinson'],
    recommended: ['fr'],
  },
  {
    name: 'Orthopédie',
    desc: 'Prothèses articulaires, arthroscopie, traumatologie sportive et rééducation.',
    iconKey: 'bone',
    subSpecialties: ['Prothèse de hanche', 'Prothèse de genou', 'Arthroscopie', 'Chirurgie du dos', 'Traumatologie sportive', 'Chirurgie de la main'],
    recommended: ['fr', 'ma'],
  },
  {
    name: 'Urologie',
    desc: 'Pathologies rénales et prostatiques. Chirurgie mini-invasive de pointe.',
    iconKey: 'droplets',
    subSpecialties: ['Chirurgie de la prostate', 'Calculs rénaux', 'Transplantation rénale', 'Chirurgie mini-invasive', 'Incontinence urinaire', 'Oncologie urologique'],
    recommended: ['fr', 'tn'],
  },
  {
    name: 'Dentaire & Implantologie',
    desc: 'Implants dentaires, couronnes et chirurgie maxillo-faciale de précision.',
    iconKey: 'scan',
    subSpecialties: ['Implants dentaires', 'Couronnes & bridges', 'Orthodontie adulte', 'Chirurgie maxillo-faciale', 'Facettes dentaires', 'All-on-4'],
    recommended: ['tr', 'ma'],
  },
  {
    name: 'Gynécologie',
    desc: 'Chirurgie gynécologique, endométriose et pathologies mammaires.',
    iconKey: 'ribbon',
    subSpecialties: ['Chirurgie gynécologique', 'Endométriose', 'Fibrome utérin', 'Chirurgie mammaire', 'Hystérectomie mini-invasive', 'Colposcopie'],
    recommended: ['ma', 'fr'],
  },
]

// ─── TYPE EXPORTS ────────────────────────────────────────────────────────────
export type ClinicEntry    = typeof NAV_CLINICS[number]
export type SpecialtyEntry = typeof NAV_SPECIALTY_DATA[number]

// ─── SERVICES INCLUS (enrichis — basés sur la section Packages) ──────────────
export const NAV_SERVICES = [
  { name: 'Constitution du Dossier', desc: 'Analyse médicale, traduction certifiée et comité d\'experts',          iconKey: 'filecheck'  },
  { name: 'Visa Médical',            desc: 'Assistance complète pour l\'obtention du visa médical',                iconKey: 'stamp'      },
  { name: 'Billetterie Aérienne',    desc: 'Réservation et organisation de vos vols internationaux',              iconKey: 'plane'      },
  { name: 'Transferts VIP',          desc: 'Transport terrestre privé aéroport, clinique et hôtel',               iconKey: 'car'        },
  { name: 'Hébergement',             desc: 'Hôtels partenaires premium à proximité des établissements',           iconKey: 'hotel'      },
  { name: 'Interprétariat',          desc: 'Traducteur natif dédié pendant l\'intégralité du séjour',             iconKey: 'languages'  },
  { name: 'Assurance Voyage',        desc: 'Couverture médicale complète et garantie rapatriement',               iconKey: 'shield'     },
  { name: 'Suivi Post-Opératoire',   desc: 'Téléconsultation et continuité des soins après votre retour',         iconKey: 'stethoscope'},
]

// ─── SERVICES PREMIUM (en option) ────────────────────────────────────────────
export const NAV_SERVICES_PREMIUM = [
  { name: 'Accompagnateur Médical Dédié',   desc: 'Un professionnel de santé vous accompagne tout au long du séjour, de l\'arrivée au retour' },
  { name: 'Chambre VIP en Clinique',         desc: 'Suite privée avec espace salon, lit accompagnant et services hôteliers dans l\'établissement' },
  { name: 'Second Avis International',       desc: 'Consultation de validation par un expert d\'un second pays avant toute intervention' },
  { name: 'Conciergerie 24/7',              desc: 'Ligne directe dédiée pour toute demande personnelle, médicale ou logistique, jour et nuit' },
  { name: 'Programme de Récupération',       desc: 'Séjour de convalescence en résidence médicalisée avec kinésithérapie et soins post-op' },
  { name: 'Évacuation Sanitaire Express',    desc: 'Rapatriement par avion médicalisé sous 24h en cas de complication majeure' },
  { name: 'Coordination Multi-Spécialités',  desc: 'Parcours combiné quand votre traitement nécessite plusieurs spécialistes dans différents pays' },
  { name: 'Accompagnement Famille & Proche', desc: 'Organisation complète du séjour pour votre accompagnant : vol, hôtel, visa et activités' },
]
