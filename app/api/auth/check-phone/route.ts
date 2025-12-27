import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizePhone } from '@/lib/utils/validation'

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ isAvailable: false, error: 'Numéro de téléphone requis' }, { status: 400 })
    }

    // Normalize phone to E.164 format BEFORE any checks
    const normalizedPhone = normalizePhone(phone)

    if (!normalizedPhone) {
      return NextResponse.json({ isAvailable: false, error: 'Numéro de téléphone invalide' }, { status: 400 })
    }

    const supabase = await createClient()

    // Attempt 1: Via RPC (preferred - handles normalization)
    const { data: rpcData, error: rpcError } = await supabase.rpc('check_phone_exists', { phone_to_check: normalizedPhone } as any)

    if (!rpcError) {
        return NextResponse.json({ isAvailable: !rpcData })
    }

    // Fallback: Direct query if RPC fails
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', normalizedPhone)
      .limit(1)
    
    if (error) {
      console.error('Erreur vérification téléphone:', error)
      return NextResponse.json({ isAvailable: false }) // Fail closed
    }

    const isAvailable = !data || data.length === 0
    return NextResponse.json({ isAvailable })

  } catch (error) {
    console.error('Erreur API check-phone:', error)
    // FIX: Fail closed - treat unknown errors as "unavailable" to prevent duplicates
    return NextResponse.json({ isAvailable: false })
  }
}