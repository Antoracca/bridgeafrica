'use client'

import { motion } from 'framer-motion'
import { Brain, Search, Target, Users, ArrowRight, TrendingUp, Globe, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

const steps = [
  {
    icon: Brain,
    title: "Analyse Expertisée",
    shortDesc: "Évaluation complète par nos experts médicaux",
    frontDesc: "Notre équipe d'experts analyse votre profil médical, budget et localisation",
    backPoints: [
      "Analyse de votre dossier médical par des professionnels",
      "Évaluation de votre budget et contraintes",
      "Prise en compte de votre pays d'origine"
    ],
    visual: "chart",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: Search,
    title: "Recherche Intelligente",
    shortDesc: "Sélection basée sur données et algorithmes",
    frontDesc: "Nos algorithmes scannent 300+ cliniques pour trouver les meilleures options",
    backPoints: [
      "Algorithmes avancés + validation experte",
      "Comparaison de 300+ établissements",
      "Critères: qualité, prix, délais, taux de succès"
    ],
    visual: "globe",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "from-cyan-50 to-cyan-100"
  },
  {
    icon: Target,
    title: "Décision Rationnelle",
    shortDesc: "Recommandations basées sur données objectives",
    frontDesc: "Nous vous présentons les meilleures options avec toutes les informations",
    backPoints: [
      "Données objectives et retours patients",
      "Comparatif détaillé prix/qualité",
      "Transparence totale sur nos critères"
    ],
    visual: "stats",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100"
  },
  {
    icon: Users,
    title: "Accompagnement Total",
    shortDesc: "Suivi personnalisé de A à Z",
    frontDesc: "Organisation complète de votre voyage médical et suivi post-opératoire",
    backPoints: [
      "Visa, billets, hôtel, transferts organisés",
      "Accompagnement sur place",
      "Suivi médical après votre retour"
    ],
    visual: "award",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100"
  }
]

const MiniVisual = ({ type, color }: { type: string, color: string }) => {
  if (type === "chart") {
    return (
      <div className="flex items-end gap-1 h-8">
        {[40, 65, 45, 80, 60].map((height, i) => (
          <motion.div
            key={i}
            className={`w-2 bg-gradient-to-t ${color} rounded-t`}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    )
  }

  if (type === "globe") {
    return (
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 h-8"
      >
        <Globe className={`w-full h-full bg-gradient-to-br ${color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
      </motion.div>
    )
  }

  if (type === "stats") {
    return (
      <div className="flex flex-col gap-1">
        {[90, 70, 85].map((width, i) => (
          <motion.div
            key={i}
            className="h-1.5 bg-gradient-to-r from-emerald-200 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    )
  }

  if (type === "award") {
    return (
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Award className={`w-8 h-8 bg-gradient-to-br ${color} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
      </motion.div>
    )
  }

  return null
}

const FlipCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Timeline dot & line (Desktop only) */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className={`w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl border-4 border-white`}
        >
          <step.icon className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-white" />
        </motion.div>
      </div>

      {/* Card - Version Mobile (Expandable) */}
      <div className={`flex-1 w-full lg:hidden`}>
        <motion.div
          className="w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`bg-gradient-to-br ${step.bgColor} backdrop-blur-xl rounded-3xl shadow-xl border-2 border-white/50 overflow-hidden`}>
            {/* Header - Toujours visible */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold">{step.shortDesc}</p>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                {step.frontDesc}
              </p>

              {/* Bouton expand */}
              <div className="flex items-center justify-between">
                <div className="w-20">
                  <MiniVisual type={step.visual} color={step.color} />
                </div>
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                  <span>{isExpanded ? 'Réduire' : 'Voir détails'}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Détails expandables */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isExpanded ? 'auto' : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${step.color} p-6 text-white`}>
                <div className="space-y-3">
                  {step.backPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                      transition={{ delay: isExpanded ? 0.1 + i * 0.1 : 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-white/90 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-white/95 leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Card - Version Desktop (3D Flip) */}
      <div className={`hidden lg:block flex-1 w-full lg:w-auto ${isEven ? 'lg:pr-16 xl:pr-24 2xl:pr-32' : 'lg:pl-16 xl:pl-24 2xl:pl-32'}`}>
        <div
          className="relative h-[320px] xl:h-[340px] 2xl:h-[360px] w-full perspective-1000"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <motion.div
            className="relative w-full h-full preserve-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Front Face */}
            <div className="absolute inset-0 backface-hidden">
              <div className={`h-full bg-gradient-to-br ${step.bgColor} backdrop-blur-xl rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all p-10 xl:p-12 2xl:p-14 border-2 border-white/50 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-base 2xl:text-lg shadow-lg`}>
                          {index + 1}
                        </div>
                        <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="text-sm xl:text-base 2xl:text-lg text-slate-600 font-semibold mb-4">{step.shortDesc}</p>
                    </div>
                  </div>

                  <p className="text-base xl:text-lg 2xl:text-xl text-slate-700 leading-relaxed mb-6">
                    {step.frontDesc}
                  </p>
                </div>

                {/* Mini Visual */}
                <div className="flex items-center justify-between">
                  <div className="w-24 xl:w-28 2xl:w-32">
                    <MiniVisual type={step.visual} color={step.color} />
                  </div>
                  <motion.div
                    className="text-sm text-slate-500 font-semibold flex items-center gap-2 opacity-70"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span>Survoler pour détails</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <div className={`h-full bg-gradient-to-br ${step.color} backdrop-blur-xl rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] shadow-2xl p-10 xl:p-12 2xl:p-14 border-2 border-white/30 flex flex-col justify-between text-white`}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <step.icon className="w-12 h-12 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14" />
                    <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-extrabold">{step.title}</h3>
                  </div>

                  <div className="space-y-4 xl:space-y-5 2xl:space-y-6">
                    {step.backPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2.5 h-2.5 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3 rounded-full bg-white/90 mt-2 flex-shrink-0" />
                        <p className="text-base xl:text-lg 2xl:text-xl text-white/95 leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <TrendingUp className="w-14 h-14 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 text-white/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 xl:py-28 2xl:py-32 bg-white relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-8 md:mb-10 xl:mb-12 2xl:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-900 mb-4 xl:mb-5 2xl:mb-6">
            Comment Nous Trouvons Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Meilleure Option</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-slate-600 leading-relaxed mb-6 xl:mb-7 2xl:mb-8">
            Un processus transparent guidé par l'expertise médicale et les données objectives
          </p>
          <span className="inline-block px-4 py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-bold tracking-wider uppercase text-xs sm:text-sm xl:text-base 2xl:text-lg rounded-full">
            Processus Expert
          </span>
        </motion.div>

        {/* Timeline with cards */}
        <div className="space-y-16 md:space-y-24 xl:space-y-32 2xl:space-y-40 mb-12 md:mb-16 xl:mb-20 2xl:mb-24 relative" style={{ marginTop: '4rem' }}>
          {/* Ligne de progression colorée (Desktop uniquement) - commence sur Processus Expert, s'arrête au 4ème point */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-1 z-0" style={{ top: '-64px', height: 'calc(100% - 120px)' }}>
            {/* Segment 1: Bleu (du point 1 au point 2) */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500 to-cyan-500" />
            {/* Segment 2: Cyan (du point 2 au point 3) */}
            <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-b from-cyan-500 to-emerald-500" />
            {/* Segment 3: Emerald (du point 3 au point 4) */}
            <div className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-b from-emerald-500 to-purple-500" />

            {/* Particules animées */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-lg"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full shadow-lg"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 4 }}
            />
          </div>

          {steps.map((step, index) => (
            <FlipCard key={index} step={step} index={index} />
          ))}
        </div>

        {/* Stats bar - Version Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:grid grid-cols-3 gap-6 xl:gap-8 2xl:gap-10 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-12 md:mb-16 xl:mb-20 2xl:mb-24"
        >
          {[
            { label: 'Décisions basées sur données', value: '500+', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
            { label: 'Experts médicaux', value: 'Plus de 30', icon: Users, color: 'from-cyan-500 to-cyan-600' },
            { label: 'Prix transparents', value: '100%', icon: Award, color: 'from-emerald-500 to-emerald-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-3xl p-6 xl:p-8 2xl:p-10 text-center shadow-lg hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="flex justify-center mb-3 2xl:mb-4">
                <div className={`w-12 h-12 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-white" />
                </div>
              </div>
              <div className={`text-4xl xl:text-5xl 2xl:text-6xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm xl:text-base 2xl:text-lg text-slate-600 font-medium leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar - Version Mobile (sans cards, directement sur fond) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:hidden flex flex-col gap-5 max-w-sm mx-auto mb-8"
        >
          {[
            { label: 'Décisions basées sur données', value: '500+', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
            { label: 'Experts médicaux', value: 'Plus de 30', icon: Users, color: 'from-cyan-500 to-cyan-600' },
            { label: 'Prix transparents', value: '100%', icon: Award, color: 'from-emerald-500 to-emerald-600' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className={`text-2xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 font-medium leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex justify-center"
        >
          <Link href="/notre-processus">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 xl:px-14 2xl:px-16 py-5 xl:py-6 2xl:py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all group text-lg xl:text-xl 2xl:text-2xl font-bold">
              <span>Découvrez Notre Processus de Sélection</span>
              <ArrowRight className="ml-4 w-6 h-6 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* CTA Button - Mobile (compact et attrayant) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:hidden flex justify-center px-4"
        >
          <Link href="/notre-processus" className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-5 rounded-2xl shadow-xl active:scale-95 transition-all group text-base font-bold">
              <div className="flex items-center justify-center gap-3">
                <span className="flex-1 text-center">Découvrez Notre Processus</span>
                <ArrowRight className="w-5 h-5 group-active:translate-x-1 transition-transform" />
              </div>
            </Button>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
