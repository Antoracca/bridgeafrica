'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, ChevronDown, ArrowRight, Video, CalendarCheck, Globe, MapPin } from 'lucide-react'
import { DoctorProfileModal, type DoctorFull } from './DoctorProfileModal'
import { DoctorRDVModal } from './DoctorRDVModal'
import { PartenaireModal } from './PartenaireModal'
import { AmbassadeurModal } from './AmbassadeurModal'

/* ──────────────────────────────────────────────────────────────────────
   DATA — 10 médecins enrichis
   ────────────────────────────────────────────────────────────────────── */

const DOCTORS: DoctorFull[] = [
  {
    id: '1',
    name: 'Dr méd. Mehmet Özkan',
    title: 'Chirurgien Cardiovasculaire',
    specialties: ['Cardiologie', 'Cathétérisme cardiaque', 'Pontage coronarien', 'Chirurgie robotique'],
    specialty: 'Cardiologie',
    location: 'Istanbul',
    country: 'tr',
    countryLabel: 'Turquie',
    establishment: 'Acibadem Hospital',
    teleconsultation: true,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Pionnier de la chirurgie cardiaque mini-invasive en Turquie, le Dr Özkan cumule plus de 2 500 interventions à cœur ouvert. Formé à la Cleveland Clinic, il dirige le département cardiovasculaire d\'Acibadem et est reconnu pour ses travaux sur les techniques de pontage sans circulation extracorporelle.',
    experience: 22,
    languages: ['Turc', 'Anglais', 'Allemand'],
    education: 'Faculté de Médecine d\'Istanbul · Fellowship Cleveland Clinic (USA) · Certification European Board of Cardiovascular Surgery',
    publications: 45,
    consultations: 8200,
  },
  {
    id: '2',
    name: 'Dr méd. Sarah Benali',
    title: 'Neurochirurgienne',
    specialties: ['Neurologie', 'Chirurgie du rachis', 'Tumeurs cérébrales', 'Microchirurgie'],
    specialty: 'Neurologie',
    location: 'Rabat',
    country: 'ma',
    countryLabel: 'Maroc',
    establishment: 'Hôpital Cheikh Zaid',
    teleconsultation: true,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Première femme neurochirurgienne au Maroc à maîtriser la technique de craniotomie éveillée, le Dr Benali est spécialisée dans l\'exérèse des tumeurs cérébrales en zones éloquentes. Elle a été formée à la Pitié-Salpêtrière et combine expertise chirurgicale et recherche en neurosciences.',
    experience: 15,
    languages: ['Français', 'Arabe', 'Anglais'],
    education: 'Faculté de Médecine de Rabat · Internat Pitié-Salpêtrière (Paris) · DU de Neuro-oncologie, Université Paris VI',
    publications: 28,
    consultations: 4500,
  },
  {
    id: '3',
    name: 'Dr méd. Jean-Pierre Moreau',
    title: 'Oncologue Médical',
    specialties: ['Oncologie', 'Immunothérapie', 'Cancérologie mammaire', 'Radiothérapie ciblée'],
    specialty: 'Oncologie',
    location: 'Paris',
    country: 'fr',
    countryLabel: 'France',
    establishment: 'Institut Curie',
    teleconsultation: true,
    onlineBooking: false,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Référence internationale en immunothérapie anti-tumorale, le Dr Moreau dirige l\'unité de recherche clinique de l\'Institut Curie. Ses travaux sur les inhibiteurs de checkpoint ont contribué à l\'élaboration de protocoles thérapeutiques adoptés dans plus de 30 pays.',
    experience: 25,
    languages: ['Français', 'Anglais', 'Espagnol'],
    education: 'Faculté de Médecine Paris-Descartes · MD-PhD Immunologie Tumorale · Post-doc Memorial Sloan Kettering (New York)',
    publications: 92,
    consultations: 12000,
  },
  {
    id: '4',
    name: 'Dr méd. Fatima El Amrani',
    title: 'Chirurgienne Bariatrique',
    specialties: ['Chirurgie Bariatrique', 'Sleeve gastrectomie', 'Bypass gastrique', 'Mini-invasive'],
    specialty: 'Chirurgie Bariatrique',
    location: 'Tunis',
    country: 'tn',
    countryLabel: 'Tunisie',
    establishment: 'Clinique Pasteur',
    teleconsultation: true,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Le Dr El Amrani est pionnière de la chirurgie bariatrique par voie coelioscopique en Tunisie. Avec un taux de réussite de 97% sur plus de 3 000 interventions, elle est considérée comme la référence nord-africaine en chirurgie de l\'obésité.',
    experience: 18,
    languages: ['Français', 'Arabe', 'Anglais'],
    education: 'Faculté de Médecine de Tunis · Fellowship Chirurgie Bariatrique, Hôpital Européen Georges Pompidou (Paris)',
    publications: 34,
    consultations: 6800,
  },
  {
    id: '5',
    name: 'Dr méd. Youssef Kadiri',
    title: 'Spécialiste PMA & Fertilité',
    specialties: ['PMA & Fertilité', 'FIV', 'ICSI', 'Préservation ovocytaire'],
    specialty: 'PMA & Fertilité',
    location: 'Casablanca',
    country: 'ma',
    countryLabel: 'Maroc',
    establishment: 'Clinique Dar Salam',
    teleconsultation: true,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Le Dr Kadiri a accompagné plus de 2 000 couples dans leur parcours de fertilité. Expert en FIV et ICSI, il a introduit au Maroc les techniques de vitrification ovocytaire et de diagnostic pré-implantatoire. Son centre affiche un taux de grossesse par transfert parmi les plus élevés d\'Afrique.',
    experience: 16,
    languages: ['Français', 'Arabe', 'Anglais'],
    education: 'Faculté de Médecine de Casablanca · DU Médecine de la Reproduction, Université Paris-Sud · Stage IVI Barcelona',
    publications: 21,
    consultations: 5600,
  },
  {
    id: '6',
    name: 'Dr méd. Elif Demir',
    title: 'Spécialiste Greffe Capillaire',
    specialties: ['Greffe Capillaire', 'Technique FUE', 'Technique DHI', 'PRP capillaire'],
    specialty: 'Greffe Capillaire',
    location: 'Istanbul',
    country: 'tr',
    countryLabel: 'Turquie',
    establishment: 'Acibadem Hospital',
    teleconsultation: false,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Avec plus de 6 000 greffes réalisées, le Dr Demir est l\'une des spécialistes les plus demandées d\'Istanbul. Elle maîtrise les techniques FUE saphir et DHI, offrant des résultats naturels avec un taux de repousse de 95%.',
    experience: 12,
    languages: ['Turc', 'Anglais', 'Français'],
    education: 'Faculté de Médecine d\'Ankara · Certification ISHRS (International Society of Hair Restoration Surgery)',
    publications: 15,
    consultations: 6200,
  },
  {
    id: '7',
    name: 'Dr méd. Nadia Mansouri',
    title: 'Chirurgienne Esthétique',
    specialties: ['Chirurgie Esthétique', 'Rhinoplastie', 'Liposuccion', 'Augmentation mammaire'],
    specialty: 'Chirurgie Esthétique',
    location: 'Marrakech',
    country: 'ma',
    countryLabel: 'Maroc',
    establishment: 'Clinique Internationale',
    teleconsultation: true,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Formée à Paris et Bruxelles, le Dr Mansouri est reconnue pour ses rhinoplasties ethniques et son approche naturelle de la chirurgie esthétique. Elle combine techniques chirurgicales avancées et médecine esthétique pour des résultats harmonieux.',
    experience: 14,
    languages: ['Français', 'Arabe', 'Anglais', 'Espagnol'],
    education: 'Faculté de Médecine de Marrakech · DES Chirurgie Plastique, Université Paris-Est · Fellowship Bruxelles',
    publications: 19,
    consultations: 4200,
  },
  {
    id: '8',
    name: 'Dr méd. Philippe Rousseau',
    title: 'Ophtalmologue',
    specialties: ['Ophtalmologie', 'LASIK', 'Chirurgie de la cataracte', 'Greffe de cornée'],
    specialty: 'Ophtalmologie',
    location: 'Paris',
    country: 'fr',
    countryLabel: 'France',
    establishment: 'Hôpital Américain',
    teleconsultation: true,
    onlineBooking: false,
    image: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Expert en chirurgie réfractive et transplantation cornéenne, le Dr Rousseau a réalisé plus de 10 000 interventions LASIK. Il est membre du conseil scientifique de la Société Française d\'Ophtalmologie et consultant auprès de l\'OMS pour les programmes de prévention de la cécité.',
    experience: 28,
    languages: ['Français', 'Anglais'],
    education: 'Faculté de Médecine Paris-Diderot · Fellowship Moorfields Eye Hospital (Londres) · HDR Ophtalmologie',
    publications: 67,
    consultations: 15000,
  },
  {
    id: '9',
    name: 'Dr méd. Amine Jelassi',
    title: 'Orthopédiste',
    specialties: ['Orthopédie', 'Prothèse de hanche', 'Arthroscopie', 'Traumatologie sportive'],
    specialty: 'Orthopédie',
    location: 'Tunis',
    country: 'tn',
    countryLabel: 'Tunisie',
    establishment: 'Clinique Hannibal',
    teleconsultation: false,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Chirurgien orthopédiste de renom, le Dr Jelassi est spécialisé dans la chirurgie prothétique et la traumatologie sportive. Il a été médecin de l\'équipe nationale tunisienne de football et opère des sportifs de haut niveau de toute l\'Afrique.',
    experience: 20,
    languages: ['Français', 'Arabe', 'Anglais', 'Italien'],
    education: 'Faculté de Médecine de Tunis · Internat CHU de Bordeaux · DU de Chirurgie du Sport, Université Lyon 1',
    publications: 31,
    consultations: 7500,
  },
  {
    id: '10',
    name: 'Dr méd. Marie Dupont',
    title: 'Gynécologue',
    specialties: ['Gynécologie', 'Endométriose', 'Chirurgie gynécologique', 'Chirurgie mammaire'],
    specialty: 'Gynécologie',
    location: 'Paris',
    country: 'fr',
    countryLabel: 'France',
    establishment: 'Hôpital Américain',
    teleconsultation: true,
    onlineBooking: true,
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Spécialiste reconnue de l\'endométriose sévère et de la chirurgie gynécologique mini-invasive, le Dr Dupont est responsable du Centre Expert Endométriose de l\'Hôpital Américain. Elle a développé une technique de préservation nerveuse qui réduit les douleurs post-opératoires de 60%.',
    experience: 17,
    languages: ['Français', 'Anglais', 'Portugais'],
    education: 'Faculté de Médecine de Strasbourg · DES Gynécologie-Obstétrique · Fellowship Endométriose, Charité Berlin',
    publications: 38,
    consultations: 9000,
  },
]

