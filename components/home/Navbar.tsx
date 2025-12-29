'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X, Stethoscope, User, LogOut, LogIn, ChevronDown, Building2, HeartPulse, Activity, ArrowRight, MapPin, Globe, Eye, Scissors, Brain, Baby, Bone, ShieldCheck, Plane, Languages, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

// --- DATA ---
const destinations = [
  { name: 'Tunisie', code: 'tn', type: 'Cliniques & Hôpitaux', top: 'Clinique Pasteur' },
  { name: 'Turquie', code: 'tr', type: 'Spécialisé Capillaire', top: 'Esthetica Istanbul' },
  { name: 'Maroc', code: 'ma', type: 'Cliniques Pluridisciplinaires', top: 'Clinique Agdal' },
  { name: 'France', code: 'fr', type: 'Centres Excellence', top: 'Hôpital Américain' },
  { name: 'Espagne', code: 'es', type: 'Fertilité (FIV)', top: 'IVF Spain' },
  { name: 'Allemagne', code: 'de', type: 'Neurochirurgie', top: 'Charité Berlin' },
  { name: 'Belgique', code: 'be', type: 'Orthopédie', top: 'Clinique St-Jean' },
  { name: 'Suisse', code: 'ch', type: 'Check-up Luxe', top: 'Genolier' },
  { name: 'Inde', code: 'in', type: 'Cardiologie', top: 'Apollo Hospitals' },
  { name: 'Thaïlande', code: 'th', type: 'Chirurgie Esthétique', top: 'Bumrungrad' },
]

const specialties = [
  { name: 'Chirurgie Esthétique', icon: Scissors, desc: 'Liposuccion, Rhinoplastie, Abdominoplastie' },
  { name: 'Greffe Capillaire', icon: User, desc: 'FUE, DHI, Barbe, Sourcils' },
  { name: 'Dentaire', icon: HeartPulse, desc: 'Implants, Facettes, Blanchiment' },
  { name: 'PMA / Fertilité', icon: Baby, desc: 'FIV, Insémination, Préservation' },
  { name: 'Ophtalmologie', icon: Eye, desc: 'Lasik, Cataracte, Cornée' },
  { name: 'Chirurgie de l\'Obésité', icon: Activity, desc: 'Sleeve, Bypass, Ballon' },
  { name: 'Oncologie', icon: Activity, desc: 'Chimiothérapie, Radiothérapie' },
  { name: 'Orthopédie', icon: Bone, desc: 'Prothèses Hanche/Genou, Arthroscopie' },
  { name: 'Neurologie', icon: Brain, desc: 'Chirurgie du rachis, Hernie discale' },
]

const services = [
  { name: 'Assistance Visa', icon: FileText },
  { name: 'Transport VIP', icon: Plane },
  { name: 'Interprétariat', icon: Languages },
  { name: 'Assurance Voyage', icon: ShieldCheck },
]

