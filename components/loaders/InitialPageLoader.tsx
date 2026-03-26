"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Lottie et son JSON chargés de façon asynchrone — hors du bundle principal
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

/**
 * Loader pour la première visite uniquement
 * S'affiche pendant le chargement initial de la page
 */
export function InitialPageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    // Charger le JSON Lottie en parallèle du reste de la page
    import("@/public/loarderpagehome.json").then(mod => setAnimationData(mod.default))

    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 800)
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
        <div className="w-72 h-72 md:w-96 md:h-96">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
