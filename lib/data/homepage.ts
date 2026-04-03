/**
 * SOURCE DE VÉRITÉ — Données partagées homepage
 */

// ─── 4 HUBS PRINCIPAUX ────────────────────────────────────────────────────────
export const NAV_DESTINATIONS = [
  { name: 'Maroc',     code: 'ma', type: 'Hub Prioritaire' },
  { name: 'Tunisie',   code: 'tn', type: 'Excellence Hospitalière' },
  { name: 'Turquie',   code: 'tr', type: 'Spécialité Esthétique' },
  { name: 'France',    code: 'fr', type: 'Centres de Référence' },
]

// ─── CLINIQUES PAR HUB ────────────────────────────────────────────────────────
export const NAV_CLINICS = [
  // Maroc
  { name: 'Hôp. International Cheikh Zaid', code: 'ma', loc: 'Rabat', rating: 4.9, spec: 'Pluridisciplinaire (Cardiologie, Neurochirurgie, Orthopédie, Oncologie)' },
  { name: 'Clinique Agdal', code: 'ma', loc: 'Rabat', rating: 4.8, spec: 'Chirurgie (Digestif, Laparoscopie, Tumeurs, Chirurgie Bariatrique)' },
  { name: 'Clinique Dar Salam', code: 'ma', loc: 'Casablanca', rating: 4.7, spec: 'Maternité & Procréation Médicalement Assistée (PMA : FIV, Insémination, Préservation)' },
  { name: 'Clinique Vinci Maroc', code: 'ma', loc: 'Marrakech', rating: 4.8, spec: 'Chirurgie Esthétique (Rhinoplastie, Liposuccion, Abdominoplastie, Lifting)' },
  // Tunisie
  { name: 'Clinique Pasteur', code: 'tn', loc: 'Tunis', rating: 4.9, spec: 'Chirurgie Générale (Digestif, Obésité, Hernies, Thyroïde)' },
  { name: 'Clinique Hannibal', code: 'tn', loc: 'Tunis', rating: 4.8, spec: 'Cardiologie (Interventionnelle, Insuffisance Cardiaque, Arythmie, Écho)' },
  // Turquie
  { name: 'Acibadem Hospital', code: 'tr', loc: 'Istanbul', rating: 4.9, spec: 'Greffe Capillaire (DHI, FUE, Barbe, Sourcils) & Chirurgie Esthétique' },
  { name: 'Memorial Sisli', code: 'tr', loc: 'Istanbul', rating: 4.8, spec: 'Oncologie (Radiothérapie ciblée, Chimiothérapie, Immunothérapie, Biopsies)' },
  // France
  { name: 'Hôpital Américain de Paris', code: 'fr', loc: 'Paris', rating: 5.0, spec: 'Neurologie (Neurochirurgie, Spine, Traitement AVC, Épilepsie)' },
  { name: 'Institut Curie', code: 'fr', loc: 'Paris', rating: 4.9, spec: 'Oncologie de Pointe (Cancérologie, Radiothérapie, Recherche clinique, Génomique)' },
]

// ─── SPÉCIALITÉS (Noms & Hubs mis en avant) ──────────────────────────────────
export const NAV_SPECIALTY_DATA = [
  { name: 'Oncologie', desc: 'Protocoles de pointe et radiothérapie ciblée. Spécialisation Française.' },
  { name: 'PMA & Fertilité', desc: 'FIV, Insémination et Préservation. Expertise et excellence Marocaine.' },
  { name: 'Greffe Capillaire', desc: 'Techniques FUE et DHI dernière génération. Le hub majeur de la Turquie.' },
  { name: 'Chirurgie Esthétique', desc: 'Liposuccion, Rhinoplastie et silhouette. Expertise historique Tunisienne.' },
  { name: 'Ophtalmologie', desc: 'Lasik, Cataracte et Chirurgie de la cornée. Technologies de pointe mondiales.' },
  { name: 'Chirurgie Bariatrique', desc: 'Sleeve, Bypass et encadrement post-opératoire pluridisciplinaire.' },
]

// ─── SERVICES INCLUS ─────────────────────────────────────────────────────────
export const NAV_SERVICES = [
  'Assistance Visa',
  'Transport VIP',
  'Interprétariat',
  'Assurance Voyage',
]
