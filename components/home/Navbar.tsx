'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X, Stethoscope, User, LogOut, LogIn, ChevronDown, Building2, HeartPulse, Activity, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

// --- DATA ---
const destinations = [
  { name: 'Tunisie', flag: '🇹🇳', desc: 'Chirurgie Esthétique' },
  { name: 'Turquie', flag: '🇹🇷', desc: 'Greffe Capillaire' },
  { name: 'Maroc', flag: '🇲🇦', desc: 'Soins Dentaires' },
  { name: 'France', flag: '🇫🇷', desc: 'Oncologie & Expertises' },
  { name: 'Espagne', flag: '🇪🇸', desc: 'FIV & Fertilité' },
  { name: 'Allemagne', flag: '🇩🇪', desc: 'Neurochirurgie' },
  { name: 'Belgique', flag: '🇧🇪', desc: 'Orthopédie' },
  { name: 'Suisse', flag: '🇨🇭', desc: 'Check-up Prestige' },
  { name: 'Inde', flag: '🇮🇳', desc: 'Chirurgie Cardiaque' },
  { name: 'Thaïlande', flag: '🇹🇭', desc: 'Bien-être & Soins' },
]

const specialties = [
  { name: 'Chirurgie Esthétique', icon: Activity, desc: 'Liposuccion, Rhinoplastie...' },
  { name: 'Greffe Capillaire', icon: User, desc: 'FUE, DHI, Barbe' },
  { name: 'Dentaire', icon: HeartPulse, desc: 'Implants, Facettes' },
  { name: 'PMA / Fertilité', icon: Stethoscope, desc: 'FIV, Insémination' },
  { name: 'Oncologie', icon: Activity, desc: 'Traitements Cancer' },
  { name: 'Orthopédie', icon: Activity, desc: 'Prothèses, Rééducation' },
]

