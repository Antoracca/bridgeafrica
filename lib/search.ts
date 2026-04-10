/**
 * ══════════════════════════════════════════════════════════════════════
 *  MEDIBRIDGE — Moteur de recherche intelligent
 *  Algorithme multi-champ avec expansion d'alias, scoring pondéré
 *  et fallback garanti (jamais 0 résultats)
 * ══════════════════════════════════════════════════════════════════════
 */

import {
  NAV_CLINICS,
  NAV_SPECIALTY_DATA,
  NAV_SERVICES,
  NAV_SERVICES_PREMIUM,
  NAV_DESTINATIONS,
} from '@/lib/data/homepage'

/* ──────────────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────────────── */

export type ResultKind = 'clinic' | 'specialty' | 'service' | 'premium' | 'destination'

export interface SearchResult {
  kind: ResultKind
  id: string          // slug unique
  score: number       // 0–100+
  title: string
  subtitle: string
  meta?: string       // extra context (pays, spécialité, etc.)
  code?: string       // country code (clinics / destinations)
  iconKey?: string    // pour mapping icônes
  raw: unknown        // pointeur vers l'objet source
}

/* ──────────────────────────────────────────────────────────────────────
   NORMALISATION
   ────────────────────────────────────────────────────────────────────── */

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/['']/g, "'")
    .trim()
}

/* ──────────────────────────────────────────────────────────────────────
   DICTIONNAIRE D'ALIAS & SYNONYMES
   Clé : terme normalisé → liste de termes équivalents (normalisés)
   ────────────────────────────────────────────────────────────────────── */

