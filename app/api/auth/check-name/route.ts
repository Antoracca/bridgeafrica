import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { firstName, lastName } = await request.json()
    
    if (!firstName || !lastName) {
      return NextResponse.json({ isAvailable: null }, { status: 400 })
    }

    const supabase = await createClient()
    
    // On sélectionne l'ID avec une limite de 1 pour être efficace
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .ilike('first_name', firstName.trim())
      .ilike('last_name', lastName.trim())
      .limit(1)

    if (error) {
      console.error('Error checking name:', error)
      // Fail closed: En cas d'erreur, on ne dit pas que c'est disponible
      return NextResponse.json({ isAvailable: false })
    }

    // Si data est null ou vide, c'est disponible
    const isAvailable = !data || data.length === 0
    return NextResponse.json({ isAvailable })
  } catch (error) {
    console.error('Error checking name:', error)
    return NextResponse.json({ isAvailable: null }, { status: 500 })
  }
}