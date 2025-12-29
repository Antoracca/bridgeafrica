"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { GlobalLoader } from "@/components/loaders/GlobalLoader"

interface LoadingContextType {
  /** Afficher le loader avec un message */
  showLoader: (message?: string) => void
  /** Cacher le loader */
  hideLoader: () => void
  /** État du loader */
  isLoading: boolean
  /** Message actuel */
  message: string | undefined
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | undefined>(undefined)

  const showLoader = useCallback((msg?: string) => {
    setMessage(msg)
    setIsLoading(true)
  }, [])

  const hideLoader = useCallback(() => {
    setIsLoading(false)
    // Nettoyer le message après l'animation
    setTimeout(() => setMessage(undefined), 300)
  }, [])

  return (
    <LoadingContext.Provider value={{ showLoader, hideLoader, isLoading, message }}>
      {children}
      <GlobalLoader show={isLoading} message={message} />
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading doit être utilisé dans un LoadingProvider")
  }
  return context
}
