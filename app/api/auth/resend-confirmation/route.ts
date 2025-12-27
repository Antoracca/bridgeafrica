import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route pour renvoyer l'email de confirmation
 * Utilise SERVICE_ROLE_KEY pour contourner l'authentification
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email manquant' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        console.error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY non configuré.')
        return NextResponse.json(
            { error: 'Configuration serveur Supabase incomplète.' },
            { status: 500 }
        )
    }

    // Créer un client admin avec SERVICE_ROLE_KEY
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Renvoyer l'email de confirmation de manière standard
    const { error } = await supabaseAdmin.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
      }
    })

    if (error) {
      console.error('Erreur resend email:', error)
      // Vérifier si l'erreur est "User not found" ou "Email already confirmed"
      if (error.message.includes('User not found')) {
        return NextResponse.json(
          { error: 'Aucun utilisateur trouvé avec cet email.' },
          { status: 404 }
        )
      }
       if (error.message.includes('Email already confirmed')) {
        return NextResponse.json(
          { error: 'Cet email est déjà confirmé.' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Erreur lors de l\'envoi de l\'email' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Un nouvel email de confirmation a été envoyé.',
    })
  } catch (err) {
    console.error('Erreur API resend:', err)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}
