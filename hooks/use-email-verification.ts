import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface EmailVerificationStatus {
  isVerified: boolean
  isLoading: boolean
  error: string | null
  userRole?: string
}

/**
 * Hook pour vérifier automatiquement si l'email est confirmé
 * Fait un polling toutes les 2 secondes
 * Retourne isVerified dès que c'est fait, prêt pour redirection
 */
export function useEmailVerification(email: string) {
  const [status, setStatus] = useState<EmailVerificationStatus>({
    isVerified: false,
    isLoading: true,
    error: null,
  })

  const checkEmailVerification = useCallback(async () => {
    try {
      const supabase = createClient()

      // Vérifier si l'utilisateur est authentifié
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        // Pas encore authentifié
        setStatus((prev) => ({
          ...prev,
          isLoading: true,
        }))
        return
      }

      // Vérifier si l'email est confirmé
      const isEmailConfirmed = user.email_confirmed_at !== null

      if (isEmailConfirmed) {
        // Email confirmé! Récupérer le rôle
        const role = user.user_metadata?.role || 'patient'

        setStatus({
          isVerified: true,
          isLoading: false,
          error: null,
          userRole: role,
        })
      } else {
        setStatus((prev) => ({
          ...prev,
          isLoading: true,
        }))
      }
    } catch (err) {
      console.error('Erreur vérification email:', err)
      setStatus((prev) => ({
        ...prev,
        error: 'Erreur lors de la vérification',
        isLoading: false,
      }))
    }
  }, [])

  // Polling: vérifier toutes les 2 secondes
  useEffect(() => {
    // Vérifier immédiatement
    checkEmailVerification()

    // Puis polling
    const interval = setInterval(checkEmailVerification, 2000)

    return () => clearInterval(interval)
  }, [checkEmailVerification])

  return status
}
