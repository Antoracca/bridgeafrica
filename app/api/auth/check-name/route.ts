import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { normalizeName } from '@/lib/utils/validation'

export async function POST(request: Request) {
  try {
    const { firstName, lastName } = await request.json()
    console.log('[API CHECK-NAME] Requête reçue:', { firstName, lastName })

    if (!firstName || !lastName) {
      console.log('[API CHECK-NAME] Nom ou prénom manquant')
      return NextResponse.json({ isAvailable: null, message: 'Nom et prénom requis' }, { status: 400 })
    }

    const supabase = await createClient()

    // Normalize names (trim whitespace)
    const normalizedFirstName = normalizeName(firstName)
    const normalizedLastName = normalizeName(lastName)
    console.log('[API CHECK-NAME] Normalisé:', { normalizedFirstName, normalizedLastName })

    // NOTE: This check is INFORMATIONAL ONLY for UX purposes
    // Name uniqueness is NOT enforced server-side (medical context - homonymes are common)
    // Users can proceed with registration even if name exists

    // Use RPC function to bypass RLS (anonymous users need to check during registration)
    const { data: nameExists, error } = await supabase.rpc('check_name_exists', {
      first_name_to_check: normalizedFirstName,
      last_name_to_check: normalizedLastName
    } as any)

    console.log('[API CHECK-NAME] Résultat RPC:', { nameExists, error: error?.message })

    if (error) {
      console.error('[API CHECK-NAME] Erreur RPC:', error)
      // For name check (informational only), we can fail open
      return NextResponse.json({ isAvailable: null })
    }

    // nameExists is boolean: true = name exists (not available), false = available
    const isAvailable = !nameExists
    console.log('[API CHECK-NAME] Retour:', { isAvailable })
    return NextResponse.json({ isAvailable })
  } catch (error) {
    console.error('[API CHECK-NAME] Erreur catch:', error)
    return NextResponse.json({ isAvailable: null }, { status: 500 })
  }
}