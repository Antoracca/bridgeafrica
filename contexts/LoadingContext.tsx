"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from "react"
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showLoader = useCallback((msg?: string) => {
    // Annuler tout timeout précédent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setMessage(msg)
    setIsLoading(true)

    // Timeout de sécurité: cacher automatiquement après 10 secondes
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      setMessage(undefined)
    }, 10000)
  }, [])

  const hideLoader = useCallback(() => {
    // Annuler le timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsLoading(false)
    setMessage(undefined)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
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
