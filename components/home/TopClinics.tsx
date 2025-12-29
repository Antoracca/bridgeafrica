'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle, ArrowRight, Users, TrendingUp, Award, MapPin, Calendar, Sparkles, Shield, Heart, Zap, Activity, Building2, Plane, Globe, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const clinics = [
  {
    id: 1,
    name: 'Clinique Internationale Rabat',
    country: 'Maroc',
    countryCode: 'ma',
    city: 'Rabat',
    specialties: ['Oncologie', 'Cardiologie', 'Orthopédie'],
    rating: 4.9,
    reviews: 847,
    price: '3500',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    patients: '15k',
    successRate: 98,
    experience: 25,
    certifications: ['ISO 9001', 'JCI'],
    featured: true,
  },
  {
    id: 2,
    name: 'Acibadem Hospital',
    country: 'Turquie',
    countryCode: 'tr',
    city: 'Istanbul',
    specialties: ['Greffe Capillaire', 'Esthétique', 'Dentaire'],
    rating: 4.9,
    reviews: 1240,
    price: '2800',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    patients: '20k',
    successRate: 99,
    experience: 18,
    certifications: ['JCI', 'ISO 15189'],
  },
  {
    id: 3,
    name: 'Clinique Pasteur',
    country: 'Tunisie',
    countryCode: 'tn',
    city: 'Tunis',
    specialties: ['Bariatrique', 'Digestif', 'Général'],
    rating: 4.8,
    reviews: 652,
    price: '4200',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    patients: '8k',
    successRate: 96,
    experience: 30,
    certifications: ['ISO 9001'],
  },
  {
    id: 4,
    name: 'Hôpital Américain Paris',
    country: 'France',
    countryCode: 'fr',
    city: 'Paris',
    specialties: ['Neurologie', 'Cardiovasculaire', 'Oncologie'],
    rating: 5.0,
    reviews: 523,
    price: '8500',
    image: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    patients: '12k',
    successRate: 99,
    experience: 40,
    certifications: ['JCI', 'HAS', 'ISO 9001'],
  },
  {
    id: 5,
    name: 'Memorial Hospital',
    country: 'Turquie',
    countryCode: 'tr',
    city: 'Ankara',
    specialties: ['Transplantation', 'Oncologie', 'Cardiologie'],
    rating: 4.9,
    reviews: 891,
    price: '5200',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    patients: '18k',
    successRate: 97,
    experience: 22,
    certifications: ['JCI', 'ISO 15189'],
  },
  {
    id: 6,
    name: 'Clinique Atlas',
    country: 'Maroc',
    countryCode: 'ma',
    city: 'Casablanca',
    specialties: ['Ophtalmologie', 'Laser', 'Chirurgie'],
    rating: 4.7,
    reviews: 435,
    price: '3200',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    patients: '10k',
    successRate: 95,
    experience: 15,
    certifications: ['ISO 9001'],
  },
]