const clinics = [
  { name: 'Clinique Pasteur', loc: 'Tunis', rating: '4.9', spec: 'Chirurgie Générale' },
  { name: 'Hôpital Américain', loc: 'Istanbul', rating: '4.8', spec: 'Greffe & Esthétique' },
  { name: 'Clinique Agdal', loc: 'Rabat', rating: '4.7', spec: 'Oncologie' },
  { name: 'Quirónsalud', loc: 'Madrid', rating: '4.9', spec: 'Fertilité' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  const [user, setUser] = useState<{ id: string; role: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollY } = useScroll()
  const router = useRouter()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const supabase = createClient()
    const checkUser = async () => {
      try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser()
        
        if (error || !authUser) {
          setUser(null)
        } else {
          // Essai de récupération du profil
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', authUser.id)
              .single<{ role: string }>()

            setUser({
              id: authUser.id,
              role: profile?.role || 'patient'
            })
          } catch (profileError) {
            console.error("Erreur profil:", profileError)
            // Fallback si pas de profil trouvé mais user connecté
            setUser({ id: authUser.id, role: 'patient' })
          }
        }
      } catch (e) {
        console.error("Erreur auth:", e)
        setUser(null)
      } finally {
        // TOUJOURS désactiver le chargement
        setIsLoading(false)
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      await createClient().auth.signOut()
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (e) {
      console.error("Erreur déconnexion:", e)
    }
  }

  const getDashboardLink = () => {
    if (!user) return '/register'
    switch (user.role) {
      case 'medecin_referent': return '/medecin'
      case 'clinique': return '/clinique'
      default: return '/patient'
    }
  }

  const getDashboardText = () => {
    if (!user) return 'Mon Espace Santé'
    switch (user.role) {
      case 'medecin_referent': return 'Espace Médecin'
      case 'clinique': return 'Espace Clinique'
      default: return 'Mon Espace Santé'
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${isScrolled || mobileMenuOpen || activeDropdown
          ? 'bg-white shadow-sm py-4 border-b border-slate-100'
          : 'bg-white/50 backdrop-blur-md py-6 border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-600/20">
            <Stethoscope size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Medi<span className="text-blue-600">Bridge</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="h-full flex items-center" onMouseEnter={() => setActiveDropdown('destinations')}> 
             <button className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === 'destinations' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                Destinations <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'destinations' ? 'rotate-180' : ''}`}/>
             </button>
          </div>
          <div className="h-full flex items-center" onMouseEnter={() => setActiveDropdown('cliniques')}> 
             <button className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === 'cliniques' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                Cliniques <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'cliniques' ? 'rotate-180' : ''}`}/>
             </button>
          </div>
          <div className="h-full flex items-center" onMouseEnter={() => setActiveDropdown('specialites')}> 
             <button className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === 'specialites' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                Spécialités & Services <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'specialites' ? 'rotate-180' : ''}`}/>
             </button>
          </div>
          <button onClick={() => scrollToSection('how-it-works')} onMouseEnter={() => setActiveDropdown(null)} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Comment ça marche
          </button>
        </div>

        {/* CTA Buttons - FORCE VISIBILITY IF LOADING STUCK */} 
        <div className="hidden md:flex items-center gap-4">
          {/* Si loading, on affiche rien ou un squelette, sinon on affiche les boutons */} 
          {!isLoading ? (
            user ? (
              // ETAT CONNECTÉ : Boutons RESTAURÉS
              <>
                <Link href={getDashboardLink()}>
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg shadow-blue-600/20 font-bold">
                    <User size={18} className="mr-2" />
                    {getDashboardText()}
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="font-medium text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-full">
                  <LogOut size={18} className="mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              // ETAT DÉCONNECTÉ
              <>
                <Link href="/login" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all">
                  <LogIn size={20} />
                </Link>
                <Link href="/register">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg shadow-blue-600/20 font-bold">
                    Mon Espace Santé
                  </Button>
                </Link>
              </>
            )
          ) : (
             // Squelette de chargement minimaliste
             <div className="w-32 h-10 bg-slate-100 rounded-full animate-pulse"></div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          {/* Mobile direct access buttons */} 
          {!isLoading && !user && (
             <Link href="/login" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
               <LogIn size={16}/>
             </Link>
          )}
          {/* Mobile toggle */} 
          <button className="text-slate-900 bg-slate-100 p-2 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {/* DESTINATIONS MEGA MENU */} 
        {activeDropdown === 'destinations' && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
             className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl overflow-hidden z-30 hidden md:block"
             onMouseEnter={() => setActiveDropdown('destinations')} onMouseLeave={() => setActiveDropdown(null)}
           >
              <div className="container mx-auto px-8 py-8">
                 <div className="flex gap-10">
                    <div className="w-[200px] flex flex-col justify-between shrink-0 border-r border-slate-100 pr-6">
                        <div>
                           <h3 className="font-bold text-slate-900 text-lg mb-2">Explorez le monde</h3>
                           <p className="text-xs text-slate-500 leading-relaxed mb-6">
                              Nous avons sélectionné les meilleures destinations médicales pour vous offrir l'excellence à prix juste.
                           </p>
                        </div>
                        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                           <Globe size={16} className="mr-2"/> Voir toutes
                        </Button>
                    </div>
                    <div className="flex-1 grid grid-cols-5 gap-y-8 gap-x-6">
                        {destinations.map((dest) => (
                           <Link key={dest.name} href="#" className="group block p-2 rounded-xl hover:bg-slate-50 transition-all">
                              <div className="flex items-center gap-3 mb-2">
                                 <img 
                                    src={`https://flagcdn.com/w40/${dest.code}.png`} 
                                    srcSet={`https://flagcdn.com/w80/${dest.code}.png 2x`}
                                    alt={`Drapeau ${dest.name}`}
                                    className="w-8 h-auto rounded-md shadow-sm object-cover"
                                 />
                                 <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{dest.name}</span>
                              </div>
                              <div className="space-y-1 pl-1">
                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{dest.type}</div>
                                 <div className="text-xs text-blue-600 flex items-center gap-1">
                                    <Building2 size={10} /> {dest.top}
                                 </div>
                              </div>
                           </Link>
                        ))}
                    </div>
                 </div>
              </div>
           </motion.div>
        )}

        {/* CLINIQUES MEGA MENU */} 
        {activeDropdown === 'cliniques' && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
             className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl overflow-hidden z-30 hidden md:block"
             onMouseEnter={() => setActiveDropdown('cliniques')} onMouseLeave={() => setActiveDropdown(null)}
           >
              <div className="container mx-auto px-8 py-8">
                 <div className="flex gap-12">
                    <div className="w-1/4 pr-8 border-r border-slate-100 flex flex-col justify-between">
                        <div>
                           <h3 className="text-xl font-bold text-slate-900 mb-2">Réseau d'Excellence</h3>
                           <p className="text-slate-500 text-sm mb-6">
                              +150 cliniques accréditées JCI et ISO. Nous garantissons la qualité des soins et votre sécurité.
                           </p>
                        </div>
                        <div className="space-y-3">
                           <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              Consulter toutes nos cliniques
                           </Button>
                           <Button variant="ghost" className="w-full text-slate-600 hover:bg-slate-100">
                              Devenir partenaire
                           </Button>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-6">
                        {clinics.map((clinic) => (
                           <Link key={clinic.name} href="#" className="flex items-start justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group bg-slate-50/50 hover:bg-white">
                              <div className="flex items-start gap-4">
                                 <div className="w-10 h-10 bg-white border border-slate-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm"><Building2 size={20}/></div>
                                 <div>
                                    <div className="font-bold text-slate-900 text-base">{clinic.name}</div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                       <MapPin size={12}/> {clinic.loc}
                                    </div>
                                    <div className="text-xs text-blue-500 font-medium mt-1">{clinic.spec}</div>
                                 </div>
                              </div>
                              <div className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                                 ★ {clinic.rating}
                              </div>
                           </Link>
                        ))}
                    </div>
                 </div>
              </div>
           </motion.div>
        )}

        {/* SPECIALITES & SERVICES MEGA MENU */} 
        {activeDropdown === 'specialites' && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
             className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl overflow-hidden z-30 hidden md:block"
             onMouseEnter={() => setActiveDropdown('specialites')} onMouseLeave={() => setActiveDropdown(null)}
           >
              <div className="container mx-auto px-8 py-8">
                 <div className="flex gap-10">
                    
                    {/* Colonne Services & CTA */} 
                    <div className="w-[240px] pr-6 border-r border-slate-100 flex flex-col justify-between">
                       <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Nos Services Inclus</h3>
                          <ul className="space-y-3">
                             {services.map((svc) => (
                                <li key={svc.name} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                   <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><svc.icon size={14}/></div>
                                   {svc.name}
                                </li>
                             ))}
                          </ul>
                       </div>
                       <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                          Demander un devis
                          <ArrowRight size={16} className="ml-2"/>
                       </Button>
                    </div>

                    {/* Grille Spécialités */} 
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Expertises Médicales</h3>
                       <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                          {specialties.map((spec) => (
                             <Link key={spec.name} href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                <div className="w-10 h-10 bg-white border border-slate-100 text-slate-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-sm shrink-0">
                                   <spec.icon size={20}/>
                                </div>
                                <div>
                                   <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{spec.name}</div>
                                   <div className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-2">{spec.desc}</div>
                                </div>
                             </Link>
                          ))}
                       </div>
                    </div>

                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: '100vh' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-4 px-4 py-6 shadow-lg overflow-hidden h-screen"
          >
             <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</h3>
                  {['Destinations', 'Cliniques', 'Spécialités'].map((item) => (
                    <Link key={item} href="#" className="block text-lg font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>
                      {item}
                    </Link>
                  ))}
                  <button onClick={() => scrollToSection('how-it-works')} className="block text-lg font-medium text-slate-800">
                    Comment ça marche
                  </button>
               </div>
               <div className="h-px bg-slate-100" />
               {!isLoading && (
                 <div className="flex flex-col gap-3">
                   {user ? (
                     <>
                       <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                         <Button className="w-full bg-blue-600 justify-start gap-2"><User size={18} /> {getDashboardText()}</Button>
                       </Link>
                       <Button variant="outline" onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50"><LogOut size={18} /> Déconnexion</Button>
                     </>
                   ) : (
                     <>
                       <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                         <Button variant="outline" className="w-full justify-start gap-2"><User size={18} /> Se connecter</Button>
                       </Link>
                       <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                         <Button className="w-full bg-blue-600 shadow-lg shadow-blue-600/20">S'inscrire (Espace Santé)</Button>
                       </Link>
                     </>
                   )}
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
