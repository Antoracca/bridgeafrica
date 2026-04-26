'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown,
  Search, Plus, Phone, MessageCircle,
} from 'lucide-react'
import Image from 'next/image'
import { NAV_SPECIALTY_DATA, NAV_DESTINATIONS } from '@/lib/data/homepage'
import { isValidPhoneNumber, getExampleNumber, type CountryCode } from 'libphonenumber-js/min'
import examples from 'libphonenumber-js/examples.mobile.json'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

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
  message: string
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

const COUNTRY_ISO: Record<string, CountryCode> = {
  'France': 'FR', 'Belgique': 'BE', 'Suisse': 'CH', 'Espagne': 'ES',
  'Portugal': 'PT', 'Italie': 'IT', 'Allemagne': 'DE', 'Pays-Bas': 'NL',
  'Royaume-Uni': 'GB', 'Luxembourg': 'LU',
  'Canada': 'CA', 'États-Unis': 'US',
  'Maroc': 'MA', 'Algérie': 'DZ', 'Tunisie': 'TN', 'Libye': 'LY',
  'Égypte': 'EG', 'Mauritanie': 'MR', 'Soudan': 'SD',
  'Sénégal': 'SN', 'Côte d\'Ivoire': 'CI', 'Mali': 'ML',
  'Niger': 'NE', 'Burkina Faso': 'BF', 'Ghana': 'GH',
  'Nigeria': 'NG', 'Guinée': 'GN', 'Guinée-Bissau': 'GW',
  'Gambie': 'GM', 'Sierra Leone': 'SL', 'Liberia': 'LR',
  'Togo': 'TG', 'Bénin': 'BJ', 'Cap-Vert': 'CV',
  'Cameroun': 'CM', 'Gabon': 'GA', 'Congo': 'CG', 'RDC': 'CD',
  'Tchad': 'TD', 'Centrafrique': 'CF', 'Guinée équatoriale': 'GQ',
  'São Tomé-et-Príncipe': 'ST', 'Rwanda': 'RW', 'Burundi': 'BI',
  'Éthiopie': 'ET', 'Kenya': 'KE', 'Tanzanie': 'TZ', 'Ouganda': 'UG',
  'Somalie': 'SO', 'Érythrée': 'ER', 'Djibouti': 'DJ', 'Comores': 'KM',
  'Afrique du Sud': 'ZA', 'Zimbabwe': 'ZW', 'Zambie': 'ZM',
  'Angola': 'AO', 'Namibie': 'NA', 'Botswana': 'BW',
  'Lesotho': 'LS', 'Eswatini': 'SZ', 'Malawi': 'MW',
  'Mozambique': 'MZ', 'Madagascar': 'MG',
  'Réunion': 'RE', 'Martinique': 'MQ', 'Guadeloupe': 'GP', 'Mayotte': 'YT',
  'Maurice': 'MU', 'Seychelles': 'SC',
  'Arabie Saoudite': 'SA', 'Émirats Arabes Unis': 'AE',
  'Qatar': 'QA', 'Koweït': 'KW'
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
                done ? 'bg-[#1B433E] text-white' :
                active ? 'bg-white border border-[#1B433E] text-[#1B433E]' :
                'bg-white border border-[#E1E1E1] text-[#E1E1E1]'
              }`}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
                active ? 'text-[#1B433E]' : done ? 'text-[#1B433E]' : 'text-slate-300'
              }`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-3 mb-4 transition-all duration-500 ${done ? 'bg-[#1B433E]' : 'bg-[#E1E1E1]'}`} />
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
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    specialty: '', customSpecialty: '', destination: 'all',
    firstName: '', lastName: '', email: '', country: '', phone: '', whatsapp: false, message: ''
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
        setForm({ specialty: '', customSpecialty: '', destination: 'all', firstName: '', lastName: '', email: '', country: '', phone: '', whatsapp: false, message: '' })
        setErrors({})
        setSpecSearch('')
        setShowAll(false)
        setDialCode('+212')
      }, 400)
    }
  }, [isOpen])

  /* Lock app scroll when open */
  useScrollLock(isOpen)

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

  /* Dynamic Phone Placeholder derived from Google Libphonenumber */
  const phonePlaceholder = useMemo(() => {
    if (!form.country) return "6 00 00 00 00"
    const isoCode = COUNTRY_ISO[form.country]
    if (!isoCode) return "6 00 00 00 00"
    try {
      const example = getExampleNumber(isoCode, examples)
      return example ? example.formatNational() : "6 00 00 00 00"
    } catch {
      return "6 00 00 00 00"
    }
  }, [form.country])

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
    
    if (form.phone) {
      const isoCode = COUNTRY_ISO[form.country]
      if (isoCode) {
        try {
          if (!isValidPhoneNumber(form.phone, isoCode)) {
            e.phone = 'Numéro invalide pour ce pays'
          }
        } catch {
          e.phone = 'Format de téléphone invalide'
        }
      }
    }
    
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (step === 0 && !validateStep1()) return
    if (step === 1 && !validateStep2()) return
    if (step === 1) {
       setIsLoading(true)
       setStep(2)
       setTimeout(() => {
          document.getElementById('onboarding-scroll-container')?.scrollTo(0,0)
       }, 50)
       setTimeout(() => {
          setIsLoading(false)
       }, 1800)
       return
    }
    setStep(s => s + 1)
  }

  function back() { setStep(s => s - 1); setErrors({}) }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop photographique calme (nouveau) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-[#0c1a17]"
            onClick={onClose}
          >
            <Image
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Fond médical splash d'eau liquide turquoise abstrait"
              fill
              className="object-cover opacity-60 mix-blend-screen saturate-150"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1a17] via-[#0c1a17]/50 to-transparent" />
            
            <div className="hidden lg:flex flex-col items-start justify-center h-full pl-10 lg:pl-16 xl:pl-24 pr-10 w-[calc(100%-520px)] select-none pointer-events-none relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                className="max-w-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#4caf91]/50" />
                  <span className="text-[10px] text-[#4caf91] font-bold uppercase tracking-[0.25em]">MediBridge Privilège</span>
                </div>
                <h1
                  className="text-3xl lg:text-5xl font-normal text-white leading-[1.2]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Dossier d'admission.
                </h1>
              </motion.div>
            </div>
          </motion.div>

          {/* Panel Formulaire */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] z-[91] flex flex-col overflow-hidden shadow-2xl bg-white"
          >
            {/* ── Header ─────────────────────────────────── */}
            <div className="shrink-0 bg-[#FDFBF7] px-4 sm:px-7 pt-5 sm:pt-7 pb-5 sm:pb-6 border-b border-[#E1E1E1]">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[8px] font-bold text-[#1B433E] uppercase tracking-[0.35em] mb-2">
                    MediBridge · Dossier Admis
                  </p>
                  <h2
                    className="text-[22px] text-[#1a1f24] leading-tight tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Démarrer votre parcours
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 border border-transparent hover:border-[#E1E1E1] transition-all rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
              <StepBar step={step} />
            </div>

            {/* ── Content ─────────────────────────────────── */}
            <div id="onboarding-scroll-container" className="flex-1 min-h-0 overflow-y-auto bg-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent', overscrollBehavior: 'none' }}>
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
                        className="text-[21px] text-[#1a1f24] leading-snug tracking-tight"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Quelle spécialité recherchez-vous ?
                      </h3>
                      <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        Indiquez-nous votre besoin médical. Nous identifierons pour vous l'établissement d'excellence le plus adapté.
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
                            onChange={e => {
                               // Only allow digits, spaces, plus and dashes
                               const val = e.target.value.replace(/[^\d\s\+\-]/g, '')
                               set('phone', val)
                            }}
                            placeholder={phonePlaceholder}
                            className="flex-1 px-3.5 text-base sm:text-[13px] text-slate-800 bg-white outline-none placeholder:text-slate-300"
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}

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

                      {/* NOUVEAU : Champ pour services ou infos */}
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                          Informations ou services souhaités <span className="normal-case font-normal tracking-normal text-slate-300">(optionnel)</span>
                        </label>
                        <textarea
                          lang="fr"
                          value={form.message}
                          onChange={e => set('message', e.target.value)}
                          placeholder="Ex: Je souhaite une conciergerie 24/7, un traducteur sur place, devis détaillé..."
                          rows={3}
                          className="w-full px-4 py-3 text-base sm:text-[13px] text-slate-800 bg-white border border-slate-200 outline-none focus:border-brand-teal focus:shadow-[0_0_0_3px_rgba(13,188,167,0.08)] transition-all placeholder:text-slate-300 rounded-sm resize-none"
                        />
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

                {/* ══ ÉTAPE 3 — Confirmation / Loading ═══════════════════ */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col items-center pt-8 sm:pt-12 pb-16 px-5 sm:px-8 text-center"
                  >
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center flex-1">
                        <div className="w-12 h-12 border-2 border-[#E1E1E1] border-t-[#1B433E] rounded-full animate-spin mb-6" />
                        <h3 className="text-[20px] text-[#1a1f24] tracking-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                          Transmission sécurisée...
                        </h3>
                        <p className="text-[12px] text-slate-500 font-light">
                          Notre guichet chiffre et réceptionne vos données.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Icon */}
                        <div className="relative mb-6">
                          <div className="w-16 h-16 rounded-full bg-[#f2f7f6] border border-[#d6ebe5] flex items-center justify-center shadow-sm">
                            <CheckCircle2 size={30} className="text-[#1B433E]" strokeWidth={1.5} />
                          </div>
                        </div>

                        <p className="text-[9px] font-bold text-[#1B433E] uppercase tracking-[0.4em] mb-3">
                          Dossier réceptionné
                        </p>
                        <h3
                          className="text-[24px] text-[#1a1f24] leading-snug mb-5 tracking-tight"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          Merci {form.firstName},<br />votre dossier est à l'étude
                        </h3>

                        {/* Recap Premium Clair */}
                        <div className="w-full max-w-sm bg-[#FDFBF7] px-6 py-5 mb-8 text-left rounded-sm border border-[#E1E1E1] shadow-sm">
                          <p className="text-[9px] font-bold text-[#1B433E] uppercase tracking-[0.3em] mb-3 border-b border-[#E1E1E1] pb-2">Récapitulatif</p>
                          <p className="text-[14px] text-[#1a1f24] leading-snug mb-2 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                            {specialtyLabel}
                            {form.destination !== 'all' && (
                              <>
                                <span className="text-slate-500 font-light italic"> {destPrep} </span>
                                <span className="text-[#1B433E] font-medium">{destLabel}</span>
                              </>
                            )}
                          </p>
                          <p className="text-[12px] text-slate-600 mb-1">{form.email}</p>
                          {form.phone && (
                            <p className="text-[12px] text-slate-600 flex items-center gap-1.5">
                              {form.whatsapp && <MessageCircle size={12} className="text-[#25D366]" />}
                              {dialCode} {form.phone}
                            </p>
                          )}
                        </div>

                        <p className="text-[13px] text-slate-500 leading-relaxed font-light max-w-sm mb-6">
                          Notre confrérie analysera vos informations. Vous recevrez des recommandations personnalisées sous <strong className="text-slate-800 font-medium">24 heures express</strong>.
                        </p>

                        {/* Prochaines étapes (Horizontales avec coches) */}
                        <div className="w-full max-w-md mb-10">
                           <div className="flex flex-wrap justify-center gap-3">
                             {[
                               'Email de confirmation',
                               'Analyse profil en 24h',
                               'Proposition d\'hôpitaux',
                               'Ouverture d\'espace',
                             ].map((item, i) => (
                               <div key={i} className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-sm">
                                 <CheckCircle2 size={13} className="text-[#4caf91] shrink-0" strokeWidth={2} />
                                 <p className="text-[11px] text-slate-600 font-medium">{item}</p>
                               </div>
                             ))}
                           </div>
                        </div>

                        <div className="w-full max-w-md flex flex-col gap-4 pb-8">
                          <a
                            href="/register"
                            className="w-full flex items-center justify-center gap-2 h-14 sm:h-16 bg-[#1B433E] hover:bg-[#122e2a] text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group rounded-lg shadow-md"
                          >
                            Ouvrir mon espace patient
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                          <button
                            onClick={onClose}
                            className="w-full h-12 flex items-center justify-center border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 text-[11px] sm:text-[12px] uppercase tracking-widest font-bold transition-all rounded-lg shadow-sm bg-white"
                          >
                            Fermer
                          </button>
                        </div>
                      </>
                    )}
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
