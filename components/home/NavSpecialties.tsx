'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, Check, MapPin, Star, StarHalf,
  Heart, HeartPulse, Baby, Eye, Brain, Bone, Scissors,
  Syringe, Droplets, Scan, Dna, Ribbon,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  NAV_DESTINATIONS, NAV_CLINICS, NAV_SERVICES_PREMIUM,
  type SpecialtyEntry, type ClinicEntry,
} from '@/lib/data/homepage'
import { SPECIALTY_SUBS } from '@/lib/data/specialties'
import { SUBSPECIALTY_DETAILS } from '@/lib/data/subspecialty-details'
import { SERVICE_DETAILS, PREMIUM_SERVICE_DETAILS } from '@/lib/data/service-details'

/* ── Icon map ──────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  dna: Dna, baby: Baby, scissors: Scissors, syringe: Syringe,
  eye: Eye, heartpulse: HeartPulse, heart: Heart, brain: Brain,
  bone: Bone, droplets: Droplets, scan: Scan, ribbon: Ribbon,
}
function getIcon(key: string): LucideIcon { return ICON_MAP[key] || Globe }

/* ── Stars (reusable) ──────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating), half = rating % 1 !== 0, empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} size={10} className="fill-amber-400 text-amber-400" />)}
      {half && <StarHalf size={10} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} size={10} className="fill-slate-200 text-slate-200" />)}
      <span className="text-[10px] font-bold text-slate-500 ml-0.5">{rating}</span>
    </span>
  )
}

/* ── Diamond separator ─────────────────────────────────────────────── */
function DiamondH() {
  return (
    <div className="flex items-center gap-4 py-8 select-none">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rotate-45 bg-slate-300" />
        <div className="w-2.5 h-2.5 rotate-45 border border-brand-teal bg-brand-teal/10" />
        <div className="w-1.5 h-1.5 rotate-45 bg-slate-300" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  )
}

/* ── Clinic card (reusable) ────────────────────────────────────────── */
function ClinicCard({ clinic, onSelect }: { clinic: ClinicEntry; onSelect: (c: ClinicEntry) => void }) {
  return (
    <button
      onClick={() => onSelect(clinic)}
      className="group flex items-center gap-2.5 w-full text-left py-2 px-2 hover:bg-slate-50 transition-colors text-[11px] text-slate-600"
    >
      <MapPin size={9} className="text-slate-300 shrink-0" />
      <span className="font-semibold group-hover:text-brand-teal transition-colors">{clinic.name}</span>
      <span className="text-slate-300">·</span>
      <span className="text-slate-400">{clinic.loc}</span>
      <span className="text-slate-300">·</span>
      <Stars rating={clinic.rating} />
      <ArrowRight size={10} className="text-slate-200 group-hover:text-brand-teal ml-auto shrink-0 transition-colors" />
    </button>
  )
}

/* ── Country labels ────────────────────────────────────────────────── */
const COUNTRY: Record<string, string> = { ma: 'Maroc', tn: 'Tunisie', fr: 'France', tr: 'Turquie' }

/* ── Badge labels ──────────────────────────────────────────────────── */
const BADGE_LABEL: Record<string, string> = {
  'meilleur-resultat': 'Meilleur résultat',
  'recommande': 'Recommandé',
  'meilleur-prix': 'Meilleur prix',
}

/* ══════════════════════════════════════════════════════════════════════
   NAV SPECIALTIES — Right panel for Spécialités & Services
   ══════════════════════════════════════════════════════════════════════ */
interface Props {
  selectedSpecialty: string | null
  onSelect:        (name: string | null) => void
  onSelectClinic:  (clinic: ClinicEntry) => void
  filteredSpecialties: SpecialtyEntry[]
  filteredServices:    { name: string; desc: string; iconKey: string }[]
  closeMenu: () => void
}

