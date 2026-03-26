"use client"

/**
 * Wrapper client pour les providers et loaders
 * Note: InitialPageLoader est dans app/layout.tsx — ne pas dupliquer ici
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
