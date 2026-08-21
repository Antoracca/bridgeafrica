'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, MapPin, Star, StarHalf, Check, Globe, Route,
  Heart, HeartPulse, Baby, Eye, Brain, Bone, Scissors,
  Syringe, Droplets, Scan, Dna, Ribbon,
  Wallet, TrendingDown, Calendar, Landmark, BriefcaseBusiness, Shield, Phone,
  BookOpen, Clock, Stethoscope, Sparkle, Quote,
  ClipboardCheck, Languages, Calculator, GitCompare, NotebookPen, PlayCircle,
  ShieldCheck, Activity, Users, LogIn, LogOut, User,
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
import {
  PRICING_PLANS, PRICE_ESTIMATIONS, FINANCING_OPTIONS, GUARANTEES,
} from '@/lib/data/pricing'
import {
  PATIENT_GUIDES, PATIENT_TOOLS, RESOURCE_ARGUMENTS,
  type PatientTool, type ResourceArgument,
} from '@/lib/data/resources'
import {
  IMPACT_STATS, PARTNER_TYPES, ONBOARDING_STEPS,
} from '@/lib/data/partners'
import { Hospital, Handshake, HeartHandshake, TrendingUp, Building2 } from 'lucide-react'

/* ── Financing icon map ────────────────────────────────────── */
const FINANCING_ICONS: Record<string, LucideIcon> = {
  mensuel: Calendar,
  partenaire: Landmark,
  employer: BriefcaseBusiness,
  insurance: Shield,
}

/* ── Tool icon map ─────────────────────────────────────────── */
const TOOL_ICONS: Record<PatientTool['iconKey'], LucideIcon> = {
  clipboard: ClipboardCheck,
  glossary: Languages,
  calculator: Calculator,
  compare: GitCompare,
  logbook: NotebookPen,
  video: PlayCircle,
}

/* ── Argument icon map ─────────────────────────────────────── */
const ARG_ICONS: Record<ResourceArgument['iconKey'], LucideIcon> = {
  brain: Brain,
  shield: ShieldCheck,
  activity: Activity,
  users: Users,
}

/* ── Partner type icon map ─────────────────────────────────── */
const PARTNER_ICONS: Record<string, LucideIcon> = {
  clinics: Hospital,
  insurance: Handshake,
  ngo: HeartHandshake,
  gov: Building2,
}

/* ── Impact icon map ───────────────────────────────────────── */
const IMPACT_ICONS: Record<string, LucideIcon> = {
  patients: Users,
  savings: TrendingUp,
  countries: Globe,
  satisfaction: Star,
  clinics: Hospital,
  response: Clock,
}

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
type PartnerTypeId = 'cliniques' | 'assurances' | 'ong' | 'gouvernements'

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
  | { type: 'partners' }
  | { type: 'partnerType'; id: PartnerTypeId }
  | { type: 'impact' }
  | { type: 'process' }
  | { type: 'pricing' }
  | { type: 'pricingPlan'; id: 'essentiel' | 'serenite' | 'excellence' }
  | { type: 'estimations' }
  | { type: 'financing' }
  | { type: 'guarantees' }
  | { type: 'resources' }
  | { type: 'guides' }
  | { type: 'guide'; id: string }
  | { type: 'tools' }
  | { type: 'why' }

