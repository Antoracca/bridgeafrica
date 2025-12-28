'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signInWithOAuth } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebounce } from '@/hooks/use-debounce'
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import countries from 'world-countries'
import { validateEmailDomain } from '@/lib/utils/validation'

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  country: z.string().min(2, { message: "Veuillez sélectionner un pays" }),
  phone: z.string().refine((value) => {
    if (!value) return false
    try {
      return isValidPhoneNumber(value)
    } catch {
      return false
    }
  }, { message: "Numéro de téléphone invalide pour ce pays" }),
  email: z.string()
    .email({ message: "Format d'email invalide" })
    .refine((email) => {
      const validation = validateEmailDomain(email)
      return validation.valid
    }, { message: "Domaine email invalide" })
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
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un caractère spécial" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Gestion des erreurs OAuth depuis l'URL
  const [urlError, setUrlError] = useState<string | null>(() => {
    const err = searchParams.get('error')
    return err ? decodeURIComponent(err) : null
  })

  useEffect(() => {
    if (!urlError) return
    const timeout = setTimeout(() => setUrlError(null), 10000)
    return () => clearTimeout(timeout)
  }, [urlError])

  // États pour la vérification live de l'email
  const [emailToCheck, setEmailToCheck] = useState('')
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const debouncedEmail = useDebounce(emailToCheck, 500)
  
  // États pour la vérification du couple nom/prénom
  const [nameToCheck, setNameToCheck] = useState({ firstName: '', lastName: '' })
  const [isNameAvailable, setIsNameAvailable] = useState<boolean | null>(null)
  const [isCheckingName, setIsCheckingName] = useState(false)
  const debouncedName = useDebounce(nameToCheck, 500)

  // États pour la vérification live du téléphone
  const [phoneToCheck, setPhoneToCheck] = useState('')
  const [isPhoneAvailable, setIsPhoneAvailable] = useState<boolean | null>(null)
  const [isCheckingPhone, setIsCheckingPhone] = useState(false)
  const debouncedPhone = useDebounce(phoneToCheck, 500)
  
  // Liste complète des pays
  const countryOptions = countries
    .map(country => ({
      code: country.cca2,
      name: country.name.common,
      flag: country.flag,
      callingCode: country.idd?.root ? 
        (country.idd.root + (country.idd.suffixes?.[0] || '')) : ''
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "GA",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: 'onChange',
  })

  // Vérification live du téléphone
  useEffect(() => {
    async function checkPhone() {
      if (!debouncedPhone || !isValidPhoneNumber(debouncedPhone)) {
        setIsPhoneAvailable(null)
        return
      }
      setIsCheckingPhone(true)
      try {
        const res = await fetch('/api/auth/check-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: debouncedPhone }),
        })
        const data = await res.json()
        setIsPhoneAvailable(data.isAvailable)
        // Message affiché via le <p> ligne 433 quand isPhoneAvailable === false
        // Pas besoin de form.setError pour éviter les doublons
      } catch (error) {
        setIsPhoneAvailable(null)
      }
      setIsCheckingPhone(false)
    }
    checkPhone()
  }, [debouncedPhone, form])

  // Vérification live de l'email
  useEffect(() => {
    async function checkEmail() {
      // Validation format basique d'abord
      if (!debouncedEmail || !z.string().email().safeParse(debouncedEmail).success) {
        setIsEmailAvailable(null)
        return
      }

      // CRITICAL: Validate domain BEFORE calling API (sync with Zod schema)
      const domainValidation = validateEmailDomain(debouncedEmail)
      if (!domainValidation.valid) {
        setIsEmailAvailable(false)
        setIsCheckingEmail(false) // Stop loading indicator
        form.setError('email', { message: domainValidation.error || 'Domaine email invalide' })
        return
      }

      setIsCheckingEmail(true)
      try {
        const res = await fetch('/api/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: debouncedEmail }),
        })
        const data = await res.json()
        setIsEmailAvailable(data.isAvailable)
        if (!data.isAvailable) {
          // Use error message from API if available (contains domain validation errors)
          const errorMessage = data.error || 'Cet email est déjà utilisé'
          form.setError('email', { message: errorMessage })
        } else {
          form.clearErrors('email')
        }
      } catch (error) {
        setIsEmailAvailable(null)
      }
      setIsCheckingEmail(false)
    }
    checkEmail()
  }, [debouncedEmail, form])
  
  // Vérification live du couple nom/prénom
  useEffect(() => {
    async function checkName() {
      console.log('[NAME CHECK] debouncedName:', debouncedName)

      if (!debouncedName.firstName || !debouncedName.lastName ||
          debouncedName.firstName.length < 2 || debouncedName.lastName.length < 2) {
        console.log('[NAME CHECK] Conditions non remplies, skip')
        setIsNameAvailable(null)
        return
      }

      console.log('[NAME CHECK] Vérification en cours pour:', debouncedName)
      setIsCheckingName(true)

      try {
        const res = await fetch('/api/auth/check-name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(debouncedName),
        })
        const data = await res.json()
        console.log('[NAME CHECK] Réponse API:', data)

        setIsNameAvailable(data.isAvailable)

        if (!data.isAvailable) {
          console.log('[NAME CHECK] Nom/Prénom déjà utilisé - affichage message')
          // Message déjà affiché sous le champ (ligne 369-371)
          // On affiche aussi un toast informatif
          toast('Un compte avec ce nom existe déjà', {
            description: 'Si c\'est vous, veuillez vous connecter.',
            duration: 5000,
            icon: 'ℹ️',
          })
        }
      } catch (error) {
        console.error('[NAME CHECK] Erreur:', error)
        setIsNameAvailable(null)
      }
      setIsCheckingName(false)
    }
    checkName()
  }, [debouncedName])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Validation frontend : on bloque la soumission sans toast (le message est déjà visible sous le champ)
    if (isEmailAvailable === false) {
      return // Message d'erreur déjà affiché sous le champ email
    }

    // REMOVED: Name availability check - informational only per user policy (medical context)
    // Name check is informational only, does not block submission

    if (isPhoneAvailable === false) {
      return // Message d'erreur déjà affiché sous le champ téléphone
    }

    startTransition(async () => {
      try {
        console.log('[SIGNUP CLIENT] Soumission inscription avec:', {
          email: values.email,
          phone: values.phone,
          name: `${values.firstName} ${values.lastName}`
        })

        // IMPORTANT: Utiliser le client BROWSER pour que le code PKCE soit stocké dans les cookies du navigateur
        const supabase = createClient()

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: values.email.toLowerCase().trim(),
          password: values.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              role: 'patient',
              first_name: values.firstName,
              last_name: values.lastName,
              country: values.country,
              phone: values.phone,
              auth_method: 'manual',
            },
          },
        })

        console.log('[SIGNUP CLIENT] Résultat Supabase:', {
          user: authData?.user?.id,
          session: !!authData?.session,
          error: authError?.message
        })

        if (authError) {
          console.error('[SIGNUP CLIENT] Erreur Supabase:', authError)
          
          // Gestion des erreurs
          if (authError.message?.includes('already registered') || authError.message?.includes('already exists')) {
            setIsEmailAvailable(false)
            toast.error("Inscription impossible", {
              description: "Cet email est déjà associé à un compte.",
              duration: 6000,
            })
          } else if (authError.message?.includes('unique') || authError.message?.includes('duplicate')) {
            if (authError.message.includes('email')) {
              setIsEmailAvailable(false)
            } else if (authError.message.includes('phone')) {
              setIsPhoneAvailable(false)
            }
            toast.error("Inscription impossible", {
              description: "Ces informations sont déjà utilisées.",
              duration: 6000,
            })
          } else {
            toast.error("Inscription impossible", {
              description: authError.message || "Une erreur s'est produite.",
              duration: 6000,
            })
          }
          return
        }

        // Inscription réussie - email de confirmation envoyé
        if (authData.user && !authData.session) {
          console.log('[SIGNUP CLIENT] Inscription réussie - en attente de confirmation email')
          router.push(`/check-email?email=${encodeURIComponent(values.email)}`)
        } else if (authData.session) {
          // Session active (auto-confirm activé ou autre config)
          console.log('[SIGNUP CLIENT] Inscription réussie - session active, redirection')
          router.push('/patient')
        }

      } catch (error) {
        console.error('[SIGNUP CLIENT] Erreur inattendue:', error)
        toast.error("Erreur inattendue", {
          description: error instanceof Error ? error.message : "Une erreur technique s'est produite. Veuillez réessayer.",
          duration: 5000,
        })
      }
    })
  }

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    console.log(`[REGISTER] Clic sur bouton ${provider}`)
    startTransition(async () => {
        console.log(`[REGISTER] Appel signInWithOAuth pour ${provider}`)
        const result = await signInWithOAuth(provider)
        console.log(`[REGISTER] Résultat signInWithOAuth:`, result)

        if (result?.error) {
          console.error(`[REGISTER] Erreur OAuth ${provider}:`, result.error)
          if (result.error.includes('existe déjà')) {
            toast.error('Un compte existe déjà avec cet email. Veuillez vous connecter avec votre compte Google sur la page de connexion.')
          } else {
            toast.error(result.error)
          }
        } else if (result?.url) {
          console.log(`[REGISTER] Redirection côté client vers:`, result.url)
          // Redirection côté client vers Google/Apple
          window.location.href = result.url
        } else {
          console.error(`[REGISTER] Résultat inattendu - pas d'URL ni d'erreur`)
          toast.error('Une erreur est survenue lors de la connexion')
        }
    })
  }
  
  // Vérifier si tous les champs requis sont valides
  // NOTE: Name availability is informational only - does not block submission
  const isFormValid = form.formState.isValid &&
                      isEmailAvailable !== false &&
                      // REMOVED: isNameAvailable !== false &&  // Informational only per user policy
                      isPhoneAvailable !== false &&
                      !isCheckingEmail &&
                      // REMOVED: !isCheckingName &&  // Don't block on name check
                      !isCheckingPhone

  return (
    <Card className="border-none shadow-none md:border md:shadow-sm bg-transparent md:bg-card">
      <CardContent className="pt-6 md:p-6">
        {/* Afficher les erreurs OAuth */}
        {urlError && (
          <Alert className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20 mb-4">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              {urlError}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <FormField 
                name="firstName" 
                control={form.control} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Prénom <span className="text-red-500">*</span></FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          placeholder="Jean" 
                          {...field} 
                          className="h-9" 
                          onChange={(e) => {
                            field.onChange(e)
                            setNameToCheck({ ...nameToCheck, firstName: e.target.value })
                          }}
                        />
                      </FormControl>
                      {isCheckingName && nameToCheck.firstName && nameToCheck.lastName && (
                        <div className="absolute right-2 top-0 h-full flex items-center">
                          <Loader2 className="h-3 w-3 animate-spin" />
                        </div>
                      )}
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )} 
              />
              <FormField 
                name="lastName" 
                control={form.control} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nom <span className="text-red-500">*</span></FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          placeholder="Dupont" 
                          {...field} 
                          className="h-9"
                          onChange={(e) => {
                            field.onChange(e)
                            setNameToCheck({ ...nameToCheck, lastName: e.target.value })
                          }}
                        />
                      </FormControl>
                      {isNameAvailable === false && !isCheckingName && (
                        <div className="absolute right-2 top-0 h-full flex items-center">
                          <XCircle className="h-3 w-3 text-red-500" />
                        </div>
                      )}
                    </div>
                    <FormMessage className="text-[10px]" />
                    {isNameAvailable === false && (
                      <p className="text-[10px] text-destructive mt-1">Ce nom et prénom sont déjà utilisés</p>
                    )}
                  </FormItem>
                )} 
              />
            </div>
            
            <FormField 
              name="country" 
              control={form.control} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Pays de résidence <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px] overflow-y-auto">
                      {countryOptions.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            
            <FormField 
              name="phone" 
              control={form.control} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Numéro de téléphone (WhatsApp recommandé) <span className="text-red-500">*</span></FormLabel>
                  <div className="relative">
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry={form.watch('country') as any}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value || '')
                          setPhoneToCheck(value || '')
                        }}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <div className="absolute right-12 top-0 h-full flex items-center pointer-events-none">
                      {isCheckingPhone && <Loader2 className="h-3 w-3 animate-spin" />}
                      {isPhoneAvailable === true && !isCheckingPhone && field.value && (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      {isPhoneAvailable === false && !isCheckingPhone && (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  {isPhoneAvailable === false && !isCheckingPhone && (
                    <p className="text-[10px] text-destructive mt-1">Ce numéro est déjà utilisé</p>
                  )}
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email <span className="text-red-500">*</span></FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="exemple@email.com" 
                        {...field} 
                        className="h-9" 
                        onChange={(e) => { 
                          field.onChange(e)
                          setEmailToCheck(e.target.value) 
                        }} 
                      />
                    </FormControl>
                    <div className="absolute right-2 top-0 h-full flex items-center">
                      {isCheckingEmail && <Loader2 className="h-3 w-3 animate-spin" />}
                      {isEmailAvailable === true && !isCheckingEmail && field.value && (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      )}
                      {isEmailAvailable === false && !isCheckingEmail && (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <FormMessage className="text-[10px]" />
                </FormItem>
            )}/>

            <FormField 
              name="password" 
              control={form.control} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Mot de passe <span className="text-red-500">*</span></FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                        className="h-9" 
                      />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-0 top-0 h-full px-2" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <FormMessage className="text-[10px]" />
                  {field.value && <PasswordStrengthIndicator password={field.value} />}
                </FormItem>
              )}
            />
            
            <FormField 
              name="confirmPassword" 
              control={form.control} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Confirmer le mot de passe <span className="text-red-500">*</span></FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        {...field} 
                        className="h-9" 
                      />
                    </FormControl>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-0 top-0 h-full px-2" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 h-10 mt-2" 
              disabled={isPending || !isFormValid}
            >
              {isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Création...</>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </Form>

        <div className="relative my-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-[10px] uppercase"><span className="bg-card px-2 text-muted-foreground font-medium text-xs">OU</span></div></div>

        <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              type="button" 
              className="h-9 text-xs" 
              disabled={isPending}
              onClick={() => handleSocialLogin('google')}
            >
                <svg className="mr-2 h-3 w-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              className="h-9 text-xs" 
              disabled={isPending}
              onClick={() => handleSocialLogin('apple')}
            >
                <svg className="mr-2 h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.87 1.61.21 2.86.81 3.66 1.98-3.12 1.86-2.61 6.27.42 7.8-.62 1.63-1.49 3.23-2.81 3.32zM12.94 5.68c.72-1 1.34-2.28 1.15-3.68-1.18.06-2.58.79-3.29 1.83-.65.92-1.17 2.27-1.01 3.57 1.32.1 2.53-.72 3.15-1.72z" /></svg>
                Apple
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
