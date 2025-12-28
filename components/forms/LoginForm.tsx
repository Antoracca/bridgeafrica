'use client'

import { useState, useTransition, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { login, signInWithOAuth, resendConfirmationEmail } from '@/lib/actions/auth'
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
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { useDebounce } from '@/hooks/use-debounce'

const formSchema = z.object({
  email: z.string().email({
    message: "Email invalide.",
  }),
  password: z.string().min(1, {
    message: "Mot de passe requis.",
  }),
})

function LoginFormContent() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const [urlError, setUrlError] = useState<string | null>(() => {
    const err = searchParams.get('error')
    return err ? decodeURIComponent(err) : null
  })

  useEffect(() => {
    if (!urlError) return
    const timeout = setTimeout(() => setUrlError(null), 10000)
    return () => clearTimeout(timeout)
  }, [urlError])
  
  // Vérification en temps réel de l'email
  const [emailToCheck, setEmailToCheck] = useState('')
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailExists, setEmailExists] = useState<boolean | null>(null)
  const debouncedEmail = useDebounce(emailToCheck, 500)

  // Vérification si l'email existe
  useEffect(() => {
    async function checkEmail() {
      if (!debouncedEmail || !z.string().email().safeParse(debouncedEmail).success) {
        setEmailExists(null)
        return
      }

      setIsCheckingEmail(true)
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: debouncedEmail }),
        })
        const data = await res.json()
        // API retourne directement si l'email existe
        setEmailExists(data.exists)
      } catch (error) {
        setEmailExists(null)
      }
      setIsCheckingEmail(false)
    }
    checkEmail()
  }, [debouncedEmail])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUrlError(null)

    if (emailExists === false) {
      form.setError('email', { message: "Aucun compte n'existe avec cet email" })
      return
    }
    
    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)

      const result = await login(formData)

      if (result?.error) {
        // Cas spécifique email non confirmé
        if (result.code === 'email_not_confirmed' && result.email) {
          // ENVOI AUTOMATIQUE du lien de confirmation
          await resendConfirmationEmail(result.email)

          // REDIRECTION vers check-email (comme après inscription)
          router.push(`/check-email?email=${encodeURIComponent(result.email)}`)
          return
        }

        // Cas identifiants invalides
        if (result.code === 'invalid_credentials' || result.error.includes('incorrect')) {
          form.setError('password', { message: "Mot de passe incorrect" })
          return
        }
        
        if (result.error.includes('compte n\'existe')) {
          form.setError('email', { message: result.error })
        } else if (result.error.includes('Google') || result.error.includes('Apple')) {
          setUrlError(result.error)
        } else {
          toast.error('Erreur de connexion', {
            description: result.error,
            duration: 6000,
          })
        }
      }
    })
  }

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    setUrlError(null)
    startTransition(async () => {
      console.log(`[LOGIN] Connexion OAuth ${provider}`)
      const result = await signInWithOAuth(provider)
      console.log(`[LOGIN] Résultat OAuth:`, result)

      if (result?.error) {
        toast.error(`Erreur connexion ${provider}`, {
          description: result.error,
          duration: 6000,
        })
      } else if (result?.url) {
        console.log(`[LOGIN] Redirection vers ${provider}`)
        // Redirection côté client vers Google/Apple
        window.location.href = result.url
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Afficher les erreurs OAuth */}
      {urlError && (
        <Alert className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            {urlError}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="exemple@email.com" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setEmailToCheck(e.target.value)
                      }}
                    />
                  </FormControl>
                  <div className="absolute right-2 top-0 h-full flex items-center">
                    {isCheckingEmail && <Loader2 className="h-4 w-4 animate-spin" />}
                    {emailExists === true && !isCheckingEmail && field.value && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {emailExists === false && !isCheckingEmail && field.value && (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                {emailExists === false && !isCheckingEmail && (
                  <p className="text-xs text-destructive mt-1">Aucun compte n&apos;existe avec cet email</p>
                )}
                <FormMessage />
                </FormItem>
            )}
            />
            
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel>Mot de passe</FormLabel>
                    <Link 
                        href="/forgot-password" 
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Oublié ?
                    </Link>
                </div>
                <div className="relative">
                    <FormControl>
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                    />
                    </FormControl>
                    <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                </div>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isPending || emailExists === false}
            >
              {isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Connexion...</>
              ) : (
                "Se connecter"
              )}
            </Button>
        </form>
        </Form>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" disabled={isPending} onClick={() => handleSocialLogin('google')}> 
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
            </Button>
            <Button variant="outline" type="button" disabled={isPending} onClick={() => handleSocialLogin('apple')}> 
                <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.87 1.61.21 2.86.81 3.66 1.98-3.12 1.86-2.61 6.27.42 7.8-.62 1.63-1.49 3.23-2.81 3.32zM12.94 5.68c.72-1 1.34-2.28 1.15-3.68-1.18.06-2.58.79-3.29 1.83-.65.92-1.17 2.27-1.01 3.57 1.32.1 2.53-.72 3.15-1.72z" />
                </svg>
                Apple
            </Button>
        </div>
    </div>
  )
}

export function LoginForm() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginFormContent />
    </Suspense>
  )
}