const ClinicCard = ({ clinic, featured = false }: { clinic: typeof clinics[0], featured?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`group relative bg-white rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] overflow-hidden border-2 border-slate-100 hover:border-blue-200 transition-all duration-500 shadow-lg hover:shadow-2xl ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 sm:h-80 md:h-full' : 'h-48 sm:h-56 md:h-64'}`}>
        <Image
          src={clinic.image}
          alt={clinic.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges top */}
        <div className="absolute top-3 xl:top-4 2xl:top-5 left-3 xl:left-4 2xl:left-5 right-3 xl:right-4 2xl:right-5 flex justify-between items-start">
          {/* Badge pays */}
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 rounded-full shadow-lg">
            <Image
              src={`https://flagcdn.com/w40/${clinic.countryCode}.png`}
              alt={clinic.country}
              width={20}
              height={15}
              className="rounded-sm xl:w-6 xl:h-5 2xl:w-7 2xl:h-6"
            />
            <span className="text-xs xl:text-sm 2xl:text-base font-bold text-slate-900">{clinic.country}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 rounded-full shadow-lg">
            <Star className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-slate-900 text-sm xl:text-base 2xl:text-lg">{clinic.rating}</span>
            <span className="text-xs xl:text-sm 2xl:text-base text-slate-600">({clinic.reviews})</span>
          </div>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 xl:top-4 2xl:top-5 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1.5 xl:px-5 xl:py-2 2xl:px-6 2xl:py-2.5 rounded-full text-xs xl:text-sm 2xl:text-base font-bold shadow-xl">
              ⭐ Recommandée
            </div>
          </div>
        )}

        {/* Hover: Bouton consulter */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 rounded-full font-bold shadow-2xl transform scale-90 group-hover:scale-100 transition-transform text-sm xl:text-base 2xl:text-lg">
            Consulter la Clinique
            <ArrowRight className="ml-2 w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-5 md:p-6 xl:p-8 2xl:p-10 ${featured ? 'md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-gradient-to-t md:from-white md:via-white/95 md:to-transparent' : ''}`}>
        {/* Location */}
        <div className="flex items-center gap-1.5 text-blue-600 mb-2 xl:mb-3">
          <MapPin className="w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
          <span className="text-xs xl:text-sm 2xl:text-base font-semibold">{clinic.city}</span>
        </div>

        {/* Nom clinique */}
        <h3 className={`font-extrabold text-slate-900 mb-2 xl:mb-3 2xl:mb-4 group-hover:text-blue-600 transition-colors ${
          featured ? 'text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl' : 'text-lg sm:text-xl md:text-2xl xl:text-2xl 2xl:text-3xl'
        }`}>
          {clinic.name}
        </h3>

        {/* Spécialités */}
        <div className="flex flex-wrap gap-1.5 xl:gap-2 2xl:gap-2.5 mb-3 xl:mb-4 2xl:mb-5">
          {clinic.specialties.slice(0, featured ? 3 : 2).map((spec, i) => (
            <span
              key={i}
              className="px-2 py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 bg-blue-50 text-blue-700 text-[10px] xl:text-xs 2xl:text-sm font-bold rounded-full border border-blue-100"
            >
              {spec}
            </span>
          ))}
          {clinic.specialties.length > (featured ? 3 : 2) && (
            <span className="px-2 py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 bg-slate-50 text-slate-600 text-[10px] xl:text-xs 2xl:text-sm font-bold rounded-full">
              +{clinic.specialties.length - (featured ? 3 : 2)}
            </span>
          )}
        </div>

        {/* Prix */}
        <div className="mb-3 xl:mb-4 2xl:mb-5">
          <div className="flex items-baseline gap-2">
            <span className="text-xs xl:text-sm 2xl:text-base text-slate-500 font-medium">À partir de</span>
            <span className={`font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent ${
              featured ? 'text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl' : 'text-xl sm:text-2xl md:text-3xl xl:text-3xl 2xl:text-4xl'
            }`}>
              {clinic.price}€
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-2 xl:gap-3 2xl:gap-4 mb-3 xl:mb-4 2xl:mb-5 ${featured ? 'md:grid-cols-3' : ''}`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-blue-600" />
            </div>
            <div className={`font-extrabold text-slate-900 ${featured ? 'text-base xl:text-lg 2xl:text-xl' : 'text-sm xl:text-base 2xl:text-lg'}`}>
              {clinic.patients}
            </div>
            <div className="text-[10px] xl:text-xs 2xl:text-sm text-slate-500 font-medium">Patients/an</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
            </div>
            <div className={`font-extrabold text-emerald-600 ${featured ? 'text-base xl:text-lg 2xl:text-xl' : 'text-sm xl:text-base 2xl:text-lg'}`}>
              {clinic.successRate}%
            </div>
            <div className="text-[10px] xl:text-xs 2xl:text-sm text-slate-500 font-medium">Réussite</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-purple-600" />
            </div>
            <div className={`font-extrabold text-slate-900 ${featured ? 'text-base xl:text-lg 2xl:text-xl' : 'text-sm xl:text-base 2xl:text-lg'}`}>
              {clinic.experience} ans
            </div>
            <div className="text-[10px] xl:text-xs 2xl:text-sm text-slate-500 font-medium">Expérience</div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4 mb-3 xl:mb-4">
          {clinic.certifications.map((cert, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-2 py-1 xl:px-3 xl:py-1.5 2xl:px-4 2xl:py-2 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <Award className="w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-emerald-600" />
              <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-emerald-700">{cert}</span>
            </div>
          ))}
        </div>

        {/* Vérifié */}
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
          <span className="text-xs xl:text-sm 2xl:text-base font-semibold">Vérifié par MediBridge</span>
        </div>
      </div>
    </motion.div>
  )
}

export function TopClinics() {
  return (
    <section className="bg-white relative overflow-hidden">
      {/* Bandeau défilant en haut */}
      <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 py-4 md:py-5 xl:py-6 2xl:py-7 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        <motion.div
          className="flex gap-8 md:gap-12 xl:gap-16 2xl:gap-20 whitespace-nowrap relative z-10"
          animate={{ x: [0, -3000] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[
            { icon: Stethoscope, text: 'Plus de 300 Cliniques Certifiées Internationalement' },
            { icon: Heart, text: 'Clinique Internationale Rabat' },
            { flag: 'ma', text: 'Maroc - À partir de 2500€' },
            { icon: Building2, text: 'Acibadem Hospital Istanbul' },
            { icon: TrendingUp, text: 'Greffe Capillaire : 1800€ (vs 8000€ Europe)' },
            { icon: Shield, text: 'Certifications JCI & ISO 9001 Vérifiées' },
            { flag: 'tr', text: 'Turquie - Leader Mondial Esthétique' },
            { icon: Building2, text: 'Memorial Hospital Ankara' },
            { icon: Users, text: '98.7% Satisfaction Patient (4850 avis)' },
            { icon: Heart, text: 'Clinique Pasteur Tunis' },
            { icon: Sparkles, text: 'Chirurgie Bariatrique : Dès 3200€' },
            { flag: 'fr', text: 'France - Excellence Neurologie' },
            { icon: Building2, text: 'Hôpital Américain Paris' },
            { icon: Plane, text: 'Vol + Hôtel 4★ + Transferts Inclus' },
            { icon: Heart, text: 'Clinique Atlas Casablanca' },
            { icon: Zap, text: 'Délai d\'attente : 7-15 jours (vs 6 mois Europe)' },
            { flag: 'tn', text: 'Tunisie - Chirurgie Digestive' },
            { icon: Building2, text: 'Liv Hospital Istanbul' },
            { icon: TrendingUp, text: 'Économisez 60-75% Sans Compromis Qualité' },
            { icon: Shield, text: 'Assurance Rapatriement Médicale Offerte' },
            { icon: Heart, text: 'Clinique Hannibal Tunis' },
            { icon: Sparkles, text: 'Nouveau : Robot Da Vinci Xi Disponible' },
            { flag: 'ae', text: 'Émirats - Technologie de Pointe' },
            { icon: Building2, text: 'American Hospital Dubai' },
            { icon: Plane, text: 'MediBridge Travel - Votre Conciergerie Santé' },
            { icon: Users, text: '52,000+ Patients Accompagnés Depuis 2018' },
            { icon: Heart, text: 'Clinique Internationale Marrakech' },
            { icon: TrendingUp, text: 'Opération Genou : 4500€ (vs 12000€)' },
            { flag: 'de', text: 'Allemagne - Cardiologie Avancée' },
            { icon: Building2, text: 'Charité Hospital Berlin' },
            { icon: Shield, text: 'Prévention : Bilan Santé Complet 250€' },
            { icon: Heart, text: 'Clinique du Lac Tunis' },
            { icon: Sparkles, text: 'Implants Dentaires : 450€/unité (vs 1500€)' },
            { flag: 'it', text: 'Italie - Oncologie & Radiothérapie' },
            { icon: Building2, text: 'Humanitas Research Hospital Milan' },
            { icon: Zap, text: 'Réponse Devis Personnalisé Sous 24h' },
            { icon: Award, text: 'Prix Excellence Médicale 2024 - 15 Cliniques' },
            { icon: Heart, text: 'Clinique Avicenne Marrakech' },
            { flag: 'ch', text: 'Suisse - Orthopédie Premium' },
            { icon: TrendingUp, text: 'Opération Cataracte : 1200€/œil' },
            { icon: Building2, text: 'Medicana International Istanbul' },
            { icon: Plane, text: 'Visa Médical Express : 72h Garanti' },
            { icon: Users, text: 'Interprète Médical Francophone Inclus' },
            { icon: Heart, text: 'Clinique Taoufik Tunis' },
            { icon: Shield, text: 'Garantie Résultat ou Reprise Gratuite' },
            { flag: 'be', text: 'Belgique - Fertilité & PMA' },
            { icon: Building2, text: 'UZ Leuven Hospital' },
            { icon: Sparkles, text: 'FIV : 2800€ (vs 5500€ France)' },
            { icon: TrendingUp, text: 'Bypass Gastrique : 4800€ Tout Compris' },
            { icon: Heart, text: 'Clinique Essalem Rabat' },
            { flag: 'ma', text: 'Maroc - Ophtalmologie Laser' },
            { icon: Plane, text: 'Convalescence Hôtel 5★ + Spa Incluse' },
            { icon: Building2, text: 'Istanbul Surgery Hospital' },
            { icon: Users, text: 'Suivi Post-Op à Distance : 12 Mois Offerts' },
            { icon: Zap, text: 'Chirurgie Sein : 3500€ (Prothèses Mentor/Allergan)' },
            { icon: Heart, text: 'Clinique Moderne Sousse' },
            { flag: 'tn', text: 'Tunisie - Chirurgie Maxillo-Faciale' },
            { icon: Shield, text: 'Dépistage Cancer Gratuit Pour +50 ans' },
            { icon: Building2, text: 'Florence Nightingale Hospital Istanbul' },
            { icon: Sparkles, text: 'Rhinoplastie : 2200€ (Chirurgien Certifié)' },
            { icon: TrendingUp, text: 'Sleeve Gastrectomie : 3800€' },
            { icon: Heart, text: 'Clinique Yasmine Hammamet' },
            { flag: 'tr', text: 'Turquie - Greffe Osseuse Dentaire' },
            { icon: Plane, text: 'Prise en Charge Aéroport 24/7' },
            { icon: Users, text: 'Note Moyenne : 4.8/5 (12,400 avis Google)' },
            { icon: Building2, text: 'Koç University Hospital Istanbul' },
            { icon: Shield, text: 'Couverture Complications Post-Op : 2 Ans' },
            { icon: Heart, text: 'Clinique Les Jasmins Tunis' },
            { icon: Sparkles, text: 'Nouveau : Protonthérapie Cancer Disponible' },
            { flag: 'ae', text: 'Dubaï - Médecine Régénérative' },
            { icon: TrendingUp, text: 'Liposuccion : 2400€ (Haute Définition)' },
            { icon: Building2, text: 'Mediclinic City Hospital Dubai' },
            { icon: Plane, text: 'Package Famille : 2ème Accompagnant Gratuit' },
            { icon: Heart, text: 'Clinique Ibn Sina Rabat' },
            { flag: 'ma', text: 'Maroc - Chirurgie Orthopédique' },
            { icon: Users, text: 'Taux Réussite Prothèse Hanche : 99.2%' },
            { icon: Shield, text: 'Accréditation Ministère Santé : 100% Conformité' },
            { icon: Stethoscope, text: 'Plus de 300 Cliniques Certifiées Internationalement' },
          ].map((item, idx) => (
            <span key={idx} className="text-white font-bold text-sm md:text-base xl:text-lg 2xl:text-xl flex items-center gap-2 md:gap-3">
              {item.icon ? (
                <item.icon className="w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6" />
              ) : item.flag ? (
                <div className="relative w-5 h-4 md:w-6 md:h-5 xl:w-7 xl:h-6 flex-shrink-0">
                  <Image
                    src={`https://flagcdn.com/w40/${item.flag}.png`}
                    alt={item.text}
                    width={28}
                    height={20}
                    className="rounded-sm object-cover"
                  />
                </div>
              ) : (
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 xl:w-2.5 xl:h-2.5 bg-white rounded-full" />
              )}
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Section principale */}
      <div className="py-16 md:py-24 xl:py-28 2xl:py-32 relative">
        {/* Background pattern subtil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Gradient orbs */}
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-12 md:mb-16 xl:mb-20 2xl:mb-24"
        >
          <span className="inline-block px-4 py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-bold tracking-wider uppercase text-xs sm:text-sm xl:text-base 2xl:text-lg rounded-full mb-4 xl:mb-5 2xl:mb-6">
            Excellence Médicale
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-slate-900 mb-4 xl:mb-5 2xl:mb-6">
            Les Meilleures <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">Cliniques Partenaires</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-slate-600 leading-relaxed">
            Plus de 300 établissements d&apos;excellence certifiés et vérifiés à travers le monde
          </p>
        </motion.div>

        {/* Bento Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 xl:gap-6 2xl:gap-8 mb-12 md:mb-16 xl:mb-20">
          {/* Featured clinic - 2 cols x 2 rows */}
          <ClinicCard clinic={clinics[0]} featured={true} />

          {/* Other clinics */}
          {clinics.slice(1).map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>

        {/* Mobile - Stack vertical */}
        <div className="md:hidden space-y-6 mb-8">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <Link href="/cliniques" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-slate-900 text-white px-8 sm:px-10 xl:px-14 2xl:px-16 py-4 sm:py-5 xl:py-6 2xl:py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all group text-base sm:text-lg xl:text-xl 2xl:text-2xl font-bold">
              <span>Voir Toutes les Cliniques (300+)</span>
              <ArrowRight className="ml-3 xl:ml-4 w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>

          <Link href="/register?role=clinique" className="w-full sm:w-auto">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05, y: 0 }}
            >
              <Button variant="outline" className="w-full sm:w-auto rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-4 sm:px-8 sm:py-5 h-auto text-sm sm:text-base font-bold whitespace-normal text-center leading-tight shadow-lg">
                Vous représentez une clinique ? <br className="hidden sm:block md:hidden"/> Devenez partenaire
              </Button>
            </motion.div>
          </Link>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
