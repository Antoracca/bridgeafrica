'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Shield, FileText, Globe, HeartHandshake, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

/* ══════════════════════════════════════════════════════════════
   HOW IT WORKS — 4 steps of the patient journey
   ══════════════════════════════════════════════════════════════ */

export interface HowStep {
  num: string
  title: string
  desc: string
  duration: string
  Icon: LucideIcon
}

export const HOW_STEPS: HowStep[] = [
  {
    num: '01',
    title: 'Sanctuaire des Données',
    desc: 'Vos antécédents sont isolés et protégés par un secret médical inconditionnel.',
    duration: 'Étape Initiale',
    Icon: Shield,
  },
  {
    num: '02',
    title: 'Collège des Référents',
    desc: 'Un diagnostic croisé établi avec prudence par les meilleurs spécialistes mondiaux.',
    duration: '< 48 heures',
    Icon: FileText,
  },
  {
    num: '03',
    title: 'Orientation Majeure',
    desc: 'Nous vous dirigeons vers le plateau technique d\'excellence le plus adapté.',
    duration: 'Sur validation',
    Icon: Globe,
  },
  {
    num: '04',
    title: 'Service Consulaire',
    desc: 'Orchestration logistique totale (visa, vol, escorte) pour une sérénité absolue.',
    duration: 'Tout le séjour',
    Icon: HeartHandshake,
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
    // Structure pleine largeur, fond crème très élégant
    <div className="flex bg-[#FDFBF7] min-h-[500px]">
      
      {/* ── COLONNE GAUCHE (Image Immersive) ── */}
      <div className="hidden lg:block lg:w-[35%] relative border-r border-[#E5E5E5]/50">
         <Image 
           src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
           alt="Un médecin accueille chaleureusement un patient"
           fill
           className="object-cover"
         />
         {/* Filtre très doux pour l'élégance */}
         <div className="absolute inset-0 bg-[#1B433E]/10 mix-blend-multiply" />
      </div>

      {/* ── COLONNE DROITE (Contenu Institutionnel) ── */}
      <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">

        {/* Header (Georgia, sans aucun noir absolu) */}
        <div className="mb-10">
          <p className="text-[10px] font-bold text-[#1B433E] uppercase tracking-[0.2em] mb-3 relative inline-block">
            Notre Méthodologie
            <span className="absolute -bottom-1 left-0 w-8 h-px bg-[#1B433E]/30" />
          </p>
          <h2 className="text-2xl sm:text-3xl text-[#1a2f2b] mt-4 tracking-tight leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
            Un parcours clinique repensé<br />pour votre sérénité.
          </h2>
        </div>

        {/* Grille 2x2 des étapes (Plus de lecture verticale fastidieuse) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {HOW_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: 'easeOut' }}
              className="flex flex-col"
            >
               {/* Marqueur + Icône */}
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#d6dfdd] flex items-center justify-center text-[#1B433E] shadow-sm">
                     <step.Icon size={12} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] text-slate-500 font-serif italic">{step.duration}</span>
               </div>
               
               {/* Titre (Vert Empire très sombre) */}
               <h3 className="text-[16px] text-[#1B433E] font-medium leading-snug mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  <span className="text-[#8e9c9a] mr-2 text-[14px]">{(idx + 1).toString().padStart(2, '0')}.</span>
                  {step.title}
               </h3>
               
               {/* Description */}
               <p className="text-[12px] text-[#556965] leading-relaxed max-w-[250px] font-light">
                  {step.desc}
               </p>
            </motion.div>
          ))}
        </div>

        {/* CTA (Bouton classe, fond blanc, texte clair, design document officiel) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-6 border-t border-[#d6dfdd] flex items-center justify-between flex-wrap gap-4"
        >
           <div>
             <p className="text-[13px] font-bold text-[#1B433E]" style={{ fontFamily: 'Georgia, serif' }}>
               Souhaitez-vous entamer l'étude de votre dossier ?
             </p>
             <p className="text-[11px] text-[#556965] mt-1 font-light italic">
               Dès le premier contact, notre secrétariat vous garantit une discrétion absolue.
             </p>
           </div>
           
           <Link href="/register" onClick={closeMenu}>
             <Button className="bg-[#1B433E] hover:bg-[#122e2a] text-white px-8 h-10 text-[10px] uppercase tracking-[0.15em] font-bold rounded-none shadow-sm transition-colors">
               Démarrer l'étude <ArrowRight size={14} className="ml-3" />
             </Button>
           </Link>
        </motion.div>

      </div>
    </div>
  )
}
