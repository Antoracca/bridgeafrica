"use client"

import { HeartPulse } from "lucide-react"

interface MiniLoaderProps {
  /** Message optionnel */
  message?: string
}

/**
 * Mini loader pour les transitions rapides entre pages
 * Plus léger et discret que le PageLoader
 */
export function MiniLoader({ message }: MiniLoaderProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="flex flex-col items-center gap-4">
        {/* Logo animé compact */}
        <div className="relative">
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 animate-ping" />

          {/* Logo */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-600/30">
            <HeartPulse className="w-8 h-8 text-white animate-pulse" strokeWidth={2.5} />
          </div>
        </div>

        {/* Message optionnel */}
        {message && (
          <p className="text-sm text-slate-600 font-medium animate-pulse">{message}</p>
        )}

        {/* Spinner */}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
