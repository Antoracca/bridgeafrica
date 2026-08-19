'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Search, MapPin, Star, StarHalf, ExternalLink,
  Filter, Hospital, Building2, Globe, Dna, Baby, Scissors, Syringe,
  Eye, HeartPulse, Heart, Brain, Bone, Droplets, Scan, Ribbon,
  FileCheck, Stamp, Plane, Car, Hotel, Languages, Shield, Stethoscope,
  ChevronDown, Sparkle, Cpu, ArrowRight, CornerDownLeft,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import {
  NAV_DESTINATIONS, NAV_CLINICS, NAV_SPECIALTY_DATA,
  NAV_SERVICES, NAV_SERVICES_PREMIUM,
  type ClinicEntry,
} from '@/lib/data/homepage'
import { searchClinics, searchSpecialties } from '@/lib/search'
import { useScrollLock } from '@/lib/hooks/useScrollLock'

/* ── Icon maps ─────────────────────────────────────────────── */
const SPEC_ICONS: Record<string, LucideIcon> = {
  dna: Dna, baby: Baby, scissors: Scissors, syringe: Syringe,
  eye: Eye, heartpulse: HeartPulse, heart: Heart, brain: Brain,
  bone: Bone, droplets: Droplets, scan: Scan, ribbon: Ribbon,
}

const SERVICE_ICONS: Record<string, LucideIcon> = {
  filecheck: FileCheck, stamp: Stamp, plane: Plane, car: Car,
  hotel: Hotel, languages: Languages, shield: Shield, stethoscope: Stethoscope,
}

/* ── Star rating ───────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 !== 0
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} size={10} className="fill-amber-400 text-amber-400" />)}
      {half && <StarHalf size={10} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} size={10} className="fill-slate-200 text-slate-200" />)}
      <span className="text-[10px] font-bold text-slate-500 ml-1 tabular-nums">{rating}</span>
    </span>
  )
}

/* ── Country names ─────────────────────────────────────────── */
const COUNTRY_NAME: Record<string, string> = { ma: 'Maroc', tn: 'Tunisie', fr: 'France', tr: 'Turquie' }

/* ── All unique specialties from clinics ───────────────────── */
const ALL_SPECIALTIES = Array.from(
  new Set(NAV_CLINICS.flatMap(c => c.specialties))
).sort()

/* ══════════════════════════════════════════════════════════════
   EXPLORE MODAL — Full-height right-side slide-in panel
   ══════════════════════════════════════════════════════════════ */

