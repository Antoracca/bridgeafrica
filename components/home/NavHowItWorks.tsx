'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Shield, Brain, Network, Headphones, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS — 4 steps of the patient journey
   Exported for reuse in mobile component
   ══════════════════════════════════════════════════════════════ */

export interface HowStep {
  num: string
  eyebrow: string
  title: string
  desc: string
  duration: string
  highlights: string[]
  Icon: LucideIcon
}

export const HOW_STEPS: HowStep[] = [
  {
    num: '01',
    eyebrow: 'Sécurité',
    title: 'Votre dossier, sous coffre-fort',
    desc: 'Numérisation chiffrée AES-256 et hébergement certifié HDS en France. Votre dossier reste sous votre contrôle exclusif.',
    duration: '< 24 heures',
    highlights: ['Chiffrement AES-256', 'Certifié HDS France', 'Conformité RGPD'],
    Icon: Shield,
  },
  {
    num: '02',
    eyebrow: 'Intelligence',
    title: 'Analyse IA & validation humaine',
    desc: 'Pré-analyse par IA médicale certifiée, puis validation rigoureuse par notre comité d\'experts indépendants.',
    duration: '< 24 heures',
    highlights: ['IA médicale certifiée', 'Comité d\'experts', 'Validation systématique'],
    Icon: Brain,
  },
  {
    num: '03',
    eyebrow: 'Réseau',
    title: 'Matching avec l\'établissement idéal',
    desc: 'Mise en relation avec nos hôpitaux et cliniques partenaires certifiés JCI, sélectionnés dans 4 hubs internationaux.',
    duration: '< 24 heures',
    highlights: ['4 hubs d\'excellence', 'Certifications JCI & ISO', 'Devis médical détaillé'],
    Icon: Network,
  },
  {
    num: '04',
    eyebrow: 'Conciergerie',
    title: 'Orchestration de bout en bout',
    desc: 'Coordination complète du séjour : visas, vols, transferts VIP, hébergement, interprète et suivi post-opératoire.',
    duration: 'Tout le séjour',
    highlights: ['Conciergerie 24/7', 'Logistique intégrale', 'Suivi post-opératoire'],
    Icon: Headphones,
  },
]

/* ══════════════════════════════════════════════════════════════
   NAV HOW IT WORKS — Desktop right panel
   ══════════════════════════════════════════════════════════════ */

interface Props {
  closeMenu: () => void
}

export function NavHowItWorks({ closeMenu }: Props) {
  return (
    <div className="p-8 sm:p-10 lg:p-12">

      {/* ── Header ── */}
      <div className="mb-12">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-1">
          Parcours patient
        </p>
        <h2 className="text-2xl sm:text-3xl text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Comment ça marche
        </h2>
        <p className="text-[13px] text-slate-500 mt-1">
          Un parcours en 4 étapes conçu pour la précision et la sérénité
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative max-w-3xl">

        {/* Vertical connecting line */}
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-brand-teal/40 via-slate-200 to-brand-teal/40" />

        <div className="space-y-10">
          {HOW_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-[40px_1fr] gap-6"
            >
              {/* Step marker — number with diamond accent */}
              <div className="relative z-10 flex items-start justify-center pt-0.5">
                <div className="relative w-10 h-10 bg-white border border-brand-teal/30 flex items-center justify-center shadow-sm">
                  <span className="text-[11px] font-bold text-brand-teal tabular-nums tracking-wider">{step.num}</span>
                  {/* Diamond corner accent */}
                  <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 rotate-45 bg-brand-teal" />
                </div>
              </div>

              {/* Content */}
              <div className="pb-3">
                {/* Eyebrow + duration */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <step.Icon size={11} className="text-brand-teal" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{step.eyebrow}</p>
                  </div>
                  <div className="h-px flex-1 bg-slate-150" />
                  <span className="text-[10px] text-slate-400 font-semibold tabular-nums whitespace-nowrap">{step.duration}</span>
                </div>

                {/* Majestic title */}
                <h3 className="text-[19px] sm:text-[20px] text-slate-900 tracking-tight leading-snug mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {step.title}
                </h3>

                {/* Brief description */}
                <p className="text-[12px] text-slate-500 leading-relaxed mb-3.5 max-w-xl">
                  {step.desc}
                </p>

                {/* Highlights — inline */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check size={10} className="text-brand-teal shrink-0" />
                      <span className="text-[11px] font-medium text-slate-600">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
        className="mt-12 pt-8 border-t border-slate-100 max-w-3xl"
      >
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[13px] font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              Prêt à commencer votre parcours ?
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Obtenez une première analyse de votre dossier en moins de 48 heures.
            </p>
          </div>
          <Link href="/register" onClick={closeMenu}>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 h-11 text-[13px] font-bold rounded-none shadow-sm">
              Démarrer mon parcours <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
