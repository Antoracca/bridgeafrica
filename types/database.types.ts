export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'patient' | 'medecin_referent' | 'clinique' | 'staff' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'patient' | 'medecin_referent' | 'clinique' | 'staff' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'patient' | 'medecin_referent' | 'clinique' | 'staff' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          phone: string | null
          country: string | null
          city: string | null
          avatar_url: string | null
          birth_date: string | null
          blood_type: string | null
          allergies: string | null
          medical_history: string | null
          specialty: string | null
          license_number: string | null
          hospital_name: string | null
          clinic_name: string | null
          clinic_address: string | null
          clinic_specialties: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          phone?: string | null
          country?: string | null
          city?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          blood_type?: string | null
          allergies?: string | null
          medical_history?: string | null
          specialty?: string | null
          license_number?: string | null
          hospital_name?: string | null
          clinic_name?: string | null
          clinic_address?: string | null
          clinic_specialties?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          country?: string | null
          city?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          blood_type?: string | null
          allergies?: string | null
          medical_history?: string | null
          specialty?: string | null
          license_number?: string | null
          hospital_name?: string | null
          clinic_name?: string | null
          clinic_address?: string | null
          clinic_specialties?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      medical_cases: {
        Row: {
          id: string
          patient_id: string
          referent_doctor_id: string | null
          assigned_clinic_id: string | null
          diagnosis: string
          symptoms: string | null
          required_specialty: string
          urgency_level: 'low' | 'medium' | 'high' | 'critical' | null
          estimated_budget: number | null
          preferred_dates: string | null
          accompagnant_count: number
          status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'quote_sent' | 'quote_accepted' | 'visa_pending' | 'travel_booked' | 'in_treatment' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          referent_doctor_id?: string | null
          assigned_clinic_id?: string | null
          diagnosis: string
          symptoms?: string | null
          required_specialty: string
          urgency_level?: 'low' | 'medium' | 'high' | 'critical' | null
          estimated_budget?: number | null
          preferred_dates?: string | null
          accompagnant_count?: number
          status?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'quote_sent' | 'quote_accepted' | 'visa_pending' | 'travel_booked' | 'in_treatment' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          referent_doctor_id?: string | null
          assigned_clinic_id?: string | null
          diagnosis?: string
          symptoms?: string | null
          required_specialty?: string
          urgency_level?: 'low' | 'medium' | 'high' | 'critical' | null
          estimated_budget?: number | null
          preferred_dates?: string | null
          accompagnant_count?: number
          status?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'quote_sent' | 'quote_accepted' | 'visa_pending' | 'travel_booked' | 'in_treatment' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          case_id: string
          clinic_id: string
          treatment_description: string
          estimated_duration_days: number | null
          medical_cost: number
          accommodation_cost: number | null
          travel_cost: number | null
          other_costs: number | null
          total_cost: number
          currency: string
          valid_until: string | null
          status: 'pending' | 'accepted' | 'rejected' | 'expired'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          clinic_id: string
          treatment_description: string
          estimated_duration_days?: number | null
          medical_cost: number
          accommodation_cost?: number | null
          travel_cost?: number | null
          other_costs?: number | null
          total_cost: number
          currency?: string
          valid_until?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          clinic_id?: string
          treatment_description?: string
          estimated_duration_days?: number | null
          medical_cost?: number
          accommodation_cost?: number | null
          travel_cost?: number | null
          other_costs?: number | null
          total_cost?: number
          currency?: string
          valid_until?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          notes?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          case_id: string
          sender_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          sender_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          sender_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          action_url?: string | null
          created_at?: string
        }
      }
      medical_documents: {
        Row: {
          id: string
          case_id: string
          uploaded_by: string
          file_name: string
          file_type: string
          file_url: string
          file_size: number | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          uploaded_by: string
          file_name: string
          file_type: string
          file_url: string
          file_size?: number | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          uploaded_by?: string
          file_name?: string
          file_type?: string
          file_url?: string
          file_size?: number | null
          description?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}