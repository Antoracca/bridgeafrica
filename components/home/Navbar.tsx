'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Stethoscope, User, LogOut, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ id: string; role: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollY } = useScroll()
  const router = useRouter()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Vérifier l'état de connexion
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Stethoscope size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            Medi<span className="text-blue-600">Bridge</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Destinations', 'Cliniques', 'Spécialités', 'Comment ça marche'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoading && (
            <>
              {user ? (
                // Utilisateur connecté
                <>
                  <Link href={getDashboardLink()}>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg shadow-blue-600/20">
                      <User size={18} className="mr-2" />
                      {getDashboardText()}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="font-medium text-slate-700 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} className="mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                // Utilisateur non connecté
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

        {/* Mobile: Mon Espace Santé / Connexion Pro - visible directement */}
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

          {/* Mobile Menu Toggle */}
          <button
            className="text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t mt-4 px-4 py-6 shadow-lg"
        >
          <div className="flex flex-col gap-4">
             {['Destinations', 'Cliniques', 'Spécialités', 'Comment ça marche'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-lg font-medium text-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-2" />

            {!isLoading && (
              <>
                {user ? (
                  // Utilisateur connecté - Menu mobile
                  <>
                    <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-blue-600 justify-start gap-2">
                        <User size={18} /> {getDashboardText()}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut size={18} /> Déconnexion
                    </Button>
                  </>
                ) : (
                  // Utilisateur non connecté - Menu mobile
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <User size={18} /> Se connecter
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-blue-600">
                        S'inscrire
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
