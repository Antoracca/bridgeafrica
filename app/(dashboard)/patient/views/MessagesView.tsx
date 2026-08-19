"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import {
  MessageSquare,
  ShieldCheck,
  PlusCircle,
  Search,
  Lock,
  Headphones,
  HelpCircle,
  ArrowUpRight,
  UserCheck
} from "lucide-react"

interface Conversation {
  id: string
  contactName: string
  contactRole: string
  lastMessage: string
  updatedAt: string
  unreadCount?: number
}

interface MessagesViewProps {
  conversations?: Conversation[]
}

export function MessagesView({ conversations = [] }: MessagesViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const hasConversations = conversations && conversations.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10 w-full"
    >
      {/* En-tête Mastercard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-2">
        <div className="space-y-1">
          <EyebrowDot text="• CANAL DE COORDINATION DIRECTE • CHIFFREMENT HDS DE BOUT EN BOUT" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
            Messagerie & Coordination Médicale
          </h1>
          <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            Échangez directement avec votre médecin référent, le pôle d'admission de la clinique partenaire et vos coordinateurs de voyage.
          </p>
        </div>
      </div>

      {hasConversations ? (
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] overflow-hidden flex flex-col md:flex-row min-h-[600px] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          {/* Liste des conversations actives */}
          <div className="w-full md:w-80 border-r border-[#E2DDD7] bg-white p-5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#696969]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une discussion..."
                className="w-full pl-10 pr-4 bg-[#FCFBFA] border border-[#E2DDD7] text-xs rounded-[20px] h-10 font-medium text-[#141413] focus:outline-none focus:border-[#141413]"
              />
            </div>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div key={conv.id} className="p-4 bg-[#FCFBFA] rounded-[20px] border border-[#E2DDD7] cursor-pointer hover:border-[#141413] transition-all">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-xs text-[#141413]">{conv.contactName}</p>
                    <span className="text-[10px] text-[#696969]">{conv.updatedAt}</span>
                  </div>
                  <p className="text-[11px] text-[#696969] truncate mt-1">{conv.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Zone de chat */}
          <div className="flex-1 flex items-center justify-center p-8 text-center text-[#696969] font-medium text-xs">
            Sélectionnez une discussion pour afficher les échanges médicaux chiffrés.
          </div>
        </div>
      ) : (
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="w-16 h-16 mx-auto bg-[#F3F0EE] border border-[#E2DDD7] rounded-full flex items-center justify-center text-[#141413]">
            <MessageSquare className="w-8 h-8 text-[#CF4500]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-medium text-[#141413] tracking-tight">
              Aucune conversation médicale active
            </h3>
            <p className="text-[#696969] text-sm leading-relaxed">
              Dès qu'un praticien référent, une clinique partenaire ou un coordinateur logistique prendra en charge votre dossier médical, un fil de discussion direct s'ouvrira automatiquement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto pt-2">
            <div className="p-5 rounded-[24px] bg-white border border-[#E2DDD7] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#141413] text-[#F3F0EE] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#F37338]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-medium text-xs text-[#141413]">Secret médical inviolable</h4>
                <p className="text-[11px] text-[#696969] leading-relaxed">
                  Tous les échanges et pièces jointes sont protégés par double clé HDS.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-[24px] bg-white border border-[#E2DDD7] flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#141413] text-[#F3F0EE] flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 text-[#F37338]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-medium text-xs text-[#141413]">Coordination 7j/7</h4>
                <p className="text-[11px] text-[#696969] leading-relaxed">
                  Votre équipe de soins dédiée répond en temps réel à vos interrogations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <InkPillButton href="/patient?view=new">
              <PlusCircle className="w-4 h-4" />
              <span>Initier un dossier médical</span>
            </InkPillButton>
            <OutlinedPillButton href="/patient/help">
              <HelpCircle className="w-4 h-4" />
              <span>Centre d'assistance</span>
            </OutlinedPillButton>
          </div>
        </div>
      )}
    </motion.div>
  )
}


