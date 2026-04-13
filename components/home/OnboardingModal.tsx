'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown,
  Search, Plus, Phone, MessageCircle,
} from 'lucide-react'
import { NAV_SPECIALTY_DATA, NAV_DESTINATIONS } from '@/lib/data/homepage'

/* ──────────────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────────────── */

interface FormData {
  specialty: string
  customSpecialty: string
  destination: string
  firstName: string
  lastName: string
  email: string
  country: string
  phone: string
  whatsapp: boolean
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ──────────────────────────────────────────────────────────────────────
   SPÉCIALITÉS
   ────────────────────────────────────────────────────────────────────── */

const ALL_SPECIALTIES = [
  ...NAV_SPECIALTY_DATA.map(s => s.name),
  'Cancer du sein', 'Cancer du poumon', 'Cancer colorectal',
  'Cancer de la prostate', 'Cancer du foie', 'Cancer du pancréas',
  'Cancer de l\'ovaire', 'Cancer du col de l\'utérus', 'Cancer thyroïdien',
  'Cancer cérébral', 'Leucémie / Lymphome', 'Mélanome',
  'BBL (Brazilian Butt Lift)', 'Rhinoplastie', 'Liposuccion',
  'Augmentation mammaire', 'Réduction mammaire', 'Abdominoplastie',
  'Lifting facial', 'Blépharoplastie', 'Injections & Botox',
  'Greffe FUE', 'Greffe DHI', 'Greffe de barbe', 'Greffe de sourcils',
  'FIV (Fécondation in vitro)', 'Insémination artificielle',
  'Préservation ovocytaire', 'Don d\'ovocytes', 'ICSI',
  'Sleeve gastrectomie', 'Bypass gastrique', 'Ballon intragastrique',
  'Prothèse de hanche', 'Prothèse de genou', 'Arthroscopie',
  'Chirurgie du dos / Rachis',
  'Pontage coronarien', 'Remplacement valvulaire', 'Cathétérisme cardiaque',
  'Neurochirurgie', 'Traitement AVC', 'Chirurgie des tumeurs cérébrales',
  'Implants dentaires', 'All-on-4', 'Facettes dentaires', 'Orthodontie adulte',
  'LASIK', 'Chirurgie de la cataracte', 'Traitement du glaucome',
  'Chirurgie de la prostate', 'Calculs rénaux', 'Transplantation rénale',
  'Endométriose', 'Fibrome utérin', 'Hystérectomie',
]

const INITIAL_VISIBLE = 16

/* ──────────────────────────────────────────────────────────────────────
   PAYS — LISTE COMPLÈTE (Afrique + reste du monde)
   ────────────────────────────────────────────────────────────────────── */

const COUNTRIES_RESIDENCE: { label: string; group: string }[] = [
  // ── Europe ──
  { label: 'France',           group: 'Europe' },
  { label: 'Belgique',         group: 'Europe' },
  { label: 'Suisse',           group: 'Europe' },
  { label: 'Espagne',          group: 'Europe' },
  { label: 'Portugal',         group: 'Europe' },
  { label: 'Italie',           group: 'Europe' },
  { label: 'Allemagne',        group: 'Europe' },
  { label: 'Pays-Bas',         group: 'Europe' },
  { label: 'Royaume-Uni',      group: 'Europe' },
  { label: 'Luxembourg',       group: 'Europe' },
  // ── Amérique du Nord ──
  { label: 'Canada',           group: 'Amérique du Nord' },
  { label: 'États-Unis',       group: 'Amérique du Nord' },
  // ── Afrique du Nord ──
  { label: 'Maroc',            group: 'Afrique du Nord' },
  { label: 'Algérie',          group: 'Afrique du Nord' },
  { label: 'Tunisie',          group: 'Afrique du Nord' },
  { label: 'Libye',            group: 'Afrique du Nord' },
  { label: 'Égypte',           group: 'Afrique du Nord' },
  { label: 'Mauritanie',       group: 'Afrique du Nord' },
  { label: 'Soudan',           group: 'Afrique du Nord' },
  // ── Afrique de l'Ouest ──
  { label: 'Sénégal',          group: 'Afrique de l\'Ouest' },
  { label: 'Côte d\'Ivoire',   group: 'Afrique de l\'Ouest' },
  { label: 'Mali',             group: 'Afrique de l\'Ouest' },
  { label: 'Niger',            group: 'Afrique de l\'Ouest' },
  { label: 'Burkina Faso',     group: 'Afrique de l\'Ouest' },
  { label: 'Ghana',            group: 'Afrique de l\'Ouest' },
  { label: 'Nigeria',          group: 'Afrique de l\'Ouest' },
  { label: 'Guinée',           group: 'Afrique de l\'Ouest' },
  { label: 'Guinée-Bissau',    group: 'Afrique de l\'Ouest' },
  { label: 'Gambie',           group: 'Afrique de l\'Ouest' },
  { label: 'Sierra Leone',     group: 'Afrique de l\'Ouest' },
  { label: 'Liberia',          group: 'Afrique de l\'Ouest' },
  { label: 'Togo',             group: 'Afrique de l\'Ouest' },
  { label: 'Bénin',            group: 'Afrique de l\'Ouest' },
  { label: 'Cap-Vert',         group: 'Afrique de l\'Ouest' },
  // ── Afrique Centrale ──
  { label: 'Cameroun',         group: 'Afrique Centrale' },
  { label: 'Gabon',            group: 'Afrique Centrale' },
  { label: 'Congo',            group: 'Afrique Centrale' },
  { label: 'RDC',              group: 'Afrique Centrale' },
  { label: 'Tchad',            group: 'Afrique Centrale' },
  { label: 'Centrafrique',     group: 'Afrique Centrale' },
  { label: 'Guinée équatoriale', group: 'Afrique Centrale' },
  { label: 'São Tomé-et-Príncipe', group: 'Afrique Centrale' },
  { label: 'Rwanda',           group: 'Afrique Centrale' },
  { label: 'Burundi',          group: 'Afrique Centrale' },
  // ── Afrique de l'Est ──
  { label: 'Éthiopie',         group: 'Afrique de l\'Est' },
  { label: 'Kenya',            group: 'Afrique de l\'Est' },
  { label: 'Tanzanie',         group: 'Afrique de l\'Est' },
  { label: 'Ouganda',          group: 'Afrique de l\'Est' },
  { label: 'Somalie',          group: 'Afrique de l\'Est' },
  { label: 'Érythrée',         group: 'Afrique de l\'Est' },
  { label: 'Djibouti',         group: 'Afrique de l\'Est' },
  { label: 'Comores',          group: 'Afrique de l\'Est' },
  // ── Afrique Australe ──
  { label: 'Afrique du Sud',   group: 'Afrique Australe' },
  { label: 'Zimbabwe',         group: 'Afrique Australe' },
  { label: 'Zambie',           group: 'Afrique Australe' },
  { label: 'Angola',           group: 'Afrique Australe' },
  { label: 'Namibie',          group: 'Afrique Australe' },
  { label: 'Botswana',         group: 'Afrique Australe' },
  { label: 'Lesotho',          group: 'Afrique Australe' },
  { label: 'Eswatini',         group: 'Afrique Australe' },
  { label: 'Malawi',           group: 'Afrique Australe' },
  { label: 'Mozambique',       group: 'Afrique Australe' },
  { label: 'Madagascar',       group: 'Afrique Australe' },
  // ── Îles & Territoires français ──
  { label: 'Réunion',          group: 'Outre-Mer' },
  { label: 'Martinique',       group: 'Outre-Mer' },
  { label: 'Guadeloupe',       group: 'Outre-Mer' },
  { label: 'Mayotte',          group: 'Outre-Mer' },
  // ── Afrique Insulaire ──
  { label: 'Maurice',          group: 'Océan Indien' },
  { label: 'Seychelles',       group: 'Océan Indien' },
  // ── Moyen-Orient ──
  { label: 'Arabie Saoudite',  group: 'Moyen-Orient' },
  { label: 'Émirats Arabes Unis', group: 'Moyen-Orient' },
  { label: 'Qatar',            group: 'Moyen-Orient' },
  { label: 'Koweït',           group: 'Moyen-Orient' },
  // ── Autre ──
  { label: 'Autre',            group: 'Autre' },
]

/* ──────────────────────────────────────────────────────────────────────
   INDICATIFS TÉLÉPHONIQUES
   ────────────────────────────────────────────────────────────────────── */

const DIAL_CODES: Record<string, string> = {
  'France': '+33', 'Belgique': '+32', 'Suisse': '+41', 'Espagne': '+34',
  'Portugal': '+351', 'Italie': '+39', 'Allemagne': '+49', 'Pays-Bas': '+31',
  'Royaume-Uni': '+44', 'Luxembourg': '+352',
  'Canada': '+1', 'États-Unis': '+1',
  'Maroc': '+212', 'Algérie': '+213', 'Tunisie': '+216', 'Libye': '+218',
  'Égypte': '+20', 'Mauritanie': '+222', 'Soudan': '+249',
  'Sénégal': '+221', 'Côte d\'Ivoire': '+225', 'Mali': '+223',
  'Niger': '+227', 'Burkina Faso': '+226', 'Ghana': '+233',
  'Nigeria': '+234', 'Guinée': '+224', 'Guinée-Bissau': '+245',
  'Gambie': '+220', 'Sierra Leone': '+232', 'Liberia': '+231',
  'Togo': '+228', 'Bénin': '+229', 'Cap-Vert': '+238',
  'Cameroun': '+237', 'Gabon': '+241', 'Congo': '+242', 'RDC': '+243',
  'Tchad': '+235', 'Centrafrique': '+236', 'Guinée équatoriale': '+240',
  'São Tomé-et-Príncipe': '+239', 'Rwanda': '+250', 'Burundi': '+257',
  'Éthiopie': '+251', 'Kenya': '+254', 'Tanzanie': '+255', 'Ouganda': '+256',
  'Somalie': '+252', 'Érythrée': '+291', 'Djibouti': '+253', 'Comores': '+269',
  'Afrique du Sud': '+27', 'Zimbabwe': '+263', 'Zambie': '+260',
  'Angola': '+244', 'Namibie': '+264', 'Botswana': '+267',
  'Lesotho': '+266', 'Eswatini': '+268', 'Malawi': '+265',
  'Mozambique': '+258', 'Madagascar': '+261',
  'Réunion': '+262', 'Martinique': '+596', 'Guadeloupe': '+590', 'Mayotte': '+262',
  'Maurice': '+230', 'Seychelles': '+248',
  'Arabie Saoudite': '+966', 'Émirats Arabes Unis': '+971',
  'Qatar': '+974', 'Koweït': '+965',
}

/* ──────────────────────────────────────────────────────────────────────
   PRÉPOSITIONS FRANÇAISES pour les destinations
   ────────────────────────────────────────────────────────────────────── */

const DEST_PREPOSITIONS: Record<string, string> = {
  'Maroc':   'au',
  'Tunisie': 'en',
  'France':  'en',
  'Turquie': 'en',
}

function getPrep(destName: string): string {
  return DEST_PREPOSITIONS[destName] ?? 'en'
}

/* ──────────────────────────────────────────────────────────────────────
   STEP BAR
   ────────────────────────────────────────────────────────────────────── */

function StepBar({ step }: { step: number }) {
  const steps = ['Intervention', 'Coordonnées', 'Confirmation']
  return (
    <div className="flex items-center gap-0 mt-6">
      {steps.map((label, i) => {
        const done = i < step
        const active = i === step
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold transition-all duration-300 rounded-sm ${
                done ? 'bg-brand-teal text-white' :
                active ? 'bg-white text-slate-900' :
                'bg-white/10 text-white/30'
              }`}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
                active ? 'text-white' : done ? 'text-brand-teal' : 'text-white/30'
              }`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-3 mb-4 transition-all duration-500 ${done ? 'bg-brand-teal' : 'bg-white/10'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────────────── */

export function OnboardingModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    specialty: '', customSpecialty: '', destination: 'all',
    firstName: '', lastName: '', email: '', country: '', phone: '', whatsapp: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [specSearch, setSpecSearch] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [dialCode, setDialCode] = useState('+212')

  /* Reset on close */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0)
        setForm({ specialty: '', customSpecialty: '', destination: 'all', firstName: '', lastName: '', email: '', country: '', phone: '', whatsapp: false })
        setErrors({})
        setSpecSearch('')
        setShowAll(false)
        setDialCode('+212')
      }, 400)
    }
  }, [isOpen])

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Auto dial code from country */
  useEffect(() => {
    const code = DIAL_CODES[form.country]
    if (code) setDialCode(code)
  }, [form.country])

