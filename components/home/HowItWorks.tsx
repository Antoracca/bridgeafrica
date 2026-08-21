'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { OnboardingModal } from './OnboardingModal'

const steps = [
  {
    tab: 'Sécurité',
    title: 'Numérisation chiffrée de votre dossier',
    description:
      'Votre dossier médical est numérisé et stocké dans un coffre-fort numérique chiffré AES-256, certifié Hébergeur de Données de Santé (HDS). Vos documents ne quittent jamais un environnement sécurisé et restent sous votre contrôle total.',
    highlights: [
      'Chiffrement de bout en bout, norme AES-256',
      'Hébergement certifié HDS en France',
      'Accès contrôlé exclusivement par le patient',
      'Conformité RGPD et standards européens',
    ],
  },
  {
    tab: 'Intelligence',
    title: 'Analyse IA & validation par comité médical',
    description:
      'Notre intelligence artificielle pré-analyse votre dossier en quelques secondes : identification des spécialités requises, détection des priorités cliniques. Le résultat est ensuite soumis à notre comité médical d\'experts indépendants pour une validation humaine rigoureuse.',
    highlights: [
      'Pré-analyse automatisée par IA certifiée',
      'Comité médical composé de spécialistes référents',
      'Validation humaine systématique avant transmission',
      'Précision diagnostique garantie',
    ],
  },
  {
    tab: 'Réseau',
    title: 'Mise en relation avec l\'établissement idéal',
    description:
      'Votre profil clinique est mis en correspondance avec nos établissements partenaires sélectionnés rigoureusement — hôpitaux et cliniques certifiés JCI dans nos 4 hubs internationaux. Vous recevez un devis médical personnalisé sous 48 heures.',
    highlights: [
      '4 hubs d\'excellence internationaux',
      'Hôpitaux et cliniques certifiés JCI & ISO',
      'Devis médical détaillé sous 48 heures',
      'Matching intelligent patient-établissement',
    ],
  },
  {
    tab: 'Conciergerie',
    title: 'Orchestration intégrale de votre parcours',
    description:
      'Pont Afrique Santé prend en charge la coordination complète de votre séjour médical : téléconsultation pré-opératoire, visas médicaux, vols, transferts VIP, hébergement à proximité de l\'établissement et suivi post-opératoire personnalisé.',
    highlights: [
      'Conciergerie médicale dédiée, disponible 24h/24',
      'Logistique complète : vol, visa, transfert, hébergement',
      'Téléconsultation pré-opératoire incluse',
      'Suivi post-opératoire personnalisé à distance',
    ],
  },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const step = steps[active]

  return (
    <section className="bg-[#f3f3f3] py-14 sm:py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">

        {/* Header — à gauche, grand, aéré */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '0px 0px -80px 0px' }}
           transition={{ duration: 0.6 }}
           className="mb-10 sm:mb-16 md:mb-20"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-slate-400 font-semibold mb-3 sm:mb-5">
            Comment ça marche
          </p>
          <h2 className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
            Une précision<br /> chirurgicale
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-lg mt-3 sm:mt-5">
            Chaque étape de votre parcours est pensée pour garantir sécurité, efficacité et sérénité totale.
          </p>
        </motion.div>

        {/* Tabs + Card container */}
        <div className="relative">

          {/* Onglets — grille responsive 2x2 sur mobile et 4 colonnes sur desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 relative z-10 px-1 sm:px-6 mb-2 sm:mb-0 sm:-mb-[1px]">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`
                  w-full py-2.5 sm:py-3.5 px-2 text-xs min-[360px]:text-sm sm:text-[15px] font-bold transition-all duration-300 rounded-t-lg sm:rounded-t-none
                  ${active === idx
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-300/40'
                    : 'bg-white text-slate-700 shadow-xs hover:shadow-md hover:-translate-y-0.5'
                  }
                `}
              >
                {s.tab}
              </button>
            ))}
          </div>

          {/* Grande carte blanche */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white shadow-xl relative z-0 rounded-2xl sm:rounded-none overflow-hidden"
            >
              <div className="px-5 sm:px-10 lg:px-14 py-7 sm:py-12">

                {/* Titre de l'étape */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3 sm:mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed max-w-2xl mb-6 sm:mb-8">
                  {step.description}
                </p>

                {/* Points clés — grille 1 ou 2 colonnes */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {step.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-brand-teal shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* CTA */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '0px 0px -80px 0px' }}
           transition={{ duration: 0.5, delay: 0.15 }}
           className="mt-10 sm:mt-16"
        >
          <button
            onClick={() => setOnboardingOpen(true)}
            className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-10 bg-slate-900 hover:bg-brand-teal text-white text-sm sm:text-base font-semibold
                       transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-3 group shadow-lg"
          >
            Démarrer votre accompagnement
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />
    </section>
  )
}
