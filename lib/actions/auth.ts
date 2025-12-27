'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { parseSupabaseError } from '@/lib/utils/auth-errors'

// --- SCHÉMAS DE VALIDATION ---
const loginSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

const signupSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z.string()
    .min(8, 'Le mot de passe doit faire au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  country: z.string().min(2, 'Le pays est requis'),
  phone: z.string().optional(),
  role: z.enum(['patient', 'medecin_referent', 'clinique']).default('patient'),
})

// --- ACTIONS SERVEUR ---

export async function login(formData: FormData) {
  const supabase = await createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const result = loginSchema.safeParse(data)
  if (!result.success) return { error: result.error.issues[0].message }

  const { error, data: authData } = await supabase.auth.signInWithPassword(result.data)
  
  if (error) {
    console.error("Login Error Full Object:", JSON.stringify(error, null, 2)) 

    // Détection spécifique Email non confirmé
    if (error.message.toLowerCase().includes('email not confirmed') || 
        error.message.includes('Email not verified') || 
        error.code === 'email_not_confirmed') {
      return { 
        error: "Veuillez confirmer votre email pour vous connecter.",
        code: "email_not_confirmed",
        email: result.data.email // On renvoie l'email pour le bouton "Renvoyer"
      } 
    }

    // Gestion des identifiants invalides
    if (error.message.includes('Invalid login credentials')) {
      return { 
        error: 'Email ou mot de passe incorrect.',
        code: 'invalid_credentials' 
      }
    }
    
    return { error: parseSupabaseError(error, 'login').userFriendly }
  }

  const role = authData.user?.user_metadata?.role as string | undefined
  let redirectUrl = '/patient'
  if (role === 'medecin_referent') redirectUrl = '/medecin'
  else if (role === 'clinique') redirectUrl = '/clinique'
  else if (role === 'admin') redirectUrl = '/admin'

  revalidatePath('/', 'layout')
  redirect(redirectUrl)
}

export async function signup(formData: FormData) {
  try {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
      role: (formData.get('role') as any) || 'patient',
    }

    const result = signupSchema.safeParse(data)
    if (!result.success) return { error: result.error.issues[0].message }

    // Vérification de l'unicité de l'email via RPC
    const { data: emailExists, error: emailCheckError } = await supabase.rpc('check_email_exists', { email_to_check: result.data.email } as any)
    if (!emailCheckError && emailExists) {
        return { error: "Cet email est déjà associé à un compte." }
    }

    // Vérification de l'unicité du téléphone via RPC
    if (result.data.phone) {
      const { data: phoneExists, error: phoneCheckError } = await supabase.rpc('check_phone_exists', { phone_to_check: result.data.phone } as any)
      
      if (!phoneCheckError && phoneExists) {
        return { error: "Ce numéro de téléphone est déjà utilisé par un autre compte." }
      }
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
        data: {
          role: result.data.role,
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          country: result.data.country,
          phone: result.data.phone || null,
          auth_method: 'manual',
        },
      },
    })

    if (authError) {
      console.error("Signup Error:", authError)
      return { error: parseSupabaseError(authError, 'signup').userFriendly }
    }

    if (authData.user && !authData.session) {
      return {
        success: true,
        message: "Compte créé ! Veuillez vérifier vos emails pour confirmer votre inscription.",
      }
    }
    
    // Si session active (auto-confirm désactivé ou autre config), on redirige
    if (authData.session) {
       revalidatePath('/', 'layout')
       redirect('/patient')
    }

    return { success: true } // Fallback

  } catch (error) {
    console.error("Unexpected Signup Error:", error)
    return { error: 'Une erreur inattendue s\'est produite. Veuillez réessayer.' }
  }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const data = {
    first_name: formData.get('firstName') as string,
    last_name: formData.get('lastName') as string,
    phone: formData.get('phone') as string,
    country: formData.get('country') as string,
    city: formData.get('city') as string,
    allergies: formData.get('allergies') as string,
  }

  const { error } = await (supabase as any).from('profiles').update(data).eq('id', user.id)
  if (error) return { error: 'Erreur mise à jour: ' + error.message }

  revalidatePath('/patient/profile')
  return { success: true }
}

export async function signInWithOAuth(provider: 'google' | 'apple') {
  try {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')
    const redirectTo = origin ? `${origin}/auth/callback` : undefined

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })

    if (error) {
      return { error: parseSupabaseError(error, 'oauth').userFriendly }
    }
    
    if (data.url) {
      redirect(data.url)
    }
  } catch (error) {
    console.error('OAuth error:', error)
    return { error: 'Une erreur est survenue lors de la connexion' }
  }
}

export async function resendConfirmationEmail(email: string) {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    }
  })

  if (error) return { error: parseSupabaseError(error, 'resend').userFriendly }
  return { success: true, message: 'Un nouvel email de confirmation a été envoyé.' }
}