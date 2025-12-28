'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { completeOAuthProfile } from '@/lib/actions/auth'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, User, MapPin, Phone as PhoneIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
})

export function CompleteProfileForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true)
  
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
    },
    mode: 'onChange',
  })

  // Charger les données du profil (créé par le trigger)
  useEffect(() => {
    async function loadUserData() {
      try {
        console.log('[COMPLETE PROFILE] Chargement des données utilisateur...')
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
          console.error('[COMPLETE PROFILE] Erreur chargement user:', error)
          toast.error('Session expirée. Veuillez vous reconnecter.')
          router.push('/login')
          return
        }

        console.log('[COMPLETE PROFILE] User metadata:', user.user_metadata)

        // IMPORTANT: Charger le profil depuis la DB (créé par le trigger)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone, country')
          .eq('id', user.id)
          .single()

        console.log('[COMPLETE PROFILE] Profil DB:', profile)

        // Données du profil DB (priorité)
        const dbFirstName = profile?.first_name || ''
        const dbLastName = profile?.last_name || ''
        const dbPhone = profile?.phone || ''
        const dbCountry = profile?.country || ''

        // Fallback sur user_metadata si le profil est vide
        const googleFirstName = user.user_metadata?.given_name || user.user_metadata?.first_name || ''
        const googleLastName = user.user_metadata?.family_name || user.user_metadata?.last_name || ''
        const googlePhone = user.user_metadata?.phone || user.user_metadata?.phone_number || ''

        // Parser full_name si nécessaire (dernier mot = nom)
        let parsedFirstName = ''
        let parsedLastName = ''
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || ''
        if (fullName) {
          const parts = fullName.split(' ')
          if (parts.length >= 2) {
            parsedFirstName = parts.slice(0, -1).join(' ')
            parsedLastName = parts[parts.length - 1]
          } else {
            parsedFirstName = parts[0] || ''
          }
        }

        // Utiliser les données dans l'ordre : DB > user_metadata > parsed
        const firstName = dbFirstName || googleFirstName || parsedFirstName
        const lastName = dbLastName || googleLastName || parsedLastName
        const phone = dbPhone || googlePhone
        const country = dbCountry || 'GA'

        // Pré-remplir le formulaire
        if (firstName) form.setValue('firstName', firstName)
        if (lastName) form.setValue('lastName', lastName)
        if (phone) form.setValue('phone', phone)
        form.setValue('country', country)

        console.log('[COMPLETE PROFILE] Formulaire pré-rempli:', {
          firstName,
          lastName,
          phone,
          country
        })

        setIsLoading(false)
      } catch (error) {
        console.error('[COMPLETE PROFILE] Erreur inattendue:', error)
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [form, router])

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        console.log('[COMPLETE PROFILE] Soumission:', values)

        const formData = new FormData()
        formData.append('firstName', values.firstName)
        formData.append('lastName', values.lastName)
        formData.append('country', values.country)
        formData.append('phone', values.phone)
        formData.append('role', 'patient') // Toujours patient par défaut

        const result = await completeOAuthProfile(formData)

        if (result?.error) {
          console.error('[COMPLETE PROFILE] Erreur:', result.error)
          toast.error("Erreur", {
            description: result.error,
            duration: 6000,
          })
          return
        }

        // Succès - rediriger vers la page success
        console.log('[COMPLETE PROFILE] Profil complété avec succès')
        toast.success("Profil complété !", {
          description: "Bienvenue sur MediBridge",
        })

        // IMPORTANT: Redirection vers success page (qui redirigera ensuite vers /patient)
        router.push('/success?redirect=/patient')
      } catch (error) {
        console.error('[COMPLETE PROFILE] Erreur inattendue:', error)
        toast.error("Erreur inattendue", {
          description: "Une erreur technique s'est produite. Veuillez réessayer.",
          duration: 5000,
        })
      }
    })
  }

  if (isLoading) {
    return (
      <Card className="border-none shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-sm text-muted-foreground">Chargement de vos informations...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Complétez votre profil
        </CardTitle>
        <CardDescription className="text-sm">
          Ces informations nous permettent de mieux vous accompagner dans vos soins.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-left">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-blue-600" />
                      Prénom <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre prénom"
                        {...field}
                        className="h-10 bg-muted/30"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-blue-600" />
                      Nom <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom"
                        {...field}
                        className="h-10 bg-muted/30"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    Pays de résidence <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="h-10 bg-muted/30">
                        <SelectValue placeholder="Sélectionnez votre pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
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
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center gap-1.5">
                    <PhoneIcon className="h-3.5 w-3.5 text-blue-600" />
                    Numéro de téléphone <span className="text-red-500">*</span>
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mb-2">WhatsApp recommandé pour les notifications</p>
                  <FormControl>
                    <PhoneInput
                      international
                      defaultCountry={form.watch('country') as any}
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      disabled={isPending}
                      className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Vous pouvez modifier ces informations plus tard dans votre profil.
              </p>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11 text-base font-medium shadow-md hover:shadow-lg transition-all"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enregistrement en cours...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-5 w-5" />
                    Accéder à mon espace patient
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
