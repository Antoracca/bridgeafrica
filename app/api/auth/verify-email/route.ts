import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeEmail, validateEmailDomain } from '@/lib/utils/validation'

/**
 * API pour vérifier l'EXISTENCE d'un email (pour le login)
 *
 * IMPORTANT:
 * - Vérifie dans auth.users (inclut les emails non confirmés)
 * - Permet aux utilisateurs non confirmés de tenter la connexion
 * - Le système redirigera automatiquement vers /check-email si non confirmé
 *
 * Différence avec /api/auth/check-email :
 * - check-email: vérifie DISPONIBILITÉ pour inscription (pas disponible = déjà utilisé)
 * - verify-email: vérifie EXISTENCE pour login (existe = peut se connecter)
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ exists: false }, { status: 400 })
    }

    const normalizedEmail = normalizeEmail(email)

    if (!normalizedEmail) {
      return NextResponse.json({ exists: false, error: 'Email invalide' }, { status: 400 })
    }

    // Validate domain (same validation as signup)
    const domainValidation = validateEmailDomain(normalizedEmail)
    if (!domainValidation.valid) {
      return NextResponse.json({
        exists: false,
        error: domainValidation.error || 'Domaine email invalide'
      }, { status: 400 })
    }

    const supabase = await createClient()

    // CRITICAL: Check if email EXISTS in auth.users (not profiles)
    // This includes users who registered but haven't confirmed their email yet
    const { data: emailExists, error } = await supabase.rpc('check_email_exists', {
      email_to_check: normalizedEmail
    } as any)

    if (error) {
      console.error('[VERIFY-EMAIL] RPC error:', error)
      // Fail open for login (we don't want to block login with false negatives)
      return NextResponse.json({ exists: null })
    }

    // check_email_exists returns boolean: true = exists, false = doesn't exist
    return NextResponse.json({ exists: emailExists })
  } catch (error) {
    console.error('[VERIFY-EMAIL] Unexpected error:', error)
    return NextResponse.json({ exists: null }, { status: 500 })
  }
}
