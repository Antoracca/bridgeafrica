'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signup, signInWithOAuth } from '@/lib/actions/auth'
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
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react'
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
  email: z.string().email({ message: "Format d'email invalide" }),
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
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
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
        if (!data.isAvailable) {
          form.setError('phone', { message: 'Ce numéro est déjà utilisé' })
        } else {
          form.clearErrors('phone')
        }
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
      // On enlève dirtyFields pour que la vérification se fasse même sur un remplissage auto
      if (!debouncedEmail || !z.string().email().safeParse(debouncedEmail).success) {
        setIsEmailAvailable(null)
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
          form.setError('email', { message: 'Cet email est déjà utilisé' })
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
          toast.warning('Ce nom et prénom sont déjà utilisés. Veuillez vérifier ou vous connecter.')
        }
      } catch (error) {
        setIsNameAvailable(null)
      }
      setIsCheckingName(false)
    }
    checkName()
  }, [debouncedName])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEmailAvailable === false) {
      toast.error("Cet email est déjà utilisé")
      return
    }
    
    if (isNameAvailable === false) {
      toast.error("Ce nom et prénom sont déjà utilisés")
      return
    }

    if (isPhoneAvailable === false) {
      toast.error("Ce numéro de téléphone est déjà utilisé")
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('country', values.country)
      formData.append('phone', values.phone)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('role', 'patient')
      
      const result = await signup(formData)
      
      if (result?.error) {
        // Gestion fine des erreurs serveur pour une UX préventive
        if (result.error.toLowerCase().includes("email") || result.error.includes("déjà")) {
             form.setError('email', { message: "Cet email est déjà inscrit (ou en attente de validation)." })
             setIsEmailAvailable(false) // Force l'état visuel
        }
        else if (result.error.toLowerCase().includes("téléphone") || result.error.includes("phone")) {
             form.setError('phone', { message: "Ce numéro est déjà utilisé." })
             setIsPhoneAvailable(false)
        }
        
        toast.error("Inscription impossible", {
          description: result.error,
          duration: 5000,
        })
      } else if (result?.success) {
        // Redirection vers la page check-email avec l'email en paramètre
        router.push(`/check-email?email=${encodeURIComponent(values.email)}`)
      }
    })
  }

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    startTransition(async () => {
        const result = await signInWithOAuth(provider)
        if (result?.error) {
          if (result.error.includes('existe déjà')) {
            toast.error('Un compte existe déjà avec cet email. Veuillez vous connecter avec votre compte Google sur la page de connexion.')
          } else {
            toast.error(result.error)
          }
        }
    })
  }
  
  // Vérifier si tous les champs requis sont valides
  const isFormValid = form.formState.isValid && 
                      isEmailAvailable !== false && 
                      isNameAvailable !== false && 
                      isPhoneAvailable !== false &&
                      !isCheckingEmail && 
                      !isCheckingName &&
                      !isCheckingPhone

  return (
    <Card className="border-none shadow-none md:border md:shadow-sm bg-transparent md:bg-card">
      <CardContent className="pt-6 md:p-6">
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
