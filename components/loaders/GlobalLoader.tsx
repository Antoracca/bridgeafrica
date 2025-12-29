"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import loaderAnimation from "@/public/loarderpagehome.json"

interface GlobalLoaderProps {
  /** Message à afficher */
  message?: string
  /** Force l'affichage du loader */
  show?: boolean
}

/**
 * Loader global avec animation JSON MediBridge
 * S'affiche immédiatement au chargement
 */
export function GlobalLoader({ message, show = true }: GlobalLoaderProps) {
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    if (!show && !isHiding) {
      setIsHiding(true)
      // Petit délai pour l'animation de sortie
      setTimeout(() => {
        setIsHiding(false)
      }, 300)
    }
  }, [show, isHiding])

  if (!show && !isHiding) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 transition-opacity duration-300 ${
        isHiding ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="flex flex-col items-center gap-4 -mt-16">
        {/* Animation Lottie JSON */}
        <div className="w-72 h-72 md:w-96 md:h-96">
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Message de chargement */}
        {message && (
          <div className="text-center space-y-2 px-4 animate-fade-in">
            <p className="text-base md:text-lg text-slate-700 font-semibold">
              {message}
            </p>
            {/* Barre de progression */}
            <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-progress" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
