'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Schema validation mirroring the form
const caseSchema = z.object({
  diagnosis: z.string().min(5, "Le diagnostic doit être détaillé."),
  symptoms: z.string().optional(),
  specialty: z.string().min(1, "Veuillez choisir une spécialité."),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(20, "Veuillez décrire la situation plus en détail."),
  budget: z.string().optional(),
  // travelDate est une string dans FormData, à parser si nécessaire
})

// ... imports existants

export async function getPatientStats(patientId: string) {
  const supabase = await createClient()
  
  const { count: activeCases } = await supabase
    .from('medical_cases')
    .select('*', { count: 'exact', head: true })
    .eq('patient_id', patientId)
    .not('status', 'eq', 'completed')

  // Pour l'instant on simule les autres compteurs ou on les laisse à 0
  return {
    activeCases: activeCases || 0,
    quotesReceived: 0,
    messagesUnread: 0,
  }
}

export async function getDoctorStats() {
  const supabase = await createClient()
  
  const { count: pendingValidation } = await supabase
    .from('medical_cases')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'submitted')

  const { count: criticalCases } = await supabase
    .from('medical_cases')
    .select('*', { count: 'exact', head: true })
    .eq('urgency_level', 'critical')

  return {
    pendingValidation: pendingValidation || 0,
    criticalCases: criticalCases || 0,
    activePatients: 0, // À lier plus tard avec une table de suivi
  }
}

export async function createMedicalCase(formData: FormData) {
// ... reste de la fonction existante
  const supabase = await createClient()
  
  // 1. Authentification requise
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Vous devez être connecté." }
  }

  // 2. Extraction des données
  const rawData = {
    diagnosis: formData.get('diagnosis'),
    symptoms: formData.get('symptoms'),
    specialty: formData.get('specialty'),
    urgency: formData.get('urgency'),
    description: formData.get('description'),
    budget: formData.get('budget'),
  }

  // 3. Validation
  const result = caseSchema.safeParse(rawData)
  if (!result.success) {
    return { error: "Données invalides : " + result.error.issues[0].message }
  }

  // 4. Insertion en Base de Données
  
  // On combine description et symptômes pour ne rien perdre
  const combinedSymptoms = `Description: ${result.data.description}${result.data.symptoms ? '\nSymptômes: ' + result.data.symptoms : ''}`
  
  const files = formData.getAll('files')
  console.log(`${files.length} fichiers reçus pour le dossier`)

  interface MedicalCaseInsert {
    patient_id: string;
    diagnosis: string;
    symptoms: string;
    required_specialty: string;
    urgency_level: string;
    estimated_budget: number | null;
    status: string;
  }

  const caseData: MedicalCaseInsert = {
    patient_id: user.id,
    diagnosis: result.data.diagnosis,
    symptoms: combinedSymptoms,
    required_specialty: result.data.specialty,
    urgency_level: result.data.urgency,
    estimated_budget: result.data.budget ? parseFloat(result.data.budget) : null,
    status: 'submitted'
  }

  const { error } = await supabase
    .from('medical_cases')
    .insert(caseData as never)

  if (error) {
    console.error("Erreur insertion dossier:", error)
    return { error: "Erreur lors de la sauvegarde du dossier." }
  }

  // 5. Revalidation et Redirection
  revalidatePath('/patient')
  redirect('/patient?success=true')
}

export async function updateCaseStatus(caseId: string, newStatus: string, _notes?: string) {
  const supabase = await createClient()

  // Vérification basique des droits (Optionnel: vérifier si l'user est médecin)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Non autorisé" }

  interface CaseUpdate {
    status: string;
    updated_at: string;
  }

  const updateData: CaseUpdate = {
    status: newStatus,
    updated_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('medical_cases')
    .update(updateData as never)
    .eq('id', caseId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/medecin')
  revalidatePath(`/medecin/dossier/${caseId}`)
  revalidatePath(`/patient/dossier/${caseId}`)
  
  return { success: true }
}
