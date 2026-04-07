'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, MapPin, Star, StarHalf, Check, Globe, Route,
  Heart, HeartPulse, Baby, Eye, Brain, Bone, Scissors,
  Syringe, Droplets, Scan, Dna, Ribbon,
  type LucideIcon,
} from 'lucide-react'

/* ── Premium mark — bespoke rotated diamond (matches DiamondH design pattern) ── */
function PremiumMark({ size = 22 }: { size?: number }) {
  const inner = size * 0.55
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="absolute rotate-45 border-[1.5px] border-brand-teal bg-brand-teal/10"
        style={{ width: inner, height: inner }}
      />
      <div
        className="absolute rotate-45 bg-brand-teal"
        style={{ width: inner * 0.32, height: inner * 0.32 }}
      />
    </div>
  )
}
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  NAV_DESTINATIONS, NAV_CLINICS, NAV_SPECIALTY_DATA,
  NAV_SERVICES, NAV_SERVICES_PREMIUM,
  type ClinicEntry,
} from '@/lib/data/homepage'
import { SPECIALTY_SUBS } from '@/lib/data/specialties'
import { SUBSPECIALTY_DETAILS } from '@/lib/data/subspecialty-details'
import { SERVICE_DETAILS, PREMIUM_SERVICE_DETAILS } from '@/lib/data/service-details'
import { HOW_STEPS } from './NavHowItWorks'

/* ── Icons ─────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  dna: Dna, baby: Baby, scissors: Scissors, syringe: Syringe,
  eye: Eye, heartpulse: HeartPulse, heart: Heart, brain: Brain,
  bone: Bone, droplets: Droplets, scan: Scan, ribbon: Ribbon,
}
const getIcon = (k: string): LucideIcon => ICON_MAP[k] || Globe

const COUNTRY_NAME: Record<string, string> = { ma: 'Maroc', tn: 'Tunisie', fr: 'France', tr: 'Turquie' }
const BADGE_LABEL: Record<string, string> = {
  'meilleur-resultat': 'Meilleur résultat',
  'recommande': 'Recommandé',
  'meilleur-prix': 'Meilleur prix',
}

/* ── Stars ─────────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating), half = rating % 1 !== 0, empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} size={9} className="fill-amber-400 text-amber-400" />)}
      {half && <StarHalf size={9} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} size={9} className="fill-slate-200 text-slate-200" />)}
      <span className="text-[10px] font-bold text-slate-500 ml-0.5">{rating}</span>
    </span>
  )
}

/* ── View stack types ──────────────────────────────────────── */
type View =
  | { type: 'root' }
  | { type: 'destinations' }
  | { type: 'country'; code: string }
  | { type: 'specialties' }
  | { type: 'specialty'; name: string }
  | { type: 'subspecialty'; specName: string; subName: string }
  | { type: 'services' }
  | { type: 'service'; name: string }
  | { type: 'premium' }
  | { type: 'premiumService'; name: string }
  | { type: 'how' }

