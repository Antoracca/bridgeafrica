"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  InkPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import {
  FileText,
  UploadCloud,
  ShieldCheck,
  Download,
  File,
  ArrowUpRight,
  FileCode2,
  X
} from "lucide-react"

interface MedicalDocument {
  id: string
  name: string
  type: string
  size: string
  createdAt: string
  url?: string
}

interface DocumentsViewProps {
  documents?: MedicalDocument[]
}

export function DocumentsView({ documents = [] }: DocumentsViewProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const hasDocuments = documents && documents.length > 0

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const categories = [
    { key: "all", label: "Tous les documents" },
    { key: "dicom", label: "Imagerie & DICOM" },
    { key: "bio", label: "Bilans Biologiques" },
    { key: "quotes", label: "Devis & Courriers" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête directement sur le fond de page */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="ESPACE NUMÉRIQUE DE SANTÉ & IMAGERIE" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Documents Médicaux & Imagerie
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          Espace sécurisé pour vos scanners DICOM, comptes rendus opératoires, analyses biologiques et devis de soins.
        </p>
      </div>

      {/* Barre de filtres de catégories épurée */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setCategoryFilter(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              categoryFilter === cat.key
                ? "bg-[#141413] text-[#F3F0EE]"
                : "bg-[#F4F2EE] text-[#696969] hover:bg-[#EAE7E1] hover:text-[#141413]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Zone de Téléversement Directement Intégrée */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-[32px] p-8 sm:p-12 text-center transition-all relative ${
          dragActive ? "border-[#141413] bg-[#F4F2EE]" : "border-[#E2DDD7] hover:border-[#141413]/40 bg-[#FCFBFA]"
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.jpg,.jpeg,.png,.dicom,.doc,.docx"
        />
        <div className="w-12 h-12 rounded-full bg-[#F4F2EE] border border-[#E2DDD7] flex items-center justify-center mx-auto mb-3 text-[#141413]">
          <UploadCloud className="w-6 h-6 text-[#CF4500]" />
        </div>
        <h3 className="font-semibold text-[#141413] text-base mb-1">
          Ajouter un compte rendu, une imagerie ou un bilan
        </h3>
        <p className="text-xs text-[#696969] mb-2">
          Glissez-déposez vos fichiers ici ou cliquez pour parcourir votre appareil
        </p>
        <p className="text-[11px] text-[#857F78] font-mono">
          Formats acceptés : PDF, DICOM, JPG, PNG • Chiffrement sécurisé
        </p>
      </div>

      {/* Fichiers en attente d'association */}
      {uploadedFiles.length > 0 && (
        <div className="p-6 rounded-[28px] bg-[#F4F2EE] border border-[#E2DDD7] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#141413] uppercase tracking-wider">
              Fichiers sélectionnés ({uploadedFiles.length})
            </h4>
            <button
              onClick={() => setUploadedFiles([])}
              className="text-xs text-[#696969] hover:text-[#141413]"
            >
              Tout effacer
            </button>
          </div>

          <div className="space-y-2">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-white rounded-[16px] border border-[#E2DDD7] text-xs">
                <div className="flex items-center gap-2.5 min-w-0 pr-4">
                  <File className="w-4 h-4 text-[#CF4500] shrink-0" />
                  <span className="font-semibold text-[#141413] truncate">{file.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[#857F78] font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <button onClick={() => removeFile(idx)} className="text-[#857F78] hover:text-[#141413]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <InkPillButton href="/patient?view=new">
              <span>Associer à mon dossier de soins</span>
              <ArrowUpRight className="w-4 h-4" />
            </InkPillButton>
          </div>
        </div>
      )}

      {/* Liste des Documents Existants OU État Vide */}
      {hasDocuments ? (
        <div className="space-y-4 pt-4 border-t border-[#E2DDD7]">
          <h2 className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight">
            Pièces Médicales Enregistrées
          </h2>

          <div className="divide-y divide-[#E2DDD7]">
            {documents.map((doc) => (
              <div key={doc.id} className="py-4 flex items-center justify-between gap-4 hover:bg-[#F4F2EE] px-3 rounded-[20px] transition-all">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#F4F2EE] border border-[#E2DDD7] flex items-center justify-center text-[#141413] shrink-0">
                    <FileText className="w-5 h-5 text-[#CF4500]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#141413] truncate">{doc.name}</p>
                    <p className="text-xs text-[#696969]">{doc.type} • {doc.size} • {doc.createdAt}</p>
                  </div>
                </div>

                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2DDD7] bg-white text-xs font-semibold text-[#141413] hover:bg-[#141413] hover:text-white transition-all shrink-0">
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 border-t border-[#E2DDD7] text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-lg font-medium text-[#141413]">
            Aucun document archivé pour le moment
          </h3>
          <p className="text-xs text-[#696969] leading-relaxed">
            Les examens transmis lors de vos demandes de prise en charge et les comptes rendus d'hospitalisation seront automatiquement synchronisés et conservés ici.
          </p>
        </div>
      )}

      {/* Garanties de Confidentialité Médicale en bas de page */}
      <div className="p-6 rounded-[24px] bg-[#F4F2EE] border border-[#E2DDD7] flex items-start gap-3.5 text-xs text-[#696969]">
        <ShieldCheck className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Toutes les pièces médicales (radios, IRM, bilans sanguins, ordonnances) bénéficient d'un hébergement sécurisé aux normes HDS avec chiffrement de bout en bout. Seule l'équipe médicale accréditée de votre dossier peut y accéder.
        </p>
      </div>
    </motion.div>
  )
}
