'use client'

import { motion } from 'framer-motion'
import { Plane, MapPin } from 'lucide-react'

const sources = [
  { name: 'Gabon', flag: '🇬🇦' },
  { name: 'Cameroun', flag: '🇨🇲' },
  { name: 'Congo', flag: '🇨🇬' },
  { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { name: 'Sénégal', flag: '🇸🇳' },
]

const destinations = [
  { name: 'Maroc', flag: '🇲🇦', city: 'Casablanca, Rabat' },
  { name: 'Turquie', flag: '🇹🇷', city: 'Istanbul' },
  { name: 'Tunisie', flag: '🇹🇳', city: 'Tunis' },
  { name: 'France', flag: '🇫🇷', city: 'Paris' },
]

export function Destinations() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Le Pont Médical <span className="text-blue-600">Intercontinental</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Nous connectons les patients d\'Afrique Centrale et de l\'Ouest aux pôles d\'excellence médicale mondiaux.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Source Countries */}
            <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-center md:text-left mb-6">Départ (Chez Vous)</div>
                {sources.map((country, idx) => (
                    <motion.div 
                        key={country.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition-shadow"
                    >
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-medium text-slate-800">{country.name}</span>
                    </motion.div>
                ))}
            </div>

            {/* The Bridge Animation */}
            <div className="hidden md:flex flex-col items-center justify-center py-12 relative">
                <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
                     <svg width="300" height="400" viewBox="0 0 300 400" className="stroke-blue-400 fill-none stroke-2 stroke-dashed">
                         <path d="M 50 50 C 150 50, 150 350, 250 350" />
                         <path d="M 50 125 C 150 125, 150 275, 250 275" />
                         <path d="M 50 200 C 150 200, 150 200, 250 200" />
                         <path d="M 50 275 C 150 275, 150 125, 250 125" />
                         <path d="M 50 350 C 150 350, 150 50, 250 50" />
                     </svg>
                </div>
                <div className="bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-600/30 z-10 animate-pulse">
                    <Plane size={32} className="rotate-90" />
                </div>
                <div className="mt-4 font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full text-sm">
                    Prise en charge Visa & Vol
                </div>
            </div>

            {/* Destination Countries */}
            <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-center md:text-right mb-6">Arrivée (Soins)</div>
                {destinations.map((country, idx) => (
                    <motion.div 
                        key={country.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-end gap-3 hover:shadow-md transition-shadow group cursor-pointer"
                    >
                        <div className="text-right">
                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{country.name}</div>
                            <div className="text-xs text-slate-500 flex items-center justify-end gap-1">
                                <MapPin size={10} /> {country.city}
                            </div>
                        </div>
                        <span className="text-3xl shadow-sm rounded-md overflow-hidden">{country.flag}</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}
