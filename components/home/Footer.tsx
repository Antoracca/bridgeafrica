'use client'

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, HeartPulse } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-900 font-sans" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
                   <HeartPulse size={24} fill="currentColor" className="text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Medi<span className="text-blue-500">Bridge</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              La première plateforme digitale connectant les patients d'Afrique subsaharienne à l'excellence médicale internationale. Sécurité, transparence et accompagnement humain.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
              Liens Rapides
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['Comment ça marche', 'Nos Cliniques Partenaires', 'Témoignages Patients', 'Blog Santé', 'FAQ', 'Devenir Partenaire'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 rounded-full block"></span>
              Spécialités
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['Chirurgie Esthétique', 'Orthopédie', 'Cardiologie', 'Oncologie', 'PMA / Fertilité', 'Greffe Capillaire'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full group-hover:bg-purple-500 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-600 rounded-full block"></span>
              Newsletter
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Recevez nos conseils santé et offres exclusives.
            </p>
            <div className="flex gap-2 mb-8">
               <Input placeholder="Votre email" className="bg-slate-900 border-slate-800 text-white focus:ring-blue-600 placeholder:text-slate-600 h-11" />
               <Button className="bg-blue-600 hover:bg-blue-700 h-11 w-12 px-0">
                  <ArrowRight size={18} />
               </Button>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-start gap-4 text-slate-400 text-sm group">
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">+33 1 23 45 67 89</div>
                    <div className="text-xs">Lun-Ven, 9h-18h</div>
                  </div>
               </div>
               <div className="flex items-start gap-4 text-slate-400 text-sm group">
                  <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">contact@medibridge.com</div>
                    <div className="text-xs">Réponse sous 2h</div>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © 2025 MediBridge Africa. Tous droits réservés.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}