interface Props {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

const AI_PROMPTS = [
  'Meilleure clinique cancer du sein en France',
  'BBL Istanbul — prix et durée de séjour',
  'FIV à Casablanca, délais et tarifs',
  'Greffe capillaire FUE Turquie qualité',
  'Chirurgie bariatrique sleeve Tunisie',
  'Second avis cardiologie Paris',
]

export function ExploreModal({ isOpen, onClose, initialQuery = '' }: Props) {
  /* ── State ─────────────────────────────────────────────── */
  const [query, setQuery] = useState(initialQuery)
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'hôpital' | 'clinique'>('all')
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'clinics' | 'specialties' | 'services'>('clinics')

  /* ── AI state ──────────────────────────────────────────── */
  const [aiQuery, setAiQuery] = useState('')
  const [aiMode, setAiMode] = useState(false)
  const aiInputRef = useRef<HTMLTextAreaElement>(null)

  /* ── Sync query when modal opens ───────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery)
      if (initialQuery) setAiMode(false)
    }
  }, [isOpen, initialQuery])

  /* ── Lock app scroll when open ── */
  useScrollLock(isOpen)

  /* ── Focus AI input when entering AI mode ──────────────── */
  useEffect(() => {
    if (aiMode) setTimeout(() => aiInputRef.current?.focus(), 120)
  }, [aiMode])

  /* ── Filtered clinics — moteur intelligent ─────────────── */
  const filteredClinics = useMemo(
    () => searchClinics(query, countryFilter, categoryFilter, specialtyFilter),
    [query, countryFilter, categoryFilter, specialtyFilter]
  )

  /* ── Filtered specialties — moteur intelligent ──────────── */
  const filteredSpecialties = useMemo(
    () => searchSpecialties(query),
    [query]
  )

  /* ── Count badges ──────────────────────────────────────── */
  const clinicCount = filteredClinics.length
  const specCount = filteredSpecialties.length

  /* ── Reset filters ─────────────────────────────────────── */
  const resetFilters = () => {
    setCountryFilter('all')
    setCategoryFilter('all')
    setSpecialtyFilter('all')
    setQuery('')
  }

  const hasActiveFilters = countryFilter !== 'all' || categoryFilter !== 'all' || specialtyFilter !== 'all' || query.trim() !== ''

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />

          {/* Panel — slides from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 right-0 h-full w-full sm:w-[540px] md:w-[620px] lg:w-[680px] bg-white z-[91] flex flex-col shadow-2xl ${aiMode ? 'overflow-hidden' : ''}`}
          >
            <motion.div 
              animate={{ opacity: aiMode ? 0 : 1, filter: aiMode ? 'blur(8px)' : 'blur(0px)', scale: aiMode ? 0.98 : 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden pointer-events-auto"
              style={{ pointerEvents: aiMode ? 'none' : 'auto' }}
            >

            {/* ── Header ──────────────────────────────────── */}
            <div className="shrink-0 border-b border-slate-100">

              {/* Top bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-5 pb-4">
                <div className="flex items-center gap-3">
                  {/* Logo réseau — topologie.png */}
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                    <Image
                      src="/topologie.png"
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain mix-blend-multiply"
                      style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(52%) saturate(480%) hue-rotate(131deg) brightness(85%) contrast(88%)' }}
                    />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.3em] leading-none mb-0.5">
                      Réseau médical international
                    </p>
                    <h2
                      className="text-[20px] sm:text-[24px] text-slate-900 leading-tight tracking-tight"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Explorer le réseau
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── AI CTA Banner ──────────────────────────── */}
              <div className="px-4 sm:px-6 pb-4">
                <div className="space-y-2.5">
                  {/* AI invite button — design épuré */}
                  <button
                    onClick={() => setAiMode(true)}
                    className="group w-full flex items-center gap-3.5 px-4 py-3 bg-white border border-slate-200 hover:border-violet-200 hover:shadow-[0_2px_16px_-4px_rgba(139,92,246,0.15)] transition-all duration-300 text-left"
                  >
                    {/* ia.png avatar */}
                    <div className="relative w-9 h-9 shrink-0">
                      <Image
                        src="/ia.png"
                        alt="IA"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-cover rounded-full shadow-sm"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.18em] leading-none mb-0.5">
                        IA Pont Afrique Santé
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        Décrivez votre situation, je vous guide vers les meilleures options
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-bold text-violet-400 uppercase tracking-wider hidden sm:block">
                        Demander
                      </span>
                      <ArrowRight size={14} className="text-violet-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Regular search bar */}
                  <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 h-10 focus-within:border-brand-teal focus-within:bg-white transition-all">
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Recherche rapide — clinique, pays, spécialité..."
                      style={{ touchAction: 'manipulation' }}
                      className="flex-1 bg-transparent outline-none text-base sm:text-[12px] text-slate-800 placeholder:text-slate-400"
                    />
                    {query && (
                      <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              {(
                <div className="px-4 sm:px-6 flex items-center gap-1 -mb-px overflow-x-auto scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {([
                    { key: 'clinics' as const, label: 'Établissements', count: clinicCount },
                    { key: 'specialties' as const, label: 'Spécialités', count: specCount },
                    { key: 'services' as const, label: 'Services', count: NAV_SERVICES.length + NAV_SERVICES_PREMIUM.length },
                  ] as const).map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative shrink-0 px-3 sm:px-4 py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] whitespace-nowrap transition-colors
                        ${activeTab === tab.key
                          ? 'text-brand-teal'
                          : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                      {tab.label}
                      <span className={`ml-1.5 text-[9px] tabular-nums px-1.5 py-0.5 ${
                        activeTab === tab.key ? 'bg-brand-teal/10 text-brand-teal' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {tab.count}
                      </span>
                      {activeTab === tab.key && (
                        <motion.div
                          layoutId="explore-tab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-teal"
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Content ─────────────────────────────────── */}
            <div className="flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: 'thin', overscrollBehavior: 'none' }}>

              {/* Old AI Placeholder removed */}

              {/* ═══ TABS CONTENT ═══════ */}
              {activeTab === 'clinics' && (
                <div className="px-4 sm:px-6 py-5">

                  {/* Filters toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-4 hover:text-brand-teal transition-colors"
                  >
                    <Filter size={13} />
                    Filtres
                    {hasActiveFilters && (
                      <span className="w-1.5 h-1.5 bg-brand-teal" />
                    )}
                    <ChevronDown size={12} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Filters panel */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-5 border-b border-slate-100 mb-5">

                          {/* Country filter */}
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5 block">
                              Pays
                            </label>
                            <select
                              value={countryFilter}
                              onChange={e => setCountryFilter(e.target.value)}
                              className="w-full h-9 bg-white border border-slate-200 text-base sm:text-[12px] text-slate-700 px-3 focus:border-brand-teal focus:outline-none transition-colors appearance-none"
                            >
                              <option value="all">Tous les pays</option>
                              {NAV_DESTINATIONS.map(d => (
                                <option key={d.code} value={d.code}>{d.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Category filter */}
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5 block">
                              Type
                            </label>
                            <select
                              value={categoryFilter}
                              onChange={e => setCategoryFilter(e.target.value as 'all' | 'hôpital' | 'clinique')}
                              className="w-full h-9 bg-white border border-slate-200 text-base sm:text-[12px] text-slate-700 px-3 focus:border-brand-teal focus:outline-none transition-colors appearance-none"
                            >
                              <option value="all">Tous</option>
                              <option value="hôpital">Hôpitaux</option>
                              <option value="clinique">Cliniques</option>
                            </select>
                          </div>

                          {/* Specialty filter */}
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5 block">
                              Spécialité
                            </label>
                            <select
                              value={specialtyFilter}
                              onChange={e => setSpecialtyFilter(e.target.value)}
                              className="w-full h-9 bg-white border border-slate-200 text-base sm:text-[12px] text-slate-700 px-3 focus:border-brand-teal focus:outline-none transition-colors appearance-none"
                            >
                              <option value="all">Toutes</option>
                              {ALL_SPECIALTIES.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {hasActiveFilters && (
                          <button
                            onClick={resetFilters}
                            className="text-[10px] font-bold text-brand-teal uppercase tracking-wider mb-4 hover:underline"
                          >
                            Réinitialiser les filtres
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active filters pills */}
                  {hasActiveFilters && !showFilters && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {countryFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-teal bg-brand-teal/8 border border-brand-teal/20 px-2 py-0.5">
                          {COUNTRY_NAME[countryFilter]}
                          <button onClick={() => setCountryFilter('all')}><X size={10} /></button>
                        </span>
                      )}
                      {categoryFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-teal bg-brand-teal/8 border border-brand-teal/20 px-2 py-0.5">
                          {categoryFilter === 'hôpital' ? 'Hôpitaux' : 'Cliniques'}
                          <button onClick={() => setCategoryFilter('all')}><X size={10} /></button>
                        </span>
                      )}
                      {specialtyFilter !== 'all' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-teal bg-brand-teal/8 border border-brand-teal/20 px-2 py-0.5">
                          {specialtyFilter}
                          <button onClick={() => setSpecialtyFilter('all')}><X size={10} /></button>
                        </span>
                      )}
                      <button
                        onClick={resetFilters}
                        className="text-[9px] text-slate-400 hover:text-brand-teal font-bold uppercase tracking-wider"
                      >
                        Tout effacer
                      </button>
                    </div>
                  )}

                  {/* Results count */}
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-4">
                    {clinicCount} établissement{clinicCount !== 1 ? 's' : ''} trouvé{clinicCount !== 1 ? 's' : ''}
                  </p>

                  {/* Clinic cards */}
                  {clinicCount > 0 ? (
                    <div className="space-y-3">
                      {filteredClinics.map((clinic, i) => (
                        <motion.div
                          key={`${clinic.name}-${i}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                          className="group relative bg-white border border-slate-150 p-5 hover:border-brand-teal/30 hover:shadow-[0_4px_20px_-6px_rgba(72,156,140,0.15)] transition-all"
                        >
                          {/* Header row */}
                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="w-10 h-10 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-brand-teal/8 transition-colors">
                              <Image
                                src={`https://flagcdn.com/w40/${clinic.code}.png`}
                                alt={COUNTRY_NAME[clinic.code] || ''}
                                width={22}
                                height={15}
                                className="w-[22px] h-auto"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-[14px] font-bold text-slate-900 group-hover:text-brand-teal leading-snug transition-colors">
                                  {clinic.name}
                                </h3>
                                {clinic.website && (
                                  <a
                                    href={clinic.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-300 hover:text-brand-teal shrink-0 mt-0.5 transition-colors"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    <ExternalLink size={13} />
                                  </a>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin size={10} className="text-slate-400 shrink-0" />
                                <span className="text-[11px] text-slate-500">{clinic.loc}, {COUNTRY_NAME[clinic.code]}</span>
                                <span className="text-slate-300">·</span>
                                <Stars rating={clinic.rating} />
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-3 pl-[54px]">
                            {clinic.spec}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pl-[54px]">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                              clinic.category === 'hôpital'
                                ? 'bg-brand-teal/8 text-brand-teal border border-brand-teal/15'
                                : 'bg-slate-50 text-slate-500 border border-slate-150'
                            }`}>
                              {clinic.category === 'hôpital' ? (
                                <span className="inline-flex items-center gap-1"><Hospital size={9} /> Hôpital</span>
                              ) : (
                                <span className="inline-flex items-center gap-1"><Building2 size={9} /> Clinique</span>
                              )}
                            </span>
                            {clinic.specialties.slice(0, 3).map(s => (
                              <span key={s} className="text-[9px] font-semibold text-slate-500 bg-slate-50 border border-slate-150 px-2 py-0.5">
                                {s}
                              </span>
                            ))}
                            {clinic.specialties.length > 3 && (
                              <span className="text-[9px] font-semibold text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5">
                                +{clinic.specialties.length - 3}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 text-center">
                      <Search size={28} className="text-slate-200 mx-auto mb-3" />
                      <p className="text-[13px] font-bold text-slate-400 mb-1">Aucun résultat</p>
                      <p className="text-[11px] text-slate-400">Modifiez vos filtres ou votre recherche.</p>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ SPECIALTIES TAB ═══════════════════════ */}
              {activeTab === 'specialties' && (
                <div className="px-4 sm:px-6 py-5 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-4">
                    {specCount} spécialité{specCount !== 1 ? 's' : ''} · {NAV_SPECIALTY_DATA.reduce((n, s) => n + s.subSpecialties.length, 0)} sous-spécialités
                  </p>
                  {filteredSpecialties.map((spec, i) => {
                    const Icon = SPEC_ICONS[spec.iconKey] || Globe
                    return (
                      <motion.div
                        key={spec.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="group bg-white border border-slate-150 p-5 hover:border-brand-teal/30 hover:shadow-[0_4px_20px_-6px_rgba(72,156,140,0.15)] transition-all"
                      >
                        <div className="flex items-start gap-4 mb-3">
                          <div className="w-11 h-11 flex items-center justify-center bg-slate-50 group-hover:bg-brand-teal/8 text-slate-400 group-hover:text-brand-teal shrink-0 transition-colors">
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                              {spec.name}
                            </h3>
                            <p className="text-[11px] text-slate-500 leading-relaxed">{spec.desc}</p>
                          </div>
                        </div>

                        {/* Sub-specialties */}
                        <div className="flex flex-wrap gap-1.5 pl-[60px] mb-3">
                          {spec.subSpecialties.map(sub => (
                            <span key={sub} className="text-[9px] font-semibold text-slate-500 bg-slate-50 border border-slate-150 px-2 py-0.5">
                              {sub}
                            </span>
                          ))}
                        </div>

                        {/* Recommended hubs */}
                        <div className="flex items-center gap-2 pl-[60px]">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.18em]">Hubs recommandés</span>
                          <div className="flex items-center gap-1.5">
                            {spec.recommended.map(code => (
                              <div key={code} className="flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5">
                                <Image
                                  src={`https://flagcdn.com/w20/${code}.png`}
                                  alt={COUNTRY_NAME[code] || ''}
                                  width={14}
                                  height={10}
                                  className="w-[14px] h-auto"
                                />
                                <span className="text-[9px] font-bold text-slate-600">{COUNTRY_NAME[code]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* ═══ SERVICES TAB ══════════════════════════ */}
              {activeTab === 'services' && (
                <div className="px-4 sm:px-6 py-5">

                  {/* Included services */}
                  <div className="mb-8">
                    <p className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.22em] mb-1">Services inclus</p>
                    <p className="text-[10px] text-slate-400 mb-4">Intégrés dans chaque accompagnement Pont Afrique Santé</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {NAV_SERVICES.map((svc, i) => {
                        const Icon = SERVICE_ICONS[svc.iconKey] || Sparkle
                        return (
                          <motion.div
                            key={svc.name}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                            className="group flex items-start gap-3 p-4 bg-white border border-slate-150 hover:border-brand-teal/30 transition-all"
                          >
                            <div className="w-9 h-9 flex items-center justify-center bg-slate-50 group-hover:bg-brand-teal/8 text-slate-400 group-hover:text-brand-teal shrink-0 transition-colors">
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[12px] font-bold text-slate-900 leading-snug mb-0.5">{svc.name}</h4>
                              <p className="text-[10px] text-slate-500 leading-relaxed">{svc.desc}</p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Premium services */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.22em]">Services premium</p>
                      <span className="text-[8px] font-bold text-brand-teal bg-brand-teal/8 border border-brand-teal/15 px-1.5 py-0.5 uppercase tracking-widest">
                        En option
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-4">Sur demande, pour un accompagnement de niveau supérieur</p>
                    <div className="space-y-2.5">
                      {NAV_SERVICES_PREMIUM.map((svc, i) => (
                        <motion.div
                          key={svc.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                          className="group flex items-start gap-3 p-4 border border-brand-teal/10 bg-brand-teal/[0.02] hover:bg-brand-teal/[0.05] transition-all"
                        >
                          <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center">
                            <Image
                              src="/service-premium.png"
                              alt=""
                              width={20}
                              height={20}
                              className="w-4 h-4 object-contain mix-blend-multiply"
                              style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(52%) saturate(480%) hue-rotate(131deg) brightness(85%) contrast(88%)' }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[12px] font-bold text-slate-900 leading-snug mb-0.5">{svc.name}</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed">{svc.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer ──────────────────────────────────── */}
            <div className="shrink-0 px-4 sm:px-6 py-4 border-t border-slate-100 bg-[#fafafa]">
              <div className="flex items-center justify-between">
                <p className="text-[9px] text-slate-400 uppercase tracking-[0.18em] font-semibold">
                  {NAV_DESTINATIONS.length} pays · {NAV_CLINICS.length} établissements · {NAV_SPECIALTY_DATA.length} spécialités
                </p>
                <button
                  onClick={onClose}
                  className="text-[11px] font-bold text-slate-500 hover:text-brand-teal uppercase tracking-wider transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
            </motion.div>

            {/* ── AI FULL-PANEL OVERLAY ───────────────────── */}
            <AnimatePresence>
              {aiMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.02, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-50 bg-white flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                  {/* AI Dedicated Header */}
                  <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 pt-5 pb-4 border-b border-slate-100 bg-white">
                    <button
                      onClick={() => setAiMode(false)}
                      className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-brand-teal transition-colors"
                    >
                      <CornerDownLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                      Retour
                    </button>
                    <div className="flex items-center gap-2.5">
                      <div className="relative shrink-0">
                        <Image src="/ia.png" alt="IA" width={28} height={28} className="w-7 h-7 object-cover rounded-full shadow-sm" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-slate-300 rounded-full border-[1.5px] border-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] leading-none mb-0.5">
                          IA Pont Afrique Santé
                        </p>
                        <p className="text-[8px] text-slate-400 font-bold tracking-widest uppercase">
                          Hors ligne
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setAiMode(false); onClose() }}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* AI Body (Scrollable) */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-6 flex flex-col items-center bg-slate-50" style={{ scrollbarWidth: 'thin', overscrollBehavior: 'none' }}>
                    <div className="w-full max-w-3xl mx-auto flex flex-col items-center pt-8 pb-12">
                        <div className="relative mb-8">
                          <div className="relative w-24 h-24">
                              <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-violet-100 to-blue-50 opacity-80" />
                              <Image src="/ia.png" alt="IA Pont Afrique Santé" width={96} height={96} className="relative w-24 h-24 rounded-full object-cover shadow-xl shadow-violet-100/50" />
                              <div className="absolute bottom-1 right-2 w-4 h-4 bg-slate-300 rounded-full border-[2.5px] border-white shadow-sm" />
                          </div>
                        </div>

                        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.35em] mb-3 text-center">
                          Assistant Intelligent
                        </p>
                        <h3 className="text-[22px] sm:text-[28px] md:text-[32px] text-slate-900 leading-tight tracking-tight mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                          Votre conseiller médical personnel
                        </h3>
                        <p className="text-[13px] md:text-[14px] text-slate-500 leading-relaxed max-w-[420px] text-center mb-12">
                          Décrivez votre situation en langage naturel. Notre IA analysera votre demande pour vous orienter vers les meilleures options du réseau.
                        </p>

                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                        {[
                            { label: 'Recommandation', desc: 'Orientation clinique selon pathologie, budget et pays' },
                            { label: 'Comparaison', desc: 'Analyse d\'expertise médicale et des accréditations' },
                            { label: 'Estimation', desc: 'Génération de devis tout compris et logistique' },
                        ].map((cap, i) => (
                            <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="flex flex-col items-center text-center px-5 py-6 bg-white border border-slate-150 shadow-sm hover:border-brand-teal/30 hover:shadow-md transition-all rounded-sm"
                            >
                              <p className="text-[15px] font-bold text-slate-900 leading-none mb-3" style={{ fontFamily: 'Georgia, serif' }}>{cap.label}</p>
                              <p className="text-[11px] text-slate-500 leading-relaxed">{cap.desc}</p>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                  </div>

                  {/* AI Input Fixed Bottom */}
                  <div className="shrink-0 bg-white border-t border-slate-150 px-4 sm:px-6 py-4 sm:pb-6">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2.5 ml-1">
                      Suggestions rapides
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {AI_PROMPTS.slice(0, 3).map(p => (
                        <button
                          key={p}
                          onClick={() => setAiQuery(p)}
                          className="text-[10px] font-medium text-slate-600 border border-slate-200 bg-white px-3 py-1.5 hover:border-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-colors text-left"
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <div className="relative bg-white border border-slate-200 focus-within:border-brand-teal focus-within:shadow-[0_4px_20px_-6px_rgba(72,156,140,0.15)] transition-all">
                      <textarea
                        ref={aiInputRef}
                        value={aiQuery}
                        onChange={e => setAiQuery(e.target.value)}
                        placeholder="Ex : Je cherche une clinique pour un BBL à Istanbul, budget 4 000 €..."
                        rows={2}
                        style={{ touchAction: 'manipulation' }}
                        className="w-full bg-white text-base sm:text-[13px] text-slate-800 placeholder:text-slate-400 outline-none resize-none px-4 py-3.5 leading-relaxed"
                      />
                      <div className="flex justify-between items-center px-4 pb-3 pt-1">
                        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <CornerDownLeft size={10} /> Connexion API en cours
                        </span>
                        <button
                          disabled
                          className="h-8 px-4 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-brand-teal transition-colors disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400 font-bold text-[10px] uppercase tracking-wider"
                        >
                          Analyser <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
