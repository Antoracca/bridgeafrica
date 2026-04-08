'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, ChevronRight, Pause, Play,
  ClipboardCheck, Languages, Calculator, GitCompare, NotebookPen, PlayCircle,
  Brain, ShieldCheck, Activity, Users, BookOpen, Wrench, Sparkle,
  Clock, MapPin, Stethoscope, Quote, type LucideIcon,
} from 'lucide-react'
import {
  PATIENT_GUIDES, PATIENT_TOOLS, RESOURCE_ARGUMENTS,
  type PatientGuide, type PatientTool, type ResourceArgument,
} from '@/lib/data/resources'

/* ── Icon maps ─────────────────────────────────────────────── */
const TOOL_ICONS: Record<PatientTool['iconKey'], LucideIcon> = {
  clipboard: ClipboardCheck,
  glossary: Languages,
  calculator: Calculator,
  compare: GitCompare,
  logbook: NotebookPen,
  video: PlayCircle,
}

const ARG_ICONS: Record<ResourceArgument['iconKey'], LucideIcon> = {
  brain: Brain,
  shield: ShieldCheck,
  activity: Activity,
  users: Users,
}

/* ── Diamond separator ─────────────────────────────────────── */
function DiamondH() {
  return (
    <div className="flex items-center gap-4 py-12 select-none">
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

/* ── Carousel hook (auto rotate, pause on hover) ───────────── */
function useCarousel(length: number, interval = 6500) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const next = useCallback(() => setIndex(i => (i + 1) % length), [length])
  const prev = useCallback(() => setIndex(i => (i - 1 + length) % length), [length])
  const goTo = useCallback((i: number) => setIndex(i % length), [length])

  useEffect(() => {
    if (paused || length <= 1) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [paused, length, interval, next])

  return { index, next, prev, goTo, paused, setPaused }
}

/* ══════════════════════════════════════════════════════════════
   SECTION 1 — GUIDES CAROUSEL
   ══════════════════════════════════════════════════════════════ */
function GuidesCarousel({ closeMenu }: { closeMenu: () => void }) {
  const { index, next, prev, goTo, paused, setPaused } = useCarousel(PATIENT_GUIDES.length, 7000)
  const guide = PATIENT_GUIDES[index]
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      {/* Eyebrow row */}
      <div className="flex items-end justify-between mb-5 gap-4">
        <div className="flex items-center gap-2.5">
          <BookOpen size={14} className="text-brand-teal shrink-0" strokeWidth={2.2} />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Guides par hub et spécialité
          </p>
          <span className="hidden sm:inline-block text-[10px] text-slate-300 tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(PATIENT_GUIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? 'Reprendre' : 'Mettre en pause'}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-brand-teal transition-colors"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button
            onClick={prev}
            aria-label="Précédent"
            className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            <ArrowLeft size={13} />
          </button>
          <button
            onClick={next}
            aria-label="Suivant"
            className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div
        ref={containerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative border border-slate-200 bg-white overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={guide.id}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
          >
            {/* LEFT — editorial */}
            <div className="p-7 sm:p-9 lg:p-11 flex flex-col">

              {/* Hub badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-150 px-2.5 py-1.5">
                  <Image
                    src={`https://flagcdn.com/w40/${guide.hubCode}.png`}
                    alt={guide.hub}
                    width={18}
                    height={13}
                    className="w-[18px] h-auto rounded-[2px] shadow-sm"
                  />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    {guide.hub}
                  </span>
                </div>
                {guide.priority && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/8 border border-brand-teal/20 px-2 py-1">
                    <Sparkle size={9} strokeWidth={2.5} />
                    Hub prioritaire
                  </span>
                )}
                <span className="ml-auto text-[10px] text-slate-300 tabular-nums">
                  {guide.num}
                </span>
              </div>

              {/* Specialty eyebrow */}
              <div className="flex items-center gap-1.5 mb-2">
                <Stethoscope size={11} className="text-slate-400" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                  {guide.specialty}
                </p>
              </div>

              {/* Title */}
              <h3
                className="text-[24px] sm:text-[28px] lg:text-[30px] text-slate-900 leading-[1.15] tracking-tight mb-3"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {guide.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6 max-w-prose">
                {guide.excerpt}
              </p>

              {/* Reference + read time */}
              <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-6">
                <span className="flex items-center gap-1.5">
                  <MapPin size={10} className="text-slate-300" />
                  <span className="font-semibold text-slate-500">{guide.reference}</span>
                </span>
                <span className="w-px h-3 bg-slate-200" />
                <span className="flex items-center gap-1.5">
                  <Clock size={10} className="text-slate-300" />
                  Lecture {guide.readTime}
                </span>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <Link
                  href={guide.href}
                  onClick={closeMenu}
                  className="group inline-flex items-center gap-2 text-[12px] font-bold text-brand-teal uppercase tracking-wider hover:gap-3 transition-all"
                >
                  Lire le guide complet
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* RIGHT — stats panel */}
            <div className="bg-[#fafafa] border-t lg:border-t-0 lg:border-l border-slate-150 p-7 sm:p-9 lg:p-11 flex flex-col">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5">
                Repères clés
              </p>

              <div className="grid grid-cols-3 gap-3 mb-7">
                {guide.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-150 p-3.5 flex flex-col"
                  >
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      {stat.label}
                    </p>
                    <p className="text-[14px] font-extrabold text-slate-900 tracking-tight leading-tight">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                Ce qui est abordé
              </p>
              <ul className="space-y-2.5 flex-1">
                {guide.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-slate-600 leading-snug">
                    <div className="w-1 h-1 rotate-45 bg-brand-teal mt-[7px] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-100">
          <motion.div
            key={`${guide.id}-${paused}`}
            className="h-full bg-brand-teal origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{ duration: paused ? 0 : 7, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {PATIENT_GUIDES.map((g, i) => (
          <button
            key={g.id}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-[3px] transition-all duration-300
              ${i === index ? 'w-8 bg-brand-teal' : 'w-3 bg-slate-200 hover:bg-slate-300'}
            `}
          />
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION 2 — TOOLS GRID
   ══════════════════════════════════════════════════════════════ */
function ToolsGrid({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-5">
        <Wrench size={14} className="text-brand-teal shrink-0" strokeWidth={2.2} />
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Outils pratiques et contenus
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-slate-200">
        {PATIENT_TOOLS.map((tool, i) => {
          const Icon = TOOL_ICONS[tool.iconKey]
          const isLastCol = (i + 1) % 3 === 0
          const isLastRow = i >= PATIENT_TOOLS.length - 3
          return (
            <Link
              key={tool.id}
              href={tool.href}
              onClick={closeMenu}
              className={`group relative bg-white p-6 hover:bg-brand-teal/[0.025] transition-colors
                ${!isLastCol ? 'lg:border-r border-slate-150' : ''}
                ${!isLastRow ? 'border-b border-slate-150' : ''}
              `}
            >
              {/* Icon + metric */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 flex items-center justify-center bg-slate-50 border border-slate-150 group-hover:bg-brand-teal/10 group-hover:border-brand-teal/25 group-hover:text-brand-teal text-slate-500 transition-all">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <span className="text-[9px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/5 border border-brand-teal/15 px-2 py-1 whitespace-nowrap">
                  {tool.metric}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-[14px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors mb-1.5 leading-snug">
                {tool.name}
              </h4>

              {/* Short desc */}
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                {tool.shortDesc}
              </p>

              {/* Long desc */}
              <p className="text-[10px] text-slate-400 leading-relaxed italic mb-4">
                {tool.longDesc}
              </p>

              {/* Arrow */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 group-hover:text-brand-teal uppercase tracking-wider transition-colors">
                Ouvrir l&apos;outil
                <ChevronRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — WHY THESE RESOURCES (slides chiffrées)
   ══════════════════════════════════════════════════════════════ */
function WhyCarousel({ closeMenu }: { closeMenu: () => void }) {
  const { index, next, prev, goTo, paused, setPaused } = useCarousel(RESOURCE_ARGUMENTS.length, 6000)
  const arg = RESOURCE_ARGUMENTS[index]
  const Icon = ARG_ICONS[arg.iconKey]

  return (
    <div>
      <div className="flex items-end justify-between mb-5 gap-4">
        <div className="flex items-center gap-2.5">
          <Quote size={14} className="text-brand-teal shrink-0" strokeWidth={2.2} />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Pourquoi ces ressources comptent vraiment
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? 'Reprendre' : 'Pause'}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-brand-teal transition-colors"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button
            onClick={prev}
            aria-label="Précédent"
            className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            <ArrowLeft size={13} />
          </button>
          <button
            onClick={next}
            aria-label="Suivant"
            className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative border border-slate-200 bg-gradient-to-br from-[#fafafa] via-white to-brand-teal/[0.025] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={arg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]"
          >
            {/* LEFT — gigantic metric */}
            <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col items-start justify-center bg-white border-b lg:border-b-0 lg:border-r border-slate-150">
              <div className="w-12 h-12 flex items-center justify-center border border-brand-teal/25 bg-brand-teal/8 text-brand-teal mb-6">
                <Icon size={22} strokeWidth={1.7} />
              </div>
              <p
                className="text-[64px] sm:text-[80px] lg:text-[96px] text-brand-teal leading-none tracking-tight font-light"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {arg.metric}
              </p>
              <p className="text-[11px] text-slate-500 uppercase tracking-[0.18em] font-bold mt-3 max-w-[16ch] leading-snug">
                {arg.metricLabel}
              </p>
            </div>

            {/* RIGHT — narrative */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3">
                Argument {String(index + 1).padStart(2, '0')} sur {RESOURCE_ARGUMENTS.length}
              </p>
              <h3
                className="text-[22px] sm:text-[26px] lg:text-[28px] text-slate-900 leading-[1.2] tracking-tight mb-5"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {arg.title}
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-7 max-w-prose">
                {arg.body}
              </p>

              <div className="mt-auto pt-5 border-t border-slate-150 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-[10px] text-slate-400 italic">
                  Source : {arg.source}
                </p>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="group inline-flex items-center gap-2 text-[11px] font-bold text-brand-teal uppercase tracking-wider hover:gap-3 transition-all"
                >
                  Créer mon dossier patient
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-100">
          <motion.div
            key={`${arg.id}-${paused}`}
            className="h-full bg-brand-teal origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {RESOURCE_ARGUMENTS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => goTo(i)}
            aria-label={`Argument ${i + 1}`}
            className={`h-[3px] transition-all duration-300
              ${i === index ? 'w-8 bg-brand-teal' : 'w-3 bg-slate-200 hover:bg-slate-300'}
            `}
          />
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   NAV RESOURCES — Composition
   ══════════════════════════════════════════════════════════════ */
export function NavResources({ closeMenu }: { closeMenu: () => void }) {
  return (
    <div className="p-8 sm:p-10 lg:p-12">

      {/* ── Header ── */}
      <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
        <div>
          <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-1">
            Éducation patient et préparation
          </p>
          <h2
            className="text-2xl sm:text-3xl text-slate-900 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Ressources et guides patient
          </h2>
          <p className="text-[13px] text-slate-500 mt-1 max-w-2xl">
            Six guides éditoriaux par hub et spécialité, six outils pratiques,
            quatre arguments chiffrés. Tout ce qu&apos;il faut pour préparer votre
            séjour médical en confiance.
          </p>
        </div>
        <Link
          href="/ressources"
          onClick={closeMenu}
          className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-teal hover:text-brand-teal-dark transition-colors shrink-0 uppercase tracking-wider"
        >
          Voir toutes les ressources
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* ── 1. Guides carousel ── */}
      <GuidesCarousel closeMenu={closeMenu} />

      <DiamondH />

      {/* ── 2. Tools grid ── */}
      <ToolsGrid closeMenu={closeMenu} />

      <DiamondH />

      {/* ── 3. Why carousel ── */}
      <WhyCarousel closeMenu={closeMenu} />

      {/* ── Footer note ── */}
      <p className="text-center text-[10px] text-slate-400 mt-10 tracking-widest uppercase">
        Toutes nos ressources sont rédigées par notre équipe éditoriale médicale et révisées par des praticiens partenaires.
      </p>
    </div>
  )
}
