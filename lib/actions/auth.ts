'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { parseSupabaseError } from '@/lib/utils/auth-errors'
import { normalizeEmail, normalizePhone, validatePassword, validateEmailDomain } from '@/lib/utils/validation'

// --- SCHÉMAS DE VALIDATION ---
const loginSchema = z.object({
  email: z.string().email('Veuillez entrer une adresse email valide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

const signupSchema = z.object({
  email: z.string()
    .email('Veuillez entrer une adresse email valide')
    .refine((email) => {
      const validation = validateEmailDomain(email)
      return validation.valid
    }, { message: 'Domaine email invalide' })
    .superRefine((email, ctx) => {
      const validation = validateEmailDomain(email)
      if (!validation.valid && validation.error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: validation.error
        })
      }
    }),
  password: z.string()
    .min(8, 'Le mot de passe doit faire au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[!@#$%^&*(),.?":{}|<>\[\]]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
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

    const rawRole = formData.get('role') as string | null
    const role = (rawRole as 'patient' | 'medecin_referent' | 'clinique' | null) || 'patient'

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
      role,
    }

    console.log('[SIGNUP] Données reçues:', { email: data.email, phone: data.phone })

    const result = signupSchema.safeParse(data)
    if (!result.success) {
      console.log('[SIGNUP] Validation Zod échouée:', result.error.issues)
      return { error: result.error.issues[0].message }
    }

    // Additional password validation (belt-and-suspenders approach)
    const passwordCheck = validatePassword(result.data.password)
    if (!passwordCheck.valid) {
      return { error: passwordCheck.errors[0] }
    }

    // Normalize inputs before database checks
    const normalizedEmail = normalizeEmail(result.data.email)
    const normalizedPhone = result.data.phone ? normalizePhone(result.data.phone) : null

    console.log('[SIGNUP] Normalisation:', {
      emailOriginal: result.data.email,
      emailNormalized: normalizedEmail,
      phoneOriginal: result.data.phone,
      phoneNormalized: normalizedPhone
    })

    if (!normalizedEmail) {
      console.log('[SIGNUP] Email normalisé invalide')
      return { error: 'Email invalide' }
    }

    // Vérification de l'unicité de l'email via RPC
    const { data: emailExists, error: emailCheckError } = await supabase.rpc('check_email_exists', {
      email_to_check: normalizedEmail
    } as never)

    // FAIL CLOSED: If RPC fails, block signup
    if (emailCheckError) {
      console.error('Email check RPC failed:', emailCheckError)
      return { error: 'Impossible de vérifier la disponibilité de l\'email. Veuillez réessayer.' }
    }

    if (emailExists) {
      return { error: "Cet email est déjà associé à un compte." }
    }

    // Vérification de l'unicité du téléphone via RPC
    if (normalizedPhone) {
      const { data: phoneExists, error: phoneCheckError } = await supabase.rpc('check_phone_exists', {
        phone_to_check: normalizedPhone
      } as never)

      // FAIL CLOSED: If RPC fails, block signup
      if (phoneCheckError) {
        console.error('Phone check RPC failed:', phoneCheckError)
        return { error: 'Impossible de vérifier la disponibilité du téléphone. Veuillez réessayer.' }
      }

      if (phoneExists) {
        return { error: "Ce numéro de téléphone est déjà utilisé par un autre compte." }
      }
    }

    console.log('[SIGNUP] Appel Supabase signUp avec email:', normalizedEmail)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: result.data.password,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
        data: {
          role: result.data.role,
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          country: result.data.country,
          phone: normalizedPhone, // Store normalized phone
          auth_method: 'manual',
        },
      },
    })

    console.log('[SIGNUP] Résultat Supabase:', {
      user: authData?.user?.id,
      session: !!authData?.session,
      error: authError?.message
    })

    if (authError) {
      console.error("[SIGNUP] Erreur Supabase complète:", authError)

      // Enhanced error handling for unique constraint violations (race conditions)
      if (authError.message?.includes('unique') || authError.message?.includes('duplicate')) {
        // Race condition: Someone registered between our check and signup
        if (authError.message.includes('email')) {
          return { error: "Cet email a été enregistré à l'instant. Veuillez vous connecter." }
        }
        if (authError.message.includes('phone')) {
          return { error: "Ce numéro de téléphone a été enregistré à l'instant." }
        }
      }

      return { error: parseSupabaseError(authError, 'signup').userFriendly }
    }

    if (authData.user && !authData.session) {
      console.log('[SIGNUP] Inscription réussie - en attente de confirmation email')
      return {
        success: true,
        message: "Compte créé ! Veuillez vérifier vos emails pour confirmer votre inscription.",
      }
    }

    // Si session active (auto-confirm désactivé ou autre config), on redirige
    if (authData.session) {
       console.log('[SIGNUP] Inscription réussie - session active, redirection')
       revalidatePath('/', 'layout')
       redirect('/patient')
    }

    console.log('[SIGNUP] Fallback - retour success:true')
    return { success: true } // Fallback

  } catch (error) {
    console.error("[SIGNUP] Erreur inattendue capturée:", error)
    return { error: 'Une erreur inattendue s\'est produite. Veuillez réessayer.' }
  }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  interface ProfileUpdate {
    first_name: string;
    last_name: string;
    phone?: string | null;
    country: string;
    city?: string | null;
    allergies?: string | null;
    blood_type?: string | null;
    medical_history?: string | null;
    notification_preference?: string | null;
  }

  const data: ProfileUpdate = {
    first_name: formData.get('firstName') as string,
    last_name: formData.get('lastName') as string,
    phone: formData.get('phone') as string || null,
    country: formData.get('country') as string,
    city: formData.get('city') as string || null,
    allergies: formData.get('allergies') as string || null,
    blood_type: formData.get('bloodType') as string || null,
    medical_history: formData.get('medicalHistory') as string || null,
    notification_preference: formData.get('notificationPreference') as string || null,
  }

  const { error } = await supabase.from('profiles').update(data as never).eq('id', user.id)
  if (error) return { error: 'Erreur mise à jour: ' + error.message }

  revalidatePath('/patient/profile')
  return { success: true }
}

