import dynamic from 'next/dynamic'
import { Navbar } from '@/components/home/Navbar'
import { Hero } from '@/components/home/Hero'

const Destinations = dynamic(() => import('@/components/home/Destinations').then(m => ({ default: m.Destinations })))
const HowItWorks   = dynamic(() => import('@/components/home/HowItWorks').then(m => ({ default: m.HowItWorks })))
const TopClinics   = dynamic(() => import('@/components/home/TopClinics').then(m => ({ default: m.TopClinics })))
const TopDoctors   = dynamic(() => import('@/components/home/TopDoctors').then(m => ({ default: m.TopDoctors })))
const Technology   = dynamic(() => import('@/components/home/Technology').then(m => ({ default: m.Technology })))
const Packages     = dynamic(() => import('@/components/home/Packages').then(m => ({ default: m.Packages })))
const FinalCTAs    = dynamic(() => import('@/components/home/FinalCTAs').then(m => ({ default: m.FinalCTAs })))
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

      {/* 8. Call to Action Final */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 bg-[#020617] overflow-hidden flex items-center justify-center border-t border-slate-800">
         {/* Background Image */}
         <div className="absolute inset-0">
           <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1600"
              alt="Hôpital luxueux ou hall d'hôtel 5 étoiles"
              className="w-full h-full object-cover opacity-20 grayscale mix-blend-overlay"
              loading="eager"
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

            <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
               Confiez l'intégralité de votre logistique médicale à Pont Afrique Santé. Nos experts orchestrent chaque étape de votre prise en charge internationale avec un devoir d'excellence certifié.
            </p>

            <FinalCTAs />
         </div>
      </section>

      {/* 9. Footer (New Design) */}
      <Footer />
    </main>
  )
}