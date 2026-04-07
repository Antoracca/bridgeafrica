'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, LogIn, ArrowRight, MapPin, Star, StarHalf, Search, Globe, Network } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { NAV_DESTINATIONS, NAV_CLINICS, NAV_SPECIALTY_DATA, NAV_SERVICES } from '@/lib/data/homepage'
import type { ClinicEntry } from '@/lib/data/homepage'
import { ClinicModal } from './ClinicModal'
import { NavSpecialties } from './NavSpecialties'
import { NavbarMobile } from './NavbarMobile'
import { NavHowItWorks } from './NavHowItWorks'

/* ── Data ───────────────────────────────────────────────────────────── */
const destinations = NAV_DESTINATIONS
const clinics      = NAV_CLINICS
const specialties  = NAV_SPECIALTY_DATA
const servicesList = NAV_SERVICES

/* ── Stars ──────────────────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating), half = rating % 1 !== 0, empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: full }).map((_, i) => <Star key={`f${i}`} size={9} className="fill-amber-400 text-amber-400" />)}
      {half && <StarHalf size={9} className="fill-amber-400 text-amber-400" />}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} size={9} className="fill-slate-200 text-slate-200" />)}
      <span className="text-[10px] font-bold text-slate-500 ml-1">{rating}</span>
    </span>
  )
}

/* ── Diamond separator ──────────────────────────────────────────────── */
function Diamond() {
  return (
    <div className="flex items-center gap-4 py-8 select-none">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rotate-45 bg-slate-300" />
        <div className="w-2.5 h-2.5 rotate-45 border border-brand-teal bg-brand-teal/10" />
        <div className="w-1.5 h-1.5 rotate-45 bg-slate-300" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════════ */
export function Navbar() {
  const [menuOpen, setMenuOpen]           = useState(false)
  const [activeSection, setActiveSection] = useState<'destinations' | 'specialites' | 'how'>('destinations')
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [searchQuery, setSearchQuery]     = useState('')
  const [isScrolled, setIsScrolled]       = useState(false)
  const [user, setUser]                   = useState<{ id: string; role: string } | null>(null)
  const [isLoading, setIsLoading]         = useState(true)
  const [selectedClinic, setSelectedClinic] = useState<ClinicEntry | null>(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const headerRef    = useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = useState(112)
  const router = useRouter()

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Measure real header height so overlay never hides behind it */
  useEffect(() => {
    const measure = () => {
      requestAnimationFrame(() => {
        if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isScrolled])

  /* iOS-safe body scroll lock — prevents background page from scrolling */
  useEffect(() => {
    if (!menuOpen) return
    const scrollY = window.scrollY
    const body = document.body
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    return () => {
      const top = body.style.top
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      body.style.overflow = ''
      window.scrollTo(0, Math.abs(parseInt(top || '0', 10)))
    }
  }, [menuOpen])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    const check = async () => {
      try {
        const { data: { user: u }, error } = await supabase.auth.getUser()
        if (error || !u) { setUser(null); return }
        try {
          const { data: p } = await supabase.from('profiles').select('role').eq('id', u.id).single<{ role: string }>()
          setUser({ id: u.id, role: p?.role || 'patient' })
        } catch { setUser({ id: u.id, role: 'patient' }) }
      } catch { setUser(null) }
      finally { setIsLoading(false) }
    }
    check()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => check())
    return () => { subscription.unsubscribe() }
  }, [])

  const handleLogout = async () => { await createClient().auth.signOut(); setUser(null); router.push('/'); router.refresh() }
  const dashLink = () => !user ? '/register' : ({ medecin_referent: '/medecin', clinique: '/clinique' }[user.role] ?? '/patient')
  const dashText = () => !user ? 'Mon Espace Santé' : ({ medecin_referent: 'Espace Médecin', clinique: 'Espace Clinique' }[user.role] ?? 'Mon Espace Santé')
  const closeMenu = () => { setMenuOpen(false); setActiveCountry(null); setSearchQuery(''); setSelectedSpecialty(null) }
  const scrollTo = (id: string) => { closeMenu(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  /* ── Search ── */
  const q = searchQuery.toLowerCase().trim()

  const filteredClinics = useMemo(() => {
    let list = activeCountry === 'partners'
      ? clinics.filter(c => destinations.find(d => d.code === c.code)?.type !== 'Hub Prioritaire')
      : activeCountry
        ? clinics.filter(c => c.code === activeCountry)
        : clinics
    if (q) list = list.filter(c => c.name.toLowerCase().includes(q) || c.loc.toLowerCase().includes(q) || c.spec.toLowerCase().includes(q))
    return list
  }, [q, activeCountry])

  const filteredSpecialties = useMemo(() =>
    q ? specialties.filter(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) : specialties
  , [q])

  /* Split clinics by category for 2-column layout */
  const hospItems = useMemo(() => filteredClinics.filter(c => c.category === 'hôpital'), [filteredClinics])
  const clinItems = useMemo(() => filteredClinics.filter(c => c.category === 'clinique'), [filteredClinics])
  const bothPresent = hospItems.length > 0 && clinItems.length > 0

  const filteredServices = useMemo(() =>
    q ? servicesList.filter(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) : servicesList
  , [q])

  const countryName = activeCountry === 'partners'
    ? 'Hubs partenaires'
    : destinations.find(d => d.code === activeCountry)?.name

  /* ── Animation — fast & snappy ── */
  const panelV = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  }

  /* ══ RENDER ═════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans
        ${isScrolled || menuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* LEFT — hamburger + logo + creative strip (menu open) */}
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
              className={`p-2.5 rounded-xl border transition-all duration-200 ${menuOpen ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
              {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2} />}
            </button>
            <Link href="/" onClick={closeMenu} className="flex items-center group shrink-0">
              <Image src="/Logomeba.png" alt="MediBridge Africa" width={400} height={100}
                className="h-16 sm:h-20 w-auto object-contain group-hover:opacity-80 transition-opacity" priority />
            </Link>

            {/* ── Creative strip: visible only when menu is open ── */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  key="creative-strip"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:flex items-center gap-3.5 pl-5 ml-1 border-l border-slate-200/80"
                >
                  <div className="w-[2px] h-8 bg-brand-teal/40 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.18em] mb-0.5">
                      {activeSection === 'destinations' ? 'Destinations médicales'
                        : activeSection === 'specialites' ? 'Expertise médicale'
                        : 'Parcours patient'}
                    </p>
                    <p className="text-[14px] font-bold text-slate-900 leading-snug">
                      {activeSection === 'destinations'
                        ? 'Hôpitaux & cliniques partenaires'
                        : activeSection === 'specialites'
                          ? 'Spécialités & services inclus'
                          : 'Comment ça marche en 4 étapes'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CENTER nav — shifts right + flattens when menu opens */}
          <nav className={`hidden sm:flex flex-1 items-center transition-all duration-300 ${menuOpen ? 'justify-end' : 'justify-center'}`}>
            <div className={`flex items-center gap-0.5 transition-all duration-300 px-1.5 py-1.5
              ${menuOpen ? 'bg-transparent border-transparent gap-1' : 'bg-slate-50 border border-slate-200/80 rounded-full'}`}>
              {[
                { key: 'destinations' as const, label: 'Destinations & Cliniques' },
                { key: 'specialites' as const, label: 'Spécialités & Services' },
                { key: 'how' as const, label: 'Comment ça marche' },
              ].map(item => (
                <button key={item.key}
                  onClick={() => { setActiveSection(item.key); setActiveCountry(null); setMenuOpen(true) }}
                  className={`text-[13px] font-semibold px-3.5 py-1.5 transition-all duration-200
                    ${menuOpen ? 'rounded-none border-b-2' : 'rounded-full'}
                    ${menuOpen && activeSection === item.key
                      ? 'text-brand-teal border-brand-teal'
                      : menuOpen
                        ? 'text-slate-500 border-transparent hover:text-brand-teal hover:border-brand-teal/30'
                        : 'text-slate-600 hover:text-brand-teal hover:bg-white/70'}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* RIGHT auth — disappears when menu opens */}
          <AnimatePresence>
            {!menuOpen && (
              <motion.div
                key="auth-buttons"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 shrink-0"
              >
                {!isLoading ? (
                  user ? (
                    <>
                      <Link href={dashLink()}>
                        <Button className="rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white px-4 sm:px-5 h-9 text-[13px] font-bold shadow-md shadow-brand-teal/20">
                          <User size={15} className="mr-1.5" />
                          <span className="hidden sm:inline">{dashText()}</span>
                          <span className="sm:hidden">Mon espace</span>
                        </Button>
                      </Link>
                      <Button variant="ghost" onClick={handleLogout} className="rounded-full text-slate-500 hover:text-red-600 hover:bg-red-50 h-9 w-9 p-0">
                        <LogOut size={16} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="hidden sm:flex text-[13px] font-bold text-slate-600 hover:text-brand-teal transition-colors items-center gap-1.5 px-3">
                        <LogIn size={15} /> Connexion
                      </Link>
                      <Link href="/login" className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:text-brand-teal hover:border-brand-teal-border transition-all">
                        <LogIn size={16} />
                      </Link>
                      <Link href="/register">
                        <Button className="rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white px-4 sm:px-5 h-9 text-[13px] font-bold shadow-md shadow-brand-teal/20">
                          <span className="hidden sm:inline">Mon Espace Santé</span>
                          <span className="sm:hidden">S&#39;inscrire</span>
                        </Button>
                      </Link>
                    </>
                  )
                ) : <div className="w-28 h-9 bg-slate-100 rounded-full animate-pulse" />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ─── OVERLAY ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white"
            style={{ paddingTop: `${headerHeight}px` }}>

            <div className="flex flex-col h-full">

              {/* Search */}
              <div className="shrink-0 border-b border-slate-100 bg-[#fafafa] px-4 sm:px-8 py-3.5">
                <div className="max-w-xl relative">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Rechercher une destination, clinique ou spécialité..."
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 transition-all"
                    style={{ fontSize: '16px' }} />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* ── MOBILE — drill-down navigation < lg ── */}
              <NavbarMobile closeMenu={closeMenu} onSelectClinic={setSelectedClinic} />

              {/* Main split — DESKTOP only (≥ lg) */}
              <div className="hidden lg:flex flex-1 overflow-hidden">

                {/* ── LEFT SIDEBAR ── */}
                <div className="w-[260px] sm:w-[280px] shrink-0 border-r border-slate-100 flex flex-col bg-[#fafafa]">

                  {/* ── Scrollable nav area ── */}
                  <div className="flex-1 overflow-y-auto min-h-0" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>

                  {/* ── Presentation header — syncs with active section ── */}
                  <div className="px-5 pt-5 pb-4">
                    <p className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.22em] mb-2">
                      {activeSection === 'destinations' ? 'Destinations'
                        : activeSection === 'specialites' ? 'Spécialités'
                        : 'Parcours patient'}
                    </p>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
                      {activeSection === 'destinations' ? 'Notre réseau médical'
                        : activeSection === 'specialites' ? 'Notre expertise'
                        : 'Comment ça marche'}
                    </h3>
                  </div>
                  <div className="h-px bg-slate-200/80 mx-5 mb-1" />

                  {/* Section: Destinations */}
                  <button onClick={() => { setActiveSection('destinations'); setActiveCountry(null) }}
                    className={`w-full text-left px-5 py-3 text-[13px] font-bold tracking-wide uppercase transition-all
                      ${activeSection === 'destinations' ? 'text-brand-teal border-l-2 border-brand-teal bg-white' : 'text-slate-500 hover:text-slate-800 border-l-2 border-transparent hover:bg-white/60'}`}>
                    Destinations & Cliniques
                  </button>

                  {/* Country sub-items */}
                  <AnimatePresence>
                    {activeSection === 'destinations' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} className="pb-2">

                        {/* Tous les hubs */}
                        <button onClick={() => setActiveCountry(null)}
                          className={`flex items-center gap-3 w-full text-left pl-7 pr-5 py-2.5 text-[13px] transition-all
                            ${!activeCountry ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>
                          <Globe size={13} className={`shrink-0 transition-colors ${!activeCountry ? 'text-brand-teal' : 'text-slate-300'}`} />
                          Tous les hubs
                          <span className="ml-auto text-[10px] text-slate-400 tabular-nums">{clinics.length}</span>
                        </button>

                        {/* Hub Prioritaire label */}
                        <div className="pl-7 pr-5 pt-3 pb-1.5">
                          <span className="text-[9px] font-bold text-brand-teal/70 uppercase tracking-[0.18em]">Hub Prioritaire</span>
                        </div>

                        {/* Maroc */}
                        {destinations.filter(d => d.type === 'Hub Prioritaire').map(dest => (
                          <button key={dest.code} onClick={() => setActiveCountry(dest.code)}
                            className={`flex items-center gap-3 w-full text-left pl-7 pr-5 py-2.5 text-[13px] transition-all
                              ${activeCountry === dest.code ? 'text-slate-900 font-bold bg-white border-l-2 border-brand-teal' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border-l-2 border-transparent'}`}>
                            <Image src={`https://flagcdn.com/w40/${dest.code}.png`} alt={dest.name} width={18} height={13} className="w-[18px] h-auto rounded-[2px] shadow-sm shrink-0" />
                            {dest.name}
                            <span className="ml-auto text-[10px] text-slate-400 tabular-nums">{clinics.filter(c => c.code === dest.code).length}</span>
                          </button>
                        ))}

                        {/* Hubs partenaires — clickable filter */}
                        <div className="mx-5 mt-3 mb-0 h-px bg-slate-200" />
                        <button
                          onClick={() => setActiveCountry('partners')}
                          className={`flex items-center justify-between w-full pl-7 pr-5 pt-3 pb-1.5 group transition-colors`}
                        >
                          <span className={`text-[9px] font-bold uppercase tracking-[0.18em] transition-colors
                            ${activeCountry === 'partners' ? 'text-brand-teal' : 'text-slate-400/80 group-hover:text-brand-teal/70'}`}>
                            Hubs partenaires
                          </span>
                          <span className={`text-[10px] tabular-nums font-medium transition-colors
                            ${activeCountry === 'partners' ? 'text-brand-teal' : 'text-slate-300 group-hover:text-slate-500'}`}>
                            {destinations.filter(d => d.type !== 'Hub Prioritaire').reduce((n, d) => n + clinics.filter(c => c.code === d.code).length, 0)}
                          </span>
                        </button>

                        {/* Partner hubs */}
                        {destinations.filter(d => d.type !== 'Hub Prioritaire').map(dest => (
                          <button key={dest.code} onClick={() => setActiveCountry(dest.code)}
                            className={`flex items-center gap-3 w-full text-left pl-7 pr-5 py-2.5 text-[13px] transition-all
                              ${activeCountry === dest.code ? 'text-slate-900 font-bold bg-white border-l-2 border-brand-teal' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border-l-2 border-transparent'}`}>
                            <Image src={`https://flagcdn.com/w40/${dest.code}.png`} alt={dest.name} width={18} height={13} className="w-[18px] h-auto rounded-[2px] shadow-sm shrink-0" />
                            {dest.name}
                            <span className="ml-auto text-[10px] text-slate-400 tabular-nums">{clinics.filter(c => c.code === dest.code).length}</span>
                          </button>
                        ))}

                        <div className="h-4" />{/* bottom breath */}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="h-px bg-slate-200/80 mx-5 my-1" />

                  {/* Section: Spécialités */}
                  <button onClick={() => { setActiveSection('specialites'); setActiveCountry(null); setSelectedSpecialty(null) }}
                    className={`w-full text-left px-5 py-4 transition-all
                      ${activeSection === 'specialites'
                        ? 'border-l-2 border-brand-teal bg-white'
                        : 'border-l-2 border-transparent hover:bg-white/60'
                      }`}>
                    <span className={`text-[13px] font-bold tracking-wide uppercase block ${activeSection === 'specialites' ? 'text-brand-teal' : 'text-slate-500 hover:text-slate-800'}`}>
                      Spécialités & Services
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      12 spécialités · 8 services inclus
                    </span>
                  </button>

                  {/* Specialty sub-items */}
                  <AnimatePresence>
                    {activeSection === 'specialites' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} className="pb-2">

                        {/* All specialties */}
                        <button onClick={() => setSelectedSpecialty(null)}
                          className={`flex items-center gap-3 w-full text-left pl-7 pr-5 py-2.5 text-[13px] transition-all
                            ${!selectedSpecialty ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-700'}`}>
                          <Globe size={13} className={`shrink-0 transition-colors ${!selectedSpecialty ? 'text-brand-teal' : 'text-slate-300'}`} />
                          Toutes les spécialités
                          <span className="ml-auto text-[10px] text-slate-400 tabular-nums">{specialties.length}</span>
                        </button>

                        {/* Individual specialties */}
                        {specialties.slice(0, 8).map(spec => (
                          <button key={spec.name} onClick={() => setSelectedSpecialty(spec.name)}
                            className={`flex items-center gap-3 w-full text-left pl-7 pr-5 py-2 text-[12px] transition-all
                              ${selectedSpecialty === spec.name
                                ? 'text-slate-900 font-bold bg-white border-l-2 border-brand-teal'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border-l-2 border-transparent'
                              }`}>
                            <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                            <span className="truncate">{spec.name}</span>
                          </button>
                        ))}
                        {specialties.length > 8 && (
                          <p className="pl-11 pr-5 py-1 text-[10px] text-slate-400">
                            +{specialties.length - 8} autres spécialités
                          </p>
                        )}
                        <div className="h-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="h-px bg-slate-200/80 mx-5 my-1" />

                  {/* Section: Comment ça marche */}
                  <button onClick={() => { setActiveSection('how'); setActiveCountry(null); setSelectedSpecialty(null) }}
                    className={`w-full text-left px-5 py-4 transition-all
                      ${activeSection === 'how'
                        ? 'border-l-2 border-brand-teal bg-white'
                        : 'border-l-2 border-transparent hover:bg-white/60'
                      }`}>
                    <span className={`text-[13px] font-bold tracking-wide uppercase block ${activeSection === 'how' ? 'text-brand-teal' : 'text-slate-500 hover:text-slate-800'}`}>
                      Comment ça marche
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Parcours patient en 4 étapes
                    </span>
                  </button>

                  <div className="h-6" />{/* bottom breath inside scroll */}
                  </div>{/* end scrollable area */}

                  {/* Auth — fixed at bottom of sidebar, always visible */}
                  <div className="shrink-0 px-5 py-4 border-t border-slate-200/80 space-y-2 bg-[#fafafa]">
                    {!isLoading && !user && (
                      <>
                        <Link href="/login" onClick={closeMenu}>
                          <Button variant="outline" className="w-full h-9 text-[12px] font-semibold rounded-none border-slate-200">
                            <LogIn size={13} className="mr-1.5" /> Connexion
                          </Button>
                        </Link>
                        <Link href="/register" onClick={closeMenu}>
                          <Button className="w-full h-9 text-[12px] bg-brand-teal hover:bg-brand-teal-dark text-white font-bold rounded-none shadow-none">
                            Mon Espace Santé
                          </Button>
                        </Link>
                      </>
                    )}
                    {!isLoading && user && (
                      <>
                        <Link href={dashLink()} onClick={closeMenu}>
                          <Button className="w-full h-9 text-[12px] bg-brand-teal hover:bg-brand-teal-dark text-white font-bold rounded-none">
                            <User size={13} className="mr-1.5" /> {dashText()}
                          </Button>
                        </Link>
                        <Button variant="outline" onClick={() => { handleLogout(); closeMenu() }}
                          className="w-full h-9 text-[12px] text-red-600 border-red-200 hover:bg-red-50 font-semibold rounded-none">
                          <LogOut size={13} className="mr-1.5" /> Déconnexion
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#B8DDD7 transparent' }}>
                  <AnimatePresence mode="wait">

                    {/* ═══ DESTINATIONS ═══════════════════════════════════ */}
                    {activeSection === 'destinations' && (
                      <motion.div key="dest" variants={panelV} initial="initial" animate="animate" exit="exit" className="p-8 sm:p-10 lg:p-12">

                        {/* Header */}
                        <div className="flex items-end justify-between mb-10">
                          <div>
                            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em] mb-1">
                              {activeCountry === 'partners'
                                ? 'Réseau partenaire'
                                : activeCountry
                                  ? destinations.find(d => d.code === activeCountry)?.type
                                  : 'Réseau médical international'}
                            </p>
                            <h2 className="text-2xl sm:text-3xl text-slate-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                              {activeCountry
                                ? countryName
                                : 'Destinations : nos hôpitaux et cliniques partenaires'}
                            </h2>
                            <p className="text-[13px] text-slate-500 mt-1">
                              {activeCountry
                                ? `${filteredClinics.length} établissement${filteredClinics.length > 1 ? 's' : ''} partenaire${filteredClinics.length > 1 ? 's' : ''}`
                                : `${clinics.length} établissements dans ${destinations.length} pays`}
                            </p>
                          </div>
                          <Link href="/liste-pays" onClick={closeMenu}
                            className="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-brand-teal hover:text-brand-teal-dark transition-colors shrink-0">
                            Tout voir <ArrowRight size={13} />
                          </Link>
                        </div>

                        {/* Hub cards (when viewing all or partners) */}
                        {(!activeCountry || activeCountry === 'partners') && (
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {destinations
                              .filter(dest => activeCountry === 'partners' ? dest.type !== 'Hub Prioritaire' : true)
                              .map((dest, i) => (
                              <button key={dest.code} onClick={() => setActiveCountry(dest.code)}
                                className="group text-left relative overflow-hidden bg-white border border-slate-100 hover:border-brand-teal/20 p-5 transition-all duration-300 hover:shadow-md">
                                {dest.type === 'Hub Prioritaire' && <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-teal" />}
                                <Image src={`https://flagcdn.com/w80/${dest.code}.png`} alt={dest.name} width={28} height={20}
                                  className="w-7 h-auto rounded-[2px] shadow-sm mb-3" />
                                <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors mb-0.5">{dest.name}</h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-3">{dest.type}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] text-slate-500">{clinics.filter(c => c.code === dest.code).length} établissements</span>
                                  <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal group-hover:translate-x-0.5 transition-all" />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* ── Clinic columns ── */}
                        <AnimatePresence mode="wait">
                          <motion.div key={activeCountry || 'all'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

                            {filteredClinics.length === 0 ? (
                              <div className="text-center py-16">
                                <p className="text-sm text-slate-400">Aucun résultat pour &laquo; {searchQuery} &raquo;</p>
                              </div>
                            ) : bothPresent ? (
                              /* ── Two columns: Hôpitaux | Diamond | Cliniques ── */
                              <div className="flex items-stretch">

                                {/* Hôpitaux — left */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-3 pl-2 border-l-2 border-brand-teal">
                                    Hôpitaux
                                  </p>
                                  {hospItems.map((clinic, i) => (
                                    <button key={`h-${i}`} onClick={() => setSelectedClinic(clinic)}
                                      className="group flex items-start gap-3 py-3 px-2 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 w-full text-left">
                                      <div className="w-8 h-8 bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                        <Image src={`https://flagcdn.com/w40/${clinic.code}.png`} alt="" width={20} height={14} className="w-5 h-auto" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-1">
                                          <h4 className="text-[12px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">{clinic.name}</h4>
                                          <ArrowRight size={11} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-0.5 transition-all" />
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          <MapPin size={9} className="text-slate-400 shrink-0" />
                                          <span className="text-[10px] text-slate-500">{clinic.loc}</span>
                                          <span className="text-slate-300 text-[10px]">·</span>
                                          <Stars rating={Number(clinic.rating)} />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-1">{clinic.spec}</p>
                                      </div>
                                    </button>
                                  ))}
                                </div>

                                {/* Vertical Diamond separator */}
                                <div className="flex flex-col items-center px-4 sm:px-6 select-none self-stretch">
                                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" style={{ minHeight: 20 }} />
                                  <div className="flex flex-col items-center gap-1.5 py-4">
                                    <div className="w-1.5 h-1.5 rotate-45 bg-slate-300" />
                                    <div className="w-2.5 h-2.5 rotate-45 border border-brand-teal bg-brand-teal/10" />
                                    <div className="w-1.5 h-1.5 rotate-45 bg-slate-300" />
                                  </div>
                                  <div className="flex-1 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" style={{ minHeight: 20 }} />
                                </div>

                                {/* Cliniques — right */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-3 pl-2 border-l-2 border-slate-300">
                                    Cliniques
                                  </p>
                                  {clinItems.map((clinic, i) => (
                                    <button key={`c-${i}`} onClick={() => setSelectedClinic(clinic)}
                                      className="group flex items-start gap-3 py-3 px-2 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 w-full text-left">
                                      <div className="w-8 h-8 bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                        <Image src={`https://flagcdn.com/w40/${clinic.code}.png`} alt="" width={20} height={14} className="w-5 h-auto" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-1">
                                          <h4 className="text-[12px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">{clinic.name}</h4>
                                          <ArrowRight size={11} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-0.5 transition-all" />
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          <MapPin size={9} className="text-slate-400 shrink-0" />
                                          <span className="text-[10px] text-slate-500">{clinic.loc}</span>
                                          <span className="text-slate-300 text-[10px]">·</span>
                                          <Stars rating={Number(clinic.rating)} />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-1">{clinic.spec}</p>
                                      </div>
                                    </button>
                                  ))}
                                </div>

                              </div>
                            ) : (
                              /* ── Single column (only hôpitaux or only cliniques) ── */
                              <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-3 pl-2 border-l-2 border-brand-teal">
                                  {hospItems.length > 0 ? 'Hôpitaux' : 'Cliniques'}
                                </p>
                                {(hospItems.length > 0 ? hospItems : clinItems).map((clinic, i) => (
                                  <button key={`s-${i}`} onClick={() => setSelectedClinic(clinic)}
                                    className="group flex items-start gap-4 py-3.5 px-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 w-full text-left">
                                    <div className="w-9 h-9 bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                      <Image src={`https://flagcdn.com/w40/${clinic.code}.png`} alt="" width={24} height={17} className="w-6 h-auto" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-brand-teal transition-colors leading-tight">{clinic.name}</h4>
                                        <ArrowRight size={12} className="text-slate-300 group-hover:text-brand-teal shrink-0 mt-0.5 transition-all" />
                                      </div>
                                      <div className="flex items-center gap-2 mt-1">
                                        <MapPin size={10} className="text-slate-400 shrink-0" />
                                        <span className="text-[11px] text-slate-500">{clinic.loc}</span>
                                        <span className="text-slate-300">·</span>
                                        <Stars rating={Number(clinic.rating)} />
                                      </div>
                                      <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-1">{clinic.spec}</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}

                          </motion.div>
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {/* ═══ SPÉCIALITÉS & SERVICES ═════════════════════════ */}
                    {activeSection === 'specialites' && (
                      <motion.div key="spec" variants={panelV} initial="initial" animate="animate" exit="exit">
                        <NavSpecialties
                          selectedSpecialty={selectedSpecialty}
                          onSelect={setSelectedSpecialty}
                          onSelectClinic={setSelectedClinic}
                          filteredSpecialties={filteredSpecialties}
                          filteredServices={filteredServices}
                          closeMenu={closeMenu}
                        />
                      </motion.div>
                    )}

                    {/* ═══ COMMENT ÇA MARCHE ═════════════════════════════ */}
                    {activeSection === 'how' && (
                      <motion.div key="how" variants={panelV} initial="initial" animate="animate" exit="exit">
                        <NavHowItWorks closeMenu={closeMenu} />
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CLINIC MODAL ───────────────────────────────────────── */}
      <ClinicModal clinic={selectedClinic} onClose={() => setSelectedClinic(null)} />
    </>
  )
}
