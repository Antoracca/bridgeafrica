import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  if (error) {
    // Gestion des erreurs OAuth
    if (error_description?.includes('already registered')) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Un compte existe déjà avec cet email. Veuillez vous connecter avec votre compte Google.')}`)
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_description || 'Erreur d\'authentification')}`)
  }

  if (code) {
    const supabase = await createClient()
    
    // 1. Échange du code temporaire contre une session
    const { error: exchangeError, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!exchangeError && data.user) {
      // Vérifier le rôle de l'utilisateur
      const role = data.user.user_metadata?.role || 'patient'
      
      // Déterminer la page de redirection selon le rôle
      let redirectPath = '/patient'
      if (role === 'medecin_referent') {
        redirectPath = '/medecin'
      } else if (role === 'clinique') {
        redirectPath = '/clinique'
      }
      
      // Si c'est une première confirmation d'email
      if (data.user.email_confirmed_at && !data.user.last_sign_in_at) {
        // Redirection vers la page de succès pour la première connexion
        return NextResponse.redirect(`${origin}/success?redirect=${redirectPath}`)
      }
      
      // Redirection vers la page de succès même pour les connexions suivantes si on vient d'un lien magique
      return NextResponse.redirect(`${origin}/success?redirect=${redirectPath}`)
    }
  }

  // Si erreur ou pas de code, retour à la page de login avec une erreur
  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Authentification échouée')}`)
}