  /* Filtered specialties */
  const filtered = useMemo(() => {
    const q = specSearch.toLowerCase().trim()
    if (!q) return ALL_SPECIALTIES
    return ALL_SPECIALTIES.filter(s => s.toLowerCase().includes(q))
  }, [specSearch])

  const visible = showAll || specSearch ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hasMore = !showAll && !specSearch && ALL_SPECIALTIES.length > INITIAL_VISIBLE

  const set = (key: keyof FormData, val: string | boolean) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  const destLabel = form.destination === 'all'
    ? 'Toute destination'
    : NAV_DESTINATIONS.find(d => d.code === form.destination)?.name ?? ''

  const destPrep = form.destination === 'all' ? 'pour' : getPrep(destLabel)

  const specialtyLabel = form.specialty === '__autre__'
    ? form.customSpecialty || 'Autre'
    : form.specialty

  /* Recap text — ex: "Cancer du sein au Maroc" */
  const recapText = form.destination === 'all'
    ? specialtyLabel
    : `${specialtyLabel} ${destPrep} ${destLabel}`

  /* Grouped countries for select */
  const groupedCountries = useMemo(() => {
    const groups: Record<string, string[]> = {}
    COUNTRIES_RESIDENCE.forEach(({ label, group }) => {
      if (!groups[group]) groups[group] = []
      groups[group].push(label)
    })
    return groups
  }, [])

