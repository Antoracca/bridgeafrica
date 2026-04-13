import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { NAV_CLINICS, NAV_SPECIALTY_DATA } from '@/lib/data/homepage'

export const metadata = {
  title: 'Excellence Médicale au Maroc | MediBridge',
  description: 'Découvrez notre réseau exclusif d\'hôpitaux et cliniques certifiés au Maroc.',
}

export default function MarocDestinationPage() {
  const clinics = NAV_CLINICS.filter(c => c.code === 'ma')
  const specialties = NAV_SPECIALTY_DATA.filter(s => s.recommended.includes('ma'))

  return (
    <main className="min-h-screen bg-[#faf9f7] selection:bg-brand-teal selection:text-white pb-32">
      
      {/* ─── 1. HERO SECTION (Split Design Ultra-Premium) ─────────────── */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-14 lg:pl-20 pt-32 pb-20 z-10 bg-[#faf9f7]">
          <div className="inline-flex items-center gap-3 px-4 py-2 border-l-2 border-brand-teal bg-white/50 mb-10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-brand-teal-dark text-[10px] font-bold uppercase tracking-[0.25em]">
              Destination Privilège · Hub Médical
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#1a1f24] tracking-tight leading-[1] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Excellence<br />
            clinique <span className="text-brand-teal font-light italic">au</span><br />
            Maroc.
          </h1>
          
          <p className="text-lg text-slate-500 font-light leading-relaxed max-w-md mb-12">
            L'alliance d'un corps médical hautement qualifié et d'infrastructures hospitalières accréditées à l'international. L'accès direct aux meilleurs plateaux techniques du continent.
          </p>
          
          <button className="group inline-flex items-center justify-center gap-3 bg-[#1a1f24] text-white min-h-[60px] px-8 text-[12px] font-bold uppercase tracking-widest hover:bg-black transition-all w-fit rounded-none">
            Consulter le réseau marocain
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[55%] relative min-h-[50vh] lg:min-h-full">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1549487295-849c7d427d14?auto=format&fit=crop&q=80&w=2000"
              alt="Plateau médical au Maroc"
              fill
              className="object-cover"
              priority
            />
            {/* Dark elegant overlay for the image side */}
            <div className="absolute inset-0 bg-slate-900/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f7] via-[#faf9f7]/20 to-transparent lg:w-1/3" />
          </div>
        </div>
      </section>

      {/* ─── 2. HÔPITAUX & CLINIQUES (TopClinics style) ─────────────── */}
      <section className="bg-[#F5F5F5] pt-32 pb-40">
        <div className="text-center px-4 mb-20 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#1B433E] font-bold mb-4">
            Excellence Médicale
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-[#1a1f24] leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
          >
            Les Établissements Qui<br className="hidden sm:block" />
            Font Notre Réseau d'Exception
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-24">
            {clinics.map((clinic, i) => {
              // Assigner des images fictives haut de gamme pour simuler le TopClinics (puisque non dans NAV_CLINICS)
              const images = [
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              ]
              const bg = images[i % images.length]

              return (
                <div key={i} className="relative w-full aspect-[3/4] cursor-pointer group">
                  {/* Image full cover */}
                  <Image
                    src={bg}
                    alt={clinic.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                  
                  {/* Couche d'information normale */}
                  <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
                    
                    {/* Badge Supérieur - Capsule, arrondie */}
                    <div className="w-full flex justify-center mt-5">
                      <div className="bg-[#1a1f24]/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white">
                          HUB MAROC
                        </span>
                      </div>
                    </div>

                    {/* Gradient Sombre en bas */}
                    <div className="relative h-1/2 w-full mt-auto flex flex-col justify-end px-6 pb-14 text-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[-1]" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 mb-2.5">
                        <span className="text-white">{clinic.category}</span>
                        <span className="mx-2 text-white/30">|</span>
                        <span>{clinic.loc}</span>
                      </p>
                      <h3
                        className="text-2xl text-white leading-snug mb-3"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
                      >
                        {clinic.name}
                      </h3>
                    </div>

                    {/* Bloc card-in-card débordant */}
                    <div className="absolute -bottom-10 left-4 right-4 pointer-events-auto shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="bg-[#f0ece9] rounded-xl px-5 py-4 border border-white/30">
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#63666A] mb-1.5">
                          MAROC <span className="mx-1 text-[#C4C4C4]">|</span> {clinic.loc} <span className="mx-1 text-[#C4C4C4]">|</span> ★ {clinic.rating}
                        </p>
                        <p className="text-[13px] text-[#424242] font-serif leading-relaxed line-clamp-2">
                          {clinic.spec}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Bouton Voir Plus au hover complet */}
                  <div className="absolute inset-0 bg-brand-teal/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 flex items-center justify-center">
                     <Link href={clinic.website} target="_blank" className="bg-white text-slate-900 px-6 py-3 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                       Visiter le site <ArrowRight size={14} />
                     </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. SPÉCIALITÉS D'EXCELLENCE ─────────────── */}
      <section className="bg-slate-900 text-white rounded-none overflow-hidden relative border-y border-white/10">
         <div className="absolute inset-0 bg-brand-teal/5 z-0" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 relative z-10 py-24 md:py-32">
            
            <div className="mb-16 border-l-[3px] border-brand-teal pl-6 max-w-3xl">
               <p className="text-[11px] text-brand-teal font-bold uppercase tracking-[0.25em] mb-4">Domaines d'expertise</p>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-2xl leading-[1.05]" style={{ fontFamily: 'Georgia, serif' }}>
                  Pourquoi <span className="italic text-slate-300 font-light">choisir</span> le Maroc ?
               </h2>
               <p className="mt-8 text-slate-400 font-light text-lg lg:text-xl leading-relaxed">
                  Un pôle d'excellence combinant les standards chirurgicaux et technologiques européens à un encadrement médical profondément humain. Découvrez nos domaines d'expertise absolue.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {specialties.map(spec => (
                 <div key={spec.name} className="group bg-white/5 border border-white/10 p-8 hover:bg-brand-teal/10 hover:border-brand-teal/40 transition-colors duration-500 flex items-start gap-4 cursor-pointer">
                    <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5 opacity-80" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>{spec.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-light">{spec.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

    </main>
  )
}
 