const ALL_SPECIALTIES = [
  'Cardiologie', 'Neurologie', 'Oncologie', 'Chirurgie Bariatrique',
  'PMA & Fertilité', 'Greffe Capillaire', 'Chirurgie Esthétique',
  'Ophtalmologie', 'Orthopédie', 'Urologie', 'Dentaire & Implantologie',
  'Gynécologie',
]

const COUNTRIES = [
  { code: 'ma', label: 'Maroc' },
  { code: 'tn', label: 'Tunisie' },
  { code: 'fr', label: 'France' },
  { code: 'tr', label: 'Turquie' },
]

const INITIAL_VISIBLE = 4

/* ──────────────────────────────────────────────────────────────────────
   CARD DESKTOP — Design original beige + enrichi
   ────────────────────────────────────────────────────────────────────── */

function DoctorCard({ doctor, onProfile, onRDV }: { doctor: DoctorFull; onProfile: () => void; onRDV: () => void }) {
  return (
    <div className="relative bg-[#EBE4D8] pt-10 px-8 pb-8 transition-colors">
      {/* Photo cercle supérieur droit */}
      <div className="absolute -top-10 right-6 w-28 h-28 md:-top-12 md:-right-4 md:w-36 md:h-36 rounded-full overflow-hidden shadow-sm z-10 bg-white">
        <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
      </div>

      <div className="pr-32 md:pr-36 min-h-[160px]">
        <p className="text-[#666666] font-medium text-sm md:text-base mb-1">{doctor.establishment}</p>
        <h3 className="text-[#006994] text-[22px] md:text-[28px] mb-4 leading-tight mt-1" style={{ fontFamily: 'Georgia, serif' }}>
          {doctor.name}
        </h3>

        <div className="space-y-1.5 mb-4">
          <span className="block text-[#333333] font-bold text-[15px]">Spécialités</span>
          <p className="text-[#333333] text-[15px] leading-relaxed font-light">
            {doctor.specialties.join(', ')}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#555]">
            <MapPin size={10} className="text-[#006994]" />
            {doctor.location}, {doctor.countryLabel}
          </span>
          {doctor.teleconsultation && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#006994]">
              <Video size={10} />
              Téléconsultation
            </span>
          )}
          {doctor.onlineBooking && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <CalendarCheck size={10} />
              RDV en ligne
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-5 border-t border-[#D0C9BE] flex justify-between items-center">
        <button onClick={onProfile} className="text-[#006994] font-medium text-[15px] hover:text-[#004a6e] transition-colors">
          Voir profil
        </button>
        <button
          onClick={onRDV}
          className="h-9 px-5 bg-[#006994] hover:bg-[#005174] text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          Prendre RDV <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   CARD MOBILE COMPACT — Design original
   ────────────────────────────────────────────────────────────────────── */

function DoctorCardCompact({ doctor, onProfile, onRDV }: { doctor: DoctorFull; onProfile: () => void; onRDV: () => void }) {
  return (
    <div className="relative bg-[#EBE4D8] pt-14 px-4 pb-5">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden shadow-sm z-10 bg-white">
        <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
      </div>

      <div className="text-center">
        <p className="text-[#666666] font-medium text-[10px] mb-0.5 truncate">{doctor.establishment}</p>
        <h3 className="text-[#006994] text-[12px] leading-tight mb-2 font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
          {doctor.name}
        </h3>
        <p className="text-[#555555] text-[10px] leading-snug font-light line-clamp-2">
          {doctor.specialties[0]}
        </p>
        {/* Mini badges */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {doctor.teleconsultation && <Video size={9} className="text-[#006994]" />}
          {doctor.onlineBooking && <CalendarCheck size={9} className="text-emerald-500" />}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#D0C9BE] flex items-center justify-between">
        <button onClick={onProfile} className="text-[#006994] font-medium text-[11px]">Profil</button>
        <button onClick={onRDV} className="h-7 px-3 bg-[#006994] text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
          RDV <ArrowRight size={9} />
        </button>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   MAIN
   ────────────────────────────────────────────────────────────────────── */

export function TopDoctors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [showAll, setShowAll] = useState(false)

  /* ── Modals state ── */
  const [profileDoctor, setProfileDoctor] = useState<DoctorFull | null>(null)
  const [rdvDoctor, setRDVDoctor] = useState<DoctorFull | null>(null)
  const [partenaireModal, setPartenaireModal] = useState(false)
  const [ambassadeurModal, setAmbassadeurModal] = useState(false)

  const filtered = useMemo(() => {
    return DOCTORS.filter(d => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const match = d.name.toLowerCase().includes(q)
          || d.title.toLowerCase().includes(q)
          || d.specialties.some(s => s.toLowerCase().includes(q))
          || d.establishment.toLowerCase().includes(q)
          || d.location.toLowerCase().includes(q)
          || d.countryLabel.toLowerCase().includes(q)
        if (!match) return false
      }
      if (specialtyFilter && d.specialty !== specialtyFilter) return false
      if (countryFilter && d.country !== countryFilter) return false
      if (onlineOnly && !d.onlineBooking) return false
      return true
    })
  }, [searchQuery, specialtyFilter, countryFilter, onlineOnly])

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hasMore = !showAll && filtered.length > INITIAL_VISIBLE
  const hasFilters = searchQuery || specialtyFilter || countryFilter || onlineOnly

  return (
    <section className="bg-white font-sans">

      {/* ── HEADER ── */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1758691463000-08b98131daf3?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Annuaire médecins"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/90 via-[#006994]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002840]/30 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 xl:px-12 w-full pt-8 md:pt-16">
          <h2
            className="text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-medium text-white mb-5 tracking-tight leading-[1.05] drop-shadow-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Annuaire des médecins<br className="hidden md:block" /> partenaires
          </h2>
          <p className="text-white/90 text-base sm:text-lg lg:text-[22px] max-w-2xl font-light leading-relaxed">
            Médecins triés sur le volet pour leur excellence et leur savoir-faire international.
          </p>
        </div>
      </div>

      {/* ── FILTRES ── */}
      <div className="bg-[#F5F5F5] py-5 border-b border-[#E1E1E1]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="sm:col-span-2 relative">
              <input
                type="text"
                placeholder="Rechercher un médecin, spécialité, ville..."
                className="w-full pl-5 pr-12 h-[50px] bg-white border border-[#ddd] text-slate-800 focus:outline-none focus:border-[#006994] transition-colors text-base sm:text-[14px] placeholder:text-slate-400"
                style={{ touchAction: 'manipulation' }}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#006994] w-[18px] h-[18px] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={specialtyFilter}
                onChange={e => setSpecialtyFilter(e.target.value)}
                className="appearance-none w-full h-[50px] bg-white border border-[#ddd] text-slate-800 px-5 pr-10 focus:outline-none focus:border-[#006994] transition-colors cursor-pointer text-base sm:text-[14px]"
              >
                <option value="">Toutes les spécialités</option>
                {ALL_SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4" />
            </div>
            <div className="relative">
              <select
                value={countryFilter}
                onChange={e => setCountryFilter(e.target.value)}
                className="appearance-none w-full h-[50px] bg-white border border-[#ddd] text-slate-800 px-5 pr-10 focus:outline-none focus:border-[#006994] transition-colors cursor-pointer text-base sm:text-[14px]"
              >
                <option value="">Tous les pays</option>
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={onlineOnly}
                onChange={e => setOnlineOnly(e.target.checked)}
                className="w-[18px] h-[18px] accent-[#006994] cursor-pointer"
              />
              <span className="text-[13px] text-slate-700 group-hover:text-[#006994] transition-colors flex items-center gap-1.5">
                <CalendarCheck size={13} className="text-[#006994]" />
                Prise de rendez-vous en ligne uniquement
              </span>
            </label>
            {hasFilters && (
              <button
                onClick={() => { setSearchQuery(''); setSpecialtyFilter(''); setCountryFilter(''); setOnlineOnly(false) }}
                className="text-[11px] font-bold text-[#006994] hover:underline uppercase tracking-wider"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── TÉLÉCONSULTATION NOTICE ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12">
        <div className="mt-8 flex items-start gap-3 border border-[#006994]/15 bg-[#006994]/[0.03] px-5 py-4">
          <Globe size={16} className="text-[#006994] shrink-0 mt-0.5" />
          <p className="text-[12px] text-slate-700 leading-relaxed">
            <strong className="text-[#006994]">Vous résidez hors du Maroc, de la France, de la Tunisie ou de la Turquie ?</strong>
            {' '}Seule la téléconsultation est disponible dans un premier temps. Nos médecins vous accompagnent à distance pour évaluer votre situation.
          </p>
        </div>
      </div>

      {/* ── GRILLE ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 pb-16 pt-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
          {filtered.length} médecin{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length > 0 ? (
          <>
            {/* Desktop */}
            <div className="hidden md:grid md:grid-cols-2 gap-x-12 gap-y-16">
              {visible.map(d => (
                <DoctorCard
                  key={d.id}
                  doctor={d}
                  onProfile={() => setProfileDoctor(d)}
                  onRDV={() => setRDVDoctor(d)}
                />
              ))}
            </div>

            {/* Mobile: 1 grand (Maroc) + 2 compacts en dessous */}
            <div className="md:hidden">
              {(() => {
                // Always show a Moroccan doctor as the featured card
                const moroccanDoctor = filtered.find(d => d.country === 'ma') || filtered[0]
                const otherDoctors = filtered.filter(d => d.id !== moroccanDoctor?.id)
                const mobileCompacts = showAll ? otherDoctors : otherDoctors.slice(0, 2)
                return (
                  <>
                    {moroccanDoctor && (
                      <div className="mb-12">
                        <DoctorCard
                          doctor={moroccanDoctor}
                          onProfile={() => setProfileDoctor(moroccanDoctor)}
                          onRDV={() => setRDVDoctor(moroccanDoctor)}
                        />
                      </div>
                    )}
                    {mobileCompacts.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10 mt-10">
                        {mobileCompacts.map(d => (
                          <DoctorCardCompact
                            key={d.id}
                            doctor={d}
                            onProfile={() => setProfileDoctor(d)}
                            onRDV={() => setRDVDoctor(d)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>

            {hasMore && (
              <div className="mt-16 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="h-12 px-9 bg-[#1a1f24] hover:bg-[#006994] text-white text-[13px] font-bold tracking-wide uppercase transition-all duration-300 inline-flex items-center gap-3"
                >
                  Afficher plus de médecins ({filtered.length - INITIAL_VISIBLE})
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <Search size={32} className="text-slate-200 mx-auto mb-4" />
            <p className="text-[15px] font-bold text-slate-400 mb-1">Aucun médecin trouvé</p>
            <p className="text-[12px] text-slate-400">Modifiez vos filtres ou votre recherche.</p>
          </div>
        )}

        {/* ── PARTENARIAT ── */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold text-[#006994] uppercase tracking-[0.35em] mb-3">Partenariat</p>
            <h3
              className="text-[24px] sm:text-[30px] text-slate-900 leading-snug tracking-tight mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Rejoignez notre réseau d&apos;excellence
            </h3>
            <p className="text-[14px] text-slate-500 max-w-lg mx-auto font-light leading-relaxed">
              Vous êtes un praticien reconnu et souhaitez contribuer au développement de la santé trans-continentale ?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              onClick={() => setPartenaireModal(true)}
              className="w-full sm:w-auto bg-[#006994] hover:bg-[#005174] text-white px-8 h-[50px] text-[12px] font-bold transition-all uppercase tracking-[0.15em] inline-flex items-center justify-center gap-2"
            >
              Devenir Médecin Partenaire <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setAmbassadeurModal(true)}
              className="w-full sm:w-auto border-2 border-[#006994] text-[#006994] hover:bg-[#006994] hover:text-white px-8 h-[50px] text-[12px] font-bold transition-all uppercase tracking-[0.15em] inline-flex items-center justify-center gap-2"
            >
              Devenir Médecin Ambassadeur <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      <DoctorProfileModal
        isOpen={!!profileDoctor}
        onClose={() => setProfileDoctor(null)}
        doctor={profileDoctor}
        onBookRDV={() => { setRDVDoctor(profileDoctor); setProfileDoctor(null) }}
      />

      <DoctorRDVModal
        isOpen={!!rdvDoctor}
        onClose={() => setRDVDoctor(null)}
        doctor={rdvDoctor}
      />

      <PartenaireModal
        isOpen={partenaireModal}
        onClose={() => setPartenaireModal(false)}
      />

      <AmbassadeurModal
        isOpen={ambassadeurModal}
        onClose={() => setAmbassadeurModal(false)}
      />
    </section>
  )
}