  function validateStep1() {
    if (!form.specialty) { setErrors({ specialty: 'Sélectionnez une spécialité' }); return false }
    if (form.specialty === '__autre__' && !form.customSpecialty.trim()) {
      setErrors({ customSpecialty: 'Précisez votre spécialité' }); return false
    }
    setErrors({}); return true
  }

  function validateStep2() {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Email invalide'
    if (!form.country) e.country = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (step === 0 && !validateStep1()) return
    if (step === 1 && !validateStep2()) return
    setStep(s => s + 1)
  }

  function back() { setStep(s => s - 1); setErrors({}) }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] z-[91] flex flex-col shadow-2xl"
          >
            {/* ── Header ─────────────────────────────────── */}
            <div className="shrink-0 bg-[#060a0d] px-4 sm:px-7 pt-5 sm:pt-7 pb-5 sm:pb-6 border-b border-white/5">
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-teal via-brand-teal/60 to-transparent" />

              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[8px] font-bold text-brand-teal/70 uppercase tracking-[0.35em] mb-2">
                    MediBridge · Accompagnement médical
                  </p>
                  <h2
                    className="text-[22px] text-white leading-tight tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Démarrer votre parcours
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all mt-0.5 rounded-sm"
                >
                  <X size={15} />
                </button>
              </div>
              <StepBar step={step} />
            </div>

            {/* ── Content ─────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto bg-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>
              <AnimatePresence mode="wait">

                {/* ══ ÉTAPE 1 — Intervention ══════════════════ */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="px-4 sm:px-7 py-6 sm:py-8"
                  >
                    <div className="mb-6">
                      <span className="inline-block text-[8px] font-bold text-brand-teal uppercase tracking-[0.3em] bg-brand-teal/8 px-2.5 py-1 rounded-sm mb-3">
                        Étape 1 sur 2
                      </span>
                      <h3
                        className="text-[21px] text-slate-900 leading-snug tracking-tight"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Quelle intervention recherchez-vous ?
                      </h3>
                      <p className="text-[12px] text-slate-400 mt-1.5 leading-relaxed">
                        Sélectionnez une spécialité — nous identifierons les meilleurs établissements pour vous.
                      </p>
                    </div>

                    {/* Search bar */}
                    <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 h-11 mb-5 focus-within:border-brand-teal focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all rounded-sm">
                      <Search size={13} className="text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={specSearch}
                        onChange={e => setSpecSearch(e.target.value)}
                        placeholder="Rechercher une spécialité ou intervention..."
                        className="flex-1 bg-transparent outline-none text-base sm:text-[12.5px] text-slate-700 placeholder:text-slate-400"
                      />
                      {specSearch && (
                        <button onClick={() => setSpecSearch('')} className="text-slate-400 hover:text-slate-600">
                          <X size={12} />
                        </button>
                      )}
                    </div>

                    {/* Specialty pills */}
                    {visible.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {visible.map(name => (
                          <button
                            key={name}
                            onClick={() => set('specialty', name)}
                            className={`px-3 py-1.5 text-[11.5px] font-medium border transition-all duration-200 rounded-sm ${
                              form.specialty === name
                                ? 'bg-brand-teal text-white border-brand-teal shadow-sm shadow-brand-teal/20'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-teal/50 hover:text-brand-teal hover:bg-brand-teal/4'
                            }`}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 mb-3 italic">
                        Aucune spécialité trouvée pour &ldquo;{specSearch}&rdquo;
                      </p>
                    )}

                    {hasMore && (
                      <button
                        onClick={() => setShowAll(true)}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-brand-teal hover:underline uppercase tracking-wider mb-4"
                      >
                        <Plus size={11} />
                        Voir toutes les spécialités ({ALL_SPECIALTIES.length})
                      </button>
                    )}

                    {errors.specialty && (
                      <p className="text-[10px] text-red-500 font-semibold mb-2">{errors.specialty}</p>
                    )}

                    {/* Autre */}
                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <p className="text-[9.5px] text-slate-400 mb-2.5 font-bold uppercase tracking-wider">
                        Vous ne trouvez pas votre spécialité ?
                      </p>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => set('specialty', '__autre__')}
                          className={`shrink-0 px-3 py-2 text-[10px] font-bold border transition-all rounded-sm ${
                            form.specialty === '__autre__'
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          Autre
                        </button>
                        <input
                          type="text"
                          value={form.customSpecialty}
                          onChange={e => { set('customSpecialty', e.target.value); set('specialty', '__autre__') }}
                          placeholder="Entrez votre spécialité manuellement"
                          className={`flex-1 h-9 px-3.5 text-base sm:text-[12.5px] text-slate-800 bg-white border outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all placeholder:text-slate-300 rounded-sm ${errors.customSpecialty ? 'border-red-400' : 'border-slate-200'}`}
                        />
                      </div>
                      {errors.customSpecialty && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.customSpecialty}</p>
                      )}
                    </div>

                    {/* Destination */}
                    <div className="mt-6">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                        Destination préférée <span className="normal-case font-normal tracking-normal">(optionnel)</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[{ code: 'all', name: 'Peu importe' }, ...NAV_DESTINATIONS].map(d => (
                          <button
                            key={d.code}
                            onClick={() => set('destination', d.code)}
                            className={`px-3.5 py-2 text-[11.5px] font-semibold border transition-all rounded-sm ${
                              form.destination === d.code
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            {d.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ══ ÉTAPE 2 — Coordonnées ═══════════════════ */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="px-4 sm:px-7 py-6 sm:py-8"
                  >
                    <div className="mb-6">
                      <span className="inline-block text-[8px] font-bold text-brand-teal uppercase tracking-[0.3em] bg-brand-teal/8 px-2.5 py-1 rounded-sm mb-3">
                        Étape 2 sur 2
                      </span>
                      <h3
                        className="text-[21px] text-slate-900 leading-snug tracking-tight"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Vos coordonnées
                      </h3>
                      <p className="text-[12px] text-slate-400 mt-1.5 leading-relaxed">
                        Notre équipe vous contacte sous 48h avec une proposition personnalisée. Aucun engagement.
                      </p>
                    </div>

                    {/* Recap sélection */}
                    <div className="mb-7 px-5 py-4 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-sm">
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-2">Votre sélection</p>
                      <p className="text-[14px] font-semibold text-white leading-snug">
                        {specialtyLabel}
                        {form.destination !== 'all' && (
                          <>
                            <span className="text-slate-400 font-normal"> {destPrep} </span>
                            <span className="text-brand-teal">{destLabel}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="space-y-5">
                      {/* Prénom + Nom */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={e => set('firstName', e.target.value)}
                            placeholder="Votre prénom"
                            className={`w-full h-11 px-4 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all placeholder:text-slate-300 rounded-sm ${errors.firstName ? 'border-red-400' : 'border-slate-200'}`}
                          />
                          {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                            Nom *
                          </label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={e => set('lastName', e.target.value)}
                            placeholder="Votre nom"
                            className={`w-full h-11 px-4 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all placeholder:text-slate-300 rounded-sm ${errors.lastName ? 'border-red-400' : 'border-slate-200'}`}
                          />
                          {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          placeholder="votre@email.com"
                          className={`w-full h-11 px-4 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all placeholder:text-slate-300 rounded-sm ${errors.email ? 'border-red-400' : 'border-slate-200'}`}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      {/* Pays de résidence */}
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                          Pays de résidence *
                        </label>
                        <div className="relative">
                          <select
                            value={form.country}
                            onChange={e => set('country', e.target.value)}
                            className={`w-full h-11 px-4 pr-10 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all appearance-none rounded-sm cursor-pointer ${errors.country ? 'border-red-400' : 'border-slate-200'}`}
                          >
                            <option value="" disabled>Sélectionner un pays</option>
                            {Object.entries(groupedCountries).map(([group, countries]) => (
                              <optgroup key={group} label={group}>
                                {countries.map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        {errors.country && <p className="text-[10px] text-red-500 mt-1">{errors.country}</p>}
                      </div>

                      {/* Téléphone avec indicatif */}
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                          Téléphone <span className="normal-case font-normal tracking-normal text-slate-300">(optionnel — très recommandé)</span>
                        </label>
                        <div className={`flex h-11 border rounded-sm overflow-hidden focus-within:border-brand-teal focus-within:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all ${form.phone ? 'border-slate-300' : 'border-slate-200'}`}>
                          {/* Indicatif auto */}
                          <div className="flex items-center gap-1.5 px-3.5 bg-slate-50 border-r border-slate-200 shrink-0">
                            <Phone size={11} className="text-slate-400" />
                            <span className="text-[12px] font-semibold text-slate-600 whitespace-nowrap">{dialCode}</span>
                          </div>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => set('phone', e.target.value)}
                            placeholder="6 00 00 00 00"
                            className="flex-1 px-3.5 text-base sm:text-[13px] text-slate-800 bg-white outline-none placeholder:text-slate-300"
                          />
                        </div>

                        {/* WhatsApp CTA */}
                        <label className="flex items-center gap-2.5 mt-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={form.whatsapp}
                            onChange={e => set('whatsapp', e.target.checked)}
                            className="w-3.5 h-3.5 accent-[#25D366] cursor-pointer"
                          />
                          <span className="flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-700 transition-colors">
                            <MessageCircle size={12} className="text-[#25D366]" />
                            Je préfère être contacté(e) via <strong className="text-[#25D366]">WhatsApp</strong>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Note RGPD */}
                    <div className="mt-7 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-sm">
                      <p className="text-[10.5px] text-slate-500 leading-relaxed">
                        <span className="font-bold text-slate-700">Ce formulaire n&apos;est pas une inscription.</span>
                        {' '}Notre équipe analysera votre demande et vous contactera directement. Vous créerez votre espace personnel après validation.
                      </p>
                      <p className="text-[9px] text-slate-400 mt-2">
                        Données traitées conformément au RGPD · Hébergement HDS certifié · Aucun partage sans votre accord.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ══ ÉTAPE 3 — Confirmation ═══════════════════ */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col items-center justify-center min-h-full px-5 sm:px-8 py-10 sm:py-14 text-center"
                  >
                    {/* Icon */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 rounded-full bg-brand-teal/8 border border-brand-teal/20 flex items-center justify-center">
                        <CheckCircle2 size={36} className="text-brand-teal" strokeWidth={1.5} />
                      </div>
                      <div className="absolute inset-0 bg-brand-teal/10 blur-3xl -z-10 scale-150" />
                    </div>

                    <p className="text-[8px] font-bold text-brand-teal uppercase tracking-[0.4em] mb-3">
                      Demande enregistrée
                    </p>
                    <h3
                      className="text-[24px] text-slate-900 leading-snug mb-4 tracking-tight"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Bienvenue {form.firstName},<br />votre dossier est en cours
                    </h3>

                    {/* Recap */}
                    <div className="w-full max-w-xs bg-gradient-to-br from-slate-900 to-slate-800 px-5 py-4 mb-6 text-left rounded-sm border border-slate-700">
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-2.5">Récapitulatif</p>
                      <p className="text-[13px] text-white font-semibold leading-snug">
                        {specialtyLabel}
                        {form.destination !== 'all' && (
                          <>
                            <span className="text-slate-400 font-normal"> {destPrep} </span>
                            <span className="text-brand-teal">{destLabel}</span>
                          </>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1.5">{form.email}</p>
                      {form.phone && (
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                          {form.whatsapp && <MessageCircle size={10} className="text-[#25D366]" />}
                          {dialCode} {form.phone}
                        </p>
                      )}
                    </div>

                    <p className="text-[12px] text-slate-500 leading-relaxed max-w-xs mb-8">
                      Vous recevrez une proposition personnalisée sur{' '}
                      <strong className="text-slate-700">{form.email}</strong> dans les{' '}
                      <strong className="text-slate-700">48 heures</strong>.
                    </p>

                    {/* Prochaines étapes */}
                    <div className="w-full max-w-xs space-y-2 mb-10 text-left">
                      {[
                        'Confirmation par email dans quelques minutes',
                        'Analyse de votre profil par notre comité médical',
                        'Proposition d\'établissements sous 48h',
                        'Création de votre espace personnel',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3 border border-slate-100 bg-slate-50/60 rounded-sm">
                          <div className="relative w-3.5 h-3.5 shrink-0 mt-0.5">
                            <div className="absolute inset-0 rotate-45 border border-brand-teal/30 bg-brand-teal/8" />
                            <div className="absolute inset-[3px] rotate-45 bg-brand-teal/60" />
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/register"
                      className="w-full max-w-xs flex items-center justify-center gap-2 h-12 bg-slate-900 hover:bg-brand-teal text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group rounded-sm"
                    >
                      Créer mon espace MediBridge
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button
                      onClick={onClose}
                      className="mt-3 text-[10px] text-slate-400 hover:text-slate-600 uppercase tracking-wider font-semibold transition-colors"
                    >
                      Fermer
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── Footer ──────────────────────────────────── */}
            {step < 2 && (
              <div className="shrink-0 px-4 sm:px-7 py-4 border-t border-slate-100 bg-white">
                <div className="flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      onClick={back}
                      className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-slate-800 uppercase tracking-wider transition-colors"
                    >
                      <ArrowLeft size={13} />
                      Retour
                    </button>
                  ) : <span />}

                  <button
                    onClick={next}
                    className="flex items-center gap-2.5 h-11 px-8 bg-slate-900 hover:bg-brand-teal text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group rounded-sm"
                  >
                    {step === 0 ? 'Continuer' : 'Envoyer ma demande'}
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
