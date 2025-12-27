'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const clinics = [
  {
    name: 'Clinique Internationale Rabat',
    country: 'Maroc',
    specialty: 'Oncologie & Cardiologie',
    score: 9.8,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b9a44fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['Accrédité ISO', 'Hébergement VIP']
  },
  {
    name: 'Acibadem Hospital',
    country: 'Turquie',
    specialty: 'Greffe Capillaire & Esthétique',
    score: 9.9,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['International JCI', 'Translator incl.']
  },
  {
    name: 'Clinique Pasteur',
    country: 'Tunisie',
    specialty: 'Chirurgie Bariatrique',
    score: 9.6,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['Prix Fixe', 'Suivi à distance']
  },
  {
    name: 'Hôpital Américain de Paris',
    country: 'France',
    specialty: 'Neurologie de pointe',
    score: 9.9,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0929519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    tags: ['Expertise Mondiale', 'Plateau technique']
  }
]

export function TopClinics() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Excellence Médicale</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Le Top 10 des Établissements
            </h2>
          </div>
          <Button variant="ghost" className="hidden md:flex gap-2 text-blue-600">
            Voir les 300+ cliniques <ArrowRight size={16} />
          </Button>
        </div>

        {/* Horizontal Scroll / Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
          {clinics.map((clinic, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden snap-center group cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={clinic.image} 
                  alt={clinic.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 font-bold text-slate-800 shadow-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" /> {clinic.score}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xs text-blue-600 font-bold uppercase mb-2">{clinic.country}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{clinic.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{clinic.specialty}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {clinic.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-medium rounded-full border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle size={16} /> Vérifié par MediBridge
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
         <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">
                Voir toutes les cliniques
            </Button>
         </div>

      </div>
    </section>
  )
}
