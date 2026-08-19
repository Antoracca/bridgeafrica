"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Cookie, Lock, ChevronDown, ChevronUp, Sliders, Activity } from "lucide-react"

const STORAGE_KEY = "pont_afrique_sante_cookie_consent"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  preferences: boolean
  timestamp: string
}

export function CookieConsentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    preferences: true,
  })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      // Attendre 4 secondes avant d'afficher la modale
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
    const handleOpenSettings = () => {
      const current = localStorage.getItem(STORAGE_KEY)
      if (current) {
        try {
          const parsed = JSON.parse(current)
          setPreferences({
            essential: true,
            analytics: parsed.analytics ?? true,
            preferences: parsed.preferences ?? true,
          })
        } catch (e) {}
      }
      setShowDetails(true)
      setIsOpen(true)
    }
    window.addEventListener("open-cookie-settings", handleOpenSettings)
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings)
  }, [])

  const saveConsent = (analytics: boolean, pref: boolean) => {
    const data: CookiePreferences = {
      essential: true,
      analytics,
      preferences: pref,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setIsOpen(false)
  }

  const handleAcceptAll = () => {
    saveConsent(true, true)
  }

  const handleRejectAll = () => {
    saveConsent(false, false)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences.analytics, preferences.preferences)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-slate-200/80 overflow-hidden my-auto"
        >
          {/* Header avec Logo & Badge HDS */}
          <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 shrink-0 rounded-2xl bg-white p-1.5 border border-slate-200/80 shadow-xs">
                  <Image
                    src="/FaviconFinal.png"
                    alt="Pont Afrique Santé"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold tracking-tight flex items-center select-none">
                    <span className="text-[#0284C7]">Pont</span><span className="text-[#141413]">Afrique</span><span className="text-[#CF4500]">Santé</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Conformité RGPD & Hébergement HDS</span>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-2xl bg-slate-100 text-slate-600 shrink-0">
                <Cookie className="w-5 h-5 text-[#CF4500]" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Respect de votre vie privée & Gestion des cookies
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Nous utilisons des cookies techniques nécessaires au fonctionnement sécurisé de la plateforme et à la protection de vos démarches de santé. Vous pouvez choisir d'activer ou de refuser les cookies de mesure d'audience et de personnalisation.
            </p>
          </div>

          {/* Corps de la modale */}
          <div className="p-6 sm:p-8 pt-4 space-y-4 max-h-[55vh] overflow-y-auto">
            {/* Bouton pour déplier les détails */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full py-2.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0284C7]" />
                {showDetails ? "Masquer les détails et catégories" : "Personnaliser et voir les détails des cookies"}
              </span>
              {showDetails ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Catégories de cookies détaillées */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-2"
                >
                  {/* 1. Cookies essentiels */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">1. Cookies Essentiels & Sécurité HDS</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                        Toujours actif
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Indispensables à la session sécurisée, la navigation chiffrée, la prévention des fraudes et le respect des normes HDS de transfert médical.
                    </p>
                  </div>

                  {/* 2. Mesure d'audience */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#0284C7] shrink-0" />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">2. Mesure d'Audience & Performance</h4>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0284C7]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Statistiques de fréquentation strictement anonymisées pour optimiser la rapidité d'affichage et la clarté du catalogue médical.
                    </p>
                  </div>

                  {/* 3. Préférences utilisateur */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Cookie className="w-4 h-4 text-[#CF4500] shrink-0" />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">3. Préférences & Confort</h4>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.preferences}
                          onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CF4500]"></div>
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Mémorise vos choix d'affichage et vos devises préférées (EUR / CFA XOF) pour une navigation fluide d'une visite à l'autre.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions & Footer */}
          <div className="p-6 sm:p-8 pt-3 border-t border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              {showDetails ? (
                <>
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Enregistrer mes choix
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Tout Accepter
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="w-full sm:w-1/2 h-11 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Refuser
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="w-full sm:w-1/2 h-11 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Accepter tout
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Données hébergées en environnement certifié HDS.</span>
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="underline hover:text-slate-900 font-medium cursor-pointer"
              >
                Détails de la politique
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
