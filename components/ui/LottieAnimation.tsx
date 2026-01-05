"use client"

import dynamic from "next/dynamic"
import { useMemo, useState, useEffect } from "react"

// Import dynamique pour éviter les erreurs SSR avec Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface LottieAnimationProps {
  animationData: unknown
  className?: string
  loop?: boolean
}

export function LottieAnimation({ animationData, className, loop = true }: LottieAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const options = useMemo(() => ({
    loop: loop,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }), [animationData, loop])

  return (
    <div className={className} suppressHydrationWarning>
      {isMounted && <Lottie {...options} />}
    </div>
  )
}
