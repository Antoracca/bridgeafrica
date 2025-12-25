'use client'

import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, UploadCloud, FileText, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createMedicalCase } from '@/lib/actions/cases'
import { toast } from "sonner"

const formSchema = z.object({
  diagnosis: z.string().min(5, {
    message: "Le titre du diagnostic est requis.",
  }),
  specialty: z.string().min(1, {
    message: "Veuillez sélectionner une spécialité.",
  }),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(20, {
    message: "La description doit contenir au moins 20 caractères.",
  }),
  symptoms: z.string().optional(),
  budget: z.string().optional(),
  travelDate: z.date().optional(),
})

export function MedicalCaseForm() {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urgency: "medium",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData()
      // Append all fields manually for the server action
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value.toString())
      })

      try {
        await createMedicalCase(formData)
        toast.success("Dossier créé avec succès")
      } catch (error) {
        toast.error("Erreur lors de la création du dossier")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* SECTION 1: INFO MÉDICALES */}
        <div className="space-y-4 rounded-lg border p-4 shadow-sm bg-card">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium">Informations Médicales</h3>
            <p className="text-sm text-muted-foreground">
              Détaillez la condition médicale pour orienter les médecins.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du Diagnostic / Motif</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cardiopathie ischémique..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialité Requise</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cardiologie">Cardiologie</SelectItem>
                      <SelectItem value="oncologie">Oncologie</SelectItem>
                      <SelectItem value="neurologie">Neurologie</SelectItem>
                      <SelectItem value="orthopedie">Orthopédie</SelectItem>
                      <SelectItem value="ophtalmologie">Ophtalmologie</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Niveau d&apos;Urgence</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50">
                      <FormControl>
                        <RadioGroupItem value="low" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Faible (Planifié)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50">
                      <FormControl>
                        <RadioGroupItem value="medium" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Moyenne
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border border-orange-200 bg-orange-50/50 p-3 hover:bg-orange-100/50 dark:border-orange-900 dark:bg-orange-950/20">
                      <FormControl>
                        <RadioGroupItem value="high" className="text-orange-500" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-orange-700 dark:text-orange-400">
                        Élevée (Urgent)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border border-red-200 bg-red-50/50 p-3 hover:bg-red-100/50 dark:border-red-900 dark:bg-red-950/20">
                      <FormControl>
                        <RadioGroupItem value="critical" className="text-red-500" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-red-700 dark:text-red-400">
                        Critique (Immédiat)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Histoire de la maladie</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez l'historique, les traitements actuels, et l'objectif de l'évacuation..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECTION 2: DOCUMENTS */}
        <div className="space-y-4 rounded-lg border p-4 shadow-sm bg-card">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium">Documents & Pièces Jointes</h3>
            <p className="text-sm text-muted-foreground">
              Comptes rendus, imagerie, analyses (PDF, JPG, DICOM).
            </p>
          </div>
          
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted dark:hover:bg-muted/80 border-muted-foreground/25 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                </p>
                <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 10MB)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" multiple />
            </label>
          </div>
        </div>

        {/* SECTION 3: LOGISTIQUE */}
        <div className="space-y-4 rounded-lg border p-4 shadow-sm bg-card">
          <div className="border-b pb-2">
            <h3 className="text-lg font-medium">Logistique & Préférences</h3>
            <p className="text-sm text-muted-foreground">
              Pour nous aider à organiser votre séjour.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Estimatif (Optionnel)</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Input placeholder="0.00" {...field} className="pl-8" />
                        <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">€</span>
                    </div>
                  </FormControl>
                  <FormDescription>Indicatif pour orienter le choix des cliniques.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="travelDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de voyage souhaitée</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>Annuler</Button>
            <Button type="submit" disabled={isPending} className="min-w-[150px]">
            {isPending ? (
                <>Envoi en cours...</>
            ) : (
                <>Soumettre le dossier</>
            )}
            </Button>
        </div>
      </form>
    </Form>
  )
}
