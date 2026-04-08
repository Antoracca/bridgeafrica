'use client'

import { useState, useTransition, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
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
import { CountrySelect } from "@/components/ui/country-select"
import { useDebounce } from '@/hooks/use-debounce'
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { validateEmailDomain } from '@/lib/utils/validation'
import { useLoading } from '@/contexts/LoadingContext'

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

function RegisterFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // Étape 1 ou 2
  const { showLoader, hideLoader } = useLoading()

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

  const selectedCountry = useWatch({
    control: form.control,
    name: 'country',
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
      } catch {
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
      } catch {
        setIsEmailAvailable(null)
      }
      setIsCheckingEmail(false)
    }
    checkEmail()
  }, [debouncedEmail, form])
  
  // Vérification live du couple nom/prénom
  useEffect(() => {
    async function checkName() {
      if (!debouncedName.firstName || !debouncedName.lastName ||
          debouncedName.firstName.length < 2 || debouncedName.lastName.length < 2) {
        setIsNameAvailable(null)
        return
      }

      setIsCheckingName(true)

      try {
        const res = await fetch('/api/auth/check-name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(debouncedName),
        })
        const data = await res.json()

        setIsNameAvailable(data.isAvailable)

        if (!data.isAvailable) {
          // Message déjà affiché sous le champ (ligne 369-371)
          // On affiche aussi un toast informatif
          toast('Un compte avec ce nom existe déjà', {
            description: 'Si c\'est vous, veuillez vous connecter.',
            duration: 5000,
            icon: 'ℹ️',
          })
        }
      } catch {
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
      showLoader("Création de votre compte...")

      try {
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

        if (authError) {
          hideLoader()

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
          router.push(`/check-email?email=${encodeURIComponent(values.email)}`)
          // Le loader se cachera automatiquement avec le timeout
        } else if (authData.session) {
          // Session active (auto-confirm activé ou autre config)
          router.push('/patient')
          // Le loader se cachera automatiquement avec le timeout
        }
        hideLoader()

      } catch (error) {
        hideLoader()
        toast.error("Erreur inattendue", {
          description: error instanceof Error ? error.message : "Une erreur technique s'est produite. Veuillez réessayer.",
          duration: 5000,
        })
      }
    })
  }

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    startTransition(async () => {
        showLoader(`Inscription avec ${provider === 'google' ? 'Google' : 'Apple'}...`)

        const result = await signInWithOAuth(provider)

        if (result?.error) {
          hideLoader()

          if (result.error.includes('existe déjà')) {
            toast.error('Un compte existe déjà avec cet email. Veuillez vous connecter avec votre compte Google sur la page de connexion.')
          } else {
            toast.error(result.error)
          }
        } else if (result?.url) {
          // Redirection côté client vers Google/Apple - le loader reste actif
          window.location.href = result.url
        } else {
          hideLoader()
          toast.error('Une erreur est survenue lors de la connexion')
        }
    })
  }
  
  const step1Values = useWatch({
    control: form.control,
    name: ['firstName', 'lastName', 'country', 'phone'],
  })

  // Validation étape 1 (infos personnelles)
  const isStep1Valid =
    (step1Values[0]?.length ?? 0) >= 2 &&
    (step1Values[1]?.length ?? 0) >= 2 &&
    (step1Values[2]?.length ?? 0) >= 2 &&
    step1Values[3] &&
    isPhoneAvailable !== false &&
    !isCheckingPhone

  // Validation étape 2 (credentials)
  const isStep2Valid =
    isEmailAvailable !== false &&
    !isCheckingEmail &&
    form.formState.isValid

  // Passer à l'étape 2
  const goToStep2 = () => {
    // Valider les champs de l'étape 1
    const step1Fields = ['firstName', 'lastName', 'country', 'phone'] as const
    let hasErrors = false

    step1Fields.forEach(field => {
      const value = form.getValues(field)
      if (!value || (typeof value === 'string' && value.length < 2)) {
        form.setError(field, { message: 'Ce champ est requis' })
        hasErrors = true
      }
    })

    if (isPhoneAvailable === false) {
      hasErrors = true
    }

    if (!hasErrors && isStep1Valid) {
      setCurrentStep(2)
    }
  }

  return (
    <div className="w-full">
      {/* Afficher les erreurs OAuth */}
      {urlError && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 mb-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-sm text-red-700 dark:text-red-300 font-medium">
            {urlError}
          </AlertDescription>
        </Alert>
      )}

      {/* Indicateur d'étapes - design épuré (Progress Bar) */}
      <div className="mb-6 mt-2">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Étape {currentStep} sur 2</span>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-700">{currentStep === 1 ? 'Informations Personnelles' : 'Sécurité du Compte'}</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className={`h-full bg-slate-900 transition-all duration-500 ease-out ${currentStep === 1 ? 'w-1/2' : 'w-full'}`} />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5 text-left">

            {/* ÉTAPE 1: Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-3.5 animate-in fade-in slide-in-from-right duration-300">
                {/* Prénom et Nom - Full width sur mobile, grid sur desktop */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3.5">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Prénom <span className="text-red-500">*</span></FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Jean"
                              {...field}
                              className="h-11 px-3 text-base rounded-md transition-colors border border-slate-200 bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal hover:border-slate-300 shadow-sm font-medium"
                              onChange={(e) => {
                                field.onChange(e)
                                setNameToCheck({ ...nameToCheck, firstName: e.target.value })
                              }}
                            />
                          </FormControl>
                          {isCheckingName && nameToCheck.firstName && nameToCheck.lastName && (
                            <div className="absolute right-3 top-0 h-full flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            </div>
                          )}
                        </div>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Nom <span className="text-red-500">*</span></FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Dupont"
                              {...field}
                              className="h-11 px-3 text-base rounded-md transition-colors border border-slate-200 bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal hover:border-slate-300 shadow-sm font-medium"
                              onChange={(e) => {
                                field.onChange(e)
                                setNameToCheck({ ...nameToCheck, lastName: e.target.value })
                              }}
                            />
                          </FormControl>
                          {isNameAvailable === false && !isCheckingName && (
                            <div className="absolute right-3 top-0 h-full flex items-center">
                              <XCircle className="h-4 w-4 text-red-500 animate-in zoom-in duration-200" />
                            </div>
                          )}
                        </div>
                        <FormMessage className="text-xs mt-1" />
                        {isNameAvailable === false && (
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">Ce nom et prénom sont déjà utilisés</p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
            
                <FormField
                  name="country"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Pays de résidence <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <CountrySelect
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Numéro de téléphone <span className="text-red-500">*</span></FormLabel>
                      <div className="relative w-full">
                        <FormControl>
                                                                      <PhoneInput
                                                                        international
                                                                        defaultCountry={selectedCountry as any}
                                                                        value={field.value}
                                                                            onChange={(value) => {
                              field.onChange(value || '')
                              setPhoneToCheck(value || '')
                            }}
                            className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-base shadow-sm transition-colors hover:border-slate-300 focus-within:border-brand-teal focus-within:ring-1 focus-within:ring-brand-teal outline-none disabled:cursor-not-allowed disabled:opacity-50 font-medium"
                          />
                        </FormControl>
                        <div className="absolute right-12 top-0 h-full flex items-center pointer-events-none">
                          {isCheckingPhone && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
                          {isPhoneAvailable === true && !isCheckingPhone && field.value && (
                            <CheckCircle className="h-4 w-4 text-green-500 animate-in zoom-in duration-200" />
                          )}
                          {isPhoneAvailable === false && !isCheckingPhone && (
                            <XCircle className="h-4 w-4 text-red-500 animate-in zoom-in duration-200" />
                          )}
                        </div>
                      </div>
                      {isPhoneAvailable === false && !isCheckingPhone && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">Ce numéro est déjà utilisé</p>
                      )}
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* Divider élégant */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-bold tracking-widest">Ou continuer avec</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-11 rounded-md border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm group text-slate-700 font-medium"
                    disabled={isPending}
                    onClick={() => handleSocialLogin('google')}
                  >
                    <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="font-semibold text-sm">Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="h-11 rounded-md border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm group text-slate-700 font-medium"
                    disabled={isPending}
                    onClick={() => handleSocialLogin('apple')}
                  >
                    <svg className="mr-2 h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.87 1.61.21 2.86.81 3.66 1.98-3.12 1.86-2.61 6.27.42 7.8-.62 1.63-1.49 3.23-2.81 3.32zM12.94 5.68c.72-1 1.34-2.28 1.15-3.68-1.18.06-2.58.79-3.29 1.83-.65.92-1.17 2.27-1.01 3.57 1.32.1 2.53-.72 3.15-1.72z" /></svg>
                    <span className="font-semibold text-sm">Apple</span>
                  </Button>
                </div>

                {/* Bouton Suivant moderne */}
                <Button
                  type="button"
                  onClick={goToStep2}
                  className="w-full h-12 mt-6 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm transition-colors text-base"
                  disabled={!isStep1Valid || isPending}
                >
                  Suivant
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            )}

            {/* ÉTAPE 2: Email et mots de passe */}
            {currentStep === 2 && (
              <div className="space-y-3.5 animate-in fade-in slide-in-from-left duration-300">
                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Email <span className="text-red-500">*</span></FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="exemple@email.com"
                          {...field}
                          className="h-11 px-3 text-base rounded-md transition-colors border border-slate-200 bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal hover:border-slate-300 shadow-sm font-medium"
                          onChange={(e) => {
                            field.onChange(e)
                            setEmailToCheck(e.target.value)
                          }}
                        />
                      </FormControl>
                      <div className="absolute right-3 top-0 h-full flex items-center">
                        {isCheckingEmail && <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />}
                        {isEmailAvailable === true && !isCheckingEmail && field.value && (
                          <CheckCircle className="h-4 w-4 text-green-500 animate-in zoom-in duration-200" />
                        )}
                        {isEmailAvailable === false && !isCheckingEmail && (
                          <XCircle className="h-4 w-4 text-red-500 animate-in zoom-in duration-200" />
                        )}
                      </div>
                    </div>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}/>

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Mot de passe <span className="text-red-500">*</span></FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="h-11 px-3 pr-10 text-base rounded-md transition-colors border border-slate-200 bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal hover:border-slate-300 shadow-sm font-medium"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 rounded-xl"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" /> : <Eye className="h-4 w-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" />}
                        </Button>
                      </div>
                      <FormMessage className="text-xs mt-1" />
                      {field.value && <PasswordStrengthIndicator password={field.value} />}
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Confirmer le mot de passe <span className="text-red-500">*</span></FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="h-11 px-3 pr-10 text-base rounded-md transition-colors border border-slate-200 bg-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal hover:border-slate-300 shadow-sm font-medium"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 rounded-xl"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" /> : <Eye className="h-4 w-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" />}
                        </Button>
                      </div>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* Boutons Retour et S'inscrire - design moderne */}
                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="w-auto px-5 h-12 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                    disabled={isPending}
                  >
                    <svg className="mr-1.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold shadow-sm transition-colors text-base"
                    disabled={isPending || !isStep2Valid}
                  >
                    {isPending ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Création...</>
                    ) : (
                      <>
                        S&apos;inscrire
                        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
    </div>
  )
}

export function RegisterForm() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <RegisterFormContent />
    </Suspense>
  )
}