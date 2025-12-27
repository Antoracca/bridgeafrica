'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Award, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const doctors = [
  {
    name: "Dr. Karim Tazi",
    specialty: "Chirurgie Cardiaque",
    experience: "25 ans d'expérience",
    location: "Casablanca, Maroc",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Ex-Chef de Clinique Paris", "+5000 Opérations"]
  },
  {
    name: "Dr. Elif Yilmaz",
    specialty: "Greffe Capillaire",
    experience: "15 ans d'expérience",
    location: "Istanbul, Turquie",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Technique DHI/FUE", "Certifiée ISHRS"]
  },
  {
    name: "Dr. Sophie Martin",
    specialty: "Oncologie",
    experience: "20 ans d'expérience",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Recherche Clinique", "Expertise Sarcomes"]
  },
  {
    name: "Dr. Ahmed Ben Ali",
    specialty: "Chirurgie Orthopédique",
    experience: "18 ans d'expérience",
    location: "Tunis, Tunisie",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Prothèse Hanche", "Médecine du Sport"]
  }
]

export function TopDoctors() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">L'Élite Médicale</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              Rencontrez nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experts</span>
            </h2>
            <p className="text-lg text-slate-600 mt-4">
              Sélectionnés pour leur excellence académique et leur taux de réussite. Ils exercent dans les meilleurs hôpitaux internationaux.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
             Voir tous les médecins
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-50 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
            >
              {/* Image Container */}
              <div className="h-80 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10" />
                 <img 
                   src={doc.image} 
                   alt={doc.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                 />
                 
                 {/* Badges Flottants */}
                 <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Stethoscope size={12} className="text-blue-600"/> {doc.specialty}
                 </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 <h3 className="text-xl font-bold mb-1">{doc.name}</h3>
                 <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                    <MapPin size={14} /> {doc.location}
                 </div>
                 
                 {/* Hidden Details that slide up */}
                 <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="pt-3 border-t border-white/20 space-y-2">
                       <p className="text-sm flex items-center gap-2 text-blue-300"><Award size={14}/> {doc.experience}</p>
                       <div className="flex flex-wrap gap-2 pt-2">
                          {doc.tags.map(tag => (
                             <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded border border-white/10">
                                {tag}
                             </span>
                          ))}
                       </div>
                       <Button size="sm" className="w-full mt-4 bg-white text-slate-900 hover:bg-blue-50">
                          Prendre RDV
                       </Button>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full">
                Voir tous les médecins
            </Button>
         </div>
      </div>
    </section>
  )
}
