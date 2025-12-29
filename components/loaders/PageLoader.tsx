"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import loaderAnimation from "@/public/loarderpagehome.json"

interface PageLoaderProps {
  /** Message à afficher sous l'animation */
  message?: string
  /** Callback quand le chargement est terminé */
  onLoadComplete?: () => void
}

/**
 * Loader principal pour les pages d'accueil et dashboards principaux
 * Utilise l'animation Lottie MediBridge
 */
export function PageLoader({ message = "Chargement en cours...", onLoadComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Attendre que la page soit complètement chargée
    const handleLoad = () => {
      // Attendre un minimum de 1.5s pour que l'animation soit visible
      const minLoadTime = setTimeout(() => {
        setIsVisible(false)
        onLoadComplete?.()
      }, 1500)

      return () => clearTimeout(minLoadTime)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [onLoadComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 -mt-12">
        {/* Animation Lottie */}
        <div className="w-64 h-64 md:w-80 md:h-80">
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Texte MediBridge */}
        <div className="text-center space-y-3 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 animate-pulse">
            MediBridge
          </h1>
          <p className="text-sm md:text-base text-slate-600 font-medium">{message}</p>
        </div>

        {/* Points animés */}
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
