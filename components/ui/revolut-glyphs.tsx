import React from "react"

/**
 * Glyphes et illustrations vectoriels exclusifs inspirés du Design System Revolut (DESIGN.md)
 * Évite les icônes standards génériques en apportant une identité fintech & médicale forte.
 */

// 1. Carte Médicale Virtuelle MediBridge (Style Revolut Metal / Ultra)
export function MediBridgeMetalCard({
  patientName = "PATIENT MEDIBRIDGE",
  tier = "PLATINUM CARE",
  hdsNumber = "HDS-FR-2026-9941",
  balance = "12 500 €",
  className = ""
}: {
  patientName?: string
  tier?: string
  hdsNumber?: string
  balance?: string
  className?: string
}) {
  return (
    <div 
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-2xl transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(135deg, #090a0f 0%, #151827 50%, #0c0e18 100%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
      }}
    >
      {/* Texture holographique subtile */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 85% 15%, rgba(73, 79, 223, 0.9) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(0, 168, 126, 0.7) 0%, transparent 55%)"
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[190px]">
        {/* Header Carte */}
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-slate-400">{tier}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00a87e] animate-pulse" />
            </div>
            <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              <span>Pont Afrique Santé</span>
              <span className="text-[#4f55f1]">Pass</span>
            </div>
          </div>

          {/* Puce EMV / NFC stylisée Revolut */}
          <div className="flex items-center gap-2">
            <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
              <rect width="34" height="26" rx="4" fill="url(#chip-grad)" />
              <path d="M0 9H13M0 17H13M21 9H34M21 17H34M13 5V21M21 5V21" stroke="#222" strokeWidth="0.8" opacity="0.6" />
              <defs>
                <linearGradient id="chip-grad" x1="0" y1="0" x2="34" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#d8b056" />
                  <stop offset="0.5" stopColor="#f5e08c" />
                  <stop offset="1" stopColor="#b88f34" />
                </linearGradient>
              </defs>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/60">
              <path d="M8.5 16.5a5 5 0 0 1 0-9M12 19a8.5 8.5 0 0 0 0-14M15.5 21.5a12 12 0 0 0 0-19" />
            </svg>
          </div>
        </div>

        {/* Milieu : Solde alloué & Compte séquestre */}
        <div className="my-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Séquestre Alloué aux Soins</span>
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{balance}</span>
        </div>

        {/* Footer Carte */}
        <div className="flex justify-between items-end pt-2 border-t border-white/10 text-xs">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Titulaire</p>
            <p className="font-bold text-white tracking-wider text-xs uppercase">{patientName}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Identifiant HDS</p>
            <p className="font-mono text-xs font-bold text-slate-300">{hdsNumber}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Boarding Pass / Pass Logistique Médicale Revolut
export function MedicalBoardingPass({
  fromCode = "LBV",
  fromCity = "Libreville",
  toCode = "TUN",
  toCity = "Tunis",
  flightNumber = "AF 976",
  seat = "14A (Médicalisé)",
  date = "28 Mars 2026",
  hospital = "Clinique Taoufik",
  status = "CONFIRMÉ"
}: {
  fromCode?: string
  fromCity?: string
  toCode?: string
  toCity?: string
  flightNumber?: string
  seat?: string
  date?: string
  hospital?: string
  status?: string
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
      {/* Header Sombre */}
      <div className="bg-slate-950 text-white p-5 sm:p-6 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Evacuation & Logistique</span>
          <h4 className="text-base font-extrabold text-white tracking-tight">Pass Vol & Séjour Clinique</h4>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#00a87e]/20 text-[#00a87e] text-xs font-bold border border-[#00a87e]/30">
          {status}
        </span>
      </div>

      {/* Trajet Aérien */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">{fromCode}</p>
            <p className="text-xs font-bold text-slate-500">{fromCity}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <div className="w-full flex items-center justify-center gap-2">
              <span className="h-[1.5px] flex-1 bg-slate-200" />
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-950 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <span className="h-[1.5px] flex-1 bg-slate-200" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 mt-1">{flightNumber}</span>
          </div>

          <div className="text-right">
            <p className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">{toCode}</p>
            <p className="text-xs font-bold text-slate-500">{toCity}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Date Départ</p>
            <p className="font-extrabold text-slate-900 mt-0.5">{date}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Assistance</p>
            <p className="font-extrabold text-slate-900 mt-0.5">{seat}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Clinique Cible</p>
            <p className="font-extrabold text-slate-900 mt-0.5 truncate">{hospital}</p>
          </div>
        </div>

        {/* Code Barres SVG Revolut */}
        <div className="pt-4 border-t border-dashed border-slate-200 flex flex-col items-center justify-center gap-1.5">
          <svg width="220" height="36" viewBox="0 0 220 36" fill="currentColor" className="text-slate-900">
            <rect x="0" y="0" width="3" height="36"/>
            <rect x="6" y="0" width="1" height="36"/>
            <rect x="10" y="0" width="4" height="36"/>
            <rect x="18" y="0" width="2" height="36"/>
            <rect x="24" y="0" width="1" height="36"/>
            <rect x="28" y="0" width="5" height="36"/>
            <rect x="36" y="0" width="2" height="36"/>
            <rect x="42" y="0" width="3" height="36"/>
            <rect x="48" y="0" width="1" height="36"/>
            <rect x="52" y="0" width="4" height="36"/>
            <rect x="60" y="0" width="2" height="36"/>
            <rect x="66" y="0" width="6" height="36"/>
            <rect x="76" y="0" width="1" height="36"/>
            <rect x="80" y="0" width="3" height="36"/>
            <rect x="86" y="0" width="4" height="36"/>
            <rect x="94" y="0" width="2" height="36"/>
            <rect x="100" y="0" width="5" height="36"/>
            <rect x="108" y="0" width="1" height="36"/>
            <rect x="112" y="0" width="3" height="36"/>
            <rect x="118" y="0" width="2" height="36"/>
            <rect x="124" y="0" width="4" height="36"/>
            <rect x="132" y="0" width="1" height="36"/>
            <rect x="136" y="0" width="6" height="36"/>
            <rect x="146" y="0" width="2" height="36"/>
            <rect x="152" y="0" width="3" height="36"/>
            <rect x="158" y="0" width="5" height="36"/>
            <rect x="166" y="0" width="1" height="36"/>
            <rect x="170" y="0" width="4" height="36"/>
            <rect x="178" y="0" width="2" height="36"/>
            <rect x="184" y="0" width="6" height="36"/>
            <rect x="194" y="0" width="1" height="36"/>
            <rect x="198" y="0" width="4" height="36"/>
            <rect x="206" y="0" width="2" height="36"/>
            <rect x="212" y="0" width="5" height="36"/>
          </svg>
          <span className="font-mono text-[9px] text-slate-400 tracking-widest">MB-EVASAN-2026-X99</span>
        </div>
      </div>
    </div>
  )
}

// 3. Vault Séquestre Bancaire Revolut
export function EscrowVaultWidget({
  totalAmount = "15 400 €",
  securedAmount = "12 500 €",
  releasedAmount = "2 900 €",
  guaranteeBank = "Société Générale / Attijariwafa Bank",
  escrowRef = "ESC-2026-9812-HDS"
}: {
  totalAmount?: string
  securedAmount?: string
  releasedAmount?: string
  guaranteeBank?: string
  escrowRef?: string
}) {
  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg">
      <div 
        className="absolute top-0 right-0 w-80 h-80 bg-[#494fdf]/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00a87e]" />
            <span>SÉQUESTRE BANCAIRE PROTÉGÉ</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Coffre-Fort des Soins
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          Ref: {escrowRef}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 relative z-10">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Budget Total Devisé</span>
          <p className="text-2xl font-black text-white">{totalAmount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#00a87e]/10 border border-[#00a87e]/30 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#00a87e]">Fonds Bloqués Sécurisés</span>
          <p className="text-2xl font-black text-[#00a87e]">{securedAmount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Fonds Débloqués Clinique</span>
          <p className="text-2xl font-black text-slate-300">{releasedAmount}</p>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-400 relative z-10">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a87e" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <span>Garantie de restitution en cas d'annulation médicale</span>
        </div>
        <span className="font-mono text-slate-500">{guaranteeBank}</span>
      </div>
    </div>
  )
}

// 4. Glyphes Géométriques Révolut
export function RevolutToken({
  type,
  size = 40,
  className = ""
}: {
  type: "vault" | "passport" | "doctor" | "card" | "plane" | "chat" | "security" | "document" | "bell" | "calendar" | "phone"
  size?: number
  className?: string
}) {
  const getIcon = () => {
    switch (type) {
      case "vault":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="12" cy="12" r="4" />
            <path d="m15 15-2-2" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          </svg>
        )
      case "passport":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="3" />
            <circle cx="12" cy="10" r="3" />
            <path d="M8 18h8M9 14h6" />
          </svg>
        )
      case "doctor":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4.5 9.5a5.5 5.5 0 0 0 11 0V3h-2v6.5a3.5 3.5 0 0 1-7 0V3h-2v6.5z" />
            <path d="M15.5 9.5a5.5 5.5 0 0 0 5 5.48V19a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-4.02" />
            <circle cx="12" cy="19" r="1" fill="currentColor" />
          </svg>
        )
      case "plane":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        )
      case "security":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        )
      case "document":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        )
      case "chat":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        )
      case "bell":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        )
      case "calendar":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        )
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
          </svg>
        )
    }
  }

  return (
    <div 
      className={`rounded-2xl flex items-center justify-center transition-all bg-slate-950 text-white shadow-sm shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {getIcon()}
    </div>
  )
}