export async function uploadProfilePicture(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Non autorisé' }
    }

    const file = formData.get('file') as File
    if (!file) {
      return { error: 'Aucun fichier fourni' }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { error: 'Le fichier doit être une image' }
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return { error: 'L\'image ne doit pas dépasser 5 MB' }
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    // Delete old avatar if exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user.id)
      .single<{ avatar_url: string | null }>()

    if (profile?.avatar_url) {
      const oldPath = profile.avatar_url.split('/').pop()
      if (oldPath) {
        await supabase.storage
          .from('profile-pictures')
          .remove([`avatars/${oldPath}`])
      }
    }

    // Upload new avatar
    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { error: 'Erreur lors de l\'upload: ' + uploadError.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(filePath)

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl } as never)
      .eq('id', user.id)

    if (updateError) {
      return { error: 'Erreur lors de la mise à jour du profil: ' + updateError.message }
    }

    revalidatePath('/patient/profile')
    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { error: 'Erreur inattendue lors de l\'upload' }
  }
}

export async function deleteProfilePicture() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Non autorisé' }
    }

    // Récupérer l'URL actuelle de l'avatar
    const { data: profile } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user.id)
      .single<{ avatar_url: string | null }>()

    if (profile?.avatar_url) {
      // Extraire le nom du fichier depuis l'URL
      const oldPath = profile.avatar_url.split('/').pop()
      if (oldPath) {
        // Supprimer le fichier du Storage
        await supabase.storage
          .from('profile-pictures')
          .remove([`avatars/${oldPath}`])
      }
    }

    // Supprimer l'URL de la base de données
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: null } as never)
      .eq('id', user.id)

    if (updateError) {
      return { error: 'Erreur lors de la suppression: ' + updateError.message }
    }

    revalidatePath('/patient/profile')
    return { success: true }
  } catch (error) {
    console.error('Delete avatar error:', error)
    return { error: 'Erreur inattendue lors de la suppression' }
  }
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
      return { url: data.url }
    } else {
      return { error: 'Impossible de générer le lien de connexion' }
    }
  } catch (error) {
    return { error: 'Une erreur est survenue lors de la connexion' }
  }
}

export async function resendConfirmationEmail(email: string) {
  try {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
      }
    })

    if (error) {
      console.error('[RESEND] Erreur Supabase:', error)
      return { error: parseSupabaseError(error, 'resend').userFriendly }
    }

    console.log('[RESEND] Email envoyé avec succès')
    return { success: true, message: 'Un nouvel email de confirmation a été envoyé.' }
  } catch (error) {
    console.error('[RESEND] Erreur inattendue:', error)
    return { error: 'Impossible d\'envoyer l\'email. Veuillez réessayer.' }
  }
}

