import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const origin = requestUrl.origin

  console.log('[AUTH CALLBACK] Requête:', { code: !!code, error, error_description })

  // Gestion des erreurs dans l'URL
  if (error) {
    console.error('[AUTH CALLBACK] Erreur URL:', { error, error_description })
    if (error_description?.includes('already registered')) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Un compte existe déjà avec cet email. Veuillez vous connecter.')}`)
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_description || 'Erreur d\'authentification')}`)
  }

  // Si pas de code, erreur
  if (!code) {
    console.error('[AUTH CALLBACK] Pas de code')
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Lien de vérification invalide')}`)
  }

  const supabase = await createClient()

  // Échanger le code contre une session
  console.log('[AUTH CALLBACK] Échange code...')
  const { error: exchangeError, data } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    console.error('[AUTH CALLBACK] Erreur échange:', exchangeError.message)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Le lien de vérification a expiré. Veuillez en demander un nouveau.')}`)
  }

  if (!data.user) {
    console.error('[AUTH CALLBACK] Pas d\'utilisateur après échange')
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Erreur lors de la validation')}`)
  }

  // Succès ! Vérifier que le profil existe (le trigger peut prendre quelques ms)
  console.log('[AUTH CALLBACK] Vérification du profil...')

  // Attendre max 3 secondes que le profil soit créé par le trigger
  let profileExists = false
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', data.user.id)
      .single()

    if (profile) {
      profileExists = true
      console.log('[AUTH CALLBACK] ✓ Profil trouvé')
      break
    }

    if (attempt < 5) {
      console.log(`[AUTH CALLBACK] Profil pas encore créé, tentative ${attempt + 1}/6`)
      await new Promise(resolve => setTimeout(resolve, 500)) // Attendre 500ms
    }
  }

  if (!profileExists) {
    console.warn('[AUTH CALLBACK] ⚠ Profil non trouvé après 3s - redirection quand même')
  }

  // Déterminer la redirection selon le rôle
  const role = data.user.user_metadata?.role || 'patient'
  let redirectPath = '/patient'

  if (role === 'medecin_referent') {
    redirectPath = '/medecin'
  } else if (role === 'clinique') {
    redirectPath = '/clinique'
  }

  console.log('[AUTH CALLBACK] ✓ Redirection:', data.user.email, '→', redirectPath)

  // Redirection vers le dashboard
  return NextResponse.redirect(`${origin}${redirectPath}`)
}