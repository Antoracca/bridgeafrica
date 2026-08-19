'use client'

import { useTransition, useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  CalendarIcon,
  UploadCloud,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  File,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Euro,
  Users,
  Heart,
  Brain,
  Eye,
  Bone,
  Activity,
  Pill,
  ShieldCheck,
  User,
  Sparkles
} from "lucide-react"

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
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const formSchema = z.object({
  // Patient Info
  patientName: z.string().optional(),
  patientAge: z.string().min(1, "L'âge est requis"),
  patientGender: z.enum(["male", "female", "other"]),

  // Medical Info
  diagnosis: z.string().min(4, "Le motif ou diagnostic est requis"),
  specialty: z.string().min(1, "Sélectionnez une spécialité"),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(10, "Description requise (min. 10 caractères)"),
  symptoms: z.string().optional(),
  currentTreatment: z.string().optional(),

  // Preferences
  budget: z.string().optional(),
  travelDate: z.date().optional(),
  preferredDestination: z.string().optional(),
  needsVisa: z.boolean(),
  accompaniedBy: z.string().optional(),
})

const specialties = [
  { value: "cardiologie", label: "Cardiologie", icon: Heart },
  { value: "neurologie", label: "Neurologie", icon: Brain },
  { value: "ophtalmologie", label: "Ophtalmologie", icon: Eye },
  { value: "orthopedie", label: "Orthopédie", icon: Bone },
  { value: "oncologie", label: "Oncologie", icon: Activity },
  { value: "autre", label: "Autre spécialité", icon: Pill },
]

const destinations = [
  { value: "tunisie", label: "Tunisie", code: "TN", desc: "Cliniques de référence • Tarifs compétitifs" },
  { value: "turquie", label: "Turquie", code: "TR", desc: "Plateaux de haute technologie • Expertise chirurgicale" },
  { value: "maroc", label: "Maroc", code: "MA", desc: "Proximité francophone • Centres accrédités" },
  { value: "france", label: "France", code: "FR", desc: "Pôles universitaires de pointe • Standards européens" },
  { value: "espagne", label: "Espagne", code: "ES", desc: "Médecine spécialisée • Équipements récents" },
]

