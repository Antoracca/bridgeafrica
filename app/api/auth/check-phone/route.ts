import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ isAvailable: false, error: 'Numéro de téléphone requis' }, { status: 400 })
    }

    const supabase = await createClient()

    // Nettoyage strict (suppression espaces, tirets, points)
    const cleanPhone = phone.replace(/[\s\.\-\(\)]/g, '')

    // Tentative 1: Via RPC
    const { data: rpcData, error: rpcError } = await supabase.rpc('check_phone_exists', { phone_to_check: cleanPhone } as any)

    if (!rpcError) {
        return NextResponse.json({ isAvailable: !rpcData })
    }

    // Fallback: Requête directe
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', cleanPhone)
      .limit(1)
    
    if (error) {
      console.error('Erreur vérification téléphone:', error)
      return NextResponse.json({ isAvailable: false }) // Fail closed
    }

    const isAvailable = !data || data.length === 0
    return NextResponse.json({ isAvailable })
    
  } catch (error) {
    console.error('Erreur API check-phone:', error)
    return NextResponse.json({ isAvailable: true })
  }
}