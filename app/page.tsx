import dynamic from 'next/dynamic'
import { Navbar } from '@/components/home/Navbar'
import { Hero } from '@/components/home/Hero'
import { Button } from '@/components/ui/button'
import { HeartPulse, CheckCircle, ArrowRight } from 'lucide-react'

const Destinations = dynamic(() => import('@/components/home/Destinations').then(m => ({ default: m.Destinations })))
const HowItWorks   = dynamic(() => import('@/components/home/HowItWorks').then(m => ({ default: m.HowItWorks })))
const TopClinics   = dynamic(() => import('@/components/home/TopClinics').then(m => ({ default: m.TopClinics })))
const TopDoctors   = dynamic(() => import('@/components/home/TopDoctors').then(m => ({ default: m.TopDoctors })))
const Technology   = dynamic(() => import('@/components/home/Technology').then(m => ({ default: m.Technology })))
const Packages     = dynamic(() => import('@/components/home/Packages').then(m => ({ default: m.Packages })))
const Footer       = dynamic(() => import('@/components/home/Footer').then(m => ({ default: m.Footer })))

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-teal-pale selection:text-brand-navy">
      <Navbar />
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Le Pont Médical */}
      <Destinations />

      {/* 3. Comment ça marche */}
      <HowItWorks />

      {/* 4. Top Cliniques */}
      <TopClinics />

      {/* 5. Top Doctors */}
      <TopDoctors />

      {/* 6. Technologie IA */}
      <Technology />

      {/* 7. Packages Tout Inclus (New Design) */}
      <Packages />

      {/* 8. Call to Action Final - Design Magistral BCG */}
      <section className="relative py-32 bg-[#020617] overflow-hidden flex items-center justify-center border-t border-slate-800">
         {/* Background Image magistrale / Sombre */}
         <div className="absolute inset-0">
           <img 
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1600" 
              alt="Hôpital luxueux ou hall d'hôtel 5 étoiles" 
              className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/40"></div>
         </div>
         
         <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 text-center">
            <h3 className="text-brand-teal tracking-[0.3em] text-[10px] uppercase font-bold mb-6">
               Prêt à franchir le pas
            </h3>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal text-white mb-8 leading-[1.05]" style={{ fontFamily: 'Georgia, serif' }}>
               Votre santé est absolue.<br />
               <span className="text-slate-400 italic font-light">Notre engagement aussi.</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-slate-400 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
               Confiez l'intégralité de votre logistique médicale à l'architecture MediBridge. Nos experts orchestrent chaque étape de votre prise en charge internationale avec un devoir d'excellence certifié.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
               <button className="w-full sm:w-auto bg-brand-teal text-white px-10 h-16 text-xs font-bold uppercase tracking-[0.1em] hover:bg-brand-teal-dark transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(72,156,140,0.2)]">
                  Débuter L'Étude de Dossier <ArrowRight size={14} />
               </button>
               <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 h-16 text-xs font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-3">
                  Contacter La Conciergerie
               </button>
            </div>
            
            <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
               <span className="flex items-center gap-3"><CheckCircle size={14} className="text-brand-teal" /> Secret Médical Garanti</span>
               <span className="flex items-center gap-3"><CheckCircle size={14} className="text-brand-teal" /> Protocole HDS</span>
               <span className="flex items-center gap-3"><CheckCircle size={14} className="text-brand-teal" /> Devis strict sous 48H</span>
            </div>
         </div>
      </section>

      {/* 9. Footer (New Design) */}
      <Footer />
    </main>
  )
}