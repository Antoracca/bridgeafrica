'use client'

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, HeartPulse } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-800 pt-20 pb-10 border-t border-slate-200 font-sans" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <a href="/" className="inline-flex items-center gap-3 mb-2 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <Image 
                  src="/FaviconFinal.png" 
                  alt="Pont Afrique Santé" 
                  fill
                  className="object-contain group-hover:scale-105 transition-transform" 
                />
              </div>
              <span className="text-2xl font-bold tracking-tight font-sans flex items-center select-none">
                <span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span>
              </span>
            </a>
            <p className="text-slate-600 leading-relaxed text-sm">
              La première plateforme digitale connectant les patients d&apos;Afrique subsaharienne à l&apos;excellence médicale internationale. Sécurité, transparence et accompagnement humain.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
              <span className="w-1 h-6 bg-brand-teal rounded-full block"></span>
              Liens Rapides
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              {['Comment ça marche', 'Nos Cliniques Partenaires', 'Témoignages Patients', 'Blog Santé', 'FAQ', 'Devenir Partenaire'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-teal transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-brand-teal transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
              <span className="w-1 h-6 bg-brand-teal rounded-full block"></span>
              Spécialités
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              {['Chirurgie Esthétique', 'Orthopédie', 'Cardiologie', 'Oncologie', 'PMA / Fertilité', 'Greffe Capillaire'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-teal transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-brand-teal transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
              <span className="w-1 h-6 bg-brand-teal rounded-full block"></span>
              Newsletter
            </h4>
            <p className="text-slate-600 text-sm mb-4">
              Recevez nos conseils santé et offres exclusives.
            </p>
            <div className="flex gap-2 mb-8">
               <Input placeholder="Votre email" className="bg-white border-slate-200 text-slate-900 focus:border-brand-teal placeholder:text-slate-400 h-11" />
               <Button className="bg-brand-teal hover:bg-brand-teal-dark text-white h-11 w-12 px-0">
                  <ArrowRight size={18} />
               </Button>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-start gap-4 text-slate-600 text-sm group">
                  <div className="p-2 bg-white border border-slate-200 rounded-lg group-hover:bg-brand-teal/10 group-hover:text-brand-teal group-hover:border-brand-teal/30 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors">+33 1 23 45 67 89</div>
                    <div className="text-xs text-slate-500">Lun-Ven, 9h-18h</div>
                  </div>
               </div>
               <div className="flex items-start gap-4 text-slate-600 text-sm group">
                  <div className="p-2 bg-white border border-slate-200 rounded-lg group-hover:bg-brand-teal/10 group-hover:text-brand-teal group-hover:border-brand-teal/30 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors">contact@pontafriquesante.com</div>
                    <div className="text-xs text-slate-500">Réponse sous 2h</div>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © 2025 Pont Afrique Santé. Tous droits réservés.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-slate-900 transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}