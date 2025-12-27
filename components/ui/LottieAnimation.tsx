"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

// Import dynamique pour éviter les erreurs SSR avec Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean // Nouvelle prop
}

export function LottieAnimation({ animationData, className, loop = true }: LottieAnimationProps) {
  const options = useMemo(() => ({
    loop: loop, // Utilisation de la prop
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }), [animationData, loop]) // Ajouter loop aux dépendances du useMemo

  return (
    <div className={className}>
      <Lottie {...options} />
    </div>
  )
}
