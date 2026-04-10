import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, ShieldCheck, CheckCircle2, ChevronRight, MapPin, Building2, Microscope } from 'lucide-react'
import { NAV_CLINICS, NAV_SPECIALTY_DATA, NAV_SERVICES } from '@/lib/data/homepage'

export const metadata = {
  title: 'Excellence Médicale au Maroc | MediBridge',
  description: 'Découvrez notre réseau exclusif d\'hôpitaux et cliniques certifiés au Maroc. Prise en charge chirurgicale de pointe et conciergerie médicale haut de gamme.',
}

export default function MarocDestinationPage() {
  const clinics = NAV_CLINICS.filter(c => c.code === 'ma')
  const specialties = NAV_SPECIALTY_DATA.filter(s => s.recommended.includes('ma'))
  const services = NAV_SERVICES.slice(0, 4)

  return (
    <main className="min-h-screen bg-[#faf9f7] selection:bg-brand-teal selection:text-white">
      {/* ─── 1. HERO SECTION (Full bleed structure but premium text) ─────────────── */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-slate-900 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549487295-849c7d427d14?auto=format&fit=crop&q=80&w=2000"
            alt="Plateau médical au Maroc"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7] via-[#faf9f7]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pt-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 border-l-2 border-brand-teal bg-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-white text-[11px] font-bold uppercase tracking-[0.25em]">
              Destination Privilège · Hub Médical
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.05] max-w-4xl mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Excellence clinique <br className="hidden md:block" />
            <span className="text-brand-teal font-light italic text-4xl sm:text-5xl lg:text-7xl">au</span> Maroc.
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10">
            L'alliance d'un corps médical hautement qualifié et d'infrastructures hospitalières accréditées à l'international. L'accès direct aux meilleurs plateaux techniques du continent.
          </p>
          
          <button className="group inline-flex items-center justify-center gap-2 bg-brand-teal text-white min-h-[56px] px-8 text-sm font-bold uppercase tracking-widest hover:bg-brand-teal-dark transition-all">
            Consulter le réseau marocain
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 -mt-16 sm:-mt-24 relative z-20 pb-20">
        
        {/* ─── 2. HÔPITAUX & CLINIQUES (Previous layout, new text styling) ─────────────── */}
        <section className="mb-24">
          <div className="bg-white p-8 md:p-12 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row gap-8 justify-between items-start mb-10">
            <div className="max-w-xl">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4 block">
                Établissements Certifiés
              </span>
              <h2 className="text-3xl text-slate-900 font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Notre sélection d'excellence à Rabat, Casablanca & Marrakech.
              </h2>
              <p className="text-slate-500 font-light leading-relaxed">
                Nous auditons rigoureusement chaque établissement selon les standards JCI (Joint Commission International) pour garantir votre sécurité.
              </p>
            </div>
            <div className="flex bg-slate-50 p-6 rounded-sm border border-slate-100">
               <ShieldCheck className="text-brand-teal w-12 h-12 shrink-0 mb-auto mr-4 opacity-50" />
               <div>
                  <p className="text-slate-900 font-bold mb-1 uppercase tracking-wider text-sm">Audit Qualité Strict</p>
                  <p className="text-[12px] text-slate-500 max-w-[200px]">Tous nos partenaires sont accrédités.</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinics.map((clinic, i) => (
              <div key={i} className="group bg-white border border-slate-200 hover:border-brand-teal/50 hover:shadow-xl transition-all p-6 md:p-8 flex flex-col h-full rounded-sm relative overflow-hidden">
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-sm border border-slate-100">
                      {clinic.category === 'hôpital' ? <Building2 className="text-slate-600" size={20} /> : <Microscope className="text-slate-600" size={20} />}
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-teal font-bold uppercase tracking-widest">{clinic.category}</p>
                      <h3 className="text-2xl font-bold text-slate-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{clinic.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full border border-yellow-200 shrink-0">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-[11px] font-bold">{clinic.rating}</span>
                  </div>
                </div>

                <div className="mb-6 relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
                    <MapPin size={12} /> {clinic.loc}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    <span className="font-semibold text-slate-900 border-b border-brand-teal/30 pb-0.5">Focus Médical :</span><br/> 
                    {clinic.spec}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {clinic.specialties.map(s => (
                      <span key={s} className="px-2.5 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border border-slate-200 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100 relative z-10">
                  <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-brand-teal uppercase tracking-widest transition-colors w-full">
                    Visiter le site de l'établissement
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 3. SPÉCIALITÉS D'EXCELLENCE (Previous layout, new text styling) ─────────────── */}
        <section className="mb-24 bg-slate-900 text-white rounded-none overflow-hidden relative">
           <div className="absolute inset-0 bg-brand-teal/5 z-0" />
           <div className="relative z-10 p-10 md:p-16">
              <div className="mb-12 border-l-[3px] border-brand-teal pl-6">
                 <p className="text-[11px] text-brand-teal font-bold uppercase tracking-[0.25em] mb-4">Domaines d'expertise</p>
                 <h2 className="text-3xl md:text-5xl font-bold max-w-2xl leading-[1.05]" style={{ fontFamily: 'Georgia, serif' }}>
                    Pourquoi <span className="italic text-slate-300 font-light">choisir</span> le Maroc ?
                 </h2>
                 <p className="mt-6 text-slate-400 font-light max-w-xl text-lg">
                    Un pôle d'excellence combinant les standards chirurgicaux et technologiques européens à un encadrement médical profondément humain.
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {specialties.map(spec => (
                   <div key={spec.name} className="bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 transition-colors">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>{spec.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">{spec.desc}</p>
                      <ul className="space-y-2">
                        {spec.subSpecialties.slice(0, 3).map(sub => (
                           <li key={sub} className="flex items-start gap-2 text-[12px] font-medium text-slate-300">
                             <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-brand-teal shrink-0 opacity-80" />
                             {sub}
                           </li>
                        ))}
                      </ul>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* ─── 4. L'ÉCOSYSTÈME DE SERVICES (Previous layout, new text styling) ─────────────── */}
        <section className="mb-12 border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.25em] mb-4">La Logistique MediBridge</p>
             <h2 className="text-3xl md:text-4xl text-slate-900 font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Un parcours entièrement orchestré.</h2>
             <p className="text-slate-500 text-lg font-light">
               Dès votre accord, nous activons notre réseau local pour assurer une arrivée et un suivi sans la moindre friction.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {services.map(s => (
               <div key={s.name} className="flex flex-col items-center text-center p-6 border border-slate-100 bg-white hover:border-brand-teal hover:shadow-lg transition-all rounded-sm">
                 <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center mb-4">
                   <ShieldCheck className="text-brand-teal w-5 h-5" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-sm mb-2">{s.name}</h4>
                 <p className="text-[12px] text-slate-500 leading-relaxed font-light">{s.desc}</p>
               </div>
             ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-slate-900 text-white min-h-[50px] px-8 text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
              Initier mon dossier médical
            </button>
          </div>
        </section>
        
      </div>
    </main>
  )
}
