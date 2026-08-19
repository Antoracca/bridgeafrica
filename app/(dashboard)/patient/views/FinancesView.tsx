"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BillingSubView } from "@/components/patient/finances/types"
import { FinancesOverviewSubView } from "@/components/patient/finances/FinancesOverviewSubView"
import { MedicalBillingSubView } from "@/components/patient/finances/MedicalBillingSubView"
import { TransportBillingSubView } from "@/components/patient/finances/TransportBillingSubView"
import { AccommodationBillingSubView } from "@/components/patient/finances/AccommodationBillingSubView"
import { FlightsBillingSubView } from "@/components/patient/finances/FlightsBillingSubView"
import { ConciergeBillingSubView } from "@/components/patient/finances/ConciergeBillingSubView"

interface Invoice {
  id: string
  reference: string
  description: string
  amount: number
  currency: string
  status: "paid" | "pending" | "due"
  date: string
}

interface FinancesViewProps {
  invoices?: Invoice[]
}

export function FinancesView({ invoices = [] }: FinancesViewProps) {
  const [subView, setSubView] = useState<BillingSubView>("overview")
  const [direction, setDirection] = useState<number>(1)

  const handleNavigate = (view: BillingSubView) => {
    setDirection(view === "overview" ? -1 : 1)
    setSubView(view)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="max-w-7xl mx-auto w-full">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={subView}
          custom={direction}
          initial={{ opacity: 0, x: direction * 45 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 45 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {subView === "overview" && (
            <FinancesOverviewSubView
              invoices={invoices}
              onSelectService={handleNavigate}
            />
          )}

          {subView === "medical" && (
            <MedicalBillingSubView
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "transport" && (
            <TransportBillingSubView
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "accommodation" && (
            <AccommodationBillingSubView
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "flights" && (
            <FlightsBillingSubView
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "concierge" && (
            <ConciergeBillingSubView
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
