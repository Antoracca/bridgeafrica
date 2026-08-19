export type BillingSubView = 
  | 'overview'
  | 'medical'
  | 'transport'
  | 'accommodation'
  | 'flights'
  | 'concierge'

export interface BillingItem {
  id: string
  title: string
  description: string
  amount: number
  isCovered: boolean // Pris en charge / Inclus
  patientResponsibility: number // Reste à charge patient
  status: 'paid' | 'pending' | 'due' | 'included'
  date?: string
  reference?: string
  tax?: number
}

export interface ServiceBillingSummary {
  serviceKey: BillingSubView
  title: string
  subtitle: string
  totalEstimated: number
  patientShare: number
  coveredShare: number
  paidAmount: number
  pendingAmount: number
  itemsCount: number
}
