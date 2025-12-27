import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ isAvailable: null }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Tentative 1: Via RPC (vérifie auth.users - inclut les mails non confirmés)
    const { data: rpcData, error: rpcError } = await supabase.rpc('check_email_exists', { email_to_check: email } as any)
    
    if (!rpcError) {
       return NextResponse.json({ isAvailable: !rpcData })
    }

    // Fallback: Si RPC échoue, on vérifie profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1)

    if (error) {
      console.error('Error checking email:', error)
      return NextResponse.json({ isAvailable: false }) // Fail closed
    }

    const isAvailable = !data || data.length === 0
    return NextResponse.json({ isAvailable })
  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json({ isAvailable: null }, { status: 500 })
  }
}