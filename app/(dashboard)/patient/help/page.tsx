import { Metadata } from "next"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Centre d'Aide | Pont Afrique Santé",
  description: "Assistance et réponses à vos questions.",
}

const faqs = [
  {
    category: "Parcours de Soins & Dossier",
    questions: [
      {
        question: "Comment est analysé mon dossier médical ?",
        answer: "Dès votre soumission, notre collège de médecins référents examine vos pièces médicales (rapports, scanners DICOM) sous 24 heures et sollicite nos cliniques partenaires spécialisées."
      },
      {
        question: "Qui a accès à mes données médicales ?",
        answer: "Seuls les médecins régulateurs accrédités et l'équipe médicale de la clinique de destination ont accès à votre dossier. L'hébergement respecte scrupuleusement les normes HDS (Hébergement de Données de Santé)."
      },
      {
        question: "Comment ajouter des examens complémentaires à un dossier existant ?",
        answer: "Rendez-vous dans la rubrique 'Mes Dossiers', sélectionnez votre dossier et utilisez l'onglet 'Documents' pour téléverser de nouveaux éléments (PDF, DICOM, JPG)."
      }
    ]
  },
  {
    category: "Devis & Facturation des Soins",
    questions: [
      {
        question: "Comment sont établis les devis médicaux ?",
        answer: "Chaque devis est calculé sur mesure par l'établissement hospitalier après examen de votre dossier clinique par nos praticiens partenaires, incluant les actes chirurgicaux, le séjour et les soins post-opératoires."
      },
      {
        question: "Puis-je obtenir une facture acquittée pour mon assurance ?",
        answer: "Oui. Toutes les factures détaillées et attestations de prise en charge sont téléchargeables au format PDF certifié depuis votre onglet 'Comptes & Facturation des Soins'."
      }
    ]
  },
  {
    category: "Logistique & Voyage Médical",
    questions: [
      {
        question: "Comment s'organise l'obtention du visa médical ?",
        answer: "Dès validation du devis, Pont Afrique Santé émet une lettre d'invitation médicale officielle adressée au consulat du pays de destination (Tunisie, Turquie, Maroc, France, Espagne) pour accélérer la délivrance prioritaire du visa."
      },
      {
        question: "La prise en charge comprend-elle les transferts aéroport ?",
        answer: "Selon la formule retenue, une ambulance médicalisée ou un véhicule privé avec chauffeur dédié vous accueille dès l'atterrissage pour vous conduire directement à la clinique ou à votre résidence hôtelière partenaire."
      }
    ]
  }
]

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 w-full">
      {/* Header Mastercard */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="• SUPPORT CLINIQUE & FOIRE AUX QUESTIONS" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Centre d'Aide & Assistance
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Consultez nos guides protocolaires ou échangez en direct avec votre équipe de coordination médicale.
        </p>
      </div>

      {/* Cartes de contact direct Mastercard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 rounded-full bg-[#F3F0EE] flex items-center justify-center text-[#141413]">
            <MessageCircle className="w-5 h-5 text-[#CF4500]" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#141413]">Messagerie HDS</h3>
            <p className="text-[#696969] text-xs mt-0.5">Échangez avec votre coordinateur</p>
          </div>
          <OutlinedPillButton href="/patient?view=messages" className="w-full py-2 text-xs">
            <span>Ouvrir le chat</span>
          </OutlinedPillButton>
        </div>

        <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 rounded-full bg-[#F3F0EE] flex items-center justify-center text-[#141413]">
            <Mail className="w-5 h-5 text-[#CF4500]" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#141413]">Pôle Médical</h3>
            <p className="text-[#696969] text-xs mt-0.5">contact@pontafriquesante.com</p>
          </div>
          <OutlinedPillButton href="mailto:contact@pontafriquesante.com" className="w-full py-2 text-xs">
            <span>Envoyer un email</span>
          </OutlinedPillButton>
        </div>

        <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-6 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="w-10 h-10 rounded-full bg-[#F3F0EE] flex items-center justify-center text-[#141413]">
            <Phone className="w-5 h-5 text-[#CF4500]" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#141413]">Régulation SOS</h3>
            <p className="text-[#696969] text-xs mt-0.5">24h/24 & 7j/7</p>
          </div>
          <OutlinedPillButton href="tel:+33189710000" className="w-full py-2 text-xs">
            <span>Appel d'Urgence</span>
          </OutlinedPillButton>
        </div>
      </div>

      {/* FAQ Accordion Mastercard */}
      <div className="bg-[#FCFBFA] rounded-[40px] border border-[#E2DDD7] p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-2xl font-medium text-[#141413] tracking-tight">Foire aux Questions Médicales</h2>
          <p className="text-xs text-[#696969] mt-1">Tout comprendre sur le déroulement de votre prise en charge hospitalière</p>
        </div>

        <div className="space-y-6">
          {faqs.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">• {cat.category}</h3>
              <Accordion type="single" collapsible className="w-full space-y-2.5">
                {cat.questions.map((q, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border border-[#E2DDD7] bg-white rounded-[20px] px-5 data-[state=open]:bg-[#F3F0EE]/50">
                    <AccordionTrigger className="text-left text-xs sm:text-sm font-medium text-[#141413] py-4 hover:no-underline">
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-[#696969] leading-relaxed pb-4">
                      {q.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Assistance Card Mastercard Stadium */}
      <div className="bg-[#141413] text-[#F3F0EE] rounded-[40px] p-8 sm:p-10 space-y-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="space-y-1">
          <h3 className="font-medium text-xl tracking-tight text-white">Une situation médicale particulière ?</h3>
          <p className="text-xs text-[#D1CDC7] max-w-md leading-relaxed">
            Nos coordinateurs médicaux répondent à vos demandes spécifiques sous 2 heures ouvrées.
          </p>
        </div>

        <InkPillButton href="/patient?view=messages" className="bg-white text-[#141413] hover:bg-[#F4F2EE] border-white font-semibold shrink-0">
          <span className="text-[#141413]">Écrire à un coordinateur</span>
        </InkPillButton>
      </div>
    </div>
  )
}