export function NavSpecialties({
  selectedSpecialty,
  onSelect,
  onSelectClinic,
  filteredSpecialties,
  filteredServices,
  closeMenu,
}: Props) {

  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedPremium, setSelectedPremium] = useState<string | null>(null)

  const selected = filteredSpecialties.find(s => s.name === selectedSpecialty) || null

  /* Sub-specialties from data file */
  const subCategories = selected ? (SPECIALTY_SUBS[selected.name] || []) : []
  const subCount = subCategories.reduce((n, g) => n + g.items.length, 0)

  /* All sub items flat (for left panel in sub-detail view) */
  const allSubItems = useMemo(() => subCategories.flatMap(g => g.items), [subCategories])

  /* Current sub-specialty detail */
  const subDetail = selectedSub ? SUBSPECIALTY_DETAILS[selectedSub] || null : null

  /* Matching hubs for the selected specialty */
  const matchingHubs = useMemo(() => {
    if (!selected) return []
    return NAV_DESTINATIONS.map(d => {
      const matchedClinics = NAV_CLINICS.filter(
        c => c.code === d.code && c.specialties.includes(selected.name)
      )
      const isRecommended = selected.recommended.includes(d.code)
      return { ...d, clinics: matchedClinics, isRecommended }
    }).filter(h => h.clinics.length > 0 || h.isRecommended)
      .sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0))
  }, [selected])

  /* Reset sub when switching specialty */
  const handleSelectSpecialty = (name: string | null) => {
    setSelectedSub(null)
    onSelect(name)
  }

  return (
    <div className="p-8 sm:p-10 lg:p-12">

      {/* ── Header ── */}
      <div className="mb-8">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-1">
          {selectedSub ? selected?.name : selected ? selected.name : 'Expertise médicale'}
        </p>
        <h2 className="text-2xl sm:text-3xl text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          {selectedSub || (selected ? 'Détail de la spécialité' : 'Spécialités & Services')}
        </h2>
        <p className="text-[13px] text-slate-500 mt-1">
          {selectedSub && subDetail
            ? subDetail.description
            : selected
              ? selected.desc
              : `${filteredSpecialties.length} spécialités médicales et ${filteredServices.length} services inclus`}
        </p>
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">

        {/* ═══════════════════════════════════════════════════════════
           LEVEL 3 — Sub-specialty detail (inline, no modal)
           ═══════════════════════════════════════════════════════════ */}
        {selectedSub && subDetail && selected ? (
          <motion.div
            key="sub-detail"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Back */}
            <button
              onClick={() => setSelectedSub(null)}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-brand-teal transition-colors mb-6"
            >
              <ArrowLeft size={13} /> {selected.name}
            </button>

            <div className="flex gap-0 items-stretch">

              {/* LEFT: Sub-specialty list */}
              <div className="w-[160px] lg:w-[190px] shrink-0 pr-3 border-r border-slate-100 space-y-0.5 max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {allSubItems.map(item => {
                  const isActive = item === selectedSub
                  const hasData = !!SUBSPECIALTY_DETAILS[item]
                  return (
                    <button
                      key={item}
                      onClick={() => hasData && setSelectedSub(item)}
                      className={`flex items-center gap-1.5 w-full text-left px-2 py-1.5 text-[10px] leading-tight transition-all
                        ${isActive
                          ? 'bg-brand-teal/10 text-brand-teal font-bold border-l-2 border-brand-teal'
                          : hasData
                            ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-2 border-transparent'
                            : 'text-slate-300 border-l-2 border-transparent cursor-default'
                        }`}
                    >
                      <span className="line-clamp-2">{item}</span>
                    </button>
                  )
                })}
              </div>

              {/* RIGHT: Sub-specialty detail */}
              <div className="flex-1 pl-6 min-w-0">

                {/* Key metrics — horizontal */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Taux de réussite</p>
                    <p className="text-[15px] font-bold text-slate-900">{subDetail.successRate}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Durée de séjour</p>
                    <p className="text-[15px] font-bold text-slate-900">{subDetail.stayDuration}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tarif indicatif</p>
                    <p className="text-[15px] font-bold text-slate-900">{subDetail.priceRange}</p>
                  </div>
                </div>

                {/* Top 3 establishments */}
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-4">
                  Top 3 établissements pour cette spécialité
                </p>

                <div className="space-y-4">
                  {subDetail.top3.map((entry, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-100 hover:border-slate-200 transition-all"
                    >
                      {/* Clinic header */}
                      <div className="flex items-start justify-between p-4 pb-3">
                        <div className="flex items-start gap-3">
                          {/* Flag */}
                          <div className="w-9 h-6 bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden mt-0.5">
                            <Image
                              src={`https://flagcdn.com/w40/${entry.countryCode}.png`}
                              alt={COUNTRY[entry.countryCode] || ''}
                              width={24} height={16}
                              className="w-6 h-auto"
                            />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-slate-900">{entry.clinicName}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-slate-400">{COUNTRY[entry.countryCode]}</span>
                              <span className="text-slate-200">·</span>
                              <Stars rating={entry.rating} />
                            </div>
                          </div>
                        </div>

                        {/* Badge */}
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-teal bg-brand-teal/5 border border-brand-teal/15 px-2 py-0.5 shrink-0">
                          {BADGE_LABEL[entry.badge]}
                        </span>
                      </div>

                      {/* Doctor + price */}
                      <div className="px-4 pb-4 flex items-end justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-700">{entry.doctorName}</span>
                            {' — '}
                            {entry.doctorDesc}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[15px] font-bold text-slate-900">{entry.priceFrom}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 p-4 bg-slate-50 border border-slate-100">
                  <p className="text-[12px] text-slate-500 mb-3">
                    Obtenez une estimation personnalisée et découvrez les réductions disponibles via MediBridge.
                  </p>
                  <Link href="/register" onClick={closeMenu}>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 h-10 text-[13px] font-bold shadow-sm rounded-none">
                      Demander un devis personnalisé <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        ) : selected ? (
          /* ═══════════════════════════════════════════════════════════
             LEVEL 2 — Specialty detail (split: compact list | detail)
             ═══════════════════════════════════════════════════════════ */
          <motion.div
            key="spec-detail"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Back */}
            <button
              onClick={() => handleSelectSpecialty(null)}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-brand-teal transition-colors mb-6"
            >
              <ArrowLeft size={13} /> Toutes les spécialités
            </button>

            <div className="flex gap-0 items-stretch">

              {/* LEFT: Compact specialty list */}
              <div className="w-[160px] lg:w-[190px] shrink-0 pr-3 border-r border-slate-100 space-y-0.5">
                {filteredSpecialties.map(spec => {
                  const Icon = getIcon(spec.iconKey)
                  const isActive = spec.name === selectedSpecialty
                  return (
                    <button
                      key={spec.name}
                      onClick={() => handleSelectSpecialty(spec.name)}
                      className={`flex items-center gap-2 w-full text-left px-2 py-2 text-[11px] transition-all
                        ${isActive
                          ? 'bg-brand-teal/10 text-brand-teal font-bold border-l-2 border-brand-teal'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-2 border-transparent'
                        }`}
                    >
                      <Icon size={13} className="shrink-0" />
                      <span className="truncate">{spec.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* RIGHT: Detail panel */}
              <div className="flex-1 pl-6 min-w-0 overflow-y-auto">

                {/* Specialty icon + title */}
                {(() => {
                  const Icon = getIcon(selected.iconKey)
                  return (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 text-brand-teal shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900">{selected.name}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {subCount} sous-spécialités · {matchingHubs.length} hub{matchingHubs.length > 1 ? 's' : ''} disponible{matchingHubs.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )
                })()}

                {/* Sub-specialties grouped by category — CLICKABLE */}
                <div className="mb-8">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-4">
                    Sous-spécialités & procédures
                  </p>

                  {subCategories.length > 0 ? (
                    <div className="space-y-5">
                      {subCategories.map(group => (
                        <div key={group.cat}>
                          <p className="text-[10px] font-bold text-slate-600 mb-2 pl-2 border-l-2 border-brand-teal/30">
                            {group.cat}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {group.items.map(item => {
                              const hasDetail = !!SUBSPECIALTY_DETAILS[item]
                              return (
                                <button
                                  key={item}
                                  onClick={() => hasDetail && setSelectedSub(item)}
                                  className={`px-2 py-0.5 text-[10px] font-medium border transition-colors text-left
                                    ${hasDetail
                                      ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-brand-teal/10 hover:border-brand-teal/30 hover:text-brand-teal cursor-pointer'
                                      : 'bg-slate-50 text-slate-400 border-slate-150 cursor-default'
                                    }`}
                                >
                                  {item}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selected.subSpecialties.map(sub => (
                        <span key={sub} className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Matching hubs */}
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Hubs disponibles pour {selected.name}
                  </p>

                  {matchingHubs.length > 0 ? (
                    <div className="space-y-3">
                      {matchingHubs.map(hub => (
                        <div
                          key={hub.code}
                          className={`border transition-all
                            ${hub.isRecommended
                              ? 'border-brand-teal/30 bg-brand-teal/[0.03]'
                              : 'border-slate-100 bg-white hover:border-slate-200'
                            }`}
                        >
                          <div className="flex items-center justify-between p-3 pb-0">
                            <div className="flex items-center gap-2.5">
                              <Image
                                src={`https://flagcdn.com/w40/${hub.code}.png`}
                                alt={hub.name} width={20} height={14}
                                className="w-5 h-auto rounded-[2px] shadow-sm shrink-0"
                              />
                              <span className="text-[13px] font-bold text-slate-900">{hub.name}</span>
                              <span className="text-[10px] text-slate-400">{hub.type}</span>
                            </div>
                            {hub.isRecommended && (
                              <span className="flex items-center gap-1 text-[9px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/10 px-2 py-0.5">
                                <Check size={10} /> Recommandé
                              </span>
                            )}
                          </div>

                          {hub.clinics.length > 0 && (
                            <div className="px-3 pb-2 pt-1">
                              {hub.clinics.map((clinic, i) => (
                                <ClinicCard key={i} clinic={clinic} onSelect={onSelectClinic} />
                              ))}
                            </div>
                          )}

                          {hub.clinics.length === 0 && hub.isRecommended && (
                            <p className="px-3 pb-3 pt-1 text-[10px] text-slate-400 italic">
                              Hub recommandé — cliniques partenaires en cours d&#39;intégration
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[12px] text-slate-400 italic py-4">
                      Couverture en cours de déploiement sur nos hubs partenaires.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ═══════════════════════════════════════════════════════════
             LEVEL 1 — All specialties grid
             ═══════════════════════════════════════════════════════════ */
          <motion.div
            key="spec-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              {filteredSpecialties.length} spécialités médicales
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
              {filteredSpecialties.map(spec => {
                const Icon = getIcon(spec.iconKey)
                return (
                  <button
                    key={spec.name}
                    onClick={() => handleSelectSpecialty(spec.name)}
                    className="group flex items-start gap-4 py-4 border-b border-slate-100 last:border-0 text-left w-full transition-colors hover:bg-slate-50/60"
                  >
                    <div className="w-9 h-9 flex items-center justify-center bg-slate-100 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal transition-colors shrink-0">
                      <Icon size={17} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">
                          {spec.name}
                        </h4>
                        <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                        {spec.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {filteredSpecialties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400">Aucune spécialité trouvée</p>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Diamond separator (only when not in sub/service/premium detail) ── */}
      {!selectedSub && !selectedService && !selectedPremium && <DiamondH />}

      {/* ── Services inclus ── */}
      {!selectedSub && !selectedPremium && (
        <AnimatePresence mode="wait">

          {selectedService && SERVICE_DETAILS[selectedService] ? (
            /* ═══ SERVICE DETAIL VIEW ═══════════════════════════════ */
            <motion.div
              key="svc-detail"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Back */}
              <button
                onClick={() => setSelectedService(null)}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-brand-teal transition-colors mb-6"
              >
                <ArrowLeft size={13} /> Tous les services
              </button>

              <div className="flex gap-0 items-stretch">

                {/* LEFT: Service list */}
                <div className="w-[160px] lg:w-[190px] shrink-0 pr-3 border-r border-slate-100 space-y-0.5">
                  {filteredServices.map(svc => {
                    const isActive = svc.name === selectedService
                    return (
                      <button
                        key={svc.name}
                        onClick={() => setSelectedService(svc.name)}
                        className={`w-full text-left px-2 py-2 text-[11px] leading-tight transition-all
                          ${isActive
                            ? 'bg-brand-teal/10 text-brand-teal font-bold border-l-2 border-brand-teal'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-2 border-transparent'
                          }`}
                      >
                        {svc.name}
                      </button>
                    )
                  })}
                </div>

                {/* RIGHT: Service detail */}
                {(() => {
                  const svcDetail = SERVICE_DETAILS[selectedService]
                  return (
                    <div className="flex-1 pl-6 min-w-0">
                      {/* Headline */}
                      <h3 className="text-[18px] font-bold text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        {svcDetail.headline}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-8">
                        {svcDetail.description}
                      </p>

                      {/* Steps — numbered */}
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-4">
                        Comment ça fonctionne
                      </p>
                      <div className="space-y-4 mb-8">
                        {svcDetail.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-500 text-[12px] font-bold shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-bold text-slate-800">{step.title}</p>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="border-t border-slate-100 pt-6">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                          Points clés
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {svcDetail.highlights.map((h, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 py-1.5">
                              <Check size={12} className="text-brand-teal shrink-0" />
                              <span className="text-[12px] font-medium text-slate-700">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-8 p-4 bg-slate-50 border border-slate-100">
                        <p className="text-[12px] text-slate-500 mb-3">
                          Tous les services sont inclus dans votre accompagnement MediBridge — aucun supplément.
                        </p>
                        <Link href="/register" onClick={closeMenu}>
                          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 h-10 text-[13px] font-bold shadow-sm rounded-none">
                            Commencer mon accompagnement <ArrowRight size={14} className="ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </motion.div>

          ) : !selectedService ? (
            /* ═══ SERVICES LIST VIEW ═══════════════════════════════ */
            <motion.div
              key="svc-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                Inclus dans chaque séjour
              </p>
              <p className="text-[13px] text-slate-500 mb-6">
                {filteredServices.length} services pour un accompagnement de bout en bout
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                {filteredServices.map((svc, idx) => (
                  <button
                    key={svc.name}
                    onClick={() => setSelectedService(svc.name)}
                    className="group flex items-start gap-4 py-4 border-b border-slate-100 last:border-0 text-left w-full transition-colors hover:bg-slate-50/60"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal transition-colors shrink-0 text-[12px] font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-[13px] font-bold text-slate-800 group-hover:text-brand-teal transition-colors">
                          {svc.name}
                        </h5>
                        <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                        {svc.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <Link href="/register" onClick={closeMenu}>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 h-11 text-[13px] font-bold shadow-lg rounded-none">
                    Demander un devis personnalisé <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : null}

        </AnimatePresence>
      )}

      {/* ── Diamond before premium (only on list views) ── */}
      {!selectedSub && !selectedService && !selectedPremium && <DiamondH />}

      {/* ── Services Premium ── */}
      {!selectedSub && !selectedService && (
        <AnimatePresence mode="wait">

          {selectedPremium && PREMIUM_SERVICE_DETAILS[selectedPremium] ? (
            /* ═══ PREMIUM DETAIL VIEW ═══════════════════════════════ */
            <motion.div
              key="premium-detail"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Back */}
              <button
                onClick={() => setSelectedPremium(null)}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 hover:text-brand-teal transition-colors mb-6"
              >
                <ArrowLeft size={13} /> Services premium
              </button>

              <div className="flex gap-0 items-stretch">

                {/* LEFT: Premium service list */}
                <div className="w-[160px] lg:w-[190px] shrink-0 pr-3 border-r border-slate-100 space-y-0.5">
                  {NAV_SERVICES_PREMIUM.map(svc => {
                    const isActive = svc.name === selectedPremium
                    return (
                      <button
                        key={svc.name}
                        onClick={() => setSelectedPremium(svc.name)}
                        className={`w-full text-left px-2 py-2 text-[11px] leading-tight transition-all
                          ${isActive
                            ? 'bg-brand-teal/10 text-brand-teal font-bold border-l-2 border-brand-teal'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-2 border-transparent'
                          }`}
                      >
                        {svc.name}
                      </button>
                    )
                  })}
                </div>

                {/* RIGHT: Premium detail */}
                {(() => {
                  const premDetail = PREMIUM_SERVICE_DETAILS[selectedPremium]
                  return (
                    <div className="flex-1 pl-6 min-w-0">
                      {/* Headline */}
                      <h3 className="text-[18px] font-bold text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        {premDetail.headline}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-8">
                        {premDetail.description}
                      </p>

                      {/* Steps */}
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-4">
                        Comment ça fonctionne
                      </p>
                      <div className="space-y-4 mb-8">
                        {premDetail.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="w-7 h-7 flex items-center justify-center bg-brand-teal/10 text-brand-teal text-[12px] font-bold shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-bold text-slate-800">{step.title}</p>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="border-t border-slate-100 pt-6">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                          Points clés
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {premDetail.highlights.map((h, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 py-1.5">
                              <Check size={12} className="text-brand-teal shrink-0" />
                              <span className="text-[12px] font-medium text-slate-700">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-8 p-4 bg-brand-teal/[0.04] border border-brand-teal/15">
                        <p className="text-[12px] text-slate-500 mb-3">
                          Ce service premium est disponible en option — contactez-nous pour un devis sur mesure.
                        </p>
                        <Link href="/register" onClick={closeMenu}>
                          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 h-10 text-[13px] font-bold shadow-sm rounded-none">
                            Demander un devis premium <ArrowRight size={14} className="ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </motion.div>

          ) : !selectedPremium ? (
            /* ═══ PREMIUM LIST VIEW ═══════════════════════════════ */
            <motion.div
              key="premium-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em]">
                  Services Premium
                </p>
                <span className="text-[9px] font-bold text-brand-teal/70 bg-brand-teal/8 border border-brand-teal/15 px-2 py-0.5 uppercase tracking-wider">
                  En option
                </span>
              </div>
              <p className="text-[13px] text-slate-500 mb-6">
                {NAV_SERVICES_PREMIUM.length} services exclusifs pour une expérience sur mesure
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                {NAV_SERVICES_PREMIUM.map((svc) => (
                  <button
                    key={svc.name}
                    onClick={() => setSelectedPremium(svc.name)}
                    className="group flex items-start gap-4 py-4 border-b border-slate-100 last:border-0 text-left w-full transition-colors hover:bg-brand-teal/[0.03]"
                  >
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <div className="relative flex items-center justify-center w-[22px] h-[22px]">
                        <div className="absolute rotate-45 border-[1.5px] border-brand-teal bg-brand-teal/10 w-3 h-3" />
                        <div className="absolute rotate-45 bg-brand-teal w-1 h-1" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-[13px] font-bold text-slate-800 group-hover:text-brand-teal transition-colors">
                          {svc.name}
                        </h5>
                        <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                        {svc.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}

        </AnimatePresence>
      )}
    </div>
  )
}
