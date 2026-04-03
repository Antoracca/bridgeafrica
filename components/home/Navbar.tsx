'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, User, LogOut, LogIn, Building2, HeartPulse, Activity,
  ArrowRight, MapPin, Eye, Scissors, Baby, ShieldCheck, Plane, Languages,
  FileText, Dna, Microscope, Star, StarHalf, ChevronRight, ChevronDown,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { NAV_DESTINATIONS, NAV_CLINICS, NAV_SPECIALTY_DATA, NAV_SERVICES } from '@/lib/data/homepage'

/* ── DATA ──────────────────────────────────────────────────────────────────── */
const destinations = NAV_DESTINATIONS
const clinics      = NAV_CLINICS

const specialties = NAV_SPECIALTY_DATA.map((s, i) => ({
  ...s,
  icon: ([Microscope, Baby, Dna, Scissors, Eye, Activity][i]) || HeartPulse,
}))

const services = NAV_SERVICES.map((name, i) => ({
  name,
  icon: ([FileText, Plane, Languages, ShieldCheck][i]),
}))

/* ── STAR RATING ───────────────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  const full    = Math.floor(rating)
  const hasHalf = rating % 1 !== 0
  const empty   = 5 - full - (hasHalf ? 1 : 0)
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-px">
        {Array.from({ length: full }).map((_, i)  => <Star     key={`f${i}`} size={10} className="fill-amber-400 text-amber-400" />)}
        {hasHalf &&                                    <StarHalf              size={10} className="fill-amber-400 text-amber-400" />}
        {Array.from({ length: empty }).map((_, i) => <Star     key={`e${i}`} size={10} className="fill-slate-200 text-slate-200" />)}
      </div>
      <span className="text-[11px] font-bold text-slate-600">{rating}</span>
    </div>
  )
}

/* ── NAV ITEMS (centre) ─────────────────────────────────────────────────────── */
const NAV_CENTER = [
  { key: 'destinations', label: 'Destinations & Cliniques' },
  { key: 'specialites',  label: 'Spécialités & Services'   },
  { key: 'processus',    label: 'Comment ça marche'        },
  { key: 'processus-page', label: 'Notre Processus'        },
]

