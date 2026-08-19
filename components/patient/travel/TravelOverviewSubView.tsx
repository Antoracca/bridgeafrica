"use client"

import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { ArrowRight, PlusCircle, HelpCircle } from "lucide-react"
import { TravelLogisticsPackage, TravelSubView } from "./types"

interface Props {
  logistics?: TravelLogisticsPackage
  onSelectService: (view: TravelSubView) => void
}

export function TravelOverviewSubView({ logistics, onSelectService }: Props) {
  const isEngaged = logistics?.isEngaged || false

  const services = [
    {
      key: "flights" as TravelSubView,
      title: "Billetterie & Vols Médicalisés",
      desc: "Vols réguliers négociés, synchronisation avec vos dates d'intervention et assistance au sol",
      status: logistics?.flight?.isEngaged ? "Engagé" : "Non engagé",
    },
    {
      key: "visas" as TravelSubView,
      title: "Visas Médicaux & Formalités Consulaires",
      desc: "Lettre d'invitation officielle de la clinique partenaire et facilitation consulaire express",
      status: logistics?.visa?.isEngaged ? "Engagé" : "Non engagé",
    },
    {
      key: "accommodation" as TravelSubView,
      title: "Hébergement & Résidences Partenaires",
      desc: "Hôtels 4★/5★ et résidences PMR à proximité immédiate des établissements de santé",
      status: logistics?.accommodation?.isEngaged ? "Engagé" : "Non engagé",
    },
    {
      key: "transfers" as TravelSubView,
      title: "Transport & Transferts sur Place",
      desc: "Accueil aéroport personnalisé, navettes hôtel-clinique quotidiennes et ambulances",
      status: logistics?.transfer?.isEngaged ? "Engagé" : "Non engagé",
    }
  ]

  return (
    <div className="space-y-12">
      {/* En-tête directement sur le fond de page */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="CONCIERGERIE DE SÉJOUR & LOGISTIQUE" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Voyage & Logistique des Soins
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Supervisez l'organisation de vos déplacements médicaux : billetterie, formalités consulaires, hébergement et transferts dédiés.
        </p>
      </div>

      {/* 1. RÉCAPITULATIF LOGISTIQUE SUR FOND GRIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Voyages Engagés</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">
            {isEngaged ? "1" : "0"}
          </span>
          <span className="text-xs text-[#696969] mt-2">Séjours programmés</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Billetterie Vols</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">
            {logistics?.flight?.isEngaged ? "Confirmé" : "Non engagé"}
          </span>
          <span className="text-xs text-[#696969] mt-2">Liaisons aériennes</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Hôtel & Résidence</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">
            {logistics?.accommodation?.isEngaged ? "Réservé" : "Non engagé"}
          </span>
          <span className="text-xs text-[#696969] mt-2">Convalescence</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Transferts sur Place</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">
            {logistics?.transfer?.isEngaged ? "Planifié" : "Non engagé"}
          </span>
          <span className="text-xs text-[#696969] mt-2">Chauffeurs & Véhicules</span>
        </div>
      </div>

      {/* 2. SECTION POSITIONNÉE AU MILIEU DIRECTEMENT INTÉGRÉE */}
      <div className="py-8 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
            {isEngaged ? "Séjour Médical en Cours de Coordination" : "Aucun voyage médical engagé pour le moment"}
          </h2>
          <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
            {isEngaged 
              ? "Votre coordinateur de séjour finalise vos réservations et vos documents consulaires."
              : "Dès validation de votre devis de soins, notre pôle logistique organise l'ensemble de votre itinéraire : billets d'avion, visa médical, hébergement adapté et chauffeurs privés."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <InkPillButton href="/patient?view=new">
            <PlusCircle className="w-4 h-4" />
            <span>Initier une demande de soins</span>
          </InkPillButton>
          <OutlinedPillButton href="/patient?view=messages">
            <HelpCircle className="w-4 h-4" />
            <span>Contacter mon coordinateur</span>
          </OutlinedPillButton>
        </div>
      </div>

      {/* 3. VENTILATION DES SERVICES LOGISTIQUES DIRECTEMENT SUR LA PAGE */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-[#E2DDD7]">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Prestations Logistiques de Séjour
            </h2>
            <p className="text-xs text-[#696969] mt-0.5">
              Sélectionnez une prestation pour afficher les détails, les horaires et les démarches associées.
            </p>
          </div>
        </div>

        {/* Liste éditoriale moderne et épurée sans icônes superflues */}
        <div className="divide-y divide-[#E2DDD7]">
          {services.map((srv) => (
            <div
              key={srv.key}
              onClick={() => onSelectService(srv.key)}
              className="py-5 px-4 sm:px-6 hover:bg-[#F4F2EE] rounded-[20px] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1 min-w-0 pr-4">
                <h3 className="font-semibold text-base text-[#141413] group-hover:text-[#CF4500] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#696969] leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2DDD7]/50">
                <span className="text-xs font-mono font-medium uppercase px-3 py-1 rounded-full bg-[#F4F2EE] text-[#857F78]">
                  {srv.status}
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#141413] group-hover:text-[#CF4500] transition-colors">
                  <span>Détail</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
