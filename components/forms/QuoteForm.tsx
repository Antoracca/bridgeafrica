'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from "date-fns"
import { CalendarIcon, Euro, FileSpreadsheet } from "lucide-react"

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"

const quoteSchema = z.object({
  treatment: z.string().min(10, {
    message: "La description du traitement doit être détaillée.",
  }),
  duration: z.string().min(1, {
    message: "Durée estimée requise.",
  }),
  medicalCost: z.string().min(1, "Coût requis"),
  accommodationCost: z.string().optional(),
  logisticsCost: z.string().optional(),
  validUntil: z.date(),
  notes: z.string().optional(),
})

export function QuoteForm() {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      medicalCost: "",
      accommodationCost: "",
      logisticsCost: "",
    },
  })

  // Calcul du total en temps réel
  const medical = parseFloat(form.watch("medicalCost") || "0")
  const accommodation = parseFloat(form.watch("accommodationCost") || "0")
  const logistics = parseFloat(form.watch("logisticsCost") || "0")
  const total = medical + accommodation + logistics

  function onSubmit(values: z.infer<typeof quoteSchema>) {
    startTransition(async () => {
      // Simulation d'envoi
      console.log("Devis soumis:", { ...values, total })
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Devis envoyé au patient avec succès !")
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <FormField
            control={form.control}
            name="treatment"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Protocole de Traitement</FormLabel>
                <FormControl>
                <Textarea 
                    placeholder="Détaillez les actes médicaux (ex: Coronarographie, Pose de Stents, Hospitalisation 48h...)" 
                    className="min-h-25"
                    {...field} 
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Durée d&apos;hospitalisation (jours)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="ex: 5" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Devis valable jusqu&apos;au</FormLabel>
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
                            format(field.value, "PPP")
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

        <div className="rounded-lg border p-4 bg-muted/20 space-y-4">
            <h4 className="font-medium flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Détail des Coûts
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="medicalCost"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Frais Médicaux (€)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accommodationCost"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Hébergement (€)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="logisticsCost"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Logistique / Autres (€)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold text-lg">Total Estimé</span>
                <span className="font-bold text-2xl text-primary">{total.toFixed(2)} €</span>
            </div>
        </div>

        <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Notes Complémentaires</FormLabel>
                <FormControl>
                <Textarea 
                    placeholder="Conditions particulières, acomptes..." 
                    {...field} 
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending ? "Envoi en cours..." : (
                <span className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Envoyer le Devis
                </span>
            )}
        </Button>
      </form>
    </Form>
  )
}
