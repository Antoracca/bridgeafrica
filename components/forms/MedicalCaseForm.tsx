'use client'

import { useTransition, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  CalendarIcon,
  UploadCloud,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  File,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Euro,
  Calendar as CalendarPlus,
  Users,
  Heart,
  Brain,
  Eye,
  Bone,
  Activity,
  Pill,
  Sparkles,
  Info
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { createMedicalCase } from '@/lib/actions/cases'
import { toast } from "sonner"

const formSchema = z.object({
  // Patient Info
  patientAge: z.string().min(1, "L'âge est requis"),
  patientGender: z.enum(["male", "female", "other"]),

  // Medical Info
  diagnosis: z.string().min(5, "Le diagnostic est requis"),
  specialty: z.string().min(1, "Sélectionnez une spécialité"),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(20, "Description trop courte (min. 20 caractères)"),
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
  { value: "tunisie", label: "Tunisie", flag: "🇹🇳", desc: "Cliniques d'excellence • Prix abordables" },
  { value: "turquie", label: "Turquie", flag: "🇹🇷", desc: "Technologies avancées • Expertise reconnue" },
  { value: "maroc", label: "Maroc", flag: "🇲🇦", desc: "Proximité francophone • Qualité de soins" },
  { value: "france", label: "France", flag: "🇫🇷", desc: "Excellence médicale • Normes européennes" },
  { value: "espagne", label: "Espagne", flag: "🇪🇸", desc: "Fertilité & Esthétique • Infrastructures modernes" },
]

export function MedicalCaseForm() {
  const [isPending, startTransition] = useTransition()
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urgency: "medium",
      patientGender: "male",
      needsVisa: false,
    },
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

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
    if (file.type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-blue-500" />
    return <File className="w-8 h-8 text-slate-500" />
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
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = new FormData()

      // Ajout de tous les champs
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString())
          } else {
            formData.append(key, String(value))
          }
        }
      })

      // Ajout des fichiers
      uploadedFiles.forEach(file => {
        formData.append('files', file)
      })

      const result = await createMedicalCase(formData)

      if (result?.error) {
        toast.error("Erreur", { description: result.error })
      } else {
        toast.success("Dossier créé avec succès !", {
          description: "Notre équipe va analyser votre demande sous 24h."
        })
        form.reset()
        setUploadedFiles([])
        setCurrentStep(1)
      }
    })
  }

  // Progress Steps
  const steps = [
    { number: 1, title: "Informations Patient", icon: Users },
    { number: 2, title: "Condition Médicale", icon: Activity },
    { number: 3, title: "Documents", icon: FileText },
    { number: 4, title: "Préférences Voyage", icon: MapPin },
    { number: 5, title: "Validation", icon: CheckCircle2 },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Progression</h3>
              <span className="text-sm font-medium text-blue-600">Étape {currentStep}/{totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2 bg-blue-100" />
          </div>

          {/* Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isActive && "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-110",
                      isCompleted && "bg-green-100 text-green-600",
                      !isActive && !isCompleted && "bg-slate-100 text-slate-400"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs font-medium text-center hidden md:block max-w-[80px]",
                    isActive && "text-blue-600",
                    isCompleted && "text-green-600",
                    !isActive && !isCompleted && "text-slate-400"
                  )}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Patient Info */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Informations Patient
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Renseignez les informations de base du patient
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="patientAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Âge du patient</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 45" {...field} className="h-12" />
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
                    <FormLabel>Sexe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Confidentialité garantie</p>
                  <p className="text-xs text-blue-700">
                    Toutes vos informations sont chiffrées (AES-256) et soumises au secret médical.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medical Condition */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                Condition Médicale
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Décrivez précisément la condition nécessitant des soins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Diagnostic / Motif de consultation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Arthrose sévère genou droit"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormDescription>Soyez précis, cela aidera nos médecins</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Spécialité Médicale</FormLabel>
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
                              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                              isSelected
                                ? "border-blue-600 bg-blue-50 shadow-md"
                                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                            )}
                          >
                            <Icon className={cn(
                              "w-6 h-6",
                              isSelected ? "text-blue-600" : "text-slate-400"
                            )} />
                            <span className={cn(
                              "text-sm font-medium",
                              isSelected ? "text-blue-900" : "text-slate-700"
                            )}>
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
                  <FormItem className="md:col-span-2">
                    <FormLabel>Niveau d'urgence</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border-2 border-slate-200 p-4 hover:bg-slate-50 cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="low" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer flex-1">
                            <div className="text-sm text-slate-700">Faible</div>
                            <div className="text-xs text-slate-500">Planifié</div>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border-2 border-slate-200 p-4 hover:bg-slate-50 cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="medium" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer flex-1">
                            <div className="text-sm text-slate-700">Moyenne</div>
                            <div className="text-xs text-slate-500">{'< 30 jours'}</div>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border-2 border-orange-300 bg-orange-50/50 p-4 hover:bg-orange-50 cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="high" className="text-orange-600" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer flex-1">
                            <div className="text-sm text-orange-700">Élevée</div>
                            <div className="text-xs text-orange-600">{'< 7 jours'}</div>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border-2 border-red-300 bg-red-50/50 p-4 hover:bg-red-50 cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="critical" className="text-red-600" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer flex-1">
                            <div className="text-sm text-red-700">Critique</div>
                            <div className="text-xs text-red-600">Immédiat</div>
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
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez l'historique médical, les symptômes actuels, les traitements déjà essayés..."
                        className="min-h-[140px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Plus vous serez précis, meilleure sera la prise en charge</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentTreatment"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Traitement actuel (optionnel)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Tramadol 50mg, 2x/jour"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Documents Médicaux
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Joignez tous les documents pertinents (radios, analyses, comptes rendus)
              </p>
            </div>

            {/* Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative border-2 border-dashed rounded-xl p-8 transition-all",
                dragActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
              )}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png,.dicom"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                  Glissez-déposez vos fichiers ici
                </h4>
                <p className="text-sm text-slate-500 mb-4">
                  ou cliquez pour parcourir vos fichiers
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Badge variant="outline" className="text-xs">PDF</Badge>
                  <Badge variant="outline" className="text-xs">JPG</Badge>
                  <Badge variant="outline" className="text-xs">PNG</Badge>
                  <Badge variant="outline" className="text-xs">DICOM</Badge>
                  <span>• Max 10 MB par fichier</span>
                </div>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Fichiers joints ({uploadedFiles.length})
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedFiles([])}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Tout supprimer
                  </Button>
                </div>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getFileIcon(file)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Documents recommandés</p>
                  <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                    <li>Ordonnances et compte-rendus médicaux récents</li>
                    <li>Résultats d'analyses (sang, urine, etc.)</li>
                    <li>Imagerie médicale (IRM, Scanner, Radiographies)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Travel Preferences */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Préférences de Voyage
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Aidez-nous à organiser votre séjour médical
              </p>
            </div>

            <FormField
              control={form.control}
              name="preferredDestination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination préférée</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destinations.map((dest) => {
                      const isSelected = field.value === dest.value
                      return (
                        <button
                          key={dest.value}
                          type="button"
                          onClick={() => field.onChange(dest.value)}
                          className={cn(
                            "flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left",
                            isSelected
                              ? "border-blue-600 bg-blue-50 shadow-md"
                              : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                          )}
                        >
                          <span className="text-3xl flex-shrink-0">{dest.flag}</span>
                          <div className="flex-1">
                            <div className={cn(
                              "text-sm font-bold mb-1",
                              isSelected ? "text-blue-900" : "text-slate-900"
                            )}>
                              {dest.label}
                            </div>
                            <div className={cn(
                              "text-xs",
                              isSelected ? "text-blue-700" : "text-slate-500"
                            )}>
                              {dest.desc}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <FormDescription>Nous proposerons des cliniques dans cette région</FormDescription>
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
                    <FormLabel>Budget estimatif (optionnel)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="number"
                          placeholder="5000"
                          {...field}
                          className="h-12 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Pour orienter nos propositions de cliniques</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de voyage souhaitée</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-5 w-5 opacity-50" />
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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

              <FormField
                control={form.control}
                name="accompaniedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accompagnement (optionnel)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Conjoint, Famille"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormDescription>Si vous voyagez accompagné</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Service tout inclus</p>
                  <p className="text-xs text-blue-700">
                    MediBridge gère pour vous : visa médical, billets d'avion, hébergement, transferts et traduction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Summary & Validation */}
        {currentStep === 5 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                Validation du Dossier
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Vérifiez les informations avant soumission
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Informations Patient
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Âge :</span>
                    <span className="ml-2 text-blue-900">{form.getValues('patientAge')} ans</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Sexe :</span>
                    <span className="ml-2 text-blue-900 capitalize">{form.getValues('patientGender')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Condition Médicale
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-600 font-medium">Diagnostic :</span>
                    <p className="text-slate-900 mt-1">{form.getValues('diagnosis')}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Spécialité :</span>
                    <span className="ml-2 text-slate-900 capitalize">{form.getValues('specialty')}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Urgence :</span>
                    <Badge className={cn(
                      "ml-2",
                      form.getValues('urgency') === 'critical' && "bg-red-100 text-red-700",
                      form.getValues('urgency') === 'high' && "bg-orange-100 text-orange-700",
                      form.getValues('urgency') === 'medium' && "bg-blue-100 text-blue-700",
                      form.getValues('urgency') === 'low' && "bg-slate-100 text-slate-700",
                    )}>
                      {form.getValues('urgency')}
                    </Badge>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Documents Joints
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {file.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {form.getValues('preferredDestination') && (
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Préférences
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-600 font-medium">Destination :</span>
                      <span className="ml-2 text-slate-900 capitalize">{form.getValues('preferredDestination')}</span>
                    </div>
                    {form.getValues('budget') && (
                      <div>
                        <span className="text-slate-600 font-medium">Budget :</span>
                        <span className="ml-2 text-slate-900">{form.getValues('budget')} €</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">Prêt à soumettre</p>
                  <p className="text-xs text-green-700">
                    Votre dossier sera analysé par notre équipe médicale sous 24h. Vous recevrez 3 propositions de cliniques adaptées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="h-12 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg font-bold"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Soumettre le Dossier
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
