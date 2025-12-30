"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import loaderAnimation from "@/public/loarderpagehome.json"

/**
 * Loader pour la première visite uniquement
 * S'affiche pendant le chargement initial de la page
 */
export function InitialPageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Attendre que la page soit chargée
    const handleLoad = () => {
      // Petit délai pour que l'animation soit visible
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
      </div>
    </div>
  )
}