export function MedicalCaseForm() {
  const [isPending, startTransition] = useTransition()
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [userProfileName, setUserProfileName] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientAge: "",
      urgency: "medium",
      patientGender: "male",
      needsVisa: false,
    },
  })

  // Chargement automatique du nom et prénom du profil patient
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single<any>()

          let name = ""
          if (profile?.first_name || profile?.last_name) {
            name = `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
          } else {
            name = user.user_metadata?.full_name || user.user_metadata?.first_name || user.email?.split('@')[0] || ""
          }

          if (name) {
            setUserProfileName(name)
            form.setValue('patientName', name)
          }
        }
      } catch (err) {
        console.error("Erreur chargement profil :", err)
      }
    }
    loadUserProfile()
  }, [form])

  const totalSteps = 5

  // Système de progression dynamique et palette de couleurs standard (Orange -> Jaune -> Bleu -> Vert)
  // Étape 1 : 0% à 25% (Orange)
  // Étape 2 : 25% à 50% (Jaune)
  // Étape 3 : 50% à 75% (Bleu)
  // Étape 4 & 5 : 75% à 100% (Vert)
  const getProgressInfo = (step: number) => {
    switch (step) {
      case 1:
        return { percent: 0, color: "bg-orange-500", text: "text-orange-600" }
      case 2:
        return { percent: 25, color: "bg-amber-500", text: "text-amber-600" }
      case 3:
        return { percent: 50, color: "bg-blue-600", text: "text-blue-600" }
      case 4:
        return { percent: 75, color: "bg-emerald-500", text: "text-emerald-600" }
      case 5:
      default:
        return { percent: 100, color: "bg-emerald-600", text: "text-emerald-700" }
    }
  }

  const progressInfo = getProgressInfo(currentStep)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-slate-700" />
    return <File className="w-5 h-5 text-slate-700" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString())
          } else {
            formData.append(key, String(value))
          }
        }
      })

      uploadedFiles.forEach(file => {
        formData.append('files', file)
      })

      const result = await createMedicalCase(formData)

      if (result?.error) {
        toast.error("Erreur", { description: result.error })
      } else {
        toast.success("Dossier créé avec succès !", {
          description: "Notre collège médical analyse votre demande sous 24h."
        })
        form.reset()
        setUploadedFiles([])
        setCurrentStep(1)
      }
    })
  }

  const steps = [
    { number: 1, title: "Patient" },
    { number: 2, title: "Diagnostic" },
    { number: 3, title: "Documents" },
    { number: 4, title: "Voyage" },
    { number: 5, title: "Validation" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Conteneur principal unique sur toute la largeur */}
      <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[36px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-8">
        
        {/* Une seule barre de progression épurée */}
        <div className="space-y-4 border-b border-[#E2DDD7] pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#696969] uppercase tracking-wider">
                Étape {currentStep} sur {totalSteps} — {steps[currentStep - 1].title}
              </span>
              <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
                {currentStep === 1 && "Informations du Patient"}
                {currentStep === 2 && "Diagnostic & Pathologie"}
                {currentStep === 3 && "Examens & Documents Médicaux"}
                {currentStep === 4 && "Préférences de Destination & Voyage"}
                {currentStep === 5 && "Vérification & Validation"}
              </h2>
            </div>

            <div className="text-right">
              <span className={`text-lg font-mono font-bold ${progressInfo.text}`}>
                {progressInfo.percent}%
              </span>
            </div>
          </div>

          {/* Jauge de progression unique avec changement de couleur dynamique */}
          <div className="w-full h-2 bg-[#EAE7E1] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-colors duration-500 ${progressInfo.color}`}
              initial={{ width: "0%" }}
              animate={{ width: `${progressInfo.percent}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Stepper textuel simple */}
          <div className="grid grid-cols-5 gap-2 pt-1">
            {steps.map((step) => {
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="text-center">
                  <span className={cn(
                    "text-xs transition-colors block truncate",
                    isActive ? "text-[#141413] font-semibold" : isCompleted ? "text-[#696969]" : "text-[#A8A29A]"
                  )}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Formulaire avec transition fluide slow-motion */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Étape 1 : Patient Info avec nom et prénom pré-remplis */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Nom & Prénom pré-remplis */}
                    <div className="p-5 rounded-[24px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#E2DDD7] flex items-center justify-center text-[#141413] shrink-0">
                          <User className="w-5 h-5 text-[#CF4500]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-medium text-[#857F78] uppercase block">
                            Patient Titulaire du Dossier
                          </span>
                          <p className="font-semibold text-base text-[#141413]">
                            {userProfileName || "Patient Référencé"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-[#696969] font-medium hidden sm:inline-block">
                        Profil vérifié
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="patientAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#141413]">Âge du patient</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Ex: 45" 
                                {...field} 
                                className="h-12 rounded-[20px] bg-white border-[#E2DDD7] text-sm font-medium focus-visible:ring-[#141413]" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="patientGender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#141413]">Genre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-[20px] bg-white border-[#E2DDD7] text-sm font-medium">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-[20px]">
                                <SelectItem value="male">Masculin</SelectItem>
                                <SelectItem value="female">Féminin</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Étape 2 : Diagnostic & Spécialité */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="diagnosis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#141413]">Motif ou Diagnostic principal</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: Remplacement valvulaire aortique ou Gonarthrose bilatérale"
                              {...field}
                              className="h-12 rounded-[20px] bg-white border-[#E2DDD7] text-sm font-medium focus-visible:ring-[#141413]"
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-[#696969]">Intitulé médical ou résumé des symptômes principaux</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#141413]">Spécialité Médicale</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {specialties.map((spec) => {
                              const Icon = spec.icon
                              const isSelected = field.value === spec.value
                              return (
                                <button
                                  key={spec.value}
                                  type="button"
                                  onClick={() => field.onChange(spec.value)}
                                  className={cn(
                                    "flex items-center gap-3 p-4 rounded-[20px] border transition-all text-left",
                                    isSelected
                                      ? "border-[#141413] bg-[#141413] text-[#F3F0EE]"
                                      : "border-[#E2DDD7] hover:border-[#141413]/40 bg-white text-[#141413]"
                                  )}
                                >
                                  <Icon className={cn(
                                    "w-5 h-5 shrink-0",
                                    isSelected ? "text-[#CF4500]" : "text-[#696969]"
                                  )} />
                                  <span className="text-xs font-semibold">
                                    {spec.label}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#141413]">Degré d'urgence</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 md:grid-cols-4 gap-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-[20px] border border-[#E2DDD7] bg-white p-4 hover:bg-[#F4F2EE] cursor-pointer">
                                <FormControl>
                                  <RadioGroupItem value="low" />
                                </FormControl>
                                <FormLabel className="font-semibold cursor-pointer flex-1 text-xs">
                                  <div className="text-[#141413] font-semibold">Programmable</div>
                                  <div className="text-[#696969] text-[11px]">Non urgent</div>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-[20px] border border-[#E2DDD7] bg-white p-4 hover:bg-[#F4F2EE] cursor-pointer">
                                <FormControl>
                                  <RadioGroupItem value="medium" />
                                </FormControl>
                                <FormLabel className="font-semibold cursor-pointer flex-1 text-xs">
                                  <div className="text-[#141413] font-semibold">Moyen</div>
                                  <div className="text-[#696969] text-[11px]">Sous 30 jours</div>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-[20px] border border-amber-300 bg-amber-50/50 p-4 hover:bg-amber-50 cursor-pointer">
                                <FormControl>
                                  <RadioGroupItem value="high" />
                                </FormControl>
                                <FormLabel className="font-semibold cursor-pointer flex-1 text-xs">
                                  <div className="text-amber-900 font-semibold">Élevé</div>
                                  <div className="text-amber-700 text-[11px]">Sous 7 jours</div>
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-[20px] border border-red-300 bg-red-50/50 p-4 hover:bg-red-50 cursor-pointer">
                                <FormControl>
                                  <RadioGroupItem value="critical" />
                                </FormControl>
                                <FormLabel className="font-semibold cursor-pointer flex-1 text-xs">
                                  <div className="text-red-900 font-semibold">Critique</div>
                                  <div className="text-red-700 text-[11px]">Évacuation prioritaire</div>
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
                          <FormLabel className="text-xs font-semibold text-[#141413]">Historique clinique & Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Détaillez les antécédents médicaux, les symptômes actuels et les traitements antérieurs..."
                              className="min-h-[130px] rounded-[20px] bg-white border-[#E2DDD7] text-sm font-medium resize-none focus-visible:ring-[#141413]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Étape 3 : Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={cn(
                        "relative border-2 border-dashed rounded-[28px] p-8 transition-all text-center",
                        dragActive
                          ? "border-[#141413] bg-[#F4F2EE]"
                          : "border-[#E2DDD7] hover:border-[#141413]/40 bg-white"
                      )}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png,.dicom,.doc,.docx"
                      />
                      <div className="w-12 h-12 rounded-full bg-[#F4F2EE] border border-[#E2DDD7] flex items-center justify-center mx-auto mb-3 text-[#141413]">
                        <UploadCloud className="w-6 h-6 text-[#CF4500]" />
                      </div>
                      <h4 className="font-semibold text-[#141413] text-sm mb-1">
                        Déposer vos examens et documents médicaux
                      </h4>
                      <p className="text-xs text-[#696969] mb-3">
                        Glissez-déposez vos fichiers ou parcourez votre appareil
                      </p>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#857F78] font-mono">
                        <span>PDF, DICOM, JPG, PNG</span>
                        <span>• Max 15 MB par fichier</span>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-semibold text-[#696969] uppercase tracking-wider">
                            Fichiers ajoutés ({uploadedFiles.length})
                          </h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setUploadedFiles([])}
                            className="text-[#696969] hover:text-[#141413] text-xs font-semibold rounded-full h-8"
                          >
                            Effacer tout
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3.5 bg-white rounded-[20px] border border-[#E2DDD7]"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {getFileIcon(file)}
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-[#141413] truncate">{file.name}</p>
                                  <p className="text-[11px] text-[#696969] font-mono">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(index)}
                                className="text-[#857F78] hover:text-[#141413] rounded-full h-8 w-8 shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Étape 4 : Destination & Voyage */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="preferredDestination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-[#141413]">Destination souhaitée</FormLabel>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {destinations.map((dest) => {
                              const isSelected = field.value === dest.value
                              return (
                                <button
                                  key={dest.value}
                                  type="button"
                                  onClick={() => field.onChange(dest.value)}
                                  className={cn(
                                    "flex items-start gap-3.5 p-4 rounded-[20px] border transition-all text-left",
                                    isSelected
                                      ? "border-[#141413] bg-[#141413] text-[#F3F0EE]"
                                      : "border-[#E2DDD7] hover:border-[#141413]/40 bg-white text-[#141413]"
                                  )}
                                >
                                  <span className={cn(
                                    "w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border",
                                    isSelected ? "bg-white text-[#141413] border-white" : "bg-[#F4F2EE] text-[#141413] border-[#E2DDD7]"
                                  )}>
                                    {dest.code}
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold">
                                      {dest.label}
                                    </div>
                                    <div className={cn(
                                      "text-xs mt-0.5",
                                      isSelected ? "text-[#D1CDC7]" : "text-[#696969]"
                                    )}>
                                      {dest.desc}
                                    </div>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#141413]">Budget indicatif (EUR, optionnel)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Euro className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#857F78]" />
                                <Input
                                  type="number"
                                  placeholder="Ex: 6000"
                                  {...field}
                                  className="h-12 pl-10 rounded-[20px] bg-white border-[#E2DDD7] text-sm font-medium focus-visible:ring-[#141413]"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="travelDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-[#141413]">Date de départ souhaitée</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full h-12 pl-3 text-left font-medium rounded-[20px] bg-white border-[#E2DDD7] text-sm",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-[#857F78]" />
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: fr })
                                    ) : (
                                      <span>Sélectionner une date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 rounded-[24px]" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
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
                )}

                {/* Étape 5 : Résumé & Mentions légales en bas */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F4F2EE] rounded-[24px] p-5 border border-[#E2DDD7] space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#857F78] uppercase">Patient</span>
                        <p className="font-semibold text-[#141413] text-sm">{userProfileName || "Patient"}</p>
                        <p className="text-xs text-[#696969]">{form.getValues('patientAge')} ans • Genre : {form.getValues('patientGender') === 'male' ? 'Masculin' : form.getValues('patientGender') === 'female' ? 'Féminin' : 'Autre'}</p>
                      </div>

                      <div className="bg-[#F4F2EE] rounded-[24px] p-5 border border-[#E2DDD7] space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#857F78] uppercase">Diagnostic & Spécialité</span>
                        <p className="font-semibold text-[#141413] text-sm">{form.getValues('diagnosis')}</p>
                        <p className="text-xs text-[#696969]">Spécialité : {form.getValues('specialty')} • Urgence : {form.getValues('urgency')}</p>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="bg-[#F4F2EE] rounded-[24px] p-5 border border-[#E2DDD7] space-y-2">
                        <span className="text-[10px] font-mono font-bold text-[#857F78] uppercase">Documents joints ({uploadedFiles.length})</span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {uploadedFiles.map((file, index) => (
                            <span key={index} className="text-xs font-semibold px-3 py-1 bg-white rounded-full border border-[#E2DDD7] text-[#141413]">
                              {file.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mentions légales de sécurité médicale et HDS directement sur la page en résumé */}
                    <div className="pt-4 border-t border-[#E2DDD7] space-y-2 text-xs text-[#696969] leading-relaxed">
                      <div className="flex items-center gap-2 text-[#141413] font-semibold">
                        <ShieldCheck className="w-4 h-4 text-[#CF4500]" />
                        <span>Garantie de Sécurité & Secret Médical — Pont Afrique Santé</span>
                      </div>
                      <p>
                        En soumettant ce formulaire, vos données cliniques et pièces jointes sont hébergées conformément aux normes HDS (Hébergement de Données de Santé) avec chiffrement de bout en bout. Elles ne sont transmises qu'aux praticiens accrédités et aux établissements de soins sélectionnés.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#E2DDD7]">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="h-12 px-6 rounded-full border-[#E2DDD7] text-[#141413] hover:bg-[#F4F2EE] text-xs font-semibold shadow-none"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-12 px-8 bg-[#141413] hover:bg-[#2c2b29] text-[#F3F0EE] rounded-full text-xs font-semibold shadow-none transition-all"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-12 px-8 bg-[#141413] hover:bg-[#2c2b29] text-[#F3F0EE] rounded-full text-xs font-semibold shadow-none transition-all"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Transmission en cours...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <span>Transmettre mon dossier</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