const ALIASES: Record<string, string[]> = {
  // ── Chirurgie Esthétique / BBL ──
  'bbl': ['brazilian butt lift', 'liposculpture', 'chirurgie esthetique', 'fesses', 'augmentation fessiers', 'silhouette'],
  'brazilian butt lift': ['bbl', 'chirurgie esthetique', 'liposculpture'],
  'lipo': ['liposuccion', 'chirurgie esthetique', 'liposculpture'],
  'liposuccion': ['lipo', 'chirurgie esthetique', 'amincissement'],
  'rhinoplastie': ['nez', 'chirurgie du nez', 'chirurgie esthetique'],
  'nez': ['rhinoplastie', 'chirurgie esthetique'],
  'lifting': ['chirurgie esthetique', 'lifting facial', 'rajeunissement'],
  'sein': ['augmentation mammaire', 'chirurgie esthetique', 'prothese'],
  'abdominoplastie': ['ventre', 'chirurgie esthetique', 'tummy tuck'],
  'blephaloplastie': ['paupieres', 'chirurgie esthetique'],
  'botox': ['injection', 'chirurgie esthetique', 'acide hyaluronique'],
  'aesthetic': ['esthetique', 'chirurgie esthetique'],
  'plastique': ['chirurgie esthetique', 'chirurgie plastique'],

  // ── Oncologie / Cancer ──
  'cancer': ['oncologie', 'cancerologie', 'tumeur', 'chimiotherapie', 'radiotherapie', 'immunotherapie'],
  'oncologie': ['cancer', 'cancerologie', 'tumeur', 'radiotherapie'],
  'tumeur': ['oncologie', 'cancer', 'cancerologie'],
  'chimiotherapie': ['oncologie', 'cancer', 'traitement cancer'],
  'radiotherapie': ['oncologie', 'cancer', 'radiotherapie ciblee'],
  'immunotherapie': ['oncologie', 'cancer'],
  'sein cancer': ['oncologie', 'cancerologie mammaire'],
  'poumon': ['oncologie', 'cancer'],
  'prostate cancer': ['oncologie', 'urologie'],
  'leucemie': ['oncologie', 'cancer'],
  'lymphome': ['oncologie', 'cancer'],

  // ── Cardiologie ──
  'coeur': ['cardiologie', 'cardiaque', 'pontage', 'insuffisance cardiaque'],
  'cardiaque': ['cardiologie', 'coeur'],
  'pontage': ['cardiologie', 'pontage coronarien'],
  'valve': ['cardiologie', 'remplacement valvulaire'],
  'arythmie': ['cardiologie', 'ablation arythmie'],
  'infarctus': ['cardiologie', 'urgence cardiaque'],

  // ── Neurologie ──
  'cerveau': ['neurologie', 'neurochirurgie', 'tumeur cerebrale'],
  'avc': ['neurologie', 'traitement avc', 'accident vasculaire'],
  'parkinson': ['neurologie', 'maladie de parkinson'],
  'epilepsie': ['neurologie'],
  'neuro': ['neurologie', 'neurochirurgie'],
  'colonne': ['neurologie', 'orthophedie', 'chirurgie du rachis'],
  'rachis': ['neurologie', 'chirurgie du rachis', 'dos'],
  'dos': ['orthophedie', 'chirurgie du dos', 'neurologie'],

  // ── Greffe Capillaire ──
  'greffe capillaire': ['cheveux', 'implant capillaire', 'fue', 'dhi', 'chute de cheveux'],
  'transplant capillaire': ['greffe capillaire', 'fue', 'dhi'],
  'cheveux': ['greffe capillaire', 'fue', 'dhi'],
  'calvitie': ['greffe capillaire', 'fue', 'dhi'],
  'fue': ['greffe capillaire', 'technique fue', 'cheveux'],
  'dhi': ['greffe capillaire', 'technique dhi', 'cheveux'],
  'prp': ['greffe capillaire', 'prp capillaire'],
  'barbe': ['greffe capillaire', 'greffe de barbe'],
  'sourcil': ['greffe capillaire', 'greffe de sourcils'],

  // ── PMA / Fertilité ──
  'pma': ['fertilite', 'fiv', 'procreation medicalement assistee', 'bebe', 'grossesse'],
  'fiv': ['pma', 'fertilite', 'procreation medicalement assistee'],
  'fertilite': ['pma', 'fiv', 'insemination'],
  'insemination': ['pma', 'fertilite', 'insemination artificielle'],
  'grossesse': ['pma', 'fertilite', 'maternite'],
  'bebe': ['pma', 'fertilite'],
  'ovocyte': ['pma', 'fertilite', 'preservation ovocytaire'],
  'icsi': ['pma', 'fertilite', 'fiv'],

  // ── Ophtalmologie ──
  'yeux': ['ophtalmologie', 'chirurgie oculaire', 'laser'],
  'vue': ['ophtalmologie', 'lasik', 'chirurgie refractive'],
  'laser yeux': ['ophtalmologie', 'lasik', 'chirurgie refractive'],
  'lasik': ['ophtalmologie', 'chirurgie de la vue'],
  'cataracte': ['ophtalmologie', 'chirurgie de la cataracte'],
  'glaucome': ['ophtalmologie'],
  'cornee': ['ophtalmologie', 'greffe de cornee'],

  // ── Chirurgie Bariatrique ──
  'obesite': ['chirurgie bariatrique', 'sleeve', 'bypass', 'poids'],
  'sleeve': ['chirurgie bariatrique', 'sleeve gastrectomie'],
  'bypass': ['chirurgie bariatrique', 'bypass gastrique'],
  'anneau gastrique': ['chirurgie bariatrique'],
  'poids': ['chirurgie bariatrique', 'obesite'],
  'amaigrissement': ['chirurgie bariatrique', 'obesite'],

  // ── Orthopédie ──
  'genou': ['orthopedie', 'prothese de genou', 'arthroscopie'],
  'hanche': ['orthopedie', 'prothese de hanche'],
  'prothese': ['orthopedie', 'prothese de hanche', 'prothese de genou'],
  'arthroscopie': ['orthopedie'],
  'sport': ['orthopedie', 'traumatologie sportive'],
  'fracture': ['orthopedie', 'traumatologie'],
  'main': ['orthopedie', 'chirurgie de la main'],

  // ── Urologie ──
  'rein': ['urologie', 'calculs renaux', 'transplantation renale'],
  'prostate': ['urologie', 'chirurgie de la prostate'],
  'incontinence': ['urologie', 'incontinence urinaire'],
  'calcul renal': ['urologie', 'lithiase'],
  'transplantation': ['urologie', 'transplantation renale'],

  // ── Dentaire ──
  'dent': ['dentaire', 'implantologie', 'implant dentaire', 'couronne'],
  'implant dentaire': ['dentaire', 'implantologie'],
  'couronne dentaire': ['dentaire', 'implantologie', 'couronne'],
  'orthodontie': ['dentaire', 'implantologie'],
  'facette': ['dentaire', 'facettes dentaires'],
  'sourire': ['dentaire', 'implantologie', 'facettes dentaires'],
  'all on 4': ['dentaire', 'implantologie'],
  'all-on-4': ['dentaire', 'implantologie'],

  // ── Gynécologie ──
  'endometriose': ['gynecologie'],
  'fibrome': ['gynecologie', 'fibrome uterin'],
  'hysterectomie': ['gynecologie'],
  'gyneco': ['gynecologie'],
  'femme': ['gynecologie', 'pma'],

  // ── PAYS ──
  'maroc': ['ma', 'casablanca', 'rabat', 'marrakech', 'fes', 'tanger', 'maghreb'],
  'ma': ['maroc', 'casablanca', 'rabat', 'marrakech'],
  'marrakech': ['maroc', 'ma'],
  'casablanca': ['maroc', 'ma', 'casa', 'clinique dar salam'],
  'casa': ['casablanca', 'maroc', 'ma'],
  'casa blanca': ['casablanca', 'maroc', 'ma'],
  'rabat': ['maroc', 'ma'],
  'fes': ['maroc', 'ma'],
  'tanger': ['maroc', 'ma'],

  'tunisie': ['tn', 'tunis', 'sfax', 'sousse'],
  'tn': ['tunisie', 'tunis'],
  'tunis': ['tunisie', 'tn'],
  'sfax': ['tunisie', 'tn'],
  'sousse': ['tunisie', 'tn'],

  'france': ['fr', 'paris', 'lyon', 'marseille'],
  'fr': ['france', 'paris'],
  'paris': ['france', 'fr'],
  'neuilly': ['france', 'fr', 'paris'],

  'turquie': ['tr', 'istanbul', 'ankara'],
  'tr': ['turquie', 'istanbul'],
  'istanbul': ['turquie', 'tr'],
  'turkey': ['turquie', 'istanbul', 'tr'],

  'afrique': ['maroc', 'tunisie', 'ma', 'tn'],
  'europe': ['france', 'turquie', 'fr', 'tr'],
  'maghreb': ['maroc', 'tunisie', 'ma', 'tn'],

  // ── SERVICES ──
  'visa': ['visa medical', 'passeport', 'document'],
  'billet': ['billetterie aerienne', 'vol', 'avion'],
  'avion': ['billetterie aerienne', 'vol', 'evacuation sanitaire'],
  'vol': ['billetterie aerienne', 'avion'],
  'transport': ['transferts vip', 'voiture', 'chauffeur'],
  'hotel': ['hebergement', 'logement'],
  'hebergement': ['hotel', 'logement', 'sejour'],
  'traducteur': ['interpretariat', 'traduction'],
  'traduction': ['interpretariat', 'traducteur'],
  'langue': ['interpretariat'],
  'assurance': ['assurance voyage', 'couverture medicale', 'rapatriement'],
  'rapatriement': ['assurance voyage', 'evacuation sanitaire express'],
  'teleconsultation': ['suivi post-operatoire', 'consultation en ligne'],
  'suivi': ['suivi post-operatoire', 'accompagnement'],
  'dossier': ['constitution du dossier', 'dossier medical'],
  'second avis': ['avis medical', 'consultation', 'expert'],
  'vip': ['chambre vip', 'conciergerie', 'premium'],
  'urgence': ['evacuation sanitaire express', 'rapatriement'],
  'evasan': ['evacuation sanitaire express', 'rapatriement', 'avion medicalise'],
  'accompagnement': ['accompagnateur medical', 'suivi', 'conciergerie'],
  'famille': ['accompagnement famille', 'proche'],
  'convalescence': ['programme de recuperation', 'post-op'],
  'kinesitherapeute': ['programme de recuperation', 'reeducation'],
  'multi': ['coordination multi-specialites'],

  // ── AUTRES TERMES COMMUNS ──
  'clinique': ['hopital', 'etablissement', 'centre medical'],
  'hopital': ['clinique', 'etablissement'],
  'medecin': ['specialiste', 'chirurgien', 'docteur'],
  'chirurgie': ['operation', 'intervention'],
  'operation': ['chirurgie', 'intervention'],
  'intervention': ['chirurgie', 'operation'],
  'soin': ['traitement', 'medecine'],
  'traitement': ['soin', 'protocole'],
  'sejour': ['voyage medical', 'hebergement'],
  'voyage': ['sejour', 'vol', 'medecine'],
  'prix': ['tarif', 'cout', 'devis'],
  'tarif': ['prix', 'cout'],
  'devis': ['prix', 'tarif', 'estimation'],
  'prise en charge': ['assurance', 'remboursement'],
  'remboursement': ['assurance', 'prise en charge'],
  'premium': ['excellence', 'vip', 'haut de gamme'],
  'urgence medicale': ['evasan', 'evacuation sanitaire express', 'rapatriement'],
}

