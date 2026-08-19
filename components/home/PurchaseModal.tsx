'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown,
  Search, Plus, Phone, MessageCircle, Building, CreditCard, Banknote
} from 'lucide-react'
import Image from 'next/image'
import { NAV_SPECIALTY_DATA, NAV_DESTINATIONS } from '@/lib/data/homepage'
import { isValidPhoneNumber, getExampleNumber, type CountryCode } from 'libphonenumber-js/min'
import examples from 'libphonenumber-js/examples.mobile.json'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

/* ──────────────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────────────── */

export type PlanId = 'essentiel' | 'serenite' | 'excellence'

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
  paymentIntent: 'card' | 'wire' | 'cash' | 'installments' | 'check' | 'insurance' | ''
}

interface Props {
  isOpen: boolean
  onClose: () => void
  initialPlanId: PlanId
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ──────────────────────────────────────────────────────────────────────
   DATA
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

const COUNTRIES_RESIDENCE: { label: string; group: string }[] = [
  { label: 'France', group: 'Europe' }, { label: 'Belgique', group: 'Europe' }, { label: 'Suisse', group: 'Europe' },
  { label: 'Maroc', group: 'Afrique du Nord' }, { label: 'Algérie', group: 'Afrique du Nord' }, { label: 'Tunisie', group: 'Afrique du Nord' },
  { label: 'Sénégal', group: 'Afrique de l\'Ouest' }, { label: 'Côte d\'Ivoire', group: 'Afrique de l\'Ouest' }, { label: 'Cameroun', group: 'Afrique Centrale' },
  { label: 'Gabon', group: 'Afrique Centrale' }, { label: 'RDC', group: 'Afrique Centrale' }, { label: 'Bénin', group: 'Afrique de l\'Ouest' },
  { label: 'Togo', group: 'Afrique de l\'Ouest' }, { label: 'Mali', group: 'Afrique de l\'Ouest' }, { label: 'Guinée', group: 'Afrique de l\'Ouest' },
  { label: 'Congo', group: 'Afrique Centrale' }, { label: 'Centrafrique', group: 'Afrique Centrale' }, { label: 'Rwanda', group: 'Afrique Centrale' },
  { label: 'Burkina Faso', group: 'Afrique de l\'Ouest' }, { label: 'Afrique du Sud', group: 'Afrique Australe' }, { label: 'Kenya', group: 'Afrique de l\'Est' },
  { label: 'Djibouti', group: 'Afrique de l\'Est' }, { label: 'Canada', group: 'Amérique du Nord' }, { label: 'États-Unis', group: 'Amérique du Nord' },
  { label: 'Royaume-Uni', group: 'Europe' }, { label: 'Arabie Saoudite', group: 'Moyen-Orient' }, { label: 'Émirats Arabes Unis', group: 'Moyen-Orient' },
  { label: 'Qatar', group: 'Moyen-Orient' }, { label: 'Autre', group: 'Autre' },
]

const DIAL_CODES: Record<string, string> = {
  'France': '+33', 'Belgique': '+32', 'Suisse': '+41', 'Maroc': '+212',
  'Algérie': '+213', 'Tunisie': '+216', 'Sénégal': '+221', 'Côte d\'Ivoire': '+225',
  'Cameroun': '+237', 'Gabon': '+241', 'RDC': '+243', 'Bénin': '+229',
  'Togo': '+228', 'Mali': '+223', 'Guinée': '+224', 'Congo': '+242',
  'Centrafrique': '+236', 'Rwanda': '+250', 'Burkina Faso': '+226',
  'Afrique du Sud': '+27', 'Kenya': '+254', 'Djibouti': '+253',
  'Canada': '+1', 'États-Unis': '+1', 'Royaume-Uni': '+44',
  'Arabie Saoudite': '+966', 'Émirats Arabes Unis': '+971', 'Qatar': '+974',
}

const COUNTRY_ISO: Record<string, CountryCode> = {
  'France': 'FR', 'Belgique': 'BE', 'Suisse': 'CH', 'Maroc': 'MA',
  'Algérie': 'DZ', 'Tunisie': 'TN', 'Sénégal': 'SN', 'Côte d\'Ivoire': 'CI',
  'Cameroun': 'CM', 'Gabon': 'GA', 'RDC': 'CD', 'Bénin': 'BJ',
  'Togo': 'TG', 'Mali': 'ML', 'Guinée': 'GN', 'Congo': 'CG',
  'Centrafrique': 'CF', 'Rwanda': 'RW', 'Burkina Faso': 'BF',
  'Afrique du Sud': 'ZA', 'Kenya': 'KE', 'Djibouti': 'DJ',
  'Canada': 'CA', 'États-Unis': 'US', 'Royaume-Uni': 'GB',
  'Arabie Saoudite': 'SA', 'Émirats Arabes Unis': 'AE', 'Qatar': 'QA',
}

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
              <span className={`text-[9.5px] font-bold uppercase tracking-wider hidden sm:block ${active || done ? 'text-[#1a1f24]' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mx-4 bg-[#E1E1E1]">
                <div className="h-full bg-[#1B433E] transition-all duration-500" style={{ width: done ? '100%' : '0%' }} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────────────────── */

export function PurchaseModal({ isOpen, onClose, initialPlanId }: Props) {
  const [step, setStep] = useState(initialPlanId === 'essentiel' ? -1 : 0)
  const [isLoading, setIsLoading] = useState(false)
  const [planId, setPlanId] = useState<PlanId>(initialPlanId)

  const [form, setForm] = useState<FormData>({
    specialty: '', customSpecialty: '', destination: 'all',
    firstName: '', lastName: '', email: '', country: '', phone: '', whatsapp: false, paymentIntent: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [dialCode, setDialCode] = useState('+212')

  // Spécialités
  const [specSearch, setSpecSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const visible = useMemo(() => {
    let list = ALL_SPECIALTIES
    if (specSearch.trim()) {
      const q = specSearch.toLowerCase()
      list = list.filter(item => item.toLowerCase().includes(q))
    }
    if (!showAll && !specSearch.trim()) {
      list = list.slice(0, INITIAL_VISIBLE)
    }
    return list
  }, [specSearch, showAll])

  const hasMore = !showAll && !specSearch.trim() && ALL_SPECIALTIES.length > INITIAL_VISIBLE

  const groupedCountries = useMemo(() => {
    const groups: Record<string, string[]> = {}
    COUNTRIES_RESIDENCE.forEach(({ label, group }) => {
      if (!groups[group]) groups[group] = []
      groups[group].push(label)
    })
    return groups
  }, [])

  // Auto dial code
  useEffect(() => {
    const code = DIAL_CODES[form.country]
    if (code) setDialCode(code)
  }, [form.country])

  // Lock app scroll
  useScrollLock(isOpen)

  // Reset form on open/close
  useEffect(() => {
    if (isOpen) {
      setPlanId(initialPlanId)
      setStep(initialPlanId === 'essentiel' ? -1 : 0)
    } else {
      setTimeout(() => {
        setForm({
          specialty: '', customSpecialty: '', destination: 'all',
          firstName: '', lastName: '', email: '', country: '', phone: '', whatsapp: false, paymentIntent: ''
        })
        setErrors({})
        setSpecSearch('')
        setShowAll(false)
      }, 300)
    }
  }, [isOpen, initialPlanId])

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

  const set = (key: keyof FormData, val: string | boolean) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  /* ───────────────────────── VALIDATIONS ───────────────────────── */

  function validateStep1() {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.specialty) { e.specialty = 'Veuillez sélectionner ou saisir une spécialité.' }
    else if (form.specialty === '__autre__' && !form.customSpecialty.trim()) {
      e.customSpecialty = 'Veuillez préciser votre demande.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Email invalide'
    if (!form.country) e.country = 'Requis'
    
    // Le paiement n'est qu'une intention. Mais pas requis pour "Essentiel".
    if (planId !== 'essentiel' && !form.paymentIntent) {
      e.paymentIntent = 'Veuillez indiquer une préférence'
    }
    
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
    if (step === -1) {
       setStep(0); return;
    }
    if (step === 0 && !validateStep1()) return
    if (step === 1 && !validateStep2()) return
    if (step === 1) {
       setIsLoading(true)
       setStep(2)
       setTimeout(() => {
          document.getElementById('purchase-onboarding-scroll')?.scrollTo(0,0)
       }, 50)
       setTimeout(() => {
          setIsLoading(false)
       }, 1800)
       return
    }
    setStep(s => s + 1)
  }

  function back() { setStep(s => s - 1); setErrors({}) }

  const specialtyLabel = form.specialty === '__autre__' ? form.customSpecialty : form.specialty
  const destItem = NAV_DESTINATIONS.find(d => d.code === form.destination)
  const destLabel = destItem ? destItem.name : form.destination
  const destPrep = destItem ? getPrep(destItem.name) : 'en'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
              alt="Fond de la modale de sélection de plan. Image simple, épurée et relaxante non médicale"
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
                  <span className="text-[10px] text-[#4caf91] font-bold uppercase tracking-[0.25em]">Pont Afrique Santé Privilège</span>
                </div>
                <h1
                  className="text-3xl lg:text-5xl font-normal text-white leading-[1.2]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {planId === 'essentiel' && "Offre Essentiel."}
                  {planId === 'serenite' && "Pack Sérénité."}
                  {planId === 'excellence' && "Protocole Excellence."}
                </h1>
                <p className="text-slate-300 text-sm mt-4 font-light leading-relaxed max-w-sm">
                  {planId === 'essentiel' && "Démarrez votre parcours de soins avec un devis personnalisé, libre de tout engagement."}
                  {planId === 'serenite' && "Profitez d'un accompagnement All-Inclusive. Nous organisons vos vols, transferts et soins en toute tranquillité."}
                  {planId === 'excellence' && "L'ultime standard de l'accompagnement avec conciergerie privée 24/7."}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] z-[91] flex flex-col overflow-hidden shadow-2xl bg-white"
          >
            {/* HEADER */}
            <div className="shrink-0 bg-[#FDFBF7] px-4 sm:px-7 pt-5 sm:pt-7 pb-5 sm:pb-6 border-b border-[#E1E1E1]">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-[8px] font-bold text-[#1B433E] uppercase tracking-[0.35em] mb-2">
                    Choix du Forfait
                  </p>
                  <h2
                    className="text-[22px] text-[#1a1f24] leading-tight tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Démarrer votre accompagnement
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

            {/* CONTENT */}
            <div id="purchase-onboarding-scroll" className="flex-1 min-h-0 overflow-y-auto bg-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent', overscrollBehavior: 'none' }}>
              <AnimatePresence mode="wait">

                {/* STEP -1 - UPSELL ESSENTIEL */}
                {step === -1 && (
                  <motion.div
                    key="step_upsell"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="px-4 sm:px-7 py-8 sm:py-12 flex flex-col items-center justify-center min-h-full text-center"
                  >
                    <div className="w-16 h-16 bg-slate-50 border border-[#E1E1E1] rounded-full flex items-center justify-center mb-6">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    </div>
                    
                    <span className="inline-block text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                      Offre Essentiel
                    </span>
                    <h3
                      className="text-[24px] sm:text-[28px] text-[#1a1f24] leading-snug tracking-tight mb-4 max-w-sm"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Le pack Essentiel est gratuit, mais incomplet.
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed max-w-sm mx-auto mb-8">
                      Vous prenez en charge vous-même la recherche de vols, la réservation hôtelière et les navettes médicales dans un pays étranger. 
                      <br /><br />
                      <strong className="text-slate-800">89% de nos patients</strong> privilégient le pack <strong className="text-[#1B433E]">Sérénité</strong> pour un accompagnement All-Inclusive et sans stress.
                    </p>

                    <div className="w-full max-w-sm flex flex-col gap-3">
                      <button
                        onClick={() => { setPlanId('serenite'); setStep(0) }}
                        className="w-full h-14 bg-[#1B433E] hover:bg-[#122e2a] text-white text-[12px] font-bold uppercase tracking-[0.1em] transition-all rounded-lg shadow-md flex items-center justify-center gap-2 group"
                      >
                        Passer en Sérénité (Recommandé)
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => setStep(0)}
                        className="w-full h-12 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider transition-all rounded-lg"
                      >
                        Continuer en Essentiel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 0 - INTERVENTION */}
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
                        Indiquez-nous votre besoin médical. Nous identifierons pour vous l'établissement d'excellence le plus adapté à votre forfait.
                      </p>
                    </div>

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
                      <p className="text-[11px] text-slate-400 mb-3 italic">Aucune spécialité trouvée pour &ldquo;{specSearch}&rdquo;</p>
                    )}

                    {hasMore && (
                      <button onClick={() => setShowAll(true)} className="flex items-center gap-1.5 text-[10px] font-bold text-brand-teal hover:underline uppercase tracking-wider mb-4">
                        <Plus size={11} /> Voir toutes ({ALL_SPECIALTIES.length})
                      </button>
                    )}

                    {errors.specialty && <p className="text-[10px] text-red-500 font-semibold mb-2">{errors.specialty}</p>}

                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <p className="text-[9.5px] text-slate-400 mb-2.5 font-bold uppercase tracking-wider">Vous ne trouvez pas votre spécialité ?</p>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => set('specialty', '__autre__')}
                          className={`shrink-0 px-3 py-2 text-[10px] font-bold border transition-all rounded-sm ${
                            form.specialty === '__autre__' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
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
                      {errors.customSpecialty && <p className="text-[10px] text-red-500 mt-1">{errors.customSpecialty}</p>}
                    </div>

                    <div className="mt-6">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Destination préférée <span className="normal-case font-normal tracking-normal">(optionnel)</span></p>
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

                {/* STEP 1 - COORDONNÉES & INTENT DE PAIEMENT */}
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

                    <div className="mb-7 px-5 py-4 bg-[#FDFBF7] border border-[#E1E1E1] rounded-sm shadow-sm">
                      <p className="text-[8px] font-bold text-[#1B433E] uppercase tracking-[0.25em] mb-2 border-b border-[#E1E1E1] pb-1.5">Votre dossier</p>
                      <p className="text-[14px] font-medium text-[#1a1f24] leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                        {specialtyLabel}
                        {form.destination !== 'all' && (
                          <><span className="text-slate-400 font-normal italic"> {destPrep} </span><span className="text-[#1B433E]">{destLabel}</span></>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1.5 block">
                        Formule sélectionnée : <span className="font-bold text-[#1B433E] capitalize">{planId}</span>
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Prénom *</label>
                          <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Votre prénom" className={`w-full h-11 px-4 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal rounded-sm ${errors.firstName ? 'border-red-400' : 'border-slate-200'}`} />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Nom *</label>
                          <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Votre nom" className={`w-full h-11 px-4 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal rounded-sm ${errors.lastName ? 'border-red-400' : 'border-slate-200'}`} />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Email *</label>
                        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="votre@email.com" className={`w-full h-11 px-4 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal rounded-sm ${errors.email ? 'border-red-400' : 'border-slate-200'}`} />
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">Pays de résidence *</label>
                        <div className="relative">
                          <select value={form.country} onChange={e => set('country', e.target.value)} className={`w-full h-11 px-4 pr-10 text-base sm:text-[13px] text-slate-800 bg-white border outline-none focus:border-brand-teal appearance-none rounded-sm cursor-pointer ${errors.country ? 'border-red-400' : 'border-slate-200'}`}>
                            <option value="" disabled>Sélectionner un pays</option>
                            {Object.entries(groupedCountries).map(([group, countries]) => (
                               <optgroup key={group} label={group}>{countries.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-2">
                          Téléphone <span className="normal-case font-normal tracking-normal text-slate-400">(pour que le conseiller vous appelle)</span>
                        </label>
                        <div className={`flex h-11 border rounded-sm overflow-hidden focus-within:border-brand-teal ${form.phone ? 'border-slate-300' : 'border-slate-200'} ${errors.phone && 'border-red-400'}`}>
                          <div className="flex items-center gap-1.5 px-3.5 bg-slate-50 border-r border-slate-200 shrink-0">
                             <Phone size={11} className="text-slate-400" />
                             <span className="text-[12px] font-semibold text-slate-600 whitespace-nowrap">{dialCode}</span>
                          </div>
                          <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value.replace(/[^\d\s\+\-]/g, ''))} placeholder={phonePlaceholder} className="flex-1 px-3.5 text-base sm:text-[13px] text-slate-800 bg-white outline-none placeholder:text-slate-300" />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                        
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
                      
                      {/* INTENTIONS FINANCIÈRES (Conditionnel Sauf pour Essentiel - Purement informatif) */}
                      {planId !== 'essentiel' && (
                        <div className="mt-8 pt-6 border-t border-slate-100">
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-3">
                            Modalité de couverture souhaitée
                          </label>
                          <p className="text-[10.5px] text-slate-500 mb-4 leading-relaxed bg-[#f2f7f6] p-3 rounded-sm border border-[#d6ebe5]">
                            <strong>Information :</strong> Aucun paiement n'est exigé aujourd'hui. Dites-nous simplement quelle option de facturation votre profil préfère pour la constitution du devis.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {[
                               { 
                                 id: 'insurance', 
                                 label: 'Prise en charge Assurance', 
                                 icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
                                 note: 'Gérée directement par votre assurance'
                               },
                               { 
                                 id: 'installments', 
                                 label: 'En échéance (4 à 6x)', 
                                 icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>, 
                                 note: 'Sous réserve d\u2019éligibilité' 
                               },
                               { 
                                 id: 'wire', 
                                 label: 'Virement bancaire', 
                                 icon: <img src="/virement.png" alt="Virement" width={24} height={24} className="object-contain" /> 
                               },
                               { 
                                 id: 'card', 
                                 label: 'Carte bancaire', 
                                 icon: <img src="/visa.png" alt="Visa" width={36} height={22} className="object-contain" /> 
                               },
                               { 
                                 id: 'cash', 
                                 label: 'Cash / Dépôt Agence', 
                                 icon: <img src="/argent.png" alt="Cash" width={24} height={24} className="object-contain" /> 
                               },
                               { 
                                 id: 'check', 
                                 label: 'Paiement par chèque', 
                                 icon: <img src="/cheque.png" alt="Chèque" width={24} height={24} className="object-contain" />
                               },
                             ].map((opt) => (
                               <label key={opt.id} className={`flex flex-col p-3.5 border rounded-sm cursor-pointer transition-colors hover:shadow-sm ${form.paymentIntent === opt.id ? 'border-brand-teal bg-brand-teal/5 shadow-sm' : 'border-[#E1E1E1] hover:border-brand-teal/50 bg-white'}`}>
                                 <div className="flex items-start gap-3">
                                   <input type="radio" name="payment" checked={form.paymentIntent === opt.id} onChange={() => set('paymentIntent', opt.id)} className="w-[18px] h-[18px] accent-[#1B433E] text-[#1B433E] shrink-0 mt-0.5" />
                                   <div className="flex flex-col">
                                     <span className="text-[12.5px] font-medium text-[#1a1f24] flex items-center gap-2">
                                       <span className="text-[#1B433E]">{opt.icon}</span> {opt.label}
                                     </span>
                                     {opt.note && <span className="mt-1 text-[10.5px] text-slate-500">{opt.note}</span>}
                                   </div>
                                 </div>
                               </label>
                             ))}
                          </div>
                          {errors.paymentIntent && <p className="text-[10px] text-red-500 mt-2 font-semibold">{errors.paymentIntent}</p>}
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}

                {/* STEP 2 - CONFIRMATION */}
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
                          Transmission en cours...
                        </h3>
                        <p className="text-[12px] text-slate-500 font-light">
                          Notre guichet d'admission sécurise votre demande de prestation.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="relative mb-6">
                          <div className="w-16 h-16 rounded-full bg-[#f2f7f6] border border-[#d6ebe5] flex items-center justify-center shadow-sm">
                            <CheckCircle2 size={30} className="text-[#1B433E]" strokeWidth={1.5} />
                          </div>
                        </div>

                        <p className="text-[9px] font-bold text-[#1B433E] uppercase tracking-[0.4em] mb-3">
                          Dossier validé
                        </p>
                        <h3
                          className="text-[24px] text-[#1a1f24] leading-snug mb-5 tracking-tight"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          Merci {form.firstName},<br />votre dossier d'admission est prêt
                        </h3>

                        <div className="w-full max-w-sm bg-[#FDFBF7] px-6 py-5 mb-8 text-left rounded-sm border border-[#E1E1E1] shadow-sm">
                          <p className="text-[9px] font-bold text-[#1B433E] uppercase tracking-[0.3em] mb-3 border-b border-[#E1E1E1] pb-2">Résumé du forfait {planId}</p>
                          <p className="text-[14px] text-[#1a1f24] leading-snug mb-2 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                            {specialtyLabel}
                            {form.destination !== 'all' && (
                              <><span className="text-slate-500 font-light italic"> {destPrep} </span><span className="text-[#1B433E] font-medium">{destLabel}</span></>
                            )}
                          </p>
                          <p className="text-[12px] text-slate-600 mb-1">{form.email}</p>
                        </div>

                        <p className="text-[13px] text-slate-500 leading-relaxed font-light max-w-sm mb-6">
                          Un coordinateur va vous contacter. Vous recevrez toutes vos estimations financières complètes <strong className="text-slate-800 font-medium">d'ici quelques heures</strong>.
                        </p>

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
                            Fermer la page
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* FOOTER */}
            {step >= 0 && step < 2 && (
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
                  ) : (
                    <button
                      onClick={() => {
                        if (planId === 'essentiel') setStep(-1);
                        else onClose();
                      }}
                      className="flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-slate-800 uppercase tracking-wider transition-colors"
                    >
                      <ArrowLeft size={13} />
                      {planId === 'essentiel' ? 'Retour' : 'Fermer'}
                    </button>
                  )}

                  <button
                    onClick={next}
                    className="flex items-center gap-2.5 h-11 px-8 bg-slate-900 hover:bg-brand-teal text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group rounded-sm"
                  >
                    {step === 0 ? 'Continuer' : 'Transmettre à l\'équipe'}
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
