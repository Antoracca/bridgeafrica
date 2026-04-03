'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ChevronDown, Download, ArrowRight, Video } from 'lucide-react'

// Utilisation des mêmes docteurs mais adaptés aux données SMN
const doctors = [
  {
    id: '1',
    name: 'Dr méd. Mehmet Özkan',
    title: 'Chirurgien Cardiovasculaire',
    specialties: ['Cardiologie Interventionnelle', 'Chirurgie robotique'],
    location: 'Istanbul',
    establishment: 'Acibadem Hospital',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Dr méd. Sarah Benali',
    title: 'Neurochirurgienne',
    specialties: ['Neurologie & Spine', 'Microchirurgie'],
    location: 'Rabat',
    establishment: 'Clinique Dar Salam',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Dr méd. Jean-Pierre Moreau',
    title: 'Oncologue Médical',
    specialties: ['Oncologie', 'Radiothérapie'],
    location: 'Paris',
    establishment: 'Institut Curie',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Dr méd. Fatima El Amrani',
    title: 'Chirurgienne Bariatrique',
    specialties: ['Chirurgie de l\'Obésité', 'Mini-invasive'],
    location: 'Tunis',
    establishment: 'Clinique Pasteur',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '5',
    name: 'Dr méd. Alexander Volkov',
    title: 'Orthopédiste Sportif',
    specialties: ['Orthopédie & Traumatologie', 'Médecine du sport'],
    location: 'Ankara',
    establishment: 'Medicana International',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '6',
    name: 'Dr méd. Amina Ould Hassan',
    title: 'Ophtalmologue Laser',
    specialties: ['Ophtalmologie', 'Chirurgie Réfractive'],
    location: 'Casablanca',
    establishment: 'Clinique Vinci Maroc',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]

export function TopDoctors() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="bg-white font-sans">
      
      {/* NOUVEAU HEADER CREATIF AVEC IMAGE DE FOND */}
      <div className="relative w-full h-[350px] md:h-[450px] flex items-center overflow-hidden">
        {/* L'image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1758691463000-08b98131daf3?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Annuaire médecins partenaires"
            fill
            className="object-cover object-[center_35%]"
            priority
          />
          {/* Effet nuances : degrade horizontal du "#006994" vers transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/90 via-[#006994]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002840]/30 to-transparent z-10" />
        </div>

        {/* Le Contenu Textuel en blanc projeté */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 xl:px-12 w-full pt-8 md:pt-16">
          <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-medium text-white mb-6 tracking-tight leading-[1.05] drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Annuaire des médecins <br className="hidden md:block" /> partenaires
          </h2>
          <p className="text-white/95 text-lg lg:text-[22px] max-w-2xl font-light drop-shadow-md leading-relaxed">
            Découvrez nos médecins indépendants et cliniciens, triés sur le volet pour leur excellence médicale et leur savoir-faire international.
          </p>
        </div>
      </div>

      {/* Zone de filtres exact SMN Style - Fond Gris Pâle Beige */}
      <div className="bg-[#F5F5F5] py-6 border-b border-[#E1E1E1]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Input Search */}
            <div className="md:col-span-2 relative">
              <input 
                type="text" 
                placeholder="Vous cherchez un médecin ?" 
                className="w-full pl-5 pr-12 h-[54px] bg-transparent border border-[#CCCCCC] text-[#333333] focus:outline-none focus:border-[#006994] transition-colors rounded-none placeholder:text-[#666666] text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#006994] w-5 h-5 pointer-events-none" />
            </div>

            {/* Selects */}
            <div className="relative">
              <select className="appearance-none w-full h-[54px] bg-transparent border border-[#CCCCCC] text-[#006994] px-5 pr-10 focus:outline-none focus:border-[#006994] transition-colors rounded-none cursor-pointer text-base bg-no-repeat">
                <option value="">Choisissez une spécialité</option>
                <option value="cardio">Cardiologie</option>
                <option value="neuro">Neurologie</option>
                <option value="onco">Oncologie</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#006994] pointer-events-none w-5 h-5" />
            </div>

            <div className="relative">
              <select className="appearance-none w-full h-[54px] bg-transparent border border-[#CCCCCC] text-[#006994] px-5 pr-10 focus:outline-none focus:border-[#006994] transition-colors rounded-none cursor-pointer text-base">
                <option value="">Hôpital/clinique</option>
                <option value="pasteur">Clinique Pasteur</option>
                <option value="acibadem">Acibadem Hospital</option>
                <option value="curie">Institut Curie</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#006994] pointer-events-none w-5 h-5" />
            </div>

            <div className="relative">
              <select className="appearance-none w-full h-[54px] bg-transparent border border-[#CCCCCC] text-[#006994] px-5 pr-10 focus:outline-none focus:border-[#006994] transition-colors rounded-none cursor-pointer text-base">
                 <option value="">Choisir un pays</option>
                 <option value="ma">Maroc</option>
                 <option value="tn">Tunisie</option>
                 <option value="tr">Turquie</option>
                 <option value="fr">France</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#006994] pointer-events-none w-5 h-5" />
            </div>

          </div>
          
          <div className="mt-5 flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                id="online_booking" 
                className="peer appearance-none w-[22px] h-[22px] border border-[#CCCCCC] checked:bg-[#006994] checked:border-[#006994] bg-transparent rounded-none cursor-pointer transition-colors" 
              />
              <svg className="absolute w-[14px] h-[14px] text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label htmlFor="online_booking" className="text-[#333333] cursor-pointer text-base">
              Prise de rendez-vous en ligne
            </label>
          </div>
        </div>
      </div>

      {/* Ligne Alphabétique Absolument retirée selon votre consigne (NON) */}

      {/* Grille des Médecins */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-12 pb-16 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="relative bg-[#EBE4D8] pt-10 px-8 pb-8 rounded-none transition-colors">
              
              {/* Photo Cercle Supérieur Droit - Modèle ultra fidèle SMN */}
              <div className="absolute -top-10 right-6 w-28 h-28 lg:-top-12 lg:-right-4 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-sm z-10 bg-white">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Informations du Médecin */}
              <div className="pr-32 lg:pr-36 min-h-[160px]">
                <p className="text-[#666666] font-medium text-sm lg:text-base mb-1">{doctor.establishment}</p>
                <h3 className="text-[#006994] text-[22px] lg:text-[28px] mb-6 leading-tight mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {doctor.name}
                </h3>
                
                <div className="space-y-1.5">
                  <span className="block text-[#333333] font-bold text-[15px]">Spécialités</span>
                  <p className="text-[#333333] text-[15px] leading-relaxed font-light">
                    {doctor.specialties.join(', ')}
                  </p>
                </div>
              </div>

              {/* Footer de la carte avec liseré distinct SMN */}
              <div className="mt-8 pt-5 border-t border-[#D0C9BE] flex justify-between items-center">
                <Link href={`/medecin/${doctor.id}`} className="text-[#006994] font-medium text-[15px] hover:text-[#004a6e] transition-colors">
                  Voir profil
                </Link>
                <button aria-label="Télécharger VCard" className="text-[#006994] hover:opacity-75 transition-opacity px-2">
                  {/* Icone vcard simulant SMN */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                     <circle cx="9" cy="7" r="4"></circle>
                     <polyline points="16 11 18 13 22 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton "Voir plus" (Reproduction exacte) */}
        <div className="mt-20 text-center flex justify-center">
           <button className="bg-[#006994] hover:bg-[#005174] text-white px-8 h-12 text-[15px] inline-flex items-center gap-4 transition-colors rounded-none font-medium">
             Afficher plus de médecins
             <ArrowRight size={18} strokeWidth={1.5} />
           </button>
        </div>

        {/* Sections Partenaires - Double boutons en bas (Demande User) */}
        <div className="mt-32 pt-16 border-t border-[#E1E1E1]">
           <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-[32px] text-[#006994] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                 Rejoignez notre réseau d'excellence
              </h3>
              <p className="text-[#333333] max-w-2xl mx-auto font-light text-lg">
                 Vous êtes un praticien reconnu pour votre excellence et souhaitez contribuer au développement de la santé trans-continentale ?
              </p>
           </div>
           
           {/* Les deux bouttons demandés */}
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
              <Link href="/partenaire/medecin" className="w-full sm:w-auto">
                 <button className="w-full sm:w-auto bg-[#006994] hover:bg-[#005174] text-white px-8 h-[52px] text-[14px] font-medium transition-all rounded-none uppercase tracking-wide">
                    Devenir Médecin Partenaire
                 </button>
              </Link>
              <Link href="/partenaire/ambassadeur" className="w-full sm:w-auto">
                 <button className="w-full sm:w-auto bg-transparent border border-[#006994] text-[#006994] hover:bg-[#006994] hover:text-white px-8 h-[52px] text-[14px] font-medium transition-all rounded-none uppercase tracking-wide">
                    Devenir Médecin Ambassadeur
                 </button>
              </Link>
           </div>
        </div>

      </div>
    </section>
  )
}
