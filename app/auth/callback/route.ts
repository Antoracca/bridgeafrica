import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')
  const origin = requestUrl.origin

  // Gestion des erreurs dans l'URL
  if (error) {
    if (error_description?.includes('already registered')) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Un compte existe déjà avec cet email. Veuillez vous connecter.')}`)
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_description || 'Erreur d\'authentification')}`)
  }

  if (!code) {
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
  const { error: exchangeError, data } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    if (exchangeError.message.includes('PKCE') || exchangeError.message.includes('code verifier')) {
      return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Veuillez ouvrir le lien de confirmation dans le même navigateur que celui utilisé pour l\'inscription, ou demandez un nouveau lien.')}&pkce_error=true`)
    }

    return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Le lien de vérification a expiré. Veuillez en demander un nouveau.')}`)
  }

  if (!data.user) {
    return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('Erreur lors de la validation')}`)
  }

  // Attendre que le profil soit créé par le trigger (max 3s)
  let profile = null
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, role, first_name, last_name, phone, country, auth_method, created_at')
      .eq('id', data.user.id)
      .single()

    if (profileData) {
      profile = profileData
      break
    }

    if (attempt < 5) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  // Détecter account linking et conflits de méthode d'auth
  const identities = data.user.identities || []
  const currentProvider = identities[identities.length - 1]?.provider || data.user.app_metadata?.provider || 'email'
  const isOAuthProvider = currentProvider === 'google' || currentProvider === 'apple'
  const normalizedProvider = currentProvider === 'email' ? 'manual' : currentProvider

  // BLOQUER account linking (plusieurs identities)
  if (identities.length > 1) {
    const latestIdentity = identities[identities.length - 1]

    // Supprimer l'identity créée par account linking
    await supabase.rpc('delete_user_identity_by_provider', {
      user_id_param: data.user.id,
      provider_param: latestIdentity.provider
    })

    await supabase.auth.signOut()
    return redirectWithCookies(`${origin}/login?error=${encodeURIComponent('La méthode utilisée ne correspond pas à celle de votre inscription. Veuillez vous connecter avec votre email et mot de passe.')}&auth_conflict=true`)
  }

  // BLOQUER si méthode différente de l'inscription
  if (profile?.auth_method && profile.auth_method !== normalizedProvider) {
    await supabase.auth.signOut()

    const message = profile.auth_method === 'manual'
      ? 'La méthode utilisée ne correspond pas à celle de votre inscription. Veuillez vous connecter avec votre email et mot de passe.'
      : `Vous vous êtes inscrit avec ${profile.auth_method === 'google' ? 'Google' : 'Apple'}. Veuillez utiliser cette méthode pour vous connecter.`

    return redirectWithCookies(`${origin}/login?error=${encodeURIComponent(message)}&auth_conflict=true`)
  }

  // Vérifier si le profil est complet (pour OAuth)
  const isProfileIncomplete = !profile?.first_name || !profile?.last_name || !profile?.phone || !profile?.country

  if (isOAuthProvider && isProfileIncomplete) {
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

  // Différencier nouvelle inscription vs connexion
  // Si le profil a < 5 minutes → Nouvelle inscription (temps pour confirmer email)
  const profileAge = profile?.created_at ? (Date.now() - new Date(profile.created_at).getTime()) / 1000 : 0
  const isNewSignup = profileAge < 300 // 5 minutes

  if (isNewSignup) {
    return redirectWithCookies(`${origin}/success?redirect=${encodeURIComponent(dashboardPath)}`)
  } else {
    return redirectWithCookies(`${origin}${dashboardPath}`)
  }
}