const clinics = [
  { name: 'Clinique Pasteur', loc: 'Tunis', rating: '4.9' },
  { name: 'Hôpital Américain', loc: 'Istanbul', rating: '4.8' },
  { name: 'Clinique Agdal', loc: 'Rabat', rating: '4.7' },
  { name: 'Quirónsalud', loc: 'Madrid', rating: '4.9' },
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

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Auth logic - COPIED FROM ORIGINAL
  useEffect(() => {
    const supabase = createClient()

    const checkUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        // Récupérer le rôle depuis le profil
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authUser.id)
          .single()

        setUser({
          id: authUser.id,
          role: profile?.role || 'patient'
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }

    checkUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Fonction de déconnexion
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  // Déterminer le lien selon le rôle
  const getDashboardLink = () => {
    if (!user) return '/register'

    switch (user.role) {
      case 'medecin_referent':
        return '/medecin'
      case 'clinique':
        return '/clinique'
      default:
        return '/patient'
    }
  }

  // Déterminer le texte du bouton selon le rôle
  const getDashboardText = () => {
    if (!user) return 'Mon Espace Santé'

    switch (user.role) {
      case 'medecin_referent':
        return 'Espace Médecin'
      case 'clinique':
        return 'Espace Clinique'
      default:
        return 'Mon Espace Santé'
    }
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled || mobileMenuOpen || activeDropdown
          ? 'bg-white shadow-sm py-4 border-b border-slate-100' 
          : 'bg-white/50 backdrop-blur-md py-6 border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative z-50">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-600/20">
            <Stethoscope size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Medi<span className="text-blue-600">Bridge</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onMouseEnter={() => setActiveDropdown('destinations')} className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === 'destinations' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Destinations <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'destinations' ? 'rotate-180' : ''}`}/>
          </button>
          <button onMouseEnter={() => setActiveDropdown('cliniques')} className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === 'cliniques' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Cliniques <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'cliniques' ? 'rotate-180' : ''}`}/>
          </button>
          <button onMouseEnter={() => setActiveDropdown('specialites')} className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${activeDropdown === 'specialites' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Spécialités <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'specialites' ? 'rotate-180' : ''}`}/>
          </button>
          <button onClick={() => scrollToSection('how-it-works')} onMouseEnter={() => setActiveDropdown(null)} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Comment ça marche
          </button>
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href={getDashboardLink()}>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg shadow-blue-600/20">
                      <User size={18} className="mr-2" />
                      {getDashboardText()}
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="font-medium text-slate-700 hover:text-red-600 hover:bg-red-50">
                    <LogOut size={18} className="mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all">
                    <LogIn size={20} />
                  </Link>
                  <Link href="/register">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg shadow-blue-600/20">
                      Mon Espace Santé
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile: LOGIQUE ORIGINALE RESTAURÉE (Visible direct sur mobile) */}
        <div className="md:hidden flex items-center gap-3">
          {!isLoading && (
            <>
              {user ? (
                <Link href={getDashboardLink()} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700">
                  <User size={20} />
                  <span className="text-xs font-semibold">Mon Espace</span>
                </Link>
              ) : (
                <Link href="/login" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all">
                  <LogIn size={20} />
                </Link>
              )}
            </>
          )}

          <button className="text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MEGA MENU: BANDEAU BLANC LARGE (Desktop) --- */}
      <AnimatePresence>
        {activeDropdown === 'destinations' && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
             className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl overflow-hidden z-30 hidden md:block"
             onMouseEnter={() => setActiveDropdown('destinations')} onMouseLeave={() => setActiveDropdown(null)}
           >
              <div className="container mx-auto px-8 py-10">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">Explorer nos destinations</h3>
                 <div className="grid grid-cols-5 gap-y-10 gap-x-8">
                    {destinations.map((dest) => (
                       <Link key={dest.name} href="#" className="group flex items-center gap-4 hover:translate-x-1 transition-transform">
                          <span className="text-3xl filter drop-shadow-sm">{dest.flag}</span>
                          <div>
                             <div className="font-bold text-slate-900 group-hover:text-blue-600">{dest.name}</div>
                             <div className="text-[10px] text-slate-400 uppercase tracking-tight">{dest.desc}</div>
                          </div>
                       </Link>
                    ))}
                 </div>
              </div>
           </motion.div>
        )}
        {/* Cliniques Dropdown */}
        {activeDropdown === 'cliniques' && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
             className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl overflow-hidden z-30 hidden md:block"
             onMouseEnter={() => setActiveDropdown('cliniques')} onMouseLeave={() => setActiveDropdown(null)}
           >
              <div className="container mx-auto px-8 py-10 flex gap-12">
                 <div className="w-1/3 pr-8 border-r border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Nos Cliniques Partenaires</h3>
                    <p className="text-slate-500 text-sm">Établissements certifiés internationalement pour votre sécurité et confort.</p>
                 </div>
                 <div className="flex-1 grid grid-cols-2 gap-6">
                    {clinics.map((clinic) => (
                       <Link key={clinic.name} href="#" className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-blue-200 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Building2 size={18}/></div>
                             <div className="font-bold text-slate-900">{clinic.name} ({clinic.loc})</div>
                          </div>
                          <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">★ {clinic.rating}</div>
                       </Link>
                    ))}
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-4 px-4 py-6 shadow-lg overflow-hidden"
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
                         <Button className="w-full bg-blue-600 justify-start gap-2">
                           <User size={18} /> {getDashboardText()}
                         </Button>
                       </Link>
                       <Button variant="outline" onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50">
                         <LogOut size={18} /> Déconnexion
                       </Button>
                     </>
                   ) : (
                     <>
                       <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                         <Button variant="outline" className="w-full justify-start gap-2">
                           <User size={18} /> Se connecter
                         </Button>
                       </Link>
                       <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                         <Button className="w-full bg-blue-600 shadow-lg shadow-blue-600/20">
                           S'inscrire (Espace Santé)
                         </Button>
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