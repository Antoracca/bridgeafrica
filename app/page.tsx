import { Navbar } from '@/components/home/Navbar'
import { Hero } from '@/components/home/Hero'
import { Destinations } from '@/components/home/Destinations'
import { HowItWorks } from '@/components/home/HowItWorks'
import { TopClinics } from '@/components/home/TopClinics'
import { TopDoctors } from '@/components/home/TopDoctors'
import { Technology } from '@/components/home/Technology'
import { Packages } from '@/components/home/Packages'
import { Footer } from '@/components/home/Footer'
import { Button } from '@/components/ui/button'
import { HeartPulse, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
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

      {/* 8. Call to Action Final - Design Light Professionnel */}
      <section className="py-24 bg-white relative overflow-hidden">
         {/* Accents de couleur subtils en fond */}
         <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8">
                  <HeartPulse size={16} className="text-blue-600" />
                  Votre santé est notre priorité
               </div>
               
               <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                  Prêt à bénéficier des meilleurs <br/>
                  <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">soins internationaux ?</span>
               </h2>
               
               <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Rejoignez MediBridge aujourd'hui. Nos conseillers vous accompagnent à chaque étape de votre parcours médical, en toute sérénité.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 h-16 rounded-full shadow-xl shadow-blue-200 w-full sm:w-auto font-bold transition-all hover:scale-105 active:scale-95">
                     Créer mon dossier gratuit
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white border-slate-200 text-black hover:bg-slate-50 hover:border-slate-300 text-lg px-10 h-16 rounded-full w-full sm:w-auto font-bold transition-all hover:scale-105 active:scale-95 shadow-sm">
                     Parler à un conseiller
                  </Button>
               </div>
               
               <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 font-medium text-sm">
                  <div className="flex items-center gap-2">
                     <CheckCircle size={16} className="text-green-500" /> +5000 Patients satisfaits
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle size={16} className="text-green-500" /> Réponse sous 24h
                  </div>
                  <div className="flex items-center gap-2">
                     <CheckCircle size={16} className="text-green-500" /> Devis gratuit & sans engagement
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. Footer (New Design) */}
      <Footer />
    </main>
  )
}