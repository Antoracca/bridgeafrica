"use client"

import Image from "next/image"
import { ShieldCheck, User } from "lucide-react"

interface PatientBusinessCardProps {
  patientName: string
  email?: string
  status?: string
}

export function PatientBusinessCard({
  patientName,
  email,
  status = "Compte actif"
}: PatientBusinessCardProps) {
  return (
    <div className="w-full max-w-md bg-[#F4F2EE] border border-[#E2DDD7] rounded-[28px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6 relative overflow-hidden">
      {/* En-tête de la carte : Titre à gauche, Logo agrandi et posé directement sur le fond gris à droite */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E2DDD7] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#857F78] uppercase block">
            ESPACE PATIENT
          </span>
          <h3 className="text-lg font-semibold text-[#141413] tracking-tight">
            Passeport Médical
          </h3>
        </div>

        {/* Logo agrandi et posé directement sur le fond gris (sans conteneur blanc ni texte devant) */}
        <div className="relative w-12 h-12 shrink-0">
          <Image 
            src="/FaviconFinal.png" 
            alt="Pont Afrique Santé" 
            fill 
            className="object-contain" 
            priority 
          />
        </div>
      </div>

      {/* Informations complètes de l'utilisateur (Prénom et Nom complet) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-white border border-[#E2DDD7] flex items-center justify-center text-[#141413] shrink-0 shadow-sm">
            <User className="w-5 h-5 text-[#CF4500]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-medium text-[#857F78] uppercase block">
              Titulaire du dossier
            </span>
            <p className="font-semibold text-base text-[#141413] truncate tracking-tight">
              {patientName}
            </p>
            {email && (
              <p className="text-[11px] text-[#696969] truncate">
                {email}
              </p>
            )}
          </div>
        </div>

        {/* Badges sobres sans halo lumineux ni point vert */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EAE7E1] text-[#141413] text-xs font-semibold">
            {status}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2DDD7] text-xs font-semibold select-none">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CF4500]" />
            <span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span>
          </span>
        </div>
      </div>
    </div>
  )
}
