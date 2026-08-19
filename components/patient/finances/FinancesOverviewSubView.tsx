"use client"

import Link from "next/link"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { ArrowRight, PlusCircle, HelpCircle, Download } from "lucide-react"
import { BillingSubView } from "./types"

interface Invoice {
  id: string
  reference: string
  description: string
  amount: number
  currency: string
  status: "paid" | "pending" | "due"
  date: string
}

interface Props {
  invoices?: Invoice[]
  onSelectService: (view: BillingSubView) => void
}

export function FinancesOverviewSubView({ invoices = [], onSelectService }: Props) {
  const hasInvoices = invoices && invoices.length > 0
  const totalAmount = invoices.reduce((acc, curr) => acc + curr.amount, 0)
  const paidAmount = invoices.filter(i => i.status === "paid").reduce((acc, curr) => acc + curr.amount, 0)
  const pendingAmount = totalAmount - paidAmount

  const services = [
    {
      key: "medical" as BillingSubView,
      title: "Soins & Actes Hospitaliers",
      desc: "Bloc opératoire, honoraires chirurgicaux, séjour clinique, imagerie et dispositifs médicaux",
      amount: "0 FCFA",
    },
    {
      key: "transport" as BillingSubView,
      title: "Transport & Transferts Médicalisés",
      desc: "Accueil aéroport, navettes résidence-clinique et ambulances conventionnées",
      amount: "0 FCFA",
    },
    {
      key: "accommodation" as BillingSubView,
      title: "Hébergement & Résidences Partenaires",
      desc: "Hôtels 4★/5★, résidences adaptées PMR et formules accompagnants",
      amount: "0 FCFA",
    },
    {
      key: "flights" as BillingSubView,
      title: "Vols & Billetterie Sanitaire",
      desc: "Billets réguliers négociés, assistance au sol PMR et affrètement sanitaire",
      amount: "0 FCFA",
    },
    {
      key: "concierge" as BillingSubView,
      title: "Logistique, Visas & Conciergerie",
      desc: "Facilitation de visa médical, coordinateur référent 24/7 et traduction des bilans",
      amount: "0 FCFA",
    }
  ]

  return (
    <div className="space-y-12">
      {/* En-tête sobre directement sur la page */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="GESTION FINANCIÈRE DES SOINS & FACTURATION" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Compte & Facturation des Soins
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Consultez l'état de vos règlements, la ventilation des devis par prestation en Francs CFA et téléchargez vos justificatifs médicaux.
        </p>
      </div>

      {/* 1. RÉCAPITULATIF FINANCIER SUR FOND GRIS (FCFA) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">Paiements Requis</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#CF4500] tracking-tight mt-3">
            {hasInvoices ? `${pendingAmount.toLocaleString("fr-FR")} FCFA` : "0 FCFA"}
          </span>
          <span className="text-xs text-[#696969] mt-2">Factures en attente</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Factures Émises</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">
            {invoices.length}
          </span>
          <span className="text-xs text-[#696969] mt-2">Documents comptables</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Montants Réglés</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">
            {hasInvoices ? `${paidAmount.toLocaleString("fr-FR")} FCFA` : "0 FCFA"}
          </span>
          <span className="text-xs text-[#696969] mt-2">Paiements acquittés</span>
        </div>

        <div className="bg-[#F4F2EE] border border-[#E2DDD7] rounded-[24px] p-6 flex flex-col justify-between">
          <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">Reste à Charge</span>
          <span className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight mt-3">
            0 FCFA
          </span>
          <span className="text-xs text-[#696969] mt-2">Estimation part patient</span>
        </div>
      </div>

      {/* 2. SECTION POSITIONNÉE AU MILIEU DIRECTEMENT INTÉGRÉE (PAS DANS UNE CARTE) */}
      <div className="py-8 px-4 sm:px-8 border-y border-[#E2DDD7] text-center space-y-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
            Aucune transaction financière en attente
          </h2>
          <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
            Dès émission et validation de votre devis médical par un établissement partenaire, l'ensemble des factures détaillées et reçus de règlement en Francs CFA apparaîtront ici.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <InkPillButton href="/patient?view=new">
            <PlusCircle className="w-4 h-4" />
            <span>Demander un devis de soins</span>
          </InkPillButton>
          <OutlinedPillButton href="/patient/help">
            <HelpCircle className="w-4 h-4" />
            <span>Assistance devis</span>
          </OutlinedPillButton>
        </div>
      </div>

      {/* 3. VENTILATION PAR PRESTATION (DIRECTEMENT INTÉGRÉE SUR LA PAGE, SANS CARTES NI ICÔNES) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-[#E2DDD7]">
          <div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
              Ventilation des Postes de Dépenses
            </h2>
            <p className="text-xs text-[#696969] mt-0.5">
              Sélectionnez une prestation pour afficher le détail complet des actes, estimations et frais associés.
            </p>
          </div>
        </div>

        {/* Liste éditoriale moderne et épurée avec séparateurs fins */}
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
                <div className="text-left sm:text-right">
                  <span className="text-sm sm:text-base font-mono font-bold text-[#141413]">
                    {srv.amount}
                  </span>
                  <span className="text-[11px] text-[#857F78] block sm:inline-block sm:ml-2">
                    Non engagé
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#141413] group-hover:text-[#CF4500] transition-colors">
                  <span>Détail</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Factures réelles si existantes */}
      {hasInvoices && (
        <div className="space-y-4 pt-6 border-t border-[#E2DDD7]">
          <h3 className="text-xl font-medium text-[#141413] tracking-tight">Historique des Factures</h3>
          <div className="divide-y divide-[#E2DDD7]">
            {invoices.map((inv) => (
              <div key={inv.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-[#141413]">{inv.description}</h4>
                  <p className="text-xs text-[#696969] font-mono">Réf : {inv.reference} • Date : {inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono font-bold text-[#141413]">
                    {inv.amount.toLocaleString("fr-FR")} FCFA
                  </span>
                  <button className="w-8 h-8 rounded-full border border-[#E2DDD7] bg-white flex items-center justify-center hover:bg-[#141413] hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
