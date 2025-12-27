import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeEmail, validateEmailDomain } from '@/lib/utils/validation'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      // Fail closed: empty email is invalid
      return NextResponse.json({ isAvailable: false }, { status: 400 })
    }

    // Normalize email to lowercase and trim whitespace
    const normalizedEmail = normalizeEmail(email)

    if (!normalizedEmail) {
      return NextResponse.json({ isAvailable: false, error: 'Email invalide' }, { status: 400 })
    }

    // CRITICAL: Validate email domain BEFORE checking availability
    // This ensures checkmark and button validation are synchronized
    const domainValidation = validateEmailDomain(normalizedEmail)
    if (!domainValidation.valid) {
      return NextResponse.json({
        isAvailable: false,
        error: domainValidation.error || 'Domaine email invalide'
      }, { status: 400 })
    }

    const supabase = await createClient()

    // Attempt 1: Via RPC (checks auth.users - includes unconfirmed emails)
    const { data: rpcData, error: rpcError } = await supabase.rpc('check_email_exists', { email_to_check: normalizedEmail } as any)
    
    if (!rpcError) {
       return NextResponse.json({ isAvailable: !rpcData })
    }

    // Fallback: If RPC fails, check profiles table directly
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', normalizedEmail)
      .limit(1)

    if (error) {
      console.error('Error checking email:', error)
      return NextResponse.json({ isAvailable: false }) // Fail closed
    }

    const isAvailable = !data || data.length === 0
    return NextResponse.json({ isAvailable })
  } catch (error) {
    console.error('Error checking email:', error)
    // FIX: Fail closed - treat unknown errors as "unavailable"
    return NextResponse.json({ isAvailable: false }, { status: 500 })
  }
}