export async function completeOAuthProfile(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Non autorisé' }
    }

    const rawOAuthRole = formData.get('role') as string | null
    const oauthRole = (rawOAuthRole as 'patient' | 'medecin_referent' | 'clinique' | null) || 'patient'

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
      role: oauthRole,
    }

    console.log('[COMPLETE OAUTH PROFILE] Données reçues:', data)

    // Valider les données
    if (!data.firstName || data.firstName.length < 2) {
      return { error: 'Le prénom doit contenir au moins 2 caractères' }
    }
    if (!data.lastName || data.lastName.length < 2) {
      return { error: 'Le nom doit contenir au moins 2 caractères' }
    }
    if (!data.country || data.country.length < 2) {
      return { error: 'Veuillez sélectionner un pays' }
    }
    if (!data.phone) {
      return { error: 'Le numéro de téléphone est requis' }
    }

    // Normaliser le téléphone
    const normalizedPhone = normalizePhone(data.phone)
    if (!normalizedPhone) {
      return { error: 'Numéro de téléphone invalide' }
    }

    // Vérifier l'unicité du téléphone (SAUF pour le profil actuel)
    const { data: phoneExists, error: phoneCheckError } = await supabase.rpc(
      'check_phone_exists_excluding_user',
      {
        phone_to_check: normalizedPhone,
        user_id_to_exclude: user.id
      } as never
    )

    if (phoneCheckError) {
      console.error('[COMPLETE OAUTH PROFILE] Erreur vérification téléphone:', phoneCheckError)
      return { error: 'Impossible de vérifier la disponibilité du téléphone.' }
    }

    if (phoneExists) {
      console.warn('[COMPLETE OAUTH PROFILE] Téléphone déjà utilisé par un autre utilisateur')
      return { error: "Ce numéro de téléphone est déjà utilisé par un autre compte." }
    }

    // Mettre à jour le profil
    interface OAuthProfileUpdate {
      first_name: string;
      last_name: string;
      country: string;
      phone: string;
      role: 'patient' | 'medecin_referent' | 'clinique';
      updated_at: string;
    }

    const profileUpdate: OAuthProfileUpdate = {
      first_name: data.firstName,
      last_name: data.lastName,
      country: data.country,
      phone: normalizedPhone,
      role: data.role,
      updated_at: new Date().toISOString(),
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update(profileUpdate as never)
      .eq('id', user.id)

    if (updateError) {
      console.error('[COMPLETE OAUTH PROFILE] Erreur mise à jour:', updateError)
      return { error: 'Erreur lors de la mise à jour du profil: ' + updateError.message }
    }

    // Mettre à jour les métadonnées utilisateur
    const { error: userUpdateError } = await supabase.auth.updateUser({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        country: data.country,
        phone: normalizedPhone,
        role: data.role,
      }
    })

    if (userUpdateError) {
      console.warn('[COMPLETE OAUTH PROFILE] Erreur mise à jour user_metadata:', userUpdateError)
      // Non bloquant
    }

    console.log('[COMPLETE OAUTH PROFILE] Profil complété avec succès')

    // Revalider le cache
    revalidatePath('/', 'layout')

    // Retourner succès (la redirection est gérée côté client)
    return { success: true }

  } catch (error) {
    console.error('[COMPLETE OAUTH PROFILE] Erreur inattendue:', error)
    return { error: 'Une erreur inattendue s\'est produite.' }
  }
}

export async function logout() {
  try {
    console.log('[LOGOUT] Déconnexion en cours...')
    const supabase = await createClient()
    
    // Déconnexion avec suppression de toutes les sessions
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    
    if (error) {
      console.error('[LOGOUT] Erreur Supabase:', error)
      return { error: 'Erreur lors de la déconnexion. Veuillez réessayer.' }
    }

    console.log('[LOGOUT] ✓ Déconnexion réussie')

    revalidatePath('/', 'layout')
    redirect('/')
  } catch (error: unknown) {
    // redirect() lance une exception Next.js (digest: NEXT_REDIRECT) - c'est normal
    if (error && typeof error === 'object' && 'digest' in error && typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error
    }
    console.error('[LOGOUT] Erreur:', error)
    return { error: 'Une erreur est survenue lors de la déconnexion.' }
  }
}
