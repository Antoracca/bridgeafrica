"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TravelSubView, TravelLogisticsPackage } from "@/components/patient/travel/types"
import { TravelOverviewSubView } from "@/components/patient/travel/TravelOverviewSubView"
import { FlightsTravelSubView } from "@/components/patient/travel/FlightsTravelSubView"
import { VisasTravelSubView } from "@/components/patient/travel/VisasTravelSubView"
import { AccommodationTravelSubView } from "@/components/patient/travel/AccommodationTravelSubView"
import { TransfersTravelSubView } from "@/components/patient/travel/TransfersTravelSubView"

interface TravelViewProps {
  travel?: TravelLogisticsPackage
}

export function TravelView({ travel }: TravelViewProps) {
  const [subView, setSubView] = useState<TravelSubView>("overview")
  const [direction, setDirection] = useState<number>(1)

  const handleNavigate = (view: TravelSubView) => {
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
            <TravelOverviewSubView
              logistics={travel}
              onSelectService={handleNavigate}
            />
          )}

          {subView === "flights" && (
            <FlightsTravelSubView
              flight={travel?.flight}
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "visas" && (
            <VisasTravelSubView
              visa={travel?.visa}
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "accommodation" && (
            <AccommodationTravelSubView
              accommodation={travel?.accommodation}
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}

          {subView === "transfers" && (
            <TransfersTravelSubView
              transfer={travel?.transfer}
              onBack={() => handleNavigate("overview")}
              onNavigate={handleNavigate}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
