import { Navbar } from '@/components/home/Navbar'
import { Hero } from '@/components/home/Hero'
import { Destinations } from '@/components/home/Destinations'
import { HowItWorks } from '@/components/home/HowItWorks'
import { TopClinics } from '@/components/home/TopClinics'
import { TopDoctors } from '@/components/home/TopDoctors'
import { Technology } from '@/components/home/Technology'
import { Testimonials } from '@/components/home/Testimonials'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'

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

      {/* 5. Top Doctors (NOUVEAU) */}
      <TopDoctors />

      {/* 6. Technologie IA */}
      <Technology />

      {/* 7. Bento Grid Services */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Packages "Tout Inclus"
            </h2>
            <p className="text-slate-600">Des offres claires, sans surprise. Soins + Logistique.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 h-auto md:h-[500px]">
            {/* Grande Carte Gauche */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-xl">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Chirurgie" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-cyan-400 font-bold uppercase text-sm tracking-wider mb-2">Populaire</span>
                <h3 className="text-3xl font-bold text-white mb-2">Chirurgie Orthopédique</h3>
                <p className="text-slate-300 mb-4">Prothèses hanche/genou au Maroc avec rééducation incluse.</p>
                <div className="flex items-center text-white font-bold group-hover:gap-4 transition-all">
                   Dès 4500€ <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Carte Haut Droite */}
            <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition-transform">
               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
               </div>
               <div>
                 <h4 className="text-xl font-bold text-slate-900">Cardiologie</h4>
                 <p className="text-slate-500 text-sm mt-1">Check-up complet et intervention.</p>
               </div>
            </div>

            {/* Carte Haut Extrême Droite */}
            <div className="md:col-span-1 bg-blue-600 p-6 rounded-3xl shadow-lg flex flex-col justify-between text-white hover:-translate-y-1 transition-transform relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <h4 className="text-xl font-bold relative z-10">Bilan Santé Express</h4>
               <p className="text-blue-100 text-sm relative z-10">48h à Tunis. Vol + Hôtel + Examens.</p>
               <div className="text-2xl font-bold mt-4 relative z-10">990€</div>
            </div>

            {/* Carte Bas Large */}
            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 flex items-center justify-between shadow-xl relative overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity" alt="Tech" />
               <div className="relative z-10 max-w-sm">
                 <h3 className="text-2xl font-bold text-white mb-2">Second Avis Médical IA</h3>
                 <p className="text-slate-400 text-sm">Envoyez vos radios/scanners. Nos experts et l'IA confirment le diagnostic en 24h.</p>
               </div>
               <div className="relative z-10 bg-white/10 backdrop-blur p-3 rounded-full text-white">
                 <ArrowRight size={24} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Témoignages */}
      <Testimonials />

      {/* 9. FAQ & Call to Action Final */}
      <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Prêt à prendre soin de vous ?</h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
               Ne laissez pas la distance être un obstacle à votre santé. Rejoignez les 5000+ patients qui ont choisi l'excellence.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
               <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 h-14 rounded-full shadow-2xl">
                  Créer mon dossier gratuitement
               </Button>
               <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full">
                  Parler à un conseiller
               </Button>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Medi<span className="text-blue-500">Bridge</span> Africa</h3>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              La première plateforme digitale connectant les patients d'Afrique subsaharienne aux meilleurs soins du Maghreb et d'Europe.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">LN</div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">IG</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Liens Rapides</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">Trouver un médecin</li>
              <li className="hover:text-white cursor-pointer transition-colors">Nos Cliniques Partenaires</li>
              <li className="hover:text-white cursor-pointer transition-colors">Demander un Devis</li>
              <li className="hover:text-white cursor-pointer transition-colors">Espace Patient</li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6">Contact & Urgence</h4>
             <ul className="space-y-4 text-slate-400">
               <li className="flex items-center gap-3"><Phone size={18} className="text-blue-500"/> +212 5 22 00 00 00</li>
               <li className="flex items-center gap-3"><Mail size={18} className="text-blue-500"/> assistance@medibridge.com</li>
               <li className="flex items-center gap-3"><MapPin size={18} className="text-blue-500"/> Casablanca, Maroc</li>
             </ul>
             <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Contacter le Support</Button>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} MediBridge Africa. Tous droits réservés.
        </div>
      </footer>
    </main>
  )
}