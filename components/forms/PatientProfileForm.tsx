'use client'

import { useTransition } from "react"
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
import { toast } from "sonner"
import { updateProfile } from "@/lib/actions/auth"

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email().optional(),
  phone: z.string().min(8, {
    message: "Numéro de téléphone invalide.",
  }).optional().or(z.literal('')),
  country: z.string().optional(),
  city: z.string().optional(),
  allergies: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface PatientProfile {
  first_name?: string
  last_name?: string
  phone?: string
  country?: string
  city?: string
  allergies?: string
}

export function PatientProfileForm({ profile, email }: { profile: PatientProfile, email?: string }) {
  const [isPending, startTransition] = useTransition()

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
    },
    mode: "onChange",
  })

  function onSubmit(values: ProfileFormValues) {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      if (values.phone) formData.append('phone', values.phone)
      if (values.country) formData.append('country', values.country)
      if (values.city) formData.append('city', values.city)
      if (values.allergies) formData.append('allergies', values.allergies)

      const result = await updateProfile(formData)
      
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Profil mis à jour avec succès")
      }
    })
  }
// ... reste du formulaire identique (render)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                    <Input placeholder="Jean" {...field} />
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
                <FormLabel>Nom</FormLabel>
                <FormControl>
                    <Input placeholder="Dupont" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="exemple@email.com" disabled {...field} />
                </FormControl>
                <FormDescription>
                    L&apos;email ne peut pas être modifié ici.
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
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                    <Input placeholder="+241 ..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays de résidence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gabon">Gabon</SelectItem>
                      <SelectItem value="cameroun">Cameroun</SelectItem>
                      <SelectItem value="senegal">Sénégal</SelectItem>
                      <SelectItem value="cote_ivoire">Côte d&apos;Ivoire</SelectItem>
                      <SelectItem value="congo">Congo</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
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
                <FormLabel>Ville</FormLabel>
                <FormControl>
                    <Input placeholder="Libreville" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies & Antécédents (Optionnel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Pénicilline, Diabète de type 2..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ces informations seront partagées avec les médecins.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
            <Button type="submit">Mettre à jour le profil</Button>
        </div>
      </form>
    </Form>
  )
}
