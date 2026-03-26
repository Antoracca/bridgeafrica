import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Routes protégées seulement — les routes publiques passent directement sans appel Supabase
  const protectedPaths = ['/dashboard', '/patient', '/medecin', '/clinique', '/admin']
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  if (!isProtected) {
    return NextResponse.next({ request: { headers: request.headers } })
  }

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

  // Vérifier la session utilisateur (uniquement pour routes protégées)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isProtected && !user) {
    // Si pas d'utilisateur connecté, rediriger vers login
    const redirectUrl = new URL('/login', request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    
    // Nettoyer tous les cookies de session Supabase pour une déconnexion complète
    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.startsWith('sb-')) {
        redirectResponse.cookies.delete(cookie.name)
      }
    })
    
    return redirectResponse
  }

  return response
}
