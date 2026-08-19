'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight, Check, Phone, TrendingDown,
  Calendar, Landmark, BriefcaseBusiness, Shield,
  Heart, HeartPulse, Baby, Eye, Brain, Bone, Scissors,
  Syringe, Droplets, Scan, Dna, Ribbon, Globe,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  PRICING_PLANS, PRICE_ESTIMATIONS, FINANCING_OPTIONS, GUARANTEES,
} from '@/lib/data/pricing'

/* ── Icon map (specialty icons) ────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  dna: Dna, baby: Baby, scissors: Scissors, syringe: Syringe,
  eye: Eye, heartpulse: HeartPulse, heart: Heart, brain: Brain,
  bone: Bone, droplets: Droplets, scan: Scan, ribbon: Ribbon,
}
const getIcon = (k: string): LucideIcon => ICON_MAP[k] || Globe

/* ── Financing icon map ────────────────────────────────────────── */
const FINANCING_ICONS: Record<string, LucideIcon> = {
  mensuel: Calendar,
  partenaire: Landmark,
  employer: BriefcaseBusiness,
  insurance: Shield,
}

/* ── Diamond separator ─────────────────────────────────────────── */
function DiamondH() {
  return (
    <div className="flex items-center gap-4 py-10 select-none">
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

/* ══════════════════════════════════════════════════════════════
   NAV PRICING — Desktop right panel
   4 sections: Forfaits | Estimations | Financement | Garanties
   ══════════════════════════════════════════════════════════════ */

interface Props {
  closeMenu: () => void
}

export function NavPricing({ closeMenu }: Props) {
  return (
    <div className="p-8 sm:p-10 lg:p-12">

      {/* ── Header ── */}
      <div className="mb-10">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-1">
          Tarifs & Financement
        </p>
        <h2 className="text-2xl sm:text-3xl text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Une santé de qualité, accessible
        </h2>
        <p className="text-[13px] text-slate-500 mt-1 max-w-2xl">
          Des forfaits transparents, des estimations claires par spécialité et des solutions de financement adaptées à votre situation.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
         SECTION 1 — LES 3 FORFAITS
         ════════════════════════════════════════════════════════ */}
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
          Nos formules
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-200">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={`relative p-6 flex flex-col
                ${plan.highlighted ? 'bg-[#f4f7f6]' : 'bg-white'}
                ${idx < PRICING_PLANS.length - 1 ? 'lg:border-r border-slate-200 border-b lg:border-b-0' : ''}
                ${plan.highlighted ? 'lg:shadow-[inset_0_3px_0_0_#489c8c]' : ''}
              `}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-bold bg-brand-teal text-white px-3 py-1 whitespace-nowrap shadow-sm z-10">
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3 className={`text-[19px] mb-1 ${plan.highlighted ? 'text-brand-teal' : 'text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
                {plan.name}
              </h3>
              <p className="text-[11px] text-slate-500 mb-5 leading-snug min-h-[2.6em]">
                {plan.tagline}
              </p>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-slate-150">
                <span className="text-[24px] font-extrabold text-slate-900 tracking-tight leading-none">
                  {plan.price}
                </span>
                {plan.priceSub && (
                  <p className="text-[9px] uppercase tracking-widest mt-1.5 font-bold text-slate-400">
                    {plan.priceSub}
                  </p>
                )}
              </div>

              {/* Key features */}
              <ul className="space-y-2 mb-6 flex-1">
                {plan.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={11} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-brand-teal' : 'text-slate-400'}`} strokeWidth={2.5} />
                    <span className="text-[11px] text-slate-600 leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.id === 'excellence' ? '/contact' : '/register'} onClick={closeMenu}>
                <Button
                  className={`w-full h-10 text-[11px] font-bold uppercase tracking-wider rounded-none shadow-none
                    ${plan.highlighted
                      ? 'bg-brand-teal hover:bg-brand-teal-dark text-white'
                      : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-400'
                    }`}
                >
                  {plan.id === 'excellence' && <Phone size={11} className="mr-1.5" />}
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 italic mt-3 text-center">
          Aucun engagement · Annulation gratuite jusqu'à 72 h avant le séjour
        </p>
      </div>

      <DiamondH />

      {/* ════════════════════════════════════════════════════════
         SECTION 2 — ESTIMATIONS PAR SPÉCIALITÉ
         ════════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              Estimations indicatives
            </p>
            <h3 className="text-[18px] text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Combien coûte mon traitement ?
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-brand-teal font-bold uppercase tracking-wider bg-brand-teal/8 border border-brand-teal/15 px-2.5 py-1">
            <TrendingDown size={11} />
            <span>Jusqu'à −70 % vs France</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-slate-200">
          {PRICE_ESTIMATIONS.map((est, idx) => {
            const Icon = getIcon(est.iconKey)
            const isLastRow = idx >= PRICE_ESTIMATIONS.length - 2
            const isRight = idx % 2 === 1
            return (
              <div
                key={est.specialty}
                className={`flex items-start gap-3 p-4 bg-white hover:bg-slate-50/60 transition-colors
                  ${!isLastRow ? 'border-b border-slate-100' : ''}
                  ${!isRight ? 'sm:border-r sm:border-slate-100' : ''}
                `}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-500 shrink-0">
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h4 className="text-[12px] font-bold text-slate-900 truncate">{est.specialty}</h4>
                    <span className="text-[9px] font-bold text-brand-teal whitespace-nowrap tabular-nums">{est.savingsLabel}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14px] font-bold text-slate-900 tabular-nums">
                      {est.rangeLow.toLocaleString('fr-FR')} – {est.rangeHigh.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Hub recommandé : <span className="text-slate-500 font-semibold">{est.recommendedHub}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-[10px] text-slate-400 italic mt-3 leading-relaxed">
          Tarifs indicatifs comprenant intervention, hospitalisation et soins. Devis personnalisé sous 48 h après analyse de votre dossier.
        </p>
      </div>

      <DiamondH />

      {/* ════════════════════════════════════════════════════════
         SECTION 3 — SOLUTIONS DE FINANCEMENT
         ════════════════════════════════════════════════════════ */}
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
          Solutions de financement
        </p>
        <h3 className="text-[18px] text-slate-900 tracking-tight mb-5" style={{ fontFamily: 'Georgia, serif' }}>
          Étalez le coût, sans compromis sur la qualité
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FINANCING_OPTIONS.map((opt, idx) => {
            const Icon = FINANCING_ICONS[opt.badgeKey]
            return (
              <motion.div
                key={opt.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 bg-white border border-slate-150 hover:border-brand-teal/30 hover:bg-brand-teal/[0.02] transition-all"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-brand-teal/8 text-brand-teal shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-bold text-slate-900 mb-0.5">{opt.name}</h4>
                  <p className="text-[10px] text-slate-500 leading-snug mb-1.5">{opt.desc}</p>
                  <p className="text-[10px] text-slate-400 leading-snug italic">{opt.details}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <DiamondH />

      {/* ════════════════════════════════════════════════════════
         SECTION 4 — GARANTIES
         ════════════════════════════════════════════════════════ */}
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
          Nos engagements
        </p>
        <h3 className="text-[18px] text-slate-900 tracking-tight mb-5" style={{ fontFamily: 'Georgia, serif' }}>
          Les garanties Pont Afrique Santé
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {GUARANTEES.map((g, idx) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="p-4 bg-white border border-slate-150"
            >
              <div className="flex items-center gap-2 mb-2">
                <Check size={12} className="text-brand-teal shrink-0" strokeWidth={3} />
                <h4 className="text-[11px] font-bold text-slate-900">{g.title}</h4>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA Final ── */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[14px] font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              Obtenez votre devis personnalisé
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Réponse médicale et financière en moins de 48 heures, sans engagement.
            </p>
          </div>
          <Link href="/register" onClick={closeMenu}>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 h-11 text-[13px] font-bold rounded-none shadow-sm">
              Demander mon devis gratuit <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
