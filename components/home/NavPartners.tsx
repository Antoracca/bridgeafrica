'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Check,
  Clock, Building2, MapPinned, Users,
  Hospital, ShieldHalf, HandHeart, Landmark,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  IMPACT_STATS, PARTNER_TYPES, ONBOARDING_STEPS,
  type ImpactStat, type PartnerType,
} from '@/lib/data/partners'

/* ── Icon maps ─────────────────────────────────────────────── */
const IMPACT_ICONS: Record<ImpactStat['iconKey'], LucideIcon> = {
  response: Clock,
  clinics: Building2,
  countries: MapPinned,
  patients: Users,
}

const PARTNER_ICONS: Record<PartnerType['iconKey'], LucideIcon> = {
  clinics: Hospital,
  insurance: ShieldHalf,
  ngo: HandHeart,
  gov: Landmark,
}

/* ── Diamond separator ─────────────────────────────────────── */
function DiamondH() {
  return (
    <div className="flex items-center gap-4 py-14 select-none">
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
   NAV PARTNERS — Desktop right panel
   1. Commitments header (replaces fake Impact Banner)
   2. DiamondH
   3. 4 partner types (2x2 grid)
   4. DiamondH
   5. Process timeline (4 steps)
   6. DiamondH
   7. CTA (near-black, teal glow — no grid)
   ══════════════════════════════════════════════════════════════ */

interface Props {
  closeMenu: () => void
}

export function NavPartners({ closeMenu }: Props) {
  return (
    <div className="p-8 sm:p-10 lg:p-12">

      {/* ──────────────────────────────────────────────────────
         SECTION 1 — COMMITMENTS HEADER
         White bg + radial teal glow top-right
         ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border border-slate-200">

        {/* Radial teal glow — top-right corner */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(72,156,140,0.09) 0%, transparent 55%)',
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-teal to-transparent" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Left column — text */}
          <div className="px-8 sm:px-10 lg:px-14 pt-10 pb-10 lg:border-r border-slate-100">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brand-teal" />
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">
                Pont Afrique Santé Partenaires · Lancé en 2025
              </p>
            </div>

            {/* Title */}
            <h2
              className="text-[36px] sm:text-[44px] lg:text-[50px] leading-[0.98] tracking-[-0.02em] mb-4 text-slate-900"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Construire ensemble{' '}
              <span className="italic font-light text-brand-teal">
                le réseau de santé africain.
              </span>
            </h2>

            <p className="text-[14px] sm:text-[15px] text-slate-500 leading-relaxed font-light max-w-md">
              Quatre hubs opérationnels. Une plateforme de coordination. Des engagements
              contractuels clairs. Aucun chiffre fabriqué.
            </p>

            {/* Footer note */}
            <p className="mt-8 text-[10px] text-slate-400 font-semibold uppercase tracking-[0.18em] border-t border-slate-100 pt-5">
              Ces engagements sont contractuels et figurent dans chaque accord cadre.
            </p>
          </div>

          {/* Right column — 2x2 commitment boxes */}
          <div className="grid grid-cols-2 border-t lg:border-t-0 border-slate-100">
            {IMPACT_STATS.map((stat, i) => {
              const Icon = IMPACT_ICONS[stat.iconKey]
              const isRight = i % 2 !== 0
              const isBottom = i >= 2
              return (
                <motion.div
                  key={stat.iconKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className={[
                    'relative p-6 lg:p-8 bg-white transition-colors hover:bg-slate-50/60',
                    !isRight ? 'border-r border-slate-100' : '',
                    !isBottom ? 'border-b border-slate-100' : '',
                  ].join(' ')}
                >
                  {/* Icon */}
                  <div className="w-8 h-8 flex items-center justify-center text-brand-teal mb-4">
                    <Icon size={16} strokeWidth={1.7} />
                  </div>

                  {/* Value */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <p
                      className="text-[36px] text-slate-900 leading-none tracking-tight font-light"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {stat.value}
                    </p>
                    {stat.unit && (
                      <span className="text-[15px] text-brand-teal font-semibold tracking-tight">
                        {stat.unit}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.12em] mb-1.5 leading-snug">
                    {stat.label}
                  </p>

                  {/* Detail */}
                  <p className="text-[10px] text-slate-400 leading-snug font-light">
                    {stat.detail}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <DiamondH />

      {/* ──────────────────────────────────────────────────────
         SECTION 3 — 4 PARTNER TYPES
         ────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-brand-teal" />
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">
              Quatre familles de partenaires
            </p>
          </div>
          <h3
            className="text-[34px] sm:text-[40px] lg:text-[44px] text-slate-900 leading-[1.05] tracking-[-0.015em] mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Bâtissons ensemble{' '}
            <span className="italic font-light text-brand-teal">
              la santé africaine de demain.
            </span>
          </h3>
          <p className="text-[14px] text-slate-500 leading-relaxed font-light max-w-2xl">
            Cliniques, assurances, ONG, gouvernements. Chaque famille a ses besoins,
            ses contraintes et ses objectifs. Nos accompagnements sont taillés sur mesure
            pour chacune.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PARTNER_TYPES.map((p, idx) => {
            const Icon = PARTNER_ICONS[p.iconKey]
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className={[
                  'relative bg-white p-7 lg:p-9 flex flex-col group transition-all',
                  p.highlighted
                    ? 'shadow-[inset_0_3px_0_0_#489c8c,0_2px_20px_-4px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_3px_0_0_#489c8c,0_8px_30px_-6px_rgba(72,156,140,0.18),0_0_0_1px_rgba(72,156,140,0.2)]'
                    : 'shadow-[0_2px_20px_-4px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-6px_rgba(72,156,140,0.18),0_0_0_1px_rgba(72,156,140,0.2)]',
                ].join(' ')}
              >
                {/* Icon only */}
                <div className="mb-5">
                  <div className={[
                    'w-12 h-12 flex items-center justify-center border transition-colors',
                    p.highlighted
                      ? 'border-brand-teal/30 bg-brand-teal/8 text-brand-teal'
                      : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-brand-teal/30 group-hover:text-brand-teal',
                  ].join(' ')}>
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                </div>

                {/* Name + tagline */}
                <h4
                  className="text-[26px] sm:text-[28px] text-slate-900 leading-[1.1] tracking-tight mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {p.name}
                </h4>
                <p className="text-[13px] italic text-brand-teal font-light leading-snug mb-4">
                  {p.tagline}
                </p>

                {/* Description */}
                <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                  {p.description}
                </p>

                {/* KPIs row — honest structural commitments */}
                <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-slate-100">
                  {p.kpis.map((kpi, i) => (
                    <div key={i}>
                      <p
                        className="text-[18px] font-bold text-slate-900 leading-none tracking-tight tabular-nums"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {kpi.value}
                      </p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1.5 leading-tight">
                        {kpi.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                  Ce que vous gagnez
                </p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rotate-45 bg-brand-teal mt-[7px] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-800 leading-snug">{b.title}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{b.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Requirements */}
                <div className="mb-5 bg-slate-50 border border-slate-100 px-4 py-3.5">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2.5">
                    Prérequis d&apos;intégration
                  </p>
                  <ul className="space-y-1.5">
                    {p.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={9} className="text-brand-teal shrink-0 mt-[3px]" />
                        <span className="text-[10px] text-slate-600 leading-snug">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link href="/contact?partner=true" onClick={closeMenu}>
                  <Button
                    className={[
                      'w-full h-12 text-[11px] font-bold uppercase tracking-[0.15em] rounded-none shadow-none',
                      p.highlighted
                        ? 'bg-brand-teal hover:bg-brand-teal-dark text-white'
                        : 'bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white',
                    ].join(' ')}
                  >
                    {p.cta} <ArrowRight size={12} className="ml-2" />
                  </Button>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* ── Établissements ciblés — fond typographique ─────── */}
        <div className="mt-12 pt-8 border-t border-slate-100 overflow-hidden select-none" aria-hidden="true">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-6 text-center">
            Établissements &amp; organisations ciblés
          </p>
          {PARTNER_TYPES.map(pt => (
            <div key={pt.id} className="flex items-baseline gap-5 mb-1 overflow-hidden">
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.22em] shrink-0 w-40 text-right leading-none pt-2">
                {pt.category}
              </span>
              <p
                className="text-[22px] font-light leading-snug tracking-tight whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontFamily: 'Georgia, serif', color: 'rgba(148,163,184,0.45)' }}
              >
                {pt.partners.join('\u2003·\u2003')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DiamondH />

      {/* ──────────────────────────────────────────────────────
         SECTION 5 — PROCESS TIMELINE
         ────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-brand-teal" />
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">
              Devenir partenaire
            </p>
          </div>
          <h3
            className="text-[32px] sm:text-[38px] lg:text-[42px] text-slate-900 leading-[1.05] tracking-[-0.015em] mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Quatre étapes structurées,{' '}
            <span className="italic font-light text-brand-teal">vingt et un jours.</span>
          </h3>
          <p className="text-[14px] text-slate-500 leading-relaxed font-light max-w-2xl">
            Un processus standardisé, transparent et rapide. Pas de tunnel commercial,
            pas de promesse vague. Vous savez exactement où vous mettez les pieds.
          </p>
        </div>

        <div
          className="relative grid grid-cols-1 lg:grid-cols-4 border border-slate-200"
          style={{ background: 'linear-gradient(to bottom, rgba(248,250,252,0.4), white)' }}
        >
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent z-0" />

          {ONBOARDING_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className={[
                'relative bg-transparent p-7 lg:p-8',
                i < ONBOARDING_STEPS.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-slate-200' : '',
              ].join(' ')}
            >
              {/* Marker — diamond teal */}
              <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 mb-5">
                <div className="w-5 h-5 rotate-45 border border-brand-teal/50 bg-brand-teal/8" />
                <div className="absolute w-2 h-2 rotate-45 bg-brand-teal" />
              </div>

              {/* Duration */}
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1.5">
                {step.duration}
              </p>

              {/* Title */}
              <h4
                className="text-[19px] text-slate-900 leading-snug tracking-tight mb-2.5"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {step.title}
              </h4>

              {/* Desc */}
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <DiamondH />

      {/* ──────────────────────────────────────────────────────
         SECTION 7 — FINAL CTA
         Near-black bg, teal glow orbs, no grid
         ────────────────────────────────────────────────────── */}
      <section className="relative bg-[#080c0f] text-white p-10 lg:p-16 overflow-hidden border border-[#080c0f]">

        {/* Top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-teal to-transparent" />

        {/* Glow orb — top right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(72,156,140,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Glow orb — bottom left, smaller */}
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(72,156,140,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Diamond accents */}
        <div className="absolute top-6 right-6 w-2 h-2 rotate-45 bg-brand-teal" />
        <div className="absolute bottom-6 left-6 w-2 h-2 rotate-45 border border-brand-teal" />

        <div className="relative max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-teal" />
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">
              Devenir partenaire Pont Afrique Santé
            </p>
          </div>

          <h3
            className="text-[40px] sm:text-[52px] lg:text-[60px] text-white leading-[0.98] tracking-[-0.02em] mb-5"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Prêt à rejoindre{' '}
            <span className="italic font-light text-brand-teal">le réseau ?</span>
          </h3>

          <p className="text-[15px] sm:text-[16px] text-slate-300/90 max-w-2xl leading-relaxed font-light mb-10">
            Notre équipe partenariats vous répond sous 48 heures.
            Premier rendez-vous de qualification offert, sans engagement, en visioconférence ou sur site.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact?partner=true" onClick={closeMenu}>
              <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white h-14 px-8 text-[13px] font-bold uppercase tracking-[0.15em] rounded-none shadow-lg shadow-brand-teal/20">
                Devenir partenaire <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
            <Link
              href="/contact?partner=true"
              onClick={closeMenu}
              className="text-[12px] font-bold text-white hover:text-brand-teal uppercase tracking-[0.15em] transition-colors inline-flex items-center gap-2 px-4 border border-white/20 hover:border-brand-teal/40 h-14"
            >
              Télécharger le dossier partenaire
            </Link>
          </div>

          {/* Trust strip — consistent with honest data */}
          <div className="mt-12 pt-8 border-t border-slate-700/50 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '< 48 h', label: 'Réponse garantie' },
              { value: '0 €', label: "Frais d\u2019adhésion" },
              { value: '21 j', label: 'Onboarding structuré' },
              { value: '4', label: 'Hubs actifs' },
            ].map((item, i) => (
              <div key={i}>
                <p
                  className="text-[20px] text-brand-teal leading-none tracking-tight font-light mb-1.5"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {item.value}
                </p>
                <p className="text-[9px] text-slate-400 uppercase tracking-[0.18em] font-semibold">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <p className="text-center text-[10px] text-slate-400 mt-10 tracking-[0.18em] uppercase font-semibold">
        Pont Afrique Santé · Plateforme de coordination médicale · Lancée en 2025
      </p>
    </div>
  )
}
