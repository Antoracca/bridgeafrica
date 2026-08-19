"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Mastercard Design System - Composants Fondamentaux
 * Palette : Canvas Cream (#F3F0EE), Lifted Cream (#FCFBFA), Ink Black (#141413), 
 * Signal Orange (#CF4500), Light Signal Orange (#F37338)
 * Rayons : 20px (boutons), 40px (stadium frames), 50% (cercles), 999px (pills)
 */

// 1. Bouton Principal Ink Pill (Rayon 20px, Ink Black #141413, Texte Canvas Cream #F3F0EE)
export function InkPillButton({
  href,
  onClick,
  children,
  className = ""
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] text-sm font-medium tracking-tight border-[1.5px] border-[#141413] hover:bg-[#262627] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-none cursor-pointer",
        className
      )}
    >
      {children}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return <button type="button" onClick={onClick}>{content}</button>
}

// 2. Bouton Secondaire Outlined Pill (Fond Blanc / Lifted Cream, Bordure 1.5px Ink Black)
export function OutlinedPillButton({
  href,
  onClick,
  children,
  className = ""
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[20px] bg-white text-[#141413] text-sm font-medium tracking-tight border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer",
        className
      )}
    >
      {children}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return <button onClick={onClick}>{content}</button>
}

// 3. Eyebrow Dot Badge (Point Signal Orange unique + Majuscules espacées)
export function EyebrowDot({ text }: { text: string }) {
  const cleanText = text.replace(/^[•\s\-\.]+/g, '').trim()
  return (
    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#CF4500] uppercase tracking-wider">
      <span className="w-2.5 h-2.5 rounded-full bg-[#CF4500] shrink-0" />
      <span>{cleanText}</span>
    </div>
  )
}

// 4. Médaillon Circulaire avec Satellite Micro-CTA (Le geste signature Mastercard)
export function ServiceOrbitCard({
  title,
  subtitle,
  category,
  href,
  icon,
  className = ""
}: {
  title: string
  subtitle: string
  category: string
  href: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <Link href={href} className={`group flex flex-col items-center text-center space-y-4 ${className}`}>
      <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#FCFBFA] border border-[#E2DDD7] flex items-center justify-center text-[#141413] transition-all duration-300 group-hover:scale-105 group-hover:border-[#CF4500] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="p-6 text-[#141413] group-hover:text-[#CF4500] transition-colors">
          {icon}
        </div>
        
        {/* Satellite Micro-CTA Blanc docké en orbite */}
        <div className="absolute -bottom-1 -right-1 w-11 h-11 rounded-full bg-white border border-[#E2DDD7] flex items-center justify-center text-[#141413] shadow-md group-hover:bg-[#141413] group-hover:text-[#F3F0EE] group-hover:border-[#141413] transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1 max-w-[200px]">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#CF4500] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
          <span>{category}</span>
        </div>
        <h4 className="text-sm font-medium text-[#141413] tracking-tight">
          {title}
        </h4>
        <p className="text-[11px] text-[#696969] line-clamp-2">
          {subtitle}
        </p>
      </div>
    </Link>
  )
}

// 5. Carte Passeport Santé Mastercard (Rayon 40px Stadium, Double Sceau)
export function MastercardHealthPassport({
  patientName,
  identifier,
  status = "AUDIT EN COURS"
}: {
  patientName: string
  identifier: string
  status?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-[#141413] text-[#F3F0EE] p-8 sm:p-9 shadow-2xl border border-white/10">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 300" fill="none">
        <path d="M-50 250 C 150 50, 350 350, 550 100" stroke="#F37338" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="280" cy="180" r="140" stroke="#F37338" strokeWidth="1" opacity="0.4" />
      </svg>

      <div className="relative z-10 flex flex-col justify-between min-h-[220px]">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CF4500] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#D1CDC7] uppercase font-bold">
                PASSEPORT MÉDICAL INTERNATIONAL • HDS
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Pont Afrique Santé <span className="font-light opacity-70">Care</span>
            </h3>
          </div>

          <div className="flex items-center -space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#EB001B] opacity-90" />
            <div className="w-8 h-8 rounded-full bg-[#F79E1B] opacity-90 mix-blend-screen" />
          </div>
        </div>

        <div className="my-4">
          <p className="text-[10px] uppercase font-mono text-[#D1CDC7] tracking-wider">Titulaire du Dossier</p>
          <p className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase">{patientName}</p>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-end text-xs">
          <div>
            <p className="text-[9px] uppercase font-mono text-[#D1CDC7]">Identifiant Sécurisé</p>
            <p className="font-mono font-bold text-white tracking-widest">{identifier}</p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold tracking-wider">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