interface Props {
  closeMenu: () => void
  onSelectClinic: (c: ClinicEntry) => void
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR MOBILE — Drill-down navigation < lg
   ══════════════════════════════════════════════════════════════ */
export function NavbarMobile({ closeMenu, onSelectClinic }: Props) {
  const [stack, setStack] = useState<View[]>([{ type: 'root' }])
  const current = stack[stack.length - 1]
  const push = (v: View) => setStack(s => [...s, v])
  const back = () => setStack(s => (s.length > 1 ? s.slice(0, -1) : s))

  /* Title */
  const title = (() => {
    switch (current.type) {
      case 'root':           return 'Explorer'
      case 'destinations':   return 'Destinations'
      case 'country':        return NAV_DESTINATIONS.find(d => d.code === current.code)?.name || ''
      case 'specialties':    return 'Spécialités'
      case 'specialty':      return current.name
      case 'subspecialty':   return current.subName
      case 'services':       return 'Services Inclus'
      case 'service':        return current.name
      case 'premium':        return 'Services Premium'
      case 'premiumService': return current.name
      case 'how':            return 'Comment ça marche'
    }
  })()

  /* Subtitle */
  const subtitle = (() => {
    switch (current.type) {
      case 'root':         return 'Naviguez par section'
      case 'destinations': return `${NAV_DESTINATIONS.length} hubs · ${NAV_CLINICS.length} établissements`
      case 'country':      return `${NAV_CLINICS.filter(c => c.code === current.code).length} établissements partenaires`
      case 'specialties':  return `${NAV_SPECIALTY_DATA.length} spécialités médicales`
      case 'specialty': {
        const subs = SPECIALTY_SUBS[current.name] || []
        const count = subs.reduce((n, g) => n + g.items.length, 0)
        return count > 0 ? `${count} sous-spécialités disponibles` : 'Détails de la spécialité'
      }
      case 'subspecialty':   return SUBSPECIALTY_DETAILS[current.subName]?.description || ''
      case 'services':       return `${NAV_SERVICES.length} services dans chaque séjour`
      case 'service':        return SERVICE_DETAILS[current.name]?.headline || ''
      case 'premium':        return `${NAV_SERVICES_PREMIUM.length} services exclusifs en option`
      case 'premiumService': return PREMIUM_SERVICE_DETAILS[current.name]?.headline || ''
      case 'how':            return 'Un parcours en 4 étapes, conçu pour la sérénité'
    }
  })()

  /* Eyebrow */
  const eyebrow = (() => {
    if (current.type === 'subspecialty') return current.specName
    if (current.type === 'country') return 'Établissements partenaires'
    if (current.type === 'specialty') return 'Spécialité médicale'
    if (current.type === 'service' || current.type === 'premiumService') return current.type === 'premiumService' ? 'Service Premium' : 'Service Inclus'
    if (current.type === 'how') return 'Parcours patient'
    return 'MediBridge'
  })()

  return (
    <div className="flex-1 min-h-0 flex flex-col lg:hidden">

      {/* ── Header — back + breadcrumb ─────────────────────── */}
      <div className="shrink-0 px-5 pt-5 pb-5 border-b border-slate-100 bg-[#fafafa]">
        {stack.length > 1 ? (
          <button
            onClick={back}
            className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-brand-teal mb-2.5 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={13} /> Retour
          </button>
        ) : (
          <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.22em] mb-1.5">
            {eyebrow}
          </p>
        )}
        {stack.length > 1 && (
          <p className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.22em] mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="text-[22px] sm:text-[24px] text-slate-900 leading-tight tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-[12px] text-slate-500 mt-1.5 leading-snug line-clamp-2">{subtitle}</p>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(current)}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="px-5 py-6"
          >

            {/* ════ ROOT ════════════════════════════════════════ */}
            {current.type === 'root' && (
              <div className="space-y-3">
                {[
                  { label: 'Destinations & Cliniques', sub: `${NAV_DESTINATIONS.length} hubs · ${NAV_CLINICS.length} établissements`, view: { type: 'destinations' } as View, Icon: Globe as LucideIcon, premium: false },
                  { label: 'Spécialités Médicales', sub: `${NAV_SPECIALTY_DATA.length} spécialités · centaines de procédures`, view: { type: 'specialties' } as View, Icon: Dna as LucideIcon, premium: false },
                  { label: 'Services Inclus', sub: `${NAV_SERVICES.length} services dans chaque séjour`, view: { type: 'services' } as View, Icon: Check as LucideIcon, premium: false },
                  { label: 'Services Premium', sub: `${NAV_SERVICES_PREMIUM.length} services exclusifs en option`, view: { type: 'premium' } as View, Icon: null, premium: true },
                  { label: 'Comment ça marche', sub: `Parcours patient en ${HOW_STEPS.length} étapes`, view: { type: 'how' } as View, Icon: Route as LucideIcon, premium: false },
                ].map(card => (
                  <button
                    key={card.label}
                    onClick={() => push(card.view)}
                    className={`group flex items-center gap-4 w-full text-left p-5 bg-white border transition-all
                      ${card.premium
                        ? 'border-brand-teal/15 hover:border-brand-teal/40 hover:bg-brand-teal/[0.03]'
                        : 'border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02]'
                      }`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center shrink-0 transition-colors
                      ${card.premium
                        ? 'bg-transparent'
                        : 'bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal'
                      }`}>
                      {card.premium ? <PremiumMark size={26} /> : card.Icon && <card.Icon size={22} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{card.label}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{card.sub}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-brand-teal group-hover:translate-x-0.5 shrink-0 transition-all" />
                  </button>
                ))}
              </div>
            )}

            {/* ════ DESTINATIONS — country list ═════════════════ */}
            {current.type === 'destinations' && (
              <div className="space-y-2">
                {NAV_DESTINATIONS.map(dest => {
                  const count = NAV_CLINICS.filter(c => c.code === dest.code).length
                  return (
                    <button
                      key={dest.code}
                      onClick={() => push({ type: 'country', code: dest.code })}
                      className="group flex items-center gap-4 w-full text-left p-4 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                    >
                      <Image src={`https://flagcdn.com/w80/${dest.code}.png`} alt={dest.name} width={36} height={26} className="w-9 h-auto rounded-[2px] shadow-sm shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{dest.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{dest.type}</p>
                      </div>
                      <div className="text-right shrink-0 mr-1">
                        <p className="text-[15px] font-bold text-slate-700 leading-none">{count}</p>
                        <p className="text-[8px] text-slate-400 uppercase tracking-wider mt-0.5">étabts</p>
                      </div>
                      <ArrowRight size={13} className="text-slate-300 group-hover:text-brand-teal shrink-0 transition-all" />
                    </button>
                  )
                })}
              </div>
            )}

            {/* ════ COUNTRY — clinics list ══════════════════════ */}
            {current.type === 'country' && (() => {
              const list = NAV_CLINICS.filter(c => c.code === current.code)
              const hosps = list.filter(c => c.category === 'hôpital')
              const clins = list.filter(c => c.category === 'clinique')
              const renderClinic = (clinic: ClinicEntry, i: number) => (
                <button
                  key={`${clinic.name}-${i}`}
                  onClick={() => onSelectClinic(clinic)}
                  className="group flex items-start gap-3 w-full text-left p-3.5 bg-white border border-slate-100 hover:border-brand-teal/20 transition-all"
                >
                  <div className="w-9 h-9 bg-slate-50 flex items-center justify-center shrink-0">
                    <Image src={`https://flagcdn.com/w40/${clinic.code}.png`} alt="" width={20} height={14} className="w-5 h-auto" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors leading-snug">{clinic.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin size={9} className="text-slate-400 shrink-0" />
                      <span className="text-[10px] text-slate-500">{clinic.loc}</span>
                      <span className="text-slate-300 text-[10px]">·</span>
                      <Stars rating={Number(clinic.rating)} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2">{clinic.spec}</p>
                  </div>
                  <ArrowRight size={11} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-1 transition-all" />
                </button>
              )
              return (
                <div className="space-y-6">
                  {hosps.length > 0 && (
                    <div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2.5 pl-2 border-l-2 border-brand-teal">Hôpitaux</p>
                      <div className="space-y-2">{hosps.map(renderClinic)}</div>
                    </div>
                  )}
                  {clins.length > 0 && (
                    <div>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2.5 pl-2 border-l-2 border-slate-300">Cliniques</p>
                      <div className="space-y-2">{clins.map(renderClinic)}</div>
                    </div>
                  )}
                  {list.length === 0 && (
                    <p className="text-[12px] text-slate-400 italic text-center py-12">Couverture en cours de déploiement.</p>
                  )}
                </div>
              )
            })()}

            {/* ════ SPECIALTIES — list ══════════════════════════ */}
            {current.type === 'specialties' && (
              <div className="space-y-2">
                {NAV_SPECIALTY_DATA.map(spec => {
                  const Icon = getIcon(spec.iconKey)
                  const subCount = (SPECIALTY_SUBS[spec.name] || []).reduce((n, g) => n + g.items.length, 0)
                  return (
                    <button
                      key={spec.name}
                      onClick={() => push({ type: 'specialty', name: spec.name })}
                      className="group flex items-start gap-4 w-full text-left p-4 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal transition-colors shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{spec.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{spec.desc}</p>
                        {subCount > 0 && (
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1.5">{subCount} sous-spécialités</p>
                        )}
                      </div>
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-1 transition-all" />
                    </button>
                  )
                })}
              </div>
            )}

            {/* ════ SPECIALTY — sub-specs + hubs ════════════════ */}
            {current.type === 'specialty' && (() => {
              const spec = NAV_SPECIALTY_DATA.find(s => s.name === current.name)
              if (!spec) return null
              const subs = SPECIALTY_SUBS[spec.name] || []
              const hubs = NAV_DESTINATIONS.map(d => {
                const matched = NAV_CLINICS.filter(c => c.code === d.code && c.specialties.includes(spec.name))
                const isReco = spec.recommended.includes(d.code)
                return { ...d, clinics: matched, isReco }
              }).filter(h => h.clinics.length > 0 || h.isReco)
                .sort((a, b) => (b.isReco ? 1 : 0) - (a.isReco ? 1 : 0))

              return (
                <div className="space-y-8">

                  {/* Sub-specialties */}
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                      Sous-spécialités & procédures
                    </p>
                    {subs.length > 0 ? (
                      <div className="space-y-4">
                        {subs.map(group => (
                          <div key={group.cat}>
                            <p className="text-[10px] font-bold text-slate-600 mb-2 pl-2 border-l-2 border-brand-teal/30">{group.cat}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {group.items.map(item => {
                                const has = !!SUBSPECIALTY_DETAILS[item]
                                return (
                                  <button
                                    key={item}
                                    onClick={() => has && push({ type: 'subspecialty', specName: spec.name, subName: item })}
                                    className={`px-2.5 py-1 text-[11px] font-medium border transition-colors text-left
                                      ${has
                                        ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-brand-teal/10 hover:border-brand-teal/30 hover:text-brand-teal cursor-pointer'
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
                        {spec.subSpecialties.map(s => (
                          <span key={s} className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hubs */}
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                      Hubs disponibles
                    </p>
                    {hubs.length > 0 ? (
                      <div className="space-y-2">
                        {hubs.map(hub => (
                          <div key={hub.code} className={`border ${hub.isReco ? 'border-brand-teal/30 bg-brand-teal/[0.03]' : 'border-slate-100 bg-white'}`}>
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center gap-2.5">
                                <Image src={`https://flagcdn.com/w40/${hub.code}.png`} alt={hub.name} width={20} height={14} className="w-5 h-auto rounded-[2px] shadow-sm shrink-0" />
                                <span className="text-[13px] font-bold text-slate-900">{hub.name}</span>
                              </div>
                              {hub.isReco && (
                                <span className="flex items-center gap-1 text-[9px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/10 px-2 py-0.5">
                                  <Check size={9} /> Recommandé
                                </span>
                              )}
                            </div>
                            {hub.clinics.length > 0 && (
                              <div className="px-3 pb-2.5 space-y-0.5 border-t border-slate-50 pt-1">
                                {hub.clinics.map((c, i) => (
                                  <button
                                    key={i}
                                    onClick={() => onSelectClinic(c)}
                                    className="group flex items-center gap-2 w-full text-left py-1.5 text-[11px] text-slate-600 hover:text-brand-teal transition-colors"
                                  >
                                    <MapPin size={9} className="text-slate-300 shrink-0" />
                                    <span className="font-semibold truncate">{c.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Hubs en cours de déploiement.</p>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* ════ SUBSPECIALTY — top 3 ════════════════════════ */}
            {current.type === 'subspecialty' && (() => {
              const detail = SUBSPECIALTY_DETAILS[current.subName]
              if (!detail) return null
              return (
                <div>
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6 pb-5 border-b border-slate-100">
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Réussite</p>
                      <p className="text-[13px] font-bold text-slate-900">{detail.successRate}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Séjour</p>
                      <p className="text-[13px] font-bold text-slate-900">{detail.stayDuration}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tarif</p>
                      <p className="text-[13px] font-bold text-slate-900">{detail.priceRange}</p>
                    </div>
                  </div>

                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Top 3 établissements
                  </p>
                  <div className="space-y-3">
                    {detail.top3.map((entry, i) => (
                      <div key={i} className="border border-slate-100 p-3.5 bg-white">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <div className="w-8 h-6 bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                              <Image src={`https://flagcdn.com/w40/${entry.countryCode}.png`} alt="" width={20} height={14} className="w-5 h-auto" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-bold text-slate-900 leading-snug">{entry.clinicName}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] text-slate-400">{COUNTRY_NAME[entry.countryCode]}</span>
                                <span className="text-slate-200">·</span>
                                <Stars rating={entry.rating} />
                              </div>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-brand-teal bg-brand-teal/5 border border-brand-teal/15 px-1.5 py-0.5 shrink-0 whitespace-nowrap">
                            {BADGE_LABEL[entry.badge]}
                          </span>
                        </div>
                        <div className="flex items-end justify-between gap-3 pt-2.5 border-t border-slate-50">
                          <p className="text-[10px] text-slate-600 leading-snug flex-1 min-w-0">
                            <span className="font-semibold text-slate-700">{entry.doctorName}</span> — {entry.doctorDesc}
                          </p>
                          <p className="text-[13px] font-bold text-slate-900 shrink-0">{entry.priceFrom}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-slate-50 border border-slate-100">
                    <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                      Obtenez une estimation personnalisée pour cette procédure et découvrez les réductions MediBridge.
                    </p>
                    <Link href="/register" onClick={closeMenu}>
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-[12px] font-bold rounded-none">
                        Demander un devis personnalisé <ArrowRight size={13} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })()}

            {/* ════ SERVICES / PREMIUM — list ═══════════════════ */}
            {(current.type === 'services' || current.type === 'premium') && (() => {
              const list = current.type === 'services' ? NAV_SERVICES : NAV_SERVICES_PREMIUM
              const isPremium = current.type === 'premium'
              return (
                <div className="space-y-2">
                  {list.map((svc, idx) => (
                    <button
                      key={svc.name}
                      onClick={() => push(isPremium
                        ? { type: 'premiumService', name: svc.name }
                        : { type: 'service', name: svc.name }
                      )}
                      className="group flex items-start gap-4 w-full text-left p-4 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                    >
                      <div className={`w-10 h-10 flex items-center justify-center shrink-0 transition-colors text-[12px] font-bold
                        ${isPremium
                          ? 'bg-transparent'
                          : 'bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal'
                        }`}>
                        {isPremium ? <PremiumMark size={22} /> : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{svc.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{svc.desc}</p>
                      </div>
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-1 transition-all" />
                    </button>
                  ))}
                </div>
              )
            })()}

            {/* ════ SERVICE / PREMIUM — detail ══════════════════ */}
            {(current.type === 'service' || current.type === 'premiumService') && (() => {
              const isPremium = current.type === 'premiumService'
              const detail = isPremium ? PREMIUM_SERVICE_DETAILS[current.name] : SERVICE_DETAILS[current.name]
              if (!detail) return null
              return (
                <div>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-7">{detail.description}</p>

                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Comment ça fonctionne
                  </p>
                  <div className="space-y-4 mb-7">
                    {detail.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className={`w-7 h-7 flex items-center justify-center text-[12px] font-bold shrink-0
                          ${isPremium ? 'bg-brand-teal/10 text-brand-teal' : 'bg-slate-100 text-slate-500'}`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-bold text-slate-800">{step.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                      Points clés
                    </p>
                    <div className="space-y-2.5">
                      {detail.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <Check size={12} className="text-brand-teal shrink-0" />
                          <span className="text-[12px] font-medium text-slate-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-6 p-4 border ${isPremium ? 'bg-brand-teal/[0.04] border-brand-teal/15' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                      {isPremium
                        ? 'Service premium disponible en option — contactez-nous pour un devis sur mesure.'
                        : 'Inclus dans votre accompagnement MediBridge — aucun supplément.'}
                    </p>
                    <Link href="/register" onClick={closeMenu}>
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-[12px] font-bold rounded-none">
                        {isPremium ? 'Demander un devis premium' : 'Commencer mon accompagnement'} <ArrowRight size={13} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })()}

            {/* ════ HOW IT WORKS — timeline ═════════════════════ */}
            {current.type === 'how' && (
              <div className="relative">

                {/* Vertical connecting line — stops before CTA */}
                <div className="absolute left-[19px] top-6 bottom-48 w-px bg-gradient-to-b from-brand-teal/40 via-slate-200 to-transparent" />

                <div className="space-y-8">
                  {HOW_STEPS.map((step, idx) => (
                    <div key={idx} className="relative grid grid-cols-[40px_1fr] gap-4">

                      {/* Step marker */}
                      <div className="relative z-10 flex items-start justify-center pt-0.5">
                        <div className="relative w-10 h-10 bg-white border border-brand-teal/30 flex items-center justify-center shadow-sm">
                          <span className="text-[11px] font-bold text-brand-teal tabular-nums tracking-wider">{step.num}</span>
                          <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 rotate-45 bg-brand-teal" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pb-1 min-w-0">
                        {/* Eyebrow + duration */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <step.Icon size={10} className="text-brand-teal" />
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.18em]">{step.eyebrow}</p>
                          </div>
                          <div className="h-px flex-1 bg-slate-150" />
                          <span className="text-[9px] text-slate-400 font-semibold tabular-nums whitespace-nowrap">{step.duration}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[16px] text-slate-900 tracking-tight leading-snug mb-1.5" style={{ fontFamily: 'Georgia, serif' }}>
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
                          {step.desc}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-col gap-1">
                          {step.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <Check size={9} className="text-brand-teal shrink-0" />
                              <span className="text-[10px] font-medium text-slate-600">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-[12px] font-bold text-slate-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                    Prêt à commencer votre parcours ?
                  </p>
                  <p className="text-[11px] text-slate-500 mb-4 leading-snug">
                    Obtenez une première analyse de votre dossier en moins de 48 heures.
                  </p>
                  <Link href="/register" onClick={closeMenu}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-[12px] font-bold rounded-none">
                      Démarrer mon parcours <ArrowRight size={13} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
