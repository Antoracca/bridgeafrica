import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const allCookies = cookieStore.getAll()
          console.log('[SUPABASE SERVER] getAll cookies:', allCookies.map(c => c.name))
          return allCookies
        },
        setAll(cookiesToSet) {
          console.log('[SUPABASE SERVER] setAll called with:', cookiesToSet.map(c => ({ name: c.name, hasValue: !!c.value })))
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log('[SUPABASE SERVER] Setting cookie:', name, 'options:', options)
              cookieStore.set(name, value, options)
            })
            console.log('[SUPABASE SERVER] Cookies set successfully')
          } catch (error) {
            console.error('[SUPABASE SERVER] Error setting cookies:', error)
          }
        },
      },
    }
  )
}
