'use client'

import { useTransition, useState, useRef, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { updateProfile, uploadProfilePicture, deleteProfilePicture } from "@/lib/actions/auth"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Heart,
  Upload,
  Camera,
  Loader2,
  Check,
  AlertCircle,
  Globe,
  Droplet,
  Pill,
  FileText,
  Bell
} from "lucide-react"
import countries from 'world-countries'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const profileFormSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email().optional(),
  phone: z.string().refine((value) => {
    if (!value) return true // Optional
    try {
      return isValidPhoneNumber(value)
    } catch {
      return false
    }
  }, { message: "Numéro de téléphone invalide" }),

  // Location
  country: z.string().min(2, "Veuillez sélectionner un pays"),
  city: z.string().optional(),

  // Medical Info
  allergies: z.string().optional(),
  bloodType: z.string().optional(),
  medicalHistory: z.string().optional(),

  // Communication Preferences
  notificationPreference: z.enum(["email", "sms", "whatsapp", "all"]).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface PatientProfile {
  first_name?: string
  last_name?: string
  phone?: string
  country?: string
  city?: string
  allergies?: string
  blood_type?: string
  medical_history?: string
  notification_preference?: string
  avatar_url?: string
}

export function PatientProfileForm({ profile, email }: { profile: PatientProfile, email?: string }) {
  const [isPending, startTransition] = useTransition()
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>(profile?.avatar_url || '')
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Liste complète des pays
  const countryOptions = countries
    .map(country => ({
      code: country.cca2,
      name: country.name.common,
      flag: country.flag,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      email: email || "",
      phone: profile?.phone || "",
      country: profile?.country || "",
      city: profile?.city || "",
      allergies: profile?.allergies || "",
      bloodType: profile?.blood_type || "",
      medicalHistory: profile?.medical_history || "",
      notificationPreference: (profile?.notification_preference as "email" | "sms" | "whatsapp" | "all") || "email",
    },
    mode: "onChange",
  })

  const selectedCountry = form.watch('country')

  // Handle photo deletion
  const handleDeletePhoto = useCallback(async () => {
    setIsUploadingPhoto(true)
    try {
      const result = await deleteProfilePicture()
      if (result.error) {
        toast.error(result.error)
      } else {
        setAvatarUrl('')
        setAvatarPreview('')
        if (fileInputRef.current) fileInputRef.current.value = ''
        toast.success('Photo de profil supprimée')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Erreur lors de la suppression de la photo')
    } finally {
      setIsUploadingPhoto(false)
    }
  }, [])

  // Handle photo selection
  const handlePhotoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5 MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload photo
    setIsUploadingPhoto(true)
    const formData = new FormData()
    formData.append('file', file)

    uploadProfilePicture(formData)
      .then((result) => {
        if (result.error) {
          toast.error(result.error)
          setAvatarPreview('')
        } else if (result.url) {
          setAvatarUrl(result.url)
          toast.success('Photo de profil mise à jour')
        }
      })
      .catch((error) => {
        console.error('Upload error:', error)
        toast.error('Erreur lors de l\'upload de la photo')
        setAvatarPreview('')
      })
      .finally(() => {
        setIsUploadingPhoto(false)
      })
  }, [])

  function onSubmit(values: ProfileFormValues) {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      if (values.phone) formData.append('phone', values.phone)
      formData.append('country', values.country)
      if (values.city) formData.append('city', values.city)
      if (values.allergies) formData.append('allergies', values.allergies)
      if (values.bloodType) formData.append('bloodType', values.bloodType)
      if (values.medicalHistory) formData.append('medicalHistory', values.medicalHistory)
      if (values.notificationPreference) formData.append('notificationPreference', values.notificationPreference)

      const result = await updateProfile(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Profil mis à jour avec succès")
      }
    })
  }

  const getInitials = () => {
    const firstName = form.getValues('firstName')
    const lastName = form.getValues('lastName')
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo de Profil Section */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Camera className="w-5 h-5 text-blue-600" />
              Photo de Profil
            </CardTitle>
            <CardDescription>
              Ajoutez une photo pour personnaliser votre profil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Display */}
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-blue-100 shadow-lg">
                  {(avatarPreview || avatarUrl) && (
                    <AvatarImage
                      src={avatarPreview || avatarUrl}
                      alt="Photo de profil"
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>

                {isUploadingPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}

                {/* Upload Button Overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-all rounded-full cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Upload Instructions */}
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1">
                    Téléchargez une photo claire de vous
                  </h4>
                  <p className="text-xs text-slate-600">
                    Format : JPG, PNG • Taille max : 5 MB • Recommandé : 400x400px
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingPhoto}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    {isUploadingPhoto ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Upload en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Choisir une photo
                      </>
                    )}
                  </Button>

                  {(avatarUrl || avatarPreview) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleDeletePhoto}
                      disabled={isUploadingPhoto}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      {isUploadingPhoto ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Suppression...
                        </>
                      ) : (
                        'Supprimer'
                      )}
                    </Button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations Personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="w-5 h-5 text-blue-600" />
              Informations Personnelles
            </CardTitle>
            <CardDescription>
              Vos informations d'identité et de contact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-600" />
                      Prénom <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-600" />
                      Nom <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-600" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="exemple@email.com" disabled {...field} className="h-11 bg-slate-50" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      L'email ne peut pas être modifié ici
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-600" />
                      Téléphone
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry={selectedCountry as any}
                        value={field.value}

                        onChange={(value) => field.onChange(value || '')}
                        disabled={isPending}
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      WhatsApp recommandé pour les notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Informations de Résidence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="w-5 h-5 text-blue-600" />
              Lieu de Résidence
            </CardTitle>
            <CardDescription>
              Où vivez-vous actuellement ?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-600" />
                      Pays de résidence <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger className="h-11">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-600" />
                      Ville
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Libreville" {...field} className="h-11" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Votre ville de résidence (optionnel)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Informations Médicales */}
        <Card className="border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Heart className="w-5 h-5 text-purple-600" />
              Informations Médicales
            </CardTitle>
            <CardDescription>
              Ces informations aident nos partenaires médicaux à mieux vous prendre en charge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-red-600" />
                    Groupe Sanguin (Optionnel)
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Sélectionnez votre groupe sanguin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-amber-600" />
                    Allergies Connues (Optionnel)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex : Pénicilline, Aspirine, Arachides, Latex..."
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 text-amber-600" />
                    Listez toutes vos allergies médicamenteuses et alimentaires
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Antécédents Médicaux (Optionnel)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex : Diabète de type 2, Hypertension artérielle, Chirurgie de l'appendicite en 2015..."
                      className="resize-none h-28"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Maladies chroniques, opérations passées, traitements en cours
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Préférences de Communication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Bell className="w-5 h-5 text-blue-600" />
              Préférences de Communication
            </CardTitle>
            <CardDescription>
              Comment souhaitez-vous recevoir vos notifications ?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="notificationPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canal de notification préféré</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Choisissez votre préférence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>Email uniquement</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>SMS uniquement</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="whatsapp">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          <span>Tous les canaux</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    Nous respectons votre choix et ne vous enverrons que des notifications importantes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Submit Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Vos données sont sécurisées</p>
              <p className="text-blue-700 text-xs">
                Ces informations sont chiffrées et partagées uniquement avec vos médecins
              </p>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isPending || isUploadingPhoto}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-11 px-8 font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Mise à jour...
              </>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
