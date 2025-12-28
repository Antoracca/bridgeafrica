import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const origin = requestUrl.origin

  console.log('[AUTH CALLBACK] Requête:', { code: !!code, error, error_description })
  console.log('[AUTH CALLBACK] Cookies reçus:', request.cookies.getAll().map(c => c.name))

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

  // IMPORTANT: Dans un Route Handler, on DOIT utiliser createServerClient avec NextRequest/NextResponse
  // pour accéder correctement aux cookies PKCE (pas cookies() de next/headers)
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Fonction helper pour créer une redirect avec les cookies préservés
  const redirectWithCookies = (url: string) => {
    const redirectResponse = NextResponse.redirect(url)
    // Copier tous les cookies de la response originale vers la redirect
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    })
    return redirectResponse
  }

  // Échanger le code contre une session
  console.log('[AUTH CALLBACK] Échange code...')
  const { error: exchangeError, data } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    console.error('[AUTH CALLBACK] Erreur échange:', exchangeError.message)
    
    // Erreur PKCE = l'utilisateur a ouvert le lien dans un autre navigateur
    if (exchangeError.message.includes('PKCE') || exchangeError.message.includes('code verifier')) {
      return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Veuillez ouvrir le lien de confirmation dans le même navigateur que celui utilisé pour l\'inscription, ou demandez un nouveau lien.')}&pkce_error=true`)
    }
    
    return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Le lien de vérification a expiré. Veuillez en demander un nouveau.')}`)
  }

  if (!data.user) {
    console.error('[AUTH CALLBACK] Pas d\'utilisateur après échange')
    return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Erreur lors de la validation')}`)
  }

  // Succès ! Vérifier que le profil existe (le trigger peut prendre quelques ms)
  console.log('[AUTH CALLBACK] Vérification du profil...')
  console.log('[AUTH CALLBACK] User data from Google:', {
    id: data.user.id,
    email: data.user.email,
    provider: data.user.app_metadata?.provider,
    user_metadata: data.user.user_metadata,
    raw_user_meta_data: data.user.raw_user_meta_data
  })

  // Attendre max 3 secondes que le profil soit créé par le trigger
  let profile = null
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, role, first_name, last_name, phone, country, auth_method')
      .eq('id', data.user.id)
      .single()

    if (profileData) {
      profile = profileData
      console.log('[AUTH CALLBACK] ✓ Profil trouvé:', profile)
      break
    }

    if (attempt < 5) {
      console.log(`[AUTH CALLBACK] Profil pas encore créé, tentative ${attempt + 1}/6`)
      await new Promise(resolve => setTimeout(resolve, 500)) // Attendre 500ms
    }
  }

  // CRITICAL: Bloquer si méthode d'authentification ne correspond pas
  // Exemple: Inscrit manuellement, essaie de se connecter avec Google → BLOQUER
  const currentProvider = data.user.app_metadata?.provider || 'email'
  const isOAuthProvider = currentProvider === 'google' || currentProvider === 'apple'

  // Mapper 'email' → 'manual' pour comparaison
  const normalizedProvider = currentProvider === 'email' ? 'manual' : currentProvider

  if (profile && profile.auth_method && profile.auth_method !== normalizedProvider) {
    console.warn(`[AUTH CALLBACK] ⚠ Conflit méthode auth: profil=${profile.auth_method}, provider=${currentProvider}`)

    // Cas 1: Inscrit manuellement (email/password), essaie Google/Apple → BLOQUER
    if (profile.auth_method === 'manual' && isOAuthProvider) {
      await supabase.auth.signOut()
      return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Un compte existe déjà avec cet email. Veuillez vous connecter avec votre email et mot de passe.')}&auth_conflict=true`)
    }

    // Cas 2: Inscrit avec Google/Apple, essaie email/password → BLOQUER
    if ((profile.auth_method === 'google' || profile.auth_method === 'apple') && currentProvider === 'email') {
      await supabase.auth.signOut()
      return redirectWithCookies(`${origin}/login?error=${encodeURIComponent(`Vous vous êtes inscrit avec ${profile.auth_method === 'google' ? 'Google' : 'Apple'}. Veuillez utiliser cette méthode pour vous connecter.`)}&auth_conflict=true`)
    }
  }

  if (!profile) {
    console.warn('[AUTH CALLBACK] ⚠ Profil non trouvé après 3s - redirection quand même')
  }

  // Vérifier si le profil est complet (pour les connexions OAuth)
  const isProfileIncomplete = !profile?.first_name || !profile?.last_name || !profile?.phone || !profile?.country

  if (isOAuthProvider && isProfileIncomplete) {
    console.log('[AUTH CALLBACK] ⚠ Profil OAuth incomplet - redirection vers complete-profile')
    return redirectWithCookies(`${origin}/complete-profile`)
  }

  // Déterminer la redirection selon le rôle
  const role = profile?.role || data.user.user_metadata?.role || 'patient'
  let dashboardPath = '/patient'

  if (role === 'medecin_referent') {
    dashboardPath = '/medecin'
  } else if (role === 'clinique') {
    dashboardPath = '/clinique'
  }

  // CRITICAL: Différencier nouvelle inscription vs connexion
  // Si le compte a été créé il y a moins de 15 MINUTES, c'est une nouvelle inscription
  // (l'utilisateur peut prendre du temps pour ouvrir l'email et cliquer sur le lien)
  const userCreatedAt = new Date(data.user.created_at)
  const now = new Date()
  const secondsSinceCreation = (now.getTime() - userCreatedAt.getTime()) / 1000
  const isNewSignup = secondsSinceCreation < 900 // 15 minutes

  if (isNewSignup) {
    console.log('[AUTH CALLBACK] ✓ Nouvelle inscription - redirection vers success page:', data.user.email, '→', dashboardPath, `(compte créé il y a ${Math.round(secondsSinceCreation)}s)`)
    // Première inscription → Success page avec animation
    return redirectWithCookies(`${origin}/success?redirect=${encodeURIComponent(dashboardPath)}`)
  } else {
    console.log('[AUTH CALLBACK] ✓ Connexion existante - redirection directe:', data.user.email, '→', dashboardPath, `(compte créé il y a ${Math.round(secondsSinceCreation)}s)`)
    // Connexion suivante → Direct vers dashboard (pas d'animation)
    return redirectWithCookies(`${origin}${dashboardPath}`)
  }
}