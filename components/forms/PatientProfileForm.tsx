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
  Bell,
  Lock
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

  // Liste complète des pays avec code ISO
  const countryOptions = countries
    .map(country => ({
      code: country.cca2,
      name: country.name.common,
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

  // Handle photo selection and upload
  const handlePhotoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validation
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image valide')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La taille de l\'image ne doit pas dépasser 5 MB')
      return
    }

    // Preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setIsUploadingPhoto(true)
    const formData = new FormData()
    formData.append('avatar', file)

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
        toast.error('Erreur lors du téléchargement de la photo')
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
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">Photo de Profil</h3>
            <p className="text-xs text-slate-500 mt-0.5">Personnalisez votre avatar patient</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-slate-200">
                {(avatarPreview || avatarUrl) && (
                  <AvatarImage
                    src={avatarPreview || avatarUrl}
                    alt="Photo de profil"
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-2xl font-black bg-slate-950 text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              {isUploadingPhoto && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div>
                <p className="text-xs font-bold text-slate-900">Format JPG, PNG • Max 5 MB</p>
                <p className="text-[11px] text-slate-400">Photo claire de face recommandée.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="rounded-full border-slate-200 text-slate-900 hover:bg-slate-100 text-xs font-semibold h-9 px-4"
                >
                  <Camera className="w-3.5 h-3.5 mr-1.5" />
                  Choisir une photo
                </Button>

                {(avatarUrl || avatarPreview) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleDeletePhoto}
                    disabled={isUploadingPhoto}
                    className="rounded-full text-slate-500 hover:text-rose-600 text-xs font-semibold h-9 px-3"
                  >
                    Supprimer
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
        </div>

        {/* Informations Personnelles */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">Identité & Coordonnées</h3>
            <p className="text-xs text-slate-500 mt-0.5">Informations requises pour vos dossiers et devis</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700">Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean" {...field} className="h-12 rounded-2xl border-slate-200 text-sm font-medium" />
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
                  <FormLabel className="text-xs font-bold text-slate-700">Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Dupont" {...field} className="h-12 rounded-2xl border-slate-200 text-sm font-medium" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700">Email de connexion</FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@email.com" disabled {...field} className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700">Numéro de téléphone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      international
                      defaultCountry={selectedCountry as any}
                      value={field.value}
                      onChange={(value) => field.onChange(value || '')}
                      disabled={isPending}
                      className="flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium transition-colors placeholder:text-slate-400 focus-within:ring-2 focus-within:ring-slate-950"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Résidence */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">Résidence</h3>
            <p className="text-xs text-slate-500 mt-0.5">Votre localisation géographique</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700">Pays de résidence</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 text-sm font-medium">
                        <SelectValue placeholder="Sélectionnez votre pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px] rounded-2xl">
                      {countryOptions.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-xs text-slate-400 font-bold">[{c.code}]</span>
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
                  <FormLabel className="text-xs font-bold text-slate-700">Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Libreville" {...field} className="h-12 rounded-2xl border-slate-200 text-sm font-medium" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Données Médicales */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">Informations Médicales Permanentes</h3>
            <p className="text-xs text-slate-500 mt-0.5">Antécédents et éléments de santé pérennes</p>
          </div>

          <div className="space-y-5">
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700">Groupe Sanguin (Optionnel)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 text-sm font-medium">
                        <SelectValue placeholder="Sélectionnez votre groupe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-2xl">
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
                  <FormLabel className="text-xs font-bold text-slate-700">Allergies Connues (Optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex : Pénicilline, Aspirine, Latex, Arachides..."
                      className="resize-none h-24 rounded-2xl border-slate-200 text-sm font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-slate-700">Antécédents Médicaux / Chirurgicaux (Optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex : Diabète de type 2, Hypertension, Chirurgie antérieure..."
                      className="resize-none h-28 rounded-2xl border-slate-200 text-sm font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Bar Revolut */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-950 text-white rounded-3xl">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-white shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">Chiffrement AES-256 HDS</p>
              <p className="text-slate-400 text-[11px]">Vos modifications sont sauvegardées de façon sécurisée.</p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending || isUploadingPhoto}
            className="bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-full h-11 px-8 text-xs shadow-none w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Enregistrement...</span>
              </>
            ) : (
              <span>Enregistrer mon profil</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
