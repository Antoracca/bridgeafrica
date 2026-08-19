"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { toast } from "sonner"
import { ShieldCheck, Download, Trash2 } from "lucide-react"

export function SettingsClient() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  const [whatsappNotif, setWhatsappNotif] = useState(true)
  const [shareHistory, setShareHistory] = useState(true)

  const handleExportData = () => {
    toast.success("Demande d'exportation reçue", {
      description: "L'archive ZIP sécurisée de vos documents médicaux est en cours de préparation.",
    })
  }

  const handleDeleteAccount = () => {
    toast.error("Action sensible", {
      description: "Veuillez contacter votre coordinateur médical pour initier la suppression définitive de vos données de santé.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 w-full">
      {/* En-tête directement sur le fond de page */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="SÉCURITÉ & PRÉFÉRENCES DU COMPTE" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Paramètres du Compte
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Personnalisez la confidentialité de vos données médicales et vos canaux d'alertes prioritaires.
        </p>
      </div>

      {/* Notifications */}
      <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-xl font-medium text-[#141413] tracking-tight">Alertes & Notifications</h2>
          <p className="text-xs text-[#696969] mt-1">Choisissez les canaux par lesquels vous souhaitez recevoir le suivi de vos dossiers</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-[20px] bg-white border border-[#E2DDD7]">
            <div className="space-y-0.5 pr-4">
              <Label htmlFor="email-notifications" className="text-xs font-semibold text-[#141413]">Notifications par Courriel</Label>
              <p className="text-[11px] text-[#696969]">
                Recevoir les alertes d'avancement de dossier et devis par courriel chiffré.
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotif} 
              onCheckedChange={(val) => {
                setEmailNotif(val)
                toast.success("Préférence enregistrée")
              }} 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-[20px] bg-white border border-[#E2DDD7]">
            <div className="space-y-0.5 pr-4">
              <Label htmlFor="sms-notifications" className="text-xs font-semibold text-[#141413]">Alertes SMS Critiques</Label>
              <p className="text-[11px] text-[#696969]">
                Réception de SMS pour les confirmations de vol médicalisé ou d'admission d'urgence.
              </p>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={smsNotif} 
              onCheckedChange={(val) => {
                setSmsNotif(val)
                toast.success("Préférence enregistrée")
              }} 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-[20px] bg-white border border-[#E2DDD7]">
            <div className="space-y-0.5 pr-4">
              <Label htmlFor="whatsapp-notifications" className="text-xs font-semibold text-[#141413]">Canal WhatsApp Sécurisé</Label>
              <p className="text-[11px] text-[#696969]">
                Mises à jour instantanées via votre coordinateur de soins dédié.
              </p>
            </div>
            <Switch 
              id="whatsapp-notifications" 
              checked={whatsappNotif} 
              onCheckedChange={(val) => {
                setWhatsappNotif(val)
                toast.success("Préférence enregistrée")
              }} 
            />
          </div>
        </div>
      </div>

      {/* Confidentialité */}
      <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-xl font-medium text-[#141413] tracking-tight">Confidentialité Médicale & Secret Professionnel</h2>
          <p className="text-xs text-[#696969] mt-1">Gestion des accès à vos dossiers cliniques</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-[20px] bg-white border border-[#E2DDD7]">
            <div className="space-y-0.5 pr-4">
              <Label htmlFor="share-medical-history" className="text-xs font-semibold text-[#141413]">Partage d'antécédents avec les praticiens référents</Label>
              <p className="text-[11px] text-[#696969]">
                Permet aux médecins agréés d'accéder à l'historique lors d'une prise en charge.
              </p>
            </div>
            <Switch 
              id="share-medical-history" 
              checked={shareHistory} 
              onCheckedChange={(val) => {
                setShareHistory(val)
                toast.success("Préférence enregistrée")
              }} 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-[20px] bg-white border border-[#E2DDD7]">
            <div className="space-y-0.5 pr-4">
              <Label htmlFor="two-factor" className="text-xs font-semibold text-[#141413]">Double Authentification (2FA HDS)</Label>
              <p className="text-[11px] text-[#696969]">
                Code de sécurité temporaire à chaque connexion (Actif par défaut sur votre compte).
              </p>
            </div>
            <Switch id="two-factor" checked={true} disabled />
          </div>
        </div>
      </div>

      {/* Langue & Fuseau */}
      <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-8 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-xl font-medium text-[#141413] tracking-tight">Langue & Fuseau Régional</h2>
          <p className="text-xs text-[#696969] mt-1">Paramètres d'affichage régional</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-[20px] bg-white border border-[#E2DDD7] space-y-1">
            <p className="text-[10px] font-mono font-bold text-[#857F78] uppercase">Langue de l'interface</p>
            <p className="font-semibold text-xs text-[#141413]">Français (International)</p>
          </div>
          <div className="p-4 rounded-[20px] bg-white border border-[#E2DDD7] space-y-1">
            <p className="text-[10px] font-mono font-bold text-[#857F78] uppercase">Fuseau Horaire Référent</p>
            <p className="font-semibold text-xs text-[#141413]">UTC+1 (Afrique Centrale / Ouest)</p>
          </div>
        </div>
      </div>

      {/* Données & Clôture */}
      <div className="bg-[#FCFBFA] rounded-[32px] border border-[#E2DDD7] p-8 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-xl font-medium text-[#141413] tracking-tight">Export & Gestion des Données</h2>
          <p className="text-xs text-[#696969] mt-1">Conformité RGPD et droit à l'effacement</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <OutlinedPillButton onClick={handleExportData} className="py-2.5 px-5 text-xs">
            <Download className="w-4 h-4" />
            <span>Exporter mes archives médicales (ZIP)</span>
          </OutlinedPillButton>
          <button 
            onClick={handleDeleteAccount}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[20px] bg-red-50 text-red-600 text-xs font-semibold border border-red-200 hover:bg-red-100 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Supprimer mon compte patient</span>
          </button>
        </div>
      </div>
    </div>
  )
}
