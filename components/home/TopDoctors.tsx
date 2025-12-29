'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Stethoscope } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const doctors = [
  {
    id: 1,
    name: 'Dr. Mehmet Özkan',
    title: 'Chirurgien Cardiovasculaire',
    specialty: 'Cardiologie Interventionnelle',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    country: 'Turquie',
    location: 'Istanbul',
    rating: 4.9,
    experience: '22 ans',
    description: 'Expert reconnu en chirurgie cardiovasculaire avec plus de 8500 interventions réussies. Spécialisé dans les techniques minimalement invasives et la chirurgie robotique.',
  },
  {
    id: 2,
    name: 'Dr. Sarah Benali',
    title: 'Neurochirurgienne',
    specialty: 'Neurologie & Spine',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    country: 'Maroc',
    location: 'Rabat',
    rating: 5.0,
    experience: '18 ans',
    description: 'Pionnière en neurochirurgie spinale au Maroc. Formée aux États-Unis avec une expertise reconnue en microchirurgie et traitement des tumeurs cérébrales.',
  },
  {
    id: 3,
    name: 'Dr. Jean-Pierre Moreau',
    title: 'Oncologue Médical',
    specialty: 'Oncologie & Radiothérapie',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    country: 'France',
    location: 'Paris',
    rating: 4.9,
    experience: '28 ans',
    description: 'Leader en oncologie médicale et immunothérapie. A traité plus de 12000 patients avec un taux de succès exceptionnel. Chercheur actif dans les nouvelles thérapies ciblées.',
  },
  {
    id: 4,
    name: 'Dr. Fatima El Amrani',
    title: 'Chirurgienne Bariatrique',
    specialty: 'Chirurgie de l\'Obésité',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    country: 'Tunisie',
    location: 'Tunis',
    rating: 4.8,
    experience: '15 ans',
    description: 'Spécialiste de la chirurgie bariatrique avec un taux de réussite de 99.1%. Pionnière des techniques mini-invasives en Afrique du Nord.',
  },
  {
    id: 5,
    name: 'Dr. Alexander Volkov',
    title: 'Orthopédiste Sportif',
    specialty: 'Orthopédie & Traumatologie',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    country: 'Turquie',
    location: 'Ankara',
    rating: 4.9,
    experience: '20 ans',
    description: 'Expert en chirurgie orthopédique et médecine du sport. Ancien médecin d\'équipes olympiques avec une expertise en prothèses articulaires de dernière génération.',
  },
  {
    id: 6,
    name: 'Dr. Amina Ould Hassan',
    title: 'Ophtalmologue Laser',
    specialty: 'Ophtalmologie & Chirurgie Réfractive',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    country: 'Maroc',
    location: 'Casablanca',
    rating: 5.0,
    experience: '12 ans',
    description: 'Pionnière du LASIK au Maroc avec un taux de succès de 99.5%. Formée aux techniques les plus avancées de chirurgie réfractive et traitement du kératocône.',
  },
]

export function TopDoctors() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeDoctor = doctors[activeIndex]

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:py-24 xl:py-32 2xl:py-40 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header avec ligne */}
        <div className="mb-8 md:mb-12 xl:mb-16 2xl:mb-20 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight">
            NOS MEILLEURS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">MÉDECINS PARTENAIRES</span>
          </h2>
        </div>
        <div className="h-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 mb-8 md:mb-12 xl:mb-16 2xl:mb-20 rounded-full" />

        {/* Section principale */}
        <div className="mb-12 md:mb-16 xl:mb-20 2xl:mb-24">
          {/* Version Mobile */}
          <div className="md:hidden">
            <motion.div
              key={`mobile-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Photo compacte mobile */}
              <div className="relative w-56 h-56 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={activeDoctor.image}
                  alt={activeDoctor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Infos mobile */}
              <div className="text-center px-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {activeDoctor.name}
                </h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  {activeDoctor.title}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {activeDoctor.description}
                </p>

                {/* Bouton RDV mobile */}
                <button className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-95">
                  Prendre RDV
                </button>
              </div>
            </motion.div>
          </div>

          {/* Version Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20">
            {/* Colonne gauche : Infos */}
            <motion.div
              key={`info-${activeIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              {/* Badge médical */}
              <div className="w-20 h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-6 xl:mb-8 shadow-xl border-2 border-white">
                <Stethoscope className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 text-blue-600" />
              </div>

              {/* Nom */}
              <h3 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-slate-900 mb-3 xl:mb-4">
                {activeDoctor.name}
              </h3>

              {/* Titre */}
              <p className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 xl:mb-8">
                {activeDoctor.title}
              </p>

              {/* Description */}
              <p className="text-base md:text-lg xl:text-xl 2xl:text-2xl text-slate-600 leading-relaxed mb-6 xl:mb-8">
                {activeDoctor.description}
              </p>

              {/* Bouton RDV */}
              <button className="inline-flex items-center gap-3 bg-slate-900 text-white font-bold text-sm md:text-base xl:text-lg 2xl:text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <span>Prendre RDV</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Colonne droite : Photo */}
            <motion.div
              key={`photo-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl xl:rounded-2xl 2xl:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={activeDoctor.image}
                  alt={activeDoctor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel horizontal en bas */}
        <div className="relative pb-24 md:pb-32 xl:pb-40">
          {/* Photos circulaires */}
          <div className="flex items-center justify-center gap-2 md:gap-4 xl:gap-6 2xl:gap-8 px-10 md:px-12 xl:px-16">
            {doctors.map((doctor, index) => {
              const isActive = index === activeIndex
              return (
                <motion.button
                  key={doctor.id}
                  onClick={() => setActiveIndex(index)}
                  className="relative flex-shrink-0"
                  initial={false}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Photo */}
                  <div
                    className={`relative rounded-full overflow-hidden border-4 ${
                      isActive ? 'border-blue-600 shadow-xl ring-2 ring-blue-100' : 'border-slate-200'
                    } ${
                      isActive
                        ? 'w-16 h-16 md:w-24 md:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32'
                        : 'w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24'
                    }`}
                  >
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Nom en dessous pour l'actif - Desktop uniquement */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hidden md:block absolute -bottom-16 xl:-bottom-20 2xl:-bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                    >
                      <p className="text-slate-900 font-bold text-sm xl:text-base 2xl:text-lg">
                        {doctor.name}
                      </p>
                      <p className="text-blue-600 text-xs xl:text-sm 2xl:text-base font-semibold">
                        {doctor.title}
                      </p>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* CTA Devenir Partenaire */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-16 text-center px-4"
        >
          <Link href="/register?role=medecin">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05, y: 0 }}
              className="inline-block"
            >
              <Button variant="outline" className="w-full sm:w-auto rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-4 sm:px-8 sm:py-6 h-auto text-sm sm:text-lg font-bold shadow-lg whitespace-normal text-center leading-tight">
                Vous êtes médecin ? Devenez partenaire
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