/* ──────────────────────────────────────────────────────────────────────
   EXPANSION DE REQUÊTE
   Retourne tous les termes couverts par une requête (alias inclus)
   ────────────────────────────────────────────────────────────────────── */

function expandQuery(q: string): string[] {
  const normalized = norm(q)
  const terms = new Set<string>([normalized])

  // Direct lookup
  if (ALIASES[normalized]) {
    ALIASES[normalized].forEach(t => terms.add(norm(t)))
  }

  // Partial key match (e.g. "bbl" inside "bbl augmentation")
  for (const [key, values] of Object.entries(ALIASES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      values.forEach(v => terms.add(norm(v)))
      terms.add(norm(key))
    }
  }

  return Array.from(terms)
}

/* ──────────────────────────────────────────────────────────────────────
   SCORE — Retourne un score de pertinence (0–100)
   ────────────────────────────────────────────────────────────────────── */

function score(haystack: string, terms: string[]): number {
  const h = norm(haystack)
  let best = 0

  for (const t of terms) {
    if (!t) continue
    if (h === t)                        { best = Math.max(best, 100); break }
    if (h.startsWith(t) || t.startsWith(h)) best = Math.max(best, 80)
    else if (h.includes(` ${t}`) || h.includes(`${t} `)) best = Math.max(best, 65)
    else if (h.includes(t))             best = Math.max(best, 45)
    else {
      // Partial token overlap
      const ht = h.split(/\s+/)
      const tt = t.split(/\s+/)
      const overlap = tt.filter(tok => ht.some(ht => ht.includes(tok) || tok.includes(ht)))
      if (overlap.length > 0) best = Math.max(best, 20 + overlap.length * 8)
    }
  }

  return best
}