/* ══════════════════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════════════════ */
export function Navbar() {
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeLeft,     setActiveLeft]     = useState<string>('destinations')
  const [activeCountry,  setActiveCountry]  = useState<string | null>(null)
  const [isScrolled,     setIsScrolled]     = useState(false)
  const [user,           setUser]           = useState<{ id: string; role: string } | null>(null)
  const [isLoading,      setIsLoading]      = useState(true)
  const router = useRouter()

  /* scroll detection */
  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* escape key */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  /* auth */
  useEffect(() => {
    const supabase = createClient()
    const checkUser = async () => {
      try {
        const { data: { user: u }, error } = await supabase.auth.getUser()
        if (error || !u) { setUser(null); return }
        try {
          const { data: p } = await supabase.from('profiles').select('role').eq('id', u.id).single<{ role: string }>()
          setUser({ id: u.id, role: p?.role || 'patient' })
        } catch { setUser({ id: u.id, role: 'patient' }) }
      } catch { setUser(null) }
      finally  { setIsLoading(false) }
    }
    checkUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => checkUser())
    return () => { subscription.unsubscribe() }
  }, [])

  const handleLogout = async () => {
    await createClient().auth.signOut()
    setUser(null); router.push('/'); router.refresh()
  }

  const getDashboardLink = () => {
    if (!user) return '/register'
    return { medecin_referent: '/medecin', clinique: '/clinique' }[user.role] ?? '/patient'
  }
  const getDashboardText = () => {
    if (!user) return 'Mon Espace Santé'
    return { medecin_referent: 'Espace Médecin', clinique: 'Espace Clinique' }[user.role] ?? 'Mon Espace Santé'
  }

  const closeMenu = () => { setMenuOpen(false); setActiveCountry(null) }

  const scrollTo = (id: string) => {
    closeMenu()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  /* filtered clinics */
  const shownClinics   = activeCountry ? clinics.filter(c => c.code === activeCountry) : clinics
  const countryName    = destinations.find(d => d.code === activeCountry)?.name

  /* ── left-side categories in overlay ───────────────────────────────────── */
  const LEFT_CATEGORIES = [
    { key: 'destinations', label: 'Destinations & Cliniques', sub: destinations.map(d => ({ key: d.code, label: d.name, type: d.type })) },
    { key: 'specialites',  label: 'Spécialités & Services',   sub: [] },
  ]

  /* ══ RENDER ══════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─────────────────────── NAVBAR BAR ──────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans
          ${isScrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
            : 'bg-white/90 backdrop-blur-sm py-4'}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* ── LEFT: Hamburger + Logo ───────────────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Hamburger — always visible on all sizes */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                menuOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2} />}
            </button>

            {/* Logo */}
            <Link href="/" onClick={closeMenu} className="flex items-center group shrink-0">
              <Image
                src="/Logomeba.png"
                alt="MediBridge Africa"
                width={360}
                height={90}
                className="h-12 sm:h-14 w-auto object-contain group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* ── CENTER: Nav pill (hidden on xs, visible from sm+) ────────── */}
          <nav className="hidden sm:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200/80 rounded-full px-1.5 py-1.5">
              <button
                onClick={() => { setActiveLeft('destinations'); setMenuOpen(true) }}
                className={`text-[13px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200
                  ${menuOpen && activeLeft === 'destinations'
                    ? 'bg-white text-brand-teal shadow-sm'
                    : 'text-slate-600 hover:text-brand-teal hover:bg-white/70'}`}
              >
                Destinations & Cliniques
              </button>
              <button
                onClick={() => { setActiveLeft('specialites'); setMenuOpen(true) }}
                className={`text-[13px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200
                  ${menuOpen && activeLeft === 'specialites'
                    ? 'bg-white text-brand-teal shadow-sm'
                    : 'text-slate-600 hover:text-brand-teal hover:bg-white/70'}`}
              >
                Spécialités & Services
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="text-[13px] font-semibold px-3.5 py-1.5 rounded-full text-slate-600 hover:text-brand-teal hover:bg-white/70 transition-all duration-200"
              >
                Comment ça marche
              </button>
              <Link
                href="/notre-processus"
                onClick={closeMenu}
                className="text-[13px] font-semibold px-3.5 py-1.5 rounded-full text-slate-600 hover:text-brand-teal hover:bg-white/70 transition-all duration-200"
              >
                Notre Processus
              </Link>
            </div>
          </nav>

          {/* ── RIGHT: Auth ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            {!isLoading ? (
              user ? (
                <>
                  <Link href={getDashboardLink()}>
                    <Button className="rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white px-4 sm:px-5 h-9 text-[13px] font-bold shadow-md shadow-brand-teal/20">
                      <User size={15} className="mr-1.5" />
                      <span className="hidden sm:inline">{getDashboardText()}</span>
                      <span className="sm:hidden">Mon espace</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0"
                  >
                    <LogOut size={16} />
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:flex text-[13px] font-bold text-slate-600 hover:text-brand-teal transition-colors items-center gap-1.5 px-3"
                  >
                    <LogIn size={15} /> Connexion
                  </Link>
                  <Link
                    href="/login"
                    className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:text-brand-teal hover:border-brand-teal-border transition-all"
                  >
                    <LogIn size={16} />
                  </Link>
                  <Link href="/register">
                    <Button className="rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white px-4 sm:px-5 h-9 text-[13px] font-bold shadow-md shadow-brand-teal/20">
                      <span className="hidden sm:inline">Mon Espace Santé</span>
                      <span className="sm:hidden">S&apos;inscrire</span>
                    </Button>
                  </Link>
                </>
              )
            ) : (
              <div className="w-28 h-9 bg-slate-100 rounded-full animate-pulse" />
            )}
          </div>

        </div>
      </header>

      {/* ─────────────────────── BCG OVERLAY MENU ────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
            style={{ paddingTop: isScrolled ? '65px' : '73px' }}
          >
            {/* ── Overlay top bar (like BCG's X + search + login bar) ────── */}
            <div className="shrink-0 border-b border-slate-100 bg-slate-50/50 px-6 py-3 flex items-center gap-4">
              {/* Search hint */}
              <div className="flex-1 flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-2 max-w-xl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span className="text-sm text-slate-400">Rechercher une destination, clinique, spécialité…</span>
              </div>
              {/* Quick link on mobile (sm and below) */}
              <div className="sm:hidden flex gap-2">
                {!user && (
                  <>
                    <Link href="/login" onClick={closeMenu}>
                      <Button variant="outline" className="h-8 text-xs rounded-full px-3 font-semibold">Connexion</Button>
                    </Link>
                    <Link href="/register" onClick={closeMenu}>
                      <Button className="h-8 text-xs rounded-full px-3 bg-brand-teal text-white font-bold">S&apos;inscrire</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* ── Main split ────────────────────────────────────────────── */}
            <div className="flex flex-1 overflow-hidden">

              {/* LEFT SIDEBAR — categories */}
              <div className="w-[260px] sm:w-[300px] shrink-0 border-r border-slate-100 overflow-y-auto py-6">

                {/* Destinations & Cliniques (expandable) */}
                <div>
                  <button
                    onClick={() => setActiveLeft(activeLeft === 'destinations' ? '' : 'destinations')}
                    className={`flex items-center justify-between w-full text-left px-6 py-3.5 text-[15px] font-bold transition-all duration-200
                      ${activeLeft === 'destinations'
                        ? 'text-slate-900 bg-slate-50 border-l-[3px] border-brand-teal'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-[3px] border-transparent'}`}
                  >
                    Destinations & Cliniques
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ${activeLeft === 'destinations' ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Sub-items: countries */}
                  <AnimatePresence>
                    {activeLeft === 'destinations' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-slate-50/50"
                      >
                        {destinations.map((dest) => (
                          <button
                            key={dest.code}
                            onMouseEnter={() => setActiveCountry(dest.code)}
                            onClick={() => setActiveCountry(dest.code)}
                            className={`flex items-center gap-3 w-full text-left pl-10 pr-6 py-3 text-[14px] transition-all duration-150
                              ${activeCountry === dest.code
                                ? 'bg-white text-brand-teal-dark font-bold border-l-[3px] border-brand-teal ml-0'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white border-l-[3px] border-transparent'}`}
                          >
                            <Image
                              src={`https://flagcdn.com/w40/${dest.code}.png`}
                              alt={dest.name}
                              width={22} height={16}
                              className="w-5 h-auto rounded-sm shadow-sm shrink-0"
                            />
                            <span className="font-semibold">{dest.name}</span>
                            <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {clinics.filter(c => c.code === dest.code).length}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Spécialités & Services */}
                <button
                  onClick={() => { setActiveLeft('specialites'); setActiveCountry(null) }}
                  className={`flex items-center w-full text-left px-6 py-3.5 text-[15px] font-bold transition-all duration-200
                    ${activeLeft === 'specialites'
                      ? 'text-slate-900 bg-slate-50 border-l-[3px] border-brand-teal'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-l-[3px] border-transparent'}`}
                >
                  Spécialités & Services
                </button>

                <div className="h-px bg-slate-100 mx-6 my-2" />

                {/* Direct links */}
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="flex items-center w-full text-left px-6 py-3 text-[15px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all border-l-[3px] border-transparent"
                >
                  Comment ça marche
                </button>
                <Link
                  href="/notre-processus"
                  onClick={closeMenu}
                  className="flex items-center w-full text-left px-6 py-3 text-[15px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all border-l-[3px] border-transparent"
                >
                  Notre Processus
                </Link>

                <div className="h-px bg-slate-100 mx-6 my-2" />

                {/* Auth shortcuts (desktop sidebar) */}
                <div className="px-6 pt-2 space-y-2 hidden sm:block">
                  {!isLoading && !user && (
                    <>
                      <Link href="/login" onClick={closeMenu}>
                        <Button variant="outline" className="w-full h-9 text-sm rounded-xl font-semibold">
                          <LogIn size={15} className="mr-2" /> Se connecter
                        </Button>
                      </Link>
                      <Link href="/register" onClick={closeMenu}>
                        <Button className="w-full h-9 text-sm rounded-xl bg-brand-teal text-white font-bold shadow-md shadow-brand-teal/20">
                          Mon Espace Santé
                        </Button>
                      </Link>
                    </>
                  )}
                  {!isLoading && user && (
                    <>
                      <Link href={getDashboardLink()} onClick={closeMenu}>
                        <Button className="w-full h-9 text-sm rounded-xl bg-brand-teal text-white font-bold">
                          <User size={14} className="mr-2" /> {getDashboardText()}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => { handleLogout(); closeMenu() }}
                        className="w-full h-9 text-sm rounded-xl text-red-600 border-red-200 hover:bg-red-50 font-semibold"
                      >
                        <LogOut size={14} className="mr-2" /> Déconnexion
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT PANEL — dynamic content */}
              <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#B8DDD7 transparent' }}>
                <AnimatePresence mode="wait">

                  {/* ── DESTINATIONS & CLINIQUES ───────────────────────── */}
                  {activeLeft === 'destinations' && (
                    <motion.div
                      key="panel-dest"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="p-6 sm:p-10"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            {activeCountry ? `Cliniques en ${countryName}` : `Nos ${destinations.length} hubs internationaux`}
                          </p>
                          <h2 className="text-2xl font-bold text-slate-900">
                            {activeCountry
                              ? countryName
                              : 'Destinations & Cliniques partenaires'}
                          </h2>
                          <p className="text-sm text-slate-500 mt-1">
                            {activeCountry
                              ? `${shownClinics.length} établissement${shownClinics.length > 1 ? 's' : ''} sélectionné${shownClinics.length > 1 ? 's' : ''} au ${countryName}`
                              : `${clinics.length} cliniques certifiées dans ${destinations.length} pays`}
                          </p>
                        </div>
                        <Link
                          href="/liste-pays"
                          onClick={closeMenu}
                          className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-brand-teal hover:text-brand-teal-dark transition-colors"
                        >
                          Voir tout <ArrowRight size={14} />
                        </Link>
                      </div>

                      {/* Countries grid (when no country selected) */}
                      <AnimatePresence mode="wait">
                        {!activeCountry && (
                          <motion.div
                            key="countries-grid"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
                          >
                            {destinations.map((dest) => (
                              <button
                                key={dest.code}
                                onMouseEnter={() => setActiveCountry(dest.code)}
                                onClick={() => setActiveCountry(dest.code)}
                                className="group flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-md bg-white text-left transition-all duration-200"
                              >
                                <Image
                                  src={`https://flagcdn.com/w80/${dest.code}.png`}
                                  alt={dest.name}
                                  width={32} height={24}
                                  className="w-8 h-auto rounded-md shadow-sm shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-[14px] text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">{dest.name}</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5">{dest.type}</div>
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}

                        {/* Back link when country selected */}
                        {activeCountry && (
                          <motion.div
                            key="back-link"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-4"
                          >
                            <button
                              onClick={() => setActiveCountry(null)}
                              className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-brand-teal transition-colors"
                            >
                              ← Tous les hubs
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Clinics grid */}
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                          {activeCountry ? 'Établissements' : 'Cliniques mises en avant'}
                        </p>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeCountry || 'all-clinics'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                          >
                            {shownClinics.map((clinic, idx) => (
                              <Link
                                key={`${clinic.name}-${idx}`}
                                href="#"
                                onClick={closeMenu}
                                className="group flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-lg bg-white transition-all duration-200"
                              >
                                {/* Flag icon */}
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand-teal-pale group-hover:border-brand-teal-border transition-colors overflow-hidden">
                                  <Image
                                    src={`https://flagcdn.com/w40/${clinic.code}.png`}
                                    alt=""
                                    width={26} height={19}
                                    className="w-6 h-auto rounded-sm"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-[13px] text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">{clinic.name}</div>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <MapPin size={10} className="text-slate-400 shrink-0" />
                                    <span className="text-[11px] text-slate-500">{clinic.loc}</span>
                                    <span className="text-slate-300 text-xs">·</span>
                                    <StarRating rating={Number(clinic.rating)} />
                                  </div>
                                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1 leading-tight">{clinic.spec}</div>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* CTA */}
                      <div className="mt-8 pt-6 border-t border-slate-100">
                        <Button className="bg-brand-teal text-white hover:bg-brand-teal-dark px-6 h-11 text-sm font-bold rounded-xl shadow-md">
                          {activeCountry
                            ? `Explorer toutes les cliniques au ${countryName}`
                            : 'Consulter notre annuaire complet'}
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── SPÉCIALITÉS & SERVICES ─────────────────────────── */}
                  {activeLeft === 'specialites' && (
                    <motion.div
                      key="panel-spec"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="p-6 sm:p-10"
                    >
                      <div className="mb-6">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expertise médicale</p>
                        <h2 className="text-2xl font-bold text-slate-900">Spécialités & Services</h2>
                        <p className="text-sm text-slate-500 mt-1">Pôles d&apos;excellence sélectionnés avec l&apos;ensemble des services inclus</p>
                      </div>

                      {/* Specialties grid */}
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Spécialités médicales</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                        {specialties.map((spec) => (
                          <Link
                            key={spec.name}
                            href="#"
                            onClick={closeMenu}
                            className="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-lg bg-white transition-all duration-200"
                          >
                            <div className="w-11 h-11 bg-slate-50 border border-slate-100 text-brand-teal rounded-xl flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white group-hover:border-brand-teal group-hover:scale-105 transition-all duration-300 shadow-sm shrink-0">
                              <spec.icon size={20} strokeWidth={1.5} />
                            </div>
                            <div className="pt-0.5 min-w-0">
                              <div className="font-bold text-[14px] text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">{spec.name}</div>
                              <div className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-2">{spec.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Services */}
                      <div className="border-t border-slate-100 pt-6">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Services inclus dans chaque séjour</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                          {services.map((svc) => (
                            <div key={svc.name} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-white">
                              <div className="w-9 h-9 rounded-lg bg-brand-teal-pale text-brand-teal flex items-center justify-center shrink-0">
                                <svc.icon size={16} />
                              </div>
                              <span className="text-[13px] font-semibold text-slate-700">{svc.name}</span>
                            </div>
                          ))}
                        </div>
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 h-11 text-sm font-bold rounded-xl shadow-lg">
                          Demander un devis personnalisé <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── EMPTY STATE ────────────────────────────────────── */}
                  {!activeLeft && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full py-24 text-center px-8"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-brand-teal-pale text-brand-teal flex items-center justify-center mb-4">
                        <Building2 size={28} />
                      </div>
                      <p className="text-base font-semibold text-slate-400">Sélectionnez une catégorie</p>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>{/* end main split */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
