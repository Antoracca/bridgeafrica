"use client"

import { InitialPageLoader } from "@/components/loaders/InitialPageLoader"

/**
 * Wrapper client pour les providers et loaders
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InitialPageLoader />
      {children}
    </>
  )
}
