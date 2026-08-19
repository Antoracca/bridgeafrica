"use client"

import React, { useState } from "react"
import { QrCode, ShieldAlert, PhoneCall, HeartPulse, User, Download, Check } from "lucide-react"
import { InkPillButton, OutlinedPillButton, EyebrowDot } from "@/components/ui/mastercard-design"

interface EmergencyQRPackProps {
  patientName: string
  bloodGroup?: string
  allergies?: string
  emergencyContact?: string
  hdsRef?: string
}

export function EmergencyQRPack({
  patientName = "PATIENT PONT AFRIQUE SANTÉ",
  bloodGroup = "O+",
  allergies = "Pénicilline (Signalé)",
  emergencyContact = "+241 77 00 00 00 (Famille / Référent)",
  hdsRef = "HDS-SOS-2026-99"
}: EmergencyQRPackProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`FICHE URGENCE PONT AFRIQUE SANTÉ: ${patientName} | Groupe: ${bloodGroup} | Allergies: ${allergies} | Contact: ${emergencyContact} | Ref HDS: ${hdsRef}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-6 sm:p-10 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-[#E2DDD7]">
        <div className="space-y-1">
          <EyebrowDot text="• PROTOCOLE SOS & ÉVACUATION SANITAIRE" />
          <h3 className="text-2xl sm:text-3xl font-medium text-[#141413] tracking-tight">
            Passeport d'Urgence Médicale
          </h3>
          <p className="text-xs sm:text-sm text-[#696969]">
            Fiche réflexe sécurisée accessible par les équipes d'évacuation sanitaire et les urgentistes à l'atterrissage.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#141413] hover:text-[#CF4500] px-4 py-2 rounded-full border border-[#E2DDD7] bg-white transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
          <span>{copied ? "Fiche Copiée !" : "Copier la Fiche Urgence"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Données Médicales Clés */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-[20px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#696969]">Patient Référencé</span>
            <p className="font-bold text-sm text-[#141413] uppercase">{patientName}</p>
          </div>

          <div className="p-4 rounded-[20px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#CF4500]">Groupe Sanguin</span>
            <p className="font-black text-lg text-[#141413]">{bloodGroup}</p>
          </div>

          <div className="p-4 rounded-[20px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#696969]">Allergies & Contre-indications</span>
            <p className="font-medium text-xs text-[#141413]">{allergies}</p>
          </div>

          <div className="p-4 rounded-[20px] bg-[#F3F0EE] border border-[#E2DDD7] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-[#696969]">Contact d'Urgence Déclaré</span>
            <p className="font-mono text-xs text-[#141413] font-bold">{emergencyContact}</p>
          </div>
        </div>

        {/* QR Code Vectoriel Mockup */}
        <div className="md:col-span-4 bg-[#141413] text-[#F3F0EE] p-6 rounded-[32px] flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-28 h-28 bg-white p-2.5 rounded-[16px] shadow-sm flex items-center justify-center">
            {/* QR SVG Stylisé */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#141413]" fill="currentColor">
              <rect x="0" y="0" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="8" y="8" width="14" height="14" rx="2" />
              <rect x="70" y="0" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="78" y="8" width="14" height="14" rx="2" />
              <rect x="0" y="70" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="8" y="78" width="14" height="14" rx="2" />
              <rect x="40" y="10" width="10" height="20" />
              <rect x="55" y="0" width="10" height="10" />
              <rect x="40" y="40" width="20" height="20" rx="3" />
              <rect x="70" y="45" width="20" height="10" />
              <rect x="40" y="70" width="10" height="20" />
              <rect x="60" y="75" width="30" height="15" />
            </svg>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-mono tracking-widest text-[#D1CDC7] uppercase">ACCÈS DIRECT SAMU / HÔPITAL</span>
            <p className="font-mono text-xs font-bold text-white">{hdsRef}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