function scoreMany(fields: string[], terms: string[]): number {
  return Math.max(...fields.map(f => score(f, terms)))
}

/* ──────────────────────────────────────────────────────────────────────
   INDEX & SEARCH
   ────────────────────────────────────────────────────────────────────── */

export interface SearchOptions {
  kinds?: ResultKind[]   // filtrer par catégorie de résultats
  limit?: number         // nombre max de résultats (défaut 30)
  minScore?: number      // score minimum (défaut 1 avec fallback auto)
}

const COUNTRY_LABEL: Record<string, string> = {
  ma: 'Maroc', tn: 'Tunisie', fr: 'France', tr: 'Turquie',
}

export function searchAll(
  query: string,
  options: SearchOptions = {}
): SearchResult[] {
  const { kinds, limit = 30, minScore = 1 } = options
  const q = query.trim()

  // Empty query → return all featured items
  if (!q) return getFeatured(limit, kinds)

  const terms = expandQuery(q)
  const results: SearchResult[] = []

  // ── Destinations ──────────────────────────────────────
  if (!kinds || kinds.includes('destination')) {
    for (const dest of NAV_DESTINATIONS) {
      const fields = [dest.name, dest.code, dest.type, COUNTRY_LABEL[dest.code] || '']
      const s = scoreMany(fields, terms)
      if (s >= minScore) {
        results.push({
          kind: 'destination',
          id: `dest-${dest.code}`,
          score: s,
          title: dest.name,
          subtitle: dest.type,
          code: dest.code,
          raw: dest,
        })
      }
    }
  }

  // ── Clinics ────────────────────────────────────────────
  if (!kinds || kinds.includes('clinic')) {
    for (const clinic of NAV_CLINICS) {
      const fields = [
        clinic.name,
        clinic.loc,
        clinic.spec,
        clinic.category,
        COUNTRY_LABEL[clinic.code] || '',
        clinic.code,
        ...clinic.specialties,
      ]
      const s = scoreMany(fields, terms)
      if (s >= minScore) {
        results.push({
          kind: 'clinic',
          id: `clinic-${norm(clinic.name)}`,
          score: s,
          title: clinic.name,
          subtitle: clinic.spec,
          meta: `${clinic.loc}, ${COUNTRY_LABEL[clinic.code]}`,
          code: clinic.code,
          raw: clinic,
        })
      }
    }
  }

  // ── Specialties ────────────────────────────────────────
  if (!kinds || kinds.includes('specialty')) {
    for (const spec of NAV_SPECIALTY_DATA) {
      const fields = [
        spec.name,
        spec.desc,
        ...spec.subSpecialties,
        ...spec.recommended.map(c => COUNTRY_LABEL[c] || c),
      ]
      const s = scoreMany(fields, terms)
      if (s >= minScore) {
        results.push({
          kind: 'specialty',
          id: `spec-${norm(spec.name)}`,
          score: s,
          title: spec.name,
          subtitle: spec.desc,
          meta: spec.recommended.map(c => COUNTRY_LABEL[c]).join(' · '),
          iconKey: spec.iconKey,
          raw: spec,
        })
      }
    }
  }

  // ── Services inclus ────────────────────────────────────
  if (!kinds || kinds.includes('service')) {
    for (const svc of NAV_SERVICES) {
      const fields = [svc.name, svc.desc]
      const s = scoreMany(fields, terms)
      if (s >= minScore) {
        results.push({
          kind: 'service',
          id: `svc-${norm(svc.name)}`,
          score: s,
          title: svc.name,
          subtitle: svc.desc,
          iconKey: svc.iconKey,
          raw: svc,
        })
      }
    }
  }

  // ── Services premium ───────────────────────────────────
  if (!kinds || kinds.includes('premium')) {
    for (const svc of NAV_SERVICES_PREMIUM) {
      const fields = [svc.name, svc.desc]
      const s = scoreMany(fields, terms)
      if (s >= minScore) {
        results.push({
          kind: 'premium',
          id: `prem-${norm(svc.name)}`,
          score: s,
          title: svc.name,
          subtitle: svc.desc,
          raw: svc,
        })
      }
    }
  }

  // ── Sort by score DESC ─────────────────────────────────
  results.sort((a, b) => b.score - a.score)

  // ── Fallback garanti : si aucun résultat, retourner les featured ──
  if (results.length === 0) {
    return getFeatured(limit, kinds)
  }

  return results.slice(0, limit)
}