interface Props {
  closeMenu: () => void
  onSelectClinic: (c: ClinicEntry) => void
  user?: any
  isLoading?: boolean
  handleLogout?: () => void
  dashLink?: () => string
  dashText?: () => string
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR MOBILE — Drill-down navigation < lg
   ══════════════════════════════════════════════════════════════ */
export function NavbarMobile({ closeMenu, onSelectClinic, user, isLoading, handleLogout, dashLink, dashText }: Props) {
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
      case 'partners':       return 'Devenir Partenaire'
      case 'partnerType':    return PARTNER_TYPES.find(p => p.id === current.id)?.name || ''
      case 'impact':         return 'Engagements & Chiffres clés'
      case 'process':        return 'Processus d\u2019onboarding'
      case 'pricing':        return 'Tarifs & Financement'
      case 'pricingPlan':    return PRICING_PLANS.find(p => p.id === current.id)?.name || ''
      case 'estimations':    return 'Estimations par spécialité'
      case 'financing':      return 'Solutions de financement'
      case 'guarantees':     return 'Garanties Pont Afrique Santé'
      case 'resources':      return 'Ressources Patient'
      case 'guides':         return 'Guides par hub'
      case 'guide':          return PATIENT_GUIDES.find(g => g.id === current.id)?.title || ''
      case 'tools':          return 'Outils pratiques'
      case 'why':            return 'Pourquoi ces ressources'
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
      case 'partners':       return `${PARTNER_TYPES.length} familles · ${IMPACT_STATS.length} engagements contractuels`
      case 'partnerType':    return PARTNER_TYPES.find(p => p.id === current.id)?.tagline || ''
      case 'impact':         return '4 engagements contractuels · Lancé en 2025'
      case 'process':        return `${ONBOARDING_STEPS.length} étapes · 21 jours pour lancer`
      case 'pricing':        return 'Forfaits, estimations et solutions de financement'
      case 'pricingPlan':    return PRICING_PLANS.find(p => p.id === current.id)?.tagline || ''
      case 'estimations':    return `${PRICE_ESTIMATIONS.length} spécialités · jusqu'à −70 % vs France`
      case 'financing':      return `${FINANCING_OPTIONS.length} solutions adaptées à votre situation`
      case 'guarantees':     return `${GUARANTEES.length} engagements pour votre sérénité`
      case 'resources':      return `${PATIENT_GUIDES.length} guides · ${PATIENT_TOOLS.length} outils · ${RESOURCE_ARGUMENTS.length} arguments`
      case 'guides':         return `${PATIENT_GUIDES.length} guides éditoriaux par hub et spécialité`
      case 'guide':          return PATIENT_GUIDES.find(g => g.id === current.id)?.excerpt || ''
      case 'tools':          return `${PATIENT_TOOLS.length} outils pour préparer votre séjour`
      case 'why':            return `${RESOURCE_ARGUMENTS.length} arguments chiffrés et sourcés`
    }
  })()

  /* Eyebrow */
  const eyebrow = (() => {
    if (current.type === 'subspecialty') return current.specName
    if (current.type === 'country') return 'Établissements partenaires'
    if (current.type === 'specialty') return 'Spécialité médicale'
    if (current.type === 'service' || current.type === 'premiumService') return current.type === 'premiumService' ? 'Service Premium' : 'Service Inclus'
    if (current.type === 'partners') return 'B2B · Impact'
    if (current.type === 'partnerType') {
      const p = PARTNER_TYPES.find(x => x.id === current.id)
      return p ? p.category : 'Partenariat'
    }
    if (current.type === 'impact') return 'Engagements contractuels'
    if (current.type === 'process') return 'Onboarding 21 jours'
    if (current.type === 'pricing') return 'Tarifs'
    if (current.type === 'pricingPlan') return 'Forfait'
    if (current.type === 'estimations') return 'Estimations indicatives'
    if (current.type === 'financing') return 'Financement'
    if (current.type === 'guarantees') return 'Engagements'
    if (current.type === 'resources') return 'Éducation patient'
    if (current.type === 'guides') return 'Guides éditoriaux'
    if (current.type === 'guide') {
      const g = PATIENT_GUIDES.find(x => x.id === current.id)
      return g ? `${g.hub} · ${g.specialty}` : 'Guide patient'
    }
    if (current.type === 'tools') return 'Outils pratiques'
    if (current.type === 'why') return 'Pourquoi préparer'
    return 'Pont Afrique Santé'
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
                  { label: 'Tarifs & Financement', sub: `${PRICING_PLANS.length} forfaits · estimations · crédits`, view: { type: 'pricing' } as View, Icon: Wallet as LucideIcon, premium: false },
                  { label: 'Ressources Patient', sub: `${PATIENT_GUIDES.length} guides · ${PATIENT_TOOLS.length} outils pratiques`, view: { type: 'resources' } as View, Icon: BookOpen as LucideIcon, premium: false },
                  { label: 'Devenir Partenaire', sub: `${PARTNER_TYPES.length} familles B2B · impact chiffré`, view: { type: 'partners' } as View, Icon: Handshake as LucideIcon, premium: false },
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
                      Obtenez une estimation personnalisée pour cette procédure et découvrez les réductions Pont Afrique Santé.
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
                        : 'Inclus dans votre accompagnement Pont Afrique Santé — aucun supplément.'}
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

            {/* ════ PARTNERS — hub (no carousel) ════════════════ */}
            {current.type === 'partners' && (
              <div className="space-y-8">

                {/* Commitments banner — condensed mobile version */}
                <div className="relative overflow-hidden bg-[#080c0f] text-white px-5 py-6">
                  {/* Teal glow orb */}
                  <div
                    className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(72,156,140,0.14) 0%, transparent 70%)',
                      filter: 'blur(30px)',
                    }}
                  />
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-teal to-transparent" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rotate-45 bg-brand-teal" />
                  <div className="relative">
                    <p className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.22em] mb-2">Engagements contractuels · 2025</p>
                    <h3 className="text-[18px] leading-tight tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                      Construire ensemble<br />le réseau de santé africain.
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                      {IMPACT_STATS.map((stat, i) => {
                        const Icon = IMPACT_ICONS[stat.iconKey] || Sparkle
                        return (
                          <div key={i} className="border-l border-brand-teal/40 pl-3">
                            <Icon size={11} className="text-brand-teal mb-1" />
                            <div className="flex items-baseline gap-1">
                              <span className="text-[20px] font-bold tabular-nums tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{stat.value}</span>
                              {stat.unit && <span className="text-[10px] text-brand-teal font-bold">{stat.unit}</span>}
                            </div>
                            <p className="text-[9px] text-slate-300 leading-snug mt-0.5">{stat.label}</p>
                          </div>
                        )
                      })}
                    </div>
                    <button
                      onClick={() => push({ type: 'impact' })}
                      className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-brand-teal uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Voir les 4 engagements <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

                {/* 4 partner families */}
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Quatre familles de partenaires
                  </p>
                  <div className="space-y-2.5">
                    {PARTNER_TYPES.map(pt => {
                      const Icon = PARTNER_ICONS[pt.iconKey] || Handshake
                      return (
                        <button
                          key={pt.id}
                          onClick={() => push({ type: 'partnerType', id: pt.id })}
                          className={`group relative flex items-start gap-4 w-full text-left p-4 border transition-all
                            ${pt.highlighted
                              ? 'border-brand-teal/30 bg-brand-teal/[0.04] hover:bg-brand-teal/[0.07]'
                              : 'border-slate-150 bg-white hover:border-brand-teal/30 hover:bg-brand-teal/[0.02]'
                            }`}
                        >
                          {pt.highlighted && (
                            <span className="absolute -top-2 left-4 text-[8px] uppercase tracking-widest font-bold bg-brand-teal text-white px-2 py-0.5 whitespace-nowrap shadow-sm">
                              Prioritaire
                            </span>
                          )}
                          <div className="w-11 h-11 flex items-center justify-center bg-slate-50 group-hover:bg-brand-teal/10 text-slate-500 group-hover:text-brand-teal shrink-0 transition-colors">
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-[15px] font-bold leading-tight mb-1 ${pt.highlighted ? 'text-brand-teal' : 'text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
                              {pt.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 leading-snug italic mb-2 line-clamp-2">{pt.tagline}</p>
                            <div className="flex items-center gap-3">
                              {pt.kpis.slice(0, 2).map((k, i) => (
                                <div key={i} className="flex items-baseline gap-1">
                                  <span className="text-[11px] font-bold text-slate-900 tabular-nums">{k.value}</span>
                                  <span className="text-[8px] text-slate-400 uppercase tracking-wider">{k.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <ArrowRight size={13} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-1 transition-all" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Secondary entries */}
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Aller plus loin
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => push({ type: 'process' })}
                      className="group flex items-center gap-4 w-full text-left p-4 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal shrink-0 transition-colors">
                        <Route size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">Processus d&apos;onboarding</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{ONBOARDING_STEPS.length} étapes · 21 jours pour lancer</p>
                      </div>
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 transition-all" />
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Link href="/contact?sujet=partenariat" onClick={closeMenu}>
                    <Button className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white h-12 text-[12px] font-bold rounded-none shadow-sm">
                      Initier un partenariat <ArrowRight size={13} className="ml-2" />
                    </Button>
                  </Link>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    <div><p className="text-[10px] font-bold text-slate-900 tabular-nums">&lt; 48 h</p><p className="text-[8px] text-slate-400 uppercase tracking-wider">réponse</p></div>
                    <div><p className="text-[10px] font-bold text-slate-900 tabular-nums">21 j</p><p className="text-[8px] text-slate-400 uppercase tracking-wider">onboarding</p></div>
                    <div><p className="text-[10px] font-bold text-slate-900 tabular-nums">0 €</p><p className="text-[8px] text-slate-400 uppercase tracking-wider">d&apos;adhésion</p></div>
                    <div><p className="text-[10px] font-bold text-slate-900 tabular-nums">4</p><p className="text-[8px] text-slate-400 uppercase tracking-wider">hubs actifs</p></div>
                  </div>
                </div>
              </div>
            )}

            {/* ════ PARTNER TYPE detail ═════════════════════════ */}
            {current.type === 'partnerType' && (() => {
              const pt = PARTNER_TYPES.find(p => p.id === current.id)
              if (!pt) return null
              const Icon = PARTNER_ICONS[pt.iconKey] || Handshake
              return (
                <div className="space-y-7">

                  {/* Hero */}
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 flex items-center justify-center bg-brand-teal/10 text-brand-teal shrink-0">
                        <Icon size={26} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-brand-teal italic leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                          {pt.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="text-[12px] text-slate-600 leading-relaxed">{pt.description}</p>
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
                    {pt.kpis.map((k, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[20px] font-bold text-slate-900 tabular-nums tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{k.value}</p>
                        <p className="text-[8px] text-slate-500 uppercase tracking-wider mt-0.5 leading-tight">{k.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">Ce que vous y gagnez</p>
                    <div className="space-y-3">
                      {pt.benefits.map((b, i) => (
                        <div key={i} className="grid grid-cols-[24px_1fr] gap-3">
                          <div className="flex items-start justify-center pt-1">
                            <div className="w-2 h-2 rotate-45 bg-brand-teal" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-[12px] font-bold text-slate-900 leading-snug mb-0.5">{b.title}</h5>
                            <p className="text-[11px] text-slate-500 leading-relaxed">{b.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-slate-50 border border-slate-100 p-4">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2.5">Prérequis d&apos;intégration</p>
                    <ul className="space-y-1.5">
                      {pt.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check size={10} className="text-brand-teal shrink-0 mt-1" />
                          <span className="text-[11px] text-slate-600 leading-snug">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <Link href="/contact?sujet=partenariat" onClick={closeMenu}>
                      <Button className={`w-full h-12 text-[12px] font-bold rounded-none shadow-sm
                        ${pt.highlighted ? 'bg-brand-teal hover:bg-brand-teal-dark text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
                        {pt.cta} <ArrowRight size={13} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })()}

            {/* ════ IMPACT — full stats list ════════════════════ */}
            {current.type === 'impact' && (
              <div className="space-y-3">
                <p className="text-[10px] text-slate-500 leading-relaxed mb-2">
                  Ces quatre engagements sont contractuels et figurent dans chaque accord cadre signé avec nos partenaires. Pont Afrique Santé a été lancé en 2025.
                </p>
                {IMPACT_STATS.map((stat, i) => {
                  const Icon = IMPACT_ICONS[stat.iconKey] || Sparkle
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white border border-slate-150">
                      <div className="w-11 h-11 flex items-center justify-center bg-brand-teal/[0.06] text-brand-teal shrink-0">
                        <Icon size={19} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-[22px] font-bold text-slate-900 tabular-nums tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{stat.value}</span>
                          {stat.unit && <span className="text-[12px] font-bold text-brand-teal">{stat.unit}</span>}
                        </div>
                        <p className="text-[12px] font-bold text-slate-900 leading-snug">{stat.label}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{stat.detail}</p>
                      </div>
                    </div>
                  )
                })}
                <p className="text-[9px] text-slate-400 text-center pt-3">
                  Pont Afrique Santé · Lancé en 2025 · Engagements contractuels
                </p>
              </div>
            )}

            {/* ════ PROCESS — onboarding timeline ═══════════════ */}
            {current.type === 'process' && (
              <div className="relative">
                <div className="absolute left-[10px] top-6 bottom-40 w-px bg-gradient-to-b from-brand-teal/40 via-slate-200 to-transparent" />
                <div className="space-y-7">
                  {ONBOARDING_STEPS.map((step, idx) => (
                    <div key={idx} className="relative grid grid-cols-[24px_1fr] gap-4">
                      <div className="relative z-10 flex items-start justify-center pt-2">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <div className="absolute w-5 h-5 rotate-45 border border-brand-teal/50 bg-white" />
                          <div className="absolute w-2 h-2 rotate-45 bg-brand-teal" />
                        </div>
                      </div>
                      <div className="pb-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.18em]">{step.duration}</p>
                          <div className="h-px flex-1 bg-slate-150" />
                        </div>
                        <h3 className="text-[16px] text-slate-900 tracking-tight leading-snug mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                          {step.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-[12px] font-bold text-slate-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                    21 jours pour lancer, zéro surprise.
                  </p>
                  <p className="text-[11px] text-slate-500 mb-4 leading-snug">
                    Notre équipe partenariats vous accompagne à chaque étape, de la qualification au premier dossier traité.
                  </p>
                  <Link href="/contact?sujet=partenariat" onClick={closeMenu}>
                    <Button className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white h-11 text-[12px] font-bold rounded-none">
                      Initier un partenariat <ArrowRight size={13} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}


            {/* ════ PRICING — hub ═══════════════════════════════ */}
            {current.type === 'pricing' && (
              <div className="space-y-3">
                {[
                  { label: 'Nos formules', sub: `${PRICING_PLANS.length} forfaits — Essentiel, Sérénité, Excellence`, view: { type: 'pricing' } as View, Icon: Wallet, isPlans: true },
                  { label: 'Combien coûte mon traitement ?', sub: `${PRICE_ESTIMATIONS.length} spécialités — jusqu'à −70 % vs France`, view: { type: 'estimations' } as View, Icon: TrendingDown },
                  { label: 'Solutions de financement', sub: `${FINANCING_OPTIONS.length} options pour étaler le coût`, view: { type: 'financing' } as View, Icon: Landmark },
                  { label: 'Garanties Pont Afrique Santé', sub: `${GUARANTEES.length} engagements pour votre sérénité`, view: { type: 'guarantees' } as View, Icon: Shield },
                ].map((card, idx) => {
                  // Special: first card expands inline as plan list
                  if (card.isPlans) {
                    return (
                      <div key={idx}>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                          Nos formules
                        </p>
                        <div className="space-y-2.5 mb-6">
                          {PRICING_PLANS.map(plan => (
                            <button
                              key={plan.id}
                              onClick={() => push({ type: 'pricingPlan', id: plan.id })}
                              className={`group relative flex flex-col w-full text-left p-4 border transition-all
                                ${plan.highlighted
                                  ? 'border-brand-teal/30 bg-brand-teal/[0.04] hover:bg-brand-teal/[0.07]'
                                  : 'border-slate-150 bg-white hover:border-brand-teal/30 hover:bg-brand-teal/[0.02]'
                                }`}
                            >
                              {plan.badge && (
                                <span className="absolute -top-2 left-4 text-[8px] uppercase tracking-widest font-bold bg-brand-teal text-white px-2 py-0.5 whitespace-nowrap shadow-sm">
                                  {plan.badge}
                                </span>
                              )}
                              <div className="flex items-start justify-between gap-3 mb-1.5">
                                <h4 className={`text-[15px] font-bold ${plan.highlighted ? 'text-brand-teal' : 'text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
                                  {plan.name}
                                </h4>
                                <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-1 transition-all" />
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug mb-2.5">{plan.tagline}</p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-[16px] font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                                {plan.priceSub && (
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">{plan.priceSub}</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => push(card.view)}
                      className="group flex items-center gap-4 w-full text-left p-5 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                    >
                      <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal transition-colors">
                        <card.Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{card.label}</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{card.sub}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-brand-teal group-hover:translate-x-0.5 shrink-0 transition-all" />
                    </button>
                  )
                })}
              </div>
            )}

            {/* ════ PRICING PLAN — detail ═══════════════════════ */}
            {current.type === 'pricingPlan' && (() => {
              const plan = PRICING_PLANS.find(p => p.id === current.id)
              if (!plan) return null
              return (
                <div>
                  {/* Price block */}
                  <div className={`p-5 mb-6 border ${plan.highlighted ? 'border-brand-teal/30 bg-brand-teal/[0.04]' : 'border-slate-150 bg-white'}`}>
                    {plan.badge && (
                      <span className="inline-block text-[8px] uppercase tracking-widest font-bold bg-brand-teal text-white px-2 py-0.5 mb-2">
                        {plan.badge}
                      </span>
                    )}
                    <p className="text-[11px] text-slate-500 leading-snug mb-3">{plan.shortDesc}</p>
                    <div className="flex items-baseline gap-2 pt-3 border-t border-slate-100">
                      <span className="text-[26px] font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                      {plan.priceSub && (
                        <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">{plan.priceSub}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Ce qui est inclus
                  </p>
                  <div className="space-y-2.5 mb-7">
                    {plan.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check size={12} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-brand-teal' : 'text-slate-400'}`} strokeWidth={2.5} />
                        <span className="text-[12px] text-slate-700 leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={plan.id === 'excellence' ? '/contact' : '/register'} onClick={closeMenu}>
                    <Button className={`w-full h-12 text-[12px] font-bold uppercase tracking-wider rounded-none
                      ${plan.highlighted
                        ? 'bg-brand-teal hover:bg-brand-teal-dark text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}>
                      {plan.id === 'excellence' && <Phone size={12} className="mr-2" />}
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              )
            })()}

            {/* ════ ESTIMATIONS — list ══════════════════════════ */}
            {current.type === 'estimations' && (
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-brand-teal font-bold uppercase tracking-wider bg-brand-teal/8 border border-brand-teal/15 px-2.5 py-1.5 mb-5 w-fit">
                  <TrendingDown size={11} />
                  <span>Jusqu'à −70 % vs France</span>
                </div>
                <div className="space-y-2">
                  {PRICE_ESTIMATIONS.map(est => {
                    const Icon = getIcon(est.iconKey)
                    return (
                      <div key={est.specialty} className="flex items-start gap-3 p-4 bg-white border border-slate-150">
                        <div className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-500 shrink-0">
                          <Icon size={15} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <h4 className="text-[12px] font-bold text-slate-900 truncate">{est.specialty}</h4>
                            <span className="text-[9px] font-bold text-brand-teal whitespace-nowrap tabular-nums">{est.savingsLabel}</span>
                          </div>
                          <p className="text-[14px] font-bold text-slate-900 tabular-nums leading-tight">
                            {est.rangeLow.toLocaleString('fr-FR')} – {est.rangeHigh.toLocaleString('fr-FR')} €
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            Hub : <span className="text-slate-500 font-semibold">{est.recommendedHub}</span>
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[10px] text-slate-400 italic mt-4 leading-relaxed">
                  Tarifs indicatifs incluant intervention, hospitalisation et soins. Devis personnalisé sous 48 h.
                </p>
                <div className="mt-6 p-4 bg-slate-50 border border-slate-100">
                  <Link href="/register" onClick={closeMenu}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-[12px] font-bold rounded-none">
                      Demander mon devis gratuit <ArrowRight size={13} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* ════ FINANCING — list ════════════════════════════ */}
            {current.type === 'financing' && (
              <div className="space-y-3">
                {FINANCING_OPTIONS.map(opt => {
                  const Icon = FINANCING_ICONS[opt.badgeKey]
                  return (
                    <div key={opt.name} className="flex items-start gap-3 p-4 bg-white border border-slate-150">
                      <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/8 text-brand-teal shrink-0">
                        <Icon size={17} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-slate-900 mb-1">{opt.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-snug mb-1.5">{opt.desc}</p>
                        <p className="text-[10px] text-slate-400 leading-snug italic">{opt.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* ════ GUARANTEES — list ═══════════════════════════ */}
            {current.type === 'guarantees' && (
              <div className="space-y-2.5">
                {GUARANTEES.map(g => (
                  <div key={g.title} className="p-4 bg-white border border-slate-150">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Check size={13} className="text-brand-teal shrink-0" strokeWidth={3} />
                      <h4 className="text-[13px] font-bold text-slate-900">{g.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug pl-[22px]">{g.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ════ RESOURCES — hub ═════════════════════════════ */}
            {current.type === 'resources' && (
              <div className="space-y-3">
                {[
                  { label: 'Guides par hub', sub: `${PATIENT_GUIDES.length} guides éditoriaux, ${PATIENT_GUIDES.filter(g => g.priority).length} centrés Maroc`, view: { type: 'guides' } as View, Icon: BookOpen },
                  { label: 'Outils pratiques', sub: `${PATIENT_TOOLS.length} outils pour préparer votre séjour`, view: { type: 'tools' } as View, Icon: ClipboardCheck },
                  { label: 'Pourquoi préparer son séjour', sub: `${RESOURCE_ARGUMENTS.length} arguments chiffrés et sourcés`, view: { type: 'why' } as View, Icon: Quote },
                ].map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => push(card.view)}
                    className="group flex items-center gap-4 w-full text-left p-5 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal transition-colors">
                      <card.Icon size={20} strokeWidth={1.8} />
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

            {/* ════ GUIDES — list ═══════════════════════════════ */}
            {current.type === 'guides' && (
              <div className="space-y-2.5">
                {PATIENT_GUIDES.map(guide => (
                  <button
                    key={guide.id}
                    onClick={() => push({ type: 'guide', id: guide.id })}
                    className={`group relative flex flex-col w-full text-left p-4 border transition-all
                      ${guide.priority
                        ? 'border-brand-teal/30 bg-brand-teal/[0.04] hover:bg-brand-teal/[0.07]'
                        : 'border-slate-150 bg-white hover:border-brand-teal/30 hover:bg-brand-teal/[0.02]'
                      }`}
                  >
                    {/* Top row: hub + priority badge + num */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5 bg-white border border-slate-150 px-2 py-1">
                        <Image
                          src={`https://flagcdn.com/w40/${guide.hubCode}.png`}
                          alt={guide.hub}
                          width={14}
                          height={10}
                          className="w-[14px] h-auto rounded-[1px] shadow-sm"
                        />
                        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">{guide.hub}</span>
                      </div>
                      {guide.priority && (
                        <span className="inline-flex items-center gap-1 text-[8px] font-bold text-brand-teal uppercase tracking-widest bg-white border border-brand-teal/25 px-1.5 py-0.5">
                          <Sparkle size={8} strokeWidth={2.5} /> Prioritaire
                        </span>
                      )}
                      <span className="ml-auto text-[9px] text-slate-300 tabular-nums">{guide.num}</span>
                    </div>

                    {/* Specialty */}
                    <div className="flex items-center gap-1.5 mb-1">
                      <Stethoscope size={10} className="text-slate-400" />
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.16em]">{guide.specialty}</p>
                    </div>

                    {/* Title */}
                    <h4
                      className="text-[15px] text-slate-900 leading-snug tracking-tight mb-2"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {guide.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-3">
                      {guide.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock size={9} className="text-slate-300" /> {guide.readTime}
                      </span>
                      <span className="w-px h-3 bg-slate-200" />
                      <span className="flex items-center gap-1 truncate">
                        <MapPin size={9} className="text-slate-300 shrink-0" />
                        <span className="truncate">{guide.reference}</span>
                      </span>
                      <ArrowRight size={11} className="text-slate-300 group-hover:text-brand-teal shrink-0 ml-auto transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ════ GUIDE — detail ══════════════════════════════ */}
            {current.type === 'guide' && (() => {
              const guide = PATIENT_GUIDES.find(g => g.id === current.id)
              if (!guide) return null
              return (
                <div>
                  {/* Hub badge row */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-150 px-2 py-1">
                      <Image
                        src={`https://flagcdn.com/w40/${guide.hubCode}.png`}
                        alt={guide.hub}
                        width={16}
                        height={11}
                        className="w-[16px] h-auto rounded-[1px] shadow-sm"
                      />
                      <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">{guide.hub}</span>
                    </div>
                    {guide.priority && (
                      <span className="inline-flex items-center gap-1 text-[8px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/8 border border-brand-teal/20 px-1.5 py-0.5">
                        <Sparkle size={8} strokeWidth={2.5} /> Hub prioritaire
                      </span>
                    )}
                  </div>

                  {/* Reference + read time */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-6 pb-5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <MapPin size={10} className="text-slate-300 shrink-0" />
                      <span className="font-semibold text-slate-500 truncate">{guide.reference}</span>
                    </span>
                    <span className="w-px h-3 bg-slate-200 shrink-0" />
                    <span className="flex items-center gap-1.5 shrink-0">
                      <Clock size={10} className="text-slate-300" />
                      Lecture {guide.readTime}
                    </span>
                  </div>

                  {/* Stats grid */}
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Repères clés
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 mb-7">
                    {guide.stats.map((stat, i) => (
                      <div key={i} className="bg-white border border-slate-150 p-3 flex flex-col">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-[12px] font-extrabold text-slate-900 tracking-tight leading-tight">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-3">
                    Ce qui est abordé dans le guide
                  </p>
                  <ul className="space-y-2.5 mb-7">
                    {guide.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[12px] text-slate-700 leading-snug">
                        <div className="w-1 h-1 rotate-45 bg-brand-teal mt-[7px] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={guide.href} onClick={closeMenu}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-[12px] font-bold uppercase tracking-wider rounded-none">
                      Lire le guide complet <ArrowRight size={13} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              )
            })()}

            {/* ════ TOOLS — list ════════════════════════════════ */}
            {current.type === 'tools' && (
              <div className="space-y-2.5">
                {PATIENT_TOOLS.map(tool => {
                  const Icon = TOOL_ICONS[tool.iconKey]
                  return (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={closeMenu}
                      className="group block p-4 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-150 group-hover:bg-brand-teal/10 group-hover:border-brand-teal/25 group-hover:text-brand-teal text-slate-500 transition-all">
                          <Icon size={17} strokeWidth={1.8} />
                        </div>
                        <span className="text-[8px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/5 border border-brand-teal/15 px-1.5 py-0.5 whitespace-nowrap">
                          {tool.metric}
                        </span>
                      </div>
                      <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors mb-1 leading-snug">
                        {tool.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-1.5">{tool.shortDesc}</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed italic">{tool.longDesc}</p>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* ════ WHY — arguments chiffrés ════════════════════ */}
            {current.type === 'why' && (
              <div className="space-y-3">
                {RESOURCE_ARGUMENTS.map((arg, idx) => {
                  const Icon = ARG_ICONS[arg.iconKey]
                  return (
                    <div
                      key={arg.id}
                      className="bg-gradient-to-br from-white via-white to-brand-teal/[0.03] border border-slate-150 p-5"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 flex items-center justify-center border border-brand-teal/25 bg-brand-teal/8 text-brand-teal shrink-0">
                          <Icon size={18} strokeWidth={1.7} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">
                            Argument {String(idx + 1).padStart(2, '0')} sur {RESOURCE_ARGUMENTS.length}
                          </p>
                          <p
                            className="text-[36px] text-brand-teal leading-none tracking-tight font-light"
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            {arg.metric}
                          </p>
                        </div>
                      </div>

                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.16em] mb-2 leading-snug">
                        {arg.metricLabel}
                      </p>

                      <h4
                        className="text-[16px] text-slate-900 tracking-tight leading-snug mb-2"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {arg.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        {arg.body}
                      </p>
                      <p className="text-[9px] text-slate-400 italic pt-2.5 border-t border-slate-100">
                        Source : {arg.source}
                      </p>
                    </div>
                  )
                })}

                <div className="mt-6 p-4 bg-slate-50 border border-slate-100">
                  <Link href="/register" onClick={closeMenu}>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-[12px] font-bold rounded-none">
                      Créer mon dossier patient <ArrowRight size={13} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Fixed Bottom Auth Action Bar (Toujours visible et ergonomique sur mobile) ── */}
      <div className="shrink-0 p-3.5 sm:p-4 border-t border-slate-200/90 bg-white/95 backdrop-blur-md shadow-lg z-20">
        {!isLoading && !user && (
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link href="/login" onClick={closeMenu} className="w-full">
              <Button variant="outline" className="w-full h-11 text-xs sm:text-[13px] font-bold rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 shadow-2xs">
                <LogIn size={15} /> Se connecter
              </Button>
            </Link>
            <Link href="/register" onClick={closeMenu} className="w-full">
              <Button className="w-full h-11 text-xs sm:text-[13px] font-bold rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white flex items-center justify-center gap-1.5 shadow-md shadow-brand-teal/20">
                S'inscrire <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        )}
        {!isLoading && user && (
          <div className="flex items-center gap-2">
            <Link href={dashLink ? dashLink() : '/patient'} onClick={closeMenu} className="flex-1">
              <Button className="w-full h-11 text-xs sm:text-[13px] font-bold rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white flex items-center justify-center gap-1.5 shadow-md shadow-brand-teal/20">
                <User size={15} /> {dashText ? dashText() : 'Mon Espace Santé'}
              </Button>
            </Link>
            {handleLogout && (
              <Button variant="outline" onClick={() => { handleLogout(); closeMenu() }}
                className="h-11 px-3 text-xs text-red-600 border-red-200 hover:bg-red-50 font-semibold rounded-xl shrink-0"
                title="Déconnexion"
              >
                <LogOut size={16} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
