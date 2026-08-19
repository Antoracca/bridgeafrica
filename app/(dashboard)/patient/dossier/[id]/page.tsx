import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Stethoscope,
  Paperclip,
  ShieldCheck,
  ArrowUpRight,
  Lock,
  ChevronRight
} from "lucide-react"

import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Détail Dossier | Pont Afrique Santé",
  description: "Suivi clinique et coordination de votre dossier médical.",
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Récupérer les données du dossier
  const { data: caseData, error } = await supabase
    .from('medical_cases')
    .select(`
        *,
        doctor:referent_doctor_id (first_name, last_name, specialty),
        clinic:assigned_clinic_id (clinic_name, clinic_address)
    `)
    .eq('id', id)
    .single<any>()

  if (error || !caseData) {
    return notFound()
  }

  // Récupérer le devis (si présent)
  const { data: quote } = await supabase
    .from('quotes')
    .select('*')
    .eq('case_id', id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single<any>()

  const formattedDate = new Date(caseData.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  return (
    <div className="max-w-7xl mx-auto space-y-10 w-full">
      {/* Navigation & Header Mastercard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-4">
          <Link 
            href="/patient?view=dossiers"
            className="w-11 h-11 rounded-full border border-[#E2DDD7] bg-white flex items-center justify-center text-[#141413] hover:bg-[#141413] hover:text-white transition-all shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#696969]">#{caseData.id.slice(0, 8)}</span>
              <span className="px-3 py-0.5 rounded-full bg-[#141413] text-[#F3F0EE] text-[10px] font-mono font-bold">
                {caseData.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#141413] tracking-tight">{caseData.diagnosis}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <OutlinedPillButton href="/patient?view=messages">
            <MessageSquare className="w-4 h-4" />
            <span>Contacter le Coordinateur</span>
          </OutlinedPillButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne Principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Étape / Avancement Stadium Frame */}
          <div className="bg-[#FCFBFA] rounded-[40px] border border-[#E2DDD7] p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD7]">
              <h2 className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">• ÉTAPES DU PROTOCOLE CLINIQUE</h2>
              <span className="text-xs text-[#696969] font-mono">
                Déposé le {formattedDate}
              </span>
            </div>

            <div className="relative border-l-2 border-[#E2DDD7] ml-3 space-y-6 pl-6 pb-1">
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full bg-[#141413] ring-4 ring-[#FCFBFA]" />
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-[#141413]">Dépôt du bilan médical initial</p>
                  <p className="text-[11px] text-[#696969] font-mono">{formattedDate}</p>
                </div>
              </div>

              <div className="relative">
                <span className={`absolute -left-[31px] top-0.5 h-4 w-4 rounded-full ring-4 ring-[#FCFBFA] ${['under_review', 'approved', 'quote_sent', 'quote_accepted', 'completed'].includes(caseData.status) ? 'bg-[#CF4500]' : 'bg-[#E2DDD7]'}`} />
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-[#141413]">Audit & Évaluation collégiale</p>
                  <p className="text-[11px] text-[#696969]">Examen par le collège de praticiens référents</p>
                </div>
              </div>

              <div className="relative">
                <span className={`absolute -left-[31px] top-0.5 h-4 w-4 rounded-full ring-4 ring-[#FCFBFA] ${['quote_sent', 'quote_accepted', 'completed'].includes(caseData.status) ? 'bg-[#141413]' : 'bg-[#E2DDD7]'}`} />
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-[#141413]">Émission des devis cliniques & Facturation</p>
                  <p className="text-[11px] text-[#696969]">Validation du plan hospitalier et propositions tarifaires</p>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé clinique & Pièces jointes */}
          <div className="bg-[#FCFBFA] rounded-[40px] border border-[#E2DDD7] p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h3 className="text-2xl font-medium text-[#141413] tracking-tight">Résumé Clinique du Patient</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-[24px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#696969] uppercase tracking-wider">Spécialité Requise</span>
                <p className="font-medium text-[#141413] text-sm">{caseData.required_specialty}</p>
              </div>

              <div className="p-5 rounded-[24px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#CF4500] uppercase tracking-wider">Degré d'Urgence</span>
                <p className="font-bold text-[#141413] text-sm capitalize">{caseData.urgency_level || "Standard"}</p>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#696969] uppercase tracking-wider">Détails Cliniques & Symptômes Déclarés</span>
              <p className="text-xs text-[#141413] leading-relaxed whitespace-pre-wrap">
                {caseData.symptoms || "Aucun symptôme supplémentaire renseigné."}
              </p>
            </div>
          </div>
        </div>

        {/* Colonne Latérale */}
        <div className="space-y-8">
          {/* Devis / Proposition Financière Mastercard */}
          {quote && quote.created_at ? (
            <div className="bg-[#141413] text-[#F3F0EE] rounded-[40px] p-8 space-y-6 shadow-xl border border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#D1CDC7] uppercase tracking-wider">DEVIS CLINIQUE FERME</span>
                <div className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                  {quote.total_cost} {quote.currency}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-[#D1CDC7]">
                <p className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Prestations Incluses</p>
                <p className="text-xs leading-relaxed">{quote.treatment_description}</p>
              </div>

              <InkPillButton href="/patient?view=finances" className="w-full bg-[#F3F0EE] text-[#141413] hover:bg-white border-transparent">
                <span>Valider & Consulter le Devis</span>
                <ArrowUpRight className="w-4 h-4" />
              </InkPillButton>
            </div>
          ) : (
            <div className="bg-[#FCFBFA] rounded-[40px] border border-[#E2DDD7] p-8 space-y-4 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-full bg-[#F3F0EE] flex items-center justify-center mx-auto text-[#141413]">
                <Clock className="w-6 h-6 text-[#CF4500]" />
              </div>
              <div>
                <h4 className="font-medium text-[#141413] text-base">Audit médical en cours</h4>
                <p className="text-xs text-[#696969] mt-1.5 leading-relaxed">
                  Nos chirurgiens et cliniques partenaires étudient vos examens. Le devis tout-inclus sera émis sous 24 heures.
                </p>
              </div>
            </div>
          )}

          {/* Intervenants Médicaux */}
          <div className="bg-[#FCFBFA] rounded-[40px] border border-[#E2DDD7] p-8 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h3 className="text-xs font-bold text-[#696969] uppercase tracking-wider">Équipe Médicale Référente</h3>

            {caseData.doctor ? (
              <div className="flex items-center gap-3.5 p-4 rounded-[20px] bg-white border border-[#E2DDD7]">
                <div className="w-10 h-10 rounded-full bg-[#141413] text-[#F3F0EE] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-[#F37338]" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-xs text-[#141413]">Dr. {caseData.doctor.first_name} {caseData.doctor.last_name}</p>
                  <p className="text-[11px] text-[#696969]">{caseData.doctor.specialty || "Praticien Référent"}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-[20px] bg-white border border-[#E2DDD7] text-center text-xs text-[#696969]">
                Attribution du collège de praticiens en cours.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
