'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const testimonials = [
  {
    name: "Moussa D.",
    from: "Libreville, Gabon",
    to: "Casablanca, Maroc",
    treatment: "Chirurgie Cardiaque",
    quote: "J'avais peur de partir seul. MediBridge a tout géré. Le chauffeur m'attendait à l'aéroport Mohammed V. L'opération a sauvé ma vie.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Aminata S.",
    from: "Dakar, Sénégal",
    to: "Istanbul, Turquie",
    treatment: "FIV (Fertilité)",
    quote: "Après 5 ans d'échec, nous avons tenté Istanbul grâce à MediBridge. Les médecins étaient incroyables. Je suis enceinte de 6 mois aujourd'hui.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Jean-Paul K.",
    from: "Douala, Cameroun",
    to: "Tunis, Tunisie",
    treatment: "Prothèse de Hanche",
    quote: "Un prix divisé par 3 par rapport à l'Europe pour une qualité identique. La clinique à Tunis ressemblait à un hôtel 5 étoiles.",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">Histoires Vraies</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2">Ils nous ont fait confiance</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              {/* Fake Video Player */}
              <div className="h-48 relative cursor-pointer">
                <img src={t.videoThumbnail} alt="Témoignage" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="fill-white text-white ml-1" />
                   </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs font-bold">
                   {t.from} ➔ {t.to}
                </div>
              </div>

              <div className="p-8">
                 <div className="flex items-center gap-4 mb-6">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
                    <div>
                        <div className="font-bold text-lg">{t.name}</div>
                        <div className="text-blue-400 text-sm">{t.treatment}</div>
                    </div>
                 </div>
                 <p className="text-slate-300 italic leading-relaxed">
                   "{t.quote}"
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
