'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['patient', 'medecin_referent', 'clinique']),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
})

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Extract data from formData
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = loginSchema.safeParse(data)

  if (!result.success) {
    return { error: 'Données invalides' }
  }

  const { error, data: authData } = await supabase.auth.signInWithPassword(result.data)

  if (error) {
    return { error: error.message }
  }

  // Determine redirection based on role
  const role = authData.user?.user_metadata?.role as string | undefined
  let redirectUrl = '/dashboard/patient' // Default

  if (role === 'medecin_referent') {
    redirectUrl = '/dashboard/medecin'
  } else if (role === 'clinique') {
    redirectUrl = '/dashboard/clinique'
  } else if (role === 'admin') {
    redirectUrl = '/dashboard/admin'
  }

  revalidatePath('/', 'layout')
  redirect(redirectUrl)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as 'patient' | 'medecin_referent' | 'clinique',
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
  }
  
  const result = signupSchema.safeParse(data)

    if (!result.success) {
    return { error: 'Données invalides' }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
        data: {
            role: result.data.role,
            first_name: result.data.firstName,
            last_name: result.data.lastName
        }
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/') // Redirect to check email or dashboard
}