/* ──────────────────────────────────────────────────────────────────────
   FEATURED — Items populaires (fallback quand 0 résultat)
   ────────────────────────────────────────────────────────────────────── */

function getFeatured(limit: number, kinds?: ResultKind[]): SearchResult[] {
  const results: SearchResult[] = []

  if (!kinds || kinds.includes('specialty')) {
    // Top spécialités populaires
    const popular = ['Chirurgie Esthétique', 'Oncologie', 'Greffe Capillaire', 'PMA & Fertilité', 'Cardiologie']
    for (const name of popular) {
      const spec = NAV_SPECIALTY_DATA.find(s => s.name === name)
      if (spec) {
        results.push({
          kind: 'specialty',
          id: `spec-${norm(spec.name)}`,
          score: 10,
          title: spec.name,
          subtitle: spec.desc,
          meta: spec.recommended.map(c => COUNTRY_LABEL[c]).join(' · '),
          iconKey: spec.iconKey,
          raw: spec,
        })
      }
    }
  }

  if (!kinds || kinds.includes('clinic')) {
    // Top cliniques (rating desc)
    const top = [...NAV_CLINICS].sort((a, b) => b.rating - a.rating).slice(0, 4)
    for (const clinic of top) {
      results.push({
        kind: 'clinic',
        id: `clinic-${norm(clinic.name)}`,
        score: 8,
        title: clinic.name,
        subtitle: clinic.spec,
        meta: `${clinic.loc}, ${COUNTRY_LABEL[clinic.code]}`,
        code: clinic.code,
        raw: clinic,
      })
    }
  }

  return results.slice(0, limit)
}

/* ──────────────────────────────────────────────────────────────────────
   HELPERS — Recherche par catégorie uniquement (pour les tabs)
   ────────────────────────────────────────────────────────────────────── */

/** Filtre les cliniques avec le moteur intelligent */
export function searchClinics(
  query: string,
  countryFilter: string,
  categoryFilter: string,
  specialtyFilter: string
) {
  const q = query.trim()
  let list = [...NAV_CLINICS]

  // Filtres stricts (dropdowns)
  if (countryFilter !== 'all') list = list.filter(c => c.code === countryFilter)
  if (categoryFilter !== 'all') list = list.filter(c => c.category === categoryFilter)
  if (specialtyFilter !== 'all') list = list.filter(c => c.specialties.includes(specialtyFilter))

  // Recherche intelligente dans le sous-ensemble filtré
  if (!q) return list

  const terms = expandQuery(q)

  return list
    .map(clinic => ({
      clinic,
      s: scoreMany([
        clinic.name,
        clinic.loc,
        clinic.spec,
        clinic.category,
        COUNTRY_LABEL[clinic.code] || '',
        clinic.code,
        ...clinic.specialties,
      ], terms),
    }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .map(({ clinic }) => clinic)
}

/** Filtre les spécialités avec le moteur intelligent */
export function searchSpecialties(query: string) {
  if (!query.trim()) return NAV_SPECIALTY_DATA

  const terms = expandQuery(query)

  return NAV_SPECIALTY_DATA
    .map(spec => ({
      spec,
      s: scoreMany([
        spec.name,
        spec.desc,
        ...spec.subSpecialties,
      ], terms),
    }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .map(({ spec }) => spec)
}
