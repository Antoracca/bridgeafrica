'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Schema validation mirroring the form
const caseSchema = z.object({
  diagnosis: z.string().min(10, "Le diagnostic doit être détaillé."),
  symptoms: z.string().optional(),
  specialty: z.string().min(1, "Veuillez choisir une spécialité."),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(20, "Veuillez décrire la situation plus en détail."),
  budget: z.string().optional(), // Handled as string in form, parsed to number
  travelDate: z.date().optional(),
})

export async function createMedicalCase(formData: FormData) {
  const supabase = await createClient()

  // Extract and validate
  // In a real scenario, we would upload files first to Storage, get URLs, then insert DB row.
  // For MVP UI Demo, we simulate the delay and redirect.
  
  const rawData = {
    diagnosis: formData.get('diagnosis'),
    symptoms: formData.get('symptoms'),
    specialty: formData.get('specialty'),
    urgency: formData.get('urgency'),
    description: formData.get('description'),
    budget: formData.get('budget'),
    // Date handling would require more parsing in a real formData scenario
  }

  // Simulate server processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log("New Case Data:", rawData)

  // In real app:
  // 1. Validate with Zod
  // 2. Insert into 'medical_cases'
  // 3. Handle file uploads
  
  revalidatePath('/patient')
  redirect('/patient?success=true